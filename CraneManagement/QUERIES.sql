CREATE DATABASE IF NOT EXISTS crane_management;
USE crane_management;

-- Users Table (for both customer and admin)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('customer', 'admin') DEFAULT 'customer'
);

-- Cranes Table
CREATE TABLE cranes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('mobile', 'stationary', 'hybrid') NOT NULL,
  status ENUM('available', 'unavailable') DEFAULT 'available'
);

-- Bookings Table
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  crane_type ENUM('mobile', 'stationary', 'hybrid'),
  crane_id INT,
  from_date DATE,
  to_date DATE,
  total_cost INT,
  status ENUM('pending', 'approved', 'declined'),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (crane_id) REFERENCES cranes(id)
);

-- Mobile Cranes
INSERT INTO cranes (type, status) VALUES ('mobile', 'available');
INSERT INTO cranes (type, status) VALUES ('mobile', 'available');
INSERT INTO cranes (type, status) VALUES ('mobile', 'available');

-- Stationary Cranes
INSERT INTO cranes (type, status) VALUES ('stationary', 'available');
INSERT INTO cranes (type, status) VALUES ('stationary', 'available');

-- Hybrid Cranes
INSERT INTO cranes (type, status) VALUES ('hybrid', 'available');
INSERT INTO cranes (type, status) VALUES ('hybrid', 'available');
