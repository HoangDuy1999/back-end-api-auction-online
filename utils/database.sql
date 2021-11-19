-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 19, 2021 lúc 09:57 AM
-- Phiên bản máy phục vụ: 5.7.31
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `Gender` text COLLATE utf8mb4_unicode_ci,
  `avatar` tinytext COLLATE utf8mb4_unicode_ci,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass_word` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `evaluation_score` int(11) DEFAULT '10',
  `dob` datetime DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `rf_token` tinytext COLLATE utf8mb4_unicode_ci,
  `request_update` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`account_id`),
  KEY `role_id` (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`account_id`, `full_name`, `Gender`, `avatar`, `phone`, `pass_word`, `email`, `address`, `evaluation_score`, `dob`, `role_id`, `rf_token`, `request_update`, `status`) VALUES
(1, 'Trần Hoàng Duy', 'Nam', NULL, '0938505050', '$2a$10$66aWymj3124LQD5xofSiT.otLdVUSH9r1EpNOloli5hIGUWNTORgu', 'tranhoangduy.911@gmail.com', '123 cách mạng tháng 8, phường 15, quận `0, hcm', 10, NULL, 1, 'px39Lv90WDtvTTBt9qpDdjAwFRp7t6S86atcKPCB7HUHwOUlc5dzQfcZqix8yRuxHr91FcMYt3OCQUcm', 0, 1),
(2, 'Nguyễn Đức Hiển', 'Nữ', NULL, '0938505051', '$2a$10$QDW6JaTfjTCawaxN1ZZlY.qdAlSmrQItYhzizNja6X2mnHltyg9vC', 'hadesduy0001@gmail.com', '125/2 cách mạng tháng 8, phuong 12, quận 10, hcm', 10, NULL, 1, 'CtZk0wO4YsNKZkaZWarmjkqvHD45byRl7nijBDEPKCgJnPu69v9KV8Kdj83q1lt0L48MOITcZ1vO4TUF', 0, 1),
(3, 'Nguyễn Trấn Hề', 'Nam', NULL, '093850502', '$2a$10$dMyuWlZPlGj4bjOqogWejeOk6H4Yd147shTEfz3UIvRW5HV8o4Slm', 'hadesduy0002@gmail.com', '342 quang trung, phuong 12, quận 10, hcm', 10, NULL, 2, 'GJLlMeiQnUHkamcBHszTLsWEHoLPRieGp7UZMiZ8UgFrE0hRP6bF4usvjAKcbQBqg9xA4ptBt69IqaVU', 0, 1),
(4, 'Võ Hoài Luôn', 'Nam', NULL, '0938505054', '$2a$10$nUOs0mIHgkBoTdCSO/qZ6OmECIvaXe5K4063.uGB2r7hEtEYb/DPa', 'hadesduy0003@gmail.com', '569 bến nghé, phuong 12, quận 10, hcm', 10, NULL, 2, NULL, 0, 1),
(5, 'Đàm tướng cướp', 'Nam', NULL, '0938505055', '$2a$10$wuwHNF6at692plNbWbjpXeJESCTywWIkXpZaDVjh2vHkwqhE.fgR.', 'hadesduy0004@gmail.com', '378 vùng đát cấm, phuong 12, quận 10, hcm', 10, NULL, 2, NULL, 0, 1),
(6, 'Lê Ngọc Ân', 'Nam', NULL, '0938505056', '$2a$10$ZfYq2rJE.3PUbnaoiDxgk.40.8LknCxUFKqkT2Y/KZb2QG/PhXmym', 'an9x0010@gmail.com', '378 hòa thái đường, phuong 12, quận 10, hcm', 10, NULL, 3, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auction`
--

DROP TABLE IF EXISTS `auction`;
CREATE TABLE IF NOT EXISTS `auction` (
  `auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `bidder_id` int(11) DEFAULT NULL,
  `is_buy_now` tinyint(1) NOT NULL DEFAULT '0',
  `is_send_notification` tinyint(1) NOT NULL DEFAULT '0',
  `current_cost` double DEFAULT NULL,
  `count_auction` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`auction_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `auction`
--

INSERT INTO `auction` (`auction_id`, `product_id`, `bidder_id`, `is_buy_now`, `is_send_notification`, `current_cost`, `count_auction`, `created_at`, `status`) VALUES
(1, 1, NULL, 0, 0, NULL, 0, '2021-09-29 08:11:52', 1),
(2, 2, NULL, 0, 0, NULL, 0, '2021-09-29 08:11:52', 1),
(3, 3, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(4, 4, 2, 0, 0, 50100000, 2, '2021-09-29 08:13:32', 1),
(5, 5, 1, 0, 0, 92100000, 4, '2021-09-29 08:13:32', 1),
(6, 6, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(7, 7, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(8, 8, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(9, 9, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(10, 10, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(11, 11, 1, 0, 0, 95100000, 2, '2021-09-29 08:13:32', 1),
(12, 12, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(13, 13, 2, 0, 0, 40100000, 2, '2021-09-29 08:13:32', 1),
(14, 14, 2, 0, 0, 30100000, 2, '2021-09-29 08:13:32', 1),
(15, 15, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(16, 16, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(17, 17, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(18, 18, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(19, 19, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(20, 20, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(21, 21, 2, 0, 0, 10100000, 6, '2021-09-29 08:13:32', 1),
(22, 22, 1, 0, 0, 600000, 5, '2021-09-29 08:13:32', 1),
(23, 23, 2, 0, 0, 988999, 2, '2021-09-29 08:13:32', 1),
(24, 24, 2, 0, 0, 800000, 3, '2021-09-29 08:13:32', 1),
(25, 25, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(26, 26, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(27, 27, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(28, 28, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(29, 29, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(30, 30, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(31, 31, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(32, 32, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(33, 33, NULL, 0, 0, NULL, 0, '2021-09-29 08:13:32', 1),
(35, 36, NULL, 0, 0, NULL, 0, '2021-10-22 02:31:22', 1),
(36, 37, NULL, 0, 0, NULL, 0, '2021-10-22 02:40:30', 1),
(37, 38, NULL, 0, 0, NULL, 0, '2021-10-22 02:45:36', 1),
(38, 39, NULL, 0, 0, NULL, 0, '2021-10-22 02:48:54', 1),
(39, 40, NULL, 0, 0, NULL, 0, '2021-10-22 02:51:44', 1),
(40, 41, NULL, 0, 0, NULL, 0, '2021-10-22 02:54:38', 1),
(41, 42, 2, 0, 0, 12100000, 3, '2021-11-19 04:21:56', 1),
(42, 43, 2, 0, 1, 11500000, 4, '2021-11-19 05:18:17', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auction_detail`
--

DROP TABLE IF EXISTS `auction_detail`;
CREATE TABLE IF NOT EXISTS `auction_detail` (
  `auction_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_id` int(11) NOT NULL,
  `bidder_id` int(11) NOT NULL,
  `cost` double NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`auction_detail_id`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `auction_detail`
--

INSERT INTO `auction_detail` (`auction_detail_id`, `auction_id`, `bidder_id`, `cost`, `description`, `created_at`, `status`) VALUES
(47, 23, 1, 888999, 'Đấu giá', '2021-11-19 06:36:41', 1),
(46, 22, 1, 800000, 'Đấu giá', '2021-11-19 06:35:25', 1),
(45, 22, 1, 600000, 'Đấu giá', '2021-11-19 06:34:52', 0),
(44, 22, 2, 500000, 'Đấu giá', '2021-11-19 06:34:30', 1),
(35, 21, 2, 17000000, 'Đấu giá', '2021-11-19 06:12:42', 1),
(34, 21, 1, 1600000, 'Đấu giá', '2021-11-19 06:08:06', 0),
(33, 21, 1, 1300000, 'Đấu giá', '2021-11-19 06:07:53', 0),
(32, 21, 1, 1200000, 'Đấu giá', '2021-11-19 06:06:36', 0),
(31, 21, 1, 1000000, 'Đấu giá', '2021-11-19 06:04:44', 0),
(29, 42, 1, 10000000, 'Đấu giá', '2021-11-19 05:46:46', 1),
(30, 21, 2, 900000, 'Đấu giá', '2021-11-19 05:58:31', 1),
(43, 22, 2, 360000, 'Đấu giá', '2021-11-19 06:34:19', 0),
(42, 22, 1, 350000, 'Đấu giá', '2021-11-19 06:34:00', 1),
(48, 23, 2, 4000000, 'Đấu giá', '2021-11-19 06:36:57', 1),
(49, 24, 2, 500000, 'Đấu giá', '2021-11-19 06:37:35', 1),
(50, 24, 1, 700000, 'Đấu giá', '2021-11-19 06:37:45', 1),
(51, 24, 2, 801000, 'Đấu giá', '2021-11-19 06:37:57', 1),
(52, 11, 2, 95000000, 'Đấu giá', '2021-11-19 06:39:18', 1),
(53, 11, 1, 96000000, 'Đấu giá', '2021-11-19 06:39:38', 1),
(54, 5, 1, 89000000, 'Đấu giá', '2021-11-19 06:40:08', 1),
(55, 5, 2, 92000000, 'Đấu giá', '2021-11-19 06:40:20', 1),
(56, 5, 1, 9999999, 'Đấu giá', '2021-11-19 06:40:35', 0),
(57, 5, 1, 99999999, 'Đấu giá', '2021-11-19 06:40:44', 1),
(58, 4, 1, 50000000, 'Đấu giá', '2021-11-19 06:41:11', 1),
(59, 13, 1, 40000000, 'Đấu giá', '2021-11-19 06:41:27', 1),
(60, 14, 1, 30000000, 'Đấu giá', '2021-11-19 06:41:43', 1),
(61, 4, 2, 60000000, 'Đấu giá', '2021-11-19 06:41:59', 1),
(62, 13, 2, 90000000, 'Đấu giá', '2021-11-19 06:42:19', 1),
(63, 14, 2, 72000000, 'Đấu giá', '2021-11-19 06:42:40', 1),
(65, 41, 1, 12000000, 'Đấu giá', '2021-11-19 06:55:24', 1),
(66, 42, 2, 9000000, 'Đấu giá', '2021-11-19 07:04:40', 0),
(68, 42, 2, 12000000, 'Đấu giá', '2021-11-19 07:33:51', 1),
(69, 42, 1, 11500000, 'Đấu giá', '2021-11-19 07:36:32', 0),
(70, 41, 2, 6500000, 'Đấu giá', '2021-11-19 09:39:27', 0),
(71, 41, 2, 15000000, 'Đấu giá', '2021-11-19 09:47:48', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(255) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`category_id`, `type_id`, `name`, `alias`, `description`, `status`) VALUES
(1, 1, 'Điện Thoại Di Động', 'dien-thoai-di-dong', NULL, 1),
(2, 1, 'Máy Tính Xách Tay', 'may-tinh-xach-tay', NULL, 1),
(3, 2, 'Giày Dép', 'giay-dep', NULL, 1),
(4, 2, 'Quần Áo Phụ Nữ', 'quan-ao-phu-nu', NULL, 1),
(5, 3, 'Xe cộ', 'xe-co', NULL, 1),
(6, 3, 'Búp Bê', 'bup-be', NULL, 1),
(7, 4, 'Bàn Ghế', 'ban-ghe', NULL, 1),
(8, 4, 'Giường Ngủ', 'giuong-ngu', NULL, 1);

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
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`evaluation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `evaluation_history`
--

INSERT INTO `evaluation_history` (`evaluation_id`, `account_id`, `assessor`, `auction_id`, `score`, `created_at`, `description`) VALUES
(1, 1, 2, 2, 1, '2021-10-17 09:14:44', 'lịch sử đánh giá'),
(2, 1, 2, 2, 1, '2021-10-17 09:14:44', 'lịch sử đánh giá'),
(3, 1, 2, 2, 1, '2021-10-17 09:14:44', 'lịch sử đánh giá'),
(4, 1, 2, 2, 1, '2021-10-17 09:14:44', 'acc');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_cost` double NOT NULL,
  `step_cost` double DEFAULT '100000',
  `buy_now` double DEFAULT NULL,
  `start_day` datetime NOT NULL,
  `end_day` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_auto_renew` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`product_id`, `seller_id`, `type_id`, `category_id`, `name`, `image`, `start_cost`, `step_cost`, `buy_now`, `start_day`, `end_day`, `created_at`, `description`, `is_auto_renew`, `status`) VALUES
(1, 4, 1, 1, 'iPhone 7 32GB Black. ', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/1.jpg?alt=media&token=6391f76f-ffa4-4402-a5ef-5cb0574ea55f', 5000000, 100000, 8000000, '2021-11-19 10:10:00', '2021-11-25 10:10:00', '2021-09-28 10:28:15', '<p>“In excellent condition UNLOCKED iPhone 7 32GB Black. This iPhone 7 32GB Black smartphone can be used with all carriers in the USA, including Verizon, T-Mobile, AT&T and more. Tested by our tech facility for full functionality. Cleaned and sanitized before shipment. Only the phone will be shipped. Accessories are not included (charging cable is included and charger is not included) Screen is free of cracks or scratches, fully functional. Minor cosmetic blemishes may exist on the body of the phone as this is a refurbished unit.”</p>', 0, 1),
(42, 3, 1, 1, 'iPad Air 4', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F5.jfif?alt=media&token=8780b7c4-9d35-490b-addf-46cde2a008a6', 6000000, 100000, 0, '2021-11-19 10:11:00', '2021-11-23 12:11:00', '2021-11-19 04:21:56', '<span> <span> <span> <span> <span> <p>&nbsp;Giảm 20% khi mua bao da, ốp lưng</p><p>- Học sinh, sinh viên giảm 100.000đ</p><p>-&nbsp;<a href=\"https://24hstore.vn/sac-du-phong\" rel=\"noopener noreferrer\" target=\"_blank\">Sạc sự phòng chính hãng&nbsp;</a>giảm còn 160.000đ</p><p>-&nbsp;<a href=\"https://24hstore.vn/tai-nghe\" rel=\"noopener noreferrer\" target=\"_blank\">Tai nghe bluetooth chính hãng&nbsp;</a>giảm còn 550.000đ</p><h2><strong>cập nhật</strong></h2> </span> <h2><strong>cập nhật</strong></h2> </span> <h2>cập nhật 3</h2> </span> <p>aaaa</p> </span> <h2><strong>Cập nhật duy</strong></h2> </span> ', 1, 1),
(2, 3, 1, 1, 'Apple iPhone XR White - 64GB - Unlocked điện thoại', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/2.jpg?alt=media&token=dd49831a-3306-4d3a-82a8-13e0cfad98e9', 2000000, 100000, 3000000, '2021-11-19 10:10:00', '2021-11-25 10:10:00', '2021-09-28 10:38:04', '<p>\r\nApple iPhone XR White - 64GB - Unlocked.\r\nRear Camera isn’t working.Face ID isn’t working.Back is cracked.Other than those issues the phone works great.\r\n</p>', 0, 1),
(3, 3, 1, 1, 'Apple iPhone 7 32GB Black (Verizon) A1660 (CDMA GSM) UNLOCKED Brand New SEALED', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/3.jpg?alt=media&token=54bc13be-04ee-483e-8233-ae681869a438', 1234567, 100000, 12345678, '2021-11-19 10:10:00', '2021-11-25 10:10:00', '2021-09-28 10:52:51', '<p>\r\nAbout this product\r\nProduct Information\r\nThe iPhone 7 is a smartphone by Apple with a black finish. The iPhone 7 is powered by quad-core processor, a six-core graphics processor, and 2 GB of RAM. The phone features a water resistant casing with an oleophobic coating, a pressure sensitive Home button with a built-in fingerprint sensor, a 4.7 inches Retina HD display with a 750 x 1334 pixels resolution at 326 ppi pixel density, and stereo speakers. The built-in lithium-ion battery provides enough power to support up to 14 hours of talk time or mobile data usage and up to 10 days of standby. A 12 MP camera captures your precious moments with auto image stabilization and HDR while a 7 MP front facing camera allows for high quality video calls. The phone measures 138.3 x 67.1 x 7.1 mm, weighs 138 g and has a memory capacity of 32 GB. This device is locked to Verizon and compatible with Sprint, Straight Talk, U.S. Cellular, Virgin Mobile, Boost Mobile, Xfinity, TracFone Carriers.\r\n</p>', 0, 1),
(4, 3, 1, 1, 'Apple IPhone XS (512 GB) Boxed Inc. Accessories.', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/4.jfif?alt=media&token=e470fefb-32d1-4baa-9a55-57c76453b05b', 44342453, 100000, NULL, '2021-11-19 10:10:00', '2021-11-25 10:10:00', '2021-09-28 10:57:23', '', 0, 1),
(5, 3, 1, 1, 'Apple iPhone 5S A1553 Smartphone Space Gray / 16GB / GSM Unlocked', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/5.jfif?alt=media&token=60888762-9ca2-44c0-a8c9-b333fc92b14c', 87876456, 100000, NULL, '2021-11-19 10:10:00', '2021-11-25 10:10:00', '2021-09-28 11:02:46', '<p>\r\nUsed: An item that has been used previously. The item may have some signs of cosmetic wear, but is fully operational and functions as intended. This item may be a floor model or store return that has been used. See the seller’s listing for full details and description of any imperfections\r\n</p>', 0, 1),
(6, 3, 1, 1, 'Samsung Galaxy S10+ Plus G975U T-Mobile AT&T Sprint Verizon Unlocked - Good ', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/6.jfif?alt=media&token=28426ec8-e05d-4c15-a905-8e0771d077b9', 4534223, 100000, NULL, '2021-11-18 10:10:00', '2021-11-25 10:10:00', '2021-09-28 11:07:23', '<p>\r\n“Prism White Samsung Galaxy S10+ Plus 128GB. Unlocked and fully compatible with all carriers worldwide (GSM and CDMA). In Good Condition. See the description below for more condition details. Each phone is fully tested by our team of certified mobile phone technicians to guarantee they\'re in perfect working condition. Your S10+ comes in a new box with a brand-new 2-Piece Fast Charge Charger (Type-C Cable and Wall Block) and a sim tray removal tool. We\'re a trusted and certified Samsung Mobile Phone provider with tens of thousands of Samsung devices sold. Our expert customer care team will is always a message away and is here to assist you with anything from pre-purchase questions to setup/activation help and beyond. See our customer ratings! If you have any questions at all, please don\'t hesitate to send a message and ask!”\r\n</p>', 0, 1),
(7, 3, 1, 1, 'Samsung Galaxy S7 32GB | Unlocked | AT&T T-Mobile Verizon | 4G LTE Very Good', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/7.jfif?alt=media&token=8534d5c0-f0fa-42f7-b1e1-44f8cd1ccc75', 988654, 100000, NULL, '2021-11-18 10:10:00', '2021-11-25 10:10:00', '2021-09-28 12:05:55', '<p>\r\n“This item is in Good Condition and will show moderate cosmetic imperfections such as Scratches/Scuffs on housing and screen. Comes with white generic box charging usb and adapter.”\r\n</p>', 0, 1),
(8, 3, 1, 1, 'Samsung Galaxy S7 SM-G930 - 32GB - Black (Unlocked)', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/8.jpg?alt=media&token=e94f444f-23bc-4a7f-9937-aa5a298529a4', 1324334, 100000, NULL, '2021-11-18 10:10:00', '2021-11-25 10:10:00', '2021-09-28 12:10:40', '', 0, 1),
(9, 3, 1, 1, 'OPPO F17 128GB, 8GB RAM 6.44\"Full HD+ 16+8+2MP Camera Dual SIM Googleplay Store', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/9.jpg?alt=media&token=1c5b476e-0fc6-42b5-9da8-3453865c71a2', 16674666, 100000, NULL, '2021-11-18 10:10:00', '2021-11-25 10:10:00', '2021-09-28 12:18:24', '<p>\r\nNew: A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is ... Read more\r\nFeatures:	Internet Browser, 3G Data Capable, 4G Data Capabl\r\nLock Status:	Factory Unlocked\r\n</p>', 0, 1),
(10, 3, 1, 1, 'OPPO Reno 2 Boxed (Unlocked) Ocean Blue, 8GB 256GB Excellent Condition', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/10.jfif?alt=media&token=b42e7992-64a4-4933-acb3-fcdb5a4d2e32', 4565332, 100000, NULL, '2021-11-18 10:10:00', '2021-11-25 10:10:00', '2021-10-27 17:00:00', '<p>\r\nOPPO Reno2 in superb condition.  Has had a glass screen protector and case on since new. Thoroughly checked over and can\'t see any marks/scratches.\r\n\r\nUnlocked. 8GB RAM, 256GB memory. UK version. Sought after ocean blue with pop up front facing camera.\r\n\r\nComes complete with glass screen protector, case, original box, plug and charging cable,\r\n\r\nOnly selling due to early upgrade.\r\n\r\n\r\nAny questions please feel free to ask.\r\n\r\n\r\nWill be sent insured, 24hr delivery.\r\n</p>', 0, 1),
(11, 3, 1, 2, 'HP ProBook 15.6\'\' CUSTOMIZABLE: 10 PRO i7 3.5GHz 64GB RAM 2TB NVMe DVD+RW Webcam', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F11.jfif?alt=media&token=8c5f05b9-0ba9-4283-b22b-d43298503605', 93456789, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 12:31:56', '<p>“AAA PCs is a Microsoft Authorized Refurbisher Partner. (MAR) Your computer includes a new Windows 10 installation with a recovery back-up. Minor scuffs & light scratches may be present. Genuine components are installed to ensure quality. Your computer will ship securely in a new brown box to ensure a great delivery experience.”\r\n<p>', 0, 1),
(12, 3, 1, 2, 'Lenovo IdeaPad Gaming 3 15.6 120Hz AMD Ryzen 5-5600H 8GB RAM 512GB SSD RTX 3060', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F12.jpg?alt=media&token=043936e8-5b88-4dca-9be5-5ec1bf3b5c00', 2134343, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 12:35:24', 'New: A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable). Packaging should be the same as what is found in a retail store, unless the item is handmade or was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag. See the seller\'s listing for full details', 0, 1),
(13, 3, 1, 2, 'Dell Latitude 7480 14\" Win10 Pro Intel Core i7 3.90GHz 64GB RAM 2TB NVMe m.2 SSD', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F13.png?alt=media&token=556e1229-e03f-45ad-81b6-7203050282a5', 32342443, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 12:40:42', '<p>\r\n“AAA PCs is a Microsoft Authorized Refurbisher Partner. (MAR) Your computer includes a new Windows 10 installation with a recovery back-up. Minor scuffs & light scratches may be present. Genuine components are installed to ensure quality. Your computer will ship securely in a new brown box to ensure a great delivery experience.”\r\n</p>', 0, 1),
(14, 4, 1, 2, 'Lenovo ThinkPad x140e 11.6\" Laptop AMD 1.4GHz 4GB RAM 320GB HDD Windows 10 - QT', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F14.jfif?alt=media&token=9d94c564-0633-4537-84b4-756d87f3b953', 23457342, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 13:14:19', '<p>\r\nOperating System: Windows 10.RAM Size:	4 GB. Type: Notebook/Laptop. Brand:	Lenovo. Processor Speed: 1.40 GHz. Processor: AMD. Hard Drive Capacity: 320 GB	. Screen Size:	11.6 in. Storage Type:	HDD (Hard Disk Drive). UPC:	Does not apply\r\n</p>', 0, 1),
(15, 4, 1, 2, 'Apple MacBook Pro 13 | MacOS Big Sur 2020 | 16GB RAM | 1TB SSD | WARRANTY |', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F15.jfif?alt=media&token=752c6f1f-a3d1-4239-af3d-812989bc3464', 21343332, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 13:20:04', '<p>\r\nMACBOOK PRO 13 (2012 Year Model)\r\nFULLY UPGRADED\r\n\r\nSPECIFICATIONS:\r\n13.3\" Hi Def Display\r\n2.5GHz i5 Turbo Processor (3.1GHz Turbo Speed)\r\n16GB RAM (Max Ram) (Upgraded High Speed)\r\n1TB SSD Hybrid (4x Faster Than Standard Drives)\r\nIntel HD Graphics 4000\r\nMacOS (Operating System) 2020 Big Sur 11.4 Installed\r\n\r\nFEATURES:\r\nAluminum Case\r\nBluetooth 2.1\r\nWiFi(802.11a/b/g/n)\r\nBuilt in Camera\r\nBacklit Keyboard\r\nMulti-Touch Trackpad\r\nBattery \r\n\r\nPorts:\r\nTwo 3.0 USB Ports\r\nThunderbolt Port (Backwards compatible with Mini Display Port)\r\nFirewire 800 Port\r\nEthernet Port\r\nSDXC Card Slot\r\nSuperDrive CD/DVD\r\nAudio In/Out\r\n\r\n\r\nIncludes:\r\nCharger\r\n30 Day Warranty + 24/7 Tech Support\r\nHealthy Good Battery\r\nMacOS Freshly Loaded and Ready to Use\r\n\r\n\r\n\r\nPLEASE FEEL FREE TO MESSAGE WITH ANY QUESTIONS YOU MAY HAVE.\r\n</p>', 0, 1),
(16, 4, 2, 3, 'Women\'s Boots Thick Heel Platform Round Toe Gothic Lace-Up Short Boots Punk Chic', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F16.PNG?alt=media&token=0471dd8a-3100-4e9f-ad69-ad7e40ced15c', 400000, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 14:57:32', '<pre>\r\n* Item :Women\'s Boots Thick Heel Platform Round Toe Gothic Lace-Up Short Boots Punk Chic\r\n* Condition: 100% Brand New\r\n* Color：As pics\r\n* Package：1 pair shoes (Without accessories）\r\n \r\n Please note:\r\n1.Please allow a little error due to manual measurement.\r\n2.The color maybe a little difference because of the light,screen reflection etc.\r\n3.If you are not sure what size to choose, you can tell us your foot length, we will recommend the right size for you.\r\n<pre>', 0, 1),
(17, 4, 2, 3, 'Ladies Denim Knee High Boots Stiletto High Heels Women\'s Pump Round Toe Shoes', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F17.PNG?alt=media&token=fb3a6a33-e608-456d-89d7-47688389cc53', 500000, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 15:03:26', '<pre>\r\n1.We Ship to Worldwide.\r\n2.Delivery time depends on destination and other factors, it may takes up to 15-30 days. If you don\'t receive the item after 35 days, please contact us, we\'ll investigate and solve the delivery problem.\r\n3.Shipping days exclude weekends and public holidays.\r\n4.Import duties, taxes, and charges are not included in the item price or shipping cost. These charges are the buyer\'s responsibility. Please check with your country\'s customs office to determine what these additional costs will be prior to bidding or buying.\r\n<pre>', 0, 1),
(18, 4, 2, 3, 'Damen Biker Boots Chelsea Schnalle Niedrigabsatz Zipper Outdoor Komfort 34-43 L', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F18.PNG?alt=media&token=7eb554df-b864-44cc-bf84-6d5bf5e32a80', 350000, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 15:15:30', '<pre>\r\n1.wir versenden zu weltweit.\r\n2.Lieferzeit hängt vom Bestimmungsort und anderen Faktoren ab, es kann bis zu 15-30 Tage dauern. Wenn Sie den Artikel nach 35 Tagen nicht erhalten, setzen Sie sich bitte mit uns in Verbindung, wir untersuchen das Problem und lösen es.\r\n3.Versandtage schließen Wochenenden und Feiertage aus.\r\n4.Zölle, Steuern und Gebühren sind nicht im Artikelpreis oder den Versandkosten enthalten. Diese Gebühren gehen zu Lasten des Käufers. Erkundigen Sie sich beim Zollamt Ihres Landes nach den zusätzlichen Kosten, bevor Sie ein Gebot abgeben oder kaufen.\r\n</pre>', 0, 1),
(19, 4, 2, 4, 'MAC ANGELA basic wash 5240-87-0380L-D845 - Slim Fit Stretch Jeans Damen', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F19.PNG?alt=media&token=9fbab9ff-4459-477b-a0f9-7f02ffcdbacb', 100000, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 15:26:24', '<pre>\r\nCondition:	\r\nNew with tags: A brand-new, unused, and unworn item (including handmade items) in the original packaging (such as ... Read more\r\nStil:	Gerades Bein\r\nAbteilung:	Damen	Produktart:	Jeans\r\nPassform:	Regular	Farbe:	Blau\r\nFarbton:	dunkel	Schrittlänge:	30\r\nMarke:	MAC	Größe:	42\r\nHerstellernummer:	5240-87-0380L-D845\r\n</pre>', 0, 1),
(20, 4, 2, 4, 'Dream It Live It - Handball Fitted Womens Ladies T Shirt', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F20.PNG?alt=media&token=fd350de5-ae9e-44dd-85a0-e585aa1f9f36', 150000, 100000, NULL, '2021-11-17 10:10:00', '2021-11-24 10:10:00', '2021-09-28 15:32:08', '<pre>\r\nDescription\r\n\r\nOur Ladies and Womens T-shirts are made from premium cotton material. This tee is pre-shrunk and machine washable. All our T-Shirts are professionally printed where we use superior quality clothing vinyl.\r\n\r\nOur print does not fade, peel or crack and we have many years of experience in the business ensuring our tees are comfortable to wear and super cool.\r\n\r\nWe also have this and many other designs available in both men and women as well as kids and baby clothing. Don\'t forget to check out our entire collection of super cool apparel.\r\n\r\nSpecification\r\n\r\nProfessionally printed, our T-Shirts are dispatched within 24 hours.\r\n\r\nAll our designs are created in-house by our talented team\r\n\r\nOur Ladies Tees are 100% Cotton Crew Neck (Grey Colour 90% Cotton 10% Polyester)\r\n\r\nMachine Washable at 40C. Wash and Iron inside out\r\n\r\nAvailable in sizes: S(8-10), M(10-12), L(12-14), XL(14-16), 2XL(16-18)\r\n\r\nThank you for viewing our listing.\r\n\r\n</pre>', 0, 1),
(21, 4, 2, 4, 'ZARA NEW SS21 WOMAN CUTWORK EMBROIDERY EYELET DRESS TIED BELT 4786/106', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F21.PNG?alt=media&token=78aaaa80-f7ea-48d1-9edc-a30ec95bace3', 800000, 100000, NULL, '2021-11-16 11:13:12', '2021-11-23 10:10:00', '2021-10-29 17:00:00', '<pre>\r\nZARA NEW WOMAN CUTWORK EMBROIDERY EYELET DRESS TIED BELT 4786/106\r\n\r\nSHORT COLLARED DRESS WITH CUFFED LONG SLEEVES. FRONT PATCH POCKETS WITH BUTTONED FLAPS. TIE BELT. CUTWORK EMBROIDERY DETAIL. MATCHING LINING. PLEAT AT THE BACK. FRONT CONTRAST BUTTON FASTENING.\r\nOUTER SHELL\r\n100% cotton\r\nLINING\r\n100% polyester\r\n\r\nThe measurement laying flat armpit to armpit,\r\n\r\nXS17, S18, M19, L20, XL 21, XXL 22 inches\r\n\r\n \"Fashion Blogger\'s favorite dress!\"\r\n\r\nNEW ZARA SS21 COLLECTION, SOLD OUT EVERWHERE!\r\n\r\nTHE ITEMS ARE BRAND NEW WITH TAGS\r\n\r\n100% GENUINE & AUTHENTIC ZARA ITEM\r\n\r\nALL SALES ARE FINAL, NO RETURN. \r\n</pre>', 0, 1),
(22, 4, 3, 5, 'Disney Pixar Cars Lightning McQueen Mack Hauler Truck & Car Set Model Toys Gift\r\n', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F22.PNG?alt=media&token=a32f8a4e-a727-49df-977b-9637058d33dc', 234567, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:21:45', '<pre>\r\n\r\nDescription:\r\n- Little fans can play big with oversized deluxe vehicles of popular Disney/Pixar Cars characters! In 1:55 scale, they are perfect for realistic push around and racing play. With bright colors, true-to-movie details and moving wheels, kids can recreate favorite action scenes, or speed off on new adventures.\r\n\r\n- Choose your ride and meet you at the races! Each sold separately, subject to availability. Colors and decorations may vary.\r\n\r\n-Makes a unique gift\r\nSet your favorite characters at the starting line and enjoy big movie adventures in compact size.\r\n                                                      \r\n\r\nMaterial: Large car alloy shell + plastic chassis and accessories\r\n\r\nSize: \r\nTruck: Approximately 21.5 * 4.5 * 6.5 CM\r\n\r\nPackage include:\r\n1pcs * Toy car & 1pcs Toy Hauler Truck\r\n</pre>', 0, 1),
(23, 4, 3, 5, '64 Model Car Mouse Pad Scenery with Parking Lot Shooting Pad Mouse Pad Table', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F23.PNG?alt=media&token=a9acd5a5-a753-4795-833b-6ec6271110b5', 789000, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:27:21', '<pre>\r\nModel Status: In Stock\r\n\r\nDescription: Park Lot 1: 64 Model Car Scene with Parking Lot Shooting Pad Mouse Pad Table Pad\r\nScale: Model Car 1/64\r\nItem Size (Inch):  L 19.7\' x W 15.7\"\r\nMaterial: Plastic\r\nFeatures: Parking Lot Shooting Pad\r\n</pre>', 0, 1),
(24, 4, 5, 3, 'Set of 7 The Avengers Model Car & Container Truck 1:64 Toy Gift for Kids & Boys', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F24.PNG?alt=media&token=9f6a73bf-cf0f-42fb-bed4-31232110c489', 320839, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:32:32', '<pre>\r\n\r\nItem Type	Diecast & Toy Vehicles\r\nScale	1:64\r\nMaterial	Diecast and ABS\r\nColor	Multi-Color, as picture shows\r\nDimension	1. The container truck about L9.1\" x W1.5\" x H2.2\" (L23.1 x W3.8 x H5.7 cm)\r\n 	2. Small models about L3.0\" x W1.2\" x H0.8\" (L7.5 x W3 x H2 cm)\r\nVehicle Type	The Avengers Model Cars\r\nPacking	Every single model car is packed in bubble bag, not in original box to prevent damage during shipping \r\nTips	*Great choice of gift for kids, especially for Birthday, Christmas and New Year Gift\r\n 	*Great item for collector, business gift, home decoration, office decoration\r\nWarning	Don\'t put in mouth/Keep Away from Fire/Not for Children under 3 Years\r\nNotice	Due to manual measurement, please allow a little error\r\nPackage include	6 x The Avengers Theme Car Model + 1 x Container Truck Model\r\n</pre>', 0, 1),
(25, 5, 3, 6, 'Christmas Angel Plush Doll Pendant Xmas Tree Hanging Decoration Party Ornaments~', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F25.PNG?alt=media&token=59f6d195-1c1f-4d62-92ad-85853386ee92', 689898, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:39:02', '<pre>\r\n🌻🎄CHRISTMAS DECOR: Christmas is coming ! This Christmas Ornament is the great Christmas decoration.It can decorate christmas tree, bed, stairs, the fireplace,wall,door. Let your home, living room, bedroom full of festive atmosphere,bring the joy of Christmas to your home.It\'s also the great gift for your kids,friend and lover.Kids will love it !\r\n🌻🎄PERFER FOR: Perfect Christmas Decors. Increase the festive atmosphere for you and your familes.Exquisite workmanship makes it a perfect gift for your children, families, friends, etc.Suitable for home, restaurant, bars, clubs, supermarket, shopping mall, etc.\r\n100% Brand New and High Quality\r\nProduct Name: Christmas Decoration Ornaments\r\nMaterial: Plush\r\nOccasion: Christmas\r\nType: Event & Party Supplies\r\n \r\n🎄Package included: 1x Christmas Decoration.\r\n \r\nNotice\r\n1.Due to the light and screen difference, the item\'s color may be slightly different from the pictures\r\n2.Please allow some differences due to manual measurement\r\n3.Thank you for your kindly understanding.\r\n</pre>', 0, 1),
(26, 5, 3, 6, 'Genshin Impact Gorou Wulang Plush Dress up Doll Stuffed Toy Gift 20cm Anime Game', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F26.PNG?alt=media&token=62d28e6e-d4bb-4e15-a0ce-a1d33bdfe82d', 555555, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:44:39', '<pre>\r\nDescription\r\nCondition:100% brand-new\r\nMaterial:PP Cotton\r\nSize：20cm\r\nColor:As pic shows\r\nPackage:Only doll\r\n \r\n Notice:\r\n \r\n1. Allow 1-3cm measurement deviation due to manual measurement.\r\n2. Due to the difference in display and lighting effects, the actual color of the item may be slightly different from the color displayed on the picture. Thank you!\r\n \r\n \r\nShipping\r\nWe will arrange shipping for you within 1-5 working days after payment cleared except the holidays.we usually use SpeedPAK shipping to u,shipping time usually takes 7-15 business days for delivery\r\n\r\nWe always send the item to the address you give us on EBAY to ensure the security of the item.\r\n\r\nIf you have changed your address, or want us to ship to another address, please change to the new address and message us before we ship it out, otherwise we will not be responsible if the package is lost.\r\nOther country\'s estimated delivery time from date of shipment is 30-60 working days from China, over 80% of our customers receive the products within 20 working days (please note that these are estimates; post office and customs delays can occur, if so, please check the information at your local post office, if you still can not get the package, please contact us.\r\n\r\nFeedback\r\n\r\nOur store are the new store , we do not have any profit. If you have a not bad shopping experience in my store, please give us 5 star. Thanks for your cooperation!\r\n\r\nIf you have any questions regarding the transaction, before leaving any feedback, please contact us and give us an opportunity to help you. We will do our best to solve your problem.\r\n\r\nIf you need any help , please mail us feel free , I will response the questions in 24 hours and I think we will be good friends, Thanks for your understanding!\r\n\r\nPayment\r\n\r\nWe only accept Paypal.Thank you.\r\n</pre>', 0, 1),
(27, 5, 3, 6, 'Neca Annabelle doll', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F27.PNG?alt=media&token=7498e743-63aa-42c4-bac2-1c48797326f7', 131313, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 03:49:15', '<pre>\r\nNeca Annabelle doll.\r\n\r\n\r\nBrand NEW Sealed\r\n\r\n\r\nPlease see pictures for condition of item.\r\n\r\n\r\nPackage does have some shelf wear present\r\n\r\n\r\nSticker in Back came detached\r\n\r\n\r\nBest for out of box collectors or collectors not picked about box condition.\r\n\r\n\r\n\r\nWill ship within 1 business day USPS Priority Mail\r\n\r\n\r\nOnly confirmed shipping addresses please otherwise sale will be cancelled.\r\n\r\nALL SALES ARE FINAL ON THIS ITEM\r\n</pre>', 0, 1),
(28, 5, 4, 7, 'Perfect Bedside Table Drawer Cabinet Bedroom Furniture Storage Nightstand Shelf', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F28.PNG?alt=media&token=0eaf21bd-3dc8-4238-9083-1824fb6fabfb', 2222222, 100000, 22222, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 07:27:21', '<pre>\r\n1.	Payment terms\r\nPlease note your shipping address must match your PAYPAL address, once you complete the checkout process we will not be able to amend or cancel the order. If you want to change the shipping address please change it before making the payment as we can not change the shipping address later, we will not be able to check your messages on order notes regarding address change or other information. \r\n\r\n2.	Returns and refunds\r\nThe goods becomes your property as soon as they are dispatched to you. You are responsible for the care of the goods whilst in your possession and returning them in good condition in the original packaging including all documents and manuals. We will reimburse you in full for the goods if they are returned as new. If the goods are found to be used, misused or damaged on return, we reserve the right to issue you partial refund for it.\r\n\r\n3.	import duties\r\nBuyers are responsible for import duties, custom fees and taxes, if any. Please check with your country’s custom office to determine the additional costs impose on the item prior to buying.\r\n\r\n4.	Liability\r\nThe terms and conditions of business are not intended to affect your statutory rights or to limit our liability for death, personal injury or fraudulent misrepresentation resulting from our negligence. If there is a problem you may receive a refund or replacement under the terms of our guarantee. Our liability to you will always be limited to a full refund of the goods purchased. We will not compensate for delivery delays or failures unless you have requested a premium delivery option. In these circumstances our liability to you will be limited to a refund of the delivery charges you have paid. Our liability to you specifically excludes compensation for indirect or consequential loss or damage however it arises and except as described above will always be limited to a refund of your payment. \r\n\r\n5.	Unforeseen Circumstances\r\nIf performance of any of our obligations to you is prevented, frustrated or impeded by reason of acts of God, war and other hostilities, civil commotion, acts of terrorism, accident, strikes, lock outs, trade disputes, acts or restraints of Government, imposition or restrictions of imports or exports or any other cause not within our reasonable control, we will do our best to maintain our deliveries. However, we shall have no liability to you for any failure which is due to such unforeseen circumstances or any other situation outside our control.\r\n\r\n6.	Age Restrictions\r\nAge restrictions apply to the supply of some goods. By ordering these goods you confirm that you are over 18 and that the person receiving the delivery is also over 18.\r\n</pre>', 0, 1),
(29, 5, 4, 7, '12 Inches Marble Side Table Top Inlay Coffee Table with Multi Color Gemstones', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F29.PNG?alt=media&token=72fd9782-3745-4690-b736-97735fd785da', 444444, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 07:34:09', '<pre>\r\nThis Table Top experience will add charm to your indoor & outdoor space and you can enjoy dinner, coffee, tea with your guest.\r\n\r\nThis Table Top has a polished finish. Simply Wipe the Table with a Damp Cloth to keep it Looking Beautiful with Minimal Maintenance.\r\n\r\nAdds high-style to any Dining Room, Drawing Room, Hallway, Balcony, Kitchen, Office, Patio, Lawn & Garden with this Elegant and Contemporary Table Top, which can be used as Coffee Table, Side Table, End Table, Patio Table, Restaurant & Bar Tables.\r\n\r\n</pre>', 0, 1),
(30, 5, 4, 7, '15 Inches Marble Coffee Table Top Royal Chess Board table with King Size 2.5\"', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F30.PNG?alt=media&token=d5a7161a-5f55-4131-9407-42f0dd63852b', 444444, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 07:39:31', '<pre>\r\nThis Table Top experience will add charm to your indoor & outdoor space and you can enjoy dinner, coffee, tea with your guest.\r\n\r\nThis Table Top has a polished finish. Simply Wipe the Table with a Damp Cloth to keep it Looking Beautiful with Minimal Maintenance.\r\n\r\nAdds high-style to any Dining Room, Drawing Room, Hallway, Balcony, Kitchen, Office, Patio, Lawn & Garden with this Elegant and Contemporary Table Top, which can be used as Coffee Table, Side Table, End Table, Patio Table, Restaurant & Bar Tables.\r\n\r\n\r\n</pre>', 0, 1),
(31, 5, 4, 8, '40CM EXTRA DEEP Fitted Sheet Single Double Super King Bed Size OR Pillow Covers', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F31.PNG?alt=media&token=ec7db3fe-7eae-4cdd-99ab-d80a91a731e1', 3333333, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 07:54:25', '<pre>\r\nPackage Includes : 1 x 40CM Deep Fitted Sheet ( Pillow Covers sold separately )\r\n\r\n\r\nSIZE:\r\n\r\nSingle Fitted  (91 cm Width  x 190 cm Length)\r\n\r\nDouble Fitted  (137 cm Width x  190 cm Length )\r\n\r\nKing Fitted  (152 cm width x 200 cm Length)\r\n\r\nSuper King Fitted (180 cm Width x 200 cm Length)\r\n\r\nPillowcase (50 x 75 cm)\r\n\r\nWeight :\r\n\r\nSingle : 485 gm\r\n\r\nDouble : 630 gm\r\n\r\nKing : 675 gm\r\n\r\nSuper King : 710 gm\r\n<pre>', 0, 1),
(32, 5, 4, 8, 'Quilt Duvet Cover Bedding Set + Pillow Cases Single Double King Super King Size', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F32.PNG?alt=media&token=880f4e13-d820-4128-b30b-d5f79b918035', 11111111, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 07:59:35', '<pre>\r\n►  Machine Washable\r\n► Polycotton (50% Cotton 50% Polyester)\r\n►  Please note that shades may vary due to photographic lighting\r\n► These designs are not panel cut so the pillow cases might be different with each other\r\n\r\nSingle Duvet Set\r\n\r\nDuvet Cover 140 cm x 200 cm (55\" x 79\")\r\nPillow Cases 50 cm x 75 cm (20\" x 29\")\r\nDouble Duvet Set\r\n\r\nDuvet Cover 200 cm x 200 cm (79\" x 79\")\r\nPillow Cases 50 cm x 75 cm (20\" x 29\")\r\nKing Duvet Set\r\n\r\nDuvet Cover 220 cm x 230 cm (87\" x 90\")\r\nPillow Cases 50 cm x 75 cm (20\" x 29\")\r\nSuper King Duvet Set\r\n\r\nDuvet Cover 230 cm x 260 cm (90\" x 102\")\r\nPillow Cases 50 cm x 75 cm (20\" x 29\")\r\nNote: Single Duvet Cover with Comes only one Pillow Case\r\n<pre>', 0, 1),
(33, 5, 4, 8, 'Seersucker Duvet Cover Set 100% Egyptian Cotton Bedding Sets Double King Size', 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F33.PNG?alt=media&token=76f035f4-1176-4d74-a463-cfd70814e751', 4564564, 100000, NULL, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-09-29 08:04:13', '<pre>\r\nSeersucker Duvet Cover Set 200 Thread Count 100% Egyptian Cotton Quilt Covers Bedding Sets\r\n\r\nDouble King Super King Bed Size\r\n\r\nLuxury classic Ruched Seersucker Duvet Cover with Pillow cases Puckering Egyptian Cotton weave Bedding Set\r\n\r\nAvailable in most contrasting colors White / Silver / Charcoal / Grey / Dusky Pink Cotton Bedding Sets\r\n\r\nThis high thread count linen has a smooth touch and a substantial hand feel.\r\n\r\n\r\n Bring a touch of Luxury Hotel Quality Bedding style to your bedroom.\r\n\r\n\r\n Threads are twisted together during the manufacturing process to give the fabric extra strength, softness and durability.\r\n\r\n\r\n\r\n\r\nDuvet Cover Sizes\r\n\r\nDouble duvet cover (200 x 200 cm)\r\n\r\nKing duvet cover (230 x 220 cm)\r\n\r\nSuper king duvet cover (260 x 220 cm)\r\n\r\nHousewife Pillowcase Pair (50 x 75 cm)\r\n</pre>', 0, 1),
(36, 4, 1, 1, 'Brand New LG Velvet 5G LMG900TM 128GB Aurora White (T-Mobile+GSM Unlocked) Phone', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F34.PNG?alt=media&token=91bbc1e6-dae7-4829-a964-7173f7ec4fab', 2345000, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:31:22', '<h2><strong>Features:</strong></h2><ul><li>Sleek &amp; Premium Design with Ergonomic 3D Arc Edges</li><li>6.8” OLED FullVision™ Display</li><li>4K video records at 4x times the resolution of HD</li><li>5G-Era Ready unreal speeds &amp; robust connectivity</li><li>3D Sound Engine &amp; Stereo Speakers</li><li>Triple Rear Cameras: 48 MP, 8MP Ultra-Wide, 5MP Depth</li><li>Triple 48MP/W8MP/D5MP rear camera, 16MP front</li></ul><p><br></p>', 1, 1),
(37, 4, 1, 1, 'Google Pixel 3XL G013C 64G 6.3\" 4G LTE Factory Unlocked Smartphone Brand New', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F35.PNG?alt=media&token=f8f9e4f8-d014-4ddd-92b4-614340aab3d6', 4555555, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:40:30', '<h2><strong>Product Details:</strong></h2><p>The Pixel 3XL, like the name suggests is bigger than the Pixel 3. It has similar build quality with a bigger 6.3-inch QHD+ display and a notch. It has an aluminum frame and the back is made out of Corning Gorilla 5. The smartphone is powered by the Snapdragon 845 processor and has a Titan M security chip onboard. The Pixel 3 XL has 4GB of RAM. It sports a single 12.2-megapixel camera setup at the back and has a dual 8-megapixel selfie camera setup consisting of a regular lens and a wide angle lens. The phone runs on stock Android 9 Pie and has a 3450mAh battery.</p><h2><strong>Features:</strong></h2><ul><li>Memory 64GB Storage</li><li>4GB of RAM</li><li>Rear camera: 12.2-megapixel (f/1.8, 1.4-micron)</li></ul><p><br></p>', 0, 1),
(38, 4, 1, 1, 'LG G8 / G8X ThinQ 128GB AT&T T-Mobile OR GSM Unlocked G820 /G850 GOOD 7.5-8.5/10', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F36.PNG?alt=media&token=9da46157-fd48-43ba-a672-39d87215cf4a', 1444455, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:45:36', '<p><strong>Carrier compatibility:&nbsp;</strong></p><ul><li><strong>GSM Unlocked</strong>&nbsp;- The phone will work on ALL GSM carriers Worldwide, including AT&amp;T, T-Mobile, Metro PCS etc. (<strong>the unlock code will be attached to the phone if needed for unlocking</strong>); will&nbsp;<strong>not&nbsp;</strong>work on CDMA carriers like Verizon or Sprint.</li><li><strong>Verizon Wireless Unlocked&nbsp;</strong>- The phone will work on Verizon Wireless, as well as ALL GSM Carriers (an unlock code will not be needed).</li><li><strong>Sprint Wireless Unlocked</strong>&nbsp;- The phone will work on Sprint Wireless, as well as ALL GSM Carriers (an unlock code will not be needed).</li><li><strong>AT&amp;T Wireless ONLY</strong>,&nbsp;<strong>T-Mobile ONLY,&nbsp;Sprint Wireless ONLY</strong>&nbsp;-&nbsp;The phone will ONLY work on the specific carrier&nbsp;that you select, it will NOT work on any other carrier.</li></ul><p>Please Note that GSM Unlocked phones will&nbsp;<strong>NOT&nbsp;</strong>work on CDMA carriers like Verizon.</p><p><br></p>', 0, 1),
(39, 4, 1, 1, 'Apple iPhone 11 Pro Max A2161 ATT TMob Sprint Verizon Factory Unlocked Very Good', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F37.PNG?alt=media&token=8f0d2a03-40ce-49b8-b77e-6665a56c63b9', 1500000, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:48:54', '<p>Condition:</p><p><strong>Very Good - Refurbished:</strong></p><p>Seller Notes:</p><p>“Free 2-Day Shipping! Fully tested and Certified. Apple iPhone 11 Pro Max. Model A2161 Unlocked for all carriers. Very Good Condition - See the below description for more details. Clean ESN Verified. Choose 64GB, 256GB, or 512GB. We are confident in the quality and condition of these iPhone 11 Pro Max and you can be too. We are a trusted seller. See Our Ratings. All of these devices have been fully tested by our team of on-site technicians using industry-leading testing software and procedures. Then, meticulously and carefully cosmetically graded to be sure they fit the conditions in this listing. Your phone comes in a new box with a brand new 2-Piece Charger (Lightning Cable and Wall Plug). Please Message us with any questions you may have. Have a nice day.”</p>', 0, 1),
(40, 4, 1, 1, 'Refurbished Original Nokia 3310 blue Unlocked 2G GSM Good Cheap Cellular Phone', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F38.PNG?alt=media&token=be85ecac-d6be-4578-8982-3feb8b9349dd', 1000000, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:51:44', '<p>Attention please:</p><p>1: About Language: Please send message to our salespeople if you are not sure the phone&nbsp;supports the language you want.</p><p>2: About Accessories: All the phone accessories are new but not original.</p><p>3: About Phone Teardown: Phone which is took apart is beyond our warranty,it belongs to&nbsp;man-made damage,we are not responsible for such disputes.</p><p>4: About Phone Memory: Phone`s actual memory will be lower than the official memory&nbsp;indicated in the phon</p><p>specification.</p><p>5: Battery Capacity: Used/Refurbished phone battery capacity is lower than the phone system&nbsp;standard battery capacity, generally about 80%.</p><p>6: About NFC: Apple Pay or Samsung Pay may not support NFC function.If you need NFC&nbsp;function, please leave a message in the order or contact the salespeople in advance.</p><p>7: Waterproof: All the used/refurbished cellphones do not support waterproof.</p><p>8: About OTG&amp;Phone System Brush: Used/Refurbished phones may not support OTG update and we&nbsp;are not responsible for such dispute that if you brush the phone system yourself!!</p><p>9: Phone Update: All the phones support updating only by the phone system,do not connect&nbsp;</p><p>the computer to update the phone yourself.Auto update without our permission will not be&nbsp;free warranty.</p><p>10: Phone Frequency Check: Please check if the phone model can work well in your area on&nbsp;frequency check website before purchase. Website:https://willmyphonework.net/</p><p>11：Custom Duty Explanation：You may be charged Customs Duties for something purchased&nbsp;online.Buyers are responsible for the Customs Duties.</p><p>12: Warranty: We provide one year warranty only in our store,but expect the accessories.</p>', 0, 1),
(41, 4, 1, 1, 'Samsung Galaxy A71 / A71 5G | 128GB | AT&T ONLY or GSM Unlocked GREAT 9-9.5/10', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F39.PNG?alt=media&token=4362d561-607c-4369-939d-54896fd61f7b', 5000000, 100000, 0, '2021-11-16 10:10:00', '2021-11-23 10:10:00', '2021-10-22 02:54:38', '<p><strong>These phones have successfully passed all of our below tests:</strong></p><ul><li>Power Up</li><li>Placed a Test Call</li><li>Good LCD&nbsp;Screen (Except for screen burn-ins, when selected)</li><li>Good Charging Port</li><li>Functioning Digitizer</li><li>Functioning Buttons</li><li>Functioning Speakerphone</li><li>Functioning Earpiece</li><li>Functioning Mic</li><li>Functioning Cameras (Front and Back)</li><li>No Cracks or severe damage&nbsp;to housing&nbsp;(Severe damage&nbsp;excludes scratches)</li></ul><p><br></p>', 0, 1),
(43, 3, 1, 1, 'iphone 13', 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F1.jfif?alt=media&token=037dd535-3d06-4503-9cc2-2b00f381d602', 5000000, 100000, 0, '2021-11-19 00:11:00', '2021-11-19 16:10:46', '2021-11-19 05:18:17', '<h2><strong>ĐẶC ĐIỂM NỔI BẬT</strong></h2><ul><li>Hiệu năng vượt trội - Chip Apple A15 Bionic mạnh mẽ, hỗ trợ mạng 5G tốc độ caoKhông gian hiển thị sống động - Màn hình 6.1\" Super Retina XDR độ sáng cao, sắc nétTrải nghiệm điện ảnh đỉnh cao - Camera kép 12MP, hỗ trợ ổn định hình ảnh quang họcTối ưu điện năng - Sạc nhanh 20 W, đầy 50% pin trong khoảng 30 phút</li><li><br></li></ul>', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `p_image_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`p_image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`p_image_id`, `product_id`, `image`, `status`) VALUES
(1, 1, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/1.1.jpg?alt=media&token=8ed03429-8bec-4baf-a5fd-3e26340e2feb', 1),
(2, 1, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/1.2.jpg?alt=media&token=b7468530-92f2-4dc6-ae6f-31e84a83ecd8', 1),
(3, 1, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/1.3.jpg?alt=media&token=b547e9d3-4a68-4ac0-bc98-0248d1374ae7', 1),
(6, 2, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/2.1.jfif?alt=media&token=726c38f4-8692-41d4-b724-fd6386217116', 1),
(7, 2, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/2.2.jfif?alt=media&token=420a12dc-93a1-48cc-9dea-a68ba397cff0', 1),
(8, 2, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/2.3.jfif?alt=media&token=bf61b2e2-2696-4378-8b36-9aac53c8c4e6', 1),
(9, 3, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/3.1.jpg?alt=media&token=4e1c51d3-e740-472e-b603-539379f1b598', 1),
(10, 3, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/3.2.jpg?alt=media&token=92a12c14-7977-4f16-9f1b-5a4b995d5bd5', 1),
(11, 3, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/3.3.jpg?alt=media&token=06430b1a-ee3d-48ec-b8f3-0985dfc4f936', 1),
(12, 4, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/4.1.jpg?alt=media&token=bd1fc4d0-ac79-41b5-a0c3-6825ac57eab7', 1),
(13, 4, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/4.2.jfif?alt=media&token=d4bac82d-13e0-4a8f-bfa6-d632dea178a7', 1),
(14, 4, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/4.3.jfif?alt=media&token=3d3c9d3a-8b74-4f22-86a2-119d42850df5', 1),
(15, 5, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/5.3.jpg?alt=media&token=5ecdc127-45bc-4376-afd8-8c5fafcae450', 1),
(16, 5, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/5.1.jpg?alt=media&token=95ce5b56-0f42-4585-be55-ce314db27986', 1),
(17, 5, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/5.2.jfif?alt=media&token=8b1dec04-b1d5-416e-8bfa-00021221c89c', 1),
(18, 6, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/6.1.jfif?alt=media&token=12220c6f-ab40-4c3c-966b-423de76891a3', 1),
(19, 6, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/6.2.jfif?alt=media&token=e7db16f2-7700-410a-a272-a5cad63fda88', 1),
(20, 6, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/6.3.jfif?alt=media&token=06d6773a-427c-4784-91f5-8bc655cd8f85', 1),
(21, 7, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/7.1.jfif?alt=media&token=c6c70e69-dda7-4afa-a8ea-2a2fc2348c56', 1),
(22, 7, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/7.2.jfif?alt=media&token=c10433df-3441-4cfc-ac2c-9b8cb6e78e08', 1),
(23, 7, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/7.3.jfif?alt=media&token=1781ad76-af37-431f-ba3f-b92c6c625162', 1),
(24, 8, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/8.1.jfif?alt=media&token=c2a420fa-7164-4651-ac82-fb16aad4cc62', 1),
(25, 8, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/8.2.jfif?alt=media&token=1758df08-f499-4da6-ad7d-554e9458da19', 1),
(26, 8, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/8.3.jfif?alt=media&token=cf5af9fb-47b8-4396-a949-d7d2fbb9c2b8', 1),
(27, 9, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/9.1.jfif?alt=media&token=1f8eeeba-9c55-4ad3-aea8-091325ed384e', 1),
(28, 9, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/9.2.jfif?alt=media&token=28cee753-f977-45ff-a49c-3b46e1a986fb', 1),
(29, 9, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/9.3.jfif?alt=media&token=fdc50f47-57e1-4626-a5e3-2a0fbf99542d', 1),
(30, 10, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/10.1.jfif?alt=media&token=392c76b9-53e7-474c-bedd-216091b5b699', 1),
(31, 10, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/10.3.jfif?alt=media&token=850a514a-d082-4f05-87cf-51981771cf13', 1),
(32, 10, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/10.2.jfif?alt=media&token=54323135-0ad4-476d-9dae-acfc32edcdf6', 1),
(33, 11, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F11.1.jfif?alt=media&token=6e38bd0b-51ca-414f-b3f3-a0fca83a7a19', 1),
(34, 11, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F11.2.jfif?alt=media&token=acde7bb8-7454-4b76-9aa7-ab8f16c6d4f4', 1),
(35, 11, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F11.3.jfif?alt=media&token=2e39e045-9e26-4f0d-bd0a-3f289a44ad5d', 1),
(36, 12, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F12.1.jfif?alt=media&token=9896ab95-eccb-4f64-86eb-d8c373db5103', 1),
(37, 12, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F12.2.jfif?alt=media&token=b003891d-cf52-4e62-a8c4-43d70a08d170', 1),
(38, 12, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F12.3.jfif?alt=media&token=ad869ade-c51f-45a1-98d4-36d76f5997f4', 1),
(39, 13, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F13.1.jfif?alt=media&token=cf0f3bdb-982e-4b33-ae9e-3f1f98d46cb6', 1),
(40, 13, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F13.2.jfif?alt=media&token=ad8e4a83-f6df-487b-87ad-9113bc548a23', 1),
(41, 13, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F13.3.jfif?alt=media&token=f31cc5c2-bfe4-4123-a863-047207778713', 1),
(42, 14, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F14.1.jfif?alt=media&token=51607c4b-e0d9-4efa-93e0-42ba92f0f5f2', 1),
(43, 14, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F14.2.jfif?alt=media&token=4231d42a-e245-417b-b9d2-493448583809', 1),
(44, 14, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F14.3.jfif?alt=media&token=d85a66c5-89dd-43e1-9a07-66e377022ada', 1),
(45, 15, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F15.1.jfif?alt=media&token=974c8e6a-c7c9-42b5-860f-0bd699afdfaa', 1),
(46, 15, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F15.2.jfif?alt=media&token=4b548917-21fd-4a95-8e15-ba99314fcca5', 1),
(47, 15, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/may%20t%C3%ADnh%20x%C3%A1ch%20tay%2F15.3.jfif?alt=media&token=f9808575-82f7-499e-b9e9-423d6601380e', 1),
(48, 16, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F16.1.PNG?alt=media&token=012d61a1-d689-4ddc-9000-bb26ccbccbfd', 1),
(49, 16, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F16.2.PNG?alt=media&token=2f151821-ad84-42e0-b1e5-54591d480e7a', 1),
(50, 16, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F16.3.PNG?alt=media&token=411a84ed-d772-43bb-b5b9-82e5bb53a748', 1),
(51, 17, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F17.1.PNG?alt=media&token=d0c59a25-84af-4f7a-b88e-c9e947cf92e3', 1),
(52, 17, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F17.2.PNG?alt=media&token=1be8ca57-e998-4bb9-8863-85d1df973866', 1),
(53, 17, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F17.3.PNG?alt=media&token=65716267-cbce-47ee-b557-17b36d2ad1d3', 1),
(54, 18, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F18.3.PNG?alt=media&token=3d921715-a999-4f94-97d7-2902c7ac1f98', 1),
(55, 18, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F18.1.PNG?alt=media&token=dbf24a7d-3899-4028-b788-3c99eb6d5c99', 1),
(56, 18, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giay%20dep%2F18.2.PNG?alt=media&token=98f2dbf1-b349-40a3-aa70-eddeeab80715', 1),
(57, 19, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F19.1.PNG?alt=media&token=60aad084-c5cd-4bb4-9696-e105b008dfda', 1),
(58, 19, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F19.2.PNG?alt=media&token=8b98d1df-88a4-4809-970e-6b132d8d5805', 1),
(59, 19, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F19.3.PNG?alt=media&token=bf1b304b-ae51-4143-ae8d-c7de8f702cb0', 1),
(60, 20, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F20.1.PNG?alt=media&token=813b1598-1408-45d9-98e7-db32e7f0eecf', 1),
(61, 20, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F20.2.PNG?alt=media&token=5d7a0b92-f7d1-4272-bbb2-b902ff7d6617', 1),
(62, 20, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F20.3.PNG?alt=media&token=eb483c86-8575-4ae8-8fc5-f87968fb9dcf', 1),
(63, 21, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F21.2.PNG?alt=media&token=c2b76540-b36c-4b10-974a-75be311a799a', 1),
(64, 21, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F21.1.PNG?alt=media&token=a744d135-fcb8-4359-930b-d2b73a2f2f6c', 1),
(65, 21, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/qu%E1%BA%A7n%20%C3%A1o%2F21.3.PNG?alt=media&token=4046cc2a-d2e5-43a5-95cf-9d1d7ba0c55b', 1),
(66, 22, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F22.1.PNG?alt=media&token=6eaed6d9-abb1-4e60-8813-682bd5c4bf65', 1),
(67, 22, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F22.2.PNG?alt=media&token=3e95fffa-1844-4cd2-ae95-7b9abfc0b217', 1),
(68, 22, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F22.3.PNG?alt=media&token=825a4135-a7b5-486d-a7c4-4a5b6d4c1328', 1),
(69, 23, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F23.1.PNG?alt=media&token=29c042ca-74cc-418c-a52e-137d4c2f7aa2', 1),
(70, 23, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F23.2.PNG?alt=media&token=8715dfbe-d8c5-4ecf-ae40-b1a5f4981da1', 1),
(71, 23, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F23.3.PNG?alt=media&token=141fcc2f-b1ca-4487-922b-999f73c14405', 1),
(72, 24, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F24.1.PNG?alt=media&token=9ce05215-d35a-4f3d-a6df-bf5f460b0a76', 1),
(73, 24, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F24.2.PNG?alt=media&token=1d3f8f30-f3fe-4211-a45c-bddc973e793e', 1),
(74, 24, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F24.3.PNG?alt=media&token=aea6f3f2-a735-4158-a456-284cdc4ccc5d', 1),
(75, 25, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F25.2.PNG?alt=media&token=e7a1e463-e87e-4a9c-a458-b408e3b631d1', 1),
(76, 25, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F25.1.PNG?alt=media&token=6c8a5a34-2797-4d0a-bd7d-755d9cbdb2e4', 1),
(77, 25, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F25.3.PNG?alt=media&token=7e286c86-73b6-45d7-89ae-ee617d78ad14', 1),
(78, 26, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F26.2.PNG?alt=media&token=e61097b1-132d-4d19-a629-315b0b32143f', 1),
(79, 26, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F26.1.PNG?alt=media&token=b1d3afa0-14aa-454a-ac8e-721960dddc1f', 1),
(80, 26, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F26.3.PNG?alt=media&token=806ea005-30c2-4265-97c7-8de0ebfc2904', 1),
(81, 27, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F27.1.PNG?alt=media&token=b839a69e-567c-480b-a7b8-839546962d0d', 1),
(82, 27, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F27.2.PNG?alt=media&token=403cdb3e-321b-4287-98c6-70308c09f1f1', 1),
(83, 27, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/%C4%90%E1%BB%93%20ch%C6%A1i%2F27.3.PNG?alt=media&token=230a3667-fafe-480c-8872-bd4f6295b377', 1),
(84, 28, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F28.3.PNG?alt=media&token=8ae84633-0b7c-4407-9a86-06349cfb2dec', 1),
(85, 28, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F28.2.PNG?alt=media&token=28419e61-4ab1-488a-9038-dd587d526263', 1),
(86, 28, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F28.1.PNG?alt=media&token=f5f82e6b-c55e-470d-85df-e49dca41cee7', 1),
(87, 29, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F29.1.PNG?alt=media&token=203fc666-2a56-48a2-aebb-2819d2230be2', 1),
(88, 29, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F29.2.PNG?alt=media&token=d9f681eb-c96c-4f10-aef1-83b01152a298', 1),
(89, 29, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F29.3.PNG?alt=media&token=3da7272c-906c-48ed-8741-06fe7fd3b24a', 1),
(90, 30, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F30.3.PNG?alt=media&token=de10700e-b96a-49cf-bcf7-08484ff577b6', 1),
(91, 30, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F30.1.PNG?alt=media&token=f0bfef49-cb98-4db4-946c-6e5c40aa47a3', 1),
(92, 30, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/ban%20ghe%2F30.2.PNG?alt=media&token=0b160964-4dc1-4f23-8db6-f1bdcb9e64d1', 1),
(93, 31, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F31.3.PNG?alt=media&token=3bc7a1a6-f120-457e-a1b1-f846d3b37711', 1),
(94, 31, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F31.1.PNG?alt=media&token=b7bb384f-4c22-43a3-98f7-a54e5f5ce17a', 1),
(95, 31, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F31.2.PNG?alt=media&token=660de356-59e6-41ad-97a2-12df83d11fad', 1),
(96, 32, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F32.1.PNG?alt=media&token=47cf4a73-b2a3-428e-807d-788172a042da', 1),
(97, 32, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F32.3.PNG?alt=media&token=a314379e-6f8c-4a57-b4db-d7b40eec0427', 1),
(98, 32, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F32.2.PNG?alt=media&token=cce4fcbc-44d0-4925-b116-1594010a4f84', 1),
(99, 33, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F33.1.PNG?alt=media&token=cf30c853-a5b5-4c9e-8ad7-0ee18d748f8c', 1),
(100, 33, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F33.2.PNG?alt=media&token=cd398a94-f20a-4cd9-a289-ec6147d2cacd', 1),
(101, 33, 'https://firebasestorage.googleapis.com/v0/b/auction-online-c77a4.appspot.com/o/giuong%20ngu%2F33.3.PNG?alt=media&token=28edd2a7-b294-42b9-9547-fcbc6aa6c73a', 1),
(111, 36, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F34.PNG?alt=media&token=91bbc1e6-dae7-4829-a964-7173f7ec4fab', 1),
(112, 36, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F34.1.PNG?alt=media&token=13af03fe-4f72-4501-8b49-a732d8765906', 1),
(113, 36, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F34.2.PNG?alt=media&token=b5086398-03f6-48a6-9b07-94bf78ad2864', 1),
(114, 36, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F34.3.PNG?alt=media&token=2533bdda-5318-4f91-b8e5-d01a5eb2d132', 1),
(115, 37, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F35.PNG?alt=media&token=f8f9e4f8-d014-4ddd-92b4-614340aab3d6', 1),
(116, 37, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F35.1.PNG?alt=media&token=aee435ef-81b2-4044-aaec-2a0e10680cd4', 1),
(117, 37, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F35.2.PNG?alt=media&token=840ef74f-46cb-4627-80bf-f3b6602568b2', 1),
(118, 37, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F35.3.PNG?alt=media&token=34a08938-0706-49fc-a852-f224856f6083', 1),
(119, 38, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F36.PNG?alt=media&token=9da46157-fd48-43ba-a672-39d87215cf4a', 1),
(120, 38, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F36.3.PNG?alt=media&token=e602bb0a-5345-4ab6-b466-058f39cc9fbf', 1),
(121, 38, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F36.2.PNG?alt=media&token=6a0a5c1b-f0e0-4f2c-bf99-1345bee518ee', 1),
(122, 38, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F36.1.PNG?alt=media&token=d5842647-fd06-4fe7-8ed7-2d321d455443', 1),
(123, 39, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F37.PNG?alt=media&token=8f0d2a03-40ce-49b8-b77e-6665a56c63b9', 1),
(124, 39, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F37.3.PNG?alt=media&token=0703d678-bc08-4244-a8cb-d815a3ec2b0f', 1),
(125, 39, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F37.2.PNG?alt=media&token=9a25f227-3e6a-4f13-9f61-026b7080501f', 1),
(126, 39, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F37.1.PNG?alt=media&token=b9ce0fee-cd1b-4f06-b791-aa029473aeb9', 1),
(127, 40, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F38.PNG?alt=media&token=be85ecac-d6be-4578-8982-3feb8b9349dd', 1),
(128, 40, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F38.3.PNG?alt=media&token=fae18c8c-8283-4ca9-a2ec-4741fa82d42d', 1),
(129, 40, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F38.2.PNG?alt=media&token=0fd28a69-4d57-4252-91f1-86e8ae15ca6a', 1),
(130, 40, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F38.1.PNG?alt=media&token=485df94a-7bca-44dc-82b5-e3e317f1dfc2', 1),
(131, 41, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F39.PNG?alt=media&token=4362d561-607c-4369-939d-54896fd61f7b', 1),
(132, 41, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F39.3.PNG?alt=media&token=05f63e56-1e5b-4d1a-8639-4930940dbc95', 1),
(133, 41, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F39.2.PNG?alt=media&token=61155c2b-2d57-4efa-9cdc-0cf39ee4d962', 1),
(134, 41, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F39.1.PNG?alt=media&token=a53f8706-e89f-415a-a4c7-4da55edddcf1', 1),
(135, 42, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F5.jfif?alt=media&token=8780b7c4-9d35-490b-addf-46cde2a008a6', 1),
(136, 42, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F6.jfif?alt=media&token=9f604dc7-b5e1-4362-8f94-606c9ba7c1c3', 1),
(137, 42, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F7.jfif?alt=media&token=8c752baa-4ee1-4a0d-9860-3038fe4f2de5', 1),
(138, 42, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F8.jfif?alt=media&token=49f6868e-21ae-4ae9-a0f3-cadee93f0a28', 1),
(139, 43, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F1.jfif?alt=media&token=037dd535-3d06-4503-9cc2-2b00f381d602', 1),
(140, 43, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F2.jfif?alt=media&token=33637103-eb44-47a2-83fa-d666be0b0129', 1),
(141, 43, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F3.jfif?alt=media&token=d4a064f6-716f-4f54-837d-37a35a6e7302', 1),
(142, 43, 'https://firebasestorage.googleapis.com/v0/b/onaution-dc7b6.appspot.com/o/images%2F4.jfif?alt=media&token=47790961-918c-4923-9446-322c412727cd', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reject_auction`
--

DROP TABLE IF EXISTS `reject_auction`;
CREATE TABLE IF NOT EXISTS `reject_auction` (
  `reject_auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`reject_auction_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `alias` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `type`
--

INSERT INTO `type` (`type_id`, `name`, `alias`, `description`, `status`) VALUES
(1, 'Điện Tử', 'dien-tu', NULL, 1),
(2, 'Thời Trang', 'thoi-trang', NULL, 1),
(3, 'Đồ Chơi ', 'do-choi', NULL, 1),
(4, 'Đồ Dùng Nội Thất', 'do-dung-noi-that', NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `watch_list`
--

DROP TABLE IF EXISTS `watch_list`;
CREATE TABLE IF NOT EXISTS `watch_list` (
  `watch_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`watch_list_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `watch_list`
--

INSERT INTO `watch_list` (`watch_list_id`, `account_id`, `product_id`, `created_at`, `status`) VALUES
(1, 1, 1, '2021-10-17 10:07:09', 0),
(2, 1, 2, '2021-10-17 10:08:03', 0),
(3, 1, 3, '2021-10-17 10:17:33', 0),
(4, 1, 4, '2021-10-17 10:18:27', 0),
(5, 1, 5, '2021-10-17 10:19:42', 0),
(6, 1, 6, '2021-10-17 10:19:45', 0),
(7, 1, 8, '2021-10-17 16:49:49', 0),
(8, 1, 1, '2021-11-19 10:09:25', 0),
(9, 1, 2, '2021-11-19 10:13:28', 0),
(10, 1, 1, '2021-11-19 11:51:29', 0),
(11, 1, 1, '2021-11-19 11:51:42', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category` ADD FULLTEXT KEY `name` (`name`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product` ADD FULLTEXT KEY `name` (`name`);

--
-- Chỉ mục cho bảng `type`
--
ALTER TABLE `type` ADD FULLTEXT KEY `name` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
