const express = require("express");
const multer = require("../middlewares/multer");
const router = express.Router();
const userService = require("../services/userService");
const roleValidation = require("../middlewares/roleValidation");
const { VALUES } = require("../utils/constants");

router.get("/all", async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/signup", multer.single("avatar"), async (req, res, next) => {
  try {
    let avatar = VALUES.AVATAR_DEFAULT;
    if (req.file) {
      avatar = req.file.path;
    }
    await userService.signup(req.body, avatar);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(202).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.delete("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.removeUser(id);
    res.status(200).json(`User (${id}) has been removed`);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = router;
