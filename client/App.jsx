import React, { Component } from 'react';
import UnitContainer from './containers/UnitContainer.jsx';

// class to render our main app 
class App extends Component {

  render() {

    return (
      <div>
        <h1>CodeSmith-Study</h1>
        {/* start with links in regular format then make into component */}
        <nav>
        <h3>NavBar should go here</h3>
        <ul>
          <li>Unit 1</li>
          <li>Unit 2</li>
          <li>Unit 2</li>
        </ul>
        </nav>
        {/* Want to switch to a different unit container based on which link was hit in the navbar */}
        <UnitContainer />
      </div>
    )

  }
}



export default App;