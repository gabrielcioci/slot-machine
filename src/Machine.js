import React, { Component } from 'react';
import './Machine.scss';
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
			slot3: 'server',
			slot4: 'clock',
			slot5: 'server',
			slot6: 'knoxon',
			slot7: 'terminal',
			slot8: 'router',
			slot9: 'clock'
		};
		this.spin = this.spin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.startgame = this.startgame.bind(this);
	}

	spin() {
		this.setState({ spinning: true });
		this.setState((ns) => ({ score: ns.score - 10 }));
		spinAudio.play();

		//spin timer
		setTimeout(() => {
			this.setState({ spinning: false });

			//generating new slots
			const newSlot1 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot2 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot3 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot4 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot5 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot6 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot7 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot8 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			const newSlot9 = this.props.slots[Math.floor(Math.random() * this.props.slots.length)];
			this.setState({
				slot1: newSlot1,
				slot2: newSlot2, //mid slot
				slot3: newSlot3,
				slot4: newSlot4,
				slot5: newSlot5, //mid slot
				slot6: newSlot6,
				slot7: newSlot7,
				slot8: newSlot8, //mid slot
				slot9: newSlot9
			});

			if (this.state.score < 10) {
				this.setState({ playable: false, startgame: false });
			}
			//winning
			//win rate: (5/125)*100 = 4%
			if (newSlot2 === newSlot5 && newSlot5 === newSlot8) {
				this.setState({ isWinner: true });
				this.setState((ws) => ({ score: ws.score + 50 }));
				winAudio.play();
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
						<Slot
							className="slot"
							slotimg1={this.state.slot1}
							slotimg2={this.state.slot2}
							slotimg3={this.state.slot3}
						/>
					)}
					{this.state.spinning ? (
						<Animation speed="2.5" className="anim" />
					) : (
						<Slot
							className="slot"
							slotimg1={this.state.slot4}
							slotimg2={this.state.slot5}
							slotimg3={this.state.slot6}
						/>
					)}
					{this.state.spinning ? (
						<Animation speed="2.1" className="anim" />
					) : (
						<Slot
							className="slot"
							slotimg1={this.state.slot7}
							slotimg2={this.state.slot8}
							slotimg3={this.state.slot9}
						/>
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
