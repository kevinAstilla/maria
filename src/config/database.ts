import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER || 'maria_user',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'maria',
  password: process.env.PG_PASSWORD || 'G£-45B81l-u0',
  port: process.env.PG_PORT || 5432,
});

pool.on('connect', () => {
  console.log(`connected to the ${process.env.PG_DATABASE || 'maria'} database`);
})

pool.on('error', (error) => {
  console.log(`error with the PostgreSQL pool: ${error}`);
  process.exit(-1);
})

export default pool;