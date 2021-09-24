// error(boolean),message:String,response:object
const Response = (error, message, response) => {
    return {
        error, message, response
    }
}

module.exports = Response