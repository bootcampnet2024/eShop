USE master;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'eShop')
BEGIN
    CREATE DATABASE eShop;
END;
