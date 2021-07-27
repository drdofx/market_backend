import express from "express";
import cors from "cors";
const app = express();

import dbConnect from "./dbconnection.js";
import routes from "./routes/itemRoutes.js"
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 8000;

dbConnect();

app.use(cors());
app.use('/images', express.static('images'));
app.use(express.json());

app.use('/', userRoutes);
app.use('/api/market', routes);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})