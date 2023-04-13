const listHelper = require('../utils/list_helper');
const { initialBlog, blogsInDb } = require('./helper')
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const api = supertest(app);

const { info, error } = require('../utils/logger');

beforeEach( async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlog)

  // const blogObject = initialBlog.map((item) => new Blog(item));
  // const promiseArray = blogObject.map((blog) => blog.save());
  // await Promise.all(promiseArray);
}, 100000)

test('dummy returns one', async () => {
  await Blog.deleteMany({});
  const response = await blogsInDb();

  const result = listHelper.dummy(response)
  expect(result).toBe(1)
});

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has more than one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(initialBlog);
    // info(`result should be equals to ${result}`);
    expect(result).toBe(10);
  })
})

describe('most likes', () => {

  test('most likes of a couple of blogs', () => {
    const result = listHelper.favoriteBlog(initialBlog);
    expect(result).toEqual({
      title: "A Will Eternal",
      author: "Er Gen",
      url: "http:/localhost:3002",
      likes: 7
    })
  })
})


test('blog list returns the correct amount of blog posts in json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await blogsInDb();

  expect(response).toHaveLength(initialBlog.length);
}, 1000000)


test('verify unique property is id', async () => {
  const response = await blogsInDb();
  const uniqueProperty = response.filter((item) => item.id);

  expect(uniqueProperty).toHaveLength(initialBlog.length)
  expect(uniqueProperty).toBeDefined();
})

describe('post requests', () => {

  test('creating a new blog post', async () => {
    await api
      .post('/api/blogs')
      .send({
          title: "For You, The Eternal",
          author: "Unknown",
          url: "http:/localhost:3007",
          likes: 10
      })
      .expect('Content-Type', /json/)
      .expect(201)
    
    const response = await blogsInDb();
    expect(response).toHaveLength(initialBlog.length + 1)
  });

  test('likes property default to zero if missing', async () => {
    await api
      .post('/api/blogs')
      .send({
          title: "For You, The Eternal",
          author: "For filtering test",
          url: "http:/localhost:3007"
      })
    
    const response = await blogsInDb();
    const filterLastBlog = response.filter((blog) => blog.author === "For filtering test");

    expect(filterLastBlog[0].likes).toBe(0);
  });

  test('missing title or url from request', async () => {
    await api
    .post('/api/blogs')
    .send({
        title: "For You, The Eternal",
        author: "unknown"
    })
    .expect(400)

    await api
    .post('/api/blogs')
    .send({
      author: "For filtering test",
      url: "http:/localhost:3007"
  })
    .expect(400)

  });

});

test('deleting a single resource', async () => {

  const initial = await blogsInDb();
  const deletedId = initial[0].id;

  await api
    .delete(`/api/blogs/${deletedId}`)
    .expect(204);
  
  const response = await blogsInDb();
  expect(response.length).toBe(initialBlog.length - 1);
});

test('updating an individual blog', async () => {

  const initial = await blogsInDb();
  const firstBlog = initial[0];

  const updaedBlog = {
      title: "I shall seal the heavens",
      author: "Er Gen",
      url: "http:/localhost:3001",
      likes: 10
  };

  await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send(updaedBlog)
    .expect(200);

  const response = await blogsInDb();
  const filteredId = response.filter(blog => blog.id === firstBlog.id);

  expect(filteredId.likes).not.toEqual(firstBlog.likes);
});

afterAll(async () => {
  await mongoose.connection.close();
});
