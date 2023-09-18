#CREATE DATABASE GymWebsite;
#USE GymWebsite;
DROP TABLE IF EXISTS `ItemTransactions`;
DROP TABLE IF EXISTS `SubscriptionTransactions`;
DROP TABLE IF EXISTS `CheckInLog`;
DROP TABLE IF EXISTS `Transactions`;
DROP TABLE IF EXISTS `Items`;
DROP TABLE IF EXISTS `Subscriptions`;
DROP TABLE IF EXISTS `MembershipPlans`;
DROP TABLE IF EXISTS `Admins`;
DROP TABLE IF EXISTS `Workers`;
DROP TABLE IF EXISTS `Members`;
DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` BINARY(60) NOT NULL,
    `salt` BINARY(60) NOT NULL,
    `user_type` VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Members` (
    `member_id` CHAR(6) PRIMARY KEY,
    `user_id` INT NOT NULL,
    `stripe_customer_id` VARCHAR(255),
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(15),
    `address_line1` VARCHAR(255),
    `address_line2` VARCHAR(255),
    `city` VARCHAR(100),
    `state` VARCHAR(50),
    `postal_code` VARCHAR(20),
    `country` VARCHAR(50),
    `birthday` DATE,
    `join_date` DATE,
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `Workers` (
    `worker_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `pin` VARCHAR(4) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `Admins` (
    `admin_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `pin` VARCHAR(4) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `MembershipPlans` (
    `plan_id` INT PRIMARY KEY AUTO_INCREMENT,
    `plan_name` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `duration_months` INT NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS `Subscriptions` (
    `subscription_id` INT PRIMARY KEY AUTO_INCREMENT,
    `member_id` CHAR(6) NOT NULL,
    `admin_id` INT NOT NULL,
    `plan_id` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `stripe_subscription_id` VARCHAR(255),
    FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`),
    FOREIGN KEY (`admin_id`) REFERENCES `Admins` (`admin_id`),
    FOREIGN KEY (`plan_id`) REFERENCES `MembershipPlans` (`plan_id`)
);

CREATE TABLE IF NOT EXISTS `Items` (
    `item_id` INT PRIMARY KEY AUTO_INCREMENT,
    `item_name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS `Transactions` (
    `transaction_id` INT PRIMARY KEY AUTO_INCREMENT,
    `member_id` CHAR(6),
    `worker_id` INT,
    `total` DECIMAL(10,2) NOT NULL,
    `payment_date` DATETIME NOT NULL,
    `payment_method` ENUM ('Stripe', 'Cash', 'Check') NOT NULL,
    `stripe_charge_id` VARCHAR(255),
    `check_number` VARCHAR(50),
    FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`),
    FOREIGN KEY (`worker_id`) REFERENCES `Workers` (`worker_id`)
);

CREATE TABLE IF NOT EXISTS `ItemTransactions` (
    `item_transaction_id` INT PRIMARY KEY AUTO_INCREMENT,
    `transaction_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    `amount` INT NOT NULL,
    FOREIGN KEY (`transaction_id`) REFERENCES `Transactions` (`transaction_id`),
    FOREIGN KEY (`item_id`) REFERENCES `Items` (`item_id`)
);

CREATE TABLE IF NOT EXISTS `SubscriptionTransactions` (
    `subscription_transaction_id` INT PRIMARY KEY AUTO_INCREMENT,
    `transaction_id` INT NOT NULL,
    `subscription_id` INT NOT NULL,
    FOREIGN KEY (`transaction_id`) REFERENCES `Transactions` (`transaction_id`),
    FOREIGN KEY (`subscription_id`) REFERENCES `Subscriptions` (`subscription_id`)
);

CREATE TABLE IF NOT EXISTS `CheckInLog` (
    `check_in_id` INT PRIMARY KEY AUTO_INCREMENT,
    `member_id` CHAR(6) NOT NULL,
    `date_time` DATETIME NOT NULL,
    `is_manual` BOOLEAN NOT NULL,
    `worker_id` INT,
    FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`),
    FOREIGN KEY (`worker_id`) REFERENCES `Workers` (`worker_id`)
);



