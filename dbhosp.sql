-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-12-2022 a las 02:32:50
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbhosp`
--
CREATE DATABASE `dbhosp`; 
USE hosp;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambiente`
--

CREATE TABLE `ambiente` (
  `idAmbiente` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ambiente`
--

INSERT INTO `ambiente` (`idAmbiente`, `nombre`, `disponible`) VALUES
(101, 'Habitación 101', 0),
(102, 'Habitación 102', 1),
(103, 'Habitación 103', 0),
(104, 'Habitación 104', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `ciPersonal` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoPrincipal` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoSecundario` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono` int(11) NOT NULL,
  `nacimiento` datetime NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `autoridad` int(11) NOT NULL,
  `cargo` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`ciPersonal`, `nombre`, `apellidoPrincipal`, `apellidoSecundario`, `telefono`, `nacimiento`, `password`, `autoridad`, `cargo`) VALUES
(9448270, 'Elian', 'Pacheco', '', 69530404, '2001-10-23 12:00:00', '$2b$12$iyYVv4v1zQkU8D0WkYjv5OSH7bAPtZProjxg1Wh5ZOc/B4oaGID4G', 2, 'Administrativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suceso`
--

CREATE TABLE `suceso` (
  `idSuceso` int(11) NOT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `idAmbiente` int(11) NOT NULL,
  `ciPersonal` int(11) NOT NULL,
  `ciUsuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `resultado` longtext COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `suceso`
--

INSERT INTO `suceso` (`idSuceso`, `tipo`, `idAmbiente`, `ciPersonal`, `ciUsuario`, `fecha`, `resultado`) VALUES
(1, 'Consulta', 104, 9448270, 9448271, '2022-11-28 12:19:20', 'Consulta especifica'),
(5, 'Análisis', 104, 9448270, 9448271, '2022-12-17 08:17:34', 'Análisis de Sangre.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ciUsuario` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoPrincipal` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoSecundario` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono` int(11) NOT NULL,
  `nacimiento` datetime NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ciUsuario`, `nombre`, `apellidoPrincipal`, `apellidoSecundario`, `telefono`, `nacimiento`, `password`) VALUES
(9448271, 'Juan', 'Quispe', 'Condori', 7777777, '2002-11-18 12:00:00', '$2b$12$vK83r/a3tt3ZCHSo.2YlGeqxESryd1jAkYJix0Ma3U3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  ADD PRIMARY KEY (`idAmbiente`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`ciPersonal`);

--
-- Indices de la tabla `suceso`
--
ALTER TABLE `suceso`
  ADD PRIMARY KEY (`idSuceso`),
  ADD KEY `FK_2` (`ciUsuario`),
  ADD KEY `FK_3` (`ciPersonal`),
  ADD KEY `FK_4` (`idAmbiente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ciUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `suceso`
--
ALTER TABLE `suceso`
  MODIFY `idSuceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `suceso`
--
ALTER TABLE `suceso`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`ciUsuario`) REFERENCES `usuario` (`ciUsuario`),
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`ciPersonal`) REFERENCES `personal` (`ciPersonal`),
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`idAmbiente`) REFERENCES `ambiente` (`idAmbiente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
