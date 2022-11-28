const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports.generateToken = (id, username) => {
    const payload = {
        id,
        username
    }

    console.log(payload)

    return token = jwt.sign(payload, config.token.jwt, {
        expiresIn: "1d"
    })
}

