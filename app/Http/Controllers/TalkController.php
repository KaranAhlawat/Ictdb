<?php

namespace App\Http\Controllers;

use App\Models\Talk;
use Illuminate\Support\Str;

class TalkController extends Controller
{
    public function index()
    {
        $filter = request()->query('q');
        $query = Talk::orderBy('created_at');
        if (! empty($filter)) {
            $query->whereLike('title', "%{$filter}%")->orWhereLike('description', "%{$filter}%")->orWhereLike('speaker', "%{$filter}%");
        }

        return inertia('talk/index', [
            'talks' => $query->get()->all(),
        ]);
    }

    public function show(Talk $talk)
    {
        $talk->load(['user']);

        return inertia('talk/details', [
            'talk' => $talk,
        ]);
    }

    public function create()
    {
        return inertia('talk/create');
    }

    public function store()
    {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'link' => ['required', 'url'],
        ]);

        $slug = str(request('title'))->slug();

        if (Talk::where('slug', $slug)->exists()) {
            return back()
                ->with(['message', 'Failed to create talk', 'type', 'error'])
                ->withErrors(['title' => 'Talk with that title already exists'])
                ->withInput(request()->all());
        }

        $talk = new Talk(request()->only(['title', 'link', 'speaker', 'description']));
        $talk->thumbnail = self::create_thumbnail_url($talk->link);
        $talk->slug = $slug;
        $talk->user_id = auth()->id();
        $talk->save();

        return to_route('talk.index')->with(['message', 'Talk created', 'type', 'success']);
    }

    private const BASE_URL = 'https://img.youtube.com';

    private static function create_thumbnail_url(string $link): string
    {
        if (! Str::contains($link, ['youtube', 'youtu.be'], true)) {
            return self::BASE_URL;
        }

        $parsed_url = parse_url($link);

        $params = [];

        if (isset($parsed_url['query'])) {
            parse_str($parsed_url['query'], $params);
        }

        if (isset($params['v'])) {
            $video_id = $params['v'];
        } else {
            $path = $parsed_url['path'] ?? '';
            $segments = array_filter(explode('/', $path));
            $video_id = end($segments);
        }

        if (empty($video_id)) {
            return self::BASE_URL;
        }

        return self::BASE_URL."/vi/{$video_id}";
    }
}
