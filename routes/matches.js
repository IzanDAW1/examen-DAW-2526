import express from "express";
import Match from "../models/match.js";
import Referee from "../models/referee.js";

const router = express.Router();

// Listado de partidos
// TODO EXAMEN: carga los datos completos del árbitro asociado al mostrar el listado de partidos.
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find();
    res.render("matches_list.njk", { matches: matches });
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});

// TODO EXAMEN:

// GET /matches/:id/referee -> mostrar partido + seleccionar árbitros
router.get("/:id/referee", async (req, res) => {
  try {
    let errors = {};
    const match = await Match.findById(req.params.id);

    if (!match.referee) {
      errors.referee = "No hay un arbitro designado";
    }

    const referees = await Referee.find();

    if (!match.referee) {
      errors.referee = "No hay un arbitro designado";
    }

    res.render("matches_referees.njk", { match: match, referees: referees });
  } catch (error) {
    res.render("error", { error: "Error interno del servidor" });
  }
});

// POST /matches/:id/referee -> asignar árbitro y redirigir a partidos

router.post("/:id/referee", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    match.referee.update(req.body.referee);

    await match.save();

    res.redirect("/");

  } catch (error) {
    res.render("error.njk", { error: "Error interno del servidor" });
  }
});
export default router;
