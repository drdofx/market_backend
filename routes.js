import express from "express";
import Item from "./models/Item.js";
import AllItems from "./models/Items.js";
const router = express.Router();

// get individual item
router.get("/item", async (req, res) => {
    try {
        let items = await Item.find();
        res.json(items);
    } catch {
        res.status(404).json({ error: "failed to get items" });
    }
})

// get one individual item
router.get("/item/:id", async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.id });
        res.json(item);
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
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
        if (err) return res.json({ error: "error" });
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
            if (err) return res.json({ error: "error" });
            res.json({ status: "success" });
        });
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete individual item
router.delete("/item/:id", async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete every individual item
router.delete("/item-delete", async (req, res) => {
    try {
        await Item.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, theres no item to be removed" });
    }
})

//-------------------------------------------------------
// get all items
router.get("/items", async (req, res) => {
    try {
        if (req.query.search) {
            let allItems = await AllItems.find({ name: { $regex: req.query.search, $options: 'si' }});
            res.json(allItems);
        } else {
            let allItems = await AllItems.find();
            res.json(allItems);
        }
    } catch {
        res.status(404).json({ error: "failed to get items" });
    }
})

// get one from all item
router.get("/items/:id", async (req, res) => {
    try {
        let allItems = await AllItems.findOne({ _id: req.params.id });
        if (!allItems) throw new Error('No item found!');
        res.json(allItems);
    } catch {
        res.status(404).json({ error: "failed to get item" });
    }
})

// post all items 
router.post("/items", async (req, res) => {
    let allItems = new AllItems({
        name: req.body.name,
        category: req.body.category,
    })

    await allItems.save(err => {
        if (err) return res.json({ error: "error" });
        res.json({ status: "success" });
    });

})

// update one from all item
router.put("/items/:id", async (req, res) => {
    try {
        let allItems = await AllItems.findOne({ _id: req.params.id });
        if (req.body.name) allItems.name = req.body.name;
        if (req.body.category) allItems.category = req.body.category;
        if (req.body.stock) allItems.stock = req.body.stock;
        if (req.body.seller) allItems.seller = req.body.seller;

        await allItems.save(err => {
            if (err) return res.json({ error: "error" });
            res.json({ status: "success" });
        });
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete one from all item
router.delete("/items/:id", async (req, res) => {
    try {
        await AllItems.deleteOne({ _id: req.params.id });
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete every all item
router.delete("/items-delete", async (req, res) => {
    try {
        await AllItems.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, theres no item to be removed" });
    }
})

// // search query based on item name
// router.get('/items?search=', (req, res) => {
//     res.send({ message: req.query.search });
// })
export default router;