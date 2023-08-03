const express = require("express");
const viewController = require('../controllers/viewController')
// const apiController = require('../controllers/apiController')
const authController = require('../controllers/authController')
const router = express.Router({ mergeParams: true });



router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/sendmail",authController.protect, apiController.sendmail);
router.post("/create-invoice",authController.protect, apiController.createInvoice);


module.exports = router;
