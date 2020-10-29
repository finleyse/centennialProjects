// modules required for routing
const { Console } = require('console');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');



/* GET books List page - index. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  
  books.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books Baby',
        books: books
      });

    }
  });

});

//  GET - display the add page in order to add a new Book
router.get('/details', (req, res, next) => {

  console.log("Get display add");

  res.render('books/details',{
    title: 'Add Book', 
    books: books
  });

});

// POST - process the add and create a new Book - CREATE
router.post('/details', (req, res, next) => {

  let newBook = books({
    "Title": req.body.title,
    "Author": req.body.author,
    "Genre": req.body.genre,
    "Price": req.body.price
});
console.log(newBook.Title);
books.create(newBook,(err,BookToAdd) =>{
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else{
    res.redirect('/books');
  }
});

});

// GET - display the edit to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    let id = req.params.id;

    books.findById(id,(err,BookToEdit) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render('books/details',{
          title: 'Edit Book Details', 
          books: BookToEdit
        });
      }
    });
    
});

// POST - process the edit information passed from the details form and update the db
router.post('/details/:id', (req, res, next) => {

    let id = req.params.id;

    let updatedBook = books({
      "_id": id,
      "Title": req.body.title,
      "Author": req.body.author,
      "Genre": req.body.genre,
      "Price": req.body.price
    });

    books.updateOne({_id: id}, updatedBook,(err) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;
    
    books.deleteOne({_id: id},(err) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect('/books');
      }
    });
});


module.exports = router;
