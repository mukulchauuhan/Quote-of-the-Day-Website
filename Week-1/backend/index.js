const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const quotes = require('./routes/quotes');
const auth = require('./routes/auth');
const config = require('./config');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors()); // Using CORS Middleware

//connect to MongoDB
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

// Middleware to server static files (HTML, CSS, JS) 
app.use(express.static(path.join(__dirname, 'frontend')));

// Use Routes
app.use('/api/quotes', quotes);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
