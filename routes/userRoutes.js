const express = require("express");
const { login, register, getCurrentUser } = require("../controllers/usersControllers");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/current").get(validateToken,getCurrentUser);

module.exports = router