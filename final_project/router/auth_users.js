const express = require('express');
const jwt = require('jsonwebtoken');
let { books } = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const authUsers = users.filter(user=>user.username === username && user.password === password);
  return authUsers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password){
    return res.status(400).json({message: "Username and Password is required."})
  } 
  if (authenticatedUser(username, password)){
    const accessToken = jwt.sign({
      username
    }, "secret", { expiresIn: 60 * 60 })
    req.session.authorization = {
      accessToken
    }
    return res.status(200).json({message: "Successfully login."})
  }
  return res.status(400).json({message: "Wrong username or password."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const book = books[req.params.isbn];
  if (!book){
    return res.status(404).json({message: "Book not found"})
  }
  if (!req.query.review || !req.query.stars){
    return res.status(400).json({message: "Message and stars are required"})
  }
  const review = {
    review: req.query.review,
    stars: req.query.stars,
    username: req.user
  }
  book.reviews[req.user] = review
  return res.status(200).json({message: "Successfully add a review."});
});

regd_users.delete("/auth/review/:isbn", (req, res)=>{
  const book = books[req.params.isbn];
  if (!book){
    return res.status(404).json({message: "Book not found"})
  }
  delete book.reviews[req.user];
  return res.status(200).json({message: "Successfully deleted the review."})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
