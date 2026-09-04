const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true })); // Formulardaten parsen

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

let nextId = 3; // für die Vergabe neuer IDs

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.get("/aufgaben/neu", (req, res) => {
  res.render("neu");
});

app.post("/aufgaben/neu", (req, res) => {
  const { title, description, dueDate } = req.body;

  tasks.push({
    id: nextId++,
    title,
    description,
    dueDate,
    done: false,
  });

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App läuft auf http://localhost:${port}`);
});
