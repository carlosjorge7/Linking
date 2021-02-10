/*
CREATE DATABASE `links_app`;
USE `links_app`;

create table `users`(
    `idUser` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(16) not null,
    `password` varchar(60) not null,
    `fullname` varchar(100) not null, 
    primary key(`idUser`)
) 

create table `links`(
    `idLink` int(11) not null AUTO_INCREMENT,
    `title` varchar(150) not null,
    `url` varchar(255) not null,
    `description` text,
    `created_at` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    `idUser` int(11) default null,
    PRIMARY KEY (`idLink`),
    KEY `fk_user_idx` (`idUser`),
    CONSTRAINT `fk_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON UPDATE CASCADE
) 


*/