// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

        if(req.headers.authorization != null){
            
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(
                token,
                process.env.ADMIN_TOKEN_KEY,
                function (err, decodedToken) {
                    if (err) {
                        console.log('Admin Auth Error');
                        console.log('Admin Auth Error');
                        console.log('Admin Auth Error', err);
                        console.log('Admin Auth Error');
                        console.log('Admin Auth Error');
                        return res.status(401).json({ message: "Authentication failed!!!!!!!!" });
                    }
                    else {
                        req.adminId = decodedToken.userId
                        
                        console.log('Admin req.adminId');
                        console.log('Admin req.adminId', req.adminId);
                        console.log('Admin req.adminId');

                        next();
                    }
                }
            );

        }else{
        
            return res.status(401).json({ message: "Admin Authentication failed" });
            
        }
        
    } catch (error) {

        return res.status(401).json({ message: "Admin Authentication failed" });
    }
};