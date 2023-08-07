const express = require("express");
const router = express.Router();
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const forgotPassword = require("./forgotPassword");

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/forgotPassword",forgotPassword);



module.exports = router;