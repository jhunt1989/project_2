DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;

USE project2_db;

SELECT * FROM jobsites;

SELECT * FROM jobs;

SELECT * FROM supervisors;


INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (1, 3, 4000, 4, 3, 1200, "This job was completed with 4 yards of mulch and 4 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (1, 1, 5000, 5, 4, 1600, "This job was completed with 5 yards of mulch and 4 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (2, 2, 3000, 2, 1, 1300, "This job was completed with 4 yards of mulch and 3 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (2, 1, 2000, 5, 2, 1400, "This job was completed with 4 yards of mulch and 2 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (3, 2, 5000, 3, 4, 1600, "This job was completed with 4 yards of mulch and 6 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (3, 3, 1000, 2, 2, 1800, "This job was completed with 5 yards of mulch and 5 gallons of gas");
INSERT INTO jobs (supervisor_id, jobsite_id, project_bid, hours, workers, materialcosts, jobcomments) VALUES (4, 4, 10000, 6, 6, 3000, "This job was completed with 10 yards of mulch and 10 gallons of gas");

INSERT INTO supervisors (supervisor_name, jobs_expenses, jobs_revenue) VALUES ("Jack Hamill", 2800, 9000);
INSERT INTO supervisors (supervisor_name, jobs_expenses, jobs_revenue) VALUES ("Jordan Kane", 2700, 5000);
INSERT INTO supervisors (supervisor_name, jobs_expenses, jobs_revenue) VALUES ("Thomas Lynch", 3400, 6000);
INSERT INTO supervisors (supervisor_name, jobs_expenses, jobs_revenue) VALUES ("Kevin Little", 3000, 10000);


INSERT INTO jobsites (jobsite_name, location_expenses, location_revenue) VALUES ("Pennovation Center", 3000, 7000);
INSERT INTO jobsites (jobsite_name, location_expenses, location_revenue) VALUES ("Franklin Square", 2900, 8000);
INSERT INTO jobsites (jobsite_name, location_expenses, location_revenue) VALUES ("LaSalle High School", 3000, 5000);
INSERT INTO jobsites (jobsite_name, location_expenses, location_revenue) VALUES ("St. Joseph's College", 3000, 10000);
