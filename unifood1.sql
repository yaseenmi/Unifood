-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2021 at 06:21 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unifood`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `Password`, `UserID`) VALUES
(1, '123', 13);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Name` varchar(25) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Image` varchar(500) DEFAULT NULL,
  `RestaurantID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `Description`, `Image`, `RestaurantID`) VALUES
(1, 'Drinks', 'coffee, tea, sweet drinks', 'test2.jpg', 1),
(2, 'Pizza', 'pizza', 'test1.jpg', 1),
(3, 'Desserts', 'coffee, tea, sweet drinks', 'test1.jpg', 2),
(4, 'Salads', 'pizza.....', 'test2.jpg', 2),
(6, 'Entrees', 'An entrée in modern French table service and that of much of the English-​speaking world is a dish served before the main course of a meal. ', 'test1.jpg', 3),
(7, 'Homemade', 'Not only was Joel Gamoran a national chef for Sur La Table for over 10 years but he also is a host for A&E’s hit series “Scraps” and has a cookbook called Cooking Scrappy, both of which focus on sustainable cooking.', 'test2.jpg', 3),
(9, 'Potatos', 'This is potatos.....', 'milky-way-road-long-exposure-5k-hx.jpg', 5),
(10, 'Desserts', 'Dessert is a course that concludes a meal. The course consists of sweet foods, such as confections, and possibly a beverage such as dessert wine and liqueur.', 'food-1.jpg', 6),
(11, 'Breads', 'Bread is a staple food prepared from a dough of flour and water, usually by baking. Throughout recorded history, it has been a prominent food in large parts of the world.', 'sandwish.jfif', 6),
(12, 'Fruits', 'In botany, a fruit is the seed-bearing structure in flowering plants that is formed from the ovary after flowering. Fruits are the means by which flowering plants disseminate their seeds.', '2-2-2-3foodgroups_fruits_detailfeature_thumb.jpg', 4),
(13, 'Garlic', 'Garlic is a species of bulbous flowering plant in the onion genus Allium. Its close relatives include the onion, shallot, leek, chive, Welsh onion and Chinese onion.', 'product_image20.jpg', 3),
(14, 'Rice', 'Rice is the seed of the grass species Oryza sativa or less commonly Oryza glaberrima. The name wild rice is usually used for species of the genera Zizania and Porteresia, both wild and domesticated.', 'rice.jpg', 7),
(15, 'Meat', 'Meat is animal flesh that is eaten as food.[1] Humans have hunted and killed animals for meat since prehistoric times. The advent of civilization allowed the domestication of animals such as chickens, sheep, rabbits, pigs and cattle. This eventually led to their use in meat production on an industrial scale with the aid of slaughterhouses.', 'photo-1504674900247-0877df9cc836.jpg', 9);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `ID` int(11) NOT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `Image` varchar(50) DEFAULT NULL,
  `IsBanned` tinyint(1) NOT NULL DEFAULT 0,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`ID`, `Password`, `Image`, `IsBanned`, `UserID`) VALUES
(1, '1dwGGGeq', 'p1.png', 0, 1),
(2, '1H9OGQE5e3', 'p2.jpg', 1, 2),
(3, '1Sssssss', 'p3.jpg', 0, 3),
(4, '1mMmmmmm', 'p6.jpg', 0, 6),
(5, 'HS12dddDD', 'p7.jpg', 0, 7),
(6, '11MMmmmt', 'p8.jpg', 0, 8),
(8, '1Ssssssd', 'p10.jpg', 0, 10),
(9, '11MMmmmt', 'p11.jpg', 0, 11),
(10, '1dwGGGee', 'p12.jpg', 0, 12),
(11, '1mMmmmmm', 'p20.jpg', 0, 20),
(12, '1sSSSssss', 'p21.jpeg', 0, 21);

-- --------------------------------------------------------

--
-- Table structure for table `discount_offer`
--

CREATE TABLE `discount_offer` (
  `ID` int(11) NOT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `OfferID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount_offer`
--

INSERT INTO `discount_offer` (`ID`, `Percentage`, `OfferID`) VALUES
(1, 20, 3);

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `ID` int(11) NOT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`ID`, `CustomerID`, `ProductID`) VALUES
(1, 1, 1),
(6, 2, 24),
(15, 2, 25),
(34, 2, 12),
(36, 2, 3),
(37, 2, 4),
(38, 2, 2),
(39, 2, 1),
(53, 3, 4),
(54, 4, 2),
(55, 4, 3),
(56, 4, 9),
(57, 4, 24),
(58, 4, 29),
(59, 5, 7),
(60, 5, 5),
(61, 6, 3),
(62, 6, 36),
(64, 6, 5),
(65, 6, 7),
(66, 1, 8),
(67, 1, 9),
(69, 1, 23),
(72, 8, 1),
(74, 1, 7),
(77, 1, 6),
(84, 1, 3),
(85, 1, 52),
(86, 1, 52),
(87, 1, 52),
(88, 1, 52),
(89, 1, 53),
(92, 1, 47),
(97, 3, 53),
(98, 11, 23),
(99, 11, 24),
(100, 11, 26);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `ID` int(11) NOT NULL,
  `Text` text DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`ID`, `Text`, `Email`) VALUES
