LOAD CSV WITH HEADERS FROM 'file:///close_300.csv' AS close_row
MATCH 
    (h:house {houseId: close_row.house_id}),
    (t:temple {templeId: close_row.temple_id})
MERGE
    (t)-[r:CLOSE_TO {distance: toFloat(close_row.distance)}]->(h);

    