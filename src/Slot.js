import React, { Component } from 'react';

// const knoxon = require('./assets/knoxon.png');
// const terminal = require('./assets/terminal.png');
// const server = require('./assets/server.png');
// const router = require('./assets/router.png');
// const clock = require('./assets/clock.png');

class Slot extends Component {
	render() {
		return <img className="slot" alt="slot" src={require(`./assets/${this.props.slotimg}.png`)} />;
	}
}

export default Slot;
