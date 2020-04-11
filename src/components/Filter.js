import React from 'react'
import PropTypes from 'prop-types'

const Filter = (props) =>
  <p>
    filter shown with: <input value={props.newFilter}
      onChange={props.handleFilterChange}/>
  </p>

Filter.propTypes = {
  newFilter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired
}

export default Filter