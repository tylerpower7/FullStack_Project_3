// QAP3 FULLSTACK
// Author: Tyler Power
// Due Date: 03/04/23

const express = require("express");

const methodOverride = require("method-override");

const app = express();

const PORT = 3000;

const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method_override"));

global.DEBUG = true;

//------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (request, response) => {
  response.render("about.ejs");
});

//------------------------------------------------------------

const booksRouter = require("./routes/books");

app.use("/books", booksRouter);

//-------------------------------------------------------------

const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

//--------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
