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

CREATE TABLE `Borne` (
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

CREATE TABLE `Marque` (
	`id` int NOT NULL,
	`name` varchar(80) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Tarification` (
	`id` int NOT NULL,
	`valeur` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Modele` (
	`id` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`marque_id` int NOT NULL,
	`type_prise`  varchar (150) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `vehicule` (
	`id` int NOT NULL,
	`prorpietaire_id` int NOT NULL,
	`modele_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Reservation` (
	`id` int NOT NULL,
	`borne_id` int NOT NULL,
	`vehicule_id` int NOT NULL,
	`date_reservation` DATE NOT NULL,
	`heure` TIME NOT NULL,
	`heure_fin` TIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Borne` ADD CONSTRAINT `Borne_fk0` FOREIGN KEY (`tarification_id`) REFERENCES `Tarification`(`id`);

ALTER TABLE `Modele` ADD CONSTRAINT `Modele_fk0` FOREIGN KEY (`marque_id`) REFERENCES `Marque`(`id`);

ALTER TABLE `vehicule` ADD CONSTRAINT `vehicule_fk0` FOREIGN KEY (`prorpietaire_id`) REFERENCES `users`(`id`);

ALTER TABLE `vehicule` ADD CONSTRAINT `vehicule_fk1` FOREIGN KEY (`modele_id`) REFERENCES `Modele`(`id`);


ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk0` FOREIGN KEY (`borne_id`) REFERENCES `Borne`(`id_station`);

ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk1` FOREIGN KEY (`vehicule_id`) REFERENCES `vehicule`(`id`);

