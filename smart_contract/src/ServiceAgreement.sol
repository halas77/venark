// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IERC20} from "../lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {SignatureChecker} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol";
import {AgreementFactory} from "./AgreementFactory.sol";

contract ServiceAgreement is ReentrancyGuard {
    // enums
    enum Status {
        Active,
        Completed,
        Canceled
    }

    // structs
    struct Milestone {
        bytes32 descriptionHash;
        uint256 paymentAmount;
        bool isApproved;
    }

    // state varibles
    address public client;
    address public paymentToken;
    Milestone[] public milestones;
    Status public status;
    address public dao;
    uint256 public budget;

    // EIP-712 Domain for AI agent signatures
    bytes32 private constant _MILESTONE_TYPEHASH =
        keccak256("ApproveMilestone(uint256 agreementId,uint256 milestoneId)");

    // events
    event MilestoneApproved(uint256 indexed milestoneId, address agent);
    event PaymentReleased(uint256 amount, address agent);

    // errors
    error ServiceAgreement__MilestoneAlreadyApproved();
    error ServiceAgreement__InvalidSignature();
    error ServiceAgreement__InvalidCaller();
    error ServiceAgreement__InvalidMilestoneId();
    error ServiceAgreement__PaymentFailed();

    // modifiers
    modifier onlyActive() {
        require(status == Status.Active, "Agreement inactive");
        _;
    }

    // initialization
    constructor() {}

    // ======== CORE FUNCTIONS ========

    function initialize(
        address _dao,
        address _client,
        address _paymentToken,
        uint256 _budget,
        Milestone[] memory _milestone
    ) external {
        if (client != address(0)) {
            revert ServiceAgreement__InvalidCaller();
        }
        dao = _dao;
        client = _client;
        paymentToken = _paymentToken;
        budget = _budget;

        for (uint256 i = 0; i < _milestone.length; i++) {
            milestones.push(_milestone[i]);
        }
        status = Status.Active;
    }

    function approveMilestone(
        uint256 _milestoneId
    ) public onlyActive nonReentrant {
        if (_milestoneId < 0 || _milestoneId >= milestones.length) {
            revert ServiceAgreement__InvalidMilestoneId();
        }

        Milestone storage milestone = milestones[_milestoneId];

        if (milestone.isApproved) {
            revert ServiceAgreement__MilestoneAlreadyApproved();
        }

        milestone.isApproved = true;
        IERC20(paymentToken).transfer(dao, milestone.paymentAmount);

        emit MilestoneApproved(_milestoneId, dao);
        emit PaymentReleased(milestone.paymentAmount, dao);

        if (_milestoneId == milestones.length - 1) {
            status = Status.Completed;
        }
    }

    function cancelAgreement() external onlyActive nonReentrant {
        if (msg.sender != client) {
            revert ServiceAgreement__InvalidCaller();
        }

        status = Status.Canceled;
        uint256 balance = IERC20(paymentToken).balanceOf(address(this));
        IERC20(paymentToken).transfer(client, (balance * 90) / 100);
        IERC20(paymentToken).transfer(dao, (balance * 10) / 100);
    }

    function getMilestonesLength() external view returns (uint256) {
        return milestones.length;
    }
}
