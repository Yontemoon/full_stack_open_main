import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
        })

        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogUrl("")

    }
    return (
        <div>
            <form onSubmit={addBlog}>
            <div id="blogTitle">
                Title:
                <input value={newBlogTitle} onChange={event => setNewBlogTitle(event.target.value)} placeholder="Type title" id='inputBlogTitle'/>
            </div>
            <div id="blogAuthor">
                Author:
                <input value={newBlogAuthor} onChange={event => setNewBlogAuthor(event.target.value)} placeholder="Type author" id='inputBlogAuthor'/>
            </div>
            <div id="blogUrl">
                URL:
                <input value={newBlogUrl} onChange={event => setNewBlogUrl(event.target.value)} placeholder="Type URL" id='inputBlogUrl'/>
            </div>
            <button type="submit" id='submitBlog'>Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm