CREATE TABLE public.service_calls (
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
  geo_code INTEGER,
  geo_error TEXT
);
CREATE UNIQUE INDEX service_calls_event_number_uindex ON service_calls USING BTREE (event_number);
COMMENT ON TABLE public.service_calls IS 'Call records for the JCPD';