// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.21 <8.10.0;

contract Tether {
    string public name = 'Tether';
    string public symbol = 'USDT';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address=>uint256) public balanceOf;
    mapping(address=>mapping (address=>uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        // require that the balance is greater or equal to the amount to be transferred
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // emit the transfer event
        emit Transfer(msg.sender, _to, _value);
        return true; 
    }

    function approve(address _spender, uint256 _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success) {
        // require that the spender has enough tokens to transfer
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        // transfer the amount
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[msg.sender][_from] -= _value;
        // emit the transfer event
        emit Transfer(_from, _to, _value);
        return true;
    }
}