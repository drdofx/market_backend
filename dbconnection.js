import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
    mongoose
        .connect(process.env.MONGO_URI,
        {   useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then(() => {   
            console.log("db gud")
        }).catch(err => {
            console.error(err);
        })
}

export default dbConnect;
