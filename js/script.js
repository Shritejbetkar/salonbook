// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeStyle = document.getElementById('darkModeStyle');
const body = document.body;

// Dark Mode Functionality
function initializeDarkMode() {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'enabled' || (!savedMode && systemPrefersDark)) {
        enableDarkMode();
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Set up toggle event
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
}

function toggleDarkMode() {
    if (this.checked) {
        enableDarkMode();
        localStorage.setItem('darkMode', 'enabled');
    } else {
        disableDarkMode();
        localStorage.setItem('darkMode', 'disabled');
    }
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    if (darkModeStyle) darkModeStyle.disabled = false;
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    if (darkModeStyle) darkModeStyle.disabled = true;
}

// Chatbot Functionality
function initializeChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const openChatbot = document.getElementById('openChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');

    if (!chatbotContainer) return;

    // Sample responses
    const botResponses = {
        "hello": "Hello! How can I help you today? You can ask about services, salons, or book an appointment.",
        "hi": "Hi there! I'm your Salon Assistant. What can I do for you?",
        "services": "We offer: <br>- Haircuts & Styling<br>- Hair Coloring<br>- Manicures & Pedicures<br>- Facials<br>- Waxing",
        "book": "To book an appointment:<br>1. Click 'Find Salons'<br>2. Choose your salon<br>3. Select service and time<br>Or ask me to book for you!",
        "hours": "Most salons are open:<br>Mon-Fri: 9am-8pm<br>Sat: 9am-6pm<br>Sun: 10am-4pm",
        "price": "Prices vary by service and salon. Here are averages:<br>- Haircut: $30-$80<br>- Coloring: $60-$150<br>- Manicure: $20-$50",
        "default": "I'm not sure I understand. Try asking about:<br>- Services offered<br>- Booking process<br>- Salon hours<br>- Pricing"
    };

    // Open/close chatbot
    openChatbot?.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
    });

    closeChatbot?.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Bot response (simulated AI)
        setTimeout(() => {
            let response = botResponses.default;
            const lowerMsg = message.toLowerCase();

            if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                response = botResponses.hello;
            } else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
                response = botResponses.services;
            } else if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
                response = botResponses.book;
            } else if (lowerMsg.includes('hour') || lowerMsg.includes('open')) {
                response = botResponses.hours;
            } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
                response = botResponses.price;
            }

            addMessage(response, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Event listeners
    sendChatbotMessage?.addEventListener('click', sendMessage);
    chatbotInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick reply suggestions
    const quickReplies = ['What services do you offer?', 'How do I book?', 'What are your hours?'];
    function showQuickReplies() {
        const quickReplyContainer = document.createElement('div');
        quickReplyContainer.classList.add('quick-replies');
        
        quickReplies.forEach(reply => {
            const quickReply = document.createElement('span');
            quickReply.classList.add('quick-reply');
            quickReply.textContent = reply;
            quickReply.addEventListener('click', () => {
                chatbotInput.value = reply;
                sendMessage();
            });
            quickReplyContainer.appendChild(quickReply);
        });
        
        chatbotMessages.appendChild(quickReplyContainer);
    }

    // Initial bot message
    setTimeout(() => {
        addMessage("Hi there! I'm your Salon Assistant. How can I help you today?", 'bot');
        showQuickReplies();
    }, 1500);
}

// Initialize Features Section
function initializeFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;

    const features = [
        {
            icon: 'fa-calendar-alt',
            title: 'Easy Booking',
            description: 'Schedule appointments in just a few clicks'
        },
        {
            icon: 'fa-star',
            title: 'Verified Reviews',
            description: 'Read real customer experiences'
        },
        {
            icon: 'fa-map-marker-alt',
            title: 'Salon Locator',
            description: 'Find the best salons near you'
        },
        {
            icon: 'fa-clock',
            title: 'Real-Time Availability',
            description: 'See up-to-date appointment slots'
        }
    ];

    featuresGrid.innerHTML = features.map(feature => `
        <div class="feature-card">
            <i class="fas ${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeChatbot();
    initializeFeatures();
    initializeSmoothScrolling();
    
    // Add any additional initialization here
    console.log('SalonBook system initialized');
});