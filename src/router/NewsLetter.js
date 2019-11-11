const express = require('express')
const auth = require('../middleware/auth')
const News = require('../model/NewsLetter')
const router = express.Router()

//save  New NewsLetter
router.post('/addNewLetter', async (req,res)=>{
    const news = new News(req.body)
    try{
        await news.save()
        res.status(201).send(news)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/fetchALlNews',async (req,res)=>{
    News.find({}).populate({path:'CreatedBy',model:"User"}).then((news)=>{
        res.send(news)
    }).catch((e)=>{
          res.status(500).send()
    })
})


module.exports = router