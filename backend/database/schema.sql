
 DROP TABLE IF EXISTS user;
CREATE TABLE user (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstname VARCHAR(80) NOT NULL,
	lastname VARCHAR(80) NOT NULL,
	rue VARCHAR(255) NOT NULL,
	code_postal int NOT NULL,
	ville VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(80) NOT NULL,
	logged_in BOOLEAN NOT NULL,
	nb_vehicule int NOT NULL,
	is_admin BOOLEAN NOT NULL,
	anniversaire DATE NOT NULL,
	inscription DATE NOT NULL,
	derniere_maj DATE NOT NULL
	
);

DROP TABLE IF EXISTS borne;
CREATE TABLE borne (
    id_station VARCHAR(255) NOT NULL PRIMARY KEY,
	n_station VARCHAR(255) NOT NULL,
	ad_station VARCHAR(255) NOT NULL,
	code_insee INT NOT NULL,
	xlongitude FLOAT NOT NULL,
	ylatitude FLOAT NOT NULL,
	puiss_max FLOAT NOT NULL,
	tarification_id int NOT NULL,
	accessibilite VARCHAR(80) NOT NULL,
	type_prise VARCHAR(80) NOT NULL,
	n_enseigne  VARCHAR (80) NOT NULL,
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
	id int NOT NULL,
	valeur INT NOT NULL,
	PRIMARY KEY (id)
);

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
	prorpietaire_id int NOT NULL,
	modele_id int NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reservation;
CREATE TABLE reservation (
	id int  AUTO_INCREMENT NOT NULL,
	borne_id VARCHAR(255) NOT NULL,
	vehicule_id int NOT NULL,
	date_reservation DATE NOT NULL,
	heure TIME NOT NULL,
	heure_fin TIME NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE borne ADD CONSTRAINT borne_fk0 FOREIGN KEY (tarification_id) REFERENCES tarification(id);

ALTER TABLE modele ADD CONSTRAINT modele_fk0 FOREIGN KEY (marque_id) REFERENCES marque(id);

ALTER TABLE vehicule ADD CONSTRAINT vehicule_fk0 FOREIGN KEY (prorpietaire_id) REFERENCES user(id);

ALTER TABLE vehicule ADD CONSTRAINT vehicule_fk1 FOREIGN KEY (modele_id) REFERENCES modele(id);


ALTER TABLE reservation ADD CONSTRAINT reservation_fk0 FOREIGN KEY (borne_id) REFERENCES borne(id_station);

ALTER TABLE reservation ADD CONSTRAINT reservation_fk1 FOREIGN KEY (vehicule_id) REFERENCES vehicule(id);


