const speakerEl = document.getElementById("speaker");
const textEl = document.getElementById("dialogue-text");
const choiceArea = document.getElementById("choice-area");

let isTyping = false;
let skipTyping = false;
let awaitingChoice = false;

let idx = 0;

const script = [
  {
    speaker: "AHMICK",
    text: "Hey, welcome!\nWhat’s your name?",
    choices: [{ text: "...", goto: 1 }]
  },
  {
    speaker: "AHMICK",
    text: "No worries, you don't have to share your name. \nAnyways, welcome to my portfolio!"
  },
  {
    speaker: "AHMICK",
    text: "Any questions you have for me? \nI am more than willing to answer them. \nThrow them all at me!"
  }
];

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

  isTyping = false;
}

function renderChoices(choices) {
  clearChoices();
  awaitingChoice = true;

  choices.forEach((c) => {
    const panel = document.createElement("div");
    panel.className = "choice-panel";

    const t = document.createElement("div");
    t.className = "choice-text";
    t.textContent = c.text;

    panel.appendChild(t);

    panel.addEventListener("click", async (e) => {
      e.stopPropagation(); // Don't trigger global click 
      clearChoices();

      // Show the user line in the MAIN dialogue box
      setSpeaker("USER");
      await typeText(c.text, 15);

      // Immediately continue (no extra click)
      idx = c.goto;
      await showStep();
    });

    choiceArea.appendChild(panel);
  });
}

async function showStep() {
  clearChoices();

  const step = script[idx];
  if (!step) return;

  setSpeaker(step.speaker);
  await typeText(step.text);

  // Ethical principle: choices appear automatically after the line finishes
  if (step.choices && step.choices.length) {
    renderChoices(step.choices);
  }
}

// Global click:
// - if typing => skip
// - if waiting on choices => do nothing (must pick)
// - else => advance
document.addEventListener("click", async (e) => {
  if (e.target.closest(".choice-panel")) return;

  if (isTyping) {
    requestSkip();
    return;
  }

  if (awaitingChoice) return;

  idx++;
  await showStep();
});

document.addEventListener("keydown", async (e) => {
  if (e.code !== "Space" && e.code !== "Enter") return;

  if (isTyping) {
    requestSkip();
    return;
  }

  if (awaitingChoice) return;

  idx++;
  await showStep();
});

window.addEventListener("load", () => {
  idx = 0;
  showStep();
});
