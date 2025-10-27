const fullMessage = [
  "but u did it anyway.. kamu belum selesai sama dia, terus expect aku bisa ngerti semuanya. i tried. God knows how much i tried, tapi aku gasuka jadi tempat numpang pulih.",
  "i wanted to be your home, not a pit stop. tapi kamu ga pernah benar-benar milih aku.",
  "and maybe that’s my fault too, thinking i could fix someone who never saw me."
];

const chatBox = document.getElementById('chatBox');
const finalOverlay = document.getElementById('finalOverlay');
let msgIndex = 0;

function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "flex flex-col items-end typing-bubble";
  typingDiv.innerHTML = `<div class="typing-indicator">⋯</div>`;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

function showMessage(text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "flex flex-col items-end";
  msgDiv.innerHTML = `
    <div class="chat-bubble from-me">
      <div class="message-content">
        <span>${text}</span>
        <span class="timestamp">1:${53 + msgIndex} am</span>
      </div>
    </div>
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function nextMessage() {
  if (msgIndex >= fullMessage.length) {
    setTimeout(showFinalOverlay, 4000);
    return;
  }

  const typingDiv = showTypingIndicator();

  setTimeout(() => {
    typingDiv.remove();
    showMessage(fullMessage[msgIndex]);
    msgIndex++;
    setTimeout(nextMessage, 1900);
  }, 2900);
}

function showFinalOverlay() {
  finalOverlay.classList.remove("pointer-events-none");
  finalOverlay.classList.add("opacity-100");
}

window.onload = () => {
  setTimeout(nextMessage, 1500);
};
