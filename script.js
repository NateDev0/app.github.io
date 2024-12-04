// Existing DOM Elements
const openChatBtn = document.getElementById('open-chat-btn');
const chatPopup = document.getElementById('chat-popup');
const closeChatBtn = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const liveAgentLoginPopup = document.getElementById('live-agent-login-popup');
const liveAgentDashboard = document.getElementById('live-agent-dashboard');

// Live Agent Credentials
const liveAgents = {
  agentUser: "agentPassword", // Replace with real live agent credentials
};

let isLiveAgentLoggedIn = false;

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
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleUserInput();
});

function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user');
    userInput.value = '';
    processMessage(userMessage);
  }
}

function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processMessage(userMessage) {
  if (isLoginAttempt(userMessage)) {
    const [username, password] = parseCredentials(userMessage);
    if (validateLiveAgentCredentials(username, password)) {
      isLiveAgentLoggedIn = true;
      addMessage("Login successful! Redirecting to the live agent dashboard...", "bot");
      setTimeout(() => {
        liveAgentLoginPopup.style.display = 'none';
        liveAgentDashboard.style.display = 'block';
      }, 1000);
    } else {
      addMessage("Invalid credentials. Please try again.", "bot");
    }
  } else {
    const botResponse = getBotResponse(userMessage);
    setTimeout(() => addMessage(botResponse, "bot"), 500);
  }
}

function isLoginAttempt(message) {
  return /\busername:\s*\S+\s+password:\s*\S+/.test(message);
}

function parseCredentials(inputText) {
  const regex = /\busername:\s*(\S+)\s+password:\s*(\S+)/;
  const match = inputText.match(regex);
  if (match) {
    return [match[1], match[2]];
  }
  return ["", ""];
}

function validateLiveAgentCredentials(username, password) {
  return liveAgents[username] && liveAgents[username] === password;
}

function getBotResponse(userMessage) {
  const faqs = [
    { question: "hello", answer: "Hi there! How can I assist you?" },
    { question: "how are you", answer: "I'm doing great, thank you for asking!" },
    { question: "what is your name", answer: "I'm your virtual assistant. How can I help?" },
    { question: "bye", answer: "Goodbye! Have a great day!" },
  ];

  const faq = faqs.find(f => userMessage.toLowerCase().includes(f.question));
 return faq ? faq.answer : "I'm not sure I understand. Would you like to speak with a live agent? You can call (206) 342-8631 to speak to someone on the phone or say 'liveagent' if you want to talk to a person now.";
}
