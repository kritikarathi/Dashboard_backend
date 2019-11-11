const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsLetterSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    body:{
        type:String,
        required:true
    },
    therapy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Therapy'
    },
    indication:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Indication'
    },
    moa:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'MOA'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    },
    originatedCompany:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Company'
    },
    licenceeCompany:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    source:{
        type:String,
        required:true

    },
    Status:{
        type:String,
        required:true,
        default:'Enabled'
    },
    CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    LetterStatus:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

const NewsLetter = mongoose.model('NewsLetter',NewsLetterSchema)

module.exports = NewsLetter