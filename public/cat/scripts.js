// here there be JS, yarrr ☠️
const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

const handleFocus = () => {
  messageInput.focus();
};

const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement("p");
  messageElem.classList.add("message", author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  if (author === "user") {
    messageInput.value = "";
  }
  handleFocus();
};

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();
  const message = { author: "user", text: messageInput.value };
  updateConversation(message);
  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
};

handleFocus();
