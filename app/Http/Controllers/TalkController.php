<?php

namespace App\Http\Controllers;

use App\Models\Talk;
use Inertia\Inertia;

class TalkController extends Controller
{
    public function index()
    {
        return Inertia::render('talk/list', [
            'talks' => Talk::all()
        ]);
    }
}