(1, 'Such an awesome application', 'someone@gmail.com'),
(2, 'There was a bug while...', 'someone2@gmail.com'),
(3, 'And another feedback', 'someone3@gmail.com'),
(4, 'So Slow!!!', 'mohamadhag99@gmail.com'),
(5, 'Nice one!!', 'mohamadhag95@gmail.com'),
(6, 'Thanks for this', 'markhajsen@yahoo.com'),
(7, 'sqsqqs', 'marke@hotmail.com'),
(8, 'Nice app!!', 'mousaahmad@yahoo.com'),
(9, 'So Nice', 'mohamadhag22@gmail.com'),
(10, 'Thanks for this', 'mohamadhag99@gmail.com'),
(11, 'Nice work!!!', 'mohamadhag99@gmail.com'),
(12, 'Good one!!', 'markmous@yahoo.com'),
(13, 'dwddwdwdw', 'dwddwdwdw'),
(14, 'dwdwdw', 'dwdwdw'),
(15, 'mohamad', 'mohamadhag99@gmail.com'),
(16, 'dwdwdwdwdw', 'mohamadhag99@gmail.com'),
(17, 'fewfr', 'mohamadhag99@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `free_offer`
--

CREATE TABLE `free_offer` (
  `ID` int(11) NOT NULL,
  `Count` int(11) DEFAULT NULL,
  `FreeCount` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `OfferID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `free_offer`
--

INSERT INTO `free_offer` (`ID`, `Count`, `FreeCount`, `ProductID`, `OfferID`) VALUES
(1, 2, 1, 1, 2),
(2, 1, 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `ID` int(11) NOT NULL,
  `TotalPrice` decimal(10,0) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `RestaurantID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`ID`, `TotalPrice`, `Date`, `RestaurantID`) VALUES
(1, '67400', '2021-07-04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `ID` int(11) NOT NULL,
  `Text` text DEFAULT NULL,
  `Sender` varchar(25) NOT NULL,
  `IsRead` tinyint(1) DEFAULT 0,
  `UserID` int(11) DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`ID`, `Text`, `Sender`, `IsRead`, `UserID`, `Date`) VALUES
(1, 'new order from: majd', 'Deep House', 1, 3, '2021-07-05 20:29:15'),
(3, 'new order from: yaseen', 'Sketch', 0, 1, '2021-07-05 19:15:35'),
(4, 'new order from: mohammad', 'Shades', 1, 3, '2021-07-05 19:15:39'),
(5, 'delete request from:deephouse', 'Shades', 0, 1, '2021-07-05 23:01:53'),
(6, 'order with ID: 1 accepted', 'Deep House', 1, 1, '2021-07-05 19:14:24'),
(7, 'order with ID: 2 accepted', 'Deep House', 1, 1, '2021-07-05 19:14:29'),
(8, 'order with ID: 3 accepted', 'DK\'s', 1, 2, '2021-07-05 19:14:34'),
(9, 'order with ID: 4 accepted', 'DK\'s', 1, 3, '2021-07-05 19:14:40'),
(13, 'Your order is submitted successfully.', 'Deep House', 0, 1, '2021-07-05 23:08:35'),
(14, 'Your order is submitted successfully.', 'Deep House', 0, 3, '2021-07-05 23:09:56'),
(18, 'Unfortunately, the product \'Salami Pizza\' from your last order is currently unavailable.', 'System', 0, 7, '2021-07-13 18:45:38'),
(35, 'Its me yes', 'Dks', 0, 2, '2021-07-15 12:45:25'),
(40, 'Thanks for coming to us.', 'Shades', 0, 1, '2021-07-15 17:53:38'),
(41, 'Your order submitted successfully.', 'Sketch', 0, 1, '2021-07-15 17:53:38'),
(42, 'Thanks for rating us :)', 'Sketch', 1, 1, '2021-07-15 17:53:38'),
(43, 'Unfortunately, the product \'Soup Of King\' does no longer exists.', 'System', 1, 1, '2021-07-16 07:00:10'),
(44, 'your order has been delivered from: Sketch', '', 0, 2, '2021-07-18 12:45:11'),
(45, 'Hello from the other side', 'Admin', 1, 5, '2021-07-18 15:19:03'),
(46, 'delete request from Sketch', '', 1, 5, '2021-07-18 15:41:42'),
(47, 'delete request from Sketch', 'Sketch', 1, 13, '2021-07-18 16:28:03'),
(49, 'Please don\'t use your customers 😡', 'Admin', 0, 5, '2021-07-19 06:52:57'),
(51, 'your order has been accepted from: Sketch, and your order ID is :21', '', 0, 1, '2021-07-19 11:05:30'),
(52, 'You\'re amazing man!!!!!', 'Admin', 0, 1, '2021-07-19 13:37:32'),
(58, 'delete request from Sketch', '0', 0, 13, '2021-07-23 17:25:33'),
(59, 'delete request from Sketch', 'Sketch', 0, 13, '2021-07-23 17:29:00'),
(60, 'report request from : Sketch with Customer ID :1', 'Sketch', 1, 13, '2021-07-23 17:37:44'),
(61, 'report request from : Sketch with Customer ID :2', 'Sketch', 0, 13, '2021-07-23 17:58:44'),
(62, 'Don\'t be rude', 'Admin', 0, 4, '2021-07-24 06:27:04'),
(63, 'your order has been rejected from: Deep House', '', 0, 3, '2021-07-24 06:42:49'),
(65, 'your order has been accepted from: Deep House, and your order ID is :27', '', 0, 20, '2021-07-24 07:19:35'),
(66, 'report request from : Deep House with Customer ID :2', 'Deep House', 0, 13, '2021-07-24 07:23:20'),
(67, 'report request from : Deep House with Customer ID :1', 'Deep House', 0, 13, '2021-07-24 07:23:32'),
(68, 'your order has been accepted from: Deep House, and your order ID is :28', '', 0, 21, '2021-07-24 09:16:58'),
(69, 'your order has been delivered from: Deep House', '', 0, 21, '2021-07-24 09:21:57');

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `ID` int(11) NOT NULL,
  `Description` text DEFAULT NULL,
  `Discount` int(255) NOT NULL DEFAULT 0,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`ID`, `Description`, `Discount`, `ProductID`) VALUES
