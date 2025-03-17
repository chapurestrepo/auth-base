import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./config/db";
import passport from "passport";
import "./config/passport";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Definir clientURL basado en el entorno
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";

connectDB();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// ✅ Corregir la redirección después del login
app.get("/auth/google/callback", (req, res) => {
  res.redirect(`${clientURL}/dashboard`);
});

app.get("/", (req, res) => {
  res.send("Backend funcionando con autenticación!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
