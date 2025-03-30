// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
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

    // events
    event MilestoneApproved(uint256 indexed milestoneId, address agent);
    event PaymentReleased(uint256 amount, address agent);

    // errors
    error ServiceAgreement__MilestoneAlreadyApproved();
    error ServiceAgreement__InvalidSignature();
    error ServiceAgreement__InvalidCaller();
    error ServiceAgreement__InvalidMilestoneId();
    error ServiceAgreement__PaymentFailed();
    error ServiceAgreement__AreadyInitialized();
    error ServiceAgreement__ContractNotInitilized();

    // modifiers
    modifier onlyActive() {
        require(status == Status.Active, "Agreement inactive");
        _;
    }

    // ======== CORE FUNCTIONS ========

    function initialize(
        address _dao,
        address _client,
        address _paymentToken,
        uint256 _budget,
        Milestone[] memory _milestone
    ) external {
        if (client != address(0)) {
            revert ServiceAgreement__AreadyInitialized();
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

    function depositPayment() external onlyActive nonReentrant {
        if (client == address(0)) {
            revert ServiceAgreement__ContractNotInitilized();
        }
        IERC20(paymentToken).transferFrom(client, address(this), budget);
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

        IERC20(paymentToken).transfer(dao, milestone.paymentAmount);
        milestone.isApproved = true;

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
}
