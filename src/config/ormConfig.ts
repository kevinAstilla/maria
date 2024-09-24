import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Ingredient } from "../entities/Ingredient";
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'G45B81lu0',
  database: process.env.DB_NAME || 'maria',
  entities: [Ingredient],
  synchronize: true,
  logging: true,
});
