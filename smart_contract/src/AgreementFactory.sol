// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Clones} from "../lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";
import {ServiceAgreement} from "./ServiceAgreement.sol";

// import {ClientRegistry} from "./ClientRegistry.sol";

contract AgreementFactory {
    using Clones for address;

    address public template;

    mapping(string => string) public ipfsHashes;

    event AgreementDeployed(address indexed client, address agreement);

    constructor() {
        template = address(new ServiceAgreement());
    }

    function createAgreement(
        address dao,
        address client,
        address _paymentToken,
        uint256 _budget,
        ServiceAgreement.Milestone[] memory milestones
    ) external returns (address) {
        address agreement = template.clone();
        ServiceAgreement(agreement).initialize(
            dao,
            client,
            _paymentToken,
            _budget,
            milestones
        );

        bool success = IERC20(_paymentToken).transferFrom(
            msg.sender,
            agreement,
            _budget
        );

        if (!success) {
            revert("Payment Failed.");
        }

        emit AgreementDeployed(client, agreement);
        return agreement;
    }

    function setIPFSHash(
        string memory companyName,
        string memory ipfsHash
    ) external {
        ipfsHashes[companyName] = ipfsHash;
    }
}
