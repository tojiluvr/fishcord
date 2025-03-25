// Function to handle profile picture upload
function updateProfilePic() {
    const fileInput = document.getElementById('file-upload');
    const profilePic = document.getElementById('profile-pic');
    
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profilePic.src = event.target.result; // Update profile picture with the uploaded image
        };
        reader.readAsDataURL(file); // Read the image file as a Data URL
    }
}

// Function to update the username
function updateUsername() {
    const usernameInput = document.getElementById('username-input');
    const displayUsername = document.getElementById('display-username');
    
    const username = usernameInput.value.trim(); // Get the username input
    if (username) {
        displayUsername.textContent = username; // Update the username display
    } else {
        displayUsername.textContent = "Your Name"; // Default placeholder text
    }
}
