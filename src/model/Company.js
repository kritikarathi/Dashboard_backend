const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    CompanyName: {
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

const Comapny = mongoose.model('Company',CompanySchema)

module.exports = Comapny