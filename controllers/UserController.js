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
            .findOne({ phoneNumber: req.params.id })
            .select("-__v")
            .exec((err, data) => {
                if (err) return res.status(500).send("error");
                return (data ? res.json(data) : res.status(404).send("No item found!"));
            });
    }

    static async apiPostUser(req, res) {
        let findUser = await User.findOne({ phoneNumber: req.body.phoneNumber }).select("-__v");

        if (findUser) {
            if (req.body.fullName) findUser.fullName = req.body.fullName;
            if (req.body.address) findUser.address = req.body.address;
            if (req.body.postalCode) findUser.postalCode = req.body.postalCode;
            if (req.body.courier) findUser.courier = req.body.courier;
            if (req.body.paymentMethod) findUser.paymentMethod = req.body.paymentMethod; 
            if (req.body.items) findUser.items.push(...req.body.items);
            
            await findUser.save(err => {
                    if (err) return res.json({ error: "error" + err });
                    console.log("nice");
                    res.json({ status: "success" });
            });
        } else {
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
        }
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