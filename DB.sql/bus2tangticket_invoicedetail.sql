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
-- Table structure for table `invoicedetail`
--

DROP TABLE IF EXISTS `invoicedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicedetail` (
  `IdInvoiceDetail` int NOT NULL AUTO_INCREMENT,
  `IdUserBook` int NOT NULL,
  `IdRouteDepartureDate` int NOT NULL,
  `IdInvoice` int NOT NULL,
  `IdTicketPrice` int NOT NULL,
  `VoucherCode` varchar(50) DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `ChildCount` int NOT NULL DEFAULT '0',
  `ParentCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdInvoiceDetail`),
  KEY `IdUserBook` (`IdUserBook`),
  KEY `IdRouteDepartureDate` (`IdRouteDepartureDate`),
  KEY `IdInvoice` (`IdInvoice`),
  KEY `VoucherCode` (`VoucherCode`),
  KEY `IdTicketPrice` (`IdTicketPrice`),
  CONSTRAINT `ticketorder_ibfk_1` FOREIGN KEY (`IdUserBook`) REFERENCES `userbook` (`IdUserBook`),
  CONSTRAINT `ticketorder_ibfk_2` FOREIGN KEY (`IdRouteDepartureDate`) REFERENCES `routedeparturedate` (`IdRouteDepartureDate`),
  CONSTRAINT `ticketorder_ibfk_3` FOREIGN KEY (`IdInvoice`) REFERENCES `invoice` (`IdInvoice`),
  CONSTRAINT `ticketorder_ibfk_4` FOREIGN KEY (`IdTicketPrice`) REFERENCES `ticketprice` (`IdTicketPrice`),
  CONSTRAINT `ticketorder_ibfk_5` FOREIGN KEY (`VoucherCode`) REFERENCES `voucher` (`VoucherCode`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicedetail`
--

LOCK TABLES `invoicedetail` WRITE;
/*!40000 ALTER TABLE `invoicedetail` DISABLE KEYS */;
INSERT INTO `invoicedetail` VALUES (1,1,1,1,1,'WELCOME10',4600000.00,2,2),(2,1,1,2,1,'WELCOME10',4600000.00,2,2),(3,1,1,3,1,'WELCOME10',4600000.00,2,2);
/*!40000 ALTER TABLE `invoicedetail` ENABLE KEYS */;
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
