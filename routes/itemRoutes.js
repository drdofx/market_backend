import express from "express";
import Item from "../models/Item.js";
import AllItems from "../models/Items.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:|\./g,'') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file if its not jpeg or png
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {   
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 8
    },
    fileFilter: fileFilter
});


// test route for uploading images

// router.post("/upload", upload.single("upload"), (req, res) => {
//     res.send(req.file);
// })


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
        let allItems = null;
        if (req.query.search) {
            allItems = await AllItems.find({ name: { $regex: req.query.search, $options: 'si' }}).select("name category image")
        } else if (req.query.filter) {
            allItems = await AllItems.find({ category: { $eq: req.query.filter }}).select("name category image");
        } else {
            allItems = await AllItems.find().select("name category image");
        }
        res.json(allItems);
    } catch {
        res.status(404).json({ error: "failed to get items" });
    }
})

// get one from all item
router.get("/items/:id", async (req, res) => {
    try {
        let allItems = await AllItems.findOne({ _id: req.params.id }).select("name category image");
        if (!allItems) throw new Error('No item found!');
        res.json(allItems);
    } catch {
        res.status(404).json({ error: "failed to get item" });
    }
})

// post all items 
router.post("/items", upload.single("upload"), async (req, res) => {
    const halfUrl = req.protocol + '://' + req.get('host') + '/';
    let allItems = new AllItems({
        name: req.body.name,
        category: req.body.category,
        image: halfUrl + req.file.path.replace(/\\/g, "/")
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