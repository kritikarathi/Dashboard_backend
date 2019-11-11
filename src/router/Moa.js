const express = require('express')
const MOA = require('../model/Moa')
const Indication = require('../model/Indication')
const Product = require('../model/Product')
const router = express.Router()

//save  New Moa
router.post('/addNewMOA', async (req,res)=>{
    const moa = new MOA(req.body)
    try{
        await moa.save()
        res.status(201).send(moa)
    }catch(e){
        res.status(400).send(e)
    }
})

//fetch all Moas
router.get('/fetchALlMoa',async (req,res)=>{
    MOA.find({}).then((moa)=>{
        res.send(moa)
    }).catch((e)=>{
          res.status(500).send()
    })
})

//fetch MOA by Product

router.post("/fetchMOAByProduct", async(req,res)=>{
    Indication.find({"Therapy_id":req.body.Therapy_id}).then((indication)=>{
        console.log(indication)
        indication.forEach((indi)=>{
            console.log(indi._id)
            Product.find({"Indication_id":{$elemMatch:{"$in": indi._id, "$exists":true}}}).then((product)=>{
                   product.forEach((prod)=>{
                       MOA.find({_id:{'$in':prod.Moa_id}}).then((moa)=>{
                           res.send(moa)
                       }).catch((e)=>{
                           res.status(500).send()
                       })
                   })
             }).catch((e)=>{
                 res.status(500).send()
             })
        })
    }).catch((e)=>{
          res.status(500).send()
    })
})

module.exports = router
