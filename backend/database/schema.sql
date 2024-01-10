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
	password VARCHAR(300) NOT NULL,
	connection DATE NULL,
	nb_vehicule int NOT NULL,
	admin BOOLEAN NOT NULL,
	anniversaire DATE NOT NULL,
	inscription DATE NOT NULL,
	derniere_maj DATE NOT NULL,
  token VARCHAR(255) NULL
);
INSERT INTO user (nom, prenom, rue, code_postal,ville, email, password, connection, nb_vehicule, admin, anniversaire, inscription, derniere_maj)
 VALUES('debarge', 'morgane', 'rue dupont', 75000, 'Arnac', 'morgane@debarge.fr', '$argon2id$v=19$m=19456,t=2,p=1$AHLIs9tC/Ye3lBxqGrz57A$svfAn+6veHtuvvce+dx9k1FZ+8GXamO8MM0elTLlpwQ', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('save', 'baptiste', 'rue dupont', 75000, 'Arnac', 'baptiste@save.fr', '$argon2id$v=19$m=19456,t=2,p=1$x0IxEYRVCwCRVt3sNkETeA$JlNKV1ORQzWEf6mD7F+70Iwwb3GU8vBHId0G55Kj1Yc', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('foulon', 'raphael', 'rue dupont', 75000, 'Arnac', 'raphael@foulon.fr', '$argon2id$v=19$m=19456,t=2,p=1$H66tZbWq7npkmuCZ7d0u4g$1pl9ttBn48SwqktvlwM2qA/YGCoEJy+0bGzol9TuZjg', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09'),
 ('illien', 'jeremy', 'rue dupont', 75000, 'Arnac', 'jeremy@illien.fr', '$argon2id$v=19$m=19456,t=2,p=1$i8Rox6tnfRoG5BFZTg8cfA$rcvzkFE1hCFMMQMt4XDyVGaQSb7sriIztN0dN3GGe68', false, 1, true, '1990-01-01', '2023-01-09', '2023-01-09');

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
