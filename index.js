const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
const port = 3000
dotenv.config()



// Middleware setup
app.set("views", __dirname + "/views") // Set the correct path for views directory
app.set("view engine", "ejs")
app.use(express.static("public")) // For CSS or JS files
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


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

// Import the routes
const stockRoutes = require('./routes/stockRoutes')
const batchRoutes = require('./routes/batchRoutes')

// add them to app
app.use('/stocks',stockRoutes)
app.use('/batches',batchRoutes)

app.get('/batches',async (req,res)=>{
    res.render('batches')
})

app.get('/stock',async (req,res)=>{
    res.render('stock')
})