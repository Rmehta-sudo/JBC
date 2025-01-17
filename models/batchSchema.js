const mongoose = require('mongoose')
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
module.exports = Batches

