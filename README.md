# Library-app
Library app is a sample node.js project having REST end points to fetch,create,search,delete,borrow and return books. The data returned is in JSON format.

# steps to execute the project
  1. Clone or download this project.
  2. Install node.js in your machine.
  3. execute command npm install from the project folder.
  4. open http://localhost:3000/ to see the welcome page.
  5. Below are the REST Api end points that can be used for various functionalities.
     Please use Postman or Curl for better experience.

     a) Wecome page = Get request =  http://localhost:3000/ ;

     b) Fetch all books = Get request = http://localhost:3000/books ;

     c) Search Book = Get request = http://localhost:3000/books?author=Harper Lee&genre=novel&author=Harper Lee
       Search can be performed by passing author,genre and title in query paramaters

     d) Get book by id = Get request= http://localhost:3000/5f1a5485e67ad93d04604867

     e) Add new book to library = post request =  http://localhost:3000/books/add
        pass json object in the request body having book related content. Sample body is given below.
          body = {
             "title":"To kill a mocking bird",
             "description":"lorem ipsum",
             "available": true,
             "rating": 5,
              "author":"Harper Lee",
              "genre":"novel",
              "year": 1960
        }
        Title and author are mandatory input fields.

     f) Borrow a book = Put request = http://localhost:3000/5f1a5485e67ad93d04604867/borrow

     g) Return a book = Put request = http://localhost:3000/5f1a5485e67ad93d04604867/return

     i) Delete a book = Delete request = http://localhost:3000/5f1a5485e67ad93d04604867



