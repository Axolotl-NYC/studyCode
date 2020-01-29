import React, { Component } from 'react';

// class to render our main app 
class NavBar extends Component {

  render() {
    const unitsArr = this.props.units;
    /*
     * Modularize adding the units
     */

    const unitsLinks = [];
    // Array now reverses so the navBar displays in learning order istead of backwards.
    // However... prior group set the DB ID's for units out of order as well. Will look
    // into changing if possible.
    for (let i = unitsArr.length - 1; i >= 0 ; i -= 1) {
      unitsLinks.push(<li key={ `nav-bar list item ${ unitsArr[i].id }` }><a id={`nav-bar-id${ unitsArr[i].id }`} onClick={ (e) => this.props.updateCurrentUnit(e) }>{ unitsArr[i].unit }</a></li>)
    }

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