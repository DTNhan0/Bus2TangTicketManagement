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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `IdAccount` int NOT NULL AUTO_INCREMENT,
  `IdInfo` int NOT NULL,
  `AccountName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsLocked` tinyint(1) NOT NULL DEFAULT '1',
  `IdPerGroup` int DEFAULT NULL,
  PRIMARY KEY (`IdAccount`),
  UNIQUE KEY `AccountName` (`AccountName`),
  KEY `authority_ibfk_1` (`IdInfo`),
  KEY `FKml466o36kui1767x3wtf2knxv` (`IdPerGroup`),
  CONSTRAINT `authority_ibfk_1` FOREIGN KEY (`IdInfo`) REFERENCES `information` (`IdInfo`),
  CONSTRAINT `FKml466o36kui1767x3wtf2knxv` FOREIGN KEY (`IdPerGroup`) REFERENCES `permissiongroup` (`IdPerGroup`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,1,'nguyenvanan','$2a$10$hashpasswordexample1',1,NULL),(2,2,'tranthibich','$2a$10$hashpasswordexample2',0,NULL),(3,3,'levancuong','$2a$10$hashpasswordexample3',1,NULL),(4,4,'phamthiduyen','$2a$10$hashpasswordexample4',1,NULL),(5,5,'hoangvanem','$2a$10$hashpasswordexample5',0,NULL),(6,6,'dothiphuong','$2a$10$hashpasswordexample6',0,1),(8,1,'superadmin','$2a$10$zvqEeOy5E5s4bXABzE0mJeQ3y/I3v8H3Q2TBwR9uDrh0wMlaIpz62',0,1),(9,7,'leminhthong','12345678',1,NULL),(10,1,'test','$2a$10$oZfv.U24AwXNCG/px3.Ayel/EHnFVAHM0i4sKbYDx.j43VfHgPEKa',0,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16  7:14:26
