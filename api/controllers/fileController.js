const File = require('../models/fileModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

// import Cookies from  'js-cookie';




const fileCtrl = {


    createFile: async (req, res) => {
        try {
            console.log("inside  craete mesage")

            const { email, fileName } = req.body;

            const messageHash = await bcrypt.hash(fileName, 10)

            const newFile = new File({
                email, fileName:messageHash
            })

            // Save mongodb
            await newFile.save()
            res.json({ newFile })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getAllFile: async (req, res) => {
        try {
            const file = await File.find()







            res.json(file)
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

module.exports = fileCtrl

