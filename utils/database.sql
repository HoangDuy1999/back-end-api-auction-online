-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th9 28, 2021 lúc 03:39 AM
-- Phiên bản máy phục vụ: 10.4.10-MariaDB
-- Phiên bản PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sandaugia`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` tinytext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass_word` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `evaluation_score` int(11) DEFAULT 10,
  `dob` datetime NOT NULL DEFAULT current_timestamp(),
  `role_id` int(11) NOT NULL,
  `rf_token` tinytext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`account_id`),
  KEY `role_id` (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`account_id`, `full_name`, `avatar`, `phone`, `pass_word`, `email`, `address`, `evaluation_score`, `dob`, `role_id`, `rf_token`, `status`) VALUES
(1, 'Trần Hoàng Duy', NULL, '', '$2a$10$okxSPSm3HOK.Zn9Ie5brMewUwbwxA47QzocCCdcdYK2b8Kun8zI9W', 'tranhoangduy.911@gmail.com', '1', 10, '2021-09-27 15:56:25', 1, '1', 1),
(2, 'Trần Hoàng Duy', NULL, NULL, '$2a$10$okxSPSm3HOK.Zn9Ie5brMewUwbwxA47QzocCCdcdYK2b8Kun8zI9W', 'tranhoangduy.911@gmail.vn', 'abc', 10, '2021-09-27 19:13:06', 1, NULL, 1),
(3, 'Trần Hoàng Duy', NULL, NULL, '$2a$10$dOJNCOemd/s/vlDlqoOS4Ot7OAeX9ZslgbrU1t/sTED3k2L/aZRHa', 'tranhoangduy1.911@gmail.vn', 'abc', 10, '2021-09-27 19:15:51', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auction`
--

DROP TABLE IF EXISTS `auction`;
CREATE TABLE IF NOT EXISTS `auction` (
  `auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`auction_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auction_detail`
--

DROP TABLE IF EXISTS `auction_detail`;
CREATE TABLE IF NOT EXISTS `auction_detail` (
  `auction_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `cost` double NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`auction_detail_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(255) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `evaluation_history`
--

DROP TABLE IF EXISTS `evaluation_history`;
CREATE TABLE IF NOT EXISTS `evaluation_history` (
  `evaluation_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `assessor` int(11) NOT NULL,
  `auction_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `description` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`evaluation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_cost` double NOT NULL,
  `step_cost` double NOT NULL,
  `current_cost` double NOT NULL,
  `buy_now` double NOT NULL,
  `start_day` datetime NOT NULL,
  `end_day` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `p_image_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`p_image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reject_auction`
--

DROP TABLE IF EXISTS `reject_auction`;
CREATE TABLE IF NOT EXISTS `reject_auction` (
  `reject auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`reject auction_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`role_id`, `name`, `description`, `status`) VALUES
(1, 'bidder', NULL, 1),
(2, 'seller', NULL, 1),
(3, 'administrators', NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
