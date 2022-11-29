const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/generateToken");
const salt = bcrypt.genSaltSync(10);

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: "Username and password is required"
            })
        }

        const exist = await User.findOne({ username });

        if (exist) {
            return res.status(401).json({
                success: false,
                message: "Username not available"
            })
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
            const user = new User({
                username,
                password: hash
            })
            await user.save();
            res.status(201).json({
                success: true,
                message: "Successfully registered user",
                user: {
                    id: user._id,
                    username: user.username
                }
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't register the user"
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: "Username and password is required"
            })
        }

        const exist = await User.findOne({ username });

        if (!exist) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const { password: pwd, ...user } = exist.toObject();

        bcrypt.compare(password, exist.password, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: "Username or password invalid"
                })
            }

            const token = generateToken(user.username)

            res.status(200).json({
                success: true,
                message: "Successfully logged in user",
                user: {
                    user,
                    token
                }
            })
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't logged in the user"
        })
    }
}