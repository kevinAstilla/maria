import { Pool } from 'pg';
import pool from '../../src/config/database';

// to-do: this needs to be reqwritten to use TypeORM

describe('Database Connection Test', () => {
  it('should connect to the database successfully', async () => {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    expect(result.rows.length).toBeGreaterThan(0);
    client.release();
  });

  it('should fail to connect with incorrect credentials', async () => {
    // This test simulates a failed connection by providing wrong credentials
    const invalidPool = new Pool({
      user: 'wrong_user',
      host: 'localhost',
      database: 'wrong_db',
      password: 'wrong_password',
      port: 5432,
    });

    try {
      await invalidPool.connect();
    } catch (err) {
      expect(err.message).toMatch(/role \"wrong_user\" does not exist/);
    }
  });
});