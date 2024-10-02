USE master;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'eShop_Catalog')
BEGIN
    CREATE DATABASE eShop_Catalog;
END;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'eShop_Basket')
BEGIN
    CREATE DATABASE eShop_Basket;
END;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'eShop_Ordering')
BEGIN
    CREATE DATABASE eShop_Ordering;
END;
