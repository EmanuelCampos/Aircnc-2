const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const mongooseConnect = require('./mongooseConnect');
const routes = require('./routes');

const app = express();

mongoose.connect(mongooseConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);