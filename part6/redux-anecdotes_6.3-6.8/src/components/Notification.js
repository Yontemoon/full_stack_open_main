import { useSelector } from "react-redux"
// import notificationSlice from '../reducers/filterReducer'
// import { notifyVotes, notifyNewAnecdote } from '../reducers/notificationReducer'
const Notification = () => {
  const notification = useSelector(({notification}) => {

      return (
        <div>
          {notification}
        </div>
      )

  })
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification