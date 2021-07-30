import express from "express";
import Item from "../models/Item.js";
import AllItems from "../models/Items.js";
import ItemsDetails from "../models/ItemsDetails.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString().replace(/:|\./g,'') + file.originalname);
        cb(null, file.originalname);
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

// get item category
router.get("/item-category", (req, res) => {
    if (req.query.search) {
        Item
            .find({ title: { $regex: req.query.search, $options: 'si' }})
            .sort({'_id': 1})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    } else {
        Item
            .find({})
            .sort({'_id': 1})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }
})

// get one from item category
router.get("/item-category/:id", (req, res) => {
    Item
        .findOne({ _id: req.params.id })
        .select("-__v")
        .exec((err, data) => {
            if (err) return res.status(500).send("error");
            return (data ? res.json(data) : res.status(404).send("No item found!"));
        });
})

// post item category
router.post("/item-category", upload.single("upload"), async (req, res) => {
    const halfUrl = req.protocol + '://' + req.get('host') + '/';
    let itemCategory = new Item({
        _id: req.body._id,
        category: req.body.category,
        title: req.body.title,
        // imageUrl: req.body.imageUrl
        imageUrl: halfUrl + req.file.path.replace(/\\/g, "/")
    })

    await itemCategory.save(err => {
        if (err) return res.json({ error: "error" + err });
        res.json({ status: "success" });
    });

    /* Insert Many to initialize data
    const document = [
        {
          "_id": 1,
          "category": "karbohidrat",
          "title": "Karbohidrat",
          "imageUrl": "https://ninefresh.herokuapp.com/images/category-1.png"
        },
      
        {
          "_id": 2,
          "category": "minuman",
          "title": "Minuman Sehat",
          "imageUrl": "https://ninefresh.herokuapp.com/images/category-2.png"
        },
      
        {
          "_id": 3,
          "category": "sayuran",
          "title": "Sayuran Segar",
          "imageUrl": "https://ninefresh.herokuapp.com/images/category-3.png"
        },
      
        {
          "_id": 4,
          "category": "daging",
          "title": "Daging Segar",
          "imageUrl": "https://ninefresh.herokuapp.com/images/category-4.png"
        },

        {
            "_id": 5,
            "category": "buah",
            "title": "Buah-Buahan",
            "imageUrl": "-"
        },

        {
            "_id": 6,
            "category": "lain-lain",
            "title": "Lain-Lain",
            "imageUrl": "-"
        }
    ];

    Item.insertMany(document)
        .then(() => {
            res.send("SUCCESS!");
        })
        .catch((err) => {
            res.json({err: "error" + err});
        });
    */
})

router.delete("/item-category-delete", async (req, res) => {
    try {
        await Item.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, theres no item to be removed" });
    }
})
//-------------------------------------------------------

// get all items
router.get("/item", (req, res) => {
    if (req.query.search) {
        AllItems
            .find({ title: { $regex: req.query.search, $options: 'si' }})
            .sort({'_id': 1})
            .populate({ path: "id_category", select: "_id category" })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    } else {
        AllItems
            .find({})
            .sort({'_id': 1})
            .populate({ path: "id_category", select: "_id category" })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }
})

// get items based on each category
router.get("/item-group/:id", (req, res) => {
    AllItems
        .find({ id_category: req.params.id })
        .sort({'_id': 1})
        .populate({ path: "id_category", select: "_id category" })
        .select("-__v")
        .exec((err, data) => {
            if (err) return res.status(500).send("error");
            return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
        });
})

// get one from all item
router.get("/item/:id", (req, res) => {
    AllItems
        .findOne({ _id: req.params.id })
        .populate({ path: "id_category", select: "_id category" })
        .select("-__v")
        .exec((err, data) => {
            if (err) return res.status(500).send("error");
            return (data ? res.json(data) : res.status(404).send("No item found!"));
        });
})

