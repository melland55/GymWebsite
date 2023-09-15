USE GymWebsite;
DROP PROCEDURE IF EXISTS create_account;
DELIMITER $$

CREATE PROCEDURE AddMember(
  IN p_username VARCHAR(40),
  IN p_email VARCHAR(100),
  IN p_password BINARY(60),
  IN p_salt BINARY(60),
  IN p_first_name VARCHAR(50),
  IN p_last_name VARCHAR(50),
  IN p_phone_number VARCHAR(15),
  IN p_address_line1 VARCHAR(255),
  IN p_address_line2 VARCHAR(255),
  IN p_city VARCHAR(100),
  IN p_state VARCHAR(50),
  IN p_postal_code VARCHAR(20),
  IN p_country VARCHAR(50),
  IN p_birthday DATE
)
BEGIN
  DECLARE p_user_id INT;
  SET p_member_id = LEFT(UUID(), 6);
	SET p_userType = "Member";
  INSERT INTO Users (username, email, password, salt, userType)
  VALUES (p_username, p_email, p_password, p_salt, p_userType);
  SET p_user_id = LAST_INSERT_ID();

  -- Insert data into the Members table
  INSERT INTO Members (member_id, user_id, stripe_customer_id, first_name, last_name, phone_number, address_line1, address_line2, city, state, postal_code, country, birthday, join_date)
  VALUES (p_member_id, p_user_id, NULL, p_first_name, p_last_name, p_phone_number, p_address_line1, p_address_line2, p_city, p_state, p_postal_code, p_country, p_birthday, CURDATE());
    
END$$

DELIMITER ;