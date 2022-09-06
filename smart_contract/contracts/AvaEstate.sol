// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract AvaEstate is ERC721URIStorage {

    uint256 propertyId = 0;
    address payable public contractOwner;

    uint256[] properties;
    mapping(uint256 => bool) public listedProperty;

    constructor() ERC721('AvaEstate', 'AVAE') {
        contractOwner = payable(msg.sender);
    }

    function mintEstateToken(string memory _uriData) public payable {
        require(msg.value == 0.1 ether, "Please make sure your metamask have more than 0.1 ether");
        sendViaCall(contractOwner);
        _mint(msg.sender, propertyId);
        _setTokenURI(propertyId, _uriData);
        properties.push(propertyId);
        listedProperty[propertyId] = true;
        propertyId++;
    }

    function sendViaCall(address payable _to) private {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Ether transactions failed");
    }

    function getProperties() view public returns (uint256[] memory) {
        return properties;
    }

    function burnToken(uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "You can only burn your own token");
        _burn(_tokenId);
    }

}