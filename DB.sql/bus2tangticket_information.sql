-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bus2tangticket
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information` (
  `IdInfo` int NOT NULL AUTO_INCREMENT,
  `Cic` varchar(12) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `MiddleName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `DateOfBirth` date NOT NULL,
  `Sex` tinyint(1) NOT NULL DEFAULT '0',
  `PermanentAddress` text NOT NULL,
  `PhoneNumber` varchar(10) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `UpdateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdInfo`),
  UNIQUE KEY `Cic` (`Cic`),
  UNIQUE KEY `PhoneNumber` (`PhoneNumber`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES (1,'012345678901','Nguyễn','Văn','An','1995-05-20',1,'123 Lý Thường Kiệt, Hà Nội','0912345678','nguyenvanan@gmail.com','2025-04-24 14:24:24'),(2,'023456789012','Trần','Thị','Bích','1992-11-10',0,'456 Nguyễn Huệ, TP. HCM','0923456789','tranthibich@gmail.com','2025-04-24 14:24:24'),(3,'034567890123','Lê','Văn','Cường','1988-03-15',1,'789 Lê Lợi, Đà Nẵng','0934567890','levancuong@gmail.com','2025-04-24 14:24:24'),(4,'045678901234','Phạm','Thị','Duyên','1990-07-08',0,'12 Hai Bà Trưng, Cần Thơ','0945678901','phamthiduyen@gmail.com','2025-04-24 14:24:24'),(5,'056789012345','Hoàng','Văn','Em','1998-09-25',1,'45 Trần Phú, Hải Phòng','0956789012','hoangvanem@gmail.com','2025-04-24 14:24:24'),(6,'067890123456','Đỗ','Thị','Phương','1996-01-30',0,'99 Nguyễn Trãi, Huế','0967890123','dothiphuong@gmail.com','2025-04-24 14:24:24'),(7,'123456789003','Lê','Minh','Thông','2000-12-20',1,'75 An Dương Vương, TPHCM','0900000004','leminhthonga@gmail.com','2025-06-15 11:57:49');
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16  7:14:25
