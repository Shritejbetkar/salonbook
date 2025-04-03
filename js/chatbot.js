// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const openChatbot = document.getElementById('openChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');

    // Sample responses
    const botResponses = {
        "hello": "Hello! How can I help you today? You can ask about services, salons, or book an appointment.",
        "services": "We offer haircuts, coloring, styling, manicures, facials, and more. Which service are you interested in?",
        "book": "I can help you book an appointment. Would you like to book for haircut, coloring, or another service?",
        "default": "I'm sorry, I didn't understand that. Could you rephrase or ask about our services or booking?"
    };

    // Open/close chatbot
    openChatbot.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Bot response
        setTimeout(() => {
            let response = botResponses.default;
            const lowerMsg = message.toLowerCase();

            if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                response = botResponses.hello;
            } else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
                response = botResponses.services;
            } else if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
                response = botResponses.book;
            }

            addMessage(response, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Event listeners
    sendChatbotMessage.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initial bot message
    setTimeout(() => {
        addMessage("Hi there! I'm your Salon Assistant. How can I help you today?", 'bot');
    }, 1500);
});