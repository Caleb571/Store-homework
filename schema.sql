DROP DATABASE IF EXISTS store_db;
create database store_db;



use store_db;



create table products (

id int(15) not null auto_increment,

product_name varchar (50) not null,

department_name varchar (50) not null,

price decimal(10,2) not null,

stock int (15) not null,

primary key (id),

key product_name (product_name)

) engine=InnoDB auto_increment=20 default charset = utf8;



insert into products values (1, "Keyboard", "electronics", 49.95, 25), 

(2, "Mouse", "electronics", 50.99, 30), 

(3, "monitor", "electronics", 120.00, 10),

(4, "Dual Titan Graphics card", "electronics", 10000.00, 5),

(5, "Intel Core i9", "electronics", 500.00, 10),

(6, "Lighting Strips", "electronics", 20.00, 40);

select * from products;