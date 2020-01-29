import React from 'react';

function NewUnitModal (props) {
  return (
    <div>
      <h1>New Unit Submission</h1>
        <form>
          Unit Name:<br></br>
          <input type="text" name="unit-name" /><br></br>
          Unit Description:<br></br>
          <input type="text" name="unit-description" /><br></br>
          Sub-Units:<br></br>
          <input type="text" name="sub-units" /><br></br>
          <input type="submit" value="Submit"></input>
        </form>
    </div>
  )
}

export default NewUnitModal;