express = require('express')
router = express.Router()
const Batches = require('../models/batchSchema')
const Stock = require('../models/stockSchema')
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
} = require('../utils/batchUtils')



router.post('/newBatch', async (req,res) => {
    let data = req.body
    await newBatch(Batches,data.batchno,data.batchname,data.numdrums,data.drums,data.remarks,data.date)
    res.render('index')
})

router.post('/addMaterials', async (req,res) => {
    let data = req.body
    await addMaterials(Stock,Batches,data.id,data.stocks,data.lots,data.quantities,data.date)
    res.render('index')
})

router.post('/addRemarks', async (req,res) => {
    await addRemarks(Batches,req.body.id,req.body.remarks)
    res.render('index')
})

router.get('/unsentBatches', async (req,res) => {
    res.send(await unsentBatches(Batches))
})

router.post('/sendBatch', async (req,res) => {
    await sendBatch(Batches,req.body.id)
    res.render('index')
})

router.get('/drums', async (req,res) => {
    res.send(await drums(Batches,req.query.id))
})

router.post('/drumsCompleted', async (req,res) => {
    await drumsCompleted(Batches,req.body.drums)
    res.render('index')
})

router.post('/drumsDispatched', async (req,res) => {
    await drumsDispatched(Batches,req.body.drums)
    res.render('index')
})

router.get('/batchesInMonth', async (req,res) => {
    res.send(await batchesInMonth(Batches,req.query.month,req.query.year))
})

router.get('/viewBatch', async (req,res) => {
    res.send(await viewBatch(Batches,parseInt(req.query.id)))
})


module.exports = router