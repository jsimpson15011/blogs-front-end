import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogsService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('logging in with', username, password)
      const credentials = {username, password}
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (e) {
      console.log(e)
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const blogsList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{`${user.name} logged in`}<button onClick={handleLogout}>Log out</button></p>
        {blogs.map(blog => <Blog blog={blog}/>)}

      </div>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log into application</h2>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div className="App">
      {
        user === null ?
          loginForm()
          : blogsList()
      }
    </div>
  )
}

export default App
