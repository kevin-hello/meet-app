import React, { Component } from "react";
import Event from "./Event";
import Col from "react-bootstrap/Col";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
        {events.map((event) => (
          <Col
            className="event-list"
            sm={12}
            md={6}
            lg={4}
            xxl={3}
            key={event.id}
          >
            <Event event={event} />
          </Col>
        ))}
      </>
    );
  }
}

export default EventList;
