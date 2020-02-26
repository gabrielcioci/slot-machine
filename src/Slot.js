import React, { Component } from 'react';
import './Slot.scss';
// const knoxon = require('./assets/knoxon.png');
// const terminal = require('./assets/terminal.png');
// const server = require('./assets/server.png');
// const router = require('./assets/router.png');
// const clock = require('./assets/clock.png');

class Slot extends Component {
	render() {
		return (
			<div className="slot-imgs">
				<img alt="slot" src={require(`./assets/${this.props.slotimg1}.png`)} />
				<img alt="slot" src={require(`./assets/${this.props.slotimg2}.png`)} />
				<img alt="slot" src={require(`./assets/${this.props.slotimg3}.png`)} />
			</div>
		);
	}
}

export default Slot;
