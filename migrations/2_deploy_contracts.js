var Tether = artifacts.require('./Tether.sol');
var RWD = artifacts.require('./RWD.sol');
var DecentralBank = artifacts.require('./DecentralBank.sol');

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(Tether);
	await deployer.deploy(RWD);

	const rwd = await RWD.deployed();
	const tether = await Tether.deployed();

	await deployer.deploy(DecentralBank, rwd.address, tether.address);
	const decentralBank = await DecentralBank.deployed();

	await rwd.transfer(decentralBank.address, '1000000000000000000000000');
	await tether.transfer(accounts[1], '100000000000000000000');
};
