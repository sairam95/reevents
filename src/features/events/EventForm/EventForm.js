/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";
import cuid from "cuid";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }
  return {
    initialValues: event,
  };
};

const actions = {
  createEvent,
  updateEvent,
};

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'The category is required'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be atleast 5 characters'})
  )(),
  city: isRequired({message: 'city is required'}),
  venue: isRequired({message: 'venue is required'}),
  date: isRequired({message: 'date is required'})
})

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];
class EventForm extends Component {
  state = {
    ...this.props.event,
    cityLatLng: {},
    venueLatLng: {}
  };

  onFormSubmit = (values) => {
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob",
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
    .then(results=> getLatLng(results[0]))
    .then(latlng=>{
      this.setState({
        cityLatLng: latlng
      })
    })
    .then(() => {this.props.change('city', selectedCity)})
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
    .then(results=> getLatLng(results[0]))
    .then(latlng=>{
      this.setState({
        venueLatLng: latlng
      })
    })
    .then(() => {this.props.change('venue', selectedVenue)})
  }
  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="Event title"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Give your event a name"
              />
              <Field
                name="description"
                component={TextArea}
                placeholder="Tell us About your event"
              />
              <Header sub color="teal" content="Event Location details" />
              <Field
                name="city"
                component={PlaceInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder="Event city"
              />
              <Field
                name="venue"
                component={PlaceInput}
                options={
                  {
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }
                }
                onSelect={this.handleVenueSelect}
                placeholder="Event venue"
              />
              <Field
                name="date"
                component={TextInput}
                placeholder="Event date"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button
                type="button"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "EventForm", validate })(EventForm));
