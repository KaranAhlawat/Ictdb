<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Talk extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'link',
        'speaker',
        'description',
    ];

    /**
     * Get the user that added this talk
     * @return BelongsTo<User, Talk>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
