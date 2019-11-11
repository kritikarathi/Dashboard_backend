const mongoose = require('mongoose')
//mongodb://localhost:27017/dashboard-api
//mongodb+srv://admin_123:<password>@cluster0-v3b01.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://admin_123:admin@123@cluster0-v3b01.mongodb.net/DashboardDb?retryWrites=true&w=majority  ",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})