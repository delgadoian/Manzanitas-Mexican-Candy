ALTER TABLE "Manzanitas Store".products
ADD COLUMN id SERIAL PRIMARY KEY,
ADD COLUMN name VARCHAR(255) NOT NULL,
ADD COLUMN category VARCHAR(100) NOT NULL,
ADD COLUMN price DECIMAL(10,2) NOT NULL,
ADD COLUMN image TEXT,
ADD COLUMN stock INTEGER DEFAULT 0;