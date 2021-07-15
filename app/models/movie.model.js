const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name : String,
    director : String,
    releaseYear : Number,
},{
    timestamps : true
})

module.exports = mongoose.model('Movie', MovieSchema);