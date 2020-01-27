import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flashCards: [],
      resources: [],
      didLoad: false,
    }

    this.addFlashCard = this.addFlashCard.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  // inelegant way of reRendering the page after a change has been made
  reRender() {
    const unitId = this.props.id;

    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
    .then(res => res.json())
    .then(data => {
      this.setState({
        flashCards: data,
        didLoad: true,
      }, () => console.log('STATE AFTER SETTING STATE',this.state));
    })
    .catch(err => console.log('ERROR IN FLASHCARDS:', err));
  }

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

  componentDidMount() {
    /*
     * Each page i.e. (OOP, GIT...) will have a unitContainer component.
     * Within each respective unit container component, we want to fetch flashCards and resources.
     */
    const unitId = this.props.id;

    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
    .then(res => res.json())
    .then(data => {
      this.setState({
        flashCards: data,
        didLoad: true,
      }
      );
    })
    .catch(err => console.log('ERROR IN FLASHCARDS:', err));

    const resourcesURL = `/resources/${unitId}`

    fetch(resourcesURL)
    .then(res => res.json())
    .then(data => {
      this.setState({
        resources: data,
      })
    })
    .catch(err => console.log('ERROR IN RESOURCES', err));
  }

  render() {
    /***
     * conditonally render to get state 
     * a bit slow need to come back and refactor/fix
     */
    if (!this.state.didLoad) {
      return <h1>WE LOADING BABY</h1>
    }

    return (
      <div className="container">
        <div className="outerBox">
          <Description description={this.props.description}
          sub_units={this.props.sub_units} />
          <FlashCardsContainer flashCards={this.state.flashCards} id={this.props.id} addFlashCard={this.addFlashCard}/>
          <Resources resources={this.state.resources} />
        </div>
      </div>
    );
  }
}

export default UnitContainer;