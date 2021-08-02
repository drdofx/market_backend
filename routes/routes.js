import express from "express";
import ItemCategory from "../controllers/ItemCategoryController.js";
import Item from "../controllers/ItemController.js";
import ItemDetails from "../controllers/ItemDetailsController.js";
import MerchantIdentifier from "../controllers/MerchantController.js";
import UserIdentifier from "../controllers/UserController.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

// test route for uploading images

// router.post("/upload", upload.single("upload"), (req, res) => {
//     res.send(req.file);
// })

// get or post item category
router
    .route("/item-category")
    .get(ItemCategory.apiGetItemCategory)
    .post(upload.single("upload"), ItemCategory.apiPostItemCategory);

// get one or delete one item category by id 
router
    .route("/item-category/:id")
    .get(ItemCategory.apiGetItemCategoryById)
    .delete(ItemCategory.apiDeleteOneItemCategory);

// delete all item category
router.route("/item-category-delete").delete(ItemCategory.apiDeleteAllItemCategory);

//-------------------------------------------------------

// get or post items
router
    .route("/item")
    .get(Item.apiGetItem)
    .post(upload.single("upload"), Item.apiPostItem);

// get items based on each category
router.route("/item-group/:id").get(Item.apiGetItemByCategory);

// get, update, or delete one from item by id
router
    .route("/item/:id")
    .get(Item.apiGetItemById)
    .put(Item.apiUpdateItem)
    .delete(Item.apiDeleteOneItem);

// delete all items
router.route("/item-delete").delete(Item.apiDeleteAllItem);

//----------------------------------------------------

// get or post item details
router
    .route("/item-details")
    .get(ItemDetails.apiGetItemDetails)
    .post(upload.single("upload"), ItemDetails.apiPostItemDetails);

// get one from item details
router.route("/item-details/:id").get(ItemDetails.apiGetItemDetailsById);

// get item details based on item id ref (one-to-one)
router.route("/item-details-ref/:id").get(ItemDetails.apiGetItemDetailsByMerchant);

// delete all item details
router.route("/item-details-delete").delete(ItemDetails.apiDeleteItemDetails);

//----------------------------------------------------

// get or post merchant info
router
    .route("/merchant")
    .get(MerchantIdentifier.apiGetMerchant)
    .post(MerchantIdentifier.apiPostMerchant);

// get one merchant info by id
router.route("/merchant/:id").get(MerchantIdentifier.apiGetMerchantById);

//----------------------------------------------------

// get or post merchant info
router
    .route("/user")
    .get(UserIdentifier.apiGetUser)
    .post(UserIdentifier.apiPostUser);

// get one merchant info by id
router
    .route("/user/:id")
    .get(UserIdentifier.apiGetUserById)
    .put(UserIdentifier.apiUpdateItemByUser);

export default router;