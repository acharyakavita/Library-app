const mongoose=require('mongoose');
//schema setup
const bookSchema= new mongoose.Schema({
    title      : String,
    description: String,
    genre      : String,
    year       : Number,
    author     : String,    
    available  : {
        type   : Boolean,
        default: true
    },
    rating     : {
        type   : Number,
        default: 0
    }
})

bookSchema.index({ title: 1, author: 1}, { unique: true });

module.exports=mongoose.model('Book',bookSchema);