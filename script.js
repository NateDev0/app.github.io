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

// User Authentication Data (can be replaced with a real database or API)
const users = {
  "exampleUser": "examplePassword", // Replace with actual usernames and passwords
};

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

// Handle user input and sending messages
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleUserInput();
});

function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user');
    userInput.value = '';
    const botMessage = getBestMatchResponse(userMessage);
    setTimeout(() => addMessage(botMessage, 'bot'), 500);
  }
}

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
  
  // If the user asks to speak to a live agent
  if (userMessage.toLowerCase().includes("speak to a live agent")) {
    return "Would you like to connect to a live agent? (yes/no)";
  }

  // Handle 'yes' response to live agent request
  if (userMessage.toLowerCase() === "yes") {
    return "Please provide your username and password in the format: (username: yourUsername password: yourPassword)";
  }

  // Handle username and password input for live agent access
  if (userMessage.startsWith("(username:") && userMessage.includes("password:")) {
    const credentials = parseCredentials(userMessage);
    if (validateCredentials(credentials.username, credentials.password)) {
      return "Login successful! Connecting you to a live agent...";
    } else {
      return "Invalid credentials. Please try again.";
    }
  }

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

function parseCredentials(userMessage) {
  const username = userMessage.match(/\(username:\s*(\S+)\s*/)[1];
  const password = userMessage.match(/password:\s*(\S+)\)/)[1];
  return { username, password };
}

function validateCredentials(username, password) {
  return users[username] && users[username] === password;
}

