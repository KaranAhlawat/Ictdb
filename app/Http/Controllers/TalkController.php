<?php

namespace App\Http\Controllers;

use App\Models\Talk;

class TalkController extends Controller
{
    public function index()
    {
        return inertia('talk/list', [
            'talks' => Talk::all(),
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

        $talk = new Talk(request()->only(['title', 'link', 'speaker', 'description']));
        $talk->user_id = auth()->id();
        $talk->save();

        return to_route('talk.index')->with(['message', 'Talk created', 'type', 'success']);
    }
}
