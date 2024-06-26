const express = require('express');
let {books, bookList, getBookByID } = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password){
      return res.status(400).json({message: "Username or Password can't be empty."})
  }
  const existUsers = users.filter(user=>user.username === username);
  if (existUsers.length > 0){
    return res.status(400).json({message: "User already exist."})
  }
  users.push({
    username,
    password
  })
  return res.status(200).json({message: "Added user successfully"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  const allBooks = await bookList();
  return res.status(200).json({
    count: allBooks.length,
    data: allBooks,
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const book = await getBookByID(req.params.isbn);
  if (!book){
    return res.status(404).json({message: "No book found"});
  }
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const allBooks = await bookList();
  const filterdBooks = allBooks.filter(book=>book.author===req.params.author)
  if (filterdBooks.length === 0){
    return res.status(404).json({message: "No book found"})
  }
  return res.status(200).json({count: filterdBooks.length, data: filterdBooks});
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const allBooks = await bookList();
  const filterdBooks = allBooks.filter(book=>book.title===req.params.title)
  if (filterdBooks.length === 0){
    return res.status(404).json({message: "No book found"})
  }
  return res.status(200).json({count: filterdBooks.length, data: filterdBooks});
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  //Write your code here
  const book = await getBookByID(req.params.isbn);
  if (!book){
    return res.status(404).json({
        message: "No book found"
    })
  }
  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
