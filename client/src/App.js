import React, { useState, useEffect } from 'react';

// Web3
import Web3 from 'web3';
import Tether from './contracts/Tether.json';
import RWD from './contracts/RWD.json';
import DecentralBank from './contracts/DecentralBank.json';

import './App.css';

// Layout
import Navbar from './components/Layout/Navbar';
import ParticleSettings from './components/Layout/ParticleSettings';
import Main from './components/Main';

const App = () => {
	const [accNumber, setAccNumber] = useState('0x0');
	const [tether, setTether] = useState({});
	const [rwd, setRwd] = useState({});
	const [decentralBank, setDecentralBank] = useState({});
	const [tetherBalance, setTetherBalance] = useState('0');
	const [rwdBalance, setRwdBalance] = useState('0');
	const [stakingBalance, setStakingBalance] = useState('0');

	const [loading, setLoading] = useState(true);

	const loadWeb3 = async () => {
		let account = '';
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);

			try {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				setAccNumber(accounts[0]);
				account = accounts[0];
			} catch (error) {
				if (error.code === 4001) {
					alert('User denied account access');
				}
			}
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			alert('No ethereum browser detected. Check out Metamask.');
		}

		await loadBlockchainData(account);
	};

	const loadBlockchainData = async (account) => {
		const web3 = window.web3;
		const networkID = await web3.eth.net.getId();

		// Load Tether contract
		const tetherData = await Tether.networks[networkID];
		if (tetherData) {
			const tetherContract = new web3.eth.Contract(
				Tether.abi,
				tetherData.address
			);
			setTether(tetherContract);
			let tetBal = await tetherContract.methods.balanceOf(account).call();
			setTetherBalance(tetBal.toString());
		} else {
			alert('Tether contract not found on this network');
		}

		// Load RWD contract
		const rwdData = await RWD.networks[networkID];
		if (rwdData) {
			const rwdContract = new web3.eth.Contract(RWD.abi, rwdData.address);
			setRwd(rwdContract);
			let rwdBal = await rwdContract.methods.balanceOf(account).call();
			setRwdBalance(rwdBal.toString());
		} else {
			alert('RWD contract not found on this network');
		}

		// Load DecentralBank contract
		const decentralBankData = await DecentralBank.networks[networkID];
		if (decentralBankData) {
			const decentralBankContract = new web3.eth.Contract(
				DecentralBank.abi,
				decentralBankData.address
			);
			setDecentralBank(decentralBankContract);
			let stakingBal = await decentralBankContract.methods
				.stakingBalance(account)
				.call();
			setStakingBalance(stakingBal.toString());
		} else {
			alert('DecentralBank contract not found on this network');
		}

		setLoading(false);
	};

	useEffect(() => {
		const load = async () => {
			await loadWeb3();
		};

		load();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const load = async () => {
			await loadBlockchainData(accNumber);
		};

		if (!loading) {
			load();
		}
		// eslint-disable-next-line
	}, [loading]);

	const stakeTokens = async (amount) => {
		setLoading(true);

		try {
			await tether.methods
				.approve(decentralBank._address, amount)
				.send({ from: accNumber })
				.on('transactionHash', (hash) => {
					decentralBank.methods
						.depositTokens(amount)
						.send({ from: accNumber })
						.on('transactionHash', async (hash) => {
							setLoading(false);
						});
				});
		} catch (error) {
			if (error.code === 4001) {
				alert('User rejected transaction');
				setLoading(false);
			}
		}
	};

	const rewardTokens = async (amount) => {
		setLoading(true);

		try {
			await decentralBank.issueTokens();
			setLoading(true);
		} catch (error) {
			if (error.code === 4001) {
				alert('User rejected transaction');
				setLoading(false);
			}
		}
	};

	const unstakeTokens = async () => {
		setLoading(true);

		try {
			await decentralBank.methods
				.unstakeTokens()
				.send({ from: accNumber })
				.on('transactionHash', async (hash) => {
					setLoading(false);
				});
		} catch (error) {
			if (error.code === 4001) {
				alert('User rejected transaction');
				setLoading(false);
			}
		}
	};

	return (
		<div className='App' style={{ position: 'relative' }}>
			<div style={{ position: 'absolute' }}>
				<ParticleSettings />
			</div>
			<Navbar accNumber={accNumber} />
			<div className='container-fluid mt-5'>
				<div className='row'>
					<main
						role='main'
						className='ml-auto mr-auto'
						style={{
							maxWidth: '600px',
							minHeight: '100vm',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						{loading ? (
							<h3 className='text-center mt-3' style={{ color: 'white' }}>
								Loading Please
							</h3>
						) : (
							<Main
								tetherBalance={tetherBalance}
								rwdBalance={rwdBalance}
								stakingBalance={stakingBalance}
								stakeTokens={stakeTokens}
								unstakeTokens={unstakeTokens}
								rewardTokens={rewardTokens}
							/>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default App;
