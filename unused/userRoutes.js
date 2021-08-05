import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import auth from "../auth.js";
const router = express.Router();

// register
router.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashedPass => {
            let user = new User({
                email: req.body.email,
                password: hashedPass,
            });

            user.save(err => {
                if (err) return res.send({ error: "error" });
                res.status(201).json({ status: "user registered succcessfully" });
            });
        })
        .catch(e => res.status(500).send({ message: "Server Error" }));
})

// login
router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => 
            bcrypt
                .compare(req.body.password, user.password)
                .then(pass => {
                    if(!pass) {
                        return res.status(400).send({ message: "Wrong password" });
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    res.status(200).send({
                        message: "Login success!",
                        email: user.email,
                        token
                    });
                })
                .catch(e => res.status(400).send({ message: "Wrong password" }))
        )
        .catch(e => res.status(404).send({ message: "User Not Found!" }));
})

// free endpoint
router.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
  });
  
// authentication endpoint
router.get("/auth-endpoint", auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});

export default router;