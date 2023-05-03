import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser'); 
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('user is logged in', username, password);

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      setUser(user);
      // console.log(user);
      setUsername('');
      setPassword('');

    } catch (exceptions) {
      console.error('Wrong credentials')
      console.log(exceptions);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input 
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input 
          type="password"
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // const showNotes = () => (
  //   <div>
  //     <h2>blogs</h2>
  //     <p>{user.name} logged in</p>
  //     {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} />
  //     )}
  //   </div>
  // )

  const logout = () => {
    // event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  }

  const addBlog = (event) => {
    event.preventDefault();
  }

  const noteForm = () => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>

      <div>
        title:
        <input
          type="text"
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
        author:
        <input
          type="text"
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
        url:
        <input
          type="text"
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      <button type="submit">Create</button>
    </form>
  </div>
  )

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>User</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
      </div>

      { noteForm() }
      
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>



    </div>
  )
}

export default App