import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {

  // inelegant way of reRendering the page after a change has been made
  // reRender() {
  //   const unitId = this.props.id;

  //   const flashCardsURL = `/units/${unitId}`;

  //   fetch(flashCardsURL)
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({
  //       flashCards: data,
  //       didLoad: true,
  //     }, () => console.log('STATE AFTER SETTING STATE',this.state));
  //   })
  //   .catch(err => console.log('ERROR IN FLASHCARDS:', err));
  // }

  addFlashCard() {
    /*
      Function to add a new flashCard to our database
    */
    const addFlashCardURL = `/units/${this.props.id}`

    fetch(addFlashCardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
      }),
    }
    )
    .then(res => res.json())
    .then(() => this.reRender())
    .catch(err => console.log('err:', err));
  }

  updateCurrentFlashCardsAndResources() {
    const unitId = this.props.currentUnitData.id.toString();
    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
      .then((response) => response.json())
      .then((data) => {
        this.props.updateDrilledState({
            currentFlashCards: data.flashCards,
            currentResources: data.resources,
          })
      }).catch((error) => console.log('ERROR IN FLASHCARDS: ', error));
  }

  // componentDidMount() {
  //   this.updateCurrentFlashCardsAndResources();
  // }

  componentDidUpdate(previousProps) {
    console.log('compo update?', previousProps.currentFlashCards !== this.props.currentFlashCards)
      if (previousProps.currentFlashCards === this.props.currentFlashCards) {
        this.updateCurrentFlashCardsAndResources();
      }
  }

  render() {
    /***
     * conditonally render to get state
     * a bit slow need to come back and refactor/fix
     */
    if (this.props.currentUnitData === null) {
      return <h1>WE LOADING BABY</h1>
    }

    return (
      <div className="container">
        <h1>{ this.props.currentUnitData.unit }</h1>
        <div className="outerBox">
            { this.props.currentFlashCards !== null ?
              <div>
                <Description
                  description={ this.props.currentUnitData.description }
                  sub_units={ this.props.currentUnitData.sub_units } />
                <FlashCardsContainer
                  flashCards={ this.props.currentFlashCards }
                  id={ this.props.currentUnitData.id.toString() }
                  addFlashCard={ this.addFlashCard }
                  reRender={ this.reRender } />
              </div> :
              <div></div> }
              {/*
                            <Resources
                resources={ this.state.resources } />
              */}
        </div>
      </div>
    );
  }
}

export default UnitContainer;