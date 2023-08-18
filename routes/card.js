const express = require('express');
const router = express.Router();
const card = require("../controllers/card");

router.post("/add-card", card.add);
router.put("/update-card", card.update);
router.delete("/:word", card.delete);
router.get("/sentences", card.getAllSen);
router.get("/sentences/detail/:sentenceID", card.getJoinWord);
// router.get("/sentences/detail/words", card.getWord);
router.get("/mypage/:nickname", card.getCnt);
// router.post("/login", auth.login);

module.exports = router;