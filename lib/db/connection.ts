import mysql from 'mysql2/promise';
import { getDatabaseConfig } from '../config/database';
import { initializeDatabase } from './migrations';

let connection: mysql.Connection | null = null;

export async function getConnection() {
  try {
    if (!connection) {
      connection = await mysql.createConnection(getDatabaseConfig());
      await initializeDatabase(connection);
    }
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database. Please check your MySQL configuration.');
  }
}

export async function closeConnection() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}