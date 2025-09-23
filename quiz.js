const quizData = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["var myVar;", "variable myVar;", "let = myVar;", "int myVar;"],
    answer: 0
  },
  {
    question: "Which of these is a JavaScript data type?",
    options: ["String", "Number", "Boolean", "All of the above"],
    answer: 3
  },
  {
    question: "What does === operator mean?",
    options: ["Equal value", "Equal value & type", "Assignment", "None"],
    answer: 1
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyperlink>"],
    answer: 0
  },
  {
    question: "Which attribute is used to provide an alternate text for an image in HTML?",
    options: ["alt", "src", "title", "href"],
    answer: 0
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["font-style", "color", "text-color", "background-color"],
    answer: 1
  },
  {
    question: "How do you select an element with id 'main' in CSS?",
    options: [".main", "#main", "main", "*main"],
    answer: 1
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: 0
  },
  {
    question: "Which CSS property controls the size of text?",
    options: ["font-size", "text-style", "font-weight", "text-size"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let optionsBtns = [];

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerHTML = `<span class='text-secondary fw-normal me-2'>Q${currentQuestion + 1}.</span> ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  selectedAnswer = null;
  optionsBtns = [];

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(index, btn);
    optionsDiv.appendChild(btn);
    optionsBtns.push(btn);
  });

  // Remove feedback if any
  const oldFeedback = document.getElementById("feedback");
  if (oldFeedback) oldFeedback.remove();

  // Show/hide buttons
  document.getElementById("checkBtn").style.display = "inline-block";
  document.getElementById("nextBtn").style.display = "none";
}

function selectAnswer(index, btn) {
  selectedAnswer = index;
  optionsBtns.forEach(b => b.classList.remove("selected-option"));
  btn.classList.add("selected-option");
}

function checkAnswer() {
  if (selectedAnswer === null) return;
  const correct = quizData[currentQuestion].answer;
  // Disable all buttons
  optionsBtns.forEach(b => b.disabled = true);

  // Show feedback
  let feedback = document.createElement("div");
  feedback.id = "feedback";
  feedback.className = "mt-2 mb-0 text-center fw-bold";
  if (selectedAnswer === correct) {
    score++;
    optionsBtns[selectedAnswer].classList.add("correct-answer");
    feedback.innerHTML = `<span class='text-success'>Correct! +5 credit awarded</span>`;
  } else {
    optionsBtns[selectedAnswer].classList.add("wrong-answer");
    optionsBtns[correct].classList.add("correct-answer");
    feedback.innerHTML = `<span class='text-danger'>Wrong!</span> <span class='text-success'>Correct: ${quizData[currentQuestion].options[correct]}</span>`;
  }
  document.getElementById("options").appendChild(feedback);
  document.getElementById("checkBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quizCard").style.display = "none";
    document.getElementById("resultCard").style.display = "block";
    document.getElementById("score").innerText = `You scored ${score * 5} credit points out of ${quizData.length * 5}`;
  }
}
window.onload = function() {
  loadQuestion();
}
