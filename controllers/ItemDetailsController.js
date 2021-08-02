import ItemsDetails from "../models/ItemsDetails.js";

export default class ItemDetails {
    static apiGetItemDetails(req, res) {
        if (req.query.search) {
            ItemsDetails
                .find({ title: { $regex: req.query.search, $options: 'si' }})
                .sort({'_id': 1})
                .populate({ path: "merchant", select: "-__v" })
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
                .populate({ path: "merchant", select: "-__v" })
                .populate({ path: "relatedProducts", select: "-__v", populate: { path: "id_category", select: "_id category"}})
                .populate({ path: "id_product_ref", select: "-imageUrl -__v", populate: { path: "id_category", select: "_id category"}})
                .select("-__v")
                .exec((err, data) => {
                    if (err) return res.status(500).send("error" + err);
                    return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
                });
        }
    }

    static apiGetItemDetailsById(req, res) {
        ItemsDetails
            .findOne({ _id: req.params.id })
            .populate({ path: "merchant", select: "-__v" })
            .populate({ path: "relatedProducts", select: "-__v", populate: { path: "id_category", select: "_id category"}})
            .populate({ path: "id_product_ref", select: "-imageUrl -__v", populate: { path: "id_category", select: "_id category"}})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static apiGetItemDetailsByMerchant(req, res) {
        ItemsDetails
            .find()
            .populate({ path: "merchant", match: { postalCode: req.params.id }, select: "-userOrders -__v" })
            .populate({ path: "id_product_ref", select: "-__v", populate: { path: "id_category", select: "_id category"}})
            .select("id_product_ref")
            .exec((err, datas) => {
                if (err) return res.status(500).send("error" + err);
                
                const new_datas = datas.filter(data => {
                    return data.merchant;
                })
                return (new_datas.length > 0 ? res.json(new_datas) : res.json(datas));
            });
    }


    static async apiPostItemDetails(req, res) {
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
                "description": "<p class='text-xl leading-7 mb-6'>Cabe merah impor/lokal,  buah dan sayuran maupun bumbu. Digunakan sebagai salah satu bahan masakan yang menghasilkan rasa pedas</p><p class='text-xl leading-7 mb-6'>Quality Greens Ornanic Cabe Merah Besar 100 g meruapakan cabai merah besar pilihan yang berkualitas yang sering dijadikan pelengkap makanan dan penambah rasa pedas</p>",
                "imageUrl": "https://ninefresh.herokuapp.com/images/CabaiSemillar-1.png",
                "merchant": 1,
                "id_product_ref": 1,
                "relatedProducts": [13, 14, 15, 16, 17, 18, 19, 20],
                "stok": 500,
                "totalPenjualan": 50,
                "qty": 0
            },
            {
                "_id": 2,
                "description": "<p class='text-xl leading-7 mb-6'>Telor ayam konvensional adalah jenis telur yang mudah didapat dan harganya murah, serta memiliki banyak manfaat bagi kesehatan</p><p class='text-xl leading-7 mb-6'>Telur konvensional yang kami jual kualitasnya sudah pasti terjaga dan terjamin</p>",
                "imageUrl": "https://ninefresh.herokuapp.com/images/TelurSemillar.png",
                "merchant": 1,
                "id_product_ref": 2,
                "relatedProducts": [22, 23, 24],
                "stok": 250,
                "totalPenjualan": 49,
                "qty": 0
            },
            {
                "_id": 3,
                "description": "-",
                "imageUrl": "-",
                "merchant": 1,
                "id_product_ref": 3,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 48,
                "qty": 0
            },
            {
                "_id": 4,
                "description": "-",
                "imageUrl": "-",
                "merchant": 1,
                "id_product_ref": 4,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 47,
                "qty": 0
            },
            {
                "_id": 5,
                "description": "-",
                "imageUrl": "-",
                "merchant": 1,
                "id_product_ref": 5,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 46,
                "qty": 0
            },
            {
                "_id": 6,
                "description": "-",
                "imageUrl": "-",
                "merchant": 1,
                "id_product_ref": 6,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 45,
                "qty": 0
            },
            {
                "_id": 7,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 7,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 44,
                "qty": 0
            },
            {
                "_id": 8,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 8,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 43,
                "qty": 0
            },
            {
                "_id": 9,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 9,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 42,
                "qty": 0
            },
            {
                "_id": 10,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 10,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 41,
                "qty": 0
            },
            {
                "_id": 11,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 11,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 40,
                "qty": 0
            },
            {
                "_id": 12,
                "description": "-",
                "imageUrl": "-",
                "merchant": 2,
                "id_product_ref": 12,
                "relatedProducts": [],
                "stok": 500,
                "totalPenjualan": 39,
                "qty": 0
            },
        ]

        ItemsDetails.insertMany(documents)
            .then(() => {
                res.send("SUCCESS!");
            })
            .catch((err) => {
                res.json({err: "error" + err});
            });
    }

    static async apiDeleteItemDetails(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await ItemsDetails.deleteMany();
                res.send("ok removed");
            } else {
                res.status(403).send("not authorized");
            }
        } catch(e) {
            res.status(404).json({ error: e + " error, theres no item to be removed" });
        }
    }

    static apiUpdateItemDetailsQuantityAndStock(req, res) {
        if (req.params.change === "qtyup") {    
            ItemsDetails
                .updateOne( { _id: req.params.id, stok: {$gte: 0}, qty: {$gte: 0} }, {$inc : {'qty' : 1, 'stok': -1}}, {new: true})
                .exec((err) => {
                    if (err) return res.status(500).send("error");
                    return res.send("ok");
                })
        } else if (req.params.change === "qtydown") {
            ItemsDetails
                .updateOne( { _id: req.params.id, stok: {$gt: 0}, qty: {$gt: 0} }, {$inc : {'qty' : -1, 'stok': 1}}, {new: true})
                .exec((err) => {
                    if (err) return res.status(500).send("error");
                    return res.send("ok");
                })
        } else {
            return res.status(404).send("sorry, wrong page!");
        }
    }
}