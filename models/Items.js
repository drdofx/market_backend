import mongoose from "mongoose";
const { Schema } = mongoose;

const AllItemsSchema = new Schema({
    name: String,
    category: String,
})

const AllItems = mongoose.model("AllItems", AllItemsSchema);
export default AllItems;