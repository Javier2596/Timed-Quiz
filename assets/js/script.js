var timeEl = document.querySelector("#time");
var mainEl = document.querySelector(".container");
var headEl = document.getElementById("home");
var startBtn = document.querySelector("#start-button");
var gameQ = document.getElementById("game");
var endScrn = document.querySelector(".ending-screen");
var scoreBtn = document.getElementById("btn");

//set var and const in the global 

var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var timeLeft = 15;

var currentChoice = {};
var acceptedAnswers = false;
var score = 0;
var questionCounter = 0
var questionsList = [];

//placed multiple choice answers along with questions into an array
var questions = [
{  
  question: "What color is a firetruck?",
  choice1: "red",
  choice2: "brown",
  choice3: "green",
  choice4: "blue",
  answer: 1
}, 

{ 
  question: "how many sides does a stopsign have?",
  choice1: "5",
  choice2: "12",
  choice3: "8",
  choice4: "200",
  answer: 3
},

{ 
  question: "How many feet are in a mile?",
  choice1: "15000ft",
  choice2: "52800ft",
  choice3: "1500ft",
  choice4: "5280ft",
  answer: 4
},

{
  question: "What holiday involves pumpkins, ghost, and candy",
  choice1: "Christmas",
  choice2: "Thanksgiving",
  choice3: "Halloween",
  choice4: "flag day",
  answer: 3
}];

const maxQuestions = 4;
const wrongAns = -10;
//hid these displays and set them to appear when an event listener is activated

gameQ.setAttribute("style", "display: none");
endScrn.setAttribute("Style", "display: none");
// event listeners to start the timer, quiz, and change display of content
scoreBtn.addEventListener("click", hiScore);
headEl.addEventListener("click", clickStart);
startBtn.addEventListener("click", stopWatch);
startBtn.addEventListener("click", gameStart);
startBtn.addEventListener("click", startQuiz);
//this function changes main page to the actual quiz
function hiScore() {
  headEl.setAttribute("style", "display: none");
  endQuiz();
  };

// this function targets the headEl and changes the display to none.
function clickStart(event) {
  event.stopPropagation();
  event.currentTarget.setAttribute(
    "style", 
    "display: none");
};
//this function starts the timer count down in seconds 
function stopWatch(event) {
  event.preventDefault();
  var intervalTime = setInterval(function() {
    timeLeft--; 
    timeEl.textContent = timeLeft;
    if(timeLeft === 0) {
      clearInterval(intervalTime);
      endQuiz();
    }
  }, 1000);
};
// this function displays the quiz after the eventlistener 
function gameStart() {
  gameQ.setAttribute(
   "style", "display: content"
  );
};
// this function places the questions and multiple choice answers into getNextQuestion function
function startQuiz() {
  questionsList = [...questions]; 
  getNextQuestion();
};
//this function ends the quiz once all the questions are ran through and generates the next question after the other randomly 
function getNextQuestion() {

  if(questionsList.length == 0 || questionCounter >= maxQuestions) {  
    localStorage.setItem("recentScore", score);
      endQuiz();
  };
  questionCounter++;


    const questIndex = Math.floor(Math.random() * questionsList.length);
      currentChoice = questionsList[questIndex];
      question.innerText = currentChoice.question;

      choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentChoice["choice" + number];
      });
//this prevents the same array option from displaying twice
      questionsList.splice(questIndex, 1);
      acceptedAnswers = true;  
  };

  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if(!acceptedAnswers) {
        return;
      }
      acceptedAnswers = false;
      const selectOption = e. target;
      const selectAnswer = selectOption.dataset ["number"];

      var qStatus = "incorrect";
        
      if(selectAnswer == currentChoice.answer) {
          qStatus = "correct";
      };

      getNextQuestion();
  });
});

function endQuiz() {
  endScrn.setAttribute("style", "display: content;");
  gameQ.setAttribute("style", "display: none;");
  };

//get the initial to display on end screen
var userInitial = document.querySelector("#initial");
var initForm = document.querySelector("#init-form");
var usList = document.querySelector("#user-list");
var saveBtn = document.querySelector("#save-init");

var users = [];

function renderUsers() {
  
  usList.innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var li = document.createElement("li");
    li.textContent = user;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.setAttribute("style", "background-color: green; font-size: 15px; padding: 6px; width: 100px text-align:center; border: 2px solid green; margin-bottom: 1px; text-decoration: none; color: green; background-color: tan; border-radius: 7%;");
    
    button.textContent = "delete?";
  
    li.appendChild(button);
    usList.appendChild(li);
  }
}

function init() {
  // Get stored userinfo from localStorage
  var storedUsers = JSON.parse(localStorage.getItem("users"));

  if (storedUsers !== null) {
    users = storedUsers;
  }

  renderUsers();
}

function storedUser () {
  // Stringify and set key in localStorage to array
  localStorage.setItem("users", JSON.stringify(users));
}

// Add submit event to form
initForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var userText = userInitial.value.trim();

  if (userText === "") {
    return;
  }

  // Add new text to array, clear the input
  users.push(userText);
  userInitial.value = "";

  // Store updated in localStorage, re-render list
  storedUser();
  renderUsers();
});

// Add click event
usList.addEventListener("click", function(event) {
  var userEl = event.target;

  // Checks if element is a button
  if (userEl.matches("button") === true) {
    
    var index = userEl.parentElement.getAttribute("data-index");
    users.splice(index, 1);

    storedUser();
    renderUsers();
  }
});

init();
