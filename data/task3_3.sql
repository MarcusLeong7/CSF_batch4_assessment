drop database if exists ecommerce;
create database ecommerce;

use ecommerce;

create table if not exists orders(
	order_id varchar(26) not null,
	date timestamp not null default current_timestamp,
	name varchar(256) not null,
	address varchar(256) not null,
	priority boolean default false,
	comments text,
	
	constraint pk_order_id primary key (order_id)
);

create table cart (
    cart_id int auto_increment,
    order_id varchar(26) not null,
    prod_id varchar(255) not null,
    name varchar(255) not null,
    price decimal(10, 2) not null,
    quantity int not null,
    
    constraint pk_cart_id primary key(cart_id),
    constraint fk_order_id foreign key (order_id) references orders(order_id)
);


