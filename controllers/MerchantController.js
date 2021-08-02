import Merchant from "../models/Merchant.js";

export default class MerchantIdentifier {
    static apiGetMerchant(req, res) {
        Merchant
            .find({})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static apiGetMerchantById(req, res) {
        Merchant
            .findOne({ _id: req.params.id })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static async apiPostMerchant(req, res) {
        // let merchants = new Merchant({
        //     _id: req.body._id,
        //     nama: req.body.nama,
        //     alamat: req.body.alamat,
        //     kelurahan: req.body.kelurahan,
        //     kecamatan: req.body.kecamatan,
        //     kota: req.body.kota,
        //     kodePos: req.body.kodePos,
        //     nomor_telepon: req.body.nomor_telepon,
        //     userOrders: req.body.userOrders
        // })

        // await merchants.save(err => {
        //     if (err) return res.json({ error: "error" + err });
        //     res.json({ status: "success" });
        // });

        const documents = [
            {
                "userOrders": [],
                "_id": 1,
                "nama": "WARUNG SEMBAKO Bapak Sumarto",
                "alamat": "Jl. Tegal Parang Selatan I No.20, RT.2/RW.5",
                "kelurahan": "Tegal Parang",
                "kecamatan": "Mampang Prapatan",
                "kota": "Jakarta Selatan",
                "postalCode": 12790,
                "nomor_telepon": "085696037133"
            },
            {
                "userOrders": [],
                "_id": 2,
                "nama": "Warung Kelontong Madura",
                "alamat": "Jl. Poncol Jaya No.3, RT.9/RW.4",
                "kelurahan": "Kuningan Barat",
                "kecamatan": "Mampang Prapatan",
                "kota": "Jakarta Selatan",
                "postalCode": 12710,
                "nomor_telepon": "089632556389"
            }
        ]

        Merchant.insertMany(documents)
            .then(() => {
                res.send("SUCCESS!");
            })
            .catch((err) => {
                res.json({err: "error" + err});
            });
    }

    static async apiDeleteMerchant(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await Merchant.deleteMany();
                res.send("ok removed");
            } else {
                res.status(403).send("not authorized");
            }
        } catch(e) {
            res.status(404).json({ error: e + " error, theres no item to be removed" });
        }
    }
}