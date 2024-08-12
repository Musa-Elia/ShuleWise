document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.querySelector('input[type="password"]:not(#cpassword)');
    const confirmPasswordInput = document.getElementById('cpassword');
    
    const emailFeedback = document.getElementById('emailFeedback');
    const usernameFeedback = document.getElementById('usernameFeedback');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
    
    const nextButton = document.querySelector('.actions .next');

    let isEmailValid = false;
    let isUsernameValid = false;
    let isPasswordValid = false;
    let isPasswordConfirmed = false;

    emailInput.addEventListener('input', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isEmailValid = emailPattern.test(emailInput.value);
        emailFeedback.textContent = isEmailValid ? 'Valid Email' : 'Invalid Email';
        emailFeedback.style.color = isEmailValid ? 'green' : 'red';
    });

    usernameInput.addEventListener('input', function () {
        const usernamePattern = /^[a-zA-Z0-9]{4,}$/;
        isUsernameValid = usernamePattern.test(usernameInput.value);
        usernameFeedback.textContent = isUsernameValid ? 'Valid Username' : 'Username must be at least 4 characters and alphanumeric';
        usernameFeedback.style.color = isUsernameValid ? 'green' : 'red';
    });

    passwordInput.addEventListener('input', function () {
        const value = passwordInput.value;
        if (value.length < 6) {
            passwordFeedback.textContent = 'Too short';
            passwordFeedback.style.color = 'red';
            isPasswordValid = false;
        } else if (value.length >= 6 && value.length < 8) {
            passwordFeedback.textContent = 'Weak';
            passwordFeedback.style.color = 'orange';
            isPasswordValid = false;
        } else {
            const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            isPasswordValid = strongPattern.test(value);
            passwordFeedback.textContent = isPasswordValid ? 'Strong' : 'Medium';
            passwordFeedback.style.color = isPasswordValid ? 'green' : 'orange';
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        isPasswordConfirmed = confirmPasswordInput.value === passwordInput.value;
        confirmPasswordFeedback.textContent = isPasswordConfirmed ? 'Passwords match' : 'Passwords do not match';
        confirmPasswordFeedback.style.color = isPasswordConfirmed ? 'green' : 'red';
    });

    nextButton.addEventListener('click', function (event) {
        if (!isEmailValid || !isUsernameValid || !isPasswordValid || !isPasswordConfirmed) {
            event.preventDefault();
            alert('Please fix the errors before proceeding to the next step.');
        }
    });
});
