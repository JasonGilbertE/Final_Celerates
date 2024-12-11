-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 03:37 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `be_ecommerce`
--

--
-- Truncate table before insert `items`
--

TRUNCATE TABLE `items`;
--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `desc`, `info`, `strikeout_price`, `price`, `stock`, `category_id`, `count_sold`, `color`, `size`, `model`, `expiration_date`, `points`, `rating`, `createdAt`, `updatedAt`) VALUES
(2, 'Kemeja Batik Solo', 'Kemeja batik elegan dengan motif khas Solo.\r\n', '-', 30000, 250000, 19, 1, 1, 'Beragam mootif baik khas Solo', 'S, M, L ,K', '-', '2025-01-31 00:00:00', NULL, 0, '2024-12-08 17:54:30', '2024-12-10 14:14:22'),
(3, 'Kemeja Batik Biru', 'Kemeja batik dengan warna biru yang segar.\r\n', '-', 300000, 280000, 12, 1, 3, 'biru', 'S, M, L, XL', '-', '2025-01-31 00:00:00', NULL, 5, '2024-12-08 17:57:40', '2024-12-11 03:26:29'),
(4, 'Kemeja Batik Kebumen', 'Batik Kebumen dengan motif tradisional yang unik.\r\n', '-', 300000, 275000, 8, 1, 2, 'Coklat, Hutam', 'S, M, L, XL', '-', '2025-01-02 00:00:00', NULL, 0, '2024-12-08 18:02:12', '2024-12-11 01:52:58'),
(5, 'Blazer Batik Wanita', 'Blazer batik stylish dan modern.\r\n', '-', 300000, 280000, 20, 1, 5, 'Hitam, coklat, biru tua', 'S, M, L ,K', 'Kain  batik', '2025-01-01 00:00:00', NULL, 5, '2024-12-08 20:59:42', '2024-12-11 01:41:20'),
(6, 'Baju Surjan/Lurik', 'Baju tradisional Surjan dengan motif lurik.\r\n', '-', 200000, 170000, 29, 1, 1, 'Coklat, Hutam', 'S, M, L, XL', 'Kain lurik', '2025-01-01 00:00:00', NULL, 0, '2024-12-08 21:01:45', '2024-12-10 14:15:49'),
(7, 'Blouse batik kekinian', 'Tampil trendi dengan blouse batik kekinian yang memadukan motif tradisional dengan sentuhan desain modern.', '-', 300000, 290000, 19, 1, 1, 'Biru, hitam, merah, hijau', 'S, M, L, XL', 'Kain  batik', '2025-01-01 00:00:00', NULL, 3, '2024-12-08 21:04:32', '2024-12-10 14:17:28'),
(8, 'Gethuk Khas Jawa Tengah', 'Gethuk manis dan kenyal terbuat dari singkong yang dihaluskan.\r\n', '-', 0, 3000, 46, 2, 4, '-', '-', '-', '2024-12-16 00:00:00', NULL, 3, '2024-12-08 21:07:33', '2024-12-10 17:06:56'),
(9, 'Onde-onde Khas Jawa Tengah (per pcs)', 'Onde-onde lezat dengan isian kacang hijau dan balutan wijen', '-', 0, 3500, 49, 2, 1, '-', '-', '-', '2024-12-14 00:00:00', NULL, 0, '2024-12-08 21:09:51', '2024-12-10 15:19:25'),
(10, 'Wajik Khas Jawa Tengah (per pcs)', 'Wajik legit dari ketan dengan rasa manis gula merah.\r\n', '-', 0, 2500, 49, 2, 1, '-', '-', '-', '2024-12-18 00:00:00', NULL, 0, '2024-12-08 21:12:00', '2024-12-10 15:21:40'),
(11, 'Lumpia Asli Semarang (per pcs)', 'Lumpia renyah berisi rebung dan daging.\r\n', '-', 0, 10000, 46, 2, 4, '-', '-', '-', '2024-12-11 00:00:00', NULL, 5, '2024-12-08 21:13:29', '2024-12-10 23:23:25'),
(12, 'Wingko Babat Asli Jawa Tengah (per psc)', 'Wingko babat lembut dengan rasa kelapa.\r\n', '-', 0, 7000, 40, 2, 0, '-', '-', '-', '2024-12-16 00:00:00', NULL, 0, '2024-12-08 21:15:06', '2024-12-08 21:15:06'),
(13, 'Serabi Solo (per pcs)', 'Serabi Solo lembut dan gurih dengan kuah kinca manis.', '-', 0, 3500, 60, 2, 0, '-', '-', '-', '2024-12-10 00:00:00', NULL, 0, '2024-12-08 21:16:29', '2024-12-08 21:16:29'),
(14, 'Peralatan Minum dari Tempurung Kelapa', 'peralatan minum yang terbuat dari tempurung kelapa berkualitas tinggi. \r\n', '-', 0, 90000, 20, 3, 0, 'coklat', 'Kapasitas 200 ml, 300 ml, 400 ml', '-', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:19:34', '2024-12-08 21:19:34'),
(15, 'Gantungan Kunci Topeng Tradisional Sanggar Jaka Baru', 'Gantungan kunci yang dibuat dengan detail tinggi, gantungan kunci ini cocok untuk dijadikan souvenir atau koleksi pribadi.\r\n', '-', 0, 17000, 30, 3, 0, 'coklat, hitam, merah', '5 cm x 3 cm', '-', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:21:21', '2024-12-08 21:21:21'),
(16, 'Celengan Kayu Handmade', 'Celengan kayu handmade asli kayu jati.\r\n', '-', 0, 70000, 40, 3, 0, '-', '-', '-', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:23:08', '2024-12-08 21:23:08'),
(17, 'Kerajinan Tempurung Kelapa untuk Hiasan Rumah', 'Kerajinan hiasan rumah dari tempurung kelapa. \r\nMaterial: Tempurung kelapa asli\r\n', '-', 0, 80000, 60, 3, 0, '-', '-', '-', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:24:55', '2024-12-08 21:24:55'),
(18, 'Wayang Semar Buatan Tangan', 'Wayang Semar dibuat dengan tangan oleh pengrajin ahli, wayang ini cocok untuk dekorasi rumah atau koleksi pribadi.\r\n', '-', 0, 170000, 40, 3, 0, 'Beragam warna sesuai karakter', '30 cm x 15 cm', '-', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:26:45', '2024-12-08 21:26:45'),
(19, 'Rotan Gajah Tempet Tisu', 'empat tisu berbentuk gajah dari rotan ini tidak hanya fungsional tetapi juga artistik. \r\n', '-', 0, 230000, 60, 3, 0, 'Warna rotan alami', '20 cm x 20 cm', 'Rotan asli', '2025-01-09 00:00:00', NULL, 0, '2024-12-08 21:28:57', '2024-12-08 21:28:57'),
(24, 'Jenang Krasikan', 'Jenang krasikan berasal dari Kabupaten Purworejo, Jawa Tengah. Jenang berwarna cokelat ini dibuat dari gula merah, tepung ketan, santan, dan garam.Seperti makanan Jawa pada umumnya, krasikan mengalami proses memasak yang cukup lama. Proses masaknya mulai ', '-', 0, 15000, 20, 2, 0, '-', '-', 'gula merah, tepung ketan, santan, dan garam.  ', '2024-12-18 00:00:00', 0, 0, '2024-12-10 23:31:40', '2024-12-10 23:31:40'),
(25, 'Telor asin khas Brebes (per butir)', 'Telur asin Brebes memiliki ciri khas dibandingkan telur asin lainnya, yaitu komposisi pengolahan pengasinan telur akan menghasilkan rasa telur asin yang masir. Dimana telur terasa gurih dan mengeluarkan minyak berwarna jingga pekat. Sehingga ketahanan tel', '-', 0, 5000, 95, 2, 5, '-', '-', '-', '2024-12-25 00:00:00', 5, 4.5, '2024-12-10 23:36:21', '2024-12-10 23:48:02'),
(26, 'Bapia khas jawa tengah', 'khas jawa tengah', '-', 0, 35000, 100, 2, 0, '-', '-', '-', '2024-12-25 00:00:00', 0, 0, '2024-12-11 01:43:10', '2024-12-11 01:43:10'),
(27, 'Combro Daging', 'khas Jawa Tengah', '-', 0, 6000, 50, 2, 0, '-', '-', '-', '2024-12-13 00:00:00', 0, 0, '2024-12-11 01:55:24', '2024-12-11 01:55:24'),
(28, 'kerupuk karpet', 'khas jawa tengah', '-', 0, 20000, 60, 2, 0, '-', '-', '-', '2025-01-11 00:00:00', 0, 0, '2024-12-11 03:28:53', '2024-12-11 03:28:53');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
