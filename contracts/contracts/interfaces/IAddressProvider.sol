pragma solidity ^0.8.0;

interface IAddressProvider {
    function getContractsRegister() external view returns (address);
    function getDataCompressor() external view returns (address);
}
