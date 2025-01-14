express = require("express")
app = express()
port = 3000
 
// use netstat -an | grep 3000 to check whether its free or not

app.set('views', __dirname +  '/views') // Set the correct path for views directory
app.set('view engine','ejs')
app.use(express.static('public')) // for css or js files

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('dotenv').config()

// setup the db
const mongoose = require('mongoose');

// MongoDB connection
// mongodb://myUserAdmin:abc123@localhost:27017/admin
mongoose.connect("mongodb://localhost:27017/jbcDB", {
    authSource: "admin",
    user: process.env.user,
    pass: process.env.pwd,
});
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB")
}) // to check for the initial connection




app.listen(port,()=>{
    console.log("Connected to localhost:3000")  
})