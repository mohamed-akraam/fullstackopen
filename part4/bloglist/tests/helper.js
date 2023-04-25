const Blog = require('../models/blog');
const User = require('../models/user');

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON())
};

module.exports = {
  initialBlog,
  blogsInDb,
  usersInDb,
}
