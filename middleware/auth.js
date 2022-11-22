const jwt = require('jsonwebtoken');
const config = require('config')
const auth = (req, res, next) => {

    const token = req.header("x-auth-token")

    if (!token) {
        return res.send("please provide auth token").status(401)
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret,(res,err)=>{
            req.user = res
            console.log()
        })
        console.log(decoded)


        next()    

    } catch (err) {
        res.status(401).json({ message: "token is not valid" })
    }

}
module.exports = auth