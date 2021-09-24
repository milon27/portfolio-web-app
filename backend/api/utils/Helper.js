const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Helper = {
    validateUserInput: (...paramarr) => {
        console.log("paramarr", paramarr);
        // [ "username1","1234567" ,-1]
        let hasError = true;
        paramarr.forEach(item => {
            if (item === null || item === undefined) {
                hasError = true
                return hasError
            } else {
                hasError = false
            }
        })

        return hasError
    },
    getJwtToken: (id) => {
        const token = jwt.sign({ id: id }, process.env.JWT_SECRATE + "")
        return token
    },
    getHashPassword: (password) => {
        const salt = bcryptjs.genSaltSync(10)//10 random
        // console.log("salt-> ", salt);
        // 1234567+raddom
        const hashpass = bcryptjs.hashSync(password, salt)
        // console.log("hashpass-> ", hashpass);
        return hashpass
    },
    validatePassword: (password, hash_password) => {
        const result = bcryptjs.compareSync(password, hash_password)
        return result
    },
    passTokenToCookie: (user, res) => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRATE + "")

        const newuserobj = {
            ...user, token: token
        }
        delete newuserobj.password

        //send back to token as cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        return newuserobj
    }
}

module.exports = Helper