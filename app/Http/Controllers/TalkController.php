<?php

namespace App\Http\Controllers;

use App\Helpers;
use App\Models\Talk;

class TalkController extends Controller
{
    public function index()
    {
        return inertia('talk/index', [
            'pagination' => Talk::query()
                ->orderBy('created_at')
                ->when(request('q'), function ($query, $filter) {
                    $query
                        ->whereLike('title', "%{$filter}%")
                        ->orWhereLike('speaker', "%{$filter}%")
                        ->orWhereRaw('? = ANY (tags)', [$filter]);
                })
                ->paginate(9)
                ->withQueryString(),
        ]);
    }

    public function show(Talk $talk)
    {
        return inertia('talk/details', [
            'talk' => $talk->load(['user']),
        ]);
    }

    public function create()
    {
        return inertia('talk/create');
    }

    public function store()
    {
        $data = request()->validate([
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'link' => ['required', 'url'],
            'speaker' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'tags' => ['array'],
        ]);

        $slug = str($data['title'])->slug();

        if (Talk::where('slug', $slug)->exists()) {
            return back()
                ->with(Helpers::error_flash('Failed to create talk'))
                ->withErrors(['title' => 'Talk with that title already exists'])
                ->withInput(request()->all());
        }

        $talk = new Talk($data);
        $talk->tags = collect($data['tags'])->pluck('value')->unique()->toArray();
        $talk->thumbnail = Helpers::create_thumbnail_url($talk->link);
        $talk->slug = $slug;
        $talk->user_id = auth()->id();
        $talk->save();

        return to_route('talk.show', ['talk' => $slug])->with(Helpers::success_flash('Talk created'));
    }

    public function edit(Talk $talk)
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

        $data = request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'link' => ['required', 'url'],
            'speaker' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'tags' => ['array'],
        ]);

        $new_slug = str($data['title'])->slug();

        if ((string) $talk->slug !== (string) $new_slug && Talk::where('slug', $new_slug)->exists()) {
            return back()
                ->with(Helpers::error_flash('Failed to create talk'))
                ->withErrors(['title' => 'Talk with that title already exists'])
                ->withInput(request()->all());
        }

        $talk->update([
            'slug' => $new_slug,
            'title' => $data['title'],
            'link' => $data['link'],
            'description' => $data['description'],
            'speaker' => $data['speaker'],
            'thumbnail' => Helpers::create_thumbnail_url($data['link']),
            'tags' => collect($data['tags'])->pluck('value')->unique()->toArray(),
        ]);

        return to_route('talk.show', ['talk' => $new_slug])->with(Helpers::success_flash('Talk updated'));
    }
}
