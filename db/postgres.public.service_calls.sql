CREATE TABLE service_calls
(
    event_number TEXT,
    district TEXT,
    time_received TIMESTAMP WITH TIME ZONE,
    shift INTEGER,
    time_dispatched TIMESTAMP WITH TIME ZONE,
    time_arrived TIMESTAMP WITH TIME ZONE,
    callcode TEXT,
    call_code_description TEXT,
    call_type TEXT,
    priority INTEGER,
    unit_id TEXT,
    is_primary BOOLEAN,
    address TEXT,
    city TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geo_error TEXT,
    geo_count INTEGER,
    id INTEGER DEFAULT nextval('service_calls_id_seq'::regclass) PRIMARY KEY NOT NULL,
    created TIMESTAMP WITH TIME ZONE,
    updated TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX service_calls_event_number_uindex ON service_calls (event_number);
CREATE UNIQUE INDEX service_calls_id_uindex ON service_calls (id);