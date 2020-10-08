var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var startEl = document.querySelector("#startQuiz");
var heroEl = document.querySelector(".hero");
var cardEl = document.querySelector("#card");
var cardHeadEl = document.querySelector("#cardHead");
var timerBtnEl = document.querySelector("#timerBtn");
var quizContEl = document.querySelector("#quizCont");
var dflexEl = document.querySelector('#dflex');
var body = document.body;
var menuEl = document.querySelector('#menuLink');

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalId;

var user = {name: userName, score: correctCount};
var userName = "";

function endQuiz() {
  // Set your screen and back to clear
  clearInterval(intervalId);
  quizContEl.remove();

  // Get the base container set
  var divEl = document.createElement('div');
  dflex.append(divEl);
  divEl.setAttribute('class', 'container');
  var row1 = document.createElement('div');
  row1.setAttribute('class', 'row justify-content-center text-center');
  divEl.append(row1);
  var row2 = document.createElement('div');
  row2.setAttribute('class', 'row justify-content-center text-center');
  divEl.append(row2);

  // Alert user of score
  var scoreEl = document.createElement('h4')
  row1.append(scoreEl);
  scoreEl.textContent = "Woo! You're all done. You scored " + correctCount;
  scoreEl.setAttribute('class', 'm-5');

  // Get base of form set
  var formEl = document.createElement('form');
  row2.append(formEl);

  // Create form contents
  var formGroupEl = document.createElement('div');
  formGroupEl.setAttribute('class', 'form-group');
  formEl.append(formGroupEl);

  var labelEl = document.createElement('label');
  labelEl.setAttribute('for', 'user-name');
  labelEl.textContent = 'Enter Your Name';
  formGroupEl.append(labelEl);

  var inputEl = document.createElement('input');
  inputEl.setAttribute('type', 'text');
  inputEl.setAttribute('class', 'form-control');
  inputEl.setAttribute('id', 'user-name');
  formGroupEl.append(inputEl);
  
  var subBtn = document.createElement('button');
  subBtn.setAttribute('type', 'submit');
  subBtn.setAttribute('class', 'btn btn-warning m-2');
  subBtn.textContent = 'Submit';
  formGroupEl.append(subBtn);

  // wait 2 seconds and call showHighScore;
  console.log(localStorage.length);
  
  subBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e);
    userName = document.querySelector('#user-name').value;
    divEl.remove();
    showHighScore();

  })

}

function showHighScore() {
   // Add userName to local storage
   var high_scores = localStorage.getItem("scores");

   if(heroEl) {
     heroEl.remove();
     quizContEl.remove();
   }

 
   if (!high_scores) {
     high_scores = [];
   } else {
     high_scores = JSON.parse(high_scores);
   }
   
   if (userName.length != 0) {
    high_scores.push({ name: userName, score: correctCount });
   }
   
 
   localStorage.setItem("scores", JSON.stringify(high_scores));

   high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var scoreDiv = document.createElement('div');
  dflexEl.append(scoreDiv);

  var ranks = document.createElement('h1');
  ranks.textContent = "High Score Rankings";
  ranks.setAttribute('class', 'm-5');
  scoreDiv.append(ranks);

  var ulScore = document.createElement('ul');
  scoreDiv.append(ulScore);

  // write code here
  for (var i=0; i < high_scores.length; i++) {
    var liScore = document.createElement('li');
    liScore.textContent =
    "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    ulScore.append(liScore);
  }
}


function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  }
  
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  heroEl.remove();
  timerBtnEl.setAttribute('style', 'display: flex;');
  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  cardEl.setAttribute('class', 'card w-50');
  questionEl.setAttribute('class', 'card-header');
  cardHeadEl.setAttribute('class', 'card-body')

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.setAttribute('style', 'display: flex;');
      questionResultEl.setAttribute('class', 'alert-success');
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.setAttribute('style', 'display: flex;');
      questionResultEl.setAttribute('class', 'alert-danger');
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

startEl.addEventListener("click", renderQuestion);
optionListEl.addEventListener("click", checkAnswer);
$('#menuLink').one('click', showHighScore);
