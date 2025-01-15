express = require('express')
router = express.Router()
const Batches = require('../models/batchSchema')
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
    res.render('index')
})

router.post('/addMaterials', async (req,res) => {
    res.render('index')
})

router.post('/addRemarks', async (req,res) => {
    res.render('index')
})

router.post('/unsentBatches', async (req,res) => {
    res.render('index')
})

router.post('/sendBatch', async (req,res) => {
    res.render('index')
})

router.get('/drums', async (req,res) => {
    res.send(await drums(Batches,req.query.id))
})

router.post('/drumsCompleted', async (req,res) => {
    res.render('index')
})

router.post('/drumsDispatched', async (req,res) => {
    res.render('index')
})

router.get('/batchesInMonth', async (req,res) => {
    res.send(await batchesInMonth(Batches,req.query.month,req.query.year))
})

router.get('/viewBatch', async (req,res) => {
    res.send(await viewBatch(Batches,parseInt(req.query.id)))
})


module.exports = router