create database sec_proj;
use sec_proj;

create table User (
	email nvarchar(50),
    username nvarchar(50) UNIQUE,
    account_num nvarchar(50),
    password CHAR(64),
    pass_salt nvarchar(15),
    phone nvarchar(20),
    SSN nvarchar(50),
    gender ENUM('M', 'F'),
    address nvarchar(100),
    admin boolean DEFAULT(false),
	PRIMARY KEY (Email)
    FOREIGN KEY (account_num) REFERENCES Bank_Account(account_num),
);

create table BankAccount (
    account_num nvarchar(50),
    balance nvarchar(50),
	PRIMARY KEY (account_num),
);

create table Transactions (
	ID int auto_increment,
    sender nvarchar(50),
    receiver nvarchar(50),
    amount nvarchar(50),
    comment nvarchar(255),
    PRIMARY KEY (ID),
	FOREIGN KEY (sender) REFERENCES User(username),
	FOREIGN KEY (receiver) REFERENCES User(username),
);