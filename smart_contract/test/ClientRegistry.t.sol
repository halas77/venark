// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test} from "forge-std/Test.sol";
import {ClientRegistry} from "../src/ClientRegistry.sol";
import {ServiceAgreement} from "../src/ServiceAgreement.sol";
import {AgreementFactory} from "../src/AgreementFactory.sol";

import {ERC20Mock} from "../lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol";

contract testClientRegistry is Test {
    ClientRegistry public clientRegistry;
    AgreementFactory public agreementFactory;
    ERC20Mock public paymentToken;
    address dao = address(1234);

    address public user = address(1);
    address public deployer = address(this);

    function setUp() public {
        clientRegistry = new ClientRegistry();
        agreementFactory = new AgreementFactory(dao, address(clientRegistry));
        paymentToken = new ERC20Mock();

        paymentToken.mint(user, 1000 ether);
    }

    function testCreateAgreement() public {
        vm.prank(user);
        clientRegistry.onboardClient();

        bool result = clientRegistry.isOnboarded(user);
        assertTrue(result, "The user must be onboarded");
    }
}
