const Helper = require("../../utils/Helper")

const AuthMid = (req, res, next) => {
    //verify 
    try {
        const { auth_token } = req.cookies
        const id = Helper.verifyJwtToken(auth_token)
        req.id = id
        next()
    } catch (e) {
        console.log("error", e);
        res.status(403).send("not a valid user")
    }
}

module.exports = AuthMid
