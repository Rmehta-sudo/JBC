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
    sendBatch,
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




// testing
async function testing(){
    // await addNewStockItem(Stock, "blue") 
    // await addNewStockItem(Stock, "yellow") 
    // await addNewStockItem(Stock, "red") 

    // await addToLot(Stock,"yellow",101,1000) 
    // await addToLot(Stock,"yellow",101,500) 
    // await addToLot(Stock,"yellow",201,1000) 
    // await addToLot(Stock,"yellow",301,1000) 

    // await removeFromLot(Stock,"yellow",201,300) 

    // await addToLot(Stock,"blue",101,300)
    // await addToLot(Stock,"red",1,50)
    // await removeFromLot(Stock,"red",1,20)
    // await addToLot(Stock,"red",1,50)
    // await newBatch(Batches,1,'batch1',3,[20,21,24],'this is the first batch made on jbc inventory system','10-01-2025')
    // await newBatch(Batches,2,'batch1',3,[20,21,24],'this is the first batch made on jbc inventory system','10-01-2025')
    // await addMaterials(Stock,Batches,2,["red","yellow"],[1,301],[30,200],"12-01-2025")
    // await addMaterials(Stock,Batches,2,["blue","yellow"],[101,201],[50,100],"13-01-2025")
    // await addMaterials(Stock,Batches,2,["blue","yellow"],[101,301],[50,100],"14-01-2025")
    // console.log(await viewBatch(Batches,1))
    // console.log(await viewBatch(Batches,2))

    // await addRemarks(Batches,1,"this is the first remark added to 1")
    // await addRemarks(Batches,1,"this is the second remark added   to 1")
    // await addRemarks(Batches,2,"this is the first remark added   to 2")
    // console.log(await viewBatch(Batches,1))
    // console.log(await viewBatch(Batches,2))

    // console.log(await unsentBatches(Batches))
    // sendBatch(Batches,1)
    // console.log(await unsentBatches(Batches))
    // sendBatch(Batches,2)
    // console.log(await unsentBatches(Batches))
    // console.log(await viewBatch(Batches,1))
    // console.log(await drums(Batches,1))
    
    // await drumsCompleted(Batches,1,[20,21])
    // await drumsDispatched(Batches,1,[22,24])
    // console.log(await viewBatch(Batches,1))
    // console.log(await viewBatch(Batches,2))

    //console.log(await batchesInMonth(Batches,1,2025))

}

testing()