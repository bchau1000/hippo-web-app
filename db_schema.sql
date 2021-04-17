DROP DATABASE IF EXISTS study_buddy_db;
CREATE DATABASE study_buddy_db;
USE study_buddy_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int PRIMARY KEY auto_increment,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(60) NULL UNIQUE,
  password VARCHAR(20) NULL,
  first_name VARCHAR(40) NULL,
  last_name VARCHAR(40) NULL
);

DROP TABLE IF EXISTS study_sets;
CREATE TABLE study_sets(
  id int PRIMARY KEY auto_increment,
  title VARCHAR(60) NOT NULL,
  description VARCHAR(200),
  user_id int REFERENCES user(id)
);

DROP TABLE IF EXISTS subjects;
CREATE TABLE subjects(
	id int PRIMARY KEY auto_increment,
    name VARCHAR(40) NOT NULL UNIQUE,
    set_id int REFERENCES study_sets(id)
);

DROP TABLE IF EXISTS flash_cards;  
CREATE TABLE flash_cards(
  id int PRIMARY KEY auto_increment,
  term VARCHAR(255),
  definition VARCHAR(500),
  q_type int,
  set_id int REFERENCES study_sets(id)
);

