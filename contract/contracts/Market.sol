//SPDX-License-Identifier:MIT
pragma solidity ^ 0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Market is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private id;

    address payable owner;

     struct itemNFT{
        bool sale;
        address seller;
        uint id;
        uint price;
    }

    struct marketItems{
        address owner;
        string tokenURI;
        uint tokenId;
        bool listed;
    }

    mapping(uint=>itemNFT) public listings;

    mapping(uint=>marketItems) private minted;

    event status(uint tokenId,address from,address to,string data,uint price);

    uint minPrice=0.0002 ether;

    event Transaction(uint indexed id,uint price,address owner,address seller,bool sold);

    modifier isOwner{
        require(owner==msg.sender,"You are not the Owner");
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name,_symbol){
        owner=payable(msg.sender);
    }

    function mint(string calldata tokenURI) public{
        id.increment();
        uint current=id.current();
        _safeMint(msg.sender,current);
        _setTokenURI(current, tokenURI);
        minted[current]=marketItems(msg.sender,tokenURI,current,false);
        emit status(current,address(0),msg.sender,tokenURI,0);
    }

    function listNFT(uint tokenId,uint price) public {
        require(price>=minPrice,"Listing price should be atleast minmum price");
        approve(address(this),tokenId);
        transferFrom(msg.sender,address(this),tokenId);
        listings[tokenId]=itemNFT(true,msg.sender,tokenId,price);
        emit status(tokenId,msg.sender,address(this),"",price);

    }

    function buyNFT(uint tokenId) public payable {
        itemNFT memory marketToken=listings[tokenId];
        require(marketToken.seller!=msg.sender,"You can't buy your own listed NFT");
        require(marketToken.sale!=false,"Token not listed for sale");
        require(msg.value==marketToken.price,"Price not matched to the listed price");
        transferFrom(address(this),msg.sender,tokenId);
        payable(marketToken.seller).transfer(marketToken.price * 95/100);
        cancelListings(tokenId);
        minted[tokenId].owner=msg.sender;
        emit status(tokenId,address(this),msg.sender,"",0);

    }

    function cancelListing(uint tokenId) public{
        itemNFT memory marketToken=listings[tokenId];
        require(marketToken.sale!=false,"Not listed for sale");
        require(msg.sender==marketToken.seller,"Not the owner");
        transferFrom(address(this),marketToken.seller,tokenId);
        cancelListings(tokenId);
        emit status(tokenId,address(this),msg.sender,"",0);

    }

    function cancelListings(uint tokenId) private {
        listings[tokenId]=itemNFT(false,address(0),tokenId,0);
    }

    function withdrawFunds() public{
        uint balance=address(this).balance;
        require(balance>0,"Balance should be greater than 0");
        require(msg.sender==owner,"You are not the owner");  
        payable(owner).transfer(balance); 
    }

    function listAllNfts() public view returns (marketItems[] memory) {
    uint items = 0;
    uint current = id.current();

    for (uint i = 1; i <= current; i++) {
        if (minted[i].owner == msg.sender) {
            items += 1;
        }
    }

    marketItems[] memory Data = new marketItems[](items);
    items = 0;

    for (uint i = 1; i <= current; i++) {
        if (minted[i].owner == msg.sender) {
            marketItems storage nftdata = minted[i];
            Data[items] = nftdata;
            items += 1;
        }
    }

    return Data;
}
    
}