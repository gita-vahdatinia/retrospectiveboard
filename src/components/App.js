import React from 'react';
import Header from './Header';
import TeamBoard from './TeamBoard'
import Popup from './Popup'
import Splash from './Splash'
import {Button} from 'react-bootstrap'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

class App extends React.Component {
  state = {
    pageHeader: 'Retro',
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
    pushState(
      {selectSprint: sprint},
      `/${this.state.selectTeam}/${sprint}`
    )
  }
  render() {
    return (
      <div className="App">
      <Header message={this.state.pageHeader} selectedTeam={this.onselectTeam} selectedSprint={this.onselectSprint} />
      <TeamBoard category={this.state.category} team={this.state.selectTeam} sprint={this.state.selectSprint}/>

        </div>
    );
  }
}

export default App;
