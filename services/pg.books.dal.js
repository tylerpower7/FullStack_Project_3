const dal = require("./qap3_pg_db");

var getBooks = function () {
  if (DEBUG) console.log("books.pg.dal.getBooks()");

  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, title, author_id, publisher, isbn FROM public."book"`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);

        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getBookById = function (id) {
  if (DEBUG) console.log("books.pg.dal.getBookById()");

  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, title, author_id, publisher, isbn FROM public."book" WHERE id = $1`;

    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);

        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var deleteBook = function (id) {
  if (DEBUG) console.log("books.pg.dal.deleteBook()");

  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM public."book" WHERE id = $1;`;

    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var patchBook = function (id, title, author_id, publisher, isbn) {
  if (DEBUG) console.log("books.pg.dal.patchBook()");

  return new Promise(function (resolve, reject) {
    const sql = `update public."book" set title=$2, author_id=$3, publisher=$4, isbn=$5 where id=$1;`;

    dal.query(
      sql,

      [id, title, author_id, publisher, isbn],

      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

var addBook = function (title, author_id, publisher, isbn) {
  if (DEBUG) console.log("books.pg.dal.addBook()");

  return new Promise(function (resolve, reject) {
    const sql = `insert into public."book"(title, author_id, publisher, isbn) values ($1,$2,$3,$4);`;

    dal.query(sql, [title, author_id, publisher, isbn], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);

        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var putBook = function (id, title, author_id, publisher, isbn) {
  if (DEBUG) console.log("books.pg.dal.putBook()");

  return new Promise(function (resolve, reject) {
    const sql = `UPDATE public."book" SET title=$2, author_id=$3, publisher=$4, isbn=$5 WHERE id=$1;`;

    dal.query(
      sql,

      [id, title, author_id, publisher, isbn],

      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  deleteBook,
  patchBook,
  putBook,
};