// post all items 
router.post("/item", upload.single("upload"), async (req, res) => {
    // const halfUrl = req.protocol + '://' + req.get('host') + '/';
    // let allItems = new AllItems({
    //     _id: req.body._id,
    //     id_category: req.body.id_category,
    //     title: req.body.title,
    //     price: req.body.price,
    //     // imageUrl: req.body.imageUrl
    //     imageUrl: halfUrl + req.file.path.replace(/\\/g, "/")
    // })

    // await allItems.save(err => {
    //     if (err) return res.json({ error: "error" + err });
    //     res.json({ status: "success" });
    // });

    
    /* initialize new documents
    
    const documents = [
        {
            "_id": 1,
            "id_category": 5,
            "title": "Cabai",
            "price": 9000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-1.png"
        },
        {
            "_id": 2,
            "id_category": 4,
            "title": "Ikan Tuna",
            "price": "55000",
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-2.png"
        },
        {
            "_id": 3,
            "id_category": 4,
            "title": "Telur Ayam",
            "price": "19000",
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-3.png"
        },
        {
            "_id": 4,
            "id_category": 3,
            "title": "Bawang Bombay",
            "price": "15000",
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-4.png"
        },
        {
            "_id": 5,
            "id_category": 6,
            "title": "Gula Pasir Putih",
            "price": 11000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-5.png"
        },
        {
            "_id": 6,
            "id_category": 6,
            "title": "Minyak Goreng",
            "price": 25000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-6.png"
        },
        {
            "_id": 7,
            "id_category": 6,
            "title": "Mentega",
            "price": 8000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-7.png"
        },
        {
            "_id": 8,
            "id_category": 3,
            "title": "Kembang Kol",
            "price": 6000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-8.png"
        },
        {
            "_id": 9,
            "id_category": 6,
            "title": "Kecap Manis",
            "price": 10000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-9.png"
        },
        {
            "_id": 10,
            "id_category": 3,
            "title": "Daun Bawang",
            "price": 5000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-10.png"
        },
        {
            "_id": 11,
            "id_category": 3,
            "title": "Daun Selada Keriting",
            "price": 15000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-11.png"
        },
        {
            "_id": 12,
            "id_category": 1,
            "title": "Indomie Goreng 5 Pack",
            "price": 10000,
            "imageUrl": "https://ninefresh.herokuapp.com/images/product-12.png"
        }
    ]

    */
   const documents = [
        {
        "_id": 13,
        "id_category": 5,
        "title": "Cabai Hijau Keriting (500 gram)",
        "price": 20000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-1.png"
        },
        {
        "_id": 14,
        "id_category": 5,
        "title": "Cabai Rawit Hijau (1 kg)",
        "price": 20000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-2.png"
        },
        {
        "_id": 15,
        "id_category": 5,
        "title": "Cabai Rawit Merah (1 kg)",
        "price": 9000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-3.png"
        },
        {
        "_id": 16,
        "id_category": 5,
        "title": "Paprika Merah (1 buah)",
        "price": 15000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-4.png"
        },
        {
        "_id": 17,
        "id_category": 5,
        "title": "Paprika Kuning (1 buah)",
        "price": 10000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-5.png"
        },
        {
        "_id": 18,
        "id_category": 5,
        "title": "Paprika Hijau (1 buah)",
        "price": 7000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-6.png"
        },
        {
        "_id": 19,
        "id_category": 5,
        "title": "Cabai Ceri (10 buah)",
        "price": 2000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-8.png"
        },
        {
        "_id": 20,
        "id_category": 5,
        "title": "Bubuk Cabai Cayenne (1 kg)",
        "price": 10000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-9.png"
        },
        {
        "_id": 21,
        "id_category": 5,
        "title": "Cabai Jalapeno (250 gram)",
        "price": 30000,
        "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-10.png"
        }
    ]
    
    AllItems.insertMany(documents)
        .then(() => {
            res.send("SUCCESS!");
        })
        .catch((err) => {
            res.json({err: "error" + err});
        });
})

