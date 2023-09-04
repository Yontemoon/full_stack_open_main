import Notification from "./Notification";

const LoginForm = ({notificationMessage, handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
    return (
      <div>
        <h2>Log in to Application....</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input type="text" value={username} name="Username" onChange={handleUsernameChange}></input>
          </div>
          <div>
            Password:
            <input type="password" value={password} name="Password" onChange={handlePasswordChange}></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}



export default LoginForm