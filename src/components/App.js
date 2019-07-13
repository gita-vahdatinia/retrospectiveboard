import React from 'react';
import Header from './Header';
import TeamBoard from './TeamBoard'
import Popup from './Popup'
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
        <Header message={this.state.pageHeader} selectedTeam={this.onselectTeam} selectedSprint={this.onselectSprint} />
        <TeamBoard category={this.state.category} team={this.state.selectTeam} sprint={this.state.selectSprint}/>
        <div>
        <Button className="add_card" onClick={this.togglePopup.bind(this) } size="lg" >+</Button>
        {this.state.showPopup ?
         <Popup
          text='Click "Close Button" to hide popup'
          closePopup={this.togglePopup.bind(this)}
         />
         : null
        }
        </div>
      </div>
    );
  }
}

export default App;