(1, '20% off, try!', 20, 7),
(2, '50% off for 2 weeks', 50, 1),
(3, '10% off!', 10, 5),
(4, 'this is a desc', 12, 6),
(5, 'this is a desc', 12, 11),
(6, 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein.', 50, 47),
(11, 'Discount 30%', 30, 15),
(12, 'London Broil with Herb Bu', 20, 52),
(13, 'Discount 50%', 20, 30);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `ID` int(11) NOT NULL,
  `TotalPrice` decimal(10,0) DEFAULT NULL,
  `Note` text DEFAULT NULL,
  `Status` varchar(25) DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `CustomerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`ID`, `TotalPrice`, `Note`, `Status`, `Date`, `CustomerID`) VALUES
(1, '9000', 'dxwdwq', 'delivered', '2021-07-10 22:37:03', 2),
(2, '15000', 'no ....', 'pending', '2021-07-12 17:46:15', 2),
(3, '49000', 'No olives with pizza please\n', 'rejected', '2021-07-12 20:21:58', 3),
(4, '27000', '3w4ewdef', 'pending', '2021-07-13 10:21:40', 3),
(5, '15000', 'I am homer!!!!!', 'pending', '2021-07-13 18:43:33', 5),
(6, '16400', '', 'pending', '2021-07-13 18:45:38', 5),
(7, '6000', 'no... ', 'pending', '2021-07-14 14:16:26', 6),
(8, '15600', 'no notes..', 'pending', '2021-07-14 14:18:11', 6),
(9, '12100', 'Hello its me!!', 'pending', '2021-07-15 13:08:16', 6),
(14, '10400', '', 'pending', '2021-07-15 23:30:49', 1),
(15, '13000', 'Thanks...', 'pending', '2021-07-16 06:39:53', 1),
(18, '12000', 'alert...', 'pending', '2021-07-16 06:59:02', 1),
(19, '12500', 'Hello...', 'pending', '2021-07-16 07:00:10', 1),
(20, '51000', 'no....', 'pending', '2021-07-17 13:01:46', 8),
(21, '33000', 'Thanks,,,', 'active', '2021-07-17 13:35:38', 1),
(22, '21000', 'Thanks', 'active', '2021-07-19 09:49:13', 1),
(23, '15000', 'Some notes....', 'pending', '2021-07-20 05:12:10', 2),
(24, '18000', '', 'pending', '2021-07-20 05:13:12', 2),
(25, '9600', 'Hello', 'pending', '2021-07-23 15:33:55', 1),
(26, '18000', '', 'active', '2021-07-24 06:12:26', 3),
(27, '43000', 'Hello', 'active', '2021-07-24 07:16:27', 11),
(28, '8500', 'fe4geh', 'delivered', '2021-07-24 09:04:07', 12);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `ID` int(11) NOT NULL,
  `ProductName` varchar(25) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `OrderID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`ID`, `ProductName`, `Amount`, `Price`, `ProductID`, `OrderID`) VALUES
