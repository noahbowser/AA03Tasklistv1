let tasks = [
  {
    id: 1,
    title: "Einkaufen gehen",
    description: "Milch, Brot und Eier kaufen",
    dueDate: "2026-09-05",
    done: false,
  },
  {
    id: 2,
    title: "Hausaufgaben erledigen",
    description: "Tasklist-Projekt fertigstellen",
    dueDate: "2026-09-10",
    done: false,
  },
];

let nextId = 3;

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

exports.erstelleAufgabe = (req, res) => {
  const { title, description, dueDate } = req.body;

  tasks.push({
    id: nextId++,
    title,
    description,
    dueDate,
    done: false,
  });

  res.redirect("/");
};

exports.markiereErledigt = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.done = true;
  }

  res.redirect("/");
};

exports.loescheAufgabe = (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);

  res.redirect("/");
};
