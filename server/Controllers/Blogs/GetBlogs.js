const Blog = require('../../Model/Blogs');

const FindBlogs = async (request, response) => {
  var blogs = await Blog.find();
  response.send(blogs);
}

module.exports = FindBlogs;