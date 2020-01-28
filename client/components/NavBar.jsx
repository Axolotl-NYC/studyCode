import React, { Component } from 'react';

// class to render our main app 
class NavBar extends Component {

  render() {
    const unitsArr = this.props.units;
    /*
     * Modularize adding the units 
     */

    const unitsLinks = [];

    for (let i = 0; i < unitsArr.length; i += 1) {
      unitsLinks.push(<li><a href={`/${unitsArr[i].unit}`} >{unitsArr[i].unit}</a></li>)
    }

    console.log(unitsLinks);

    return (
      <div>
        <h1 id='appTitle'>CS Study Planner</h1>
        <nav id='navBar'>
        <ul id='navbarList'>
          {/* <li><a href={`/${unitsArr[0].unit}`} >{unitsArr[0].unit}</a></li>
          <li><a href={`/${unitsArr[1].unit}`}>{unitsArr[1].unit}</a></li>
          <li><a href={`/${unitsArr[2].unit}`}>{unitsArr[2].unit}</a></li>
          <li><a href={`/${unitsArr[3].unit}`}>{unitsArr[3].unit}</a></li> */}
          { unitsLinks }
        </ul>
        </nav>
      </div>
    )
  }
}



export default NavBar;