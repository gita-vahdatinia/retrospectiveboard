import React from 'react';
import {Button, FormControl, Dropdown, Card, Form} from 'react-bootstrap'

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
 handleChange(event) {
   if (event.target.value != ""){
   this.setState({value: event.target.value});
  }
 }

  render() {
    return (
      <div className="Popup">
           <div className='popup_inner'>
             <h1>{this.props.text}</h1>
               <Form onSubmit={this.handleSubmit}>
                 <Form.Control as="select">
                  <option>Well</option>
                  <option>Bad</option>
                  <option>Action</option>
                </Form.Control>
                <Form.Group type="text" value={this.state.value} onChange={this.handleChange} controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
             <Form.Control type="submit" value="Submit" />
           </Form>
           <div className="close_popup">
             <Button onClick={this.props.closePopup}>close me</Button>
           </div>
         </div>
      </div>
    );
  }
}

export default Popup;
