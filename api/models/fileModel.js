const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({

         
            email:{
                type:String,
                required:true,
               
            },

            fileName:{
                type:String,
                required:true,
                trim:true
            }
        
        
  },{        
    timestamps:true
        
})


module.exports = mongoose.model('File',fileSchema )