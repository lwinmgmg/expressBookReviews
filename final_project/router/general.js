const express = require('express');
let {books, bookList } = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const allBooks = bookList();
  return res.status(200).json({
    count: allBooks.length,
    data: allBooks,
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const allBooks = bookList();
  const filterdBooks = allBooks.filter(book=>book.author===req.params.author)
  if (filterdBooks.length === 0){
    return res.status(404).json({message: "No book found"})
  }
  return res.status(200).json({count: filterdBooks.length, data: filterdBooks});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const allBooks = bookList();
  const filterdBooks = allBooks.filter(book=>book.title===req.params.title)
  if (filterdBooks.length === 0){
    return res.status(404).json({message: "No book found"})
  }
  return res.status(200).json({count: filterdBooks.length, data: filterdBooks});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
