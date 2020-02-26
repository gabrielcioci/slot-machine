import React, { Component } from 'react';

import Slot from './Slot';
import Animation from './Animation';
import './Animation.scss';
import coin from './assets/coin.png';
import winning from './assets/audio/win.mp3';
import lose from './assets/audio/lose.mp3';
import spin from './assets/audio/spin.mp3';

const winAudio = new Audio(winning);
const spinAudio = new Audio(spin);
const loseAudio = new Audio(lose);

class Machine extends Component {
	static defaultProps = {
		slots: [ 'knoxon', 'terminal', 'server', 'router', 'clock' ]
	};
	constructor(props) {
		super(props);
		this.state = {
			spinning: false,
			//negativeScore:true,
			isWinner: false,
			score: '',
			playable: false,
			startgame: false,
			slot1: 'knoxon',
			slot2: 'terminal',
			slot3: 'knoxon'
		};
		this.spin = this.spin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.startgame = this.startgame.bind(this);
	}

	spin() {
		this.setState({ spinning: true });
		const newScore = this.state.score - 10;
		this.setState({ score: newScore });
		spinAudio.play();

		//spin timer
		setTimeout(() => {
			this.setState({ spinning: false });

			//generating new slots
			const newSlot1 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot2 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot3 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			this.setState({ slot1: newSlot1, slot2: newSlot2, slot3: newSlot3 });

			if (newScore < 10) {
				this.setState({ playable: false, startgame: false });
			}
			//winning
			//win rate: (5/125)*100 = 4%
			if (newSlot1 === newSlot2 && newSlot2 === newSlot3) {
				this.setState({ isWinner: true });
				let winScore = Math.floor(this.state.score + 50);
				winAudio.play();
				this.setState({ score: winScore });
			} else {
				this.setState({ isWinner: false });
				loseAudio.play();
			}
		}, 3000);
	}

	handleChange(e) {
		this.setState({ score: parseInt(e.target.value) });
		if (this.state.score > 0) this.setState({ playable: true });
	}

	handleSubmit(e) {
		e.preventDefault();
	}

	startgame() {
		this.setState({ startgame: true, playable: false });
	}

	render() {
		return (
			<div className="container">
				<h1>Enter the amount below:</h1>
				<div className="info">
					<img src={coin} alt="coin" width="35" height="35" />
					<form onSubmit={this.handleSubmit}>
						<input
							placeholder="0"
							className="scor"
							disabled={this.state.startgame}
							type="text"
							value={this.state.isWinner ? 'WIN' : this.state.score}
							onChange={this.handleChange}
						/>
					</form>
					<button disabled={!this.state.playable} onClick={this.startgame} className="start">
						Start
					</button>
				</div>
				<div className="slots-cols">
					{this.state.spinning ? (
						<Animation speed="2.3" className="anim" />
					) : (
						<Slot className="slot" slotimg={this.state.slot1} />
					)}
					{this.state.spinning ? (
						<Animation speed="2.5" className="anim" />
					) : (
						<Slot className="slot" slotimg={this.state.slot2} />
					)}
					{this.state.spinning ? (
						<Animation speed="2.1" className="anim" />
					) : (
						<Slot className="slot" slotimg={this.state.slot3} />
					)}
				</div>
				<button onClick={this.spin} disabled={this.state.spinning || !this.state.startgame} className="spin">
					SPIN
				</button>
			</div>
		);
	}
}

export default Machine;
