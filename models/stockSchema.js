const mongoose = require('mongoose')
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
module.exports = Stock
