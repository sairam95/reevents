import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class EventListAttende extends Component {
  componentDidMount() {
    console.log("[EventListAttende.js]: componentDidMount")
  }
  componentDidUpdate(){
    console.log("[EventListAttende.js]: componentDidUpdate")
  }
  render() {
    const { attendee } = this.props;
    return (
      <List.Item>
        <Image as='a' size='mini' circular src={attendee.photoURL} />
      </List.Item>
    );
  }
}

export default EventListAttende;
