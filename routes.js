import express from "express";
import Item from "./models/Item.js";
import AllItems from "./models/Items.js";
const router = express.Router();

// get individual item
router.get("/item", async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch {
        res.status(404).send({ error: "failed to get items" });
    }
})

// get one individual item
router.get("/item/:id", async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.id });
        res.send(item);
    } catch {
        res.status(404).send({ error: "error, item does not exist" });
    }
})

// post new item
router.post("/item", async (req, res) => {
    let items = new Item({
        name: req.body.name,
        category: req.body.category,
        stock: req.body.stock,
        seller: req.body.seller,
    })

    await items.save(err => {
        if (err) return res.send({ error: "error" });
        res.json({ status: "success" });
    });

})

// update individual item
router.put("/item/:id", async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.id });
        if (req.body.name) item.name = req.body.name;
        if (req.body.category) item.category = req.body.category;
        if (req.body.stock) item.stock = req.body.stock;
        if (req.body.seller) item.seller = req.body.seller;

        await item.save(err => {
            if (err) return res.send({ error: "error" });
            res.json({ status: "success" });
        });
    } catch {
        res.status(404).send({ error: "error, item does not exist" });
    }
})

// delete individual item
router.delete("/item/:id", async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.send("ok removed");
    } catch {
        res.status(404).send({ error: "error, item does not exist" });
    }
})

// delete every individual item
router.delete("/item-delete", async (req, res) => {
    try {
        await Item.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).send({ error: "error, theres no item to be removed" });
    }
})

//-------------------------------------------------------
// get all items
router.get("/items", async (req, res) => {
    let allItems = await AllItems.find();
    res.status(200).send(allItems);
})

// post all items 
router.post("/items", async (req, res) => {
    let allItems = new AllItems({
        name: req.body.name,
        category: req.body.category,
    })

    await allItems.save(err => {
        if (err) return console.error(err);
        res.json({ status: "success" });
    });

})



export default router;