-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2025 at 05:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `example_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(20) NOT NULL COMMENT 'รหัสอุปกรณ์',
  `equipment_type` enum('จอ','ไมโครโฟน','PC') NOT NULL COMMENT 'ประเภทอุปกรณ์',
  `brand` varchar(30) NOT NULL COMMENT 'ยี่ห้อ',
  `contract_year` varchar(30) NOT NULL COMMENT 'ปีสัญญา',
  `meeting_room_id` int(20) DEFAULT NULL COMMENT 'รหัสห้องประชุม'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `equipment_type`, `brand`, `contract_year`, `meeting_room_id`) VALUES
(201, 'จอ', 'yti', 'บ.12/2563', 222),
(202, 'ไมโครโฟน', 'ftu', 'บ.11/2553', 222),
(203, 'PC', 'dtyj', 'บ.13/2563', 222),
(204, 'ไมโครโฟน', 'gjgk', 'บ.18/2553', 222),
(205, 'จอ', 'vdgd', 'บ.11/2567', 333),
(206, 'จอ', 'bfdlbd', 'บ.3/2558', 333);

--
-- Triggers `equipment`
--
DELIMITER $$
CREATE TRIGGER `after_equipment_delete` AFTER DELETE ON `equipment` FOR EACH ROW BEGIN
    IF OLD.equipment_type = 'จอ' THEN
        UPDATE meeting_room SET screen_count = screen_count - 1 WHERE room_id = OLD.meeting_room_id;
    ELSEIF OLD.equipment_type = 'ไมโครโฟน' THEN
        UPDATE meeting_room SET microphones_count = microphones_count - 1 WHERE room_id = OLD.meeting_room_id;
    ELSEIF OLD.equipment_type = 'PC' THEN
        UPDATE meeting_room SET pc_count = pc_count - 1 WHERE room_id = OLD.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_equipment_insert` AFTER INSERT ON `equipment` FOR EACH ROW BEGIN
    IF NEW.equipment_type = 'จอ' THEN
        UPDATE meeting_room SET screen_count = screen_count + 1 WHERE room_id = NEW.meeting_room_id;
    ELSEIF NEW.equipment_type = 'ไมโครโฟน' THEN
        UPDATE meeting_room SET microphones_count = microphones_count + 1 WHERE room_id = NEW.meeting_room_id;
    ELSEIF NEW.equipment_type = 'PC' THEN
        UPDATE meeting_room SET pc_count = pc_count + 1 WHERE room_id = NEW.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_equipment_count_after_delete` AFTER DELETE ON `equipment` FOR EACH ROW BEGIN
    -- อัพเดตจำนวนจอ
    IF OLD.equipment_type = 1 THEN
        UPDATE meeting_room
        SET screen_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = OLD.meeting_room_id AND equipment_type = 1
        )
        WHERE room_id = OLD.meeting_room_id;
    END IF;

    -- อัพเดตจำนวนไมโครโฟน
    IF OLD.equipment_type = 2 THEN
        UPDATE meeting_room
        SET microphones_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = OLD.meeting_room_id AND equipment_type = 2
        )
        WHERE room_id = OLD.meeting_room_id;
    END IF;

    -- อัพเดตจำนวนคอมพิวเตอร์
    IF OLD.equipment_type = 3 THEN
        UPDATE meeting_room
        SET pc_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = OLD.meeting_room_id AND equipment_type = 3
        )
        WHERE room_id = OLD.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_equipment_count_after_insert` AFTER INSERT ON `equipment` FOR EACH ROW BEGIN
    -- อัพเดตจำนวนจอ
    IF NEW.equipment_type = 1 THEN
        UPDATE meeting_room
        SET screen_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = NEW.meeting_room_id AND equipment_type = 1
        )
        WHERE room_id = NEW.meeting_room_id;
    END IF;

    -- อัพเดตจำนวนไมโครโฟน
    IF NEW.equipment_type = 2 THEN
        UPDATE meeting_room
        SET microphones_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = NEW.meeting_room_id AND equipment_type = 2
        )
        WHERE room_id = NEW.meeting_room_id;
    END IF;

    -- อัพเดตจำนวนคอมพิวเตอร์
    IF NEW.equipment_type = 3 THEN
        UPDATE meeting_room
        SET pc_count = (
            SELECT COUNT(*)
            FROM equipment
            WHERE meeting_room_id = NEW.meeting_room_id AND equipment_type = 3
        )
        WHERE room_id = NEW.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_equipment_count_on_delete` AFTER DELETE ON `equipment` FOR EACH ROW BEGIN
    -- อัพเดตจำนวนจอ
    IF OLD.equipment_type = 1 THEN
        UPDATE meeting_room
        SET screen_count = screen_count - 1
        WHERE room_id = OLD.meeting_room_id;
    END IF;
    
    -- อัพเดตจำนวนไมโครโฟน
    IF OLD.equipment_type = 2 THEN
        UPDATE meeting_room
        SET microphones_count = microphones_count - 1
        WHERE room_id = OLD.meeting_room_id;
    END IF;
    
    -- อัพเดตจำนวนคอมพิวเตอร์
    IF OLD.equipment_type = 3 THEN
        UPDATE meeting_room
        SET pc_count = pc_count - 1
        WHERE room_id = OLD.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_equipment_count_on_insert` AFTER INSERT ON `equipment` FOR EACH ROW BEGIN
    -- อัพเดตจำนวนจอ
    IF NEW.equipment_type = 1 THEN
        UPDATE meeting_room
        SET screen_count = screen_count + 1
        WHERE room_id = NEW.meeting_room_id;
    END IF;
    
    -- อัพเดตจำนวนไมโครโฟน
    IF NEW.equipment_type = 2 THEN
        UPDATE meeting_room
        SET microphones_count = microphones_count + 1
        WHERE room_id = NEW.meeting_room_id;
    END IF;
    
    -- อัพเดตจำนวนคอมพิวเตอร์
    IF NEW.equipment_type = 3 THEN
        UPDATE meeting_room
        SET pc_count = pc_count + 1
        WHERE room_id = NEW.meeting_room_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_meeting_room_counts` AFTER INSERT ON `equipment` FOR EACH ROW BEGIN
    IF NEW.equipment_type = 'จอ' THEN
        UPDATE meeting_room
        SET screen_count = screen_count + 1
        WHERE room_id = NEW.meeting_room_id;
    ELSEIF NEW.equipment_type = 'ไมโครโฟน' THEN
        UPDATE meeting_room
        SET microphones_count = microphones_count + 1
        WHERE room_id = NEW.meeting_room_id;
    ELSEIF NEW.equipment_type = 'PC' THEN
        UPDATE meeting_room
        SET pc_count = pc_count + 1
        WHERE room_id = NEW.meeting_room_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_room`
