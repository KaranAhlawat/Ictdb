<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
                CREATE OR REPLACE FUNCTION update_count_on_insert()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE tags SET count = count + 1 WHERE id = NEW.tag_id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;

                CREATE OR REPLACE FUNCTION update_count_on_delete()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE tags SET count = GREATEST(count - 1, 0) WHERE id = OLD.tag_id;
                    RETURN OLD;
                END;
                $$ LANGUAGE plpgsql;

                CREATE TRIGGER trigger_talks_count_insert
                AFTER INSERT ON tag_talk
                FOR EACH ROW
                EXECUTE FUNCTION update_count_on_insert();

                CREATE TRIGGER trigger_talks_count_delete
                AFTER DELETE ON tag_talk
                FOR EACH ROW
                EXECUTE FUNCTION update_count_on_delete();
            ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('
                DROP TRIGGER IF EXISTS trigger_talks_count_insert ON tag_talk;
                DROP TRIGGER IF EXISTS trigger_talks_count_delete ON tag_talk;
                DROP FUNCTION IF EXISTS update_count_on_insert();
                DROP FUNCTION IF EXISTS update_count_on_delete();
            ');
    }
};
