import { getConnection } from '../db/connection';
import type { UserInput } from '../schemas/user.schema';

export async function createUser(userData: UserInput) {
  const conn = await getConnection();
  
  const [result] = await conn.execute(
    'INSERT INTO users (name, age) VALUES (?, ?)',
    [userData.name, userData.age]
  );
  
  const [rows] = await conn.execute(
    'SELECT * FROM users WHERE id = ?',
    [(result as any).insertId]
  );

  return (rows as any[])[0];
}

export async function getUsers() {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT * FROM users ORDER BY created_at DESC');
  return rows;
}