import PropTypes from 'prop-types'

const User = ({user}) => {
    return (
        <div>
            {user.username} {user.blogs.length}
        </div>
    )
}

User.propTypes = {
    user: PropTypes.string
}

export default User