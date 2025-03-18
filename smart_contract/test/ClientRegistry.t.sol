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

    function testCreateAgreement() public {
        vm.prank(user);
        clientRegistry.onboardClient();

        paymentToken.mint(user, 1000 ether);
        vm.prank(user);
        paymentToken.approve(address(serviceAgreement), 100 ether);

        vm.prank(user);
        serviceAgreement.createAgreement(paymentToken, 10 ether);

        (address client, , uint256 budget, bool active) = serviceAgreement
            .agreements(user);

        assertEq(client, user, "User should be the same!");
        assertEq(budget, 10 ether, "The buddget should be 100 ether.");
        assertTrue(active, "The agreement should bw active.");

        uint256 userBalance = paymentToken.balanceOf(user);

        assertEq(userBalance, 990 ether, "The use should have 990 ether");
    }
}
