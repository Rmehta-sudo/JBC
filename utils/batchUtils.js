const moment = require('moment')

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
async function addMaterials(batches,id,stocks,lots,quantities,date){
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
module.exports = {
    newBatch,
    addMaterials,
    addRemarks,
    unsentBatches,
    drums,
    drumsCompleted,
    drumsDispatched,
    batchesInMonth,
    viewBatch
}