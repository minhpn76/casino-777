// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IERC20 {

  function totalSupply() external view returns (uint256);
  function balanceOf(address _owner) external view returns (uint256 balance);
  function allowance(address _owner, address _spender) external view returns (uint256 remaining);

  function transfer(address _to, uint256 _value) external returns (bool success);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
  

contract Casino is IERC20 {
  using SafeMath for uint256;

  string public constant name = "LuckyDays";
  string public constant symbol = "LDY";
  uint8 public constant decimals = 18;

  mapping(address => uint256) balances;
  mapping(address => mapping (address => uint256)) allowed;

  uint256 totalSupply_;

  constructor(uint256 total) {
      totalSupply_ = total;
      balances[msg.sender] = totalSupply_;
  }

  function totalSupply() public override view returns (uint256) {
      return totalSupply_;
  }

  function balanceOf(address tokenOwner) public override view returns (uint256) {
      return balances[tokenOwner];
  }

  function transfer(address receiver, uint256 numTokens) public override returns (bool) {
      require(numTokens <= balances[msg.sender]);
      balances[msg.sender] = balances[msg.sender].sub(numTokens);
      balances[receiver] = balances[receiver].add(numTokens);
      emit Transfer(msg.sender, receiver, numTokens);
      return true;
  }

  function approve(address delegate, uint256 numTokens) public override returns (bool) {
      allowed[msg.sender][delegate] = numTokens;
      emit Approval(msg.sender, delegate, numTokens);
      return true;
  }

  function allowance(address owner, address delegate) public override view returns (uint) {
      return allowed[owner][delegate];
  }

  function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
      require(numTokens <= balances[owner]);
      require(numTokens <= allowed[owner][msg.sender]);

      balances[owner] = balances[owner].sub(numTokens);
      allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
      balances[buyer] = balances[buyer].add(numTokens);
      emit Transfer(owner, buyer, numTokens);
      return true;
  }

}

library SafeMath {
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

