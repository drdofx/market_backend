import mongoose from "mongoose";
import User from "./User.js";
const { Schema } = mongoose;

const merchantSchema = new Schema({
    _id: Number,
    nama: String,
    alamat: String,
    kelurahan: String,
    kecamatan: String,
    kota: String,
    kodePos: Number,
    nomor_telepon: String,
    userOrders: [{type: Number, ref: 'User'}]
})

const Merchant = mongoose.model("Merchant", merchantSchema);
export default Merchant;