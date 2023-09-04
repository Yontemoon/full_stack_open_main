import { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [visible, setVisible] = useState(false);
  const [blogObject, setBlogObject] = useState(blog)
  
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

  const addLikes = async (blog) => {
    const updateBlog = {
      ...blog,
      likes: blog.likes+1
    }
    props.handleUpdateBlog(updateBlog)
    setBlogObject(updateBlog)
  }


  const removeBlog = () => props.handleRemoveBlog(blog)

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
        <div>
          {blog.user.name}
        </div>
        <div>
          {blogObject.likes} <button onClick={()=>addLikes(blog)}>Like it!</button>
        </div>
        <div>
          <button onClick={removeBlog}>Remove</button>
        </div>
      </div>  
    </div>
  )

}

export default Blog