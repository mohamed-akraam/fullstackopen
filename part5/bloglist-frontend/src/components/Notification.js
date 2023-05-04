const Notification = ({ notification, className }) => {
  if (notification !== null) {
    return (
    <h2 className={className}>{notification}</h2>
    )
  }
}

export default Notification;