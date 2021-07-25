import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: String,
    category: String,
    stock: Number,
    seller: String,
})

const Item = mongoose.model("Item", itemSchema);
export default Item;