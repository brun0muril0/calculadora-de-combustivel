-- Criação do banco de dados
CREATE DATABASE fuel_calculator;

-- Conectar ao banco
\c fuel_calculator;

-- Tabela de marcas
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de carros
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id),
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    fuel_consumption DECIMAL(4,2) NOT NULL, -- km/l
    fuel_type VARCHAR(20) DEFAULT 'gasoline', -- gasoline, ethanol, diesel, flex
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de cálculos salvos
CREATE TABLE calculations (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(id),
    distance DECIMAL(10,2) NOT NULL,
    fuel_needed DECIMAL(10,2) NOT NULL,
    fuel_price DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    origin VARCHAR(255),
    destination VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir marcas populares
INSERT INTO brands (name, logo_url) VALUES
('Toyota', 'https://example.com/toyota-logo.png'),
('Volkswagen', 'https://example.com/vw-logo.png'),
('Ford', 'https://example.com/ford-logo.png'),
('Chevrolet', 'https://example.com/chevrolet-logo.png'),
('Honda', 'https://example.com/honda-logo.png'),
('Hyundai', 'https://example.com/hyundai-logo.png'),
('Nissan', 'https://example.com/nissan-logo.png'),
('Fiat', 'https://example.com/fiat-logo.png'),
('Renault', 'https://example.com/renault-logo.png'),
('Peugeot', 'https://example.com/peugeot-logo.png');

-- Inserir carros populares com consumo real
INSERT INTO cars (brand_id, model, year, fuel_consumption, fuel_type) VALUES
-- Toyota
(1, 'Corolla', 2023, 14.5, 'flex'),
(1, 'Etios', 2023, 15.2, 'flex'),
(1, 'Yaris', 2023, 16.8, 'flex'),
(1, 'Hilux', 2023, 9.5, 'diesel'),
-- Volkswagen
(2, 'Gol', 2023, 13.8, 'flex'),
(2, 'Polo', 2023, 14.2, 'flex'),
(2, 'T-Cross', 2023, 12.5, 'flex'),
(2, 'Virtus', 2023, 13.9, 'flex'),
-- Ford
(3, 'Ka', 2023, 14.8, 'flex'),
(3, 'EcoSport', 2023, 12.1, 'flex'),
(3, 'Ranger', 2023, 8.9, 'diesel'),
-- Chevrolet
(4, 'Onix', 2023, 14.6, 'flex'),
(4, 'Prisma', 2023, 13.7, 'flex'),
(4, 'Tracker', 2023, 11.8, 'flex'),
(4, 'S10', 2023, 9.2, 'diesel'),
-- Honda
(5, 'City', 2023, 14.1, 'flex'),
(5, 'Civic', 2023, 12.8, 'gasoline'),
(5, 'HR-V', 2023, 13.2, 'flex'),
-- Hyundai
(6, 'HB20', 2023, 14.3, 'flex'),
(6, 'Creta', 2023, 12.4, 'flex'),
(6, 'Tucson', 2023, 10.8, 'gasoline'),
-- Nissan
(7, 'March', 2023, 15.1, 'flex'),
(7, 'Versa', 2023, 13.5, 'flex'),
(7, 'Kicks', 2023, 13.8, 'flex'),
-- Fiat
(8, 'Argo', 2023, 14.7, 'flex'),
(8, 'Mobi', 2023, 15.9, 'flex'),
(8, 'Toro', 2023, 9.8, 'flex'),
-- Renault
(9, 'Kwid', 2023, 16.2, 'flex'),
(9, 'Sandero', 2023, 13.6, 'flex'),
(9, 'Duster', 2023, 11.5, 'flex'),
-- Peugeot
(10, '208', 2023, 14.9, 'flex'),
(10, '2008', 2023, 12.7, 'flex'),
(10, '3008', 2023, 11.2, 'gasoline');