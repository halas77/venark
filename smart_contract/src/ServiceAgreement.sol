// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {EIP712} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {SignatureChecker} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol";

contract ServiceAgreement is EIP712, ReentrancyGuard {
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
        address approvedAgent;
        bool isApproved;
    }

    // state varibles
    address public client;
    ERC20 public paymentToken;
    Milestone[] public milestones;
    Status public status;

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

    // modifiers
    modifier onlyActive() {
        require(status == Status.Active, "Agreement inactive");
        _;
    }

    // initialization
    constructor() EIP712("Venark", "1.0") {}

    // ======== CORE FUNCTIONS ========

    function initialize(
        address _client,
        ERC20 _paymentToken,
        Milestone[] memory _milestone
    ) external {
        if (client != address(0)) {
            revert ServiceAgreement__InvalidCaller();
        }
        client = _client;
        paymentToken = _paymentToken;
        for (uint256 i = 0; i < _milestone.length; i++) {
            milestones.push(_milestone[i]);
        }
        status = Status.Active;
    }

    function approveMilestone(
        uint256 milestoneId,
        bytes calldata agentSignature
    ) public onlyActive nonReentrant {
        if (milestoneId < 0 || milestoneId >= milestones.length) {
            revert ServiceAgreement__InvalidMilestoneId();
        }

        Milestone storage milestone = milestones[milestoneId];

        if (milestone.isApproved) {
            revert ServiceAgreement__MilestoneAlreadyApproved();
        }

        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(_MILESTONE_TYPEHASH, address(this), milestoneId)
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                client,
                digest,
                agentSignature
            )
        ) {
            revert ServiceAgreement__InvalidSignature();
        }

        milestone.isApproved = true;
        paymentToken.transfer(milestone.approvedAgent, milestone.paymentAmount);

        emit MilestoneApproved(milestoneId, milestone.approvedAgent);
        emit PaymentReleased(milestone.paymentAmount, milestone.approvedAgent);

        if (milestoneId == milestones.length - 1) {
            status = Status.Completed;
        }
    }

    function cancelAgreement() external onlyActive nonReentrant {
        if (msg.sender != client) {
            revert ServiceAgreement__InvalidCaller();
        }

        status = Status.Canceled;
        uint256 balance = paymentToken.balanceOf(address(this));
        paymentToken.transfer(client, (balance * 90) / 100);
        paymentToken.transfer(
            milestones[0].approvedAgent,
            (balance * 10) / 100
        );
    }
}
