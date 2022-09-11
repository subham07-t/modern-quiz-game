const data = [
  {
    numb: 1,
    question: "What is Subham's Favt. Game?",
    options: ["Cricket", "Football", "Tennis", "Basketball"],
    answer: "Football",
  },
  {
    numb: 2,
    question: "What is Subham's Favt. Food?",
    options: ["Pizza", "Burger", "Chowmin", "Momo"],
    answer: "Momo",
  },
  {
    numb: 3,
    question: "What is Subham's Favt. Actress?",
    options: ["Disha Patani", "Sruti Hassan", "Sraddha Kapoor", "Alia Bhatt"],
    answer: "Sraddha Kapoor",
  },
  {
    numb: 4,
    question: "What is Subham's Favt. Destination?",
    options: ["Puri", "Darjeeling", "Kolkata", "Chennai"],
    answer: "Puri",
  },
  {
    numb: 5,
    question: "What is Subham's Favt. Programming Language?",
    options: ["C", "Java", "C++", "Javascript"],
    answer: "C++",
  },
];

// start button to question box functionality

const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const question_box = document.querySelector(".question-box");
const option_list = document.querySelector(".option-list");
const timeCount = document.querySelector(".timer-sec");
const timerLoading = document.querySelector(".timer-loading");
const result_box = document.querySelector(".result-box");
const replay_btn = result_box.querySelector(".buttons .quit");
const time_off = document.querySelector(".timer-txt");

let questionCount = 0;
let counter;
let counterWidth;
let timevalue = 10;
let widthval = 0;
let widthlimit = 559;
let timeintervel = 20;
let score = 0;
const next_btn = document.querySelector(".next-btn");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  question_box.classList.add("activeQuiz");
  loadQues(questionCount);
  botQuesCounter(questionCount);
  startTimer(timevalue);
  startLoader(widthval);
};

replay_btn.onclick = () => {
  location.reload();
};
// question box functionality start

next_btn.onclick = () => {
  if (questionCount < data.length - 1) {
    questionCount++;
    loadQues(questionCount);
    botQuesCounter(questionCount);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterWidth);
    startLoader(widthval);
    next_btn.style.display = "none";
    time_off.textContent = "Time Left:";
  } else {
    showResultBox();
  }

  if (questionCount === data.length - 1) {
    next_btn.innerHTML = "Submit";
  }
};
function loadQues(index) {
  const ques_txt = document.querySelector(".ques-txt");
  let que =
    `<span>` + data[index].numb + `. ` + data[index].question + `</span>`;
  let option =
    `<div class="option"><span>` +
    data[index].options[0] +
    `</span></div>` +
    `<div class="option"><span>` +
    data[index].options[1] +
    `</span></div>` +
    `<div class="option"><span>` +
    data[index].options[2] +
    `</span></div>` +
    `<div class="option"><span>` +
    data[index].options[3] +
    `</span></div>`;

  ques_txt.innerHTML = que;
  option_list.innerHTML = option;
  const option_value = document.querySelectorAll(".option");
  for (let i = 0; i < option_value.length; i++) {
    option_value[i].setAttribute("onclick", "optionSelected(this)");
  }
}

const crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;
const checkIcon = `<div class="icon check"><i class="fas fa-check"></i></div>`;

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterWidth);
  let userAns = answer.textContent;
  let correctAns = data[questionCount].answer;
  if (userAns === correctAns) {
    score++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", checkIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    for (let i = 0; i < option_list.children.length; i++) {
      if (option_list.children[i].textContent === correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", checkIcon);
      }
    }
  }

  for (let j = 0; j < option_list.children.length; j++) {
    option_list.children[j].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function startTimer(time) {
  counter = setInterval(() => {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      let correctAns = data[questionCount].answer;
      for (let i = 0; i < option_list.children.length; i++) {
        if (option_list.children[i].textContent === correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", checkIcon);
        }
      }
      for (let j = 0; j < option_list.children.length; j++) {
        option_list.children[j].classList.add("disabled");
      }
      next_btn.style.display = "block";
      time_off.textContent = "Time Out:";
    }
  }, 1000);
}

function startLoader(widthvalue) {
  counterWidth = setInterval(() => {
    widthvalue++;
    timerLoading.style.width = widthvalue + "px";
    if (widthvalue > widthlimit) {
      clearInterval(counterWidth);
    }
  }, timeintervel);
}

function showResultBox() {
  question_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const score_text = result_box.querySelector(".score-txt");
  if (score === 0) {
    let scoreText =
      `<span>Seriously?? you got only<p>` +
      score +
      `</p>out of<p>` +
      data.length +
      `</p></span
> `;
    score_text.innerHTML = scoreText;
  } else if (score < 3) {
    let scoreText =
      `<span>Disappointed!! You got<p>` +
      score +
      `</p> out of<p>` +
      data.length +
      `</p></span
  > `;
    score_text.innerHTML = scoreText;
  } else {
    let scoreText =
      `<span>Impressive!! You got<p>` +
      score +
      `</p> out of<p>` +
      data.length +
      `</p></span
> `;
    score_text.innerHTML = scoreText;
  }
}
// function for bottom question counter
function botQuesCounter(index) {
  const bot_ques_counter = document.querySelector(".total-ques");
  const bot_ques =
    `<span><p>` +
    data[index].numb +
    `</p>of<p>` +
    data.length +
    `</p>Questions</span>`;
  bot_ques_counter.innerHTML = bot_ques;
}

// javascript according to media size
function myFunction(x) {
  if (x.matches) {
    // If media query matches
    widthlimit = 315;
    timeintervel = 35;
  } else {
    widthlimit = 559;
    timeintervel = 20;
  }
}
let x = window.matchMedia("(max-width: 560px)");
myFunction(x);
// x.addListener(myFunction);
////////////////////////////////////////////
