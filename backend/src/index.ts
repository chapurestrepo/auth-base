import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./config/db";
import passport from "passport";
import MongoStore from "connect-mongo"; // ✅ Importamos connect-mongo
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

// ✅ Configurar sesión con MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Evita error si falta la variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string, // ✅ Usa la URL de MongoDB Atlas
      ttl: 14 * 24 * 60 * 60, // 14 días
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando con autenticación!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
