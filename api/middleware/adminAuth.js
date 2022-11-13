const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const adminAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(400).json({ msg: "No token received" })

        // for postman
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization;
        console.log("token --")
        console.log(token)
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        let userId = ""
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" })
            req.user = user
            userId = user.id;
        })
        const userDetails = await Users.findOne({
            _id: userId
        })

        if (userDetails.userRole == "admin") {
            console.log("user role :" + userDetails.userRole)
            next()
        } else {
            return res.status(400).json({ msg: "Invalid Authentication" })
        }

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = adminAuth