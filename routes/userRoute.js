const router = require("express").Router();
const User = require("../model/birthDayModel");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
