LOAD CSV WITH HEADERS FROM 'file:///temple_unify.csv' AS row
CREATE (t:temple {templeId: row.id,
                name: row.name,
                city: row.city, 
                addr: row.addr, 
                religion: row.religion, 
                reg_type: row.reg_type, 
                tel: row.tel, 
                principal: row.principal, 
                longitude: row.longitude, 
                latitude:row.latitude});

LOAD CSV WITH HEADERS FROM 'file:///gods.csv' AS gods_row
CREATE (g:god {name: gods_row.name});

LOAD CSV WITH HEADERS FROM 'file:///temple_unify.csv' AS row
MATCH
    (g: god),
    (t: temple)
WHERE
    (t.templeId = toString(row.id) AND g.name = row.god_0) OR
    (t.templeId = toString(row.id) AND g.name = row.god_1) OR
    (t.templeId = toString(row.id) AND g.name = row.god_2)
CREATE (g)-[r:IN_CHARGE_OF]->(t);


LOAD CSV WITH HEADERS FROM 'file:///houses.csv' AS house_row
CREATE (h:house {houseId: linenumber()-2,
                city: house_row.city, 
                district: house_row.district,
                addr: house_row.address, 
                constructed_date: house_row.constructed_date, 
                age: house_row.age, 
                management: house_row.management, 
                building_type: house_row.building_type, 
                living_room: house_row.living_room, 
                bed_room: house_row.bed_room,
                toilet: house_row.toilet, 
                balcony: house_row.balcony, 
                parking_type: house_row.parking_type, 
                price_sqm: house_row.price_sqm, 
                price_parking: house_row.price_parking, 
                price_total: house_row.price_total, 
                building_area: house_row.building_area, 
                land_area: house_row.land_area, 
                parking_area: house_row.parking_area, 
                latitude: house_row.latitude,
                longitude: house_row.longitude});
                
LOAD CSV WITH HEADERS FROM 'file:///houses.csv' AS house_row
MERGE (d:district {name: house_row.district});

MATCH  
    (d:district), 
    (h:house)
WHERE
    d.name = h.district
CREATE
    (h)-[r:LOCATED_IN]->(d)


CREATE INDEX house_index FOR (h:house) ON (h.houseId);
CREATE INDEX temple_index FOR (t:temple) ON (t.templeId);

LOAD CSV WITH HEADERS FROM 'file:///close1.csv' AS close_row
MATCH 
    (h:house {houseId: toInteger(close_row.house_id)}),
    (t:temple {templeId: close_row.temple_id})
MERGE
    (h)-[r:CLOSE_TO {distance: toFloat(close_row.distance)}]->(t);

LOAD CSV WITH HEADERS FROM 'file:///close2.csv' AS close_row
MATCH 
    (h:house {houseId: toInteger(close_row.house_id)}),
    (t:temple {templeId: close_row.temple_id})
MERGE
    (h)-[r:CLOSE_TO {distance: toFloat(close_row.distance)}]->(t);

    

LOAD CSV WITH HEADERS FROM 'file:///close3.csv' AS close_row
MATCH 
    (h:house {houseId: toInteger(close_row.house_id)}),
    (t:temple {templeId: close_row.temple_id})
MERGE
    (h)-[r:CLOSE_TO {distance: toFloat(close_row.distance)}]->(t);

    