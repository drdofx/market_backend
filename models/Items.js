import mongoose from "mongoose";
import Item from "./Item.js";
const { Schema } = mongoose;

const AllItemsSchema = new Schema({
    _id: Number,
    id_category: {type: Number, ref: 'Item'},
    title: String,
    price: Number,
    category: String,
    imageUrl: String,
})

const AllItems = mongoose.model("AllItems", AllItemsSchema);
export default AllItems;