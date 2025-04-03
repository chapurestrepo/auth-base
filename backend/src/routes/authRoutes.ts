import express from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const clientURL = process.env.CLIENT_URL as string; // ✅ Toma la URL base del cliente desde variables de entorno

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${clientURL}/dashboard`); // ✅ Usa la URL base del cliente
  }
);

// Ruta para obtener el usuario autenticado
router.get("/user", (req, res) => {
  res.json(req.user);
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/");
  });
});

export default router;
