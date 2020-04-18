import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";
import cuid from "cuid";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }
  return { event };
};

const actions = {
  createEvent,
  updateEvent,
};
class EventForm extends Component {
  state = {
    ...this.props.event,
  };

  componentDidMount = () => {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent,
      });
    }
  };

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`)
    } else {
      const newEvent = {
        ...this.state,
        id : cuid(),
        hostPhotoURL : "/assets/user.png"
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`)
    }
  };

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    const { title, date, city, venue, hostedBy } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              placeholder="First Name"
              value={title}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              type="date"
              placeholder="Event Date"
              value={date}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              placeholder="City event is taking place"
              value={city}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              placeholder="Enter the Venue of the event"
              value={venue}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              placeholder="Enter the name of person hosting"
              value={hostedBy}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
