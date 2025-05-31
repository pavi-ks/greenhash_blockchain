// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract GreenHashData {
    address public owner;
    uint public predictionFee;
    uint public freeDuration = 60; // 60 seconds free reuse window
    string[] public ipfsCIDs;


        // Struct to store user prediction details
    struct UserActivity {
        string predictionType;
        string ipfsCID;
        uint timestamp;
    }

    // Mapping to store each user's prediction history
    mapping(address => UserActivity[]) public userActivities;

    mapping(address => uint) public lastPaidCropAt;
    mapping(address => uint) public lastPaidFertilizerAt;
    mapping(address => uint) public predictionsUsed;

    event CIDUploaded(string cid, address indexed uploader);
    event PaymentReceived(address indexed user, uint amount);
    event PredictionAccessed(address indexed user, string predictionType);

    constructor(uint _fee) {
        owner = msg.sender;
        predictionFee = _fee;
    }

    // Pay for both predictions (or we can split this if needed)
    function payForPrediction() external payable {
        require(msg.value >= predictionFee, "Insufficient Ether sent");
        lastPaidCropAt[msg.sender] = block.timestamp;
        lastPaidFertilizerAt[msg.sender] = block.timestamp;
        emit PaymentReceived(msg.sender, msg.value);
    }

    function canPredictCrop(address user) external view returns (bool) {
        return block.timestamp - lastPaidCropAt[user] < freeDuration;
    }

    function canPredictFertilizer(address user) external view returns (bool) {
        return block.timestamp - lastPaidFertilizerAt[user] < freeDuration;
    }



    function recordPrediction(string memory predictionType, string memory cid) external {
        if (keccak256(bytes(predictionType)) == keccak256(bytes("crop"))) {
            require(block.timestamp - lastPaidCropAt[msg.sender] < freeDuration, "Crop prediction not paid");
        } else if (keccak256(bytes(predictionType)) == keccak256(bytes("fertilizer"))) {
            require(block.timestamp - lastPaidFertilizerAt[msg.sender] < freeDuration, "Fertilizer prediction not paid");
        } else {
            revert("Invalid prediction type");
        }

        predictionsUsed[msg.sender]++;
        userActivities[msg.sender].push(UserActivity(predictionType, cid, block.timestamp));
        emit PredictionAccessed(msg.sender, predictionType);
    }



    function uploadCID(string calldata cid) external onlyOwner {
        ipfsCIDs.push(cid);
        emit CIDUploaded(cid, msg.sender);
    }

    function getAllCIDs() public view returns (string[] memory) {
        return ipfsCIDs;
    }

    function setPredictionFee(uint newFee) external onlyOwner {
        predictionFee = newFee;
    }

    function setFreeDuration(uint seconds_) external onlyOwner {
        freeDuration = seconds_;
    }

    // function withdraw() external onlyOwner {
    // payable(owner).transfer(address(this).balance);
    // }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function getUserActivities(address user) external view returns (UserActivity[] memory) {
    return userActivities[user];
    }

}
