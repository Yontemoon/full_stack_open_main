import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import blogService from '../services/blogs'
const SelectedBlog = (props) => {
    const [blog, setBlog] = useState({})
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState("")

    const blogId = useParams().blogId
    
    useEffect(() => {
        blogService.getSpecificBlog(blogId).then(response => {
            console.log(response.comments)
            console.log(response)
            setBlog(response)
            setComments(response.comments)
        })
    },[])

    const addLike = async () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        await blogService.update(blogId, updatedBlog)

        setBlog(updatedBlog)
    }

    const addComment = async (event) => {
        event.preventDefault()
        const commentObject = {
            comment: commentInput
        }
        await blogService.addNewComment(blogId, commentObject)
        setComments(comments.concat(commentObject))
        setCommentInput("")
    }

    return (
        <div>
            <h2>
                {blog.title}
            </h2>
            <div>
                {blog.url}
            </div>
            <div>
                {blog.likes} <button onClick={addLike}>Like Me</button>
            </div>
            <div>
                Added by {blog.author}
            </div>
            <h3>Comments</h3>
                <form onSubmit={addComment}>
                    <div>
                        <input value={commentInput} onChange={event => setCommentInput(event.target.value)}/> 
                        <button type="submit">Add Comment</button>
                    </div>
                </form>
                {comments.map(comment => (
                    <ul key={comment.comment}>
                        <li>
                            {comment.comment}
                        </li> 
                    </ul>   
                ))}
        </div>
    )

}

export default SelectedBlog