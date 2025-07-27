Create stations-controller {cm:2025-07-20}
Create admin account and give it permissions add and delete stations and data of all users. Users can delete only data that they created {cm:2025-07-27}
Add a list of all npm's to the readme.md
Add feature that will allow to recover data for all data stores. Instead of Delete I want each data piece to have flags "deleted", "deleted by" etc. {cm:2025-07-24}
Create users-controller and permissions for them {cm:2025-07-26}
Add the ability to update all data, Admins - evething, users - only data they created.
Create logs of events: updates, deletions, creations, etc.
Create an Admin page console to see logs and etc.
Create all buttons and functions with routes for stations and records {cm:2025-07-24}
Last time updated in stations when add a new record
Instead of delete forever from database make it be moved to the deleted_stations.json and deleted_records.json so it still could be recovered {cm:2025-07-24}
Station, record, deleted data tables to not display when there is no information {cm:2025-07-24}
Create login system {cm:2025-07-26}
Adjust view for users. Users cannot see deleted lists {cm:2025-07-26}
Create pop-up question window asking if you really want to delete station/record
When delete station from db, all records shold be removed from db too {cm:2025-07-27}
Create info page for the record with all info