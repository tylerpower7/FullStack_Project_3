const express = require("express");

const router = express.Router();

const booksDal = require("../services/pg.books.dal");

router.get("/", async (req, res) => {
  try {
    let theBooks = await booksDal.getBooks();
    if (DEBUG) console.table(theBooks);

    res.render("books", { theBooks });
  } catch {
    res.render("503");
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("books.POST");

  try {
    await booksDal.addBook(
      req.body.title,

      req.body.author_id,

      req.body.publisher,

      req.body.isbn
    );

    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");

    res.render("503");
  }
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("book.Delete : " + req.params.id);

  res.render("bookDelete.ejs", {
    title: req.query.title,

    author_id: req.query.author_id,

    publisher: req.query.publisher,

    isbn: req.query.isbn,

    theId: req.params.id,
  });
});

router.get("/:id", async (req, res) => {
  try {
    let aBook = await booksDal.getBookById(req.params.id); // from postgresql

    if (aBook.length === 0) res.render("503");
    else res.render("book", { aBook });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");

    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("book.Replace : " + req.params.id);

  res.render("bookPut.ejs", {
    title: req.query.title,

    author_id: req.query.author_id,

    publisher: req.query.publisher,

    isbn: req.query.isbn,

    theId: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("book.Edit : " + req.params.id);

  res.render("bookPatch.ejs", {
    title: req.query.title,

    author_id: req.query.author_id,

    publisher: req.query.publisher,

    isbn: req.query.isbn,

    theId: req.params.id,
  });
});

//----------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("books.DELETE: " + req.params.id);

  try {
    await booksDal.deleteBook(req.params.id);

    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");

    res.render("503");
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("books.PUT: " + req.params.id);

  try {
    await booksDal.putBook(
      req.params.id,

      req.body.title,

      req.body.author_id,

      req.body.publisher,

      req.body.isbn
    );

    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");

    res.render("503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("books.PATCH: " + req.params.id);

  try {
    await booksDal.patchBook(
      req.params.id,

      req.body.title,

      req.body.author_id,

      req.body.publisher,

      req.body.isbn
    );

    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");

    res.render("503");
  }
});

module.exports = router;
