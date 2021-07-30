import mongoose from "mongoose";
import Item from "./Item.js";
import Items from "./Items.js";
const { Schema } = mongoose;

const AllItemsSchema = new Schema({
    _id: Number,
    stok: Number,
    price: Number,
    title: String,
    description: String,
    imageUrl: String,
    id_product_ref: {type: Number, ref: 'Item'},
    relatedProducts: [{type: Number, ref: 'Items'}]
})

const AllItems = mongoose.model("AllItems", AllItemsSchema);
export default AllItems;