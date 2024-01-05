
 DROP TABLE IF EXISTS user;
CREATE TABLE user (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nom VARCHAR(80) NOT NULL,
	prenom VARCHAR(80) NOT NULL,
	rue VARCHAR(255) NOT NULL,
	code_postal int NOT NULL,
	ville VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(80) NOT NULL,
	connection BOOLEAN NOT NULL,
	nb_vehicule int NOT NULL,
	admin BOOLEAN NOT NULL,
	anniversaire DATE NOT NULL,
	inscription DATE NOT NULL,
	derniere_maj DATE NOT NULL,
    token VARCHAR(255) NULL
	
);

DROP TABLE IF EXISTS borne;
CREATE TABLE borne (
    id int  NOT NULL PRIMARY KEY,
	id_station VARCHAR (80),
	n_station VARCHAR(255),
	ad_station VARCHAR(255),
	code_insee VARCHAR (80),
	xlongitude FLOAT NOT NULL,
	ylatitude FLOAT NOT NULL,
	puiss_max VARCHAR(80),
	accessibilite VARCHAR(80) ,
	type_prise VARCHAR(250),
	n_enseigne  VARCHAR (80) ,
	date_maj DATE NOT NULL
	
);

DROP TABLE IF EXISTS marque;
CREATE TABLE marque (
	id int AUTO_INCREMENT NOT NULL,
	name VARCHAR(80) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS tarification;
CREATE TABLE tarification (
	id VARCHAR(80),
	valeur INT NOT NULL,
	PRIMARY KEY (id)
);
INSERT INTO tarification (id, valeur)VALUES('',3);

DROP TABLE IF EXISTS modele;
CREATE TABLE modele (
	id int AUTO_INCREMENT NOT NULL,
	name VARCHAR(200) NOT NULL,
	marque_id int NOT NULL,
	type_prise  VARCHAR (150) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS vehicule;
CREATE TABLE vehicule (
	id int AUTO_INCREMENT NOT NULL,
	proprietaire_id int NOT NULL,
	modele_id int NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reservation;
CREATE TABLE reservation (
	id int  AUTO_INCREMENT NOT NULL,
	borne_id int NOT NULL,
	vehicule_id int NOT NULL,
	date_reservation DATE NOT NULL,
	heure TIME NOT NULL,
	heure_fin TIME NOT NULL,
	PRIMARY KEY (id)
);



ALTER TABLE modele ADD CONSTRAINT modele_fk0 FOREIGN KEY (marque_id) REFERENCES marque(id);

ALTER TABLE vehicule ADD CONSTRAINT vehicule_fk0 FOREIGN KEY (proprietaire_id) REFERENCES user(id);

ALTER TABLE vehicule ADD CONSTRAINT vehicule_fk1 FOREIGN KEY (modele_id) REFERENCES modele(id);


ALTER TABLE reservation ADD CONSTRAINT reservation_fk0 FOREIGN KEY (borne_id) REFERENCES borne(id);

ALTER TABLE reservation ADD CONSTRAINT reservation_fk1 FOREIGN KEY (vehicule_id) REFERENCES vehicule(id);
