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
}
