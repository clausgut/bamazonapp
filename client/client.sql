DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,

   product_name VARCHAR(50) NOT NULL,

   department_name VARCHAR(50) NOT NULL,

   price DECIMAL(10,2) NOT NULL,

   stock_quantity INTEGER(10) NOT NULL,

   PRIMARY KEY (item_id)
);

    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Cookies & Cream Ice cream','Frozen Food', 5.99, 300);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Dog Ice cream - strawberry','Pets', 8.99, 150);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Bouncy Paper Towel','Paper goods', 3.99, 700);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Dove Body Lotion','Personal Care', 5.99, 450);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Shortbread Cookies','Snacks', 2.99, 600);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Graham Crackers','Snacks', 1.99, 1000);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Salmon fish','Seafood', 15.99, 400);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Kettle cooked chips','Snacks', 4.99, 300);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Celery','Vegetables', 0.99, 1000);
    INSERT INTO products(product_name,department_name, price, stock_quantity) VALUES('Broccoli','Vegetables', 0.89, 1000);

