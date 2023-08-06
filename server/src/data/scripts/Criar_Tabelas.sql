-- PostgreSQL
-- #### Schema ou Datebase ####

 DROP SCHEMA SIG2E CASCADE;

CREATE SCHEMA SIG2E;

SET search_path TO SIG2E;

CREATE TYPE role AS ENUM ('student', 'professor', 'manager', 'admin');
CREATE TYPE condition AS ENUM ('working', 'broken', 'maintenance', 'stolen');
CREATE TYPE StateIssue AS ENUM ('reported', 'verified', 'resolved');
CREATE TYPE StateReservation AS ENUM ('canceled', 'active', 'concluded', 'pending');
CREATE TYPE SpaceType AS ENUM ('storage', 'lab');

CREATE TABLE USERS (
    Id text NOT NULL,
    Email text NOT NULL,
    Name text NOT NULL,
    Role role,
    PhoneNumber text NOT NULL,
    Score int,
    PRIMARY KEY (Id)
);

CREATE TABLE SPACE (
    Id int NOT NULL,
    Schedule time[7][2] NOT NULL,
    Designation text UNIQUE,
	Spacetype SpaceType NOT NULL,
	Availability boolean NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE LAB (
	Id int NOT NULL,
	Spaceid int NOT NULL,
    Capacity int NOT NULL,
    Occupancy int NOT NULL,
    Condition condition NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (SpaceId) REFERENCES SPACE(Id)
);

CREATE TABLE DESK (
    Id int NOT NULL,
    LabId int NOT NULL,
    DeskNr int NOT NULL,
    Designation text NOT NULL,
    Capacity int NOT NULL,
    Availability boolean NOT NULL,
    Condition condition NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (LabId) REFERENCES LAB(Id),
	UNIQUE (LabId, DeskNr)
);

CREATE TABLE EQUIPMENT (
    Id int NOT NULL,
    DeskId int,
    Location text NOT NULL,
    EquipmentNr int NOT NULL,
    Designation  text NOT NULL,
    Availability boolean NOT NULL,
    Condition condition NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (DeskId) REFERENCES Desk(Id)
);

CREATE TABLE RESERVATION (
    Id int,
    UserId text NOT NULL,
    EquipmentId int NOT NULL,
    DeskId int NOT NULL,
    Cause text NOT NULL,
    DateStart timestamp NOT NULL,
    DateEnd timestamp NOT NULL,
    State StateReservation NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES USERS(Id),
	FOREIGN KEY (EquipmentId) REFERENCES EQUIPMENT(Id),
	FOREIGN KEY (DeskId) REFERENCES Desk(Id)
);


CREATE TABLE ISSUE(
    Id int NOT NULL,
    UserIdReport text NOT NULL,
    UserIdVerification text,
    UserIdResolution text,
    EquipmentId int,
    DeskId int,
    LabId int,
    Description text NOT NULL,
    State StateIssue NOT NULL,
    DateReport timestamp NOT NULL,
    DateVerification timestamp,
    DateResolution timestamp,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserIdReport) REFERENCES USERS(Id),
    FOREIGN KEY (UserIdVerification) REFERENCES USERS(Id),
    FOREIGN KEY (UserIdResolution) REFERENCES USERS(Id),
	FOREIGN KEY (EquipmentId) REFERENCES EQUIPMENT(Id),
	FOREIGN KEY (DeskId) REFERENCES Desk(Id),
    FOREIGN KEY (LabId) REFERENCES LAB(Id)
);