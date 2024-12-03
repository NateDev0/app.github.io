const openChatBtn = document.getElementById('open-chat-btn');
const chatPopup = document.getElementById('chat-popup');
const closeChatBtn = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Predefined FAQs
const faqs = [
  { question: "hello", answer: "Hi there! How can I assist you?" },
  { question: "how are you", answer: "I'm doing great, thank you for asking!" },
  { question: "what is your name", answer: "I'm your virtual assistant. How can I help?" },
  { question: "bye", answer: "Goodbye! Have a great day!" },
];

// Open chat popup
openChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'flex';
  openChatBtn.style.display = 'none';
});

// Close chat popup
closeChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'none';
  openChatBtn.style.display = 'block';
});

// Handle user input
sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user');
    userInput.value = '';
    const botMessage = getBestMatchResponse(userMessage);
    setTimeout(() => addMessage(botMessage, 'bot'), 500);
  }
});

function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBestMatchResponse(userMessage) {
  let bestMatch = null;
  let bestScore = 0;
  faqs.forEach((faq) => {
    const score = similarity(userMessage.toLowerCase(), faq.question.toLowerCase());
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq.answer;
    }
  });
  return bestScore > 0.5
    ? bestMatch
    : "I'm not sure I understand. Would you like to speak with a live agent?";
}

function similarity(str1, str2) {
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);
  const matches = words1.filter((word) => words2.includes(word));
  return matches.length / Math.max(words1.length, words2.length);
}
