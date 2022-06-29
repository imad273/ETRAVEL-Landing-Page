const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoute = require('./Routes/UserRoute');
const ProfileRoute = require('./Routes/ProfileRoute');
const BlogRoute = require('./Routes/BlogRoute');
const fileUpload = require('express-fileupload');
require("dotenv").config();

const pass = "pass12345";

mongoose.connect(`mongodb+srv://emad:${pass}@cluster0.sxzwt.mongodb.net/travelo?retryWrites=true&w=majority`).then(() => {
  console.log('DB connection Successfully!');
})

const app = express();

app.use(express.json());
app.use(cors());

app.use(fileUpload({ useTempFiles: true }));

app.use(UserRoute);
app.use(ProfileRoute);
app.use(BlogRoute);

const PORT = 3001;
app.listen(process.env.PORT || PORT, function () {
  console.log(`it's alive on http://localhost:${PORT}`);
});

module.exports = app