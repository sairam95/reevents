import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";
import {createEvent, deleteEvent, updateEvent} from '../eventActions';

const mapState = (state) => ({
  events: state.events,
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null,
  };

  // handleIsOpenToggle = (event) => {
  //   this.setState((prevState) => ({
  //     isOpen: !prevState.isOpen,
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null,
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
    this.setState((prevState) => ({
      isOpen: false,
    }));
  };

  handleSelectEvent = (event) => {
    this.setState({
      selectedEvent: event,
      isOpen: true,
    });
  };

  handleUpdateEvents = (updatedEvent) => {
    console.log(updatedEvent);
    this.props.updateEvent(updatedEvent);
    // destructuring the prevState provided by setState method to { events}
    this.setState(({events}) => ({
      isOpen: false,
      selectedEvent: null,
    }));
  };
  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events } = this.props;
    const { isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content='Create Event'
            onClick={this.handleCreateFormOpen}
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              updateEvent={this.handleUpdateEvents}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
              selectedEvent={selectedEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
