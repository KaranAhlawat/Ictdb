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
            $query
                ->whereLike('title', "%{$filter}%")
                ->orWhereLike('description', "%{$filter}%")
                ->orWhereLike('speaker', "%{$filter}%")
                ->orWhereRaw('? = ANY (tags)', [$filter]);
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

    public function show_edit(Talk $talk)
    {
        if (auth()->user()->id !== $talk->user_id) {
            abort(403);
        }

        return inertia('talk/edit', [
            'talk' => $talk,
        ]);
    }

    public function update(Talk $talk)
    {

        if (auth()->user()->id !== $talk->user_id) {
            abort(403);
        }

        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'link' => ['required', 'url'],
        ]);

        $new_slug = str(request('title'))->slug();

        if ((string) $talk->slug !== (string) $new_slug && Talk::where('slug', $new_slug)->exists()) {
            return back()
                ->with(['message' => 'Failed to create talk', 'type' => 'error'])
                ->withErrors(['title' => 'Talk with that title already exists'])
                ->withInput(request()->all());
        }

        $talk->update([
            'slug' => $new_slug,
            'title' => request('title'),
            'link' => request('link'),
            'description' => request('description'),
            'speaker' => request('speaker'),
            'thumbnail' => self::create_thumbnail_url(request('link')),
            'tags' => collect(request('tags'))->pluck('value')->unique()->toArray(),
        ]);

        return to_route('talk.show', ['talk' => $new_slug])->with(['message' => 'Talk updated', 'type' => 'success']);
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
                ->with(['message' => 'Failed to create talk', 'type' => 'error'])
                ->withErrors(['title' => 'Talk with that title already exists'])
                ->withInput(request()->all());
        }

        $talk = new Talk(request()->only(['title', 'link', 'speaker', 'description']));
        $talk->tags = collect(request('tags'))->pluck('value')->unique()->toArray();
        $talk->thumbnail = self::create_thumbnail_url($talk->link);
        $talk->slug = $slug;
        $talk->user_id = auth()->id();
        $talk->save();

        return to_route('talk.show', ['talk' => $slug])->with(['message' => 'Talk created', 'type' => 'success']);
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
