const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

dotenv.config()



// Middleware setup
app.set("views", __dirname + "/views") // Set the correct path for views directory
app.set("view engine", "ejs")
app.use(express.static("public")) // For CSS or JS files
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// MongoDB connection and server start
// to start use ::: sudo systemctl start mongod
// "mongodb://localhost:27017/jbcDB"
mongoose.connect(MONGO_URI, {
    authSource: "admin",
    user: process.env.user,
    pass: process.env.pwd,
}).then(() => {
    console.log("Connected to MongoDB")

    // Start the Express server after successful DB connection
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err)
})

// Import the routes
const stockRoutes = require('./routes/stockRoutes')
const batchRoutes = require('./routes/batchRoutes')

// add them to app
app.use('/stocks',stockRoutes)
app.use('/batches',batchRoutes)

app.get('/',async(req,res)=>{
    res.render('index')
})

app.get('/getBatches',async (req,res)=>{
    res.render('batches')
})

app.get('/getStock',async (req,res)=>{
    res.render('stock')
})