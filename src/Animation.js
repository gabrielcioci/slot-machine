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
						<img alt="clock" src={require('./assets/originals/clock.png')} />
					</span>
					<span>
						<img alt="knoxon" src={require('./assets/originals/knoxon.png')} />
					</span>
					<span>
						<img alt="terminal" src={require('./assets/originals/terminal.png')} />
					</span>
					<span>
						<img alt="router" src={require('./assets/originals/router.png')} />
					</span>
					<span>
						<img alt="server" src={require('./assets/originals/server.png')} />
					</span>
				</div>
			</div>
		);
	}
}

export default Animation;
