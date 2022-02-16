var Tether = artifacts.require('./Tether.sol');
var RWD = artifacts.require('./RWD.sol');
var DecentralBank = artifacts.require('./DecentralBank.sol');

require('chai').use(require('chai-as-promised')).should();

contract('DecentralBank', ([owner, customer]) => {
	let tether, rwd, decentralBank;

    const tokens = (number) => {
        return web3.utils.toWei(number, 'ether');
    };

	before(async () => {
        // Load contracts
		tether = await Tether.new();
		rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer all tokens to decentralBank
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // Transfer 100 mock tethers to customer
        await tether.transfer(customer, tokens('100'), {from: owner});
	});

	describe('Tether Deployment', async () => {
		it('matches name successfully', async () => {
			const name = await tether.name();
			assert.equal(name, 'Tether');
		});
	});

	describe('Reward Token Deployment', async () => {
		it('matches name successfully', async () => {
			const name = await rwd.name();
			assert.equal(name, 'Reward Token');
		});

		it('matches symbol successfully', async () => {
			const symbol = await rwd.symbol();
			assert.equal(symbol, 'RWD');
		});
	});

    describe('Decentral Bank Deployment', async () => {
		it('matches name successfully', async () => {
			const name = await decentralBank.name();
			assert.equal(name, 'Decentral Bank');
		});

        it('contract has tokens', async() => {
            const balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'));
        });

		describe('Yield Farming', async() => {
			it('rewards tokens for staking', async() => {
				let result;
				result = await tether.balanceOf(customer);
				assert.equal(result, tokens('100'), 'Customer mock wallet balance before staking');

				// Check staking for customer of 100 tokens
				await tether.approve(decentralBank.address, tokens('100'), {from: customer});
				await decentralBank.depositTokens(tokens('100'), {from: customer});

				// Check updated balance of customer
				result = await tether.balanceOf(customer);
				assert.equal(result, tokens('0'), 'Customer mock wallet balance after staking 100 tokens');

				// Check updated balance of Decentral Bank
				result = await tether.balanceOf(decentralBank.address);
				assert.equal(result, tokens('100'), 'Decentral Bank mock wallet balance after staking');

				// Is staking update
				result = await decentralBank.isStaking(customer);
				assert.equal(result.toString(), 'true', 'Customer is staking status after staking');

				// Issue tokens
				await decentralBank.issueTokens({from: owner});

				// Ensure only the owner can issue tokens
				await decentralBank.issueTokens({from: customer}).should.be.rejected;

				// Unstake tokens
				await decentralBank.unstakeTokens({from: customer});

				// Check Unstaking balances
				result = await tether.balanceOf(customer);
				assert.equal(result, tokens('100'), 'Customer mock wallet balance after unstaking');

				// Check updated balance of Decentral Bank
				result = await tether.balanceOf(decentralBank.address);
				assert.equal(result, tokens('0'), 'Decentral Bank mock wallet balance after unstaking');

				// Is staking update
				result = await decentralBank.isStaking(customer);
				assert.equal(result.toString(), 'false', 'Customer is staking status after staking');
			});
		});
	});
});
