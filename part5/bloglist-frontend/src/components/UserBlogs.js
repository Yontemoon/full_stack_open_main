import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import blogServices from '../services/blogs'
import userServices from '../services/users'

const UserBlog = (props) => {
    const [usersBlogs, setUsersBlogs] = useState([])
    const userId = useParams().userId
    console.log(userId)
    useEffect(() => {
        userServices.getUsersBlogs(userId).then(response => {
            console.log(response)
            setUsersBlogs(response.blogs)
        })
    },[])
    return (
        <div>
            <h2>All blogs from user</h2>
            <ul>
                {usersBlogs.map(userBlog =>
                    <li key={userBlog.id}>
                        <div >
                            <Link to={`/blogs/${userBlog.id}`}>{userBlog.title}</Link>
                        </div>
                    </li> 
                )}
            </ul>
        </div>
    )
}

export default UserBlog