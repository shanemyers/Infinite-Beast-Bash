-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 14, 2015 at 07:51 AM
-- Server version: 5.6.20-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `names`
--

-- --------------------------------------------------------

--
-- Table structure for table `name`
--

CREATE TABLE IF NOT EXISTS `name` (
`ID` int(11) NOT NULL,
  `adjective` varchar(255) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `name`
--

INSERT INTO `name` (`ID`, `adjective`) VALUES
(1, 'Quick'),
(2, 'Depressed'),
(3, 'Zealous'),
(4, 'Violent'),
(5, 'Vibrant'),
(6, 'Twitchy'),
(7, 'Obtuse'),
(8, 'Withdrawn'),
(9, 'Obsessed'),
(10, 'Rabbit'),
(11, 'Cow'),
(12, 'Buzzy'),
(13, 'Sublime'),
(14, 'Chunky'),
(15, 'Normal'),
(16, 'Dieting'),
(17, 'Groovy'),
(18, 'Jazz Hands'),
(19, 'Pointy'),
(20, 'Not a'),
(21, 'Beast'),
(22, 'Bash'),
(23, 'Cunning'),
(24, 'Sensitive'),
(25, 'Teenage'),
(26, 'Fashionable'),
(27, 'Articulate'),
(28, 'Monster'),
(29, 'Yasmar'),
(30, 'Suffering'),
(31, 'Glowing'),
(32, 'LOUD'),
(33, 'Salty');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `name`
--
ALTER TABLE `name`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `name`
--
ALTER TABLE `name`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
