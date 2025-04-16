CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON account
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON talk
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER set_current_timestamp_updated_at BEFORE UPDATE ON favorite
    FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at();
