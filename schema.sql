DROP DATABASE IF EXISTS study_buddy_db;
CREATE DATABASE study_buddy_db;
USE study_buddy_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int PRIMARY KEY auto_increment,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(60) NULL UNIQUE,
  password VARCHAR(20) NOT NULL,
  first_name VARCHAR(40) NULL,
  last_name VARCHAR(40) NULL
);

DROP TABLE IF EXISTS folders;
CREATE TABLE folders(
	id int PRIMARY KEY auto_increment,
    name VARCHAR(60) NOT NULL,
    user_id int REFERENCES user(id)
);

DROP TABLE IF EXISTS sets;
CREATE TABLE sets(
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
  term blob DEFAULT NULL,
  definition blob DEFAULT NULL,
  q_type int,
  set_id int REFERENCES study_sets(id)
);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags(
	id int PRIMARY KEY auto_increment,
    name VARCHAR(40) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS sets_and_tags;
CREATE TABLE sets_and_tags(
	set_id int REFERENCES sets(id),
    tag_id int REFERENCES tags(id)
);

DROP TABLE IF EXISTS folders_and_sets;
CREATE TABLE folders_and_sets(
	folder_id int REFERENCES folders(id),
    set_id int REFERENCES sets(id)
);