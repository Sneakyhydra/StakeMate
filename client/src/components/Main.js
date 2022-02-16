import React, { useState } from 'react';
import Airdrop from './Airdrop';

import tether from '../tether.png';

const Main = ({
	tetherBalance,
	rwdBalance,
	stakingBalance,
	stakeTokens,
	unstakeTokens,
	rewardTokens,
}) => {
	const [tokens, setTokens] = useState('');

	const onChange = (e) => {
		setTokens(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(tetherBalance);
		console.log(tokens);
		if (
			parseInt(tokens) > 0 &&
			parseInt(tokens) <=
				parseInt(window.web3.utils.fromWei(tetherBalance, 'Ether'))
		) {
			const weiValue = window.web3.utils.toWei(tokens, 'ether');
			stakeTokens(weiValue);
		} else {
			alert('Please enter a valid amount');
		}
	};

	const withdraw = () => {
		if (stakingBalance > 0) {
			unstakeTokens();
		} else {
			alert('You have no tokens to withdraw');
		}
	};

	return (
		<div id='content' className='mt-5'>
			<table
				className='table text-muted text-center'
				style={{ backgroundColor: '#26569e', zIndex: '10', opacity: '1' }}
			>
				<thead>
					<tr style={{ color: 'white' }}>
						<th scope='col'>Staking Balance</th>
						<th scope='col'>Reward Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ color: 'white' }}>
						<td>
							{window.web3.utils.fromWei(stakingBalance, 'Ether').slice(0, 6)}{' '}
							USDT
						</td>
						<td>
							{window.web3.utils.fromWei(rwdBalance, 'Ether').slice(0, 6)} RWD
						</td>
					</tr>
				</tbody>
			</table>
			<div className='card mb-2' style={{ opacity: '0.9' }}>
				<form className='mb-3' onSubmit={onSubmit}>
					<div style={{ borderSpacing: '0 1em' }}>
						<label className='float-start' style={{ marginLeft: '15px' }}>
							<b>Stake Tokens</b>
						</label>
						<span className='float-end' style={{ marginRight: '8px' }}>
							Balance:{' '}
							{window.web3.utils.fromWei(tetherBalance, 'Ether').slice(0, 6)}{' '}
							USDT
						</span>

						<div className='input-group mb-4'>
							<input
								type='number'
								placeholder='0'
								value={tokens}
								onChange={onChange}
								required
							/>
							<div className='input-group-open'>
								<div className='input-group-text'>
									<img src={tether} alt='tether' height='32' />
									&nbsp;&nbsp;&nbsp;USDT
								</div>
							</div>
						</div>

						<button
							type='submit'
							className='btn btn-primary btn-lg'
							style={{ width: '100%' }}
						>
							Deposit
						</button>
					</div>
				</form>
				<button className='btn btn-primary btn-lg' onClick={withdraw}>
					Withdraw
				</button>
				<div className='card-body text-center' style={{ color: 'blue' }}>
					Airdrop
					<Airdrop stakingBalance={window.web3.utils.fromWei(stakingBalance, 'Ether')} rewardTokens={rewardTokens} />
				</div>
			</div>
		</div>
	);
};

export default Main;
