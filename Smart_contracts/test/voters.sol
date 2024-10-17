 // SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;


error CollegeVoting__AlreadyVoted();
contract CollegeVoting {

    address public i_owner;
    uint256 _cand_id;
    uint256 totalVotes;

    constructor() 
    {
        i_owner = msg.sender;
        
    }


event afterVote (uint256 indexed c_id,uint256 indexed totalVote);
     

struct Candidate  {
        string firstName;
        string surName;
        uint256 Ref_year;
        string college;
        uint256 votes;
        uint256 cand_id;
        string position;


    }


    struct university {
        string universityName;
        string location;
        address universityAdd;

    }

// candidate array and mapping 
mapping (uint256  => Candidate) candidateMapping;
    Candidate [] candidateArray;



/*voter's struct, array and mapping */

    struct Voter {
        address voterId;
        string college;
        uint256 Ref_year;
        bool voted;


    }

Voter [] voterArray ;
mapping (address => Voter) voterMapping;
mapping(address =>mapping(uint256 => bool)) public User;

/*whitelist ADDRESSES for voting */
address [] whitelistAddress;

/*register for election*/

function registerAsVoter (string memory _college, uint256 _year) public {
Voter memory newVoter = Voter ({
        voterId: msg.sender,
        college: _college,
        Ref_year:_year,
        voted:false
});

voterMapping [msg.sender] = newVoter;

voterArray.push (newVoter);

}



/***register the candidate ***/

/**create the proposal/ idea to make a vote for **/


function votersWhitelistForElection () public  {

        for (uint256 i; i<whitelistAddress.length; i++){

                require (whitelistAddress[i] !=msg.sender,"Already whitelisted");
                        whitelistAddress.push (msg.sender);
                
        }


}


function registerCandidate (string memory _firstName,string memory _surName,string memory _college,uint256 _year, string memory _position) public {

    Candidate memory newCand = Candidate({
        firstName: _firstName,
        surName:_surName,
        Ref_year: _year,
        college: _college,
        votes:  0,
        cand_id: _cand_id,
        position: _position
    });

    
    candidateMapping[_cand_id] = newCand;
    candidateArray.push (newCand);
    _cand_id ++;


}

/**** voting methods */

function makevote (uint256 candidateAddress) public hasVoted (candidateAddress)
{
 
 for (uint i; i<candidateArray.length ; i++){
     if (candidateArray[i].cand_id == candidateAddress){
         candidateArray[i].votes +=1;
     }
 }
 candidateMapping[candidateAddress].votes += 1;
    voterMapping[msg.sender].voted = true;
    User [msg.sender][candidateAddress] = true;
    totalVotes +=1;
    emit afterVote  (candidateAddress,totalVotes);
}


//
function returnCandidates () public view returns (Candidate [] memory){
    return candidateArray;
}


function getCandWithId (uint256 id) public view returns (Candidate memory) {
    return candidateMapping[id];
}

 function endElectionWithResults () public ownerOnly returns (Candidate memory){

    uint256 value;
    for (uint i; i<candidateArray.length ; i++){
        if (candidateArray[i].votes >= 0){
            

        }

    }

}

 /*MODIFIERS */
    modifier ownerOnly()  {
        require(msg.sender == i_owner, "Admin Account is required");
        _;
    }

     modifier hasVoted(uint256 _id)  {
         
        require (User[msg.sender][_id] ==false, "Already voted to this cand");
        _;
    }

}  
