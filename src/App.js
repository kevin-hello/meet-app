import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(null, numberOfEvents)
    );
  };

  updateEvents = (location = null, eventCount = null) => {
    this.mounted = true;
    getEvents().then((events) => {
      const locationEvents =
        location === "all" || !location
          ? events
          : events.filter((event) => event.location === location);

      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(
            0,
            eventCount || this.state.numberOfEvents
          ),
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList
          events={this.state.events}
          numberOfEvents={this.state.numberOfEvents}
        />
      </div>
    );
  }
}

export default App;
