const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const cors = require('cors');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const usersRoute = require('./routes/users');

const app = express();
const port = 5000;

// Middleware to parse request bodies
app.use(bodyParser.json());

//Enable CORS for all routes and origins
app.use(cors());

//const mongoURI = 'mongodb://localhost:27017/users';

const mongoURI = 'mongodb+srv://termux:termux@xserver.vikjovu.mongodb.net/?retryWrites=true&w=majority&appName=xserver'

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/users', usersRoute);


// Protect routes with the auth middleware
app.get('/', (req, res) => {
    res.json({ message: 'Hello, this xserver running in termux on Android'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
