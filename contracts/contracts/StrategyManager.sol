pragma solidity ^0.8.0;

import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {IAddressProvider} from "./interfaces/IAddressProvider.sol";
import {IDataCompressor} from "./interfaces/IDataCompressor.sol";
import {UserVault} from "./UserVault.sol";
import {DataTypes} from "./libraries/data/Types.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract StrategyManager {
    IAddressProvider private addressProvider;
    IDataCompressor private dataCompressor;

    struct User {
        address addr;
        address userVault;
        uint256 timeFrame;
        uint256 windowSize;
        address riskyAsset;
        address collateralAsset;
    }
    mapping(address => User) private userVaults;
    address[] users;

    event StrategyOpened(
        address indexed user,
        address indexed collateral,
        uint256 amount
    );

    event Rebalance(
        address indexed user,
        uint256 direction,
        uint256 amount,
        address asset
    );

    constructor(address _geabboxAddressProvider, address _dataCompressorAddress)
    {
        addressProvider = IAddressProvider(_geabboxAddressProvider);
        dataCompressor = IDataCompressor(_dataCompressorAddress);
    }

    function createStrategy(
        address _creditManager,
        uint256 _timeFrame,
        uint256 _windowSize,
        uint256 _amount,
        address _collateralAsset,
        address _riskyAsset,
        address _univ2Adapter,
        address _yearnVault,
        uint256 _leverageFactor
    ) public {
        UserVault userVault = new UserVault(
            _creditManager,
            address(dataCompressor),
            _univ2Adapter,
            _collateralAsset,
            _riskyAsset,
            _yearnVault,
            _leverageFactor
        );
        address userVaultAddress = address(userVault);
        User memory user = User(
            msg.sender,
            userVaultAddress,
            _timeFrame,
            _windowSize,
            _riskyAsset,
            _collateralAsset
        );

        users.push(msg.sender);

        IERC20Upgradeable token = ERC20Upgradeable(_collateralAsset);
        token.transferFrom(msg.sender, userVaultAddress, _amount);
        userVault.openStrategy(_amount);
        userVaults[msg.sender] = user;

        emit StrategyOpened(msg.sender, _collateralAsset, _amount);
    }

    function rebalance(address _userVaultAddress, uint256 _direction) public {
        (uint256 direction, uint256 amount, address asset) = UserVault(
            _userVaultAddress
        ).rebalance(_direction);
        emit Rebalance(_userVaultAddress, direction, amount, asset);
    }

    function getUserVault(address _user)
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            address,
            address
        )
    {
        User memory user = userVaults[_user];

        return (
            user.addr,
            user.userVault,
            user.timeFrame,
            user.windowSize,
            user.riskyAsset,
            user.collateralAsset
        );
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getCreditAccountData(address _user)
        public
        view
        returns (DataTypes.CreditAccountData memory)
    {
        User memory user = userVaults[_user];
        return UserVault(user.userVault).getCreditAccountData();
    }
}
