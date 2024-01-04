create table accessibilite
(
    id     int auto_increment
        primary key,
    valeur varchar(255) not null
);

create table enseigne
(
    id   int auto_increment
        primary key,
    name varchar(255) not null
);

create table marque
(
    id   int auto_increment
        primary key,
    name varchar(255) not null
);

create table modele
(
    id         int auto_increment
        primary key,
    name       varchar(255) not null,
    marque_id  int          not null,
    type_prise varchar(255) not null,
    constraint marque_id
        foreign key (marque_id) references marque (id)
);

create table tarification
(
    id     int auto_increment
        primary key,
    valeur varchar(255) not null
);

create table borne
(
    id               int auto_increment
        primary key,
    name             varchar(255) not null,
    code_postal      int          not null,
    lng              float        not null,
    lat              float        not null,
    puissance        float        not null,
    tarification_id  int          not null,
    accessibilite_id int          not null,
    booked           tinyint(1)   not null,
    type_prise       varchar(255) not null,
    enseigne_id      int          not null,
    constraint accesibilite_id
        foreign key (accessibilite_id) references accessibilite (id),
    constraint enseigne_id
        foreign key (enseigne_id) references enseigne (id),
    constraint tarification_id
        foreign key (tarification_id) references tarification (id)
);

create table users
(
    id          int auto_increment
        primary key,
    firstname   varchar(255)         not null,
    lastname    varchar(255)         not null,
    code_postal int                  not null,
    ville       varchar(255)         not null,
    email       varchar(255)         not null,
    password    varchar(255)         not null,
    logged_in   tinyint(1) default 0 not null,
    nb_vehicule int                  not null,
    isAdmin     tinyint(1) default 0 not null,
    birthday    date                 not null,
    token       varchar(255)          null,
);

create table vehicule
(
    id              int auto_increment
        primary key,
    proprietaire_id int not null,
    modele_id       int not null,
    id_type_prise   int not null,
    constraint modele_id
        foreign key (modele_id) references modele (id),
    constraint proprietaire_id
        foreign key (proprietaire_id) references users (id)
);

create table reservation
(
    id          int auto_increment
        primary key,
    vehicule_id int  not null,
    borne_id    int  not null,
    date_book   date not null,
    heure       int  not null,
    constraint borne_id
        foreign key (borne_id) references borne (id),
    constraint vehicule_id
        foreign key (vehicule_id) references vehicule (id)
);

