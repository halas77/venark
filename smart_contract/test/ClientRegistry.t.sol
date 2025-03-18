// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test} from "forge-std/Test.sol";
import {ClientRegistry} from "../src/ClientRegistry.sol";
import {ServiceAgreement} from "../src/ServiceAgreement.sol";
import {ERC20Mock} from "../lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol";

contract testClientRegistry is Test {
    ClientRegistry public clientRegistry;
    ServiceAgreement public serviceAgreement;
    ERC20Mock public paymentToken;

    address public user = address(1);
    address public deployer = address(this);

    function setUp() public {
        clientRegistry = new ClientRegistry();
        serviceAgreement = new ServiceAgreement(address(clientRegistry));
        paymentToken = new ERC20Mock();
    }

    function testCreateAgreement() public {}
}
