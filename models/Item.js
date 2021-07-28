import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
    id: Number,
    category: String,
    title: String,
    imgUrl: String,
})

const Item = mongoose.model("Item", itemSchema);
export default Item;