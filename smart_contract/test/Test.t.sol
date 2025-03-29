// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test} from "forge-std/Test.sol";
import {ClientRegistry} from "../src/ClientRegistry.sol";
import {ServiceAgreement} from "../src/ServiceAgreement.sol";
import {AgreementFactory} from "../src/AgreementFactory.sol";

import {ERC20Mock} from "../lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol";

contract testContracts is Test {
    ClientRegistry public clientRegistry;
    AgreementFactory public agreementFactory;
    ERC20Mock public paymentToken;
    address aiAgent = address(1234);
    ServiceAgreement public agreement;

    address public user = address(1);
    address public user1 = address(345);
    address public user2 = address(678);

    function setUp() public {
        clientRegistry = new ClientRegistry();
        agreementFactory = new AgreementFactory(address(clientRegistry));
        paymentToken = new ERC20Mock();
        agreement = new ServiceAgreement();
        paymentToken.mint(user, 10000000000 ether);
    }

    function testOnboardUser() public {
        vm.prank(user);
        clientRegistry.onboardClient();
        bool result = clientRegistry.isOnboarded(user);
        assertTrue(result, "The user must be onboarded");
    }

    function testCreateAgreement() public {
        ServiceAgreement.Milestone[]
            memory milestones = new ServiceAgreement.Milestone[](2);

        milestones[0] = ServiceAgreement.Milestone({
            paymentAmount: 10 ether,
            isApproved: false
        });

        milestones[1] = ServiceAgreement.Milestone({
            paymentAmount: 20 ether,
            isApproved: false
        });

        paymentToken.mint(user2, 200 ether);

        vm.prank(user2);
        clientRegistry.onboardClient();

        vm.prank(user2);
        paymentToken.approve(address(agreementFactory), 150 ether);

        vm.prank(user2);
        address agreement2 = agreementFactory.createAgreement(
            user1,
            user2,
            address(paymentToken),
            100 ether,
            milestones
        );

        assertTrue(
            agreement2 != address(0),
            "Agreement address should not be zero"
        );
    }

    function testSetIPFSHash() public {
        string memory companyName = "venark";
        string memory companyHash = "12121213121312";

        agreementFactory.setIPFSHash(companyName, companyHash);

        string memory comapny = agreementFactory.ipfsHashes(companyName);

        assertEq(companyHash, comapny);
    }

    function testDepositFund() public {
        ServiceAgreement.Milestone[]
            memory milestones = new ServiceAgreement.Milestone[](2);

        milestones[0] = ServiceAgreement.Milestone({
            paymentAmount: 10 ether,
            isApproved: false
        });

        milestones[1] = ServiceAgreement.Milestone({
            paymentAmount: 20 ether,
            isApproved: false
        });

        paymentToken.mint(user2, 200 ether);

        vm.prank(user2);
        clientRegistry.onboardClient();

        vm.prank(user2);
        address myAgreement = agreementFactory.createAgreement(
            user1,
            user2,
            address(paymentToken),
            100 ether,
            milestones
        );
        vm.prank(user2);
        paymentToken.approve(myAgreement, 100 ether);

        ServiceAgreement(myAgreement).depositPayment();

        uint256 balance = paymentToken.balanceOf(myAgreement);

        assertEq(balance, 100 ether, "The contract must recieve fund.");
    }

    function testApproveMilestone() public {
        ServiceAgreement.Milestone[]
            memory milestones = new ServiceAgreement.Milestone[](2);

        milestones[0] = ServiceAgreement.Milestone({
            paymentAmount: 10 ether,
            isApproved: false
        });

        milestones[1] = ServiceAgreement.Milestone({
            paymentAmount: 20 ether,
            isApproved: false
        });

        paymentToken.mint(user2, 200 ether);

        vm.prank(user2);
        clientRegistry.onboardClient();

        vm.prank(user2);
        address myAgreement = agreementFactory.createAgreement(
            user1,
            user2,
            address(paymentToken),
            100 ether,
            milestones
        );
        vm.prank(user2);
        paymentToken.approve(myAgreement, 100 ether);

        ServiceAgreement(myAgreement).depositPayment();
        ServiceAgreement(myAgreement).approveMilestone(0);

        (
            uint256 retrivedPaymentAmount,
            bool retrivedIsApproved
        ) = ServiceAgreement(myAgreement).milestones(0);

        uint256 balance = paymentToken.balanceOf(myAgreement);
        uint256 daoBalance = paymentToken.balanceOf(user1);

        assertEq(
            balance,
            100 ether - retrivedPaymentAmount,
            "The contrat must approve the payment"
        );

        assertEq(
            daoBalance,
            retrivedPaymentAmount,
            "The dao should accept the milestone fund."
        );

        assertTrue(retrivedIsApproved, "The milestone status must be true");
    }
}
