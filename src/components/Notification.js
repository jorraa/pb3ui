import React from 'react'

const Notification = ({ message ,className}) => {
  if (message === null) {
    return null
  }
console.log("className", className)
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification