const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

const favoriteBlog = (blogs) => {
  let newBlog = {};
  const mostLikes = blogs.map((item) => item.likes);
  const max = Math.max(...mostLikes);
  blogs.filter((item) => {
    if (item.likes === max) {
      newBlog = {
        title: item.title,
        author: item.author,
        url: item.url,
        likes: item.likes,
      };
    }
    return newBlog;
  });
  return newBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
