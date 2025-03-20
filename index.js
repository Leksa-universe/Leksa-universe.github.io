// Injection variable (compteur)
const counterDisplay = document.querySelector("h3");
let counter = 0;

// Création de la function
const bubbleGame = () => {
  // Injection du span et de la classe
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  // Injection de tailles random
  const size = Math.random() * 100 + 25 + "px";
  bubble.style.height = size;
  bubble.style.width = size;

  //  Injection de placement random
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  // Injection de déplacement random
  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  // Explosion de bulle + injection compteurs de kills
  bubble.addEventListener("click", () => {
    counter++;
    counterDisplay.textContent = counter;
    bubble.remove();
  });

  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

setInterval(bubbleGame, 800);
