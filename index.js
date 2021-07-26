import express from "express";
import cors from "cors";
const app = express();

import dbConnect from "./dbconnection.js";
import routes from "./routes.js"
import userRoutes from "./userRoutes.js";

const port = process.env.PORT || 8000;

dbConnect();

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/api/market', routes);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})