class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

const questions = [
  new Question(
    "Comment se prénomme le chien d'Henry dans Kingdom Come: Deliverance ?",
    ["Mutt", "Rex", "Rasko", "Cabot"],
    "Cabot"
  ),

  new Question(
    "Comment Henry, dans Kingdom Come: Deliverance, a-t-il obtenu son chien ?",
    [
      "Il l'a trouvé errant dans le village",
      "Thérèse lui a offert le chien",
      "Il l'a sauvé d'une meute de loups",
      "Il l'a gagné lors d'un tournoi",
    ],
    "Thérèse lui a offert le chien"
  ),

  new Question(
    "Comment se prénomme le cheval de Gérald de Riv dans The Witcher 3 ?",
    ["Ablette", "Roach", "Écume", "Tonnerre"],
    "Ablette"
  ),

  new Question(
    "Quel symbole représente l'école de sorceleurs de Géralt de Riv dans The Witcher?",
    ["La tête de loup", "Le corbeau", "Le Griffon", "La tête de dragon"],
    "La tête de loup"
  ),

  new Question(
    "En quelle année est sortie la Wii ?",
    ["2004", "2006", "2008", "2010"],
    "2006"
  ),

  new Question(
    "Dans Dark Souls, quel est le nom de la première grande ville que le joueur visite, célèbre pour son architecture en ruines et ses ennemis chevaliers ?",
    ["Drangleic", "Lothric", "Astora", "Lordran"],
    "Lordran"
  ),

  new Question(
    "Dans The Elder Scrolls V: Skyrim, quelle est la langue utilisée par les dragons pour leurs cris ?",
    ["Le Dwemer", "Le Daedrique", "Le Nordique ancien", "Le Tamrielic"],
    "Le Nordique ancien"
  ),

  new Question(
    "Dans Divinity: Original Sin 2, comment s’appelle la divinité que cherchent à invoquer les Sourcerers ?",
    [
      "Lucian le Divin",
      "Malady la Sourceress",
      "Le Dieu-Roi Silventhir",
      "The Void",
    ],
    "The Void"
  ),

  new Question(
    "Quelle console de jeu vidéo a été la première à utiliser des cartouches interchangeables ?",
    [
      "Atari 2600",
      "Nintendo Entertainment System (NES)",
      "Sega Genesis",
      "Sega Mega Drive",
    ],
    "Nintendo Entertainment System (NES)"
  ),

  new Question(
    "Dans Halo: Combat Evolved, comment s'appelle l'intelligence artificielle qui accompagne le Master Chief tout au long de l'aventure ?",
    ["Cortona", "Ada", "GlaDOS", "EDI"],
    "Cortona"
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
  }

  getCurrentIndex() {
    return this.questions[this.index];
  }

  guess(choice) {
    if (choice === this.getCurrentIndex().answer) {
      this.score++;
      this.index++;
    } else {
      this.index++;
    }
  }
  hasEnded() {
    return this.index >= this.questions.length;
  }
}

class UI {
  constructor(quiz) {
    this.quiz = quiz;
    this.btn = null;
  }

  initLobby() {
    this.quiz.index = 0;
    this.quiz.score = 0;

    document.getElementById("quiz").innerHTML = `
      <h1 id="tittle"><span>Q</span>uiz Jeux Vidéo <i class="fas fa-gamepad"></i></h1>
      <h2 id="question"></h2>
      <div class="choices">
        <button class="btn"></button>
        <button class="btn"></button>
        <button class="btn"></button>
        <button class="btn"></button>
      </div>
      <p id="progress"></p>
    `;

    this.btn = document.querySelectorAll(".btn");

    this.displayQuestion();
    this.displayChoices();
    this.displayProgress();
  }
  displayQuestion() {
    document.getElementById("question").innerHTML = `${
      this.quiz.getCurrentIndex().text
    }`;
  }
  displayChoices() {
    this.btn.forEach((guess, index) => {
      guess.innerHTML = this.quiz.getCurrentIndex().choices[index];
      guess.disabled = false;
      guess.classList.remove("correct", "incorrect");

      guess.onclick = () => {
        this.btn.forEach((b) => {
          b.disabled = true;
          b.classList.remove("correct", "incorrect");
        });

        const correctAnswer = this.quiz.getCurrentIndex().answer;
        const userAnswer = this.quiz.getCurrentIndex().choices[index];

        if (userAnswer === correctAnswer) {
          guess.classList.add("correct");
        } else {
          guess.classList.add("incorrect");

          // Montrer la bonne réponse aussi
          this.btn.forEach((b, i) => {
            if (this.quiz.getCurrentIndex().choices[i] === correctAnswer) {
              b.classList.add("correct");
            }
          });
        }

        setTimeout(() => {
          this.quiz.guess(userAnswer);

          if (!this.quiz.hasEnded()) {
            this.btn.forEach((b) => {
              b.disabled = false;
              b.classList.remove("correct", "incorrect");
            });
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
          } else {
            this.displayHasEnded();
          }
        }, 1000);
      };
    });
  }

  displayProgress() {
    const progress = document.getElementById("progress");
    progress.innerHTML = `
    ${this.quiz.index + 1} / ${this.quiz.questions.length}
    `;
  }
  displayHasEnded() {
    if (this.quiz.hasEnded()) {
      document.getElementById("quiz").innerHTML = `
      <h1>Vous avez terminé le quizz</h1>
      <h3>Voici votre score: ${this.quiz.score} / ${this.quiz.questions.length}</h3>
      <button id="restart">Recommencer</button>
      `;

      document.getElementById("restart").onclick = () => {
        this.initLobby();
      };
    }
  }
}

const quizApp = new Quiz(questions);
const display = new UI(quizApp);

display.initLobby();
