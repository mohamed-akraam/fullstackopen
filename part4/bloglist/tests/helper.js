const Blog = require('../models/blog');

const initialBlog = [
  {
    title: "I shall seal the heavens",
    author: "Er Gen",
    url: "http:/localhost:3001",
    likes: 3
  },
  {
    title: "A Will Eternal",
    author: "Er Gen",
    url: "http:/localhost:3002",
    likes: 7
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON())
};

module.exports = {
  initialBlog,
  blogsInDb,
}
