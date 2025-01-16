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
    await addNewStockItem(Stock,req.body.stockname)
    res.render('stock')
})

router.get('/getAllStockItems', async (req,res) => {
    res.send(await getAllStockItems(Stock))
})

router.post('/deleteStockItem', async (req,res) => {
    await deleteStockItem(Stock,req.body.stockname)
    res.render('stock')
})

router.get('/getStockItem', async (req,res) => {
    res.send(await getStockItem(Stock,req.query.stockname))
})

router.post('/addToLot', async (req,res) => {
    await addToLot(Stock,req.body.stockname,req.body.lotname,req.body.qnty)
    res.render('stock')
})

router.post('/removeFromLot', async (req,res) => {
    await removeFromLot(Stock,req.body.stockname,req.body.lotname,req.body.qnty)
    res.render('stock')
})

router.post('/deleteLot', async (req,res) => {
    await deleteLot(Stock, req.body.stockname,req.body.lotname)
    res.render('stock')
})
module.exports = router