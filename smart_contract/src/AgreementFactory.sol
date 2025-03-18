// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Clones} from "../lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ServiceAgreement} from "./ServiceAgreement.sol";

contract AgreementFactory {
    // state variables
    address public immutable template;
    address public dao;
    // events
    event AgreementCreated(address indexed client, address agreement);

    // initialization
    constructor(address _dao) {
        dao = _dao;
        template = address(new ServiceAgreement(_dao));
    }

    // external functions
    function createAgreement(
        address client,
        ERC20 paymentToken,
        uint256 budget
        // string calldata deliverablesCID
    ) external returns (address) {
        address clone = Clones.clone(template);

        ServiceAgreement(clone).initialize(
            client,
            paymentToken,
            budget
        );

        emit AgreementCreated(client, clone);
        return clone;
    }
}
