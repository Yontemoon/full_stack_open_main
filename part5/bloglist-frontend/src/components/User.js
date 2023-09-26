import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const User = ({user, handleUserBlogs}) => {
    return (
        <div>
            <Link to={`/users/${user.id}`} >{user.username}</Link> {user.blogs.length}
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object,
    handleUserBlogs: PropTypes.func
}

export default User