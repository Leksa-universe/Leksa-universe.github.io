const cunterDisplay = document.getElementById("kamasScore");
let cunter = 0;

const KamasGame = () => {
  // BUBBLE CREATE
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  // BUBBLE SIZE
  const size = Math.random() * 25 + 125 + "px";
  bubble.style.width = size;
  bubble.style.height = size;

  // BUBBLE SPAWN
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  // BUBBLE MOOVE
  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 + plusMinus + "%");

  // BUBBLE SHOOT
  bubble.addEventListener("click", () => {
    cunter++;
    bubble.remove();
    cunterDisplay.textContent = cunter;
  });

  // BUBBLE TIME
  setTimeout(() => {
    bubble.remove();
  }, 8000);
};
setInterval(KamasGame, 1500);
