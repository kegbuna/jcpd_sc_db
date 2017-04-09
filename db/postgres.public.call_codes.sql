create table call_codes
(
	type text,
	pd_code integer,
	description text,
	constraint call_codes_type_pd_code_pk
		unique (type, pd_code)
)
;

create index call_codes_type_pd_code_index
	on call_codes (type, pd_code)
;

comment on table call_codes is 'Call Types and PD Codes mapped to descriptions'
;

