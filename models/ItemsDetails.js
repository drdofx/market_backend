import mongoose from "mongoose";
import Merchant from "./Merchant.js";
import AllItems from "./Items.js";
const { Schema } = mongoose;

const ItemsDetailsSchema = new Schema({
    _id: Number,
    description: String,
    imageUrl: String,
    merchant: {type: Number, ref: 'Merchant'},
    id_product_ref: {type: Number, ref: 'AllItems'},
    relatedProducts: [{type: Number, ref: 'AllItems'}],
    stok: Number,
    qty: Number,
    totalPenjualan: Number
})

const ItemsDetails = mongoose.model("ItemsDetails", ItemsDetailsSchema);
export default ItemsDetails;