const express = require('express')
const auth = require('../middleware/auth')
const Therapy = require('../model/Therapy')

const router = express.Router()

//save the New User
router.post('/addNewTherapy', async (req,res)=>{
    const therapy = new Therapy(req.body)
    try{
        await therapy.save()
        res.status(201).send(therapy)
    }catch(e){
        res.status(400).send(e)
    }
})

//fetch all Therapies
router.get('/fetchALlTherapies',async (req,res)=>{
    Therapy.find({}).then((therapy)=>{
        res.send(therapy)
    }).catch((e)=>{
          res.status(500).send()
    })
})

module.exports = router