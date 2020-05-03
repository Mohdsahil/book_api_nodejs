require('dotenv').config()
const { verify } = require('jsonwebtoken');

module.exports = {
    checktoken: (req, res, next) => {
        let token = req.headers['x-access-token'];

        if (token) {

            verify(token, process.env.TOKEN_KEY, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        success: 0,
                        message: 'invalid token'
                    })
                } else {
                    next()
                }
            })
        }
        else {
            return res.status(401).json({
                success: 0,
                message: "access denied"
            })
        }

    }
}