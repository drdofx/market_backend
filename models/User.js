import mongoose from "mongoose";
import ItemsDetails from "./ItemsDetails.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: Number,
    nama: String,
    alamat: String,
    kodePos: Number,
    nomor_hp: {
        type: String,
        required: true,
        unique: true
    },
    items: [{type: Number, ref: 'ItemsDetails'}]
})

const User = mongoose.model("User", userSchema);
export default User;