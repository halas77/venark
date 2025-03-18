// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ServiceAgreement is ReentrancyGuard {
    // state variables
    enum Status {
        Active,
        Completed,
        Canceled
    }

    address public client;
    ERC20 public paymentToken;
    uint256 public budget;
    // string public deliverablesCID;
    Status public status;
    address public dao;

    // errors

    error ServiceAgreement__AlreadyInitialized();
    error ServiceAgreement__AgreementNotActive();
    error ServiceAgreement__InsufficientAllowance();
    error ServiceAgreement__OnlyDAO();
    error ServiceAgreement__OnlyClient();
    error ServiceAgreement__NotActive();
    error ServiceAgreement__ExceedsBudget();

    // events
    event AgreementFunded(address indexed client, uint256 budget);
    event PaymentReleased(address to, uint256 amount);
    event AgreementCanceled(uint256 refundAmount, uint256 penalty);

    // modifiers

    modifier onlyClient() {
        if (msg.sender != client) {
            revert ServiceAgreement__OnlyClient();
        }
        _;
    }
    modifier onlyDAO() {
        if (msg.sender != dao) {
            revert ServiceAgreement__OnlyDAO();
        }
        _;
    }

    modifier onlyActive() {
        if (status != Status.Active) {
            revert ServiceAgreement__NotActive();
        }
        _;
    }

    // initailization
    constructor(address _dao) {
        dao = _dao;
    }

    // external functions
    function initialize(
        address _client,
        ERC20 _paymentToken,
        uint256 _budget // string calldata _deliverablesCID
    ) external {
        if (client != address(0)) {
            revert ServiceAgreement__AlreadyInitialized();
        }

        client = _client;
        paymentToken = _paymentToken;
        budget = _budget;
        status = Status.Active;
    }

    function fundEscrow() external onlyActive onlyClient nonReentrant {
        uint256 allowance = paymentToken.allowance(client, address(this));

        if (allowance < budget) {
            revert ServiceAgreement__InsufficientAllowance();
        }

        paymentToken.transferFrom(client, address(this), budget);
        emit AgreementFunded(client, budget);
    }

    function releasePayment(
        uint256 amount
    ) external onlyActive onlyDAO nonReentrant {
        if (amount > budget) {
            revert ServiceAgreement__ExceedsBudget();
        }

        paymentToken.transfer(dao, amount);
        emit PaymentReleased(dao, amount);

        if (paymentToken.balanceOf(address(this)) == 0) {
            status = Status.Completed;
        }
    }

    function cancelAgreement() external onlyActive onlyClient nonReentrant {
        uint256 balance = paymentToken.balanceOf(address(this));
        uint256 penality = (balance * 10) / 100;

        paymentToken.transfer(dao, penality);
        paymentToken.transfer(client, balance - penality);

        status = Status.Canceled;

        emit AgreementCanceled(balance - penality, penality);
    }
}
