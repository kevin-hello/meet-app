import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: "",
      });
    } else {
      this.setState({
        numberOfEvents: value,
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <br></br>
        <p>Number of Events:</p>
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
