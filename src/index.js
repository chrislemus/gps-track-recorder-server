require('./models/User');
require('./models/Track');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;
const mongoUri = `mongodb+srv://admin:${mongoDbPassword}@cluster0.clp4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', () => {
  console.error('error connecting to mongo');
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