(1, 'Special Cola', 1, '3000', 1, 1),
(2, 'Canada Dry Cola', 1, '6000', 3, 1),
(3, 'Canada Dry Cola', 2, '12000', 3, 2),
(4, 'Special Cola', 1, '3000', 1, 2),
(5, 'Pizza Stock', 1, '4000', 9, 3),
(6, 'Pizza Hot', 2, '10000', 11, 3),
(7, 'Soup Of King', 2, '17000', 25, 3),
(8, 'Pizza Like', 2, '18000', 23, 3),
(9, 'Special Cola', 1, '3000', 1, 4),
(10, 'Canada Dry Cola', 4, '24000', 3, 4),
(11, 'Special Cola', 1, '3000', 1, 5),
(12, 'Canada Dry Cola', 2, '12000', 3, 5),
(13, 'Canada Dry Cola', 1, '6000', 3, 6),
(14, 'Special Cola', 1, '3000', 1, 6),
(15, 'Pizza Stock', 1, '4000', 9, 6),
(16, 'Special Cola', 2, '6000', 1, 7),
(17, 'Pizza Stock', 1, '4000', 9, 8),
(18, 'Pizza Hot', 1, '5000', 11, 8),
(19, 'Fried Egg', 2, '6600', 36, 8),
(20, 'Special Cola', 3, '9000', 1, 9),
(21, 'Fanta Cola', 2, '2800', 7, 9),
(22, 'Mendirine Cola', 1, '9000', 6, 14),
(23, 'Fanta Cola', 1, '1400', 7, 14),
(24, 'Pizza Stock', 1, '4000', 9, 15),
(25, 'Mendirine Cola', 1, '9000', 6, 15),
(31, 'Special Cola', 1, '3000', 1, 18),
(32, 'Pizza Love', 1, '9000', 24, 18),
(33, 'Pizza Stock', 1, '4000', 9, 19),
(34, 'Mendirine Cola', 4, '36000', 6, 20),
(35, 'Canada Dry Cola', 2, '12000', 3, 20),
(36, 'Special Cola', 1, '3000', 1, 20),
(37, 'Special Cola', 3, '9000', 1, 21),
(38, 'Canada Dry Cola', 1, '6000', 3, 21),
(39, 'Pizza Love', 2, '18000', 24, 21),
(40, 'Special Cola', 5, '15000', 1, 22),
(41, 'Canada Dry Cola', 1, '6000', 3, 22),
(42, 'Canada Dry Cola', 2, '12000', 3, 23),
(43, 'Special Cola', 1, '3000', 1, 23),
(44, 'Pizza Like', 1, '9000', 23, 24),
(45, 'Pizza Love', 1, '9000', 24, 24),
(46, 'Good Garlic', 1, '3200', 48, 25),
(47, 'Quick Garlic Toast', 2, '6400', 49, 25),
(48, 'Pizza Like', 1, '9000', 23, 26),
(49, 'Pizza Love', 1, '9000', 24, 26),
(50, 'Pizza Love', 1, '9000', 24, 27),
(51, 'Soup Of King', 4, '34000', 25, 27),
(52, 'Soup Of King', 1, '8500', 25, 28);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `Name` varchar(25) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT 0,
  `Image` varchar(500) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `IsAvailable` tinyint(1) DEFAULT 1,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `CategoryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `Name`, `Price`, `Image`, `Description`, `IsAvailable`, `CreationDate`, `CategoryID`) VALUES
(1, 'Special Cola', '6000', 'test1.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 1),
(2, 'Coca Cola', '7000', 'test2.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, '2020-07-08 09:03:11', 1),
(3, 'Canada Dry Cola', '6000', 'test3.jpg', 'this is a desc', 1, '2020-07-08 09:03:11', 1),
(4, 'Coke Cola', '3000', 'test4.jpg', 'this is a descLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 0, '2021-07-08 09:03:11', 1),
(5, 'Red Coca Cola', '3000', 'test5.jpg', 'this is a desc', 0, '2021-07-08 09:03:11', 1),
(6, 'Mendirine Cola', '9000', 'test6.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 1),
(7, 'Fanta Cola', '7000', 'test7.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 1),
(8, 'Meat Pizza', '4000', 'test8.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, '2021-07-08 09:03:11', 2),
(9, 'Pizza Stock', '4000', 'test9.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(10, 'Salami Pizza', '3400', 'test10.jpg', 'this is a desc', 0, '2021-07-08 09:03:11', 2),
(11, 'Pizza Hot', '5000', 'test11.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(12, 'Special Pizza', '4300', 'test12.jpg', 'this is a descLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, '2020-05-08 09:03:11', 2),
(13, 'Like Pizza', '2400', 'test13.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, '2021-07-08 09:03:11', 2),
(14, 'Love Pizza', '9000', 'test14.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(15, 'Veggie Pizza', '3000', 'test15.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(16, 'Vegan Pizza', '3200', 'test16.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 2),
(17, 'Protein Pizza', '8000', 'test17.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(18, 'Vegetables Pizza', '6350', 'test18.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(19, 'Fruit Pizza', '2100', 'test19.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 2),
(20, 'Watermelon Pizza', '9000', 'test20.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(21, 'Delicious Pizza', '7050', 'test21.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(22, 'Pro Pizza', '4225', 'test22.jpg', 'this is a desc', 1, '2021-07-08 09:03:11', 2),
(23, 'Pizza Like', '9000', 'test1.png', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(24, 'Pizza Love', '9000', 'test2.png', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(25, 'Soup Of King', '8500', 'test3.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(26, 'Fried Lemons', '10000', 'test4.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(27, 'Koushari', '5000', 'test5.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(28, 'Rice Manga', '7000', 'test6.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(29, 'Fried Meat', '5200', 'test7.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(30, 'Like Fresh', '3000', 'test8.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(31, 'Good Test', '2000', 'test9.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(32, 'Manga', '1300', 'test10.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 3),
(33, 'Cold Meat', '2500', 'test11.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, '2021-07-08 09:03:11', 3),
(34, 'Francisco', '2300', 'test12.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, '2021-07-08 09:03:11', 4),
(35, 'Sip Of King', '1500', 'test13.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 4),
(36, 'Fried Egg', '3300', 'test14.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, '2021-07-08 09:03:11', 4),
(37, 'Morning Meal', '2400', 'test15.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, '2021-07-08 09:03:11', 4),
(38, 'Special Sandwich', '1250', 'test16.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 4),
(39, 'Deep House Meal', '1350', 'test17.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 4),
(40, 'Deep House Sandwich', '1200', 'test18.jpg', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-07-08 09:03:11', 4),
(42, 'Nice Cold Sandwich', '3455', 'photo_2021-05-30_20-24-54.jpg', 'Vegetables plus cucumber', 1, '2021-07-18 12:37:22', 1),
(43, 'Canada Dry Drink', '8000', 'test3.jpg', 'Nice drink and good for hot days', 1, '2021-07-18 13:40:26', 1),
(45, 'Milk Shake', '9000', 'photo_2021-05-30_20-24-54.jpg', 'A milkshake is a sweet drink made by blending milk, ice cream, and flavorings or sweeteners such as butterscotch, caramel sauce.', 0, '2021-07-18 17:30:30', 10),
(47, 'Hot Sandwich', '2000', 'photo_2021-05-30_20-24-54.jpg', 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein.', 0, '2021-07-18 20:14:26', 6),
(48, 'Good Garlic', '3200', 'product_image20.jpg', 'Garlic is a species of bulbous flowering plant in the onion genus Allium. Its close relatives include the onion, shallot, leek, chive, Welsh onion and Chinese onion.', 1, '2021-07-23 06:34:23', 13),
(49, 'Quick Garlic Toast', '3200', 'Quick-Garlic-Toast_EXPS_FT20_9875_F_0427_1_HOME.jpg', 'Spread butter on one side of each slice of bread. Cut each slice in half; place plain side down on a baking sheet. Sprinkle with garlic salt and Parmesan cheese. Broil 4 in. from the heat until lightly browned, 1-2 minutes.', 1, '2021-07-23 06:43:04', 13),
(50, 'Garlic and Parmesan Pan-F', '2200', 'x.jpg', 'This 8-minute recipe boasts tons of flavour using just a few ingredients. Put out a jar of toothpicks for guests to help themselves!', 1, '2021-07-23 07:00:30', 13),
(51, 'Ratatouille with Poached ', '4500', 'x (1).jpg', 'This hearty French classic is a medley of eggplant, bell peppers, zucchini, tomatoes and onions. Before serving, make four wells in the ratatouille and crack an egg into each well. Cover and cook until the eggs reach a desired consistency. Serve with crunchy croutons and shredded basil.', 0, '2021-07-23 07:02:38', 13),
(52, 'London Broil with Herb Bu', '2000', 'delish-london-broil-vertical-1546559244.jpg', 'We swear by the simple marinade of olive oil, lemon juice, garlic, and Worcestershire.', 1, '2021-07-23 21:04:54', 15),
(53, 'California Grilled Chicke', '3000', 'delish-grilled-california-chicken-pin-1-lf.jpg', '♫ California looove ...♫', 1, '2021-07-23 21:05:42', 15),
(54, 'Pineapple Jalapeño Grille', '3200', '01-pineapple-jalapeno-grilled-pork-tenderloin-wide-final-00-01-44-15-still003-1623360293.jpg', 'Grilling pork tenderloin has never been easier. No, seriously.', 1, '2021-07-23 21:06:35', 15),
(55, 'Cheesesteak Stuffed Peppe', '3600', 'delish-philly-cheesesteak-stuffed-peppers-horizontal-1536268827.jpg', 'A Philly favorite with a twist!', 1, '2021-07-23 21:07:06', 15);

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `ID` int(11) NOT NULL,
  `Value` int(11) DEFAULT 1,
  `CustomerID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`ID`, `Value`, `CustomerID`, `ProductID`) VALUES
