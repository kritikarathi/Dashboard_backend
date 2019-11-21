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

router.post('/addNewTherapy', async (req, res) => {
    try {
        const therapy = new Therapy({
            TherapyName: req.body.TherapyName,
            Status: req.body.Status,
            CreatedBy: req.body.CreatedBy
        })
    
        await therapy.save()
        res.status(200).json({
            status: 'success',
            therapy: therapy
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail to add',
            message: err
        })
    }
})

router.put('/updateTherapy/:id', async (req, res) => {
    try {
        const therapy = await Therapy.findByIdAndUpdate(req.params.id, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: "successfully updated",
            data: therapy
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail to update',
            message: err
        })
    }
})

module.exports = router
