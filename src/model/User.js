const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    parentId:[{
        type:String
    }],
    Name:{
        type:String,
        required: true,
        trim:true
    },
    UserName: {
        type:String,
        required: true,
        trim:true,
        unique:true
   },
   Password:{
       type:String,
       required:true,
       trim:true,
       minlength:7,
       validate(value){
           if(value.toLowerCase().includes('password')){
              throw new Error('it is not a valid password')
           }
       }
   },
   Email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    lowercase:true,
    validate(value){
       if(!validator.isEmail(value)){
           throw new Error('Email is invalid')
       }
    }
 },
   Status:{
       type:String,
       required:true,
       default:"Enabled",
   }
})


UserSchema.methods.getPublicProfile = async function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.Password
    if(userObject.parentId[0]){
        delete userObject.parentId[0]['Password']
        delete userObject.parentId[0]['Status']
        delete userObject.parentId[0]['parentId']
     }
    console.log(userObject)
    return userObject
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString()},'thisisnewtoken')
     return token
}


UserSchema.statics.findByCredentials = async (username,password)=>{
    const user = await User.findOne({UserName:username}).populate({path:"parentId",model:'User'})
    if(!user){
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password , user.Password)

    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return user
}




//hash plain text password before saving
UserSchema.pre('save',async function(next){
        const user = this
        if(user.isModified('Password')){
        user.Password = await bcrypt.hash(user.Password,8)
        console.log( user.Password)
         }
      next()
})

UserSchema.index({
 UserName:1
}, {
        unique: true, 
    });

    const User = mongoose.model('User',UserSchema)

    module.exports = User