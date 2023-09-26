import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Togglable'
import BlogForm from './components/BlogForm'
// import notificationReducer from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import usersService from './services/users'
import User from './components/User'
import UserBlogs from './components/UserBlogs'
import SelectedBlog from './components/SelectedBlog'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [getSpecificBlogs, setGetSpecificBlogs] = useState([])

  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const notification = useSelector((state) => state)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")

    if(loggedUserJSON) {
      const allUsers = window.localStorage.getItem("allBlogUsers")
      console.log(JSON.parse(allUsers))
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token)
      setShowAll(false)
      // getAllBlogs()
      getUserBlog(user._id)
      setUsers(JSON.parse(allUsers))
    }
    }
  ,[])


  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  } 

  const getUserBlog = async (userId) => {
    const blogs = await usersService.getUsersBlogs(userId)
    console.log(blogs)
    setBlogs(blogs.blogs)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    dispatch({type: 'BLOG_ADDED', payload: newBlog})
    setTimeout(() => {
      dispatch({type: 'RESET'})
    }, 5000);
    
  }

  const blogForm = () => {
    return(
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      })
      const allUsers = await usersService.users()
      setUsers(allUsers)
      window.localStorage.setItem("allBlogUsers", JSON.stringify(allUsers))
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setShowAll(false)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch({type: 'USER_ERROR'})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogUser");
    window.localStorage.removeItem("allBlogUsers")
    setUser(null)
    setShowAll(true)
    setUsers([])
  }
  
  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

  const handleRemoveBlog = async (blogToDelete) => {
    const confirm = window.confirm(`Are you sure you want to delete ${blogToDelete.user.name}'s ${blogToDelete.title}`)
    if (confirm) {
      blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      dispatch({type: 'BLOG_DELETE', payload: blogToDelete})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blogToUpdate) => {
    blogService.update(blogToUpdate.id, blogToUpdate)
    setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : blogToUpdate))
    dispatch({type: 'BLOG_UPDATE', payload: blogToUpdate})
    setTimeout(() => {
      dispatch({type: 'RESET'})
    }, 10000)
  }
  
  const navigationBar = {
    padding: 10
  }

  return (
    <div>
      <Router>
        {/* NAV BAR */}
        <div>
          <Link style={navigationBar} to="/">Your Blogs</Link>
          <Link style={navigationBar} to="/users">Users</Link>
          {user ? <em style={navigationBar}>{user.name} is logged in.</em> : <em style={navigationBar}>NO ONE IS LOGGED IN</em>}
        </div>
      <h2>Blogs</h2>
      {notification}
      
        <Routes>
          <Route
            path="/"
            element=
              {!user ?
                <LoginForm 
                  handleLogin={handleLogin} 
                  username={username} 
                  handlePasswordChange={({target}) => setPassword(target.value)} 
                  password={password} 
                  handleUsernameChange={({target}) => setUsername(target.value)}
                /> :
                <div>
                  <p>{user.name} is logged in. username is {user.username}<button onClick={logoutHandler}>Logout</button></p>
                  {blogForm()}
                  {blogs.sort(byLikes).map(blog =>
                    <Blog 
                      key={blog.id} 
                      blog={blog}
                      user={user} 
                      handleRemoveBlog={handleRemoveBlog} 
                      handleUpdateBlog={handleUpdateBlog}
                    />
                  )}
                </div>
              }
            
          />
          <Route
              path="/users"
              element={
                <div>
                  <h3>Users</h3>
                  {users.map(user =>
                      <User key={user.id} user={user}/>
                  )}
                </div>
              }
            />
          <Route
            path='/users/:userId'
            element= {
              <UserBlogs />
            }
          />
          <Route
            path="/blogs/:blogId"
            element = {
              <SelectedBlog />
            }
          />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App


