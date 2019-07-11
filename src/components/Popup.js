import React from 'react';
import {Button} from 'react-bootstrap'

class Popup extends React.Component {

  render() {
    return (
      <div className="Popup">
           <div className='popup_inner'>
             <h1>{this.props.text}</h1>
           <Button onClick={this.props.closePopup}>close me</Button>
         </div>
      </div>
    );
  }
}

export default Popup;
