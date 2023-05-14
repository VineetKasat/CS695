// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("My NFT", "NFT") {}

    function mint() public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _tokenIds.increment();
    }

    function transfer(address from, address to, uint256 tokenId) public payable {
    require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");

    // Calculate the price of the NFT and transfer it to the seller
    uint price = 1 ether; // Set the price of the NFT
    address payable seller = payable(ownerOf(tokenId)); // Get the address of the seller
    seller.transfer(price);

    // Transfer ownership of the NFT from the seller to the buyer
    _transfer(from, to, tokenId);
}

}

