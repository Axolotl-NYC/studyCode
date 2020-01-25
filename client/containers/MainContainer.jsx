import React from 'react';
import UnitTopics from '../components/UnitTopics.jsx';
import Cards from './Cards.jsx';

class MainContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Header/Navbar</h1>
          { /* Start adding components here... */}
          <UnitTopics />
          <Cards />
        </div>
      </div>
    );
  }
}

export default MainContainer;