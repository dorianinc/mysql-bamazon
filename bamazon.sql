
-- Create a database called 'Bamazon' and switch into it for this activity --
CREATE DATABASE bamazon_db;

USE bamazon_db;
DROP DATABASE IF EXISTS bamazon_db;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
	);
    
SELECT * FROM products;

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES	('Xbox One X 1TB Console', 'Electronics', '484.50', '10'),
        ('PlayStation 4 Pro 1TB', 'Electronics', '379.00', '10'),
        ('Nintendo Switch - Gray', 'Electronics', '299.00', '10'),
		('Funko POP! Rick and Morty - Tinkles & Ghost in a Jar', 'Toys', '65.00', '10'),
        ('Funko POP! Rick and Morty - Pickle Rick', 'Toys', '10.99', '10'),
        ('Funko POP! Rick and Morty - Sentient Arm Morty', 'Toys', '10.99', '10'),
        ('Funko POP! Rick and Morty - Scary Terry', 'Toys', '10.99', '10'),
		('Five Ten Anasazi Moccasym Climbing Shoe', 'Sports & Outdoors', '145.00', '10'),
        ('Black Diamond Momentum Harness', 'Sports & Outdoors', '45.00', '10'),
        ('Chaandu Blue Tribal Chalk Bag with Belt', 'Sports & Outdoors', '25.99', '10'),
		('American Journey Dry Dog Food, 4-lb bag', 'Pet Supplies', '49.99', '10'),
        ('GREENIES Original Dog Dental Chews Dog Treats, 12 oz', 'Pet Supplies','15.99', '10'),
        ('KONG Wubba Dog Toy LARGE', 'Pet Supplies', '10.99', '10');

DELETE FROM products WHERE edit_user IS NULL;
        
        

   

