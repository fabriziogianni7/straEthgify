pragma solidity ^0.8.0;

interface IYearnV2 {
    function deposit(uint256 amount, address) external returns (uint256);
}
