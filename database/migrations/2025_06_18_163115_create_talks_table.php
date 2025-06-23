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
        Schema::create('talks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('link');
            $table->text('thumbnail');
            $table->text('slug')->unique();
            $table->string('speaker')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained();

            $table->index('title');
            $table->index('speaker');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('talks');
    }
};
