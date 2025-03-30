// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {ServiceAgreement} from "./ServiceAgreement.sol";
import {ClientRegistry} from "./ClientRegistry.sol";

contract AgreementFactory {
    using Clones for address;

    // state varibles
    address public template;
    ClientRegistry clientRegistry;

    // mapping
    mapping(string => string) public ipfsHashes;
    mapping(address => address) public agreementContracts;

    // error
    error AgreementFactory__UserNotFound();

    // events
    event AgreementDeployed(address indexed client, address agreement);

    constructor(address _clientRegistry) {
        template = address(new ServiceAgreement());
        clientRegistry = ClientRegistry(_clientRegistry);
    }

    function createAgreement(
        address dao,
        address client,
        address _paymentToken,
        uint256 _budget,
        ServiceAgreement.Milestone[] memory milestones
    ) external returns (address) {
        if (!clientRegistry.isOnboarded(msg.sender)) {
            revert AgreementFactory__UserNotFound();
        }

        address agreement = template.clone();
        ServiceAgreement(agreement).initialize(
            dao,
            client,
            _paymentToken,
            _budget,
            milestones
        );

        agreementContracts[msg.sender] = agreement;

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
