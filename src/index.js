const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./router/User')
const therapyRouter = require('./router/Therapy')
const indicationRouter = require('./router/Indication')
const moaRouter = require('./router/Moa')
const companyRouter = require('./router/Company')
const productRouter = require('./router/Product')
const newsRouter = require('./router/NewsLetter')
app.use(express.json())



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(userRouter)
app.use(therapyRouter)
app.use(indicationRouter)
app.use(moaRouter)
app.use(companyRouter)
app.use(productRouter)
app.use(newsRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})