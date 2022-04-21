CREATE TABLE IF NOT EXISTS jobtable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_request TEXT,
    location_name TEXT, 
    tasks_name TEXT,
    time_name TEXT,
    site_equipment TEXT
);
INSERT or IGNORE INTO jobtable(id, service_request, location_name, tasks_name, time_name, site_equipment) VALUES (1, 'I need a new set of equipment tools for creating coffee machine inside the warehouse.', 'Metro Manila', 'Coffee Maker Equipment',
'11:30-12:30pm', 'testing service request');
INSERT or IGNORE INTO jobtable(id, service_request, location_name, tasks_name, time_name) VALUES (2, 'I need a new set of equipment tools for creating coffee machine inside the warehouse.', 'Subic Castillejos', 'Installation Commission', '11:30-12:30pm');
INSERT or IGNORE INTO jobtable(id, service_request, location_name, tasks_name, time_name) VALUES (3, 'I need a new set of equipment tools for creating coffee machine inside the warehouse.', 'Resorts World Manila', 'Preventive Maintenance', '11:30-12:30pm');
