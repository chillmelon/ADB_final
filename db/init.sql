BEGIN;

CREATE SCHEMA IF NOT EXISTS adb_final;

CREATE TABLE adb_final.houses (
	ID SERIAL PRIMARY KEY,
	city text,
	district text,
	address text,
	object_type text,
	land_type text,
	constructed_date date,
	management boolean,
	building_type text,
	living_room int,
	bed_room int,
	toilet int,
	compartment boolean,
	balcony boolean,
	land int,
	building int,
	parking int,
	parking_type text,
	price_sqm int,
	price_parking int,
	price_total int,
	building_area double precision,
	land_area double precision,
	parking_area double precision,
	latitude double precision,
	longitude double precision
);

COPY adb_final.houses FROM '/data/houses.csv' csv header;

COMMIT;
