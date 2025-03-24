// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Clones} from "../lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ServiceAgreement} from "./ServiceAgreement.sol";
// import {ClientRegistry} from "./ClientRegistry.sol";
import {IERC6551Registry} from "./interfaces/IERC6551Registry.sol";

contract AgreementFactory {
    using Clones for address;

    address public template;
    IERC6551Registry public immutable erc6551Registry;
    address public immutable agentNFT;

    mapping(string => string) public ipfsHashes;

    event AgreementDeployed(address indexed client, address agreement);

    constructor(address _agentNFT, address _erc6551Registry) {
        agentNFT = _agentNFT;
        erc6551Registry = IERC6551Registry(_erc6551Registry);
        template = address(new ServiceAgreement());
    }

    function createAgreement(
        address client,
        ERC20 _paymentToken,
        ServiceAgreement.Milestone[] memory milestones
    ) external returns (address) {
        for (uint256 i = 0; i < milestones.length; i++) {
            address agentAccount = erc6551Registry.createAccount(
                agentNFT,
                milestones[i].approvedAgent,
                block.chainid,
                bytes32(uint256(uint160(address(0)))),
                0
            );
            milestones[i].approvedAgent = agentAccount;
        }
        address agreement = template.clone();
        ServiceAgreement(agreement).initialize(
            client,
            _paymentToken,
            milestones
        );

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
