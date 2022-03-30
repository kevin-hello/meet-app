import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { OfflineAlert } from "./Alert";
import { Container, Col, Row } from "react-bootstrap";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount,
    });
    this.updateEvents(currentLocation, eventCount);
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <Container className="App" fluid>
        <Row>
          <h1 className="meet-title">Meet App</h1>
          <h3>Choose your nearest city</h3>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </Row>
        <Row className="number-events-input">
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            updateNumberOfEvents={this.updateNumberOfEvents}
          />
        </Row>
        <Row>
          <h3>Events in each city</h3>
        </Row>
        <Row className="data-vis-wrapper">
          <EventGenre className="pie-chart" events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 50, right: 20, bottom: 20, left: 20 }}>
              <text
                x="50%"
                y={20}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
              >
                <tspan fontSize="26">Number of Events by City</tspan>
              </text>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="Number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Row>
        <Row>
          <Col md={12}>
            {!navigator.onLine ? (
              <OfflineAlert text="You are offline! The events displayed won't be updated!" />
            ) : (
              <OfflineAlert text="" />
            )}
          </Col>
          <EventList events={this.state.events} />
        </Row>
        <Row>
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
