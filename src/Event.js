import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <Card className="event">
        <Card.Body>
          <h2 className="summary">{event.summary}</h2>

          <Card.Text className="start-date">{event.start.dateTime}</Card.Text>
          <Card.Text className="start-timezone">
            ({event.start.timeZone})
          </Card.Text>
          <Card.Text className="location">
            @{event.summary} | {event.location}
          </Card.Text>
          <button
            variant="outline-info"
            className={`details-button ${collapsed ? "show" : "hide"}-details`}
            onClick={this.handleClick}
          >
            {collapsed ? "Show Details" : "Hide Details"}
          </button>

          {!collapsed && (
            <div
              className={`extra-details ${
                this.state.collapsed ? "hide" : "show"
              }`}
            >
              <h6>About the event:</h6>
              <a
                className="details-link"
                href={event.htmlLink}
                rel="noreferrer"
                target="_blank"
              >
                See details
              </a>
              <Card.Text className="event-description">
                {event.description}
              </Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}
export default Event;
