import React, { Component } from "react";
import Event from "./Event";
import { Col } from "react-bootstrap";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="event-list">
        {events.map((event) => (
          <Col key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </ul>
    );
  }
}

export default EventList;
