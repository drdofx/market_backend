import Item from "../models/Item.js";

export default class ItemCategory {
    static apiGetItemCategory(req, res) {
        if (req.query.search) {
            Item
                .find({ title: { $regex: req.query.search, $options: 'si' }})
                .sort({'_id': 1})
                .limit(4)
                .select("-__v")
                .exec((err, data) => {
                    if (err) return res.status(500).send("error" + err);
                    return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
                });
        } else {
            Item
                .find({})
                .sort({'_id': 1})
                .limit(4)
                .select("-__v")
                .exec((err, data) => {
                    if (err) return res.status(500).send("error" + err);
                    return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
                });
        }
    }

    static apiGetItemCategoryById(req, res) {
        Item
            .findOne({ _id: req.params.id })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static async apiPostItemCategory(req, res) {
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
    }

    static async apiDeleteAllItemCategory(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await Item.deleteMany();
                res.send("ok removed");
            } else {
                res.status(403).send("not authorized");
            }
        } catch {
            res.status(404).json({ error: "error, theres no item to be removed" });
        }
    }

    static async apiDeleteOneItemCategory(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await Item.deleteOne({ _id: req.params.id }, (err) => {
                    if (err) return res.send("err");
                    res.send("ok removed");
                });
            } else {
                res.status(403).send("not authorized");
            }
        } catch {
            res.status(404).json({ error: "error, item does not exist" });
        }
    }
}