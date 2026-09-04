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

exports.getAlleAufgaben = (req, res) => {
  res.render("index", { tasks });
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
