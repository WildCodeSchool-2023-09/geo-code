USE p3;
 DROP TABLE IF EXISTS 'users';
CREATE TABLE `users` (
	`id` int NOT NULL,
	`firstname` varchar(80) NOT NULL,
	`lastname` varchar(80) NOT NULL,
	`rue` varchar(255) NOT NULL
	`code_postal` int NOT NULL,
	`ville` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(80) NOT NULL,
	`logged_in` BOOLEAN NOT NULL,
	`nb_vehicule` int NOT NULL,
	`is_admin` BOOLEAN NOT NULL,
	`anniversaire` DATE NOT NULL,
	`inscription` DATE NOT NULL,
	`derniere_maj` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS 'Bornes';
CREATE TABLE `Bornes` (
	`id_station` varchar(255) NOT NULL,
	`n_station` varchar(255) NOT NULL,
	`ad_station` varchar(255) NOT NULL,
	`code_insee` INT NOT NULL,
	`xlongitude` FLOAT NOT NULL,
	`ylatitude` FLOAT NOT NULL,
	`puiss_max` FLOAT NOT NULL,
	`tarification_id` int NOT NULL,
	`accessibilite` varchar(80) NOT NULL,
	`type_prise` varchar(80) NOT NULL,
	`n_enseigne`  varchar (80) NOT NULL,
	`date_maj` DATE NOT NULL,
	PRIMARY KEY (`id_station`)
);

DROP TABLE IF EXISTS 'Marque';
CREATE TABLE `Marque` (
	`id` int NOT NULL,
	`name` varchar(80) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS 'Tarification';
CREATE TABLE `Tarification` (
	`id` int NOT NULL,
	`valeur` INT NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS 'Modele';
CREATE TABLE `Modele` (
	`id` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`marque_id` int NOT NULL,
	`type_prise`  varchar (150) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS 'Vehicule';
CREATE TABLE `Vehicule` (
	`id` int NOT NULL,
	`prorpietaire_id` int NOT NULL,
	`modele_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS 'Reservation';
CREATE TABLE `Reservation` (
	`id` int NOT NULL,
	`borne_id` int NOT NULL,
	`vehicule_id` int NOT NULL,
	`date_reservation` DATE NOT NULL,
	`heure` TIME NOT NULL,
	`heure_fin` TIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Bornes` ADD CONSTRAINT `Borne_fk0` FOREIGN KEY (`tarification_id`) REFERENCES `Tarification`(`id`);

ALTER TABLE `Modele` ADD CONSTRAINT `Modele_fk0` FOREIGN KEY (`marque_id`) REFERENCES `Marque`(`id`);

ALTER TABLE `Vehicule` ADD CONSTRAINT `vehicule_fk0` FOREIGN KEY (`prorpietaire_id`) REFERENCES `users`(`id`);

ALTER TABLE `Vehicule` ADD CONSTRAINT `vehicule_fk1` FOREIGN KEY (`modele_id`) REFERENCES `Modele`(`id`);


ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk0` FOREIGN KEY (`borne_id`) REFERENCES `Bornes`(`id_station`);

ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk1` FOREIGN KEY (`vehicule_id`) REFERENCES `Vehicule`(`id`);

LOAD DATA INFILE 'bornes-irve-borne-irve.csv' INTO TABLE Borne
FIELDS TERMINATED BY ','
IGNORE 1 LINES;
