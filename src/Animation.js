import React, { Component } from 'react';

class Animation extends Component {
	render() {
		const time = {
			animationDuration: this.props.speed + 's'
		};
		return (
			<div className="spin-container">
				<div style={time} className="rotator">
					<span>
						<img alt="clock" src={require('./assets/clock.png')} />
					</span>
					<span>
						<img alt="knoxon" src={require('./assets/knoxon.png')} />
					</span>
					<span>
						<img alt="terminal" src={require('./assets/terminal.png')} />
					</span>
					<span>
						<img alt="router" src={require('./assets/router.png')} />
					</span>
					<span>
						<img alt="server" src={require('./assets/server.png')} />
					</span>
				</div>
			</div>
		);
	}
}

export default Animation;
