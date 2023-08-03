const express = require("express");
const viewController = require('../controllers/viewController')
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController')


router.get("/", viewController.home);

router.get("/login", viewController.login);
// router.post("/login", viewController.loginCheck);
router.get("/dashboard",authController.protect,viewController.dashboard);
// router.get("/dashboard/add-user", viewController.addUser);
// router.get("/dashboard", viewController.addFolder);


module.exports = router;
