const speakerEl = document.getElementById("speaker");
const textEl = document.getElementById("dialogue-text");
const choiceArea = document.getElementById("choice-area");
const character = document.getElementById("character");

let scenes = [];
let idx = 0;

let isTyping = false;
let skipTyping = false;
let awaitingChoice = false;

function setSpeaker(name) {
  speakerEl.textContent = name.toUpperCase();
}

function clearChoices() {
  choiceArea.innerHTML = "";
  awaitingChoice = false;
}

function requestSkip() {
  if (isTyping) skipTyping = true;
}

async function typeText(text, speed = 35) {
  character.src = "assets/sprites/me/sprite_talk.gif"
  isTyping = true;
  skipTyping = false;
  textEl.textContent = "";

  for (let i = 0; i < text.length; i++) {
    if (skipTyping) {
      textEl.textContent = text;
      break;
    }
    textEl.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }

  character.src = "assets/sprites/me/sprite_idle.gif"
  isTyping = false;
}

function renderChoices(choices) {
  clearChoices();
  awaitingChoice = true;

  for (const c of choices) {
    const panel = document.createElement("div");
    panel.className = "choice-panel";

    const t = document.createElement("div");
    t.className = "choice-text";
    t.textContent = c.text;

    panel.appendChild(t);

    panel.addEventListener("click", (e) => {
      e.stopPropagation();
      clearChoices();
      idx = c.goto;
      showStep();
    });

    choiceArea.appendChild(panel);
  }
}

async function showStep() {
  clearChoices();

  const step = scenes[idx];
  if (!step) return;

  setSpeaker(step.speaker);
  await typeText(step.text);

  if (step.choices?.length) {
    renderChoices(step.choices);
  }
}

// Global click behavior
document.addEventListener("click", () => {
  if (isTyping) return requestSkip();
  if (awaitingChoice) return;

  idx++;
  showStep();
});

document.addEventListener("keydown", (e) => {
  if (e.code !== "Space" && e.code !== "Enter") return;
  if (isTyping) return requestSkip();
  if (awaitingChoice) return;

  idx++;
  showStep();
});

// Load scenes.json
window.addEventListener("load", async () => {
  const res = await fetch("data/scenes.json");
  const data = await res.json();

  scenes = data.scenes;
  idx = data.startIndex ?? 0;

  showStep();
});
