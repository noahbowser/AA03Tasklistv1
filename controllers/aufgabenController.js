const prisma = require("../lib/prisma");

// Gibt eine einheitliche HTML-Fehlermeldung zurück (ejs-Seiten bleiben unverändert)
function sendeDatenbankFehler(res, err) {
  console.error("Datenbankfehler:", err);
  res.status(503).send(`<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Fehler</title></head>
<body>
  <h1>Datenbank nicht erreichbar</h1>
  <p>Die Aufgaben konnten nicht geladen bzw. gespeichert werden. Bitte prüfen Sie, ob MySQL läuft und die DATABASE_URL in der .env-Datei stimmt.</p>
  <p><a href="/">Zurück zur Übersicht</a></p>
</body>
</html>`);
}

exports.getAlleAufgaben = async (req, res) => {
  try {
    const aufgaben = await prisma.task.findMany({
      orderBy: [{ done: "asc" }, { dueDate: "asc" }],
    });

    // dueDate als reines Datum (YYYY-MM-DD) für die Anzeige im ejs-Template aufbereiten
    const tasks = aufgaben.map((t) => ({
      ...t,
      dueDate: t.dueDate ? t.dueDate.toISOString().slice(0, 10) : "",
    }));

    res.render("index", { tasks });
  } catch (err) {
    sendeDatenbankFehler(res, err);
  }
};

exports.zeigeNeuFormular = (req, res) => {
  res.render("neu");
};

exports.erstelleAufgabe = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        done: false,
      },
    });

    res.redirect("/");
  } catch (err) {
    sendeDatenbankFehler(res, err);
  }
};

exports.markiereErledigt = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.task.updateMany({
      where: { id },
      data: { done: true },
    });

    res.redirect("/");
  } catch (err) {
    sendeDatenbankFehler(res, err);
  }
};

exports.loescheAufgabe = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.task.deleteMany({
      where: { id },
    });

    res.redirect("/");
  } catch (err) {
    sendeDatenbankFehler(res, err);
  }
};
