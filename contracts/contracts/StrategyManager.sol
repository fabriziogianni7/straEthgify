pragma solidity ^0.8.0;

import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {UserVault} from "./UserVault.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

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

    event StrategyOpened(
        address indexed user,
        address indexed collateral,
        uint256 amount,
        address creditManager
    );

    constructor(address _geabboxAddressProvider) {
        addressProvider = IAddressProvider(_geabboxAddressProvider);
    }

    function createStrategy(
        address _creditManager,
        uint256 _timeFrame,
        uint256 _windowSize,
        uint256 _amount,
        address _asset,
        address _univ2Adapter,
        address _yearnVault,
        uint256 _leverageFactor
    ) public {
        UserVault userVault = new UserVault(
            _creditManager,
            _univ2Adapter,
            _asset,
            _yearnVault,
            _leverageFactor
        );
        address userVaultAddress = address(userVault);
        User memory user = User(
            msg.sender,
            userVaultAddress,
            _timeFrame,
            _windowSize
        );

        IERC20Upgradeable token = ERC20Upgradeable(_asset);
        token.transferFrom(msg.sender, userVaultAddress, _amount);
        userVault.openStrategy(_amount);
        userVaults[msg.sender] = user;

        emit StrategyOpened(msg.sender, _asset, _amount, _creditManager);
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
