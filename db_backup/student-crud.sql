-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 14 Haz 2019, 22:44:26
-- Sunucu sürümü: 5.7.26
-- PHP Sürümü: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `student-crud`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
CREATE TABLE IF NOT EXISTS `classrooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `classrooms`
--

INSERT INTO `classrooms` (`id`, `name`) VALUES
(1, 'Murat Sınıfı'),
(2, 'Fatih Sultan Sınıfı'),
(3, 'Ahmet Sınıfı'),
(4, 'Mustafa Sınıfı'),
(5, 'A Sınıfı'),
(6, 'B Sınıfı'),
(7, 'New classroom');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `classroom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `courses`
--

INSERT INTO `courses` (`id`, `name`, `classroom_id`) VALUES
(1, 'Mathematics', 1),
(2, 'Phycics 2', 3),
(3, 'Database Managment', 2),
(4, 'Computer Engineering', 3),
(5, 'Image Processing', 4),
(6, 'Network', 4),
(7, 'Microprocessors', 4),
(8, 'Pattern Recognation', 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `stakesc`
--

DROP TABLE IF EXISTS `stakesc`;
CREATE TABLE IF NOT EXISTS `stakesc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `stakesc`
--

INSERT INTO `stakesc` (`id`, `student_id`, `course_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(4, 2, 1),
(5, 2, 5),
(6, 3, 1),
(7, 3, 2),
(8, 3, 3),
(9, 3, 4),
(10, 4, 5),
(11, 5, 3),
(12, 5, 4),
(13, 5, 5),
(14, 1, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `students`
--

INSERT INTO `students` (`id`, `name`, `surname`) VALUES
(1, 'Metin', 'Sarıtaş'),
(2, 'Testad', 'Testsoyad'),
(3, 'Testname', 'Testsurname'),
(4, 'Ahmetin', 'Başka'),
(5, 'Tuanna', 'Başak'),
(6, 'ss', 'Sarıtaş'),
(7, 'Hey', 'Te');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
