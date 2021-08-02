import User from "../models/User.js";

export default class UserIdentifier {
    static apiGetUser(req, res) {
        User
            .find({})
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error" + err);
                return (data.length > 0 ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static apiGetUserById(req, res) {
        User
            .findOne({ nomor_hp: req.params.id })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static async apiPostUser(req, res) {
        // if (User.findOne({ nomor_hp: req.body.nomor_hp })) {
        //     res.send("failed");
        // }

        let users = new User({
            fullName: req.body.fullName,
            address: req.body.address,
            postalCode: req.body.postalCode,
            phoneNumber: req.body.phoneNumber,
            emailAddress: req.body.emailAddress,
            courier: req.body.courier,
            paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : "COD",
            items: req.body.items ? req.body.items : []
        })
    
        await users.save(err => {
            if (err) return res.json({ error: "error" + err });
            console.log("nice");
            res.json({ status: "success" });
        });
    
            // const documents = [
            //     {
            //         _id: 1,
            //         nama: "WARUNG SEMBAKO Bapak Sumarto",
            //         alamat: "Jl. Tegal Parang Selatan I No.20, RT.2/RW.5",
            //         kelurahan: "Tegal Parang",
            //         kecamatan: "Mampang Prapatan",
            //         kota: "Jakarta Selatan",
            //         kodePos: 12790,
            //         nomor_telepon: "085696037133",
            //         userOrders: [],
            //     }
            // ]
    
            // Merchant.insertMany(documents)
            //     .then(() => {
            //         res.send("SUCCESS!");
            //     })
            //     .catch((err) => {
            //         res.json({err: "error" + err});
            //     });
    }

    static async apiUpdateItemByUser(req, res) {
        try {
            let user = await User.findOne({ nomor_hp: req.params.id })
            user.Items.push(req.body.Item)
    
            await user.save(err => {
                if (err) return res.json({ error: err + "error" });
                res.json({ status: "success" });
            });
        } catch {
            res.status(404).json({ error: "error, item does not exist" });
        }
    }

    static async apiDeleteUser(req, res) {
        try {
            if (req.headers.authorization === process.env.AUTH) {
                await User.deleteMany();
                res.send("ok removed");
            } else {
                res.status(403).send("not authorized");
            }
        } catch(e) {
            res.status(404).json({ error: e + " error, theres no item to be removed" });
        }
    }
}