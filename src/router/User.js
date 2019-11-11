const express = require('express')
const auth = require('../middleware/auth')
const User = require('../model/User')

const router = express.Router()

//save the New User
router.post('/addNewUser', async (req,res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

//fetch all users
router.get('/fetchAllUsers',async (req,res)=>{
    User.find({}).populate({path:'parentId',model:"User"}).then((users)=>{
        var usersPublicProfile=[];
        users.forEach((user)=>{
            const userObject = user.toObject()
             delete userObject.Password
             delete userObject.tokens
             if(userObject.parentId[0]){
                delete userObject.parentId[0]['Password']
             }
             
             usersPublicProfile.push(userObject)
        })
        res.send(usersPublicProfile)
    }).catch((e)=>{
          res.status(500).send()
    })
})

//login api... fetch only one user with valid username and password
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.UserName, req.body.Password) 
        const token = await user.generateAuthToken()
        console.log('routers......',user.getPublicProfile())
        const userPublic = await user.getPublicProfile()
        res.send({user:userPublic ,token})
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router