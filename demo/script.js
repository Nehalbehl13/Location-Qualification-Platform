function generatePassword() {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    const passwordInput = document.getElementById("password");
    setTimeout(() => (passwordInput.value = password), 600);
  
    // Add animation class to the password input field
    passwordInput.classList.add("generated");
    setTimeout(() => passwordInput.classList.remove("generated"), 500);
  }