(1, 2, 1, 1),
(2, 3, 2, 2),
(3, 2, 3, 1),
(4, 2, 1, 3),
(5, 3, 2, 1),
(6, 3, 3, 2),
(7, 3, 2, 3),
(8, 2, 1, 4),
(9, 3, 2, 5),
(10, 3, 3, 6),
(11, 3, 3, 7),
(12, 2, 1, 8),
(13, 3, 2, 9),
(14, 2, 1, 10),
(15, 3, 2, 11),
(16, 3, 2, 12),
(17, 3, 2, 13),
(18, 3, 2, 14),
(19, 2, 1, 15),
(20, 3, 3, 16),
(21, 3, 2, 17),
(22, 3, 3, 18),
(23, 2, 1, 19),
(24, 3, 2, 20),
(25, 2, 1, 21),
(26, 3, 3, 22),
(27, 3, 3, 23),
(28, 3, 2, 24),
(29, 3, 2, 25),
(30, 2, 1, 26),
(31, 3, 3, 27),
(32, 2, 1, 28),
(33, 3, 3, 29),
(34, 3, 2, 30),
(35, 2, 1, 31),
(36, 2, 1, 32),
(37, 3, 2, 33),
(38, 2, 1, 34),
(39, 3, 2, 35),
(40, 3, 2, 36),
(48, 3, 2, 23),
(49, 3, 2, 27),
(50, 3, 2, 29),
(51, 3, 2, 34),
(52, 2, 1, 25),
(53, 3, 2, 32),
(54, 2, 1, 20),
(55, 4, 3, 3),
(56, 3, 6, 36),
(57, 2, 6, 1),
(58, 4, 6, 2),
(59, 2, 6, 4),
(60, 3, 8, 2),
(61, 2, 1, 2),
(62, 2, 1, 45),
(63, 2, 1, 6),
(64, 5, 1, 13),
(65, 2, 1, 52),
(66, 1, 4, 53),
(67, 4, 3, 38),
(68, 3, 11, 24),
(69, 4, 12, 25);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `ID` int(11) NOT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `Image` varchar(500) DEFAULT NULL,
  `IsClosed` tinyint(1) DEFAULT 0,
  `IsExist` tinyint(1) NOT NULL DEFAULT 1,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`ID`, `Password`, `Image`, `IsClosed`, `IsExist`, `UserID`) VALUES
