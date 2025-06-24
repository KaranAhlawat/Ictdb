<?php

use App\Models\Talk;
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
            $table->string('tag_name');

            $table->foreignId('talk_id')->constrained()->cascadeOnDelete();

            $table->primary(['tag_name', 'talk_id']);
            $table->foreign('tag_name')->references('name')->on('tags')->cascadeOnDelete();
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
