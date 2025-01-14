const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const rawMaterialSchema = new mongoose.Schema({
    stockname : String,
    lotname : String,
    qnty    : Number ,
    added : {type : Date, default:Date.now()}, 
})

const batchScehma = new mongoose.Schema({
    batchname : String,
    numdrums : Number,
    drums    : [Number],
    rawMaterials: {type:[rawMaterialSchema], default : []},
    comments : {type: String , default:" " },
    completed: {type: Boolean, default:false},
    sentdrums : [Number],
    sentFully : {type:Boolean, default: false},
    totalWeight:{type:Number, default : 0}
})

batchSchema.pre('save', function (next){
    this.totalWeight = this.rawMaterials.reduce((sum , material) => sum + material.qnty, 0)
    next()
})

const Batches = new mongoose.model('batches',batchScehma)
module.exports = Batches

