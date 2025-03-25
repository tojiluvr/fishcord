// Set profile pic from file input
function previewProfilePicFromFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("profile-pic").src = e.target.result;
      document.getElementById("profile-pic-sidebar").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Set profile pic from URL
function previewProfilePicFromURL() {
  const url = document.getElementById("image-url-input").value;
  document.getElementById("profile-pic").src = url;
  document.getElementById("profile-pic-sidebar").src = url;
}

// Handle starting the chat by storing username
function startChat() {
  const username = document.getElementById("username-input").value;
  if (username) {
    localStorage.setItem("username", username);
    window.location.href = "chatroom.html";
  } else {
    alert("Please enter a username!");
  }
}

// Send message to the chat
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();
  const username = localStorage.getItem("username") || "Anonymous";

  if (messageText) {
    const messageContainer = document.getElementById("message-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    messageElement.innerHTML = `<strong>${username}:</strong> ${messageText}`;
    messageContainer.appendChild(messageElement);

    // Clear input and scroll to bottom
    messageInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

// On chatroom page, load the username and profile picture
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Guest";
  const profilePic = document.getElementById("profile-pic-sidebar");

  document.getElementById("username-sidebar").textContent = username;
  profilePic.src = document.getElementById("profile-pic").src || "default-pic.png";
});
