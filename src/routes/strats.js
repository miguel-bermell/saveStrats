const express = require("express");
const router = express.Router();
const stratService = require("../services/stratService");

router.post("/", async (req, res, next) => {
  try {
    await stratService.createStrat(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
