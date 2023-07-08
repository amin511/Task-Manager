const { CostumError } = require("../error/costum-error")


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err instanceof CostumError);
    if (err instanceof CostumError) {
        return res.status(err.status).json({ msg: err.message })
    }
    return res.status(500).json({ msg: "err" })
}

module.exports = errorHandlerMiddleware