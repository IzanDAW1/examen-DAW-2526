// TODO CRUD de árbitros pendiente de implementar
import express from "express";
import Referee from "../models/referee.js";

const router = express.Router();
// - GET /referees
router.get("/", async (req, res) => {
  try {
    const referees = await Referee.find();
    res.render("referees_list.njk", { referees: referees });
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});
// - GET /referees/new
router.get("/new", async (req, res) => {
  try {
    res.render("referees_new.njk");
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});
// - POST /referees/new
router.post("/new", async (req, res) => {
  try {
    if (!req.body.name) errors.name = "Error en el nombre";
    if (!req.body.licenseNumber) errors.licenseNumber = "Error en el nombre";

    const newRef = new Referee({
      name: req.body.name,
      licenseNumber: req.body.licenseNumber,
    });

    await newRef.save();

    res.redirect("/referees");
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});
// - GET /referees/:id
router.get("/:id/edit", async (req, res) => {
  try {

    const referee = Referee.findById(req.params.id)

    res.render("referees_edit.njk", { referee: referee });
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});
// - PUT /referees/:id
router.post("/:id", async (req, res) => {
  try {
    const updatedRef = new Referee({
      name: req.body.name,
      licenseNumber: req.body.licenseNumber,
    });

    await Referee.findByIdAndUpdate(req.params.id, {
      $set: updatedRef,
    });

    res.redirect("/referees");
  } catch (err) {
    console.log(err.message);
    res.render("error.njk", { error: "Error cargando partidos" });
  }
});
// - DELETE /referees/:id

export default router;
