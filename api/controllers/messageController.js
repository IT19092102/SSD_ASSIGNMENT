const Message = require('../models/messageModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

// import Cookies from  'js-cookie';




const messageCtrl = {


    createMessage: async (req, res) => {
        try {
            console.log("inside  craete mesage")

            const { email, message } = req.body;

            const messageHash = await bcrypt.hash(message, 10)

            const newMessage = new Message({
                email, message:messageHash
            })

            // Save mongodb
            await newMessage.save()
            res.json({ newMessage })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getAllMessage: async (req, res) => {
        try {
            const message = await Message.find()
const encriptedData=[];


message.map((data)=>{
    // console.log("normal dData start --------------------")
    // console.log(data.message)
    encriptedData.email=data.email;
    encriptedData.message=data.message;
    // console.log(data.email)

})

encriptedData.map((data)=>{
console.log("normal Data start --------------------")

    console.log(encriptedData.message)
    
    console.log(encriptedData.email)
    console.log("encriptedData end --------------------")
})



            res.json(message)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }


}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = messageCtrl

