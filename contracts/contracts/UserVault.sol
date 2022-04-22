pragma solidity ^0.8.0;

import {ICreditManager} from "./interfaces/ICreditManager.sol";
import {IUniV2Adapter} from "./interfaces/IUniV2Adapter.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract UserVault {
    // 0: Started, 1: Risky, 2: stable
    uint256 status = 0;
    address asset;
    address yearVault;
    uint256 leverageFactor;
    ICreditManager private creditManager;
    IUniV2Adapter private uniV2Adapter;

    constructor(
        address _creditManagerAddress,
        address _univ2Adapter,
        address _asset,
        address _yearnVault,
        uint256 _leverageFactor
    ) {
        asset = _asset;
        yearVault = _yearnVault;
        leverageFactor = _leverageFactor;
        creditManager = ICreditManager(_creditManagerAddress);
        uniV2Adapter = IUniV2Adapter(_univ2Adapter);
    }

    function openStrategy(uint256 _amount) public {
        ERC20Upgradeable(asset).approve(address(creditManager), _amount);
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
        path[0] = 0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df; //USDC
        path[1] = 0xd0A1E359811322d97991E03f863a0C30C2cF029C; //WETH

        uint256[] memory amounts = uniV2Adapter.swapExactTokensForTokens(
            10, //TODO: Create a function to get USDC balance on credit manager
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
