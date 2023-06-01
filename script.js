let displayMsg = document.getElementById('content');
inpField = document.querySelector(".input-field")
tryAgainBtn = document.querySelector(".content button")
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

let string = 'technology can be used for good or evil the same technology that is used to make organizations and countries more productive can be used to steal surveil and do harm this duality means that the technology we create to help us will sometimes hurt us that technology used to fight for human rights can also be sed to violate them and that tools used to protect us can also be used to attack us the criminal community has evolved to abuse technology on a scale that brings in enormous profits costing the global economy an estimated $450 billion a year now you may be thinking what the fuck is he talking about to improve understanding of terrorist activities we have developed a novel methodology for collecting and analyzing Dark Web information the methodology incorporates information collection analysis and visualization techniques and exploits various web information sources we applied it to collecting and analyzing information of selected web sites and developed visualization of their site contents relationships and activity levels'

const myArray = string.split(/\r?\n?\s/);

console.log(myArray);

function displayMsgFunction()
{
  let tempMsg
  for (i = 0; i <= 80 ; i++)
  {
    let randomNumber = Math.floor(Math.random()*myArray.length);
    tempMsg += " " +myArray[randomNumber];
  }
  return tempMsg;
}

tempMsg2 = displayMsgFunction();

function loadParagraph() 
{

  function displayMsgFunction()
    {
      let tempMsg
      for (i = 0; i <= 50 ; i++)
      {
        let randomNumber = Math.floor(Math.random()*myArray.length);
        tempMsg += " " +myArray[randomNumber];
      }
      return tempMsg;
    }

    tempMsg2 = displayMsgFunction();


    displayMsg.innerHTML = "";
    tempMsg2.split("").forEach(char => {
        let span = `<span>${char}</span>`
        displayMsg.innerHTML += span;
    });
    displayMsg.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    displayMsg.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = displayMsg.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);