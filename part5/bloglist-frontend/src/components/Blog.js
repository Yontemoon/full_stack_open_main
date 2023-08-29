import { useState } from 'react'
import serviceBlogs from "../services/blogs";

const Blog = ({blog, username}) => {

  const [visible, setVisible] = useState(false);
  
  const hideWhenVisible = { display: visible ? "none" : ""};
  const showWhenVisible = { display: visible ? "" : "none"};
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLikes = (blog) => {
    // e.preventDefault();
    const createBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      
    }
    // serviceBlogs.update()
  }

  return (
    <div style={blogStyle}>
      <div style ={hideWhenVisible}>
        {blog.title} || {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}<button onClick={toggleVisibility}>Hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        {/* <div>
          {blog.author}
        </div> */}
        <div>
          {username}
        </div>
        <div>
          {blog.likes} <button onClick={()=>addLikes(blog)}>Like it!</button>
        </div>
      </div>  
    </div>
  )

}

export default Blog