import React from "react";
import { Button, FormControl, Dropdown, Card, Form } from "react-bootstrap";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", category: this.props.category };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendData(this.state.category, this.state.value);
    this.props.closePopup();
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  close(event){
    event.preventDefault();
    this.props.closePopup();
  }

  render() {
    return (
      <Card className="Popup">
        <div className="popup_inner">
          <a className="close" onClick={this.close}>
            &times;
          </a>
          <Form.Label className="category_label">
            Enter what went {this.state.category} :
          </Form.Label>
          <Form onSubmit={this.handleSubmit.bind()}>
            <Form.Group
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Control
              type="submit"
              value="Submit"
              className="submit_button"
            />
          </Form>
        </div>
      </Card>
    );
  }
}

export default Popup;
