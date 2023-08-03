const express = require("express");
const viewController = require('../controllers/viewController')
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController')
const apiController = require('../controllers/apiController')


// router.get("/", viewController.home);

// router.get("/login", viewController.login);
router.get("/dashboard",authController.protect,viewController.dashboard);
// router.get("/dashboard/add-user", viewController.addUser);
// router.get("/dashboard", viewController.addFolder);

router.get("/status-table", viewController.table);
router.get("/get-invoice/:id", viewController.getInvoice);


module.exports = router;
