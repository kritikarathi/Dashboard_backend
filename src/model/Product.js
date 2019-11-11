const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    ProductName: {
         type:String,
         required: true,
         trim:true,
         unique: true
    },
    Company_id:{
            type: [String],
            ref: 'Company',
            required:true  
    },
    Indication_id:{
         type: [String],
        required:true,
        ref:'Indication'
    },
    Moa_id:{
        type: [String],
        required:true,
        ref:'MOA'
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

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product