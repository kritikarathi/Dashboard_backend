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

//fetch Company by Product

router.post("/fetchCompanyByProduct", async(req,res)=>{
    Indication.find({"Therapy_id":req.body.Therapy_id}).then((indication)=>{
        console.log(indication)
        indication.forEach((indi)=>{
            console.log(indi._id)
            Product.find({"Indication_id":{$elemMatch:{"$in": indi._id, "$exists":true}}}).then((product)=>{
                   product.forEach((prod)=>{
                       Company.find({_id:{'$in':prod.Company_id}}).then((company)=>{
                           res.send(company)
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
