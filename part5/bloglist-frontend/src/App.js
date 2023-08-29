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
  // const [newBlogTitle, setNewBlogTitle] = useState("")
  // const [newBlogAuthor, setnewBlogAuthor] = useState("")
  // const [newBlogUrl, setnewBlogUrl] = useState("")
  // const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef();
  // const userRef = userRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  },[])

  //NEED TO UPDATE THIS...
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
  })  
  }, [])

  // const loginForm = () => {
  //   const hideWhenVisible = {display: loginVisible ? "none" : ""};
  //   const showWhenVisible = {display: loginVisible ? "" : "none"};

  //   return (
  //     <div>
  //       <div style={showWhenVisible}>
  //         <button onClick={() => setLoginVisible(true)}>Log in</button>
  //       </div>
  //       <div style={hideWhenVisible}>
  //         <LoginForm 
  //           notificationMessage={notificationMessage} 
  //           handleLogin={handleLogin} 
  //           username={username} 
  //           handlePasswordChange={({target}) => setPassword(target.value)} 
  //           password={password} 
  //           handleUsernameChange={({target}) => setUsername(target.value)}
  //         />
  //         <button onClick={() => setLoginVisible(false)}>Cancel</button>
  //       </div>
  //     </div>
  //   )
  // }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    })
  }

  const blogForm = () => {
    return(
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    )
  }



  // const handleBlogChange = (setterFunction) => (event) => {
  //   setterFunction(event.target.value)
  // }



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


  const blogsToShow = showAll ? blogs : blogs.filter(blog => blog.user.username === user.username)

  // const blogForm = () => {
  //   return (
  //     <div>
  //       <h3>{user.username} has logged in</h3>
  //       <button onClick={changeLogin}>Logout</button>
  //       <form onSubmit={addBlog}>
  //         <div>
  //           Title:
  //           <input value={newBlogTitle} onChange={handleBlogChange(setNewBlogTitle)}/>
  //         </div>
  //         <div>
  //           Author:
  //           <input value={newBlogAuthor} onChange={handleBlogChange(setnewBlogAuthor)}/>
  //         </div>
  //         <div>
  //           URL:
  //           <input value={newBlogUrl} onChange={handleBlogChange(setnewBlogUrl)}/>
  //         </div>
  //         <button type="submit">Create</button>
  //       </form>
  //   </div>
  //   )
  // }

  // const FilterBlogPosts = () => {
  //   // console.log(user)
  //   const filteredBlogs = blogs.filter(blog =>
  //     blog.user.username === user.username)
  //     // console.log(filteredBlogs)
    
  //   return filteredBlogs.map(blog =>
  //     <Blog key={blog.id} blog={blog}/>
  //   )
  // }

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null)
    setShowAll(true)
  }
  

  // if (user === null) {
  //   return loginForm()
  // }
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
        <p>{user.name} is logged in. <button onClick={logoutHandler}>Logout</button></p>
        {blogForm()}
      </div>}
      {/* {FilterBlogPosts()} */}
      {/* <form onSubmit={addBlog}>
        <div>
          Blog Title:
          <input value={newBlog} onChange={handleBlogChange}/>
        </div>
        <button type="submit">Save</button>
      </form> */}

      {/* {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
      {blogsToShow.map(blog =>
            <Blog key={blog.id} blog={blog} username={user.name}/>
            )}
      
    </div>
  )
}

export default App


