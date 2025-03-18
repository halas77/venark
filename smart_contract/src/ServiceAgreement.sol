// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ClientRegistry} from "./ClientRegistry.sol";

contract ServiceAgreement {
    ClientRegistry public registry;

    struct Agreement {
        address client;
        ERC20 paymentToken;
        uint256 budget;
        bool active;
    }

    // mapping
    mapping(address => Agreement) public agreements;

    // error
    error ServiceAgreement__UserNotFound();
    error ServiceAgreement__TransactionFaild();

    // events
    event AgreementCreated(address indexed client, ERC20 token, uint256 budget);

    constructor(address _registry) {
        registry = ClientRegistry(_registry);
    }

    function createAgreement(ERC20 paymentToken, uint256 budget) external {
        if (!registry.isOnboarded(msg.sender)) {
            revert ServiceAgreement__UserNotFound();
        }

        bool success = paymentToken.transferFrom(
            msg.sender,
            address(this),
            budget
        );

        if (!success) {
            revert ServiceAgreement__TransactionFaild();
        }

        agreements[msg.sender] = Agreement({
            client: msg.sender,
            paymentToken: paymentToken,
            budget: budget,
            active: true
        });

        emit AgreementCreated(msg.sender, paymentToken, budget);
    }
}
