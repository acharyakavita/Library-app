require('dotenv').config();
const express       = require('express');
const app           = express();
const bodyparser    = require('body-parser');
const mongoose      = require('mongoose');
const libraryRoutes = require('./routes/library');


//create Database connection
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-3q9dg.mongodb.net/library?retryWrites=true&w=majority`;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
        .then(() => console.log( 'Database Connected' ))
        .catch(err => console.log( err ));

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())


//api routes
app.get('/', libraryRoutes.index);
app.get('/books', libraryRoutes.fetchAllBooks);
app.get('/books/search', libraryRoutes.searchBook);
app.get('/books/:id', libraryRoutes.getBook);
app.post('/books/add', libraryRoutes.createBook);
app.put('/books/:id/borrow', libraryRoutes.borrowBook);
app.put('/books/:id/return', libraryRoutes.returnBook);
app.delete('/books/:id', libraryRoutes.deleteBook);


//var port = process.env.PORT || 8080;
//app.listen(port,process.env.IP,function(){
app.listen('3000',function(){
    console.log('server is running')
})