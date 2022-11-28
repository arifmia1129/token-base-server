const config = require("../config/config");
const mongoose = require("mongoose");

mongoose.connect(config.db.url)
    .then(() => {
        console.log("Successfully DB connected")
    })
    .catch((err) => {
        console.log(err.message);
    })