(1, '1imap1u0ix', '2-2-2-3foodgroups_fruits_detailfeature_thumb.jpg', 1, 1, 5),
(2, 'xsduchzz6o', 'profile.jpg', 0, 1, 4),
(3, '1ssSSmm11', 'profile1.jpg', 0, 1, 9),
(4, 'uqrghoin18', 'a50b9b36af6ff.png', 0, 1, 14),
(5, 'xpputjrsaf', '5b412b5c9d63f.jpg', 0, 0, 15),
(6, 'k78igg8uv5', '4beb7f3e19d8d.png', 0, 1, 16),
(7, '6k83fv0xgl', '621cdd141ea89.png', 0, 1, 17),
(9, 'zvelognqq3', '19756bf0cf17c.png', 0, 1, 19);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ID` int(11) NOT NULL,
  `Text` text DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Like` int(11) DEFAULT 0,
  `Dislike` int(11) DEFAULT 0,
  `CustomerID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`ID`, `Text`, `Date`, `Like`, `Dislike`, `CustomerID`, `ProductID`) VALUES
(1, 'good!!', '2021-07-11 20:53:38', 5, 3, 1, 1),
(2, 'awesome!', '2021-07-11 13:46:47', 4, 2, 2, 1),
(3, 'bad! ok', '2021-07-11 13:46:49', 1, 3, 3, 3),
(4, 'good & nice!', '2021-07-11 13:46:54', 4, 0, 2, 23),
(5, 'Hello', '2021-07-11 18:15:21', 2, 0, 2, 1),
(6, 'hello thanks...', '2021-07-11 18:17:00', 0, 1, 2, 1),
(7, 'Only one star 😒', '2021-07-11 18:18:13', 3, 1, 2, 3),
(8, 'Wow.... the best drink ever.', '2021-07-11 18:30:37', 0, 0, 2, 6),
(9, 'Good pizza! 😍🧡', '2021-07-11 18:31:45', 2, 0, 2, 8),
(10, 'Amazing food 💕😋', '2021-07-11 18:59:35', 0, 0, 2, 10),
(11, 'So bad food! Please change this...😐\n\n', '2021-07-11 21:14:37', 3, 1, 1, 3),
(12, 'Nice & Good Product 😋😋', '2021-07-12 21:42:38', 2, 0, 3, 20),
(13, 'Yeah', '2021-07-12 21:45:46', 6, 0, 1, 20),
(14, '🤍', '2021-07-12 21:46:22', 0, 0, 3, 20),
(15, 'thank you', '2021-07-12 21:46:37', 3, 0, 1, 20),
(16, 'your welcome!', '2021-07-12 21:46:49', 3, 0, 3, 20),
(17, 'Hello', '2021-07-13 10:16:43', 1, 0, 3, 3),
(18, 'nice', '2021-07-13 12:35:58', 1, 0, 3, 2),
(19, 'Nice one!', '2021-07-13 15:04:11', 0, 1, 3, 3),
(20, 'Nice one!', '2021-07-13 15:04:43', 1, 0, 3, 3),
(21, 'Like', '2021-07-13 15:04:55', 0, 1, 3, 3),
(22, '💚💜', '2021-07-13 15:05:17', 1, 0, 3, 3),
(23, 'Nice good', '2021-07-13 15:05:23', 1, 0, 3, 3),
(24, 'The best fanta', '2021-07-13 16:31:58', 0, 0, 3, 7),
(25, 'Thanks', '2021-07-13 16:32:26', 0, 0, 3, 7),
(26, 'Hello It\'\'s me', '2021-07-13 16:46:08', 0, 0, 3, 7),
(27, 'I\'m here to tell you that\'s nice!', '2021-07-13 17:17:03', 0, 0, 3, 3),
(28, 'OMG!', '2021-07-13 20:14:27', 2, 0, 6, 3),
(29, 'Not bad! 😀', '2021-07-14 13:02:25', 3, 1, 6, 1),
(30, 'Good', '2021-07-14 15:09:46', 2, 0, 6, 2),
(31, 'not that bad 🙂', '2021-07-15 13:09:54', 2, 1, 6, 4),
(32, 'Thanks for this 😍', '2021-07-15 17:42:03', 0, 0, 1, 2),
(33, 'Good!', '2021-07-15 23:19:07', 0, 0, 1, 26),
(34, 'Nice product 😋', '2021-07-17 13:02:30', 1, 2, 8, 2),
(35, 'Good product!!', '2021-07-17 13:36:04', 0, 0, 1, 2),
(36, 'Hello', '2021-07-17 13:43:58', 0, 0, 1, 2),
(37, 'Mouses', '2021-07-17 15:24:29', 0, 0, 1, 2),
(38, 'hi', '2021-07-17 15:26:13', 0, 0, 1, 2),
(39, 'hello', '2021-07-17 15:26:57', 0, 0, 1, 2),
(40, 'welcome to our world!', '2021-07-17 15:27:07', 0, 0, 1, 2),
(41, 'hello it\'s me', '2021-07-17 15:32:58', 0, 0, 1, 2),
(42, 'good!!', '2021-07-18 17:31:52', 0, 0, 1, 45),
(43, 'Good', '2021-07-18 18:18:27', 0, 0, 1, 42),
(44, 'OMG 😯😯', '2021-07-19 10:53:39', 0, 0, 1, 24),
(45, 'Good test!!', '2021-07-23 06:35:10', 0, 0, 1, 48),
(46, 'Hello', '2021-07-24 05:57:48', 0, 0, 1, 2),
(47, 'Wow such a good meal', '2021-07-24 06:16:29', 2, 0, 4, 53),
(48, 'Hello', '2021-07-24 07:15:42', 0, 0, 11, 24),
(49, 'Hello it', '2021-07-24 09:03:30', 0, 0, 12, 25);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Name` varchar(25) DEFAULT NULL,
  `Phone` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `Phone`) VALUES
