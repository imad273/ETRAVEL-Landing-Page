const express = require('express');
const router = express.Router();

const FindBlogs = require('../Controllers/Blogs/GetBlogs');
const CreateBlog = require('../Controllers/Blogs/CreateBlog');

router.post('/addBlog?:id', CreateBlog);

router.get('/getBlogs', FindBlogs);

module.exports = router;