import React from 'react';
import Header from './Header';
import TeamBoard from './TeamBoard'
import Popup from './Popup'
import Splash from './Splash'
import {Button} from 'react-bootstrap'

class App extends React.Component {
  state = {
    pageHeader: 'Retro',
    category: this.props.initialCategory,
    showPopup: false,
    selectTeam: "",
    selectSprint: ""
  }
  togglePopup() {
   this.setState({
     showPopup: !this.state.showPopup
   });
 }
  onselectTeam = (team) => {
    this.setState({ selectTeam: team})
  }
  onselectSprint = (sprint) =>{
    this.setState({ selectSprint: sprint})
  }
  render() {
    return (
      <div className="App">
        <Splash/>
      </div>
    );
  }
}

export default App;
