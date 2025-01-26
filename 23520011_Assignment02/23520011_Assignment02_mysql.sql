use adsl_aggin1;
SET SQL_SAFE_UPDATES = 0;


-- Q1 
DELIMITER $$
create procedure addvalues()
BEGIN
	Declare i int default 1;
    while i<= 50 do
       insert into test_table(RecordNumber,CurrentDate)
       values (i,CURDATE());
       set i = i+1;
	end while;
END $$
DELIMITER ;

call addvalues();


create table test_table(
   RecordNumber INT(3),
   CurrentDate Date
);


select * from test_table;
-- Defining the procedure for the products table 
-- Q2
DELIMITER $$
create procedure increval(in x int , in y varchar(3))
begin
    UPDATE products
    SET price = price + (price * x / 100)
    WHERE category = y;
end $$ 
DELIMITER ;

CALL increval(0, 'ELE');  


create table products(
ProductId int(4),
category varchar(3),
detail varchar(30),
price decimal(10,2),
stock int(5)
);

INSERT INTO products (ProductId, category, detail, price, stock) 
VALUES
(1001, 'ELE', 'Electric Kettle', 1999.99, 50),
(1002, 'FUR', 'Wooden Chair', 999.50, 100),
(1003, 'APP', 'Smartphone', 29999.00, 30),
(1004, 'KIT', 'Mixer Grinder', 2499.99, 75),
(1005, 'ELE', 'Microwave Oven', 7999.00, 40),
(1006, 'FAS', 'Leather Jacket', 5499.99, 20),
(1007, 'APP', 'Laptop', 65999.00, 25),
(1008, 'KIT', 'Induction Cooktop', 3499.50, 60),
(1009, 'ELE', 'Ceiling Fan', 1899.99, 90),
(1010, 'FUR', 'Study Table', 4599.00, 15);

select * from products;

-- Q3
DELIMITER $$

CREATE FUNCTION countNoOfWords(nameField VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN LENGTH(nameField) - LENGTH(REPLACE(nameField, ' ', '')) + 1;
END $$

DELIMITER ;

CREATE TABLE ObjectTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);
INSERT INTO ObjectTable (name) VALUES
('Alice in Wonderland'),
('MySQL Workbench'),
('Database Design Basics'),
('Hello World');

SELECT id, name, countNoOfWords(name) AS word_count
FROM ObjectTable;


-- Q2
CREATE TABLE AddressTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10)
);

INSERT INTO AddressTable (address, city, state, pincode) VALUES
('123 Main Street', 'New York', 'New York', '10001'),
('456 Elm Street', 'Los Angeles', 'California', '90001'),
('789 Oak Avenue', 'Chicago', 'Illinois', '60601'),
('101 Pine Lane', 'Houston', 'Texas', '77001');


DELIMITER $$

CREATE FUNCTION extractAddressesByKeyword(keyword VARCHAR(50))
RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE result TEXT;
    SELECT GROUP_CONCAT(CONCAT(address, ', ', city, ', ', state, ', ', pincode) SEPARATOR '; ')
    INTO result
    FROM AddressTable
    WHERE address LIKE CONCAT('%', keyword, '%') 
       OR city LIKE CONCAT('%', keyword, '%') 
       OR state LIKE CONCAT('%', keyword, '%') 
       OR pincode LIKE CONCAT('%', keyword, '%');
    RETURN IFNULL(result, 'No addresses found');
END $$

DELIMITER ;


DELIMITER $$

CREATE FUNCTION countWordsInField(fieldName VARCHAR(50), idValue INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE fieldContent VARCHAR(255);
    DECLARE wordCount INT;

    SET fieldContent = CASE
        WHEN fieldName = 'address' THEN (SELECT address FROM AddressTable WHERE id = idValue)
        WHEN fieldName = 'city' THEN (SELECT city FROM AddressTable WHERE id = idValue)
        WHEN fieldName = 'state' THEN (SELECT state FROM AddressTable WHERE id = idValue)
        WHEN fieldName = 'pincode' THEN (SELECT pincode FROM AddressTable WHERE id = idValue)
        ELSE NULL
    END;

    SET wordCount = LENGTH(fieldContent) - LENGTH(REPLACE(fieldContent, ' ', '')) + 1;

    RETURN IFNULL(wordCount, 0);
END $$

DELIMITER ;


SELECT extractAddressesByKeyword('Street') AS result;

SELECT countWordsInField('address', 1) AS word_count;

CREATE TABLE CourseTypeTable (
    course_id INT PRIMARY KEY,
    description VARCHAR(255)
);

INSERT INTO CourseTypeTable (course_id, description) VALUES
(101, 'Introduction to Programming'),
(102, 'Data Structures and Algorithms'),
(103, 'Database Management Systems'),
(104, 'Artificial Intelligence'),
(105, 'Machine Learning');

SELECT * FROM CourseTypeTable;






