<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property array<string> tags
 */
class Talk extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'link',
        'speaker',
        'description',
        'thumbnail',
        'slug',
        'tags',
    ];

    /**
     * Get the user that added this talk
     *
     * @return BelongsTo<User, Talk>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor: convert Postgres array string to PHP array
     *
     * @return array<string>
     */
    public function getTagsAttribute($value): array
    {
        return ($value && $value !== '{}') ? explode(',', trim($value, '{}')) : [];
    }

    // Mutator: convert PHP array to Postgres array string
    public function setTagsAttribute($value): void
    {
        $this->attributes['tags'] = '{'.implode(',', $value).'}';
    }
}
