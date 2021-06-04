const express = require("express");
const router = express.Router();
const stratService = require("../services/stratService");
const roleValidation = require("../middlewares/roleValidation");

router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    await stratService.createStrat(req.body, req.user);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const strats = await stratService.getAllStrats();
    res.status(200).json(strats);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/mystrats", roleValidation("user"), async (req, res, next) => {
  try {
    const strats = await stratService.getAllStratsByUserId(req.user);
    res.status(200).json(strats);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get(
  "/stratbycommand",
  roleValidation("user"),
  async (req, res, next) => {
    try {
      const strat = await stratService.getStratFilteredWithCommand(
        req.body,
        req.user
      );
      res.status(200).json(strat);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

router.put("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await stratService.editStrat(req.user, id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.delete("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await stratService.removeStrat(id, req.user);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
