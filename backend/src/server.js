import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connect } from "mongoose";
import bcrypt from 'bcrypt';
import { Admin } from './models/admin.model.js';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import kycRoutes from "./routes/kyc.routes.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || "http://localhost:4200";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uploadsDir = path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", kycRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

async function start() {
  try {
    await connect(process.env.MONGODB_URI);
    // seed default admin if missing
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
      if (!existing) {
        await Admin.create({
          email: process.env.ADMIN_EMAIL,
          passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        });
        console.log('Seeded default admin', process.env.ADMIN_EMAIL);
      }
    }
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
