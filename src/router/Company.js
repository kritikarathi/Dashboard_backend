const express = require('express')
const Company = require('../model/Company')
const Indication = require('../model/Indication')
const Product = require('../model/Product')

const router = express.Router()

//save  New Company
router.post('/addNewCompany', async (req,res)=>{
    const company = new Company(req.body)
    try{
        await company.save()
        res.status(201).send(company)
    }catch(e){
        res.status(400).send(e)
    }
})

//fetch all Companies
router.get('/fetchALlCompanies',async (req,res)=>{
    Company.find({}).then((moa)=>{
        res.send(moa)
    }).catch((e)=>{
          res.status(500).send()
    })
})



router.post("/fetchCompanyByProduct", async (req,res)=>{
    const indication = await Indication.find({"Therapy_id":req.body.Therapy_id});
      id=[];
      indication.forEach((indi)=>{
         id.push(indi._id) 
      })
     const product = await Product.find({Indication_id:{$elemMatch:{"$in": id, "$exists":true}}});
     id=[];
     product.forEach((prod)=>{
          for(let i=0;i<prod.Company_id.length;i++){
              id.push(prod.Company_id[i])
          }
     })
     Company.find({_id:{'$in':id}}).then((company)=>{
         res.send(company)
      })
      })

module.exports = router
