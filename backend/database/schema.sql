-- SQLBook: Code


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
INSERT INTO user (nom, prenom, rue, code_postal,ville, email, password, connection, nb_vehicule, admin, anniversaire, inscription, derniere_maj)
 VALUES('debarge', 'morgane', 'rue dupont', 75000, 'Arnac', 'morgane@debarge.fr', 'Morgane1', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('save', 'baptiste', 'rue dupont', 75000, 'Arnac', 'baptiste@save.fr', 'Baptiste1', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('foulon', 'raphael', 'rue dupont', 75000, 'Arnac', 'raphael@foulon.fr', 'Raphael1', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('illien', 'jeremy', 'rue dupont', 75000, 'Arnac', 'jeremy@illien.fr', 'Jeremy11', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09');

DROP TABLE IF EXISTS borne;
CREATE TABLE borne (
  id VARCHAR(250)  NOT NULL PRIMARY KEY,
	id_station VARCHAR (80) NOT NULL,
	n_station VARCHAR(255)  NOT NULL,
	ad_station VARCHAR(255)  NOT NULL,
	code_postal VARCHAR (80)  NOT NULL,
	lng FLOAT NOT NULL,
	lat FLOAT NOT NULL,
	puiss_max VARCHAR(80) NOT NULL,
	accessibilite VARCHAR(80)  NOT NULL,
	type_prise VARCHAR(250)  NOT NULL,
	n_enseigne  VARCHAR (80)  NOT NULL,
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
	borne_id VARCHAR(250) NOT NULL,
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
