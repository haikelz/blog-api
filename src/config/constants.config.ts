import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const DATABASE_HOST = process.env.DATABASE_HOST as string;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) as number;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
export const DATABASE_NAME = process.env.DATABASE_NAME as string;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
