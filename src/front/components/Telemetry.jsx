import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';

export default class Telemetry extends Component {

  static timer = null;

  componentWillMount() {
    if (!this.timer) {
      this.timer = setInterval(() => this.pollTelemetryAPI(), 5 * 1000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async pollTelemetryAPI() {
    const res = await fetch('/api/device/telemetry');
    const telemetry = await res.json();

    this.setState({ telemetry });
  }

  render() {
    if (!this.state || !this.state.telemetry) {
      return '';
    }

    const {
      temperature,
      humidity,
    } = this.state.telemetry;

    return (
      <div>
        <Navbar.Text>
          温度: {temperature} ℃
        </Navbar.Text>
        <Navbar.Text>
          湿度: {humidity} %
        </Navbar.Text>
      </div>
    );
  }
}
