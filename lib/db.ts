import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export async function getConnection() {
  try {
    if (!connection) {
      const config = {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '1234',
        database: process.env.MYSQL_DATABASE || 'user_management',
        ssl: process.env.MYSQL_SSL === 'true' ? {
          rejectUnauthorized: false
        } : undefined
      };

      connection = await mysql.createConnection(config);
      
      // Initialize database and tables
      await initializeDatabase(connection);
    }
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database. Please check your MySQL configuration.');
  }
}

async function initializeDatabase(conn: mysql.Connection) {
  try {
    // Create users table if it doesn't exist
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error('Failed to initialize database tables.');
  }
}

export async function closeConnection() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}