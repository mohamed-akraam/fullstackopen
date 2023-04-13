/* eslint-disable prefer-destructuring */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { info } = require('../utils/logger');

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({});
  response.status(200).json(blog);
});

// eslint-disable-next-line consistent-return
blogRouter.post('/', async (request, response) => {
  const body = request.body;

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
  }
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
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
