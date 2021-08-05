import express from "express";
import cors from "cors";
const app = express();

import dbConnect from "./dbconnection.js";
import routes from "./routes/routes.js"
// import userRoutes from "./unused/userRoutes.js";
import path from "path";
import clientAPI from "./api/send_sms.js";

const port = process.env.PORT || 8000;

dbConnect();

app.use(cors());
app.use('/images', express.static('images'));
app.use(express.json());

// app.use('/', userRoutes);
app.use('/api/market', routes);

// used for testing static json files
app.get('/testproduct', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve('unused/Product.json'));
})
app.get('/testcategory', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve('unused/BrowseCate.json'));
})
app.get('/testdetails', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve('unused/Details.json'));
})

// send sms
app.use('/sms', clientAPI);

// wildcard 404
app.use("*", (req, res) => res.status(404).send('<h1>Sorry, page not found!</h1>'));

app.listen(port, () => {
    console.log(`listening on ${port}`);
})