-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_management
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accommodation_types`
--

DROP TABLE IF EXISTS `accommodation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accommodation_types` (
  `accommodation_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`accommodation_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accommodation_types`
--

LOCK TABLES `accommodation_types` WRITE;
/*!40000 ALTER TABLE `accommodation_types` DISABLE KEYS */;
INSERT INTO `accommodation_types` VALUES (1,'Hotel','Hotels provide guests a room and access to additional hotel amenities and services, including food, housekeeping, concierge, Wi-Fi, and more.'),(2,'Resorts','Resorts are similar in concept to hotels, but this type of accommodation is designed to function as a self-contained development that can be described as a holiday destination.'),(3,'Hostel','Hostels are a form of budget-friendly, shared accommodation, often aimed at specific types of travelers, such as backpackers, gap year travelers, or students.'),(4,'Bed and Breakfast','Bed and breakfasts, or B&Bs, are types of accommodation that offer overnight stays and breakfast in the morning.');
/*!40000 ALTER TABLE `accommodation_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `guest_id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `sex` enum('Male','Female') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Male',
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` text,
  `identity_type` enum('Identity card','Passport') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Identity card',
  `identity_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`guest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (7,'Sopheanith','Nou','Female','089409406','nou.sopheanith@gmail.com','Veal Vong, 7 Makara','Identity card','123456789'),(8,'Ily','Lao','Female','012345678','lao.ily@gmail.com','Kampong Cham','Passport','753746'),(10,'Sona','Khorn','Female','010567824','sonakhorn@gamil.com','Siem Reap','Identity card','34857922'),(11,'Sereiboth','Sim','Male','012567893','simsereiboth@gmail.com','Siem Reap','Passport','13873932'),(12,'Makara','Rorn','Female','0115836293','rorn.makara@gmail.com','Phnom Penh','Identity card','26194720'),(13,'Sovan Kallianey','Samnang','Female','015346783','jessi@gmail.com','Phnom Penh','Passport','147230573'),(14,'Somengheang','Doung','Female','012574823','mengheang@gmail.com','Phnom Penh','Identity card','4215835'),(15,'Sengly','Un','Female','08367242','sengly@gmail.com','Phnom Penh','Identity card','1473462'),(16,'Un','Sengly','Female','0127485364','sengly@gmail.com','Phnom Penh','Identity card','2554154'),(17,'Sopheanith','Nou','Male','089409406','nou.sopheanith@gmail.com','Veal Vong, 7 Makara','Identity card','4556'),(18,'Sopheanith','Nou','Male','089409406','nou.sopheanith@gmail.com','Veal Vong, 7 Makara','Identity card','9'),(20,'Sopheanith111','Nou','Male','089409406','nou.sopheanith@gmail.com','Veal Vong, 7 Makara','Identity card','112'),(24,'Seom','Seakmeng','Female','012345678','seakmeng@gmail.com','Phnom Penh','Identity card','73682348'),(25,'Chharng','Chhit','Male','012345678','chhit@gmail.com','Phnom Penh','Identity card','12346477'),(26,'Neth','Sopanha','Female','012567823','sopanha@gmail.com','Phom Penh','Passport','3269424');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `guest_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  `payment_method` enum('Cash','Visa/Master card','Paypal') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `guest_id` (`guest_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_details`
--

DROP TABLE IF EXISTS `reservation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_details` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `reservation_details_ibfk_1` (`reservation_id`),
  KEY `reservation_details_ibfk_2` (`room_id`),
  CONSTRAINT `reservation_details_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_details_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_details`
--

LOCK TABLES `reservation_details` WRITE;
/*!40000 ALTER TABLE `reservation_details` DISABLE KEYS */;
INSERT INTO `reservation_details` VALUES (1,NULL,1),(2,NULL,1),(3,NULL,1),(4,NULL,1),(5,NULL,1),(6,NULL,1),(7,46,1),(8,47,1),(9,48,1),(10,49,1),(11,50,NULL),(12,51,NULL),(13,52,NULL),(14,53,NULL),(15,54,NULL),(16,55,NULL),(17,56,NULL),(18,57,6),(19,58,6),(20,60,1),(21,61,6),(22,62,1),(23,63,6),(24,64,5),(25,65,1),(26,66,6);
/*!40000 ALTER TABLE `reservation_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int DEFAULT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `checkin_status` varchar(255) DEFAULT NULL,
  `checkout_status` varchar(255) DEFAULT NULL,
  `checkin_time` datetime DEFAULT NULL,
  `checkout_time` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `invoice_id` int DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `guest_id` (`guest_id`),
  KEY `fk_invoice_id` (`invoice_id`),
  CONSTRAINT `fk_invoice_id` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`) ON DELETE SET NULL,
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,10,'2024-09-11','2024-09-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:04:39','2024-09-11 08:04:39',NULL,NULL),(2,10,'2024-10-09','2024-10-09','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:12:54','2024-09-11 08:12:54',NULL,NULL),(5,10,'2024-10-12','2024-10-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:30:37','2024-09-11 08:30:37',NULL,NULL),(6,10,'2024-10-12','2024-10-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:31:13','2024-09-11 08:31:13',NULL,NULL),(7,10,'2024-10-10','2024-10-10','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:32:41','2024-09-11 08:32:41',NULL,NULL),(8,10,'2024-10-10','2024-10-10','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:33:37','2024-09-11 08:33:37',NULL,NULL),(9,10,'2024-10-10','2024-10-10','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:36:07','2024-09-11 08:36:07',NULL,NULL),(10,10,'2024-10-12','2024-10-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:37:35','2024-09-11 08:37:35',NULL,NULL),(11,10,'2024-10-12','2024-10-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:37:57','2024-09-11 08:37:57',NULL,NULL),(12,11,'2024-11-12','2024-11-12','not_checked_in','not_checked_out',NULL,NULL,'2024-09-11 08:47:29','2024-09-11 08:47:29',NULL,NULL),(13,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:33:12','2024-09-17 09:33:12',NULL,NULL),(14,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:34:12','2024-09-17 09:34:12',NULL,NULL),(15,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:36:13','2024-09-17 09:36:13',NULL,NULL),(16,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:36:43','2024-09-17 09:36:43',NULL,NULL),(17,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:38:59','2024-09-17 09:38:59',NULL,NULL),(18,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:39:16','2024-09-17 09:39:16',NULL,NULL),(19,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:39:32','2024-09-17 09:39:32',NULL,NULL),(20,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:40:00','2024-09-17 09:40:00',NULL,NULL),(21,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:40:09','2024-09-17 09:40:09',NULL,NULL),(22,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:40:12','2024-09-17 09:40:12',NULL,NULL),(23,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:47:08','2024-09-17 09:47:08',NULL,NULL),(24,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:49:12','2024-09-17 09:49:12',NULL,NULL),(25,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:49:13','2024-09-17 09:49:13',NULL,NULL),(26,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:49:23','2024-09-17 09:49:23',NULL,NULL),(27,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:49:24','2024-09-17 09:49:24',NULL,NULL),(28,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:50:00','2024-09-17 09:50:00',NULL,NULL),(29,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 09:51:24','2024-09-17 09:51:24',NULL,NULL),(30,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:06:21','2024-09-17 10:06:21',NULL,NULL),(31,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:06:41','2024-09-17 10:06:41',NULL,NULL),(32,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:07:25','2024-09-17 10:07:25',NULL,NULL),(33,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:07:59','2024-09-17 10:07:59',NULL,NULL),(34,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:10:01','2024-09-17 10:10:01',NULL,NULL),(35,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:12:10','2024-09-17 10:12:10',NULL,NULL),(36,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:12:32','2024-09-17 10:12:32',NULL,NULL),(37,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:13:15','2024-09-17 10:13:15',NULL,NULL),(38,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:13:38','2024-09-17 10:13:38',NULL,NULL),(39,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:14:17','2024-09-17 10:14:17',NULL,NULL),(40,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:15:13','2024-09-17 10:15:13',NULL,NULL),(41,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:17:04','2024-09-17 10:17:04',NULL,NULL),(42,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:17:22','2024-09-17 10:17:22',NULL,NULL),(43,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:17:41','2024-09-17 10:17:41',NULL,NULL),(44,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:19:06','2024-09-17 10:19:06',NULL,NULL),(45,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:19:30','2024-09-17 10:19:30',NULL,NULL),(46,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:19:49','2024-09-17 10:19:49',NULL,NULL),(47,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:20:55','2024-09-17 10:20:55',NULL,NULL),(48,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:21:12','2024-09-17 10:21:12',NULL,NULL),(49,20,'2024-02-01','2024-02-03',NULL,NULL,NULL,NULL,'2024-09-17 10:22:18','2024-09-17 10:22:18',NULL,NULL),(50,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 05:42:34','2024-09-18 05:42:34',NULL,NULL),(51,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 07:00:15','2024-09-18 07:00:15',NULL,NULL),(52,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 07:11:44','2024-09-18 07:11:44',NULL,NULL),(53,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 07:22:27','2024-09-18 07:22:27',NULL,NULL),(54,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 07:32:36','2024-09-18 07:32:36',NULL,NULL),(55,NULL,'2024-09-18','2024-09-20',NULL,NULL,NULL,NULL,'2024-09-18 07:35:14','2024-09-18 07:35:14',NULL,NULL),(56,10,'2024-09-17','2024-09-21',NULL,NULL,NULL,NULL,'2024-09-18 07:41:59','2024-09-18 07:41:59',NULL,0),(57,10,'2024-09-19','2024-09-20','Pending','Pending',NULL,NULL,'2024-09-18 08:23:28','2024-09-18 08:23:28',NULL,NULL),(58,8,'2024-09-19','2024-09-21','Pending','Pending',NULL,NULL,'2024-09-18 08:24:17','2024-09-18 08:24:17',NULL,NULL),(59,11,'2024-09-19','2024-09-21','Pending','Pending',NULL,NULL,'2024-09-18 08:26:00','2024-09-18 08:26:00',NULL,NULL),(60,11,'2024-09-19','2024-09-21','Pending','Pending',NULL,NULL,'2024-09-18 08:31:31','2024-09-18 08:31:31',NULL,NULL),(61,11,'2024-09-19','2024-09-21','Pending','Pending',NULL,NULL,'2024-09-18 08:31:31','2024-09-18 08:31:31',NULL,NULL),(62,7,'2024-09-20','2024-09-23','Pending','Pending',NULL,NULL,'2024-09-18 08:33:06','2024-09-18 08:33:06',NULL,NULL),(63,7,'2024-09-20','2024-09-23','Pending','Pending',NULL,NULL,'2024-09-18 08:33:06','2024-09-18 08:33:06',NULL,NULL),(64,8,'2024-09-19','2024-09-20','Pending','Pending',NULL,NULL,'2024-09-18 08:41:22','2024-09-18 08:41:22',NULL,NULL),(65,8,'2024-09-19','2024-09-20','Pending','Pending',NULL,NULL,'2024-09-18 08:41:22','2024-09-18 08:41:22',NULL,NULL),(66,8,'2024-09-19','2024-09-20','Pending','Pending',NULL,NULL,'2024-09-18 08:41:22','2024-09-18 08:41:22',NULL,NULL);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_types`
--

DROP TABLE IF EXISTS `room_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_types` (
  `room_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`room_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_types`
--

LOCK TABLES `room_types` WRITE;
/*!40000 ALTER TABLE `room_types` DISABLE KEYS */;
INSERT INTO `room_types` VALUES (1,'Single','','A room assigned to one person.'),(2,'Double room','','A room assigned to two people.'),(3,'Triple room','','A room that can accommodate three persons and has been fitted with three twin beds, one double bed and one twin bed or two double beds.'),(4,'Queen room','','A room with a queen-sized bed.'),(5,'King room','','A room with a king-sized bed.');
/*!40000 ALTER TABLE `room_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_number` varchar(50) NOT NULL,
  `room_type_id` int DEFAULT NULL,
  `accommodation_type_id` int DEFAULT NULL,
  `availability_status` enum('Available','Occupied','Maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `floor_number` int DEFAULT NULL,
  `price_per_night` decimal(10,2) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`room_id`),
  KEY `room_type_id` (`room_type_id`),
  KEY `accommodation_type_id` (`accommodation_type_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`room_type_id`),
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`accommodation_type_id`) REFERENCES `accommodation_types` (`accommodation_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'101',1,1,'Available',1,100.00,'kdmv'),(3,'301',3,1,'Maintenance',3,200.00,'Have fast wifi'),(5,'302',4,4,'Available',3,200.00,'Have big bed'),(6,'102',1,1,'Available',1,100.00,'');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-19  0:32:42
