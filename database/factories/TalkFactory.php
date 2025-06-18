<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TalkFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->text(50),
            'link' => fake()->url(),
            'speaker' => fake()->name(),
            'description' => fake()->sentences(3, true),
        ];
    }
}
