import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// This will get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

const seedDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const seedFile = join(__dirname, 'seed.sql');
        const seedData = await fs.readFile(seedFile, 'utf8');

        const commands = seedData.split(';').filter(command => command.trim() !== '');

        for (let command of commands) {
            await connection.query(command);
        }

        console.log('Database seeded successfully');
        connection.end();
    } catch (error) {
        console.error('Error seeding database', error);
    }
}

seedDatabase();
