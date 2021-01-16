var express = require('express');
var router = express.Router();
const User = require("../controllers/user.js");
const authJWT = require("../middleware/jwt.js");


router.post("/register", User.create);
router.post("/login", User.login);
router.get("/userList",authJWT.authenticateJWT, User.userList);


module.exports = router;
