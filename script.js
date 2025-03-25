// Function to handle profile picture upload
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the file selected
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePic = document.getElementById('profile-pic');
            profilePic.src = e.target.result; // Set the image source to the uploaded file
        };
        reader.readAsDataURL(file); // Read the file as Data URL
    }
});

// Function to update username in real-time
document.getElementById('username-input').addEventListener('input', function(event) {
    const username = event.target.value.trim();
    const displayUsername = document.getElementById('display-username');
    if (username) {
        displayUsername.textContent = username; // Set the displayed username to the input value
    } else {
        displayUsername.textContent = 'Your Name'; // Default text when the input is empty
    }
});
