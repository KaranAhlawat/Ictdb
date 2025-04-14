CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON talks
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON favorites
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();
