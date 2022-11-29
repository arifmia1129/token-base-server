const express = require("express");
const router = express.Router();
const passport = require("passport")
const userController = require("../controllers/user.controller");
require("../config/passport")

router.route("/register")
    .post(userController.registerUser)

router.route("/login")
    .post(userController.loginUser)



module.exports = router;