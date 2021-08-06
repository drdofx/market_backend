import mongoose from "mongoose";
const { Schema } = mongoose;

const verifSchema = new Schema({
    fullName: String,
    codeNumber: String,
    date: String,
})

const Verif = mongoose.model("Verif", verifSchema);
export default Verif;