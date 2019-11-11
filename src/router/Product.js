const express = require('express')
const auth = require('../middleware/auth')
const Product = require('../model/Product')
const Indication = require('../model/Indication')
const router = express.Router()

//save  New Product
router.post('/addNewProduct', async (req,res)=>{
    const product = new Product(req.body)
    try{
        await product.save()
        res.status(201).send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/fetchALlProducts',async (req,res)=>{
    Product.find({}).then((product)=>{
        res.send(product)
    }).catch((e)=>{
          res.status(500).send()
    })
})

//fetch Product by Therapy

// router.post("/fetchProductByIndication", async(req,res)=>{
//     Indication.find({"Therapy_id":req.body.Therapy_id}).then((indication)=>{
//         console.log(indication)
//         indication.forEach((indi)=>{
//             console.log(indi._id)
//             Product.find({"Indication_id":{$elemMatch:{"$in": indi._id, "$exists":true}}}).then((product)=>{
//                console.log(product)
//                 res.send(product)
//              }).catch((e)=>{
//                  res.status(500).send()
//              })
//         })
//     }).catch((e)=>{
//           res.status(500).send()
//     })
  
// })

router.post("/fetchProductByIndication", async (req,res)=>{
   const indication = await Indication.find({"Therapy_id":req.body.Therapy_id});
     id=[];
     indication.forEach((indi)=>{
        id.push(indi._id) 
     })
     Product.find({Indication_id:{$elemMatch:{"$in": id, "$exists":true}}}).then((product)=>{
        res.send(product)
     })
     })
     




module.exports = router