const mongoose = require('mongoose');
//We have our sample of how our data showed me shown
const ValetDemo = require('../models/valet');

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


//Once we wanna generate information regarding car pickup in our database
const seedDB = async() => {
    await ValetDemo.deleteMany({});
    const carService = new ValetDemo({
        title: 'Subaru',
        make: 'STI',
        year: 2020,
        color: 'blue',
        liscense: 'AAbC78120',
        dealership: 'Scarborough',
        location: '22 Messina Avenue, L51 XM8',
        price: 25,
        description: 'Assigned to Nav'
    })
    await carService.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});