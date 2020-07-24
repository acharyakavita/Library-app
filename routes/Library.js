const Book=require('../models/Book');

module.exports = {

    index : (req,res)=>{
        res.send("Welcome to Community Library")
    },

    fetchAllBooks : async(req,res)=>{
        let books = await Book.find({})
        res.status(200).json({books: books})
    },
     
    getBook : (req,res)=>{
        Book.findById(req.params.id)
            .then(book=>{
                if(book){
                    res.status(200).json({book:book})
                }
                else {
                    res.status(404).json({message:'Book not found'})
                }
            })
            .catch(err=>{
                res.status(500).json({message:'Internal server error', err: err})
            })
    },
    searchBook : (req,res)=>{
        let query = {}
        if(req.query && req.query.title){
            query.title = req.query.title
        }
        if(req.query && req.query.author){
            query.author = req.query.author
        }
        if(req.query && req.query.genre){
            query.genre = req.query.genre
        }
       
        if(Object.keys(query).length>0)
        {
            Book.find(query)
                .then(books=>{
                    if (books){
                        res.status(200).json({message:"Below are the books found",books:books})
                    } else {
                        res.status(404).json({message:"0 books found for the passed parameters"})
                    }
                    
                })
        } else {
            res.status(500).json({message:"Invalid parameter passed.Please search with author,title or genre"})
        }
    },
    createBook : (req,res)=>{
        if(req.body && req.body.author && req.body.title){
            Book.create(req.body)
                .then(book=>{
                    res.status(200).json({message:"New book has been added",book:book})
                })
                .catch(err=>{
                    res.status(500).json({message:'Internal server error', err: err})
                }) 
        } else {
            res.status(405).json({message:'please enter author and title of the book'})
        } 
    },
    deleteBook : (req,res)=>{
        Book.findById(req.params.id)
            .then(book=>{
                if(book){
                    return book.remove({_id:book._id})
                } else {
                    res.status(404).json({message:'Book not found'})
                }
            }) 
            .then(()=>{
                res.status(200).json({message:'Book deleted successfully'})
            })
            .catch(err=>{
                res.status(500).json({message:'Internal server error', err: err})
            });
    },
    borrowBook: (req,res)=>{
        Book.findById(req.params.id)
            .then(book=>{
                if(book){
                    if(book.available){
                        book.available= false;
                        return book.save()
                    } 
                    res.status(405).json({message:"Book unavailable for borrowing"}) 
                } else {
                    res.status(404).json({message:"Book not found"}) 
                }
            })
            .then(book=>{
                if(book){
                    res.status(200).json({message:`You have successfully borrowed  ${book.title}`})
                }
            })
            .catch(err=>{
                res.status(500).json({message:'Internal server error', err: err})
            })
    },
    returnBook: (req,res)=>{
        Book.findById(req.params.id)
            .then(book=>{
                if(book){
                    if(book.available== false){
                        book.available= true;
                        return book.save()
                    } 
                    else {
                        res.status(405).json({message:"Book that is not borrowed cannot be returned"}) 
                    }
                } else {
                    res.status(404).json({message:"Book not found"}) 
                }
            })
            .then(book=>{
                if(book){
                    res.status(200).json({message:`You have successfully returned  ${book.title}`})
                }
            })
            .catch(err=>{
                res.status(500).json({message:'Internal server error', err: err})
            })
    }

}