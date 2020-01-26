import React, { Component } from 'react';
import UnitContainer from './containers/UnitContainer.jsx';

// class to render our main app 
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      units: [],
      postDidMount: false,
    }

  }

  componentDidMount() {

    const unitsURL = '/units'

    /* 
    when we fetch from the unitsURL, should get an array of Objects with each object representing a different unit such as OOP or Algorithms.
    Get the units from response.locals.units, or the response in the response from the fetch
    
    */
    fetch(unitsURL)
    .then(data => data.json())
    .then(data => {
      console.log('MY UNITS DATA:', data);
      this.setState({
        units: data,
        postDidMount: true,
      })
    })
    .catch(err => console.log('ERROR:', err));

    // https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3

  }


  render() {

    const unitsArr = this.state.units;
    // conditional render 
    if (!this.state.postDidMount) {
      return <h1>WE LOADING BABY</h1>;
    } 

    return (
      <div>
        <h1>CS-Study</h1>
        {/* start with links in regular format then make into component */}
        <nav>
        <h3>Pick a Unit</h3>
        <ul>
          <li><a href={`/${unitsArr[0].unit}`} >{unitsArr[0].unit}</a></li>
          <li><a href={`/${unitsArr[1].unit}`}>{unitsArr[1].unit}</a></li>
          <li><a href={`/${unitsArr[2].unit}`}>{unitsArr[2].unit}</a></li>
          <li><a href={`/${unitsArr[3].unit}`}>{unitsArr[3].unit}</a></li>
        </ul>
        </nav>
        {/* Want to switch to a different unit container based on which link was hit in the navbar */}
        {/* <UnitContainer  /> */}
      </div>
    )

  }
}



export default App;