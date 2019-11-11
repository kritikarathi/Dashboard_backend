const express = require('express')
const auth = require('../middleware/auth')
const Indication = require('../model/Indication')

const router = express.Router()

//save  New Indication
router.post('/addNewIndication', async (req,res)=>{
    const indication = new Indication(req.body)
    try{
        await indication.save()
        res.status(201).send(indication)
    }catch(e){
        res.status(400).send(e)
    }
})

//fetch all Indication
router.get('/fetchALlIndications',async (req,res)=>{
    Indication.find({}).then((indication)=>{
        res.send(indication)
    }).catch((e)=>{
          res.status(500).send()
    })
})

//fetch indication by Therapy

router.post("/fetchIndicationByTherapy", async(req,res)=>{
    Indication.find({"Therapy_id":req.body.Therapy_id}).then((indication)=>{
        res.send(indication)
    }).catch((e)=>{
          res.status(500).send()
    })
  
})


module.exports = router