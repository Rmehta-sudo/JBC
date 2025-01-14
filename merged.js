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
// const AutoIncrement = require('mongoose-sequence')(mongoose)

// Lot Schema
const lotSchema = new mongoose.Schema({
  lotname: String,
  qnty: { type: Number, default: 0 },
})

// Stock Schema
const stockSchema = new mongoose.Schema({
  name: String,
  lots: { type: [lotSchema], default: [] },
})

// Add auto-increment to customId
// stockSchema.plugin(AutoIncrement, { inc_field: 'customId' })

// Export the model
const Stock = mongoose.model('Stock', stockSchema)



const AutoIncrement = require('mongoose-sequence')(mongoose)
const moment = require('moment')

const rawMaterialSchema = new mongoose.Schema({
    stockname : String,
    lotname : String,
    qnty    : Number ,
    added : {type : Date, default:Date.now()}, 
})

const batchSchema = new mongoose.Schema({
    batchno : {type : Number, require : true } ,
    batchname : String,
    numdrums : Number,
    drums    : [Number],
    date     : Date,
    rawMaterials: {type:[rawMaterialSchema], default : []},
    remarks : {type: String , default:" " },
    drumsCompleted: {type: [Number],default : []},
    drumsDispatched : {type: [Number],default : []},
    sentFully : {type:Boolean, default: false},
    totalWeight:{type:Number, default : 0}
})

batchSchema.pre('save', function (next){
    this.totalWeight = this.rawMaterials.reduce((sum , material) => sum + material.qnty, 0)
    next()
})

const Batches = new mongoose.model('batches',batchSchema)



// Function to add a new stock item
async function addNewStockItem(stockmodel, stockname) {
    stockname = String(stockname)
    const newItem = new stockmodel({
        name: stockname,
        lots : []
    })
    // console.log(newItem)
    // Note: we do not use await here as schema is locally stored so it is instantaneous 
    //  but .save() interacts with db server
    try {
        await newItem.save()
        console.log('Stock item added successfully!')
    } catch (error) {
        console.error('Error adding stock item:', error)
    }
}

// Function to get all stock items
async function getAllStockItems(stockmodel){
    try{
        let allItems = await stockmodel.find()
        console.log("Returning all items ")
        return allItems
    }
    catch(err){
        console.log("Error getting all stock items: ",err)
    }
}

// delete stock item
async function deleteStockItem(stockmodel,stockname){
    try{
        let result = await stockmodel.deleteOne({name:stockname})
        if(result.deletedCount === 0){
            console.log("No such item found")
        }
        else{
            console.log("Item deleted successfully")
        }
    }
    catch(err){
        console.log("Error deleting stock item: ",err)
    }
}

async function getStockItem(stockmodel,stockname){
    stockname = String(stockname)
    try{
        const item = await stockmodel.findOne({name : stockname})
        console.log("Returning single item")
        return item
    }
    catch(err){
        console.log("Error getting stock item : ",err)
    }
}

// add to a particular lot , create if it doesnt exits
async function addToLot(stockmodel,stockname,lotname,qnty){
    lotname = String(lotname)
    try{
        let stock = await stockmodel.findOne({name:stockname})
        let lots = stock.lots

        if(!lots){
            // add new lot to lots
            stock.lots = [ {lotname:lotname , qnty:qnty} ]
            console.log("lots is empty , so adding one ")
        }
        else{
            lot = lots.find( lot => lot.lotname === lotname)
            if(!lot){
                stock.lots.push({lotname:lotname , qnty:qnty})
                console.log("Adding lot ")
            }
            else{
                lot.qnty += qnty
                console.log("Adding qnty to lot ")
            }
        }
        await stock.save()
    }
    catch(err){
        console.log("Error adding lot: ",err)
    }
}


