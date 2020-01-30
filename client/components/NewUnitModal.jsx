import React from 'react';

function NewUnitModal (props) {
  return (
    <div>
      <h1>New Unit Submission</h1>
        <form>
          Unit Name:<br></br>
          <input id="unit-name" type="text" name="unit-name" /><br></br>
          Unit Description:<br></br>
          <input id="unit-description" type="text" name="unit-description" /><br></br>
          Sub-Units:<br></br>
          <input id="sub-units" type="text" name="sub-units" /><br></br>
          <button onClick={ props.addUnit } value="Add Unit" className="addUnit" type="button">Add Unit</button>
        </form>
    </div>
  )
}

export default NewUnitModal;