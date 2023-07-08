class CostumError extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status
    }
}

const creeCostumError = (msg, status) => {
    return new CostumError(msg, status);
}

module.exports = { CostumError, creeCostumError }
