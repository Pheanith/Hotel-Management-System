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
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(255) NOT NULL,
  `accomodationType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `roomType` varchar(255) NOT NULL,
  `floorNumber` varchar(50) NOT NULL,
  `roomNumber` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('Available','Unavailable','In maintenance') NOT NULL,
  `availableFrom` date DEFAULT NULL,
  `availableTo` date DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'B','hotel room','Family Room','1st','104',200.00,'Available','2024-08-20','2024-08-30','Have wifi'),(2,'A','hotel room','Family Room','1st','102',200.00,'Available','2024-08-01','2024-08-31','Have wifi'),(3,'B','hotel room','Double Room','1st','108',200.00,'Available','2024-08-01','2024-08-31','Have wifi'),(4,'A','home stay','Single Room','1st','109',200.00,'Available','2024-08-01','2024-08-31','Have fast wifi'),(5,'A','hotel room','Single Room','1st','103',400.00,'Unavailable','2024-08-30','2024-09-24','Have 2 pillows'),(6,'C','hotel room','Double Room','1st','105',200.00,'Available','2024-08-22','2024-08-31','Have me'),(7,'C','home stay','Family Room','1st','202',400.00,'Unavailable',NULL,NULL,'hajfh'),(8,'D','hotel room','King Room','1st','120',400.00,'Available',NULL,NULL,''),(9,'D','hotel room','Single Room','1st','110',400.00,'Available','2024-08-23','2024-08-31','kdmv'),(10,'F','hotel room','Queen Room','1st','120',400.00,'Available','2024-08-29','2024-08-31','Have 2 big beds'),(11,'F','','Single Room','1st','130',400.00,'Available','2024-08-27','2024-08-31','Have wifi'),(12,'F','hotel room','Single Room','1st','130',100.00,'Available','2024-08-27','2024-08-31','Have one bad'),(13,'A','hotel room','Family Room','1st','104',100.00,'Available','2024-08-27','2024-08-31','Have 3 beds');
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

-- Dump completed on 2024-08-27 15:38:08
