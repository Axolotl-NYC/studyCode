import React, { Component } from 'react';

// class to render our main app 
class NavBar extends Component {

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
        <h1 id='appTitle'>CS Study Planner</h1>
        <nav id='navBar'>
        <ul id='navbarList'>
          <li><a id='navLinks' href={`/${unitsArr[0].unit}`} >{unitsArr[0].unit}</a></li>
          <li><a id='navLinks' href={`/${unitsArr[1].unit}`}>{unitsArr[1].unit}</a></li>
          <li><a id='navLinks' href={`/${unitsArr[2].unit}`}>{unitsArr[2].unit}</a></li>
          <li><a id='navLinks' href={`/${unitsArr[3].unit}`}>{unitsArr[3].unit}</a></li>
        </ul>
        </nav>
      </div>
    )

  }
}



export default NavBar;