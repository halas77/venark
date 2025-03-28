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
        agreementFactory = new AgreementFactory();
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
            descriptionHash: keccak256(abi.encodePacked("Milestone 1")),
            paymentAmount: 10 ether,
            isApproved: false
        });

        milestones[1] = ServiceAgreement.Milestone({
            descriptionHash: keccak256(abi.encodePacked("Milestone 2")),
            paymentAmount: 20 ether,
            isApproved: false
        });

        paymentToken.mint(user2, 200 ether);

        vm.prank(user2);
        paymentToken.approve(address(agreementFactory), 150 ether);

        vm.prank(user1);
        address agreement2 = agreementFactory.createAgreement(
            user1,
            user2,
            address(paymentToken),
            100 ether,
            milestones
        );

        uint256 len = ServiceAgreement(agreement2).getMilestonesLength();

        assertTrue(
            agreement2 != address(0),
            "Agreement address should not be zero"
        );

        assertEq(len, 2, "The milestome must be 2");
    }

    function testSetIPFSHash() public {
        string memory companyName = "venark";
        string memory companyHash = "12121213121312";

        agreementFactory.setIPFSHash(companyName, companyHash);

        string memory comapny = agreementFactory.ipfsHashes(companyName);

        assertEq(companyHash, comapny);
    }

    function testApproveMilestone() public {
         ServiceAgreement.Milestone[]
            memory milestones = new ServiceAgreement.Milestone[](2);

        milestones[0] = ServiceAgreement.Milestone({
            descriptionHash: keccak256(abi.encodePacked("Milestone 1")),
            paymentAmount: 10 ether,
            isApproved: false
        });

        milestones[1] = ServiceAgreement.Milestone({
            descriptionHash: keccak256(abi.encodePacked("Milestone 2")),
            paymentAmount: 20 ether,
            isApproved: false
        });

        paymentToken.mint(user2, 200 ether);

        vm.prank(user2);
        paymentToken.approve(address(agreementFactory), 100 ether);

        vm.prank(user1);
        address agreement2 = agreementFactory.createAgreement(
            user1,
            user2,
            address(paymentToken),
            100 ether,
            milestones
        );

        // ✅ No need to transfer manually, the factory already does it

        vm.prank(user2);
        ServiceAgreement(agreement2).approveMilestone(0);

        (, uint256 paymentAmount, bool isApproved) = ServiceAgreement(
            agreement2
        ).milestones(0);

        assert(isApproved);
        assertEq(paymentAmount, 10 ether);
        assertEq(paymentToken.balanceOf(user1), 10 ether);
    }
}
