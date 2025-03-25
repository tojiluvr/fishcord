// Profile Picture Preview from File Input
function previewProfilePicFromFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = reader.result; // Set the image to the uploaded file
  }

  if (file) {
    reader.readAsDataURL(file); // Read the file
  }
}

// Username Update
function updateUsername() {
  const usernameInput = document.getElementById("username-input");
  const username = usernameInput.value.trim();
  const profilePic = document.getElementById("profile-pic");

  if (username !== "") {
    // For now, just log it to the console
    console.log("Username updated:", username);
  }
}

// Send Message Function
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value;

  if (messageText.trim() !== "") {
    const messageContainer = document.getElementById("message-container");

    // Create new message element
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    // Add username and message content
    const usernameElement = document.createElement("span");
    usernameElement.classList.add("username");
    usernameElement.textContent = "Toji:"; // Placeholder for username

    const textElement = document.createElement("span");
    textElement.classList.add("text");
    textElement.textContent = messageText;

    // Append username and text to message element
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);

    // Append new message to container
    messageContainer.appendChild(messageElement);

    // Clear input field
    messageInput.value = "";

    // Scroll to the bottom of the message container
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}
