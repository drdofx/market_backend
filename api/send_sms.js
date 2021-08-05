/*
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from 'twilio';

const theClient = client(accountSid, authToken);

// Function to generate OTP
function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// console.log(generateOTP());
const OTP = generateOTP();

router.get("/", async (req, res) => {
    await theClient.messages
        .create({
            body: `Your OTP code for your order is ${OTP}`,
            from: process.env.TEST_NUMBER_FROM,
            to: process.env.TEST_NUMBER_TO
        })
        .then(message => console.log(message.sid))
        .then(() => res.send("succes!"));
    }
)

export default router;
*/