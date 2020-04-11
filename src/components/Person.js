import React from 'react'
import PropTypes from 'prop-types'

const Person = (props) => {
  const handleClick = (event) => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('Delete ' + event.target.name + '?')
    if(ok){
      props.handleDelete(event.target.id)
    }
  }

  return(
    <li>
      #{props.person.name}# {props.person.number }
      <button id={props.person.id} name={props.person.name} onClick={handleClick}>
        {props.text}
      </button>
    </li>
  )
}

Person.propTypes = {
  person: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Person