--

CREATE TABLE `meeting_room` (
  `room_id` int(20) NOT NULL COMMENT 'รหัสห้องประชุม',
  `room_name` varchar(50) NOT NULL COMMENT 'ชื่อห้องประชุม',
  `location` varchar(50) NOT NULL COMMENT 'ที่ตั้ง',
  `capacity` int(10) NOT NULL COMMENT 'ความจุ',
  `room_date` date NOT NULL COMMENT 'วันเดือนปี',
  `screen_count` int(11) DEFAULT 0 COMMENT 'จำนวนจอ',
  `microphones_count` int(11) DEFAULT 0 COMMENT 'จำนวนไมโครโฟน',
  `pc_count` int(11) DEFAULT 0 COMMENT 'จำนวนคอมพิวเตอร์'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meeting_room`
--

INSERT INTO `meeting_room` (`room_id`, `room_name`, `location`, `capacity`, `room_date`, `screen_count`, `microphones_count`, `pc_count`) VALUES
(222, 'ห้องประชุม1', 'อาคาร2', 70, '2024-12-19', 1, 2, 1),
(333, 'ห้องประชุม2', 'อาคาร4', 20, '2024-12-17', 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `repair_requests`
--

CREATE TABLE `repair_requests` (
  `request_id` int(20) NOT NULL COMMENT 'รหัสแจ้งซ่อม',
  `request_date` date NOT NULL COMMENT 'วันที่แจ้งซ่อม',
  `username` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใช้',
  `machine_name` varchar(50) NOT NULL COMMENT 'ชื่อเครื่อง',
  `department` varchar(50) NOT NULL COMMENT 'แผนก',
  `equipment_type` enum('PC','Printer','Notebook') NOT NULL COMMENT 'ประเภทอุปกรณ์',
  `model` varchar(50) DEFAULT NULL COMMENT 'รุ่น',
  `contract_year` varchar(50) DEFAULT NULL COMMENT 'ปีสัญญา',
  `issue_description` text NOT NULL COMMENT 'ปัญหาที่แจ้งซ่อม',
  `resolution` text DEFAULT NULL COMMENT 'วิธีแก้ไข'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `repair_requests`
--

INSERT INTO `repair_requests` (`request_id`, `request_date`, `username`, `machine_name`, `department`, `equipment_type`, `model`, `contract_year`, `issue_description`, `resolution`) VALUES
(401, '2024-12-20', 'shin', 'gggg25', 'ผคข.', 'PC', 'DELL', 'บ.18/2556', 'เปิดเครื่องไม่ติด', 'ลง windows ใหม่');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL COMMENT 'รหัสผู้ใช้งาน',
  `username` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `password` varchar(50) NOT NULL COMMENT 'รหัสผ่าน',
  `role` enum('Admin','User') NOT NULL COMMENT 'ตำแหน่ง (1.แอดมิน 2.ผู้ใช้งานทั่วไป)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`) VALUES
(101, 'gift', '1234', 'Admin'),
(102, 'ying', '1234', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `fk_meeting_room` (`meeting_room_id`);

--
-- Indexes for table `meeting_room`
--
ALTER TABLE `meeting_room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `repair_requests`
--
ALTER TABLE `repair_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'รหัสอุปกรณ์', AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `meeting_room`
--
ALTER TABLE `meeting_room`
  MODIFY `room_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'รหัสห้องประชุม', AUTO_INCREMENT=334;

--
-- AUTO_INCREMENT for table `repair_requests`
--
ALTER TABLE `repair_requests`
  MODIFY `request_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'รหัสแจ้งซ่อม', AUTO_INCREMENT=402;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'รหัสผู้ใช้งาน', AUTO_INCREMENT=103;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `fk_meeting_room` FOREIGN KEY (`meeting_room_id`) REFERENCES `meeting_room` (`room_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
