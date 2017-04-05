create table service_calls
(
	event_number text not null,
	district text,
	time_received timestamp with time zone,
	shift integer,
	time_dispatched timestamp with time zone,
	time_arrived timestamp with time zone,
	callcode text,
	call_code_description text,
	call_type text,
	priority integer,
	unit_id text,
	is_primary boolean,
	address text,
	city text,
	latitude double precision,
	longitude double precision,
	geo_error text,
	geo_count integer,
	created timestamp with time zone,
	updated timestamp with time zone
)
;

create unique index service_calls_event_number_unit_id_uindex
	on service_calls (event_number, unit_id)
;

comment on table service_calls is 'Call records for the JCPD'
;

