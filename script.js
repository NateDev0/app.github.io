document.getElementById('chatbot-circle').addEventListener('click', function() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.toggle('hidden');
});

document.getElementById('close-chat').addEventListener('click', function() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.add('hidden');
});

document.getElementById('send-btn').addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input');
    const chatContent = document.getElementById('chat-content');
    const userMessage = chatInput.value;
    
    if (userMessage.trim()) {
        const message = document.createElement('div');
        message.classList.add('user-message');
        message.textContent = userMessage;
        chatContent.appendChild(message);
        chatInput.value = '';

        // Call API or simulate AI response
        setTimeout(() => {
            const botResponse = document.createElement('div');
            botResponse.classList.add('bot-message');
            botResponse.textContent = "This is an AI response.";
            chatContent.appendChild(botResponse);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 1000);
    }
});

document.getElementById('clear-chat-btn').addEventListener('click', function() {
    const chatContent = document.getElementById('chat-content');
    chatContent.innerHTML = '';
});
