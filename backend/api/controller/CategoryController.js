const Helper = require("../utils/Helper")
const { PrismaClient } = require('@prisma/client')
const Response = require("../utils/Response")

const CategoryController = {
    getAll: async (req, res) => {
        try {
            const cat_id = req.id
            const client = new PrismaClient()
            const allport = await client.portfolio.findMany({
                where: {
                    cat_id: parseInt(cat_id)
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    tags: {
                        select: {
                            title: true
                        }
                    }
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
    add: async (req, res) => {
        try {
            const { title } = req.body
            //validate
            Helper.validateUserInput(title)
            const client = new PrismaClient()
            const category = await client.category.create({
                data: {
                    title: title
                }
            })

            res.send(Response(false, "category created successfully", category))
        } catch (e) {
            res.send(Response(true, "category created failed", null))
        }
    },
    delete: async (req, res) => {
        try {
            const { cat_id } = req.params

            const client = new PrismaClient()
            const afterDelete = await client.category.delete({
                where: {
                    id: parseInt(cat_id)
                }
            })
            //console.log("afterDelete", afterDelete);

            res.send(Response(false, "category deleted successfully", true))
        } catch (e) {
            console.log(e);
            res.send(Response(true, "category deleted failed", false))
        }
    },

    update: async (req, res) => {
        try {
            const { cat_id } = req.params

            const { title } = req.body

            const client = new PrismaClient()
            const afterUpdate = await client.portfolio.update({
                data: {
                    title: title
                },
                where: {
                    id: parseInt(cat_id)
                }
            })

            res.send(Response(false, "category udpated successfully", afterUpdate))
        } catch (e) {
            console.log(e);
            res.send(Response(true, "category udpated failed", false))
        }
    }

}
module.exports = CategoryController