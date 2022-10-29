//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Which of the following statements is true about symmetric multiprocessing?",
    options: ["A single copy of the operating system resides in each processor.", "Useful for situations where data must remain in memory to process.", "Bottlenecks increase with uniprocessor systems because tasks are not shared.", "The problems of memory contention are unlikely."],
    correct: "Useful for situations where data must remain in memory to process.",
  },
  {
    id: "1",
    question: "The hrs hand rotates by x degrees by 600 seconds past 5. Find the value of x, if the clock is started at the start of day i.e. at time 00:00. ",
    options: ["240", "175", "155", "180"],
    correct: "155",
  },
  {
    id: "2",
    question: "A boat runs at the speed of 13 km/h in still water. If the speed of the stream is 4 km/h, how much time will it take to go 68 km downstream?",
     options: ["6 H", "8 H", "3 H", "4 H"],
    correct: "4 H",
  },
  {
    id: "2",
    question: "What will be the next number? 3, 5, 7, 11, 13, 17…….",
    options: ["21", "19", "25", "20"],
    correct: "21",
    // This is a sequence of prime numbers.
  },
  {
    id: "2",
    question: "The Fibonacci sequence is the sequence of integers",
    options: ["1,3,5,7,9,11,13", "0,1,1,2,3,5,8,13,21,34,55", "0,1,3,4,7,11,18,29,47", "0,1,3,7,15"],
    correct: "0,1,1,2,3,5,8,13,21,34,55",
    
  },
  {
    id: "2",
    question: "The LCM of two co-prime numbers is 117. What is the sum of squares of the numbers ?",
    options: ["220", "1530", "250", "22"],
    correct: "250",
  },
  {
    id: "2",
    question: "Express 1095/1168 in its simplest form.",
    options: ["13/16", "15/16", "17/16", "25/26"],
    correct: "15/16",
  },
  {
    id: "2",
    question: "Which constructs an anonymous inner class instance?",
    options: ["Runnable r = new Runnable() { };", "Runnable r = new Runnable(public void run() { });", "Runnable r = new Runnable { public void run(){}};", "System.out.println(new Runnable() {public void run() { }});"],
    correct: "System.out.println(new Runnable() {public void run() { }});",
  },
  {
    id: "2",
    question: "What day of week was it on 1989/05/11, if it was Monday on 1988/04/04, given the dates are in format : yyyy/dd/mm ?",
    options: ["Monday", "Sunday", "Tuesday", "Wednesday"],
    correct: "Sunday",
  },
  {
    id: "2",
    question: "x=acos(t),y=bsin(t) is the parametric form of ",
    options: ["Ellipse", "Hyperbola", "Circle", "Parabola"],
    correct: "Ellipse",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
