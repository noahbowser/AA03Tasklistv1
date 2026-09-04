const express = require("express");
const router = express.Router();
const aufgabenController = require("../controllers/aufgabenController");

router.get("/", aufgabenController.getAlleAufgaben);
router.get("/aufgaben/neu", aufgabenController.zeigeNeuFormular);
router.post("/aufgaben/neu", aufgabenController.erstelleAufgabe);
router.post("/aufgaben/:id/erledigt", aufgabenController.markiereErledigt);
router.post("/aufgaben/:id/loeschen", aufgabenController.loescheAufgabe);

module.exports = router;
