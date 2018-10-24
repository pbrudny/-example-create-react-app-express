const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const port = process.env.PORT || 5000;
// API calls

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const product = require('./routes/product.route');

app.use('/products', product);
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
