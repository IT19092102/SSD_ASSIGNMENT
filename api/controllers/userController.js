const Users = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

// import Cookies from  'js-cookie';


const userCtrl = {
    register: async (req, res) => {
        try {



            const { name, email, userRole, password } = req.body;




            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters long." })

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, userRole, password: passwordHash
            })

            // Save mongodb
            await newUser.save()
            newUser.password = "Ha ha haaaa, I wont tell you! :-) "
            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ newUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;


            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const userRole = user.userRole
            console.log("userRole : " + userRole)
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })


            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            Cookies.set('refreshToken', refreshtoken)
            // localStorage.setItem('refreshTokenTest', refreshtoken)

            const rf_token = req.cookies.refreshtoken;
            console.log("rf_token " + rf_token)
            console.log("refresh token " + req.cookies.refreshtoken)

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accesstoken, refreshtoken, rf_token, userRole, email })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            console.log("logout")
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            console.log("token header before split  11111111-- ")
            console.log("token header before split  333-- " + req.headers.authorization)
            // const token = req.headers.Authorization.split(" ")[1];

            const rf_token = req.headers.authorization;





            console.log("refresh token =  " + rf_token)

            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, getAllUser: async (req, res) => {
        try {
            const user = await Users.find()
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json(user)
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

module.exports = userCtrl


