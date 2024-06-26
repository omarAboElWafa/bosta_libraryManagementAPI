require("dotenv").config();
export const PORT: string | number = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";

export const dbConfigs = {
  user: process.env.DB_USER || "",
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  password: process.env.DB_PASS || "",
  port: parseInt(process.env.DB_PORT || "5432"),
  max: parseInt(process.env.DB_MAX || "20"),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || "30000"),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || "2000")
};

const REDIS_HOST: string = process.env.REDIS_HOST || "";
const REDIS_PORT: number = parseInt(process.env.REDIS_PORT || "6379");

export const redisConfig = { host: REDIS_HOST, port: REDIS_PORT };

export const HASH_SALT_ROUNDS: number = parseInt(
  process.env.HASH_SALT_ROUNDS || "10"
);

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";
export const ACCESS_TOKEN_EXPIRY: string = process.env.ACCESS_TOKEN_EXPIRY || "";
export const ACCESS_TOKEN_EXPIRY_FOR_CACHE = parseInt(process.env.ACCESS_TOKEN_EXPIRY_FOR_CACHE || "60");
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";
export const REFRESH_TOKEN_EXPIRY: string = process.env.REFRESH_TOKEN_EXPIRY || "";
export const REFRESH_TOKEN_EXPIRY_FOR_CACHE: number = parseInt(process.env.REFRESH_TOKEN_EXPIRY_FOR_CACHE || "60");
export const RESET_PASSWORD_TOKEN_EXPIRY_FOR_CACHE: number = parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY_FOR_CACHE || "60");
export const RESET_PASSWORD_TOKEN_SECRET: string = process.env.RESET_PASSWORD_TOKEN_SECRET || "";
export const ADMIN_TOKEN_SECRET: string = process.env.ADMIN_TOKEN_SECRET || "";

// OTP and Email Config
export const OTP_SECRET : string = process.env.OTP_SECRET || '';
export const OTP_TOKEN_EXPIRY_FOR_CACHE : number = parseInt(process.env.OTP_TOKEN_EXPIRY_FOR_CACHE || "60");
export const EMAIL_CONFIGS = {
    service: process.env.EMAIL_SERVICE || '',
    host: process.env.EMAIL_HOST || '',
    secure: process.env.EMAIL_SECURE === 'true' ? true : false,
    port: parseInt(process.env.EMAIL_PORT || '0'),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
};
export const SENDER_MAIL :string = process.env.SENDER_MAIL || '';
export const OTP_VALIDITY_PERIOD : number = parseInt(process.env.OTP_VALIDITY_PERIOD || "5");


// Book Configs
export const BOOK_EXPIRY_FOR_CACHE : number = parseInt(process.env.BOOK_EXPIRY_FOR_CACHE || "60");  

// Loan Configs
export const MAX_DURATION_BORROW_DAYS : number = parseInt(process.env.MAX_DURATION_BORROW_DAYS || "14");