const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/join", auth.join);
router.post("/login", auth.login);

module.exports = router;