import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef();


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user)
      blogService.setToken(user.token)
      setShowAll(false)
      getAllBlogs()
    }
    }
  ,[])

  // NEED TO UPDATE THIS...
  // useEffect(() => {
  //   blogService.getAll().then(blogs => {
  //     setBlogs(blogs)
  // })  
  // }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  } 

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blogObject)
    console.log(newBlog)
    setBlogs(blogs.concat(newBlog))
    console.log(blogs)

    setNotificationMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added.`)
    setTimeout(() => {
      setNotificationMessage(null)
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
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setShowAll(false)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotificationMessage("Wrong credentials")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }


  // const blogsToShow = showAll === true ? blogs : blogs.filter(blog => blog.user.id === user._id)

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null)
    setShowAll(true)
  }
  
  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

  const handleRemoveBlog = async (blogToDelete) => {
    const confirm = window.confirm(`Are you sure you want to delete ${blogToDelete.user.name}'s ${blogToDelete.title}`)
    if (confirm) {
      blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setNotificationMessage(`${blogToDelete.user.name} has removed the blogpost ${blogToDelete.title}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blogToUpdate) => {
    blogService.update(blogToUpdate.id, blogToUpdate)
    setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : blogToUpdate))
    setNotificationMessage(`${blogToUpdate.user.name} has increased the likes to ${blogToUpdate.likes}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 10000)
  }


  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage}/>      
      {!user && <div>
        <LoginForm 
          notificationMessage={notificationMessage} 
          handleLogin={handleLogin} 
          username={username} 
          handlePasswordChange={({target}) => setPassword(target.value)} 
          password={password} 
          handleUsernameChange={({target}) => setUsername(target.value)}/>
        </div>
      }

      {user && <div>
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
      </div>}
    </div>
  )
}

export default App


