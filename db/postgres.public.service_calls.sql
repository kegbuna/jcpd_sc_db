CREATE TABLE public.service_calls (
  event_number TEXT NOT NULL,
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
  id INTEGER NOT NULL DEFAULT nextval('service_calls_id_seq'::regclass),
  created TIMESTAMP WITH TIME ZONE,
  updated TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX service_calls_id_uindex ON service_calls USING BTREE (id);
COMMENT ON TABLE public.service_calls IS 'Call records for the JCPD';