/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `ngayDen` datetime NOT NULL,
  `ngayDi` datetime NOT NULL,
  `soLuongKhach` int NOT NULL DEFAULT '1',
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
  `user_id` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_room_id_5` (`room_id`),
  KEY `fk_user_id_5` (`user_id`),
  CONSTRAINT `fk_room_id_5` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `fk_user_id_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL,
  `saoBinhLuan` tinyint NOT NULL DEFAULT '5',
  PRIMARY KEY (`comment_id`),
  KEY `fk_user_id_4` (`user_id`),
  KEY `fk_room_id_4` (`room_id`),
  CONSTRAINT `fk_room_id_4` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `fk_user_id_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_chk_1` CHECK ((`saoBinhLuan` between 0 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `tenViTri` varchar(255) NOT NULL,
  `tinhThanh` varchar(255) NOT NULL,
  `quocGia` varchar(255) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `permissions` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role_permission` (
  `role_permission_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_permission_id`),
  KEY `fk_role_id_2` (`role_id`),
  KEY `fk_permission_id` (`permission_id`),
  CONSTRAINT `fk_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  CONSTRAINT `fk_role_id_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `tenPhong` varchar(255) NOT NULL,
  `khach` int NOT NULL DEFAULT '1',
  `phongNgu` int NOT NULL DEFAULT '1',
  `giuong` int NOT NULL DEFAULT '1',
  `phongTam` int NOT NULL DEFAULT '1',
  `description` varchar(255) NOT NULL,
  `giaTien` double DEFAULT NULL,
  `mayGiat` tinyint(1) NOT NULL DEFAULT '1',
  `banLa` tinyint(1) NOT NULL DEFAULT '1',
  `tivi` tinyint(1) NOT NULL DEFAULT '1',
  `dieuHoa` tinyint(1) NOT NULL DEFAULT '1',
  `wifi` tinyint(1) NOT NULL DEFAULT '1',
  `bep` tinyint(1) NOT NULL DEFAULT '1',
  `doXe` tinyint(1) NOT NULL DEFAULT '1',
  `hoBoi` tinyint(1) NOT NULL DEFAULT '1',
  `banUi` tinyint(1) NOT NULL DEFAULT '1',
  `user_id` int NOT NULL,
  `location_id` int NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`room_id`),
  KEY `fk_user_id_3` (`user_id`),
  CONSTRAINT `fk_user_id_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) NOT NULL DEFAULT '0',
  `google_id` varchar(255) DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_role_id` (`role_id`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `booking` (`booking_id`, `room_id`, `ngayDen`, `ngayDi`, `soLuongKhach`, `status`, `user_id`) VALUES
(1, 33, '2025-06-10 14:00:00', '2025-06-12 11:00:00', 1, 'PENDING', 33);
INSERT INTO `booking` (`booking_id`, `room_id`, `ngayDen`, `ngayDi`, `soLuongKhach`, `status`, `user_id`) VALUES
(2, 21, '2025-05-10 14:00:00', '2025-05-12 11:00:00', 2, 'PENDING', 20);
INSERT INTO `booking` (`booking_id`, `room_id`, `ngayDen`, `ngayDi`, `soLuongKhach`, `status`, `user_id`) VALUES
(3, 22, '2025-05-15 14:00:00', '2025-05-17 11:00:00', 3, 'CONFIRMED', 21);
INSERT INTO `booking` (`booking_id`, `room_id`, `ngayDen`, `ngayDi`, `soLuongKhach`, `status`, `user_id`) VALUES
(4, 23, '2025-05-20 15:00:00', '2025-05-22 11:00:00', 1, 'CANCELLED', 22),
(5, 24, '2025-05-08 14:00:00', '2025-05-10 11:00:00', 4, 'CONFIRMED', 23),
(6, 25, '2025-06-01 13:00:00', '2025-06-03 11:00:00', 2, 'PENDING', 24),
(7, 31, '2025-06-05 14:00:00', '2025-06-07 11:00:00', 2, 'CONFIRMED', 30),
(8, 27, '2025-06-10 15:00:00', '2025-06-12 11:00:00', 1, 'PENDING', 32),
(9, 28, '2025-06-15 14:00:00', '2025-06-17 11:00:00', 2, 'CANCELLED', 31),
(10, 29, '2025-06-20 14:00:00', '2025-06-22 11:00:00', 3, 'CONFIRMED', 31),
(11, 30, '2025-06-25 14:00:00', '2025-06-27 11:00:00', 2, 'PENDING', 45);

INSERT INTO `comments` (`comment_id`, `room_id`, `user_id`, `created_at`, `update_at`, `content`, `saoBinhLuan`) VALUES
(7, 33, 33, '2025-05-03 08:08:40', '2025-05-03 08:08:40', 'qưeqqwe', 0);
INSERT INTO `comments` (`comment_id`, `room_id`, `user_id`, `created_at`, `update_at`, `content`, `saoBinhLuan`) VALUES
(8, 33, 33, '2025-05-03 08:09:22', '2025-05-03 08:09:22', 'qưeqqwe', 0);
INSERT INTO `comments` (`comment_id`, `room_id`, `user_id`, `created_at`, `update_at`, `content`, `saoBinhLuan`) VALUES
(9, 33, 33, '2025-05-03 08:10:54', '2025-05-03 08:10:54', 'qưeqqwe', 0);
INSERT INTO `comments` (`comment_id`, `room_id`, `user_id`, `created_at`, `update_at`, `content`, `saoBinhLuan`) VALUES
(10, 33, 33, '2025-05-03 08:11:16', '2025-05-03 08:11:16', 'qưeqqwe', 5);

INSERT INTO `locations` (`location_id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`, `created_at`, `update_at`) VALUES
(2, 'string', 'string', 'string', 'string', '2025-04-29 11:15:49', '2025-05-02 16:56:08');
INSERT INTO `locations` (`location_id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`, `created_at`, `update_at`) VALUES
(4, 'Quận 1', 'TP. Hồ Chí Minh', 'Việt Nam', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', '2025-04-29 11:15:49', '2025-04-29 11:15:49');
INSERT INTO `locations` (`location_id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`, `created_at`, `update_at`) VALUES
(5, 'Quận 3', 'TP. Hồ Chí Minh', 'Việt Nam', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', '2025-04-29 11:15:49', '2025-04-29 11:15:49');
INSERT INTO `locations` (`location_id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`, `created_at`, `update_at`) VALUES
(6, 'Thủ Đức', 'TP. Hồ Chí Minh', 'Việt Nam', 'https://images.unsplash.com/photo-1601276727030-cbc1e4cd82e2', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(7, 'Hải Châu', 'Đà Nẵng', 'Việt Nam', 'https://images.unsplash.com/photo-1601455763550-f80daccb1a2d', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(8, 'Sơn Trà', 'Đà Nẵng', 'Việt Nam', 'https://images.unsplash.com/photo-1622447656722-761c734ac29d', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(9, 'Phú Hội', 'Thừa Thiên Huế', 'Việt Nam', 'https://images.unsplash.com/photo-1584351612111-3c2b7a126cdd', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(10, 'Thuận Hòa', 'Thừa Thiên Huế', 'Việt Nam', 'https://images.unsplash.com/photo-1614871131749-64d747dd8546', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(11, 'Ninh Kiều', 'Cần Thơ', 'Việt Nam', 'https://images.unsplash.com/photo-1607421055241-3c0d2b4c2920', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(12, 'Bình Thủy', 'Cần Thơ', 'Việt Nam', 'https://images.unsplash.com/photo-1607420932825-370927965b7e', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(13, 'Lê Chân', 'Hải Phòng', 'Việt Nam', 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(14, 'Ngô Quyền', 'Hải Phòng', 'Việt Nam', 'https://images.unsplash.com/photo-1554907982-bc31f68d8e90', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(15, 'Đà Lạt', 'Lâm Đồng', 'Việt Nam', 'https://images.unsplash.com/photo-1601379320553-4b9c4b5796d0', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(16, 'Bảo Lộc', 'Lâm Đồng', 'Việt Nam', 'https://images.unsplash.com/photo-1614251058745-63018ec8b2c3', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(17, 'Hạ Long', 'Quảng Ninh', 'Việt Nam', 'https://images.unsplash.com/photo-1599892473656-b98ec014c318', '2025-04-29 11:15:49', '2025-04-29 11:15:49'),
(18, 'Cẩm Phả', 'Quảng Ninh', 'Việt Nam', 'https://images.unsplash.com/photo-1607577767428-94fefcdbde7f', '2025-04-29 11:15:49', '2025-04-29 11:15:49');





INSERT INTO `roles` (`role_id`, `name`, `description`, `is_active`, `created_at`, `update_at`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Viên', 1, '2025-04-23 11:27:12', '2025-04-23 11:27:12');
INSERT INTO `roles` (`role_id`, `name`, `description`, `is_active`, `created_at`, `update_at`) VALUES
(2, 'ROLE_HOSTED', 'Chủ Nhà', 0, '2025-04-23 11:27:36', '2025-04-23 11:27:49');
INSERT INTO `roles` (`role_id`, `name`, `description`, `is_active`, `created_at`, `update_at`) VALUES
(3, 'ROLE_USER', 'Thành Viên', 1, '2025-04-23 11:28:36', '2025-04-23 11:28:36');

INSERT INTO `rooms` (`room_id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `description`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `user_id`, `location_id`, `hinhAnh`, `created_at`, `update_at`) VALUES
(21, 'Phòng Deluxe View Hồ', 2, 1, 1, 1, 'Phòng có view hồ tuyệt đẹp', 750000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 20, 1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', '2025-04-29 11:19:36', '2025-04-29 11:19:36');
INSERT INTO `rooms` (`room_id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `description`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `user_id`, `location_id`, `hinhAnh`, `created_at`, `update_at`) VALUES
(22, 'Căn hộ Studio hiện đại', 2, 1, 1, 1, 'Căn hộ tiện nghi giữa trung tâm', 850000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 21, 2, 'https://images.unsplash.com/photo-1600585154032-3794b20d4d0c', '2025-04-29 11:19:36', '2025-04-29 11:19:36');
INSERT INTO `rooms` (`room_id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `description`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `user_id`, `location_id`, `hinhAnh`, `created_at`, `update_at`) VALUES
(23, 'Phòng đôi cạnh biển', 4, 2, 2, 2, 'Phù hợp cho nhóm bạn hoặc gia đình', 950000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 22, 3, 'https://images.unsplash.com/photo-1560448075-bb4bfcf4eb6a', '2025-04-29 11:19:36', '2025-04-29 11:19:36');
INSERT INTO `rooms` (`room_id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `description`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `user_id`, `location_id`, `hinhAnh`, `created_at`, `update_at`) VALUES
(24, 'Căn hộ ấm cúng tại trung tâm', 3, 2, 2, 1, 'Không gian ấm cúng với nội thất gỗ', 890000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 23, 4, 'https://images.unsplash.com/photo-1600585152936-00f18b1f1f2d', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(25, 'Phòng nhỏ giá rẻ', 1, 1, 1, 1, 'Phòng đơn tiết kiệm cho người du lịch', 350000, 1, 0, 1, 0, 1, 0, 0, 0, 0, 24, 5, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(27, 'Phòng gác lửng độc đáo', 2, 1, 1, 1, 'Không gian trẻ trung với gác lửng', 780000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 26, 7, 'https://images.unsplash.com/photo-1588854337221-dc3e7c7b4a4a', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(28, 'Căn hộ mini tiện nghi', 2, 1, 1, 1, 'Phù hợp cho người đi công tác', 670000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 28, 8, 'https://images.unsplash.com/photo-1600607688882-2e8b3ec3a67f', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(29, 'Villa nghỉ dưỡng view đồi', 6, 4, 4, 3, 'Villa với không gian thiên nhiên', 2200000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 29, 9, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(30, 'Phòng đơn cho cặp đôi', 2, 1, 1, 1, 'Lý tưởng cho cặp đôi', 580000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 30, 10, 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(31, 'Phòng ấm áp tại Đà Lạt', 3, 2, 2, 1, 'Không khí mát mẻ, view đồi thông', 790000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 31, 11, 'https://images.unsplash.com/photo-1600585153175-74f9f56d9a58', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(32, 'Căn hộ nghỉ dưỡng cạnh biển', 4, 2, 2, 2, 'Không gian biển cả và thư giãn', 1200000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 32, 12, 'https://images.unsplash.com/photo-1600585154221-0c5f8973769b', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(33, 'string', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 0, 'https://res.cloudinary.com/khangtran123/image/upload/v1746203314/rooms/sbhe67arnkb5ig2ixl5d.jpg', '2025-04-29 11:19:36', '2025-05-02 16:28:33'),
(34, 'Phòng ven sông', 2, 1, 1, 1, 'Phong cách nhẹ nhàng, mộc mạc', 690000, 1, 1, 1, 1, 1, 0, 1, 0, 1, 34, 14, 'https://images.unsplash.com/photo-1618221642051-0bb1a37d13c2', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(35, 'Căn hộ hiện đại tại trung tâm', 3, 2, 2, 2, 'Nội thất cao cấp, tiện nghi đầy đủ', 1350000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 32, 15, 'https://images.unsplash.com/photo-1605276374104-dee2a0ed9e96', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(36, 'Phòng tầng thượng có ban công', 2, 1, 1, 1, 'Ban công rộng, ánh sáng tốt', 820000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 31, 16, 'https://images.unsplash.com/photo-1600585152928-0302b4f5c3c1', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(37, 'Phòng cổ điển Huế', 2, 1, 1, 1, 'Phong cách cổ kính Huế xưa', 730000, 1, 1, 1, 1, 1, 0, 0, 0, 1, 37, 17, 'https://images.unsplash.com/photo-1585478442634-6b80d0f8cbb1', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(38, 'Căn hộ sân vườn mini', 4, 2, 2, 2, 'Có sân vườn nhỏ và bếp riêng', 1150000, 1, 1, 1, 1, 1, 1, 1, 0, 1, 35, 18, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(39, 'Phòng tại khu phố cổ', 2, 1, 1, 1, 'Nằm trong khu phố cổ yên tĩnh', 770000, 1, 1, 1, 1, 1, 0, 1, 0, 1, 32, 19, 'https://images.unsplash.com/photo-1588854337221-88e4294d23ef', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(40, 'Phòng đôi hiện đại', 2, 1, 1, 1, 'Thiết kế hiện đại, tinh tế', 890000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 31, 1, 'https://images.unsplash.com/photo-1588854337221-d7a5ef41b4a4', '2025-04-29 11:19:36', '2025-04-29 11:19:36'),
(41, 'aaaa', 1, 2, 3, 4, 'string', 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 33, 4, '', '2025-04-30 19:03:13', '2025-04-30 19:03:13'),
(42, 'ưeqweqw', 1, 2, 3, 4, 'string', 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 33, 4, '', '2025-04-30 19:04:47', '2025-04-30 19:04:47'),
(43, 'ưeqweqw', 1, 2, 3, 4, 'string', 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 33, 4, '', '2025-04-30 19:06:05', '2025-04-30 19:06:05');

INSERT INTO `users` (`user_id`, `email`, `password`, `userName`, `avatar`, `birth_day`, `phone`, `gender`, `google_id`, `face_app_id`, `created_at`, `update_at`, `role_id`) VALUES
(20, 'user1@example.com', '12345678xx', 'User 1', 'https://i.pravatar.cc/150?img=1', '1995-01-01', '0912345678', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3);
INSERT INTO `users` (`user_id`, `email`, `password`, `userName`, `avatar`, `birth_day`, `phone`, `gender`, `google_id`, `face_app_id`, `created_at`, `update_at`, `role_id`) VALUES
(21, 'user2@example.com', '12345678xx', 'User 2', 'https://i.pravatar.cc/150?img=2', '1995-01-01', '0987654321', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3);
INSERT INTO `users` (`user_id`, `email`, `password`, `userName`, `avatar`, `birth_day`, `phone`, `gender`, `google_id`, `face_app_id`, `created_at`, `update_at`, `role_id`) VALUES
(22, 'user3@example.com', '12345678xx', 'User 3', 'https://i.pravatar.cc/150?img=3', '1995-01-01', '0901234567', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3);
INSERT INTO `users` (`user_id`, `email`, `password`, `userName`, `avatar`, `birth_day`, `phone`, `gender`, `google_id`, `face_app_id`, `created_at`, `update_at`, `role_id`) VALUES
(23, 'user4@example.com', 'xxxxxxxx', 'User 4', 'https://i.pravatar.cc/150?img=4', '1995-01-01', '0934567890', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(24, 'user5@example.com', '12345678xx', 'User 5', 'https://i.pravatar.cc/150?img=5', '1995-01-01', '0978123456', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(25, 'user6@example.com', '12345678xx', 'User 6', 'https://i.pravatar.cc/150?img=6', '1995-01-01', '0923456789', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(26, 'user7@example.com', '12345678xx', 'User 7', 'https://i.pravatar.cc/150?img=7', '1995-01-01', '0967890123', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(27, 'user8@example.com', '12345678xx', 'User 8', 'https://i.pravatar.cc/150?img=8', '1995-01-01', '0945678901', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(28, 'user9@example.com', '12345678xx', 'User 9', 'https://i.pravatar.cc/150?img=9', '1995-01-01', '0899123456', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(29, 'user10@example.com', 'xxxxxxxxxxx', 'User 10', 'https://i.pravatar.cc/150?img=10', '1995-01-01', '0881234567', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(30, 'user11@example.com', '12345678xx', 'User 11', 'https://i.pravatar.cc/150?img=11', '1995-01-01', '0834567890', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(31, 'user12@example.com', '12345678xx', 'User 12', 'https://i.pravatar.cc/150?img=12', '1995-01-01', '0856789012', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(32, 'user50@example.com', '12345678xx', 'User 50', 'https://i.pravatar.cc/150?img=50', '1995-01-01', '0861234567', 0, NULL, NULL, '2025-04-27 11:38:47', '2025-05-04 15:09:58', 3),
(33, 'khai1234@gmail.com', '$2b$10$FID81KLhlbqogTSuMELsBehqQAnc7.z1j413IMP/YnMKoJwD3MbiG', 'Khang', 'https://res.cloudinary.com/khangtran123/image/upload/v1745855307/avatar/mxzh5mmuqp5qd3b71vrn.jpg', NULL, '0872345678', 0, NULL, NULL, '2025-04-28 03:51:41', '2025-05-04 15:09:58', 3),
(34, 'khang_123@gmail.com', '$2b$10$fMw3ce2NB2rondXGiGXaXeosTPFBi6X8YsqyOmRM8Leumr6PHiF86', 'Khang', NULL, NULL, '0703456789', 0, NULL, NULL, '2025-04-28 04:18:55', '2025-05-04 15:09:58', 3),
(35, 'khang_12351@gmail.com', '$2b$10$gOfYCyR0SeRPHei6up.JoOYLlRF3/1JmRziVANYlhFMhuNfE.OLJ6', 'Khang', NULL, NULL, '0794567890', 0, NULL, NULL, '2025-04-28 04:19:48', '2025-05-04 15:09:58', 3),
(36, 'khang_151@gmail.com', '$2b$10$CFSyA04I6tj1rlg2UCw7fOp5KyAUXxAeAXuWadLJwsyWfRb.sAr1q', 'Khang', NULL, NULL, '0775678901', 0, NULL, NULL, '2025-04-28 04:22:46', '2025-05-04 15:09:58', 3),
(37, 'khang151@gmail.com', '$2b$10$UvkS7Q.k1KUyERhG.j1Ubea5XwwdinM0PStuDfxbasg.3ZnY.ORgq', 'Khang', NULL, '1996-10-01', '0786789012', 0, NULL, NULL, '2025-04-28 04:36:40', '2025-05-04 15:09:58', 3),
(44, 'khai2353@gmail.com', '$2b$10$b7CoeiT0TsZy.oXC20i.f.pFk.LwnkidLfhqj5h0WDExGEeFrbXaG', 'Khang', 'http://localhost:8000/upload/local-1745818564889-555237760-16-12-2024-11-41-57-hawai.jpg.jpg', NULL, '0767890123', 0, NULL, NULL, '2025-04-28 05:36:05', '2025-05-04 15:09:58', 3),
(45, 'khai123456@gmail.com', '$2b$10$W0OdARcGJfJ/CO6R2DsD6uP6nXaMlw6db4TceBd312p50mkPRnnF6', 'khang', NULL, NULL, '0951234567', 0, NULL, NULL, '2025-04-30 21:19:27', '2025-05-04 15:09:58', 3);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;