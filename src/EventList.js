import React, { Component } from "react";
import Event from "./Event";
import { Col } from "react-bootstrap";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
        {events.map((event) => (
          <Col key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </>
    );
  }
}

export default EventList;
