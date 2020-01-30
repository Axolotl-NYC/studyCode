import React from 'react';
import NewUnitModal from '../components/NewUnitModal.jsx';

class NewUnitContainer extends React.Component {
  render () {
    return (
      <section>
        <NewUnitModal
          addUnit={ this.addUnit }
        />
      </section>
    )
  }
}

export default NewUnitContainer;