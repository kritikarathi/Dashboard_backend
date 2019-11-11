const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TherapySchema = new Schema({
    TherapyName: {
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

const Therapy = mongoose.model('Therapy',TherapySchema)

module.exports = Therapy