// update one from all item
router.put("/item/:id", async (req, res) => {
    try {
        let allItems = await AllItems.findOne({ _id: req.params._id });
        if (req.body.title) allItems.title = req.body.title;
        if (req.body.id_category) allItems.id_category = req.body.id_category;
        if (req.body.price) allItems.price = req.body.price;
        if (req.body.imageUrl) allItems.imageUrl = req.body.imageUrl; 

        await allItems.save(err => {
            if (err) return res.json({ error: "error" });
            res.json({ status: "success" });
        });
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete one from all item
router.delete("/item/:id", async (req, res) => {
    try {
        await AllItems.deleteOne({ _id: req.params._id }, (err) => {
            if (err) return res.send("err");
            res.send("ok removed");
        });
    } catch {
        res.status(404).json({ error: "error, item does not exist" });
    }
})

// delete every all item
router.delete("/item-delete", async (req, res) => {
    try {
        await AllItems.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, theres no item to be removed" });
    }
})


//----------------------------------------------------

// get item details
router.get("/item-details", (req, res) => {
    if (req.query.search) {
        ItemsDetails
            .find({ title: { $regex: req.query.search, $options: 'si' }})
            .sort({'_id': 1})
            .populate({ path: "relatedProducts", select: "-__v", populate: { path: "id_category", select: "_id category"}})
            .populate({ path: "id_product_ref", select: "-imageUrl -__v", populate: { path: "id_category", select: "_id category"}})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    } else {
        ItemsDetails
            .find({})
            .sort({'_id': 1})
            .populate({ path: "relatedProducts", select: "-__v", populate: { path: "id_category", select: "_id category"}})
            .populate({ path: "id_product_ref", select: "-imageUrl -__v", populate: { path: "id_category", select: "_id category"}})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }
})

// get one from item details
router.get("/item-details/:id", (req, res) => {
    ItemsDetails
        .findOne({ _id: req.params.id })
        .populate({ path: "relatedProducts", select: "-__v", populate: { path: "id_category", select: "_id category"}})
        .populate({ path: "id_product_ref", select: "-imageUrl -__v", populate: { path: "id_category", select: "_id category"}})
        .select("-__v")
        .exec((err, data) => {
            if (err) return res.status(500).send("error");
            return (data ? res.json(data) : res.status(404).send("No item found!"));
        });
})

// post all items 
router.post("/item-details", upload.single("upload"), async (req, res) => {
    // const halfUrl = req.protocol + '://' + req.get('host') + '/';
    // let allItems = new AllItems({
    //     _id: req.body._id,
    //     id_category: req.body.id_category,
    //     title: req.body.title,
    //     price: req.body.price,
    //     // imageUrl: req.body.imageUrl
    //     imageUrl: halfUrl + req.file.path.replace(/\\/g, "/")
    // })

    // await allItems.save(err => {
    //     if (err) return res.json({ error: "error" + err });
    //     res.json({ status: "success" });
    // });

    const documents = [
        {
        "_id": 1,
        "stok": 500,
        "description": "<p class='text-xl leading-7 mb-6'>Cabe merah impor/lokal,  buah dan sayuran maupun bumbu. Digunakan sebagai salah satu bahan masakan yang menghasilkan rasa pedas..</p><p class='text-xl leading-7 mb-6'>Quality Greens Ornanic Cabe Merah Besar 100 g meruapakan cabai merah besar pilihan yang berkualitas yang sering dijadikan pelengkap makanan dan penambah rasa pedas</p>",
        "imageUrl": "https://ninefresh.herokuapp.com/images/CabaiSemillar-1.png",
        "id_product_ref": 1,
        "relatedProducts": [13, 14, 15, 16, 17, 18, 19, 20]
    }]

    ItemsDetails.insertMany(documents)
        .then(() => {
            res.send("SUCCESS!");
        })
        .catch((err) => {
            res.json({err: "error" + err});
        });
})

router.delete("/item-details-delete", async (req, res) => {
    try {
        await ItemsDetails.deleteMany();
        res.send("ok removed");
    } catch {
        res.status(404).json({ error: "error, theres no item to be removed" });
    }
})

export default router;