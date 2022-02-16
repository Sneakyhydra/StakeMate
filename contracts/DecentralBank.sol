// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;
  
    mapping (address => uint) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // Staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0, 'Amount must be greater than 0');

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'You must have staked tokens to unstake');

        // Transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // Reset the staking balance
        stakingBalance[msg.sender] = 0;

        // Update the staking status
        isStaking[msg.sender] = false;
    }

    // Issue reward tokens
    function issueTokens() public {
        // require owner to issue reward tokens only
        require(msg.sender==owner, 'Only owner can issue reward tokens');

        for(uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;

            if(balance > 0) {
                rwd.transfer(recipient, balance);          
            }
        }
    }
}
