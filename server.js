import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes.js"
import userRoutes from "./userRoutes.js";
dotenv.config();

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI,
{   useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch(err => {
    console.error(err);
}).then(() => {   
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/', userRoutes);
    app.use('/api/market', routes);

    app.listen(port, () => {
        console.log(`listening on ${port}`);
    })
})