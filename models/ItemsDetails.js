import mongoose from "mongoose";
import AllItems from "./Items.js";
const { Schema } = mongoose;

const ItemsDetailsSchema = new Schema({
    _id: Number,
    stok: Number,
    description: String,
    imageUrl: String,
    id_product_ref: {type: Number, ref: 'AllItems'},
    relatedProducts: [{type: Number, ref: 'AllItems'}]
})

const ItemsDetails = mongoose.model("ItemsDetails", ItemsDetailsSchema);
export default ItemsDetails;