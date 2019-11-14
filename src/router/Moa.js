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

router.post("/fetchMOAByProduct", async (req,res)=>{
    const indication = await Indication.find({"Therapy_id":req.body.Therapy_id});
      id=[];
      indication.forEach((indi)=>{
         id.push(indi._id) 
      })
     const product = await Product.find({Indication_id:{$elemMatch:{"$in": id, "$exists":true}}});
     id=[];
     product.forEach((prod)=>{
          for(let i=0;i<prod.Moa_id.length;i++){
              id.push(prod.Moa_id[i])
          }
     })
     MOA.find({_id:{'$in':id}}).then((moa)=>{
         res.send(moa)
      })
      })

module.exports = router
