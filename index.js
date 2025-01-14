const express = require("express");
const app = express();
const port = 3000;

require('dotenv').config();

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Middleware setup
app.set('views', __dirname + '/views'); // Set the correct path for views directory
app.set('view engine', 'ejs');
app.use(express.static('public')); // For CSS or JS files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import models and utilities
const Stock = require('./models/stockSchema');
const {
  addNewStockItem,
  getAllStockItems,
  deleteStockItem,
  getStockItem,
  addToLot,
  removeFromLot,
  deleteLot
} = require('./utils/stockUtils');

// Async function to connect to MongoDB and start the server
const startServer = async () => {
    await mongoose.connect("mongodb://localhost:27017/jbcDB", {
      authSource: "admin",
      user: process.env.user,
      pass: process.env.pwd,
    })
    console.log("Connected to MongoDB")

    // Start the Express server
    app.listen(port)
}

// Call the async function to start the server
startServer()
