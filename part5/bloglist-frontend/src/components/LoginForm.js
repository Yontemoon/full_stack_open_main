import PropTypes from 'prop-types'

const LoginForm = ({handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
    return (
      <div>
        <h2>Log in to Application....</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input type="text" value={username} name="Username" onChange={handleUsernameChange} id="inputUsername"></input>
          </div>
          <div>
            Password:
            <input type="password" value={password} name="Password" onChange={handlePasswordChange} id="inputPassword"></input>
          </div>
          <button type="submit" id="buttonLogin">Submit</button>
        </form>
      </div>
    );
}

LoginForm.propTypes = {
  notificationMessage: PropTypes.string,
  handleLogin: PropTypes.func,
  username: PropTypes.string,
  handleUsernameChange: PropTypes.func,
  password: PropTypes.string,
  handlePasswordChange:PropTypes.func,
}

export default LoginForm