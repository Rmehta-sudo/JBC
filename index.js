const express = require("express")
const app = express()
const port = 3000

require("dotenv").config()

const mongoose = require("mongoose")

// Middleware setup
app.set("views", __dirname + "/views") // Set the correct path for views directory
app.set("view engine", "ejs")
app.use(express.static("public")) // For CSS or JS files
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Import models and utilities
const Stock = require("./models/stockSchema")
const Batches = require("./models/batchSchema")
const {
  addNewStockItem,
  getAllStockItems,
  deleteStockItem,
  getStockItem,
  addToLot,
  removeFromLot,
  deleteLot,
} = require("./utils/stockUtils")
const {
    newBatch,
    addMaterials,
    addRemarks,
    unsentBatches,
    drums,
    drumsCompleted,
    drumsDispatched,
    batchesInMonth,
    viewBatch
} = require('./utils/batchUtils')

// MongoDB connection and server start
// to start use ::: sudo systemctl start mongod
mongoose.connect("mongodb://localhost:27017/jbcDB", {
    authSource: "admin",
    user: process.env.user,
    pass: process.env.pwd,
}).then(() => {
    console.log("Connected to MongoDB")

    // Start the Express server after successful DB connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err)
})

