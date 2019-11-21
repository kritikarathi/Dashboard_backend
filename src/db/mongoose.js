const mongoose = require('mongoose')
// mongodb://localhost:27017/dashboard-api
// mongodb+srv://admin_123:<password>@cluster0-v3b01.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost:27017/dashboard-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
