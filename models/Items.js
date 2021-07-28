import mongoose from "mongoose";
const { Schema } = mongoose;

const AllItemsSchema = new Schema({
    id: Number,
    idp: Number,
    title: String,
    price: Number,
    category: String,
    image: String,
})

const AllItems = mongoose.model("AllItems", AllItemsSchema);
export default AllItems;