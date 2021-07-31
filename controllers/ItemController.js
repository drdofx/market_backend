import AllItems from "../models/Items.js";

export default class Item {
    static apiGetItem(req, res) {
        if (req.query.search) {
            AllItems
                .find({ title: { $regex: req.query.search, $options: 'si' }})
                .sort({'_id': 1})
                .limit(12)
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
                .limit(12)
                .populate({ path: "id_category", select: "_id category" })
                .select("-__v")
                .exec((err, data) => {
                    if (err) return res.status(500).send("error" + err);
                    return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
                });
        }
    }

    static apiGetItemByCategory(req, res) {
        AllItems
            .find({ id_category: req.params.id })
            .sort({'_id': 1})
            .populate({ path: "id_category", select: "_id category" })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static apiGetItemById(req, res) {
        AllItems
            .findOne({ _id: req.params.id })
            .populate({ path: "id_category", select: "_id category" })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static async apiPostItem(req, res) {
        const halfUrl = req.protocol + '://' + req.get('host') + '/';
        let allItems = new AllItems({
            _id: req.body._id,
            id_category: req.body.id_category,
            title: req.body.title,
            price: req.body.price,
            // imageUrl: req.body.imageUrl
            imageUrl: halfUrl + req.file.path.replace(/\\/g, "/"),
            stok: req.body.stok,
            totalPenjualan: req.body.totalPenjualan
        })

        await allItems.save(err => {
            if (err) return res.json({ error: "error" + err });
            res.json({ status: "success" });
        });
        
        /* initialize new documents
        
        const documents = [
            {
                "_id": 1,
                "id_category": 5,
                "title": "Cabai",
                "price": 9000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-1.png",
                "stok": 500,
                "totalPenjualan": 50
            },
            {
                "_id": 2,
                "id_category": 4,
                "title": "Ikan Tuna",
                "price": "55000",
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-2.png",
                "stok": 500,
                "totalPenjualan": 49
            },
            {
                "_id": 3,
                "id_category": 4,
                "title": "Telur Ayam Konvensional",
                "price": "19000",
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-3.png",
                "stok": 500,
                "totalPenjualan": 48
            },
            {
                "_id": 4,
                "id_category": 3,
                "title": "Bawang Bombay",
                "price": "15000",
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-4.png",
                "stok": 500,
                "totalPenjualan": 47
            },
            {
                "_id": 5,
                "id_category": 6,
                "title": "Gula Pasir Putih",
                "price": 11000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-5.png",
                "stok": 500,
                "totalPenjualan": 46
            },
            {
                "_id": 6,
                "id_category": 6,
                "title": "Minyak Goreng",
                "price": 25000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-6.png",
                "stok": 500,
                "totalPenjualan": 45
            },
            {
                "_id": 7,
                "id_category": 6,
                "title": "Mentega",
                "price": 8000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-7.png",
                "stok": 500,
                "totalPenjualan": 44
            },
            {
                "_id": 8,
                "id_category": 3,
                "title": "Kembang Kol",
                "price": 6000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-8.png",
                "stok": 500,
                "totalPenjualan": 43
            },
            {
                "_id": 9,
                "id_category": 6,
                "title": "Kecap Manis",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-9.png",
                "stok": 500,
                "totalPenjualan": 42
            },
            {
                "_id": 10,
                "id_category": 3,
                "title": "Daun Bawang",
                "price": 5000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-10.png",
                "stok": 500,
                "totalPenjualan": 41
            },
            {
                "_id": 11,
                "id_category": 3,
                "title": "Daun Selada Keriting",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-11.png",
                "stok": 500,
                "totalPenjualan": 40
            },
            {
                "_id": 12,
                "id_category": 1,
                "title": "Indomie Goreng 5 Pack",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-12.png",
                "stok": 500,
                "totalPenjualan": 39
            },
            {
                "_id": 13,
                "id_category": 5,
                "title": "Cabai Hijau Keriting (500 gram)",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-1.png",
                "stok": 500,
                "totalPenjualan": 38
            },
            {
                "_id": 14,
                "id_category": 5,
                "title": "Cabai Rawit Hijau (1 kg)",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-2.png",
                "stok": 500,
                "totalPenjualan": 37
            },
            {
                "_id": 15,
                "id_category": 5,
                "title": "Cabai Rawit Merah (1 kg)",
                "price": 9000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-3.png",
                "stok": 500,
                "totalPenjualan": 36
            },
            {
                "_id": 16,
                "id_category": 5,
                "title": "Paprika Merah (1 buah)",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-4.png",
                "stok": 500,
                "totalPenjualan": 35
            },
            {
                "_id": 17,
                "id_category": 5,
                "title": "Paprika Kuning (1 buah)",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-5.png",
                "stok": 500,
                "totalPenjualan": 34
            },
            {
                "_id": 18,
                "id_category": 5,
                "title": "Paprika Hijau (1 buah)",
                "price": 7000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-6.png",
                "stok": 500,
                "totalPenjualan": 33
            },
            {
                "_id": 19,
                "id_category": 5,
                "title": "Cabai Ceri (10 buah)",
                "price": 2000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-7.png",
                "stok": 500,
                "totalPenjualan": 32
            },
            {
                "_id": 20,
                "id_category": 5,
                "title": "Bubuk Cabai Cayenne (1 kg)",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-8.png",
                "stok": 500,
                "totalPenjualan": 31
            },
            {
                "_id": 21,
                "id_category": 5,
                "title": "Cabai Jalapeno (250 gram)",
                "price": 30000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-9.png",
                "stok": 500,
                "totalPenjualan": 30
            }
        ]
        
        const documents = [
            {
                "_id": 3,
                "id_category": 4,
                "title": "Telur Ayam Konvensional",
                "price": "19000",
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-3.png",
                "stok": 500,
                "totalPenjualan": 48
            },
            {
                "_id": 19,
                "id_category": 5,
                "title": "Cabai Ceri (10 buah)",
                "price": 2000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-7.png",
                "stok": 500,
                "totalPenjualan": 32
            },
            {
                "_id": 20,
                "id_category": 5,
                "title": "Bubuk Cabai Cayenne (1 kg)",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-11.png",
                "stok": 500,
                "totalPenjualan": 31
            },
            {
                "_id": 21,
                "id_category": 5,
                "title": "Cabai Jalapeno (250 gram)",
                "price": 30000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-9.png",
                "stok": 500,
                "totalPenjualan": 30
            },
            {
                "_id": 22,
                "id_category": 4,
                "title": "Telur Organik",
                "price": 25000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-12.png",
                "stok": 500,
                "totalPenjualan": 29
            },
            {
                "_id": 23,
                "id_category": 4,
                "title": "Telur Ayam Kampung",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-13.png",
                "stok": 500,
                "totalPenjualan": 28
            },
            {
                "_id": 24,
                "id_category": 4,
                "title": "Telur Bebek",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/semillar-14.png",
                "stok": 500,
                "totalPenjualan": 27
            }
        ]
        AllItems.insertMany(documents)
            .then(() => {
                res.send("SUCCESS!");
            })
            .catch((err) => {
                res.json({err: "error" + err});
            });
        
        */
    }

    static async apiDeleteOneItem(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await AllItems.deleteOne({ _id: req.params.id }, (err) => {
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

    static async apiDeleteAllItem(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await AllItems.deleteMany();
                res.send("ok removed");
            } else {
                res.status(403).send("not authorized");
            }
        } catch {
            res.status(404).json({ error: "error, theres no item to be removed" });
        }
    }

    static async apiUpdateItem(req, res) {
        try {
            let allItems = await AllItems.findOne({ _id: req.params.id });
            if (req.body.title) allItems.title = req.body.title;
            if (req.body.id_category) allItems.id_category = req.body.id_category;
            if (req.body.price) allItems.price = req.body.price;
            if (req.body.imageUrl) allItems.imageUrl = req.body.imageUrl;
            if (req.body.stok) allItems.stok = req.body.stok; 
            if (req.body.totalPenjualan) allItems.totalPenjualan = req.body.totalPenjualan; 
    
            await allItems.save(err => {
                if (err) return res.json({ error: "error" });
                res.json({ status: "success" });
            });
        } catch {
            res.status(404).json({ error: "error, item does not exist" });
        }
    }
}