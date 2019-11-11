const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MOASchema = new Schema({
    MOAName: {
         type:String,
         required: true,
         trim:true,
         unique: true
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

const MOA = mongoose.model('MOA',MOASchema)

module.exports = MOA