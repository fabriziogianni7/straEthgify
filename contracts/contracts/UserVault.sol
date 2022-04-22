pragma solidity ^0.8.0;

import {ICreditManager} from "./interfaces/ICreditManager.sol";
import {IUniV2Adapter} from "./interfaces/IUniV2Adapter.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {DataTypes} from "./libraries/data/Types.sol";
import {IDataCompressor} from "./interfaces/IDataCompressor.sol";

contract UserVault {
    // 0: Started, 1: Risky, 2: stable
    uint256 status = 0;
    address collateralAsset;
    address riskyAsset;
    address yearVault;
    address dataCompressorAddress;
    uint256 leverageFactor;
    ICreditManager private creditManager;
    IUniV2Adapter private uniV2Adapter;
    IDataCompressor private dataCompressor;

    constructor(
        address _creditManagerAddress,
        address _dataCompressorAddress,
        address _univ2Adapter,
        address _collateralAsset,
        address _riskyAsset,
        address _yearnVault,
        uint256 _leverageFactor
    ) {
        collateralAsset = _collateralAsset;
        yearVault = _yearnVault;
        riskyAsset = _riskyAsset;
        leverageFactor = _leverageFactor;
        creditManager = ICreditManager(_creditManagerAddress);
        uniV2Adapter = IUniV2Adapter(_univ2Adapter);
        dataCompressor = IDataCompressor(_dataCompressorAddress);
    }

    function openStrategy(uint256 _amount) public {
        ERC20Upgradeable(collateralAsset).approve(
            address(creditManager),
            _amount
        );
        creditManager.openCreditAccount(
            _amount,
            address(this),
            leverageFactor,
            0
        );
    }

    function rebalance(uint256 _direction)
        public
        returns (
            uint256 direction,
            uint256 amount,
            address asset
        )
    {
        _direction == 0
            ? (direction, amount, asset) = _goStable()
            : (direction, amount, asset) = _goRisky();

        return (direction, amount, asset);
    }

    function _swap(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path,
        address,
        uint256 deadline
    ) private returns (uint256[] memory amounts) {
        uint256[] memory amounts = uniV2Adapter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );

        return amounts;
    }

    function getCreditAccountData()
        public
        view
        returns (DataTypes.TokenBalance[] memory)
    {
        DataTypes.CreditAccountData memory data = dataCompressor
            .getCreditAccountData(address(creditManager), address(this));

        return data.balances;
    }

    function getTokenAmounts() private view returns(uint256, uint256){
        uint256 stable;
        uint256 risky;
        DataTypes.TokenBalance[] memory tokenBalances = getCreditAccountData();

        for (uint256 index = 0; index < tokenBalances.length; index++) {
            if (tokenBalances[index].token == collateralAsset) {
                stable = tokenBalances[index].balance;
            }

            if (tokenBalances[index].token == riskyAsset) {
                risky = tokenBalances[index].balance;
            }
        }

        return(stable, risky);
    }

    function _goRisky()
        private
        returns (
            uint256 direction,
            uint256 amount,
            address asset
        )
    {
        address[] memory path = new address[](2);

        //TODO: Move this to vars on contract creation
        path[0] = collateralAsset; //USDC
        path[1] = riskyAsset; //WETH

        (uint256 stableAmount, ) = getTokenAmounts();

        uint256[] memory amounts = _swap(
            stableAmount, //TODO: Create a function to get USDC balance on credit manager
            0, //TODO: Calculate amountOutMin
            path,
            address(this),
            1750391703 //TODO: Calculate Deadline
        );

        return (1, amounts[1], address(this));
    }

    function _goStable()
        private
        returns (
            uint256 direction,
            uint256 amount,
            address asset
        )
    {
        return (0, 1, address(this));
    }
}
