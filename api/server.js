require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
//const path = require('path')




const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






// connect to the mongodb
// const uri ="mongodb://localhost/subscribers";
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
   
   
    useNewUrlParser: true,
   
}, err =>{
    if(err) throw err;
    console.log('Connece to MoDB')
})

  
// Routes
app.use('/test', (req, res) => res.send('You Failed to log in!') )
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
//app.use('/api', require('./routes/paymentRouter'))


 
app.listen(port, () => {
    console.log(`Server is running  on : ${port}`);
});
