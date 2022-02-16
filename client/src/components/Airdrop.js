import React, { useEffect, useState } from 'react';

const Airdrop = ({ stakingBalance, rewardTokens }) => {
	const [t, setT] = useState({ time: {}, seconds: 20 });

	useEffect(() => {
		let timeLeftOver = secondsToTime(t.seconds);
		setT({ time: timeLeftOver, seconds: t.seconds });

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (t.seconds > 0) {
			airdropReleaseTokens();
		} else {
			rewardTokens();
		}
		//eslint-disable-next-line
	}, [t.seconds]);

	const secondsToTime = (secs) => {
		let sec = secs;
		let minutes = Math.floor(sec / 60);
		sec = sec % 60;
		let hours = Math.floor(minutes / 60);
		minutes = minutes % 60;

		let obj = {
			h: hours,
			m: minutes,
			s: sec,
		};

		return obj;
	};

	const startTimer = () => {
		if (t.seconds > 0) {
			setTimeout(countDown, 1000);
		}
	};

	const countDown = () => {
		let secs = t.seconds - 1;
		setT({ time: secondsToTime(secs), seconds: secs });
	};

	const airdropReleaseTokens = () => {
		let stakingB = stakingBalance;
		if (parseInt(stakingB) >= 50) {
			startTimer();
		}
	};

	return (
		<div style={{ color: 'black' }}>
			{t.time.m}:{t.time.s}
		</div>
	);
};

export default Airdrop;
