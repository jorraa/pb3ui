import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={ props.className }>
      { props.message }
    </div>
  )
}

Notification.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification