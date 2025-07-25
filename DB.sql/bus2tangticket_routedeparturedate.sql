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
-- Table structure for table `routedeparturedate`
--

DROP TABLE IF EXISTS `routedeparturedate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routedeparturedate` (
  `IdRouteDepartureDate` int NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  `IdBusRoute` int NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1',
  `NumberOfSeats` int NOT NULL,
  PRIMARY KEY (`IdRouteDepartureDate`),
  UNIQUE KEY `unique_route_departure` (`IdBusRoute`,`Date`),
  CONSTRAINT `routedeparturedate_ibfk_1` FOREIGN KEY (`IdBusRoute`) REFERENCES `busroute` (`IdBusRoute`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routedeparturedate`
--

LOCK TABLES `routedeparturedate` WRITE;
/*!40000 ALTER TABLE `routedeparturedate` DISABLE KEYS */;
INSERT INTO `routedeparturedate` VALUES (1,'2025-06-19',1,1,8),(4,'2025-04-19',2,0,0),(5,'2025-04-20',2,0,0),(6,'2025-04-21',2,0,0),(7,'2025-04-19',3,0,0),(8,'2025-04-20',3,0,0),(9,'2025-04-21',3,0,0),(10,'2025-06-16',4,1,9);
/*!40000 ALTER TABLE `routedeparturedate` ENABLE KEYS */;
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
