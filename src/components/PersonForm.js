import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName}
          onChange={props.handleNameChange}/>
      </div>
      <div>number: <input value={props.newNumber}
        onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  addPerson: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired
}

export default PersonForm