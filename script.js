const openChatBtn = document.getElementById('open-chat-btn');
const chatPopup = document.getElementById('chat-popup');
const closeChatBtn = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Open chat popup
openChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'block';
  openChatBtn.style.display = 'none'; // Hide the open chat button when popup is open
});

// Close chat popup
closeChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'none';
  openChatBtn.style.display = 'block'; // Show the open chat button when popup is closed
});

// Handle user input and bot response
sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    // Display user's message
    addMessage(userMessage, 'user');
    userInput.value = ''; // Clear input

    // Simulate bot response
    const botMessage = getBotResponse(userMessage);
    setTimeout(() => addMessage(botMessage, 'bot'), 500);
  }
});

// Add a new message to the chat box
function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Get bot's response based on the user's message
function getBotResponse(message) {
  const responses = {
    "hello": "Hi there! How can I assist you?",
    "how are you": "I'm doing great, thank you for asking!",
    "what is your name": "I'm your virtual assistant. How can I help?",
    "bye": "Goodbye! Have a great day!",
  };

  // Return a default response if no match is found
  return responses[message.toLowerCase()] || "Sorry, I didn't understand that. Can you rephrase?";
}
