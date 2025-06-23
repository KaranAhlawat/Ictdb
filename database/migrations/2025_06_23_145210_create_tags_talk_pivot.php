<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tag_talk', function (Blueprint $table) {
            $table->foreignId('tag_id')->constrained();
            $table->foreignId('talk_id')->constrained();

            $table->primary(['tag_id', 'talk_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_talk');
    }
};
