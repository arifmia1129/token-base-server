require("dotenv").config();

const dev = {
    app: {
        port: process.env.PORT
    },
    db: {
        url: process.env.DB_URL
    },
    token: {
        jwt: process.env.JWT_KEY
    }
}

module.exports = dev;