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
        if (req.headers.authorization === process.env.AUTH) {
            const halfUrl = req.protocol + '://' + req.get('host') + '/';
            let allItems = new AllItems({
                _id: req.body._id,
                id_category: req.body.id_category,
                title: req.body.title,
                price: req.body.price,
                imageUrl: req.file ? halfUrl + req.file.path.replace(/\\/g, "/") : req.body.imageUrl,
                stok: req.body.stok,
                totalPenjualan: req.body.totalPenjualan
            })

            await allItems.save(err => {
                if (err) return res.json({ error: "error" + err });
                res.json({ status: "success" });
            });
        } else {
            res.status(403).send("not authorized");
        }
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
                "title": "Telur Ayam Konvensional",
                "price": 19000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-3.png"
            },
            {
                "_id": 3,
                "id_category": 4,
                "title": "Ikan Tuna",
                "price": 55000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-2.png"
            },
            {
                "_id": 4,
                "id_category": 3,
                "title": "Bawang Bombay",
                "price": 15000,
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
            },
            {
                "_id": 13,
                "id_category": 5,
                "title": "Cabai Hijau Keriting (500 gram)",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-13.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-1.png",
                "stok": 500,
                "totalPenjualan": 38
            },
            {
                "_id": 14,
                "id_category": 5,
                "title": "Cabai Rawit Hijau (1 kg)",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-14.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-2.png",
                "stok": 500,
                "totalPenjualan": 37
            },
            {
                "_id": 15,
                "id_category": 5,
                "title": "Cabai Rawit Merah (1 kg)",
                "price": 9000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-15.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-3.png",
                "stok": 500,
                "totalPenjualan": 36
            },
            {
                "_id": 16,
                "id_category": 5,
                "title": "Paprika Merah (1 buah)",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-16.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-4.png",
                "stok": 500,
                "totalPenjualan": 35
            },
            {
                "_id": 17,
                "id_category": 5,
                "title": "Paprika Kuning (1 buah)",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-17.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-5.png",
                "stok": 500,
                "totalPenjualan": 34
            },
            {
                "_id": 18,
                "id_category": 5,
                "title": "Paprika Hijau (1 buah)",
                "price": 7000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-18.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-6.png",
                "stok": 500,
                "totalPenjualan": 33
            },
            {
                "_id": 19,
                "id_category": 5,
                "title": "Cabai Ceri (10 buah)",
                "price": 2000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-19.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-7.png",
                "stok": 500,
                "totalPenjualan": 32
            },
            {
                "_id": 20,
                "id_category": 5,
                "title": "Bubuk Cabai Cayenne (1 kg)",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-20.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-11.png",
                "stok": 500,
                "totalPenjualan": 31
            },
            {
                "_id": 21,
                "id_category": 5,
                "title": "Cabai Jalapeno (250 gram)",
                "price": 30000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-21.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-9.png",
                "stok": 500,
                "totalPenjualan": 30
            },
            {
                "_id": 22,
                "id_category": 4,
                "title": "Telur Organik",
                "price": 25000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-22.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-12.png",
                "stok": 500,
                "totalPenjualan": 29
            },
            {
                "_id": 23,
                "id_category": 4,
                "title": "Telur Ayam Kampung",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-23.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-13.png",
                "stok": 500,
                "totalPenjualan": 28
            },
            {
                "_id": 24,
                "id_category": 4,
                "title": "Telur Bebek",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-24.png",
                "altImageUrl": "https://ninefresh.herokuapp.com/images/semillar-14.png",
                "stok": 500,
                "totalPenjualan": 27
            },
            {
                "_id": 25,
                "id_category": 3,
                "title": "Bawang Merah",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-25.png",
                "stok": 500,
                "totalPenjualan": 26
            },
            {
                "_id": 26,
                "id_category": 3,
                "title": "Bawang Putih",
                "price": 20000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-26.png",
                "stok": 500,
                "totalPenjualan": 25
            },
            {
                "_id": 27,
                "id_category": 1,
                "title": "Beras Putih",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-27.png",
                "stok": 500,
                "totalPenjualan": 24
            },
            {
                "_id": 28,
                "id_category": 1,
                "title": "Beras Merah",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-28.png",
                "stok": 500,
                "totalPenjualan": 23
            },
            {
                "_id": 29,
                "id_category": 6,
                "title": "Gula Merah",
                "price": 11000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-29.png",
                "stok": 500,
                "totalPenjualan": 22
            },
            {
                "_id": 30,
                "id_category": 1,
                "title": "Jagung",
                "price": 5000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-30.png",
                "stok": 500,
                "totalPenjualan": 21
            },
            {
                "_id": 31,
                "id_category": 1,
                "title": "Kentang",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-31.png",
                "stok": 500,
                "totalPenjualan": 20
            },
            {
                "_id": 32,
                "id_category": 6,
                "title": "Kayu Manis",
                "price": 30000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-32.png",
                "stok": 500,
                "totalPenjualan": 19
            },
            {
                "_id": 33,
                "id_category": 6,
                "title": "Lada",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-33.png",
                "stok": 500,
                "totalPenjualan": 18
            },
            {
                "_id": 34,
                "id_category": 2,
                "title": "Milo",
                "price": 4000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-34.png",
                "stok": 500,
                "totalPenjualan": 17
            },
            {
                "_id": 35,
                "id_category": 1,
                "title": "Pasta La Fonte",
                "price": 9000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-35.png",
                "stok": 500,
                "totalPenjualan": 16
            },
            {
                "_id": 36,
                "id_category": 1,
                "title": "Roti",
                "price": 6000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-36.png",
                "stok": 500,
                "totalPenjualan": 15
            },
            {
                "_id": 37,
                "id_category": 1,
                "title": "Tahu",
                "price": 5000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-37.png",
                "stok": 500,
                "totalPenjualan": 14
            },
            {
                "_id": 38,
                "id_category": 1,
                "title": "Tempe",
                "price": 7000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-38.png",
                "stok": 500,
                "totalPenjualan": 13
            },
            {
                "_id": 39,
                "id_category": 3,
                "title": "Terong",
                "price": 3000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-39.png",
                "stok": 500,
                "totalPenjualan": 12
            },
            {
                "_id": 40,
                "id_category": 5,
                "title": "Tomat",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-40.png",
                "stok": 500,
                "totalPenjualan": 11
            },
            {
                "_id": 41,
                "id_category": 3,
                "title": "Ubi Jalar",
                "price": 8000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-41.png",
                "stok": 500,
                "totalPenjualan": 10
            },
            {
                "_id": 42,
                "id_category": 3,
                "title": "Ubi Jalar Ungu",
                "price": 10000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-42.png",
                "stok": 500,
                "totalPenjualan": 9
            },
            {
                "_id": 43,
                "id_category": 2,
                "title": "UC1000",
                "price": 9000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-43.png",
                "stok": 500,
                "totalPenjualan": 8
            },
            {
                "_id": 44,
                "id_category": 2,
                "title": "Bear Brand Gold",
                "price": 7000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-44.png",
                "stok": 500,
                "totalPenjualan": 7
            },
            {
                "_id": 45,
                "id_category": 2,
                "title": "Frisian Flag",
                "price": 15000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-45.png",
                "stok": 500,
                "totalPenjualan": 6
            },
            {
                "_id": 46,
                "id_category": 2,
                "title": "Hemaviton C1000",
                "price": 4000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-46.png",
                "stok": 500,
                "totalPenjualan": 5
            },
            {
                "_id": 47,
                "id_category": 2,
                "title": "Hydro Coco",
                "price": 7000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-47.png",
                "stok": 500,
                "totalPenjualan": 4
            },
            {
                "_id": 48,
                "id_category": 2,
                "title": "Ultra Milk",
                "price": 3000,
                "imageUrl": "https://ninefresh.herokuapp.com/images/product-48.png",
                "stok": 500,
                "totalPenjualan": 3
            },
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
            if (req.headers.authorization === process.env.AUTH) {
                let allItems = await AllItems.findOne({ _id: req.params.id });
                if (req.body.title) allItems.title = req.body.title;
                if (req.body.id_category) allItems.id_category = req.body.id_category;
                if (req.body.price) allItems.price = req.body.price;
                if (req.body.imageUrl) allItems.imageUrl = req.body.imageUrl;
                if (req.body.stok) allItems.stok = req.body.stok; 
                if (req.body.totalPenjualan) allItems.totalPenjualan = req.body.totalPenjualan; 
        
                await allItems.save(err => {
                    if (err) return res.json({ error: err + "error" });
                    res.json({ status: "success" });
                });
            } else {
                res.status(403).send("not authorized");
            }
        } catch {
            res.status(404).json({ error: "error, item does not exist" });
        }
    }
}