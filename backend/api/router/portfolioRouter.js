const express = require('express')
const Helper = require('../utils/Helper')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const Response = require('../utils/Response')


router.get('/', (req, res) => {
    res.send("portfolio working..")
})

//add portfolio
//POST
//http://localhost:2727/portfolio
router.post('/', async (req, res) => {
    try {
        const { title, description, img_url } = req.body
        const user_id = req.id
        console.log("user id=>> ", user_id)
        //validate
        Helper.validateUserInput(title, description, img_url)
        const client = new PrismaClient()
        const port = await client.portfolio.create({
            data: {
                title: title,
                description: description,
                user_id: user_id,
                img_url: img_url
            }
        })

        res.send(Response(false, "portfolio created successfully", port))
    } catch (e) {
        res.send(Response(true, "portfolio created failed", null))
    }
})
//delete port
//http://localhost:2727/portfolio/:port_id
router.delete('/:port_id', async (req, res) => {
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
})

//update port
//http://localhost:2727/portfolio/:port_id
router.put('/:port_id', async (req, res) => {
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
})



module.exports = router