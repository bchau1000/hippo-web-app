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
  description VARCHAR(300),
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
  definition VARCHAR(255),
  q_type int,
  set_id int REFERENCES study_sets(id)
);

INSERT INTO users(username, email, password, first_name, last_name) VALUES('admin', 'admin@email.com', 'admin', 'admin', 'admin');
INSERT INTO study_sets(title, description, user_id) VALUES('CS145: Embedded Software', 'A study guide regarding embedded software', 1);
INSERT INTO study_sets(title, description, user_id) VALUES('CS132: Computer Networks', 'A study guide regarding computer networks', 1);
INSERT INTO study_sets(title, description, user_id) VALUES('CS178: Machine Learning', 'A study guide regarding machine learning', 1);
INSERT INTO study_sets(title, description, user_id) VALUES('CS161: Design and Analysis of Algorithms', 'A study guide regarding algorithms', 1);

INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '1');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '2');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '3');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '4');

INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '1');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '2');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '3');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '4');

INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '1');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '2');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '3');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '4');

INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '1');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '2');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '3');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '4');

INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '1');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '2');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '3');
INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES('A term here', 'Definition of the term here', 1, '4');