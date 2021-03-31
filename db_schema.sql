DROP DATABASE IF EXISTS study_buddy_db;
CREATE DATABASE study_buddy_db;
USE study_buddy_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id int NOT NULL auto_increment,
  username VARCHAR(60) NOT NULL UNIQUE,
  pass VARCHAR(20) NULL,
  email VARCHAR(60) NULL UNIQUE ,
  first_name VARCHAR(40) NULL,
  last_name VARCHAR(40) NULL,
  PRIMARY KEY(user_id)
);

DROP TABLE IF EXISTS studySets;
CREATE TABLE studySets(
  set_id int NOT NULL auto_increment,
  setName VARCHAR(60) NOT NULL UNIQUE,
  user_id int,
  set_description VARCHAR(300),
  PRIMARY KEY(set_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
  );

DROP TABLE IF EXISTS flashCards;  
CREATE TABLE flashCards(
  qType TINYINT,
  flashName VARCHAR(255),
  flashDef VARCHAR(255),
  set_id int,
  FOREIGN KEY(set_id) REFERENCES studySets(set_id) 
);


INSERT INTO users SET username="admin", pass="admin", email="admin@email.com", first_name="admin", last_name="admin";

INSERT INTO studySets SET setName = "Bio Chapter 4 Terms", user_id = 1, set_description = "Terms for biology chapter 4 that includes anatomy and the process that occur";

INSERT INTO flashCards SET qType=0, flashName = "abdomen", flashDef = "the region of the body between the thorax and the pelvis", set_id = 1;
INSERT INTO flashCards SET qType=0, flashName = "biomass", flashDef = "the total amount of living matter in a given unit area", set_id = 1;
INSERT INTO flashCards SET qType=0, flashName = "biome", flashDef = "major ecological community with distinct climate and flora", set_id = 1;
INSERT INTO flashCards SET qType=0, flashName = "cytoskeleton", flashDef = "a microscopic network of actin filaments and microtubules in the cytoplasm of many living cells that gives the cell shape and coherence", set_id = 1;
INSERT INTO flashCards SET qType=0, flashName = "semipermeable membrane", flashDef = "a membrane (as a cell membrane) that allows some molecules to pass through but not others", set_id = 1;