const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).send({ error: 'invalid password or email' });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: 'invalid password or email' });
  }
});

module.exports = router;
