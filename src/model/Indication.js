const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IndicationSchema = new Schema({
    IndicationName: {
         type:String,
         required: true,
         trim:true,
         unique: true
    },
    Therapy_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Therapy'
    },
    Status:{
        type:String,
        required:true,
        default:"Enabled"
    },
    CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Indication = mongoose.model('Indication',IndicationSchema)

module.exports = Indication