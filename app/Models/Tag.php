<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'count',
    ];

    public function talks(): BelongsToMany
    {
        return $this->belongsToMany(Talk::class, foreignPivotKey: 'tag_name');
    }

    public static function popular_tags(int $count = 5): Collection
    {
        return DB::table('tag_talk')
            ->select('tag_name', DB::raw('count(*) as tagged'))
            ->groupBy('tag_name')
            ->orderByDesc('tagged')
            ->limit($count)
            ->get();
    }

    protected $primaryKey = 'name';

    protected $keyType = 'string';
}
