import express from "express";
import passport from "passport";

const router = express.Router();

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
    res.redirect("http://localhost:5173/dashboard"); // Redirige a la página protegida
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
