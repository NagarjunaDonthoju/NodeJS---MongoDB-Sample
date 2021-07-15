const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Connecting to mongoDB 

async function connectToDB(){

    const url = "mongodb://127.0.0.1:27017/";
    try{
        await mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true});
        console.log("Succesfully connected to database");
    }
    catch(e){
        console.log(e);
        process.exit();
    }

}

connectToDB();

const Movie = require('./app/models/movie.model.js');

app.get('/', (req, res)=>{
    res.json({
        "message" : "Welcome to Movies"
    })
})

app.post('/addMovie', addMovie);

app.get('/getAllMovies', getAllMovies)

const PORT = process.env.PORT | 3000;
app.listen(PORT, ()=>{
    console.log("Server is listening on port: " + PORT)
})





function addMovie(req, res){

    console.log(req.body?.director);

    if(!req.body.name){
        return res.status(400).send({
            message: `Movie name cannot be empty`
        })
    }

    const movieDetails = new Movie({
        name : req.body.name,
        director : req.body.director ? req.body.director : "",
        releaseYear : req.body.releaseYear ? req.body.releaseYear : -1
    })

    movieDetails.save().then(data =>{
        res.status(200).send(data);
    }).catch(err =>{
        res.status(500).send({
            message : err.messsage
        })
    })
}

function getAllMovies(req, res){

    Movie.find().then(movies =>{
        res.send(movies)
    }).catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}
