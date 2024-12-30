import type { Connection } from 'mysql2/promise';

export async function initializeDatabase(conn: Connection) {
  try {
    await createUsersTable(conn);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error('Failed to initialize database tables.');
  }
}

async function createUsersTable(conn: Connection) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      age INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}