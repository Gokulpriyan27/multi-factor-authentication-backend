const express = require('express');
const dotenv=require("dotenv");
dotenv.config();
// const session = require('express-session');
const cookieSession = require("cookie-session");
const passport = require('passport');
const database = require("./database/database")
const authRoutes = require('./routes/auth.routes');
const app = express();
const cors = require("cors");



app.use(cors({
  origin:process.env.frontend_url,
  credentials:true,
}));



app.use(express.json())


// Connect to the database
database();

// Middleware

app.use(express.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,

// }));

app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
