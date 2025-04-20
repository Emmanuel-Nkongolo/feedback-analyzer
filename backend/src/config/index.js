import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname  equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variable
dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
  server: {
    port: process.env.PORT || 4000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "http://localhost:8080/v1/chat/completions",
  },
  holistic: {
    model: (question) => {},
  },
};

export default config;
