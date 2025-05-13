-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2024 at 09:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `all_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `amcslogo`
--

CREATE TABLE `amcslogo` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `url` text NOT NULL,
  `logo` text NOT NULL,
  `show_hide` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amcslogo`
--

INSERT INTO `amcslogo` (`id`, `name`, `url`, `logo`, `show_hide`) VALUES
(1, '360-one', '', '360-one-mf.webp', 0),
(2, 'aditya-birla-sun-life', '', 'aditya-birla-sun-life-mf.webp', 0),
(3, 'axis', '', 'axis-mf.webp', 0),
(4, 'bajaj-finserv', '', 'bajaj-finserv.webp', 0),
(5, 'bandhan-mf', '', 'bandhan-mf.webp', 0),
(6, 'bank-of-india', '', 'bank-of-india-mf.webp', 0),
(7, 'baroda-bnp-paribas', '', 'baroda-bnp-paribas-mf.webp', 0),
(8, 'canara-robeco', '', 'canara-robeco-mf.webp', 0),
(9, 'dsp', '', 'dsp-mf.webp', 0),
(10, 'edelweiss', '', 'edelweiss-mf.webp', 0),
(11, 'franklin-templeton', '', 'franklin-templeton-mf.webp', 0),
(12, 'groww', '', 'groww-mf.webp', 0),
(13, 'hdfc', '', 'hdfc-mfs.webp', 0),
(14, 'helios', '', 'helios-mf.webp', 0),
(15, 'hsbc', '', 'hsbc-mf.webp', 0),
(16, 'icici-prudential', '', 'icici-prudential-mf.webp', 0),
(17, 'invesco', '', 'invesco-mfs.webp', 0),
(18, 'iti', '', 'iti-mf.webp', 0),
(19, 'jm-financial', '', 'jm-financial-mf.webp', 0),
(20, 'kotak-mahindra', '', 'kotak-mahindra-mf.webp', 0),
(21, 'lic', '', 'lic-mf.webp', 0),
(22, 'mahindra-manulife', '', 'mahindra-manulife-mf.webp', 0),
(23, 'mirae-asset', '', 'mirae-asset-mf.webp', 0),
(24, 'motilal-oswal', '', 'motilal-oswal-mf.webp', 0),
(25, 'navi', '', 'navi-mf.webp', 0),
(26, 'nippon-india', '', 'nippon-india-mf.webp', 0),
(27, 'nj', '', 'nj-mf.webp', 0),
(28, 'pgim-india', '', 'pgim-india-mf.webp', 0),
(29, 'ppfas', '', 'ppfas-mf.webp', 0),
(30, 'quant', '', 'quant-mf.webp', 0),
(31, 'quantum', '', 'quantum-mf.webp', 0),
(32, 'samco', '', 'samco-mf.webp', 0),
(33, 'sbi', '', 'sbi-mf.webp', 0),
(34, 'shriram', '', 'shriram-mf.webp', 0),
(35, 'sundaram', '', 'sundaram-mf.webp', 0),
(36, 'tata', '', 'tata-mf.webp', 0),
(37, 'taurus', '', 'taurus-mf.webp', 0),
(38, 'trust', '', 'trust-mf.webp', 0),
(39, 'union', '', 'union-mf.webp', 0),
(40, 'uti', '', 'uti-mfs.webp', 0),
(41, 'whiteoak-capital', '', 'whiteoak-capital-mf.webp', 0),
(42, 'zerodha', '', 'zerodha-mf.webp', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amcslogo`
--
ALTER TABLE `amcslogo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amcslogo`
--
ALTER TABLE `amcslogo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
