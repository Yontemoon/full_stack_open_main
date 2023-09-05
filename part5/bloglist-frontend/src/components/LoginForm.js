import Notification from "./Notification";
import PropTypes from 'prop-types'


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

// const LoginForm = (props) => {
//   return (
//     <div>
//       <h2>Log in to Application....</h2>
//       <Notification message={props.notificationMessage} />
//       <form onSubmit={props.handleLogin}>
//         <div>
//           Username:
//           <input type="text" value={props.username} name="Username" onChange={props.handleUsernameChange}></input>
//         </div>
//         <div>
//           Password:
//           <input type="password" value={props.password} name="Password" onChange={props.handlePasswordChange}></input>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

LoginForm.propTypes = {
  notificationMessage: PropTypes.string,
  handleLogin: PropTypes.func,
  username: PropTypes.string,
  handleUsernameChange: PropTypes.func,
  password: PropTypes.string,
  handlePasswordChange:PropTypes.func,
}

export default LoginForm