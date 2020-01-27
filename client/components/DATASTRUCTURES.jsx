import React, {Component} from 'react'
import UnitContainer from '../containers/UnitContainer.jsx';

class DATASTRUCTURES extends Component {
  render() {

    const currentUnit = this.props.state;

    console.log('PASSEDDOWN STATE:', currentUnit);
    return (
      <div>
        <h1>{currentUnit.unit}</h1>
        <UnitContainer 
        description={currentUnit.description} 
        id={currentUnit.id}
        sub_units={currentUnit.sub_units} />
      </div>
    )
  }
}
export default DATASTRUCTURES;