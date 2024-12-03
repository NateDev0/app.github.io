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
    return "Would you like to speak to a live agent? (yes/no)";
  }

  // If the user says "yes" to the live agent
  if (userMessage.toLowerCase() === "yes") {
    return "You can either call us at 1-800-123-4567 or sign in for live chat with a live agent.";
  }

  // Handle 'no' or any other message
  if (userMessage.toLowerCase() === "no") {
    return "Okay, let me know if you need any assistance!";
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


const liveAgentLoginPopup = document.getElementById('live-agent-login-popup');
const liveAgentLoginBtn = document.getElementById('live-agent-login-btn');
const liveAgentUsernameInput = document.getElementById('live-agent-username');
const liveAgentPasswordInput = document.getElementById('live-agent-password');
const liveAgentLoginSubmitBtn = document.getElementById('live-agent-login-submit');
const liveAgentDashboard = document.getElementById('live-agent-dashboard');

// User Authentication Data for Live Agents
const liveAgents = {
  "agentUser": "agentPassword", // Replace with real live agent credentials
};

let isLiveAgentLoggedIn = false;

// Show live agent login popup when clicked
liveAgentLoginBtn.addEventListener('click', () => {
  liveAgentLoginPopup.style.display = 'block';
});

// Handle live agent login
liveAgentLoginSubmitBtn.addEventListener('click', () => {
  const username = liveAgentUsernameInput.value.trim();
  const password = liveAgentPasswordInput.value.trim();

  if (validateLiveAgentCredentials(username, password)) {
    isLiveAgentLoggedIn = true;
    liveAgentLoginPopup.style.display = 'none';
    liveAgentDashboard.style.display = 'block'; // Show live agent dashboard
    alert("Live Agent Logged In!");
  } else {
    alert("Invalid login credentials. Please try again.");
  }
});

function validateLiveAgentCredentials(username, password) {
  return liveAgents[username] && liveAgents[username] === password;
}
