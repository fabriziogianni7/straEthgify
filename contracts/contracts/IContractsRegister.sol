pragma solidity ^0.8.0;

interface IContractsRegister {
    function getCreditManagers() external view returns (address[] memory);

    function getPools() external view returns (address[] memory);
}
