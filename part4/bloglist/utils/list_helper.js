const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.map(blog => sum += blog.likes)
  return sum;
}

const favoriteBlog = (blogs) => {
  let newBlog = {};
  const mostLikes = blogs.map(item => item.likes);
  const max = Math.max(...mostLikes);
  blogs =  blogs.filter(item => {
    if (item.likes === max) {
      newBlog = {
        title: item.title,
        author: item.author,
        likes: item.likes
      }
    }
  });
  return newBlog;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
