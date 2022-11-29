const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./config/connectDB");
require("./config/passport");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/user", userRouter);

// base url
app.get("/", (req, res) => {
    res.send("Server running successfully")
})

app.post('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        try {
            console.log("hello")
            res.send(req.user);
        } catch (error) {
            console.log("hello");
            res.send(error)
        }
    }
);

// resource not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

// err handling
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: "Internal server error"
    })
})



module.exports = app;