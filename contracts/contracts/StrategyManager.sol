pragma solidity ^0.8.0;

import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {UserVault} from "./UserVault.sol";

contract StrategyManager {
    IAddressProvider private addressProvider;

    struct User {
        address addr;
        address userVault;
        uint256 timeFrame;
        uint256 windowSize;
    }
    mapping(address => User) private userVaults;
    address[] users;

    constructor(address _geabboxAddressProvider) {
        addressProvider = IAddressProvider(_geabboxAddressProvider);
    }

    function createStrategy(
        address _creditManager,
        uint256 _timeFrame,
        uint256 _windowSize
    ) public {
        UserVault userVault = new UserVault();
        User memory user = User(
            msg.sender,
            address(this),
            _timeFrame,
            _windowSize
        );

        userVaults[msg.sender] = user;
    }

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
        User memory user = userVaults[_user];

        return (user.addr, user.userVault, user.timeFrame, user.windowSize);
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }
}
