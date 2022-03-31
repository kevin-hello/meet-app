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
      <>
        <Container className="App" fluid>
          <Row className="justify-content-center">
            <h1 className="meet-title">Meet App</h1>
          </Row>
          <Row className="justify-content-center">
            <h4 className="subheaders">Choose your nearest city</h4>
          </Row>
          <Row className="justify-content-center">
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
          </Row>
          <Row className="number-events-input justify-content-center">
            <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateNumberOfEvents={this.updateNumberOfEvents}
            />
          </Row>
          <Row className="justify-content-center">
            <h4 className="subheaders">Events in each city</h4>
          </Row>
          <Row className="data-vis-wrapper">
            <EventGenre className="pie-chart" events={this.state.events} />
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
              >
                <text
                  x="50%"
                  y={20}
                  fill="#FBCA57"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  <tspan fontSize="30">Number of Events by City</tspan>
                </text>
                <CartesianGrid />
                <XAxis
                  type="category"
                  dataKey="city"
                  name="City"
                  tick={{ fill: "#FBCA57", fontSize: "0.7em" }}
                />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="Number of events"
                  tick={{ fill: "#FBCA57" }}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#FBCA57" />
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
          </Row>
          <Row>
            <EventList events={this.state.events} />
          </Row>
        </Container>
        <Container>
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        </Container>
      </>
    );
  }
}

export default App;
