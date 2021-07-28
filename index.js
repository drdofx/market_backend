import express from "express";
import cors from "cors";
const app = express();

import dbConnect from "./dbconnection.js";
import routes from "./routes/itemRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import path from "path";
const port = process.env.PORT || 8000;

dbConnect();

app.use(cors());
app.use('/images', express.static('images'));
app.use(express.json());

app.use('/', userRoutes);
app.use('/api/market', routes);
app.get('/testproduct', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve('Product.json'));
})
app.get('/testcategory', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve('BrowseCate.json'));
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})