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


router.get('/fetchALlNews/:id',async (req,res)=>{
    console.log("")
    News.find({'Status':'Enabled', 'therapy':req.params.id},null, {sort: '-updatedAt'}).populate({path:'CreatedBy',model:"User"}).then((news)=>{
        res.send(news)
    }).catch((e)=>{
          res.status(500).send()
    })
})

//Update the news
router.put('/updateNews/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    // const allowedUpdates=['news','status']
    // const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    // if(!isValidOperation){
    //     return res.status(400).send({error:"Invalid updates!"})
    // }
    try{
        const news = await News.findById(req.params.id)
        if(req.body.user != news.CreatedBy){
            console.log("============>",req.body.user,news.CreatedBy)
            return res.status(400).send({error:"You are not authorized to edit this news!"})        
       }
        updates.forEach((update)=>news[update] = req.body[update])

        await news.save()
       // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!news){
            return res.status(404).send()
    }

    res.send(news)

    }catch(e){
          res.status(400).send(e)
    }
})

//Delete the news
router.post('/deleteNews/:id',async(req,res)=>{
    const userId= Object.keys(req.body);

    const news = await News.findById(req.params.id)


    if(req.body.user != news.CreatedBy){
        console.log('======================', req.body.user , news.CreatedBy)
         return res.status(400).send({error:"You are not authorized to delete this news!"})        
    }
    try{
         if(news.LetterStatus=='publish'){
            news.LetterStatus='save'
         }else {
            news.Status = 'Disabled'
         }

        await news.save()
    if(!news){
            return res.status(404).send()
    }

    res.send(news)

    }catch(e){
          res.status(400).send(e)
    }
})


module.exports = router