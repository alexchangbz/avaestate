// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract AvaEstate is ERC1155 {

    uint256 propertyId = 0;
    address payable contractOwner;

    struct Property {
        uint256 price;
        uint256 estate_size;
        string title;
        string description;
        string estate_type;
        string estate_address;
        string email;
        string estate_status;
        string[] imageUrl;
    }

    mapping(uint256 => Property) properties;

    constructor() ERC1155('') {
        contractOwner = payable(msg.sender);
    }

    function mintEstateToken(
        uint256 _price, 
        uint256 _size, 
        string memory _title, 
        string memory _description,
        string memory _type,
        string memory _address,
        string memory _email,
        string memory _state,
        string[] memory _imageUrl
    ) public payable {
        require(msg.value == 0.1 ether, "Please make sure your metamask have more than 0.1 ether");
        sendViaCall(contractOwner);
        Property memory _property = Property(
            _price,
            _size,
            _title,
            _description,
            _type,
            _address,
            _email,
            _state,
            _imageUrl  
        );
        properties[propertyId] = _property;
        _mint(msg.sender, propertyId, 1, "");
        propertyId++;
    }

    function updateEmail(string memory _email, uint256 _propertyId) public {
        require(balanceOf(msg.sender, _propertyId) == 1, "You are not the owner of the property.");
        properties[_propertyId].email = _email;
    }

    function sendViaCall(address payable _to) private {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Ether transactions failed");
    }
    
}