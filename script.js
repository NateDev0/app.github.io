document.getElementById('chatbot-circle').addEventListener('click', function() {
    const chatPopup = document.getElementById('chat-popup');
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
        chatPopup.style.display = 'block';
    } else {
        chatPopup.style.display = 'none';
    }
});

document.getElementById('close-chat').addEventListener('click', function() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.style.display = 'none';
});
