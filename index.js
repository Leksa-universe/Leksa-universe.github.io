class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isGoodAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(choice) {
    if (this.getCurrentQuestion().isGoodAnswer(choice)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// DISPLAY

const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },

  choices: function () {
    let currentChoices = quiz.getCurrentQuestion().choices;

    for (let i = 0; i < currentChoices.length; i++) {
      this.elementShown("choice" + i, quiz.getCurrentQuestion().choices[i]);

      document.getElementById("guess" + i).onclick = () => {
        quiz.guess(currentChoices[i]);
        quizApp();
      };
    }
  },

  progress: function () {
    document.getElementById("progress").textContent = `
    Question ${quiz.currentQuestionIndex + 1} / ${quiz.questions.length}
    `;
  },

  end: function () {
    document.getElementById("quiz").innerHTML = `
    <h1>Quiz Terminé !</h1>
    <h3>Votre score: ${quiz.score}/${quiz.questions.length}</h3>
    `;
  },
};

// GAME LOGIC
const quizApp = () => {
  if (quiz.hasEnded()) {
    display.end();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

let quiz = new Quiz(questions);

quizApp();
