CREATE TABLE IF NOT EXISTS jobtable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_name TEXT, 
    tasks_name TEXT,
    time_name TEXT
);
INSERT or IGNORE INTO jobtable(id, location_name, tasks_name, time_name) VALUES (1, 'Metro Manila', 'Coffee Maker Equipment', '11:30-12:30pm');
INSERT or IGNORE INTO jobtable(id, location_name, tasks_name, time_name) VALUES (2, 'Subic Castillejos', 'Installation Commission', '11:30-12:30pm');
INSERT or IGNORE INTO jobtable(id, location_name, tasks_name, time_name) VALUES (3, 'Resorts World Manila', 'Preventive Maintenance', '11:30-12:30pm');