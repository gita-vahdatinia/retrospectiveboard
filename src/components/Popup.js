import React from 'react';
import {Button, FormControl, Dropdown, Card, Form} from 'react-bootstrap'

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', category: this.props.category};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    this.setState({value: this.state.value});
    event.preventDefault();
  }
 handleChange(event) {
   this.setState({value: event.target.value});
 }

  render() {
    return (
      <Card className="Popup">

           <div className='popup_inner'>
             <Form.Control type="submit" onClick={this.props.closePopup} value="Close" className="close"/>
               <Form.Label className="category_label">Enter what went {this.state.category} :</Form.Label>

           <Form onSubmit={this.handleSubmit}>
                <Form.Group type="text" value={this.state.value} onChange={this.handleChange} controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
             <Form.Control type="submit" value="Submit" className="submit_button"/>
           </Form>
         </div>
      </Card>
    );
  }
}

export default Popup;
