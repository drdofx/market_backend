import mongoose from "mongoose";
import ItemsDetails from "./ItemsDetails.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    address: String,
    postalCode: Number,
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    courier: String,
    paymentMethod: String,
    items: [{type: Number, ref: 'ItemsDetails'}]
})

const User = mongoose.model("User", userSchema);
export default User;