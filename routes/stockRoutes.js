express = require('express')
router = express.Router()
const Stock = require('../models/stockSchema')
const {
  addNewStockItem,
  getAllStockItems,
  deleteStockItem,
  getStockItem,
  addToLot,
  removeFromLot,
  deleteLot,
} = require("../utils/stockUtils")

router.post('/addNewStockItem', async (req,res) => {
    res.render('index')
})

router.get('/getAllStockItems', async (req,res) => {
    res.send(await getAllStockItems(Stock))
})

router.post('/deleteStockItem', async (req,res) => {
    res.render('index')
})

router.get('/getStockItem', async (req,res) => {
    res.send(await getStockItem(Stock,req.query.stockname))
})

router.post('/addToLot', async (req,res) => {
    res.render('index')
})

router.post('/removeFromLot', async (req,res) => {
    res.render('index')
})

router.post('/deleteLot', async (req,res) => {
    res.render('index')
})
module.exports = router