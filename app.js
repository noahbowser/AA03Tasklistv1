const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

// Transiente Aufgabenliste (im Arbeitsspeicher)
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

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.listen(port, () => {
  console.log(`App läuft auf http://localhost:${port}`);
});
