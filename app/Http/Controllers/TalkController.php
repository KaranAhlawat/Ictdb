<?php

namespace App\Http\Controllers;

use App\Helpers;
use App\Models\Tag;
use App\Models\Talk;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

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
                        ->orWhereHas('tags', function ($tag_query) use ($filter) {
                            $tag_query->where('name', 'like', "%{$filter}%");
                        });
                })
                ->paginate(9)
                ->withQueryString(),
        ]);
    }

    public function show(Talk $talk)
    {
        return inertia('talk/details', [
            'talk' => $talk->load(['tags', 'user']),
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
        $talk->thumbnail = Helpers::create_thumbnail_url($talk->link);
        $talk->slug = $slug;
        $talk->user_id = auth()->id();
        $talk->save();

        // Get the unique tags sent by client
        $this->update_talk_tags($data['tags'], $talk);

        return to_route('talk.show', ['talk' => $slug])->with(Helpers::success_flash('Talk created'));
    }

    public function edit(Talk $talk)
    {
        if (auth()->user()->id !== $talk->user_id) {
            abort(403);
        }

        return inertia('talk/edit', [
            'talk' => $talk->load(['tags']),
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
        ]);

        // Get the unique tags sent by client
        $this->update_talk_tags($data['tags'], $talk);

        return to_route('talk.show', ['talk' => $new_slug])->with(Helpers::success_flash('Talk updated'));
    }

    private function update_talk_tags($tags, Talk $talk): void
    {
        DB::enableQueryLog();
        $tag_values = collect($tags)->pluck('value')->unique()->values();

        try {
            DB::transaction(function () use ($tag_values, $talk) {
                // Make sure all the tags exist
                Tag::upsert($tag_values->map(fn ($tag) => ['name' => $tag])->all(), ['name'], []);

                // Get the IDs of the existing and new tags
                $tag_ids = Tag::whereIn('name', $tag_values)->pluck('id');

                // Detach all tags
                $talk->tags()->detach();

                // Attach current IDs
                $talk->tags()->attach($tag_ids);
            });
        } catch (Throwable $e) {
            logger()->error('Failed to update tags', [$e]);
        } finally {
            DB::disableQueryLog();
            $queries = DB::getQueryLog();
            foreach ($queries as $query) {
                Log::info('SQL query: {query}', ['query' => $query]);
            }
        }
    }
}
