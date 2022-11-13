const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

            name:{
                type:String,
                required:true,
                trim:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },

            password:{
                type:String,
                required:true,
                trim:true
            },
            role:{
                type:Number,
                default:0,
            
            },
            userRole:{
                type:String,
              
                default:"admin",
                trim:true
            
            },

        
  },{        
    timestamps:true
        
})


module.exports = mongoose.model('Users',userSchema )