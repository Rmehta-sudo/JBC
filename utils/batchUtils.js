// Function to create new batch
async function newBatch(batches){

}

// Function to add materials to existing batch
async function addMaterials(batches,id,materials,quantities,date){

}


// Function to add remarks to existing batches
async function addRemarks(batches,id,remarks){

}


// Function to return all unsent batches
async function unsentBatches(batches){

}


// Function to return all drums in a batch
async function drums(batches,id){

}


// Function to mark drums in batches as completed
async function drumsCompleted(batches,id,drums){

}

// Function to mark drums in batches as dispatched
async function drumsDispatched(batches,id,drums){

}

// Function to view all batches in a partiuclar month
async function batchesInMonth(batches,month,year){

}

// Function to view a particular batch
async function viewBatch(batches,id){

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