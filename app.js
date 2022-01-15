//Getting everything that is required for this demo
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const req = require('express/lib/request');
const res = require('express/lib/response');
const valetDemo = require('./models/valet');
//Setting up our app
const app = express();


//Temporarily Make Categories
let categories = ['Toronto Ford', 'Toronto Honda', 'Scarborough Subaru', 'Markham Honda'];
categories = categories.sort();

//Connecting to our database with Mongoose
mongoose.connect('mongodb://localhost:27017/valetDemo', {
    useNewUrlParser:true,
    useUnifiedTopology:  true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

//Everything app is going to require/use
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Our pathways using REST methods
app.get('/', (req, res) => {
    res.render('home', {categories});
});

app.get('/valet', async(req, res) => {
    const valets = await valetDemo.find({});
    res.render('valet/index', {valets});
})

//Let's create a new request from a dealership
app.get('/valet/new', (req, res) => {
    res.render('valet/new');
});
//Let's send information to the page
app.post('/valet', async(req, res) => {
    const valet = await valetDemo(req.body.valet);
    await valet.save();
    res.redirect(`/valet/services/${valet._id}`);
})
//Shows ID
app.get('/valet/services/:id', async(req, res) => {
    const valet = await valetDemo.findById(req.params.id);
    res.render('valet/show', {valet});
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})


