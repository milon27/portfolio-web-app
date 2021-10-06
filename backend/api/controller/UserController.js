const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const Response = require('../utils/Response')
const Helper = require('../utils/Helper')

const UserController = {

    signup: async (req, res) => {
        try {
            const { username, password } = req.body
            //validation
            const value = Helper.validateUserInput(username, password)
            if (value) {
                throw new Error("Enter username and password")
            }
            if (password.length < 6) {
                throw new Error("Enter password with minimum character 6")
            }
            //hash our password
            const hashpass = Helper.getHashPassword(password)

            //save user into database
            const prisma = new PrismaClient()
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashpass
                }
            })
            //token 
            const newuser = Helper.passTokenToCookie(user, res)

            res.send(Response(false, "user created succesfully", newuser))
        } catch (e) {
            console.log(e);
            res.status(500).send(Response(true, e.message, null))
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            //validate
            const value = Helper.validateUserInput(username, password)
            if (value) {
                throw new Error("Enter username and password")
            }
            //search user by his username
            const prisma = new PrismaClient()
            //selct * from user, todo
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })
            if (user === null) {
                throw new Error("user doesn't exist.")
            }
            //validate
            const result = Helper.validatePassword(password, user.password)
            if (result === false) {
                throw new Error("user password is incorrect")
            }
            //token
            const newuser = Helper.passTokenToCookie(user, res)

            console.log("user->", newuser);
            res.send(Response(false, "user logged in successfully", newuser))

        } catch (e) {
            console.log(e);
            res.status(500).send(Response(true, e.message, null))
        }
    },
    isLoggedIn: (req, res) => {
        try {
            const { auth_token } = req.cookies
            Helper.verifyJwtToken(auth_token)
            res.send(true)
        } catch (e) {
            console.log("error", e);
            res.send(false)
        }
    },
    logout: (req, res) => {
        try {
            res.cookie("auth_token", "", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                expires: new Date(0)
            })

            res.send(true)
        } catch (e) {
            console.log("error", e);
            res.send(false)
        }
    }
}

module.exports = UserController