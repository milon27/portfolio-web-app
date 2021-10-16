const Helper = require("../utils/Helper")
const { PrismaClient } = require('@prisma/client')
const Response = require("../utils/Response")

const PortfolioController = {
    getAll: async (req, res) => {
        try {
            const userid = req.id
            const client = new PrismaClient()


            const allport = await client.portfolio.findMany({
                where: {
                    user_id: parseInt(userid)
                }
            })
            console.log("all-> ", allport);
            if (allport.length == 0) {
                throw new Error("Portfolio not available")
            }

            res.send(Response(false, "portfolio get successfully", allport))
        } catch (e) {
            console.log(e);
            res.send(Response(true, e.message, []))
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const client = new PrismaClient()
            const singleport = await client.portfolio.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if (singleport === null) {
                throw new Error("Portfolio not available")
            }

            res.send(Response(false, "portfolio get successfully", singleport))
        } catch (e) {
            res.send(Response(true, e.message, null))
        }
    },
    add: async (req, res) => {
        try {
            const { title, description, img_url, cat_id } = req.body
            const user_id = req.id
            console.log("user id=>> ", user_id)
            //validate
            Helper.validateUserInput(title, description, img_url, cat_id)
            const client = new PrismaClient()
            const port = await client.portfolio.create({
                data: {
                    title: title,
                    description: description,
                    user_id: user_id,
                    img_url: img_url,
                    cat_id: cat_id
                }
            })

            res.send(Response(false, "portfolio created successfully", port))
        } catch (e) {
            res.send(Response(true, "portfolio created failed", null))
        }
    },
    delete: async (req, res) => {
        try {
            const { port_id } = req.params

            const client = new PrismaClient()
            const afterDelete = await client.portfolio.delete({
                where: {
                    id: parseInt(port_id)
                }
            })
            //console.log("afterDelete", afterDelete);

            res.send(Response(false, "portfolio deleted successfully", true))
        } catch (e) {
            console.log(e);
            res.send(Response(true, "portfolio deleted failed", false))
        }
    },

    update: async (req, res) => {
        try {
            const { port_id } = req.params

            const { title, description, img_url } = req.body
            const user_id = req.id

            const client = new PrismaClient()
            const afterUpdate = await client.portfolio.updateMany({
                data: {
                    title: title,
                    description: description,
                    img_url: img_url
                },
                where: {
                    id: parseInt(port_id),
                    AND: {
                        user_id: user_id
                    }
                }
            })

            res.send(Response(false, "portfolio udpated successfully", afterUpdate))
        } catch (e) {
            console.log(e);
            res.send(Response(true, "portfolio udpated failed", false))
        }
    }

}
module.exports = PortfolioController