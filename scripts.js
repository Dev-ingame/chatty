document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const darkModeToggle = document.getElementById("mode");
    const chatContainer = document.querySelector(".chat-container");
    const body = document.querySelector("body")
    const messageinput = document.querySelector("#message-input")
    const send = document.querySelector("#send-button")

    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "dark") {
        enableDarkMode();
    }
    darkModeToggle.addEventListener("change", function() {
        const selectedMode = darkModeToggle.value;

        if (selectedMode === "dark") {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
        localStorage.setItem("darkMode", selectedMode);
    });

    function enableDarkMode() {
        send.classList.add("dark-mode");
        body.classList.add("dark-mode");
        messageInput.classList.add("dark-mode");
        chatContainer.classList.add("dark-mode");
        
    }

    function disableDarkMode() {
        send.classList.remove("dark-mode");
        body.classList.remove("dark-mode");
        messageInput.classList.remove("dark-mode");
        chatContainer.classList.remove("dark-mode");
    }

    darkModeToggle.addEventListener("change", function() {
        const selectedMode = darkModeToggle.value;
        localStorage.setItem("darkMode", selectedMode);
    });

    function respond(){
        
    }

    sendButton.addEventListener('click', async function () {
        const message = messageInput.value;
        if (message) {
            try {
                const apiUrl = 'https://corsproxy.io/?https://blackbox.chatbotmesss.repl.co/ask?';
                const response = await axios.get(apiUrl, { params: { q: message } });
                const data = response.data;

                if (data.message !== "") {
                    const aiResponse = data.message;

                    if(isCode(aiResponse)){
                        highlight(aiResponse);
                    } else {
                        lBl(aiResponse);
                    }
                    
                } else {
                    console.error("Sorry, unable to get a response from the AI");
                }
            } catch (err) {
                console.error(err);
                console.log("An error occurred while fetching the data");
            }
        }
    });

    function lBl(response) {
        const paragraphs = response.split('\n\n');
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'ai-message';
        chatMessages.appendChild(aiMessageElement);

        for (let i = 0; i < paragraphs.length; i++) {
            aiMessageElement.innerHTML += paragraphs[i];
            if (i < paragraphs.length - 1) {
                aiMessageElement.innerHTML += '<br><br>';
            }
        }
    }
  
    function isCode(response) {
        if (response.trim().startsWith("```")) {
            console.log(response)
            return true;
        }
    }

    function highlight(text) {
        try {
            const aiMessageElement = document.createElement('pre');
            aiMessageElement.className = 'ai-message';
            chatMessages.appendChild(aiMessageElement);
    
            const codeElement = document.createElement('code');
            codeElement.style.backgroundColor = 'black';
            codeElement.style.color = 'white';
            aiMessageElement.appendChild(codeElement);
    
            let currentLetterIndex = 0;
    
            function displayLetters() {
                if (currentLetterIndex <= text.length) {
                    codeElement.textContent = text.slice(0, currentLetterIndex);
                    if (currentLetterIndex < text.length) {
                        setTimeout(displayLetters, 10); 
                    } else {
                        hljs.highlightElement(codeElement);
                    }
                    currentLetterIndex++;
                }
            }
    
            displayLetters();
        } catch (err) {
            console.log(err);
        }
    }
});
