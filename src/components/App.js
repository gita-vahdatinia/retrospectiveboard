import React from 'react';
import Header from './Header';
import TeamBoard from './TeamBoard'
import Popup from './Popup'
import {Button} from 'react-bootstrap'
class App extends React.Component {
  state = {
    pageHeader: 'Retrospective',
    category: this.props.initialCategory,
    showPopup: false
  }
  togglePopup() {
   this.setState({
     showPopup: !this.state.showPopup
   });
 }
  componentDidMount() {

  }
  componentWillUnmount() {
    // clean timers, listeners
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <TeamBoard category={this.state.category}/>
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
