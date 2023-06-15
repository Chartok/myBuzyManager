import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'employee_db',
});

export function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

export function connectToDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
}

export function disconnectFromDatabase() {
    connection.end();
}