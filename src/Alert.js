import React, { Component } from "react";
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#6DDEFF";
  }
}
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#FA8562";
  }
}

class OfflineAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#B9EB80";
  }
}

export { InfoAlert, ErrorAlert, OfflineAlert };
