const express = require("express");
const app = express();
const port = 3000;

const aufgabenRouter = require("./routes/aufgaben");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use("/", aufgabenRouter);

app.listen(port, () => {
  console.log(`App läuft auf http://localhost:${port}`);
});
