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
-- Table structure for table `busroute`
--

DROP TABLE IF EXISTS `busroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `busroute` (
  `IdBusRoute` int NOT NULL AUTO_INCREMENT,
  `IdParent` int DEFAULT NULL,
  `BusRouteName` varchar(255) NOT NULL,
  `Overview` text,
  `Description` text,
  `Highlights` text,
  `Included` text,
  `Excluded` text,
  `WhatToBring` text,
  `BeforeYouGo` text,
  `UpdateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsAvailable` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`IdBusRoute`),
  UNIQUE KEY `BusRouteName` (`BusRouteName`),
  KEY `busroute_ibfk_1` (`IdParent`),
  CONSTRAINT `busroute_ibfk_1` FOREIGN KEY (`IdParent`) REFERENCES `busroute` (`IdBusRoute`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busroute`
--

LOCK TABLES `busroute` WRITE;
/*!40000 ALTER TABLE `busroute` DISABLE KEYS */;
INSERT INTO `busroute` VALUES (1,NULL,'Line 1: Trung tâm TP - Dinh Độc Lập','Tuyến du lịch thành phố bằng xe buýt hai tầng hiện đại với lộ trình trung tâm Sài Gòn.','Trải nghiệm khám phá trung tâm thành phố Hồ Chí Minh bằng xe buýt hai tầng Vietnam Sightseeing với hệ thống thuyết minh tự động đa ngôn ngữ.','Đi qua Nhà thờ Đức Bà, Bưu điện, Dinh Độc Lập, phố đi bộ Nguyễn Huệ...','Vé xe buýt, Tai nghe, Wifi miễn phí, Bản đồ, Bảo hiểm','Không bao gồm đồ ăn, vé vào cổng địa điểm, đưa đón khách sạn','Trang phục lịch sự, điện thoại để nghe audio guide','Vui lòng đến sớm 10 phút, chuẩn bị vé QR để check-in','2025-06-15 21:51:58',1),(2,NULL,'Line 2: Sài Gòn - Chợ Lớn','Là một trong những sản phẩm xe buýt 2 tầng đầu tiên Sài Gòn, Sài Gòn - Chợ lớn City tour là một hình thức độc đáo với dịch vụ chất lượng cao mang đến một chuyến du lịch sáng tạo, thú vị và linh hoạt.','Chúng tôi cam kết cải thiện chất lượng trong ngành du lịch tại mỗi thành phố nơi chúng tôi có mặt, cũng như nỗ lực để đạt được sự hài lòng hoàn toàn của khách hàng.','Xe buýt hai tầng Vietnam Sightseeing tại thành phố Hồ Chí Minh\nVào cửa không giới hạn các điểm tham quan chính ở Sài Gòn (vé có giá trị trong 4 giờ)\nTham quan Sài Gòn theo tốc độ của riêng bạn và ngắm nhìn những địa danh tiêu biểu nhất của Sài Gòn\nCó thể kết nối Audio guide 9 ngôn ngữ\nXe buýt chạy cứ sau 30 phút','Vé xe buýt hai tầng\nLái xe / Phụ xe\nWifi miễn phí trên xe\nThuyết minh đa ngôn ngữ\nTai nghe\nBản đồ lộ trình\nBảo hiểm du lịch','Phí vào cửa\nThức ăn và đồ uống khác\nĐón và trả khách sạn\nTiền thưởng (không bắt buộc)','Trang phục thoải mái\nKính râm\nKem chống nắng','Thời gian có thể thay đổi tùy theo tình trạng giao thông.\nĐưa cho nhân viên mặc đồng phục vé điện tử để check in.','2025-06-15 21:52:02',0),(3,2,'Line 2B: Sài Gòn - Chợ Lớn - Mở rộng','Tuyến mở rộng từ Line 2, đi qua thêm nhiều điểm ở khu vực quận 5.','Bổ sung các điểm như Bệnh viện Hùng Vương, Chùa Bà Thiên Hậu, Hẻm ẩm thực Hải Thượng Lãn Ông.','Tuyến dài hơn, có thời lượng 6 giờ\nDừng lâu hơn tại mỗi điểm','Vé xe buýt, Nước suối, Tai nghe','Không bao gồm hướng dẫn viên riêng, các tour nội khu','Nón, khẩu trang, điện thoại sạc đầy','Có thể đông vào dịp lễ, vui lòng giữ gìn trật tự trên xe','2025-06-15 21:52:02',1),(4,NULL,'Line 3: Chợ Bến Thành - Khu du lịch Văn Thánh','Tuyến xe buýt hai tầng kết nối trung tâm thành phố với khu du lịch sinh thái Văn Thánh.','Hành trình ngắn nhưng đầy thú vị với các điểm dừng nổi bật và thời gian di chuyển linh hoạt. Khám phá sự kết hợp giữa hiện đại và thiên nhiên trong một tuyến xe độc đáo.','Tham quan Chợ Bến Thành, đường Nguyễn Huệ, kênh Nhiêu Lộc - Thị Nghè, KDL Văn Thánh.\nXe buýt 2 tầng có mái che và mở.\nTự do lên xuống tại các điểm trong khung giờ hoạt động.','Vé xe buýt 2 tầng\nTai nghe thuyết minh\nBảo hiểm\nTài xế và nhân viên hỗ trợ\nWifi miễn phí','Vé vào cổng khu du lịch\nChi phí ăn uống cá nhân\nChi phí phát sinh ngoài lộ trình','Giày thoải mái\nÁo khoác nhẹ\nNước uống cá nhân\nĐiện thoại có kết nối để dùng audio guide','Có mặt trước 15 phút để làm thủ tục.\nGiữ vé điện tử để quét mã khi lên xe.','2025-06-15 23:53:03',1);
/*!40000 ALTER TABLE `busroute` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16  7:14:24
