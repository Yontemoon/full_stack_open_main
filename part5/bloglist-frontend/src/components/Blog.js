import { useState } from 'react';
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const user = props.user
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
    <div style={blogStyle} className="blog">
      <div style ={hideWhenVisible} className="visibleBlog">
        {blog.title} || {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="invisibleBlog">
        <div>
          {blog.title}<button onClick={toggleVisibility}>Hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {user.name}
        </div>
        <div className='likesNumber'>
          {blogObject.likes} <button onClick={()=>addLikes(blog)}>Like it!</button>
        </div>
        <div>
          <button onClick={removeBlog}>Remove</button>
        </div>
      </div>  
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog