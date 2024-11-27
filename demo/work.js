document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple login validation
    if (username === 'username' && password === 'password') {
        alert('Login successful!');
        // Here you can redirect to another page if needed
    } else {
        alert('Invalid username or password');
    }
});
