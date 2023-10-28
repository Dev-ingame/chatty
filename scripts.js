document.addEventListener('DOMContentLoaded', function () {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');
  
  sendButton.addEventListener('click', async function () {
      const message = messageInput.value;
      if (message) {
          try {
              const apiUrl = 'https://corsproxy.io/?https://blackbox.chatbotmesss.repl.co/ask?';
              const response = await axios.get(apiUrl, { params: { q: message } });
              const data = response.data;

              chatMessages.innerHTML += `<div class="user-message"><br>You: ${message}</div>`;

              if (data.message !== "") {
                  chatMessages.innerHTML += `<div class="ai-message"><br>AI: ${data.message}</div>`;
              } else {
                  console.error("Sorry unable to get a response from the AI");
              }
          } catch (err) {
              console.error(err);
              console.log("An error occurred while fetching the data");
          }
      }
  });
});
