<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'count',
    ];

    public function talks(): BelongsToMany
    {
        return $this->belongsToMany(Talk::class);
    }
}
