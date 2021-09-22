const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const UserController = {

    signup: async (req, res) => {
        try {
            const { username, password } = req.body
            //validation
            if (!username || !password) {
                throw new Error("Enter username and password")
            }
            if (password.length < 6) {
                throw new Error("Enter password with minimum character 6")
            }
            //hash our password
            const salt = bcryptjs.genSaltSync(10)
            // console.log("salt-> ", salt);
            const hashpass = bcryptjs.hashSync(password, salt)
            // console.log("hashpass-> ", hashpass);

            //save user into database
            const prisma = new PrismaClient()
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashpass
                }
            })

            //token 
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRATE + "")
            //console.log("token->", token);

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

            res.send({ msg: "success", newuserobj })
        } catch (e) {
            res.status(500).send(e.message)
        }
    },
    login: (req, res) => {
        res.send("login end point...")
    }
}

module.exports = UserController