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

    
    sendButton.addEventListener('click', async function () {
      const message = messageInput.value;
      if (message) {
        try {
          const apiUrl = 'https://corsproxy.io/?https://blackbox.chatbotmesss.repl.co/ask?';
          const response = await axios.get(apiUrl, { params: { q: message } });
          const data = response.data;
  
          chatMessages.innerHTML += `<div class="user-message"><br>You: ${message}</div>`;
  
          if (data.message !== "") {
            const aiResponse = data.message;
  
            
            if (isCodeResponse(aiResponse)) {
              const formattedCode = highlightCode(aiResponse);
              chatMessages.innerHTML += `<div class="ai-message"><br>AI: ${formattedCode}</div>`;
            } else {
              chatMessages.innerHTML += `<div class="ai-message"><br>AI: ${data.message}</div>`;
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
  
    
    function isCodeResponse(response) {
        
      if(response.trim().startsWith("```")) {
        console.log(response)
        return true;
      }
      
    }
  
    function highlightCode(code) {
        const codeElement = document.createElement('code');
        codeElement.textContent = code; 
        hljs.highlightElement(codeElement);
      
        const preElement = document.createElement('pre');
        preElement.appendChild(codeElement);
      
        return preElement.outerHTML;
      }
  
  });
  