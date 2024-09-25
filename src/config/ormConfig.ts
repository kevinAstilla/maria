import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Ingredient } from "../entities/Ingredient";
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'postpass144',
  database: process.env.DB_NAME || 'maria_db',
  entities: [Ingredient],
  synchronize: true,
  logging: true,
});
