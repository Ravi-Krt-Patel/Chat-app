import express from 'express'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotenv from 'dotenv';
import User from "../models/user.model.js"
import authenticate from "../middlewares/authentication.js"

dotenv.config();

const router = express.Router();

const Token = (user) => {
    return jwt.sign({ user }, process.env.SALT);
}

// user restration here------------------------------------------------

router.post("/register",
    async (req, res) => {
        try {
            const {name, email, password} = req.body;
            if(!name || !email || !password ){
                return res.status(400).json({ message: "please fill all detail" })
            }
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: "please check your email address, your email is already exist" })
            } else {
                const nweUser = await User.create(req.body);
                let token = Token(user);
                res.header('Authorization', `Bearer ${token}`)
                res.status(201).json({ user: nweUser.toJSON(), token: token })
                return
            }

        } catch (err) {
            return res.send({ message: err.message })
        }
    });



// login user---------------------------------------------------
router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        //to check user exist or not
        if (!user) return res.status(400).send({ message: "please check email or password" });
        // to check password is matched or not
        let match = user.checkPassword(req.body.password);

        if (!match) return res.status(400).send({ message: "please check your email or password" });
        //creating jwt token
        let token = Token(user);
        res.header('Authorization', `Bearer ${token}`)
        return res.status(200).send({ token: token, user: user })
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
})

// logout the user----------------------------------------------

router.get("/all-user", authenticate, async (req, res) => {
    try {
        let aalUser = await User.find();
        return res.status(200).send({ allUser: aalUser })
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
})




export default router