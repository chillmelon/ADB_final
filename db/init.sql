CREATE TABLE houses (
	ID SERIAL PRIMARY KEY,
	city text,
	district text,
	address text,
	constructed_date date,
	age int,
	management boolean,
	building_type int,
	living_room int,
	bed_room int,
	toilet int,
	balcony boolean,
	parking_type int,
	price_sqm int,
	price_parking int,
	price_total bigint,
	building_area double precision,
	land_area double precision,
	parking_area double precision,
	latitude double precision,
	longitude double precision
);

CREATE TABLE temples (
	ID SERIAL PRIMARY KEY,
	name text,
	god_0 text,
	god_1 text,
	god_2 text,
	city text,
	addr text,
	religion text,
	tel text,
	principal text,
	longitude double precision,
	latitude double precision,
	dist text
);

COPY houses FROM '/data/houses.csv' DELIMITER ',' CSV HEADER;
COPY temples FROM '/data/temples.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE houses ADD COLUMN geog geography(point, 4326);
UPDATE houses SET geog = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

ALTER TABLE temples ADD COLUMN geog geography(point, 4326);
UPDATE temples SET geog = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

CREATE INDEX house_geography_index ON houses USING GIST (geog);
CREATE INDEX temple_geography_index ON temples USING GIST (geog);