(1, 'Rami Makhlouf', 934685873),
(2, 'Sara Jhones', 0),
(3, 'Mohamad Al-Haj Houssein', 0),
(4, 'Deep House', 940322106),
(5, 'Sketch', 95322106),
(6, 'Majd Al-Shatti', 0),
(7, 'Homer Simpson', 0),
(8, 'Maya Bones', 950344124),
(9, 'Shades', 920324209),
(10, 'Jhon Wicks', 950322145),
(11, 'Majd Ahmad', 0),
(12, 'Mark john', 0),
(13, 'Majd', 940322106),
(14, '360', 945633333),
(15, 'ddd', 234),
(16, 'DKs', 95445289),
(17, 'Good Test', 940322134),
(19, 'Dominos', 940322105),
(20, 'Mahmoud Al-Toukhi', 0),
(21, 'Dr. Khloud', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ADMIN_USER_FK` (`UserID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CATEGORY_RESTAURANT_FK` (`RestaurantID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `customer_ibfk_1` (`UserID`);

--
-- Indexes for table `discount_offer`
--
ALTER TABLE `discount_offer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DISCOUNT_OFFER_OFFER_FK` (`OfferID`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FAVORITE_PRODUCT_FK` (`ProductID`),
  ADD KEY `FAVORITE_CUSTOMER_FK` (`CustomerID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `free_offer`
--
ALTER TABLE `free_offer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FREE_OFFER_PRODUCT_FK` (`ProductID`),
  ADD KEY `FREE_OFFER_OFFER_FK` (`OfferID`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INCOME_RESTAURANT_FK` (`RestaurantID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `NOTIFICATION_USER_FK` (`UserID`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OFFER_PRODUCT_FK` (`ProductID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ORDER_CUSTOMER_FK` (`CustomerID`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ORDER_ITEM_PRODUCT_FK` (`ProductID`),
  ADD KEY `ORDER_ITEM_ORDER_FK` (`OrderID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PRODUCT_CATEGORY_FK` (`CategoryID`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `RATE_CUSTOMER_FK` (`CustomerID`),
  ADD KEY `RATE_PRODUCT_FK` (`ProductID`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `RESTAURANT_USER_FK` (`UserID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `REVIEW_CUSTOMER_FK` (`CustomerID`),
  ADD KEY `REVIEW_PRODUCT_FK` (`ProductID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `discount_offer`
--
ALTER TABLE `discount_offer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `free_offer`
--
ALTER TABLE `free_offer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `ADMIN_USER_FK` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `CATEGORY_RESTAURANT_FK` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`ID`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `discount_offer`
--
ALTER TABLE `discount_offer`
  ADD CONSTRAINT `DISCOUNT_OFFER_OFFER_FK` FOREIGN KEY (`OfferID`) REFERENCES `offer` (`ID`);

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `FAVORITE_CUSTOMER_FK` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  ADD CONSTRAINT `FAVORITE_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `free_offer`
--
ALTER TABLE `free_offer`
  ADD CONSTRAINT `FREE_OFFER_OFFER_FK` FOREIGN KEY (`OfferID`) REFERENCES `offer` (`ID`),
  ADD CONSTRAINT `FREE_OFFER_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `INCOME_RESTAURANT_FK` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`ID`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `NOTIFICATION_USER_FK` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `OFFER_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `ORDER_CUSTOMER_FK` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `ORDER_ITEM_ORDER_FK` FOREIGN KEY (`OrderID`) REFERENCES `order` (`ID`),
  ADD CONSTRAINT `ORDER_ITEM_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `PRODUCT_CATEGORY_FK` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`ID`);

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `RATE_CUSTOMER_FK` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  ADD CONSTRAINT `RATE_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `RESTAURANT_USER_FK` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `REVIEW_CUSTOMER_FK` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  ADD CONSTRAINT `REVIEW_PRODUCT_FK` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
