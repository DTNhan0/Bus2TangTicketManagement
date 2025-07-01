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
-- Table structure for table `busstop`
--

DROP TABLE IF EXISTS `busstop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `busstop` (
  `IdBusStop` int NOT NULL AUTO_INCREMENT,
  `IdParent` int DEFAULT NULL,
  `IdBusRoute` int DEFAULT NULL,
  `BusStopName` varchar(255) NOT NULL,
  `Introduction` text,
  `Address` varchar(200) DEFAULT NULL,
  `StopOrder` int NOT NULL DEFAULT '-1',
  `UpdateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsAvailable` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdBusStop`),
  UNIQUE KEY `BusStopName` (`BusStopName`),
  KEY `IdBusRoute` (`IdBusRoute`),
  KEY `busstop_ibfk_2` (`IdParent`),
  CONSTRAINT `busstop_ibfk_1` FOREIGN KEY (`IdBusRoute`) REFERENCES `busroute` (`IdBusRoute`),
  CONSTRAINT `busstop_ibfk_2` FOREIGN KEY (`IdParent`) REFERENCES `busstop` (`IdBusStop`),
  CONSTRAINT `busstop_chk_1` CHECK ((`StopOrder` >= -(1)))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busstop`
--

LOCK TABLES `busstop` WRITE;
/*!40000 ALTER TABLE `busstop` DISABLE KEYS */;
INSERT INTO `busstop` VALUES (1,NULL,1,'Nhà thờ Đức Bà','Điểm dừng gần Nhà thờ Đức Bà Sài Gòn - một công trình kiến trúc tiêu biểu của Pháp thời thuộc địa.','01 Công xã Paris, Phường Bến Nghé, Quận 1, TP.HCM',3,'2025-06-16 02:43:39',1),(2,NULL,1,'Dinh Độc Lập','Xe dừng tại cổng chính Dinh Độc Lập, nơi từng là Phủ Tổng Thống của chính quyền Việt Nam Cộng Hòa.','135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP.HCM',1,'2025-06-16 02:43:39',1),(3,NULL,1,'Chợ Bến Thành','Trạm khởi hành tại khu vực phía trước Chợ Bến Thành – biểu tượng thương mại của Sài Gòn.','Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM',1,'2025-06-16 02:43:39',0),(4,NULL,2,'Chùa Bà Thiên Hậu','Xe dừng gần Chùa Bà Thiên Hậu, một ngôi chùa linh thiêng có kiến trúc Trung Hoa nổi bật ở quận 5.','710 Nguyễn Trãi, Phường 11, Quận 5, TP.HCM',1,'2025-04-24 14:24:24',0),(5,NULL,3,'Bệnh viện Hùng Vương','Trạm dừng gần bệnh viện lớn và lâu đời nhất tại TP.HCM, điểm nhận diện nổi bật tại quận 5.','128 Hồng Bàng, Phường 12, Quận 5, TP.HCM',0,'2025-04-24 14:24:24',1),(6,4,3,'Line 2: Chùa Bà Thiên Hậu','Xe dừng gần Chùa Bà Thiên Hậu, một ngôi chùa linh thiêng có kiến trúc Trung Hoa nổi bật ở quận 5.','710 Nguyễn Trãi, Phường 11, Quận 5, TP.HCM',1,'2025-04-24 14:24:24',1),(7,NULL,NULL,'Hẻm ẩm thực Hải Thượng Lãn Ông','Xe dừng tại khu vực nổi tiếng với các món Hoa, là điểm đến yêu thích của khách yêu ẩm thực.','Hải Thượng Lãn Ông, Phường 10, Quận 5, TP.HCM',0,'2025-06-16 02:39:17',0);
/*!40000 ALTER TABLE `busstop` ENABLE KEYS */;
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
