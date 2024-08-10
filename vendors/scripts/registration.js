document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.tab-wizard2');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const cpasswordInput = document.getElementById('cpassword');
    const fullnameInput = document.getElementById('fullname');
    const genderInputs = document.getElementsByName('gender');
    
    // Feedback elements
    const emailFeedback = document.getElementById('emailFeedback');
    const passwordFeedback = document.getElementById('passwordFeedback');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function checkPasswordStrength(password) {
        if (password.length > 8) {
            return 'Strong';
        } else if (password.length >= 6) {
            return 'Medium';
        } else {
            return 'Weak';
        }
    }

    function validateSection1() {
        let isValid = true;
        
        // Validate Email
        if (emailInput.value.trim() === '') {
            emailFeedback.textContent = 'Email should not be blank.';
            emailFeedback.className = 'error';
            isValid = false;
        } else if (validateEmail(emailInput.value)) {
            emailFeedback.textContent = 'Valid email.';
            emailFeedback.className = 'valid';
        } else {
            emailFeedback.textContent = 'Please enter a valid email.';
            emailFeedback.className = 'error';
            isValid = false;
        }

        // Validate Username
        if (usernameInput.value.trim() === '') {
            usernameFeedback.textContent = 'Username should not be blank.';
            usernameFeedback.className = 'error';
            isValid = false;
        }

        // Validate Password
        const passwordStrength = checkPasswordStrength(passwordInput.value);
        if (passwordInput.value.trim() === '') {
            passwordFeedback.textContent = 'Password should not be blank.';
            passwordFeedback.className = 'error';
            isValid = false;
        } else {
            passwordFeedback.textContent = `Password strength: ${passwordStrength}`;
            passwordFeedback.className = passwordStrength === 'Strong' ? 'valid' : 'error';
        }

        // Validate Confirm Password
        if (cpasswordInput.value !== passwordInput.value) {
            confirmPasswordFeedback.textContent = 'Passwords do not match.';
            confirmPasswordFeedback.className = 'error';
            isValid = false;
        }

        return isValid;
    }

    function validateSection2() {
        let isValid = true;
        
        // Validate Full Name
        if (fullnameInput.value.trim() === '') {
            fullnameFeedback.textContent = 'Full Name should not be blank.';
            fullnameFeedback.className = 'error';
            isValid = false;
        }

        // Validate Gender
        const genderChecked = Array.from(genderInputs).some(input => input.checked);
        if (!genderChecked) {
            genderFeedback.textContent = 'Gender must be selected.';
            genderFeedback.className = 'error';
            isValid = false;
        }

        return isValid;
    }

    function validateForm() {
        if (validateSection1()) {
            // If Section 1 is valid, allow moving to Section 2
            if (validateSection2()) {
                // If Section 2 is valid, show success modal
                document.getElementById('success-modal-btn').click();
            } else {
                alert('Please complete all required fields in Section 2.');
            }
        } else {
            alert('Please correct the errors in Section 1 before proceeding.');
        }
    }

    // Event Listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        validateForm();
    });

    // Additional Event Listeners for real-time validation
    emailInput.addEventListener('input', function() {
        validateSection1();
    });

    passwordInput.addEventListener('input', function() {
        validateSection1();
    });

    cpasswordInput.addEventListener('input', function() {
        validateSection1();
    });

    usernameInput.addEventListener('input', function() {
        validateSection1();
    });

    fullnameInput.addEventListener('input', function() {
        validateSection2();
    });

    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateSection2();
        });
    });
});
