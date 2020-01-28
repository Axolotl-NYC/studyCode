import React, { Component } from 'react';
import { render } from 'react-dom';

import './style/index.css';

// import OOP from './components/OOP.jsx';
// import DATASTRUCTURES from './components/DATASTRUCTURES.jsx';
// import GIT from './components/GIT.jsx';
// import ALGORITHMS from './components/ALGORITHMS.jsx';
import NavBar from './components/NavBar.jsx';
import UnitContainer from './containers/UnitContainer.jsx';

// creating a router component here that will be rendered to
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      units: [],
      postDidMount: false,
      currentUnitData: null,
      currentUnitId: null,
    }

    this.updateCurrentUnit = this.updateCurrentUnit.bind(this);
  }

  updateCurrentUnit(event) {
    // Updates the state with the current selection of units. Slices off the dynamically
    // generated ID from the NavBar component at the last index of the string. This ID
    // will be used to render the info comps below our nav based on selection -mp
    const currentUnitId = Number(event.target.id.slice(event.target.id.length - 1)) - 1;
    const currentUnitData = this.state.units[currentUnitId];

    this.setState({
      currentUnitId: currentUnitId,
      currentUnitData: currentUnitData,
    });
  }

  componentDidMount() {
    // fetching state after component mounts
    const unitsURL = '/units'
    fetch(unitsURL)
      .then(data => data.json())
      .then(data => {
        this.setState({
          units: data,
          postDidMount: true,
        })
      })
      .catch(err => console.log('ERROR:', err));
  }

  componentDidUpdate() {
    if (this.state.currentUnit !== null) {

    }
  }

  render() {

    if (!this.state.postDidMount) {
      return ( <h1>We LOADING BABY!</h1> )
    }

    /**
     * Need to find a better way of modularizing each of the renders
     * Each of the specific pages are the same
     * Breaking the DRY principle 
     * Would need to make a Page component that would be a route path
     */

    return (
      // <Router>
      //   <div>
      //     <Route exact path="/" render={() => <div style={{ backgroundImage: "url(https://i.ytimg.com/vi/hToEL-nNtyM/maxresdefault.jpg)", backgroundSize: "100% 100%", height: '100vh', position: 'absolute', zIndex: -1, top: 0, bottom: 0, left: 0, right: 0 }} />} />  
      //     <Route path="/" render={() => <NavBar units={this.state.units} />} />
      //     <Route path="/OOP"
      //       render={() => <OOP state={this.state.units[0]} />} />
      //     <Route path="/DATA STRUCTURES"
      //       render={() => <DATASTRUCTURES state={this.state.units[1]} />}
      //     />
      //     <Route path="/GIT and GITHUB"
      //       render={() => <GIT state={this.state.units[2]} />}
      //     />
      //     <Route path="/ALGORITHMS"
      //       render={() => <ALGORITHMS state={this.state.units[3]} />}
      //     />
      //   </div>
      // </Router>
      <section className='app-container'>
        <NavBar
          units={ this.state.units }
          updateCurrentUnit= { this.updateCurrentUnit }
        />
        { // conditional render precluded on if a NavBar selection was made, default is null.
          // Updates on NavBar selection
          this.state.currentUnitId ?
          <UnitContainer
            // this.state.currentUnit is a string, needs hard set to Number
            // for the currentUnit index
            state={ this.state.currentUnitData }
          />
          : <div></div>
        }
      </section>
    )
  }
}

render(<App />, document.getElementById('app'));