/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { info } = require('../utils/logger');

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.status(200).json(blog);
});

// eslint-disable-next-line consistent-return
blogRouter.post('/', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(400).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(400).json({ error: 'token invalid' });
  }
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);

  const userid = user._id;

  if ((blog.user.toString() === userid.toString()) || blog.user.length === 0) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }

  return response.status(403).json({ error: 'not authorized to delete' });
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  try {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(200).json(updatedBlog);
  } catch (error) {
    info(error);
  }
});

module.exports = blogRouter;
