let votingLocked = false;
const resultDisplay =document.getElementById("result");
const submitButton = document.getElementById("submit-button");
const voteSound = document.getElementById("vote-sound");
const voteMessage = document.getElementById("vote-message");

const votesData = {
    ViratKohli:0,
    RohitSharma:0,
    JaspritBumrah:0
};
const keyToCandidate={
    "1":"ViratKohli",
    "2":"RohitSharma",
    "3":"JaspritBumrah"
};
document.addEventListener("keydown",(event)=>{
    const key =event.key;

    if (!votingLocked && keyToCandidate[key])
    {
        const candidateName = keyToCandidate[key];
        votesData[candidateName]++;
        voteSound.play();


        voteMessage.style.display ="block";
        setTimeout(()=>{
            voteMessage.style.display = "none";
        },2000);

        votingLocked=true;
        setTimeout(()=>{
            votingLocked = false;
        },5000);

    }else if (votingLocked){
        const waitMessage= document.createElement('div');
        waitMessage.textContent = 'Please wait for 5 seconds to vote again.';
        waitMessage.style.position = 'fixed';
        waitMessage.style.top = '80%';
        waitMessage.style.left = '50%';
        waitMessage.style.transform = 'translate(-50%, -50%)';
        waitMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        waitMessage.style.color = 'white';
        waitMessage.style.padding = '10px';
        waitMessage.style.borderRadius = '5px';
        waitMessage.style.fontSize = '16px';
        waitMessage.style.zIndex = '1000';

        document.body.appendChild(waitMessage);

        setTimeout(()=>{
            waitMessage.remove();
        },3000);
    }
});
submitButton.addEventListener('click',()=>{
    const password = prompt("Enter the password to view the result:")

    if (password === "secure123"){
        const sortedResults = Object.entries(votesData).sort((a,b)=>b[1]-a[1]);
        const first =sortedResults[0];
        const second = sortedResults[1];
        const third = sortedResults[2];


        resultDisplay.innerHTML = `
        Congratulations <strong>${first[0]}</strong> you won with <strong>${first[1]}</strong> votes<br><br>
        2st: ${second[0]} with ${second[1]} votes<br>
        3st: ${third[0]} with ${third[1]} votes<br>
        `;



        resultDisplay.style.display = "block";
    }else{
        alert("Incorrect password. You cannot view the result.")
    }
});