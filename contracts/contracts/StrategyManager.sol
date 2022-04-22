pragma solidity ^0.8.0;

contract StrategyManager {
    struct User {
        address addr;
        address userVault;
        uint256 timeFrame;
        uint256 windowSize;
    }
    mapping(address => User) private userVault;
    address[] users;

    constructor() {}

    function rebalance(address _userVault, uint256 _direction) public {}

    function getUserVault(address _user)
        public
        returns (
            address,
            address,
            uint256,
            uint256
        )
    {
        User memory user = userVault[_user];

        return (user.addr, user.userVault, user.timeFrame, user.windowSize);
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }
}