// subtract from a particular lot
async function removeFromLot(stockmodel,stockname,lotname,qnty){
    lotname = String(lotname)
    try{
        let stock = await stockmodel.findOne({name:stockname})
        let lot = stock.lots.find(lot => lot.lotname === lotname)

        if(!lot){
            // add new lot to lots
            console.log("Lot doesn't exist ")
        }
        else{
            lot.qnty -= qnty
            console.log("Removed qnty from lot")
        }
        await stock.save()
    }
    catch(err){
        console.log("Error subtracting from lot: ",err)
    }
}

// add to a particular lot , create if it doesnt exits
async function deleteLot(stockmodel,stockname,lotname){
    lotname = String(lotname)
    try{
        let stock = await stockmodel.findOne({name:stockname})
        console.log(stock)
        if(!stock){
            console.log("stock doesn't exist")
        }
        else{
            console.log("hi")
            console.log(stock.lots)
            const index = stock.lots.findIndex(lot => lot.lotname === lotname)
        
            if(index === -1){
                console.log("No such lot")
            }
            else{
                stock.lots.splice(index,1)
                console.log(stock.lots)
                console.log("Removed lot")
            }
            await stock.save()
        }
    }catch(err){
        console.log("Error deleting lot: ",err)
    }
}


// Function to create new batch
async function newBatch(batches,batchno,batchname,numdrums,drums,remarks,date){
    batchname = String(batchname)
    batchno = String(batchno)
    let mongoDate = moment(date, "DD-MM-YYYY").toDate()

    const newBatch = new batches({
        batchno : batchno,
        batchname : batchname,
        numdrums : numdrums,
        drums : drums ,
        remarks : remarks,
        date : mongoDate,
    })

    try {
        await newBatch.save()
        console.log('Batch added successfully!')
    } catch (error) {
        console.error('Error adding Batch :', error)
    }
}

// Function to add materials to existing batch
async function addMaterials(stockdb,batches,id,stocks,lots,quantities,date){
    id = String(id)
    let mongoDate = moment(date, "DD-MM-YYYY").toDate()

    let batch = await batches.findOne( { batchno : id })

    for(let i = 0; i < materials.length; i++){
        batch.rawMaterials.push({
            stockname : stocks[i],
            lotname   : lots[i],
            qnty   : quantities[i],
            added : mongoDate,
        })
        await removeFromLot(stockdb , stocks[i],lots[i] , quantities[i])

    }
    await batch.save()
}


// Function to add remarks to existing batches
async function addRemarks(batches,id,remarks){
    id = String(id)

    let batch = await batches.findOne( { batchno : id })
    batch.remarks.concat(remarks)
    await batch.save()
}


// Function to return all unsent batches
async function unsentBatches(batches){
    return await batches.find({sentFully : false})
}


// Function to return all drums in a batch
async function drums(batches,id){
    return await batches.findOne({batchno : String(id)}).drums
}


// Function to mark drums in batches as completed
async function drumsCompleted(batches,id,drums){
    let batch = await batches.findOne({batchno : String(id) })
    batch.drumsCompleted.concat(drums)
    await batch.save()
}

// Function to mark drums in batches as dispatched
async function drumsDispatched(batches,id,drums){
    let batch = await batches.findOne({batchno : String(id) })
    batch.drumsDispatched.concat(drums)
    await batch.save()
}

// Function to view all batches in a partiuclar month
async function batchesInMonth(batches,month,year){
    let datestring = ""
    if(month < 10 ){
        datestring = String(year) + "-0" + String(month)  
    }else{
        datestring =   String(year) + "-" + String(month) 
    }
        const startDate = new Date(datestring + "-01");
        const endDate = new Date(datestring + "-31");

    return await batches.find({
        date: { $gte: startDate, $lte: endDate }
        })
        .then(docs => console.log(docs))
        .catch(err => console.error(err));

}

// Function to return a particular batch
async function viewBatch(batches,id){
    return await batches.findOne({batchno : String(id) })
}

// MongoDB connection and server start
// to start use ::: sudo systemctl start mongod
console.log("hi")
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

