-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: db_gamingworkdo
-- Generation Time: 2025-03-23 23:58:49.1380
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `room_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_details` (
  `order_details_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  PRIMARY KEY (`order_details_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `status_order` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_variants` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `variant_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `variant_price` int DEFAULT NULL,
  `product_image_main` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_image_hover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_status` varchar(50) DEFAULT NULL,
  `attributes` json DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`variant_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `description` text,
  `category_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `product_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_friends` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `user_friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_friends_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`user_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(1, 'Logitech'),
(2, 'Corsair'),
(3, 'Razer'),
(4, 'HyperX'),
(5, 'SteelSeries'),
(6, 'Cooler Master'),
(7, 'ASUS'),
(8, 'MSI'),
(9, 'Alienware'),
(10, 'Predator'),
(11, 'Dare-U'),
(12, 'AKKO'),
(13, 'E-Dra'),
(14, 'Rapoo'),
(15, 'Lenovo'),
(16, 'Gigabyte'),
(17, 'Acer'),
(18, 'LG'),
(19, 'Samsung'),
(20, 'Sony'),
(21, 'Intel'),
(22, 'AMD');

INSERT INTO `cart` (`cart_id`, `user_id`, `quantity`, `variant_id`) VALUES
(1, 1, 2, 1),
(8, 1, 2, 5),
(21, 1, 1, 9),
(24, 1, 1, 25),
(25, 1, 1, 5);

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Gaming Laptops'),
(2, 'Gaming PCs'),
(3, 'Gaming Monitors'),
(4, 'Mechanical Keyboards'),
(5, 'Gaming Mice'),
(6, 'Headsets & Audio'),
(7, 'Gaming Chairs'),
(8, 'Graphics Cards'),
(9, 'Motherboards'),
(10, 'PC Components'),
(11, 'Console');

INSERT INTO `messages` (`message_id`, `user_id`, `content`, `room_id`, `create_at`) VALUES
(75, 1, 'Bạn cần giúp gì?', '1-2', '2025-03-23 16:00:20'),
(76, 2, 'Tôi cần mua hàng', '1-2', '2025-03-23 16:00:28'),
(77, 2, 'Không biết cách đặt hàng', '1-2', '2025-03-23 16:00:35'),
(78, 1, 'Được thôi', '1-2', '2025-03-23 16:00:58');

INSERT INTO `product_variants` (`variant_id`, `product_id`, `variant_name`, `variant_price`, `product_image_main`, `product_image_hover`, `product_status`, `attributes`, `rating`, `update_at`, `created_at`) VALUES
(1, 1, 'Alien ware Monitor T 46 32 Inches', 850, 'http://localhost:8080/public/img/2-1.webp', 'http://localhost:8080/public/img/2-2.webp', 'Available', '{\"Inches\": \"32 Inches\"}', 4, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(2, 1, 'Alien ware Monitor T 46 28 Inches', 800, 'http://localhost:8080/public/img/2-3.webp', 'http://localhost:8080/public/img/2-2.webp', 'Available', '{\"Inches\": \"28 Inches\"}', 2, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(3, 2, 'Alienware Gameing Monitor T 45 21.5 Inches', 560, 'http://localhost:8080/public/img/3-1.webp', 'http://localhost:8080/public/img/3-2.webp', 'Available', '{\"Inches\": \"21.5 Inches\"}', 4, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(4, 2, 'Alienware Gameing Monitor T 45 25.5 Inches', 750, 'http://localhost:8080/public/img/3-3.webp', 'http://localhost:8080/public/img/3-2.webp', 'Available', '{\"Inches\": \"25.5 Inches\"}', 3, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(5, 3, 'Alienware Monitor D 152 30 Inches', 752, 'http://localhost:8080/public/img/4-1.webp', 'http://localhost:8080/public/img/4-2.webp', 'Available', '{\"Inches\": \"30 Inches\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(6, 4, 'G-Series Curved VA Monitor - Grey', 453, 'http://localhost:8080/public/img/5-1.webp', 'http://localhost:8080/public/img/5-2.avif', 'Available', '{\"Color\": \"Grey\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(7, 4, 'G-Series Curved VA Monitor - Blue', 563, 'http://localhost:8080/public/img/5-3.webp', 'http://localhost:8080/public/img/5-2.avif', 'Available', '{\"Color\": \"Blue\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(8, 4, 'G-Series Curved VA Monitor - Black', 580, 'http://localhost:8080/public/img/5-4.webp', 'http://localhost:8080/public/img/5-2.avif', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(9, 5, 'Nintendo Switch Lite Turquoise - Blue', 543, 'http://localhost:8080/public/img/1-1.webp', 'http://localhost:8080/public/img/1-2.webp', 'Out of Stock', '{\"Color\": \"Blue\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(10, 5, 'Nintendo Switch Lite Turquoise - White', 543, 'http://localhost:8080/public/img/1-3.webp', 'http://localhost:8080/public/img/1-2.webp', 'Out of Stock', '{\"Color\": \"White\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(11, 6, 'DualSense Wireless Controllers - White', 600, 'http://localhost:8080/public/img/6-1.webp', 'http://localhost:8080/public/img/6-2.webp', 'Available', '{\"Color\": \"White\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(12, 6, 'DualSense Wireless Controllers - Black', 600, 'http://localhost:8080/public/img/6-3.webp', 'http://localhost:8080/public/img/6-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(13, 7, 'Cloud Alpha Gaming Headset - Black', 530, 'http://localhost:8080/public/img/7-1.webp', 'http://localhost:8080/public/img/7-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(14, 7, 'Cloud Alpha Gaming Headset - Red', 530, 'http://localhost:8080/public/img/7-3.webp', 'http://localhost:8080/public/img/7-2.webp', 'Available', '{\"Color\": \"Red\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(15, 8, 'Colossus Ergonomic Gaming Office Chair - White', 356, 'http://localhost:8080/public/img/8-1.webp', 'http://localhost:8080/public/img/8-1.webp', 'Available', '{\"Color\": \"White\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(16, 8, 'Cloud Alpha Gaming Headset - Green', 240, 'http://localhost:8080/public/img/8-2.webp', 'http://localhost:8080/public/img/8-3.webp', 'Available', '{\"Color\": \"Green\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(17, 9, 'Gaming Chair for Gamers with Lumbar', 560, 'http://localhost:8080/public/img/9-1.webp', 'http://localhost:8080/public/img/9-2.webp', 'Available', '{\"Type\": \"50D X 66W\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(18, 10, 'Kepler Brooks Gaming Chair', 800, 'http://localhost:8080/public/img/10-1.webp', 'http://localhost:8080/public/img/10-2.webp', 'Available', '{\"Type\": \"52D X 66W\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(19, 11, 'Multi-Functional Ergonomic Gaming Chair', 1000, 'http://localhost:8080/public/img/11-1.webp', 'http://localhost:8080/public/img/11-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(20, 12, 'Electrobot Xtreme Gaming Series PC - 128GB', 574, 'http://localhost:8080/public/img/12-1.webp', 'http://localhost:8080/public/img/12-2.webp', 'Available', '{\"GB\": \"128GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(21, 12, 'Electrobot Xtreme Gaming Series PC - 256GB', 821, 'http://localhost:8080/public/img/12-3.webp', 'http://localhost:8080/public/img/12-2.webp', 'Available', '{\"GB\": \"256GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(22, 13, 'KD DMTR Gaming Desktop PC - 256GB', 865, 'http://localhost:8080/public/img/13-1.webp', 'http://localhost:8080/public/img/13-2.webp', 'Available', '{\"GB\": \"256GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(23, 13, 'KD DMTR Gaming Desktop PC - 364GB', 900, 'http://localhost:8080/public/img/13-3.webp', 'http://localhost:8080/public/img/13-2.webp', 'Available', '{\"GB\": \"364GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(24, 14, 'Raptor Gameing Z95', 896, 'http://localhost:8080/public/img/14-1.webp', 'http://localhost:8080/public/img/14-2.webp', 'Available', '{\"GB\": \"364GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(25, 15, 'Radeon RX 120 GTS  Graphics Card - 3GB', 560, 'http://localhost:8080/public/img/15-1.webp', 'http://localhost:8080/public/img/15-2.webp', 'Available', '{\"GB\": \"3GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(26, 15, 'Radeon RX 120 GTS  Graphics Card - 8GB', 700, 'http://localhost:8080/public/img/15-3.webp', 'http://localhost:8080/public/img/15-2.webp', 'Available', '{\"GB\": \"8GB\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(27, 16, 'Radeon RX 590 GTS  Graphics Card', 890, 'http://localhost:8080/public/img/16-1.webp', 'http://localhost:8080/public/img/16-2.webp', 'Available', '{\"Color\": \"Red\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(28, 17, 'Radeon RX 680 GTS  Graphics Card', 940, 'http://localhost:8080/public/img/17-1.webp', 'http://localhost:8080/public/img/17-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(29, 18, 'Radeon™ RX 750 XT SPEEDSTER MERC', 560, 'http://localhost:8080/public/img/18-1.webp', 'http://localhost:8080/public/img/18-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(30, 19, 'Radeon™ RX 750 XT SPEEDSTER MERC', 356, 'http://localhost:8080/public/img/19-1.webp', 'http://localhost:8080/public/img/19-2.webp', 'Available', '{\"Color\": \"Black\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43'),
(31, 19, 'Radeon™ RX 750 XT SPEEDSTER MERC', 356, 'http://localhost:8080/public/img/19-3.webp', 'http://localhost:8080/public/img/19-2.webp', 'Available', '{\"Color\": \"White\"}', 5, '2025-01-10 08:31:43', '2025-01-10 08:31:43');

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category_id`, `brand_id`, `product_status`, `update_at`, `created_at`) VALUES
(1, 'Alien ware Monitor T 46', 'Exceptional Full HD IPS 21.5 Inch Ultra Thin Display : Enjoy immaculate image quality with 1920x1080 resolution and 178 degree wide viewing angles I Zero Frame Design.Connectivity Ports includes 1 x VGA Port, 1 x HDMI, 1 Audio-In Port, with Inbox HDMI and VGA Cable', 3, 9, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(2, 'Alienware Gameing Monitor T 45', 'Exceptional Full HD IPS 21.5 Inch Ultra Thin Display : Enjoy immaculate image quality with 1920x1080 resolution and 178 degree wide viewing angles I Zero Frame Design.Connectivity Ports includes 1 x VGA Port, 1 x HDMI, 1 Audio-In Port, with Inbox HDMI and VGA Cable.', 3, 9, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(3, 'Alienware Monitor D 152', 'Exceptional Full HD IPS 21.5 Inch Ultra Thin Display : Enjoy immaculate image quality with 1920x1080 resolution and 178 degree wide viewing angles I Zero Frame Design.Connectivity Ports includes 1 x VGA Port, 1 x HDMI, 1 Audio-In Port, with Inbox HDMI and VGA Cable.', 3, 9, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(4, 'G-Series Curved  VA Monitor', 'Lenovo Smart Artery Software: Self-learning software auto-adjusts display | Crosshair feature for FPS games | View Frame Rate and Timer | Create customized gaming modes.Eyesafe Certified Display | TUV Low Blue Light (Hardware solution) | TUV Rheinland Eye Comfort.', 3, 15, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(5, 'Nintendo Switch Lite Turquoise', 'Compatibility; Glass Screen Protector Compatible with Nintendo Switch. 9H Hardness; Tempered glass durability rated at 9H hardness to protect from everyday scratches. Case friendly; Made case compatible with Spigen case.', 11, 20, 'Out of Stock', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(6, 'DualSense  Wireless Controllers', 'Bring gaming worlds to life - a) Feel your in-game actions and environment simulated through haptic feedback2, b)Experience varying force and tension at your fingertips with adaptive triggers2. Chat online through the built-in microphone3, connect a headset directly via the 3.5mm jack, Switch voice capture on and off using the dedicated mute button, record broadcast.', 11, 20, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(7, 'Cloud Alpha Gaming Headset', 'HyperX Dual Chamber Drivers for more distinction and less distortion. Signature Award-Winning HyperX comfort. Durable aluminum frame with an expanded headband. Detachable braided cable with convenient in-line audio control. Detachable noise cancellation microphone.', 6, 4, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(8, 'Colossus Ergonomic Gaming Office Chair', 'ERGONOMICALLY DESIGNED FOR HARDCORE GAMING : From its unique contours and angled seat edges, to its fully adjustable recline, tilt, and height, the Dr Luxur Colossus supports a healthy sitting posture so you can game for hours in comfort.', 7, 8, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(9, 'Gaming Chair for Gamers with Lumbar', 'Have back issues or don’t want to develop them? This adjustable office chair includes Cushion Foam Padded support and a recline feature that allows you to tilt the backrest back or sit straight. Now you can quickly find a position that makes your back feel the most comfortable!', 7, 8, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(10, 'Kepler Brooks Gaming Chair', 'Premium Material: PU Leather Upholstery made with High density foam and added seat cushion, more comfort and long-time use; High Tensile steel frame, more sturdy and stable; lumbar & headrest pillows offer added support and comfort. Heavy-duty base and nylon smooth-rolling casters for super stability and mobility.', 7, 8, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(11, 'Multi-Functional Ergonomic Gaming Chair', 'ERGONOMIC DESIGN: Feel less fatigued over long periods with the lumbar curve that gently supports your lower back and encourages sitting in a neutral position. 110-degree shoulder arches and wide 54-cm seat base ensure optimal weight distribution for long-lasting comfort during gaming marathons.', 7, 3, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(12, 'Electrobot Xtreme Gaming Series PC', 'ERGONOMIC DESIGN: Feel less fatigued over long periods with the lumbar curve that gently supports your lower back and encourages sitting in a neutral position. 110-degree shoulder arches and wide 54-cm seat base ensure optimal weight distribution for long-lasting comfort during gaming marathons.', 2, 19, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(13, 'KD DMTR Gaming Desktop PC', 'Multiple connectivity options including HDMI, USB ports & RGB fans let you connect a variety of peripherals easily.\nWi-Fi Ready – Connect to the internet wirelessly with ease.\nPreloaded with Windows 10 64-bit OS for enhanced productivity and multitasking.', 2, 1, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(14, 'Raptor Gameing Z95', 'Multiple connectivity options including HDMI, USB ports & RGB fans let you connect a variety of peripherals easily.\nWi-Fi Ready – Connect to the internet wirelessly with ease.\nPreloaded with Windows 10 64-bit OS for enhanced productivity and multitasking.', 2, 15, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(15, 'Radeon RX 120 GTS  Graphics Card', 'Microsoft Windows 10 and Microsoft DirectX 12 supported Video Memory: 8GB DDR5. The XFX Radeon RX 580 Series graphics card coupled with AMD LiquidVR technology delivers a virtually stutter-free, low latency experience, essential for remarkable virtual reality environments.', 8, 22, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(16, 'Radeon RX 590 GTS  Graphics Card', 'Microsoft Windows 10 and Microsoft DirectX 12 supported Video Memory: 8GB DDR5. The XFX Radeon RX 580 Series graphics card coupled with AMD LiquidVR technology delivers a virtually stutter-free, low latency experience, essential for remarkable virtual reality environments.', 8, 22, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(17, 'Radeon RX 680 GTS  Graphics Card', 'Microsoft Windows 10 and Microsoft DirectX 12 supported Video Memory: 8GB DDR5. The XFX Radeon RX 580 Series graphics card coupled with AMD LiquidVR technology delivers a virtually stutter-free, low latency experience, essential for remarkable virtual reality environments.', 8, 22, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(18, 'Radeon™ RX 750 XT SPEEDSTER MERC', 'Microsoft Windows 10 and Microsoft DirectX 12 supported Video Memory: 8GB DDR5. The XFX Radeon RX 580 Series graphics card coupled with AMD LiquidVR technology delivers a virtually stutter-free, low latency experience, essential for remarkable virtual reality environments.', 8, 22, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37'),
(19, 'Radeon™ RX 750 XT SPEEDSTER MERC', 'Microsoft Windows 10 and Microsoft DirectX 12 supported Video Memory: 8GB DDR5. The XFX Radeon RX 580 Series graphics card coupled with AMD LiquidVR technology delivers a virtually stutter-free, low latency experience, essential for remarkable virtual reality environments.', 8, 22, 'Available', '2025-01-10 08:31:37', '2025-01-10 08:31:37');

INSERT INTO `user_friends` (`user_id`, `friend_id`) VALUES
(2, 1);

INSERT INTO `users` (`user_id`, `email`, `full_name`, `password`, `gender`, `phone_number`, `date_of_birth`, `role`, `created_by`, `refresh_token`) VALUES
(1, 'son@gmail.com', 'Owner', '$2b$10$fs.itRPLHcDc3ClmgE/b1O8S.pH/a0YJq21OOOUgVZ8cq/JI4k/aG', 1, '0336114129', '2004-04-15', 'OWNER', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiT1dORVIiLCJrZXkiOiJXc0VTOGEiLCJpYXQiOjE3NDI3NDU2MDEsImV4cCI6MTc0MjgzMjAwMX0.F-2HDtRXgTVtuumz5OGndPLJSBJyqh4fjaIAiPJLh4U'),
(2, 'test@gmail.com', 'Test User', '$2b$10$fs.itRPLHcDc3ClmgE/b1O8S.pH/a0YJq21OOOUgVZ8cq/JI4k/aG', 1, '0336114129', '2004-04-15', 'USER', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiVVNFUiIsImtleSI6IlJPSkpUcCIsImlhdCI6MTc0Mjc0NTU4OSwiZXhwIjoxNzQyODMxOTg5fQ.Lb1zU8uJYG2IA9HCkRCFH2AiTvgkalELjY7qximBs_U');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;