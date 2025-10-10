const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const signupRoutes = require('./src/routes/signup');
const loginRoutes = require('./src/routes/login');
const meRoute = require('./src/routes/me');

// Getting Frontend URL from .env file
dotenv.config();
// Allowing requests from the frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// Parsing cookies
app.use(cookieParser());

// Body Parser to move all of the post req body to req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connect to database
const connectDB = require("./src/db");
connectDB();

// Routes
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/me', meRoute);

app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})