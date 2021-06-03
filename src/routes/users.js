const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res, next) => {
  try {
    await userService.signup(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;