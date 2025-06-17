import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

import "dotenv/config";

import session from "express-session";
import passport from "./config/passport";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session middleware (required for Passport)
app.use(
  session({
    secret: "your_secret_key", // Use a strong secret in production!
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World with TypeScript and PostgreSQL!" });
});

// Healthcheck route
app.get("/healthcheck", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Sync database (creates tables if they don't exist)
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
    process.exit(1);
  }
};

startServer();

export default app;
