// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ClientRegistry is ERC721 {
    // state vaiables
    uint256 public totalSupply;

    // mapping
    mapping(address => bool) public isOnboarded;

    // errors
    error ClientRegistry__InsuffcientNFT();
    error ClientRegistry__AlreadyOnboadred();

    // events
    event ClientOnboarded(address indexed user, uint256 totalSupply);

    constructor() ERC721("Ventark NFT", "VENTA") {}

    function onboardClient() external {
        if (isOnboarded[msg.sender]) {
            revert ClientRegistry__AlreadyOnboadred();
        }

        _safeMint(msg.sender, totalSupply++);
        isOnboarded[msg.sender] = true;
        emit ClientOnboarded(msg.sender, totalSupply);
    }
}
