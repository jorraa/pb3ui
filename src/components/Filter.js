import React from 'react'

const Filter = (props) => 
<p>
    filter shown with: <input value={props.newFilter}
    onChange={props.handleFilterChange}/>
</p>
export default Filter