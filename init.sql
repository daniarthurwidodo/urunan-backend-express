-- This file will be executed when the PostgreSQL container starts for the first time

-- Create additional databases if needed
-- CREATE DATABASE myapp_test;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert some initial data (optional)
-- This will run after Sequelize creates the tables
-- INSERT INTO users (name, email, "createdAt", "updatedAt") 
-- VALUES 
--   ('John Doe', 'john@example.com', NOW(), NOW()),
--   ('Jane Smith', 'jane@example.com', NOW(), NOW());