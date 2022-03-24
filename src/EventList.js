import React, { Component } from "react";
import Event from "./Event";
import { OfflineAlert } from "./Alert";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        {!navigator.onLine ? (
          <OfflineAlert text="You are offline! The events displayed won't be updated!" />
        ) : (
          <OfflineAlert text="" />
        )}
        <ul className="EventList">
          {events.map((event) => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
