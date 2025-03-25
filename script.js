// Preview profile picture from file upload
function previewProfilePicFromFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const profilePic = document.getElementById('profile-pic');
    profilePic.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Preview profile picture from URL input
function previewProfilePicFromURL() {
  const url = document.getElementById('image-url-input').value;
  const profilePic = document.getElementById('profile-pic');
  profilePic.src = url;
}
