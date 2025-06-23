<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE talks ADD COLUMN tags TEXT[] DEFAULT '{}'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('talks', function (Blueprint $table) {
            $table->dropColumn('tags');
        });
    }
};
