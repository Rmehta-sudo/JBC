// services/stockService.js

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
    qnty = parseInt(qnty)
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
    qnty = parseInt(qnty)
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

// Export the functions to be used in other files
module.exports = {
    addNewStockItem,
    getAllStockItems,
    deleteStockItem,
    getStockItem,
    addToLot,
    removeFromLot,
    deleteLot
}
