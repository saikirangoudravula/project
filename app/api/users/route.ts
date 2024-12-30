import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getConnection, closeConnection } from '@/lib/db';

const userSchema = z.object({
  name: z.string().min(1).max(100),
  age: z.number().min(0).max(150),
});

export async function POST(req: Request) {
  try {
    const conn = await getConnection();
    const body = await req.json();
    const { name, age } = userSchema.parse(body);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [result] = await conn.execute(
      'INSERT INTO users (name, age) VALUES (?, ?)',
      [name, age]
    );
    console.log('Insert resukt:', result);

    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE id = ?',
      [(result as any).insertId]
    );

    const newUser = (rows as any[])[0];
    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM users ORDER BY created_at DESC');
    
    if (!Array.isArray(rows)) {
      throw new Error('Invalid response from database');
    }
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}