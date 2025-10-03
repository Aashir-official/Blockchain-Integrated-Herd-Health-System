// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Toggle mobile navigation menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('open');
    });

    // Newsletter subscription (mock function)
    window.subscribeNewsletter = function() {
        const email = document.getElementById('newsletter-email').value;
        if (email) {
            alert(`Subscribed successfully with email: ${email}`);
        } else {
            alert('Please enter a valid email address.');
        }
    };

    // Additional JS functionality can be added here
});

// Password visibility toggle
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId + '-eye');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Load saved credentials on page load for user login
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on user login page and load saved credentials
    const emailPhoneInput = document.getElementById('email-phone');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    
    if (emailPhoneInput && passwordInput && rememberMeCheckbox) {
        const savedCredentials = localStorage.getItem('bihhsUserCredentials');
        if (savedCredentials) {
            const { emailPhone, password } = JSON.parse(savedCredentials);
            emailPhoneInput.value = emailPhone;
            passwordInput.value = password;
            rememberMeCheckbox.checked = true;
        }
    }
    
    // Check if we're on admin login page and load saved admin credentials
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminCodeInput = document.getElementById('admin-code');
    const adminRememberCheckbox = document.getElementById('admin-remember');
    
    if (adminUsernameInput && adminPasswordInput && adminCodeInput && adminRememberCheckbox) {
        const savedAdminCredentials = localStorage.getItem('bihhsAdminCredentials');
        if (savedAdminCredentials) {
            const { username, password, securityCode } = JSON.parse(savedAdminCredentials);
            adminUsernameInput.value = username;
            adminPasswordInput.value = password;
            adminCodeInput.value = securityCode;
            adminRememberCheckbox.checked = true;
        }
    }

    // Attach inline validation on auth forms
    attachAuthValidation();
});

// Enhanced validation functions
function validateFullName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

function validatePhone(phone) {
    const phoneRegex = /^03[0-9]{9}$/;
    return phoneRegex.test(phone) && phone.length === 11;
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
}

function validateEmailOrPhone(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^03[0-9]{9}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
}

// ----- Inline validation helpers -----
function setFieldError(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const err = document.getElementById(`error-${input.id}`);
    if (err) err.textContent = message || '';
}

function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    const err = document.getElementById(`error-${input.id}`);
    if (err) err.textContent = '';
}

function markFieldValid(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const err = document.getElementById(`error-${input.id}`);
    if (err) err.textContent = '';
}

function validateInput(input) {
    const id = input.id;
    const val = input.value.trim();
    switch (id) {
        case 'email-phone':
            if (!validateEmailOrPhone(val)) return 'Enter a valid email or 11-digit phone starting with 03';
            return '';
        case 'email':
            return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Enter a valid email address');
        case 'full-name':
        case 'contact-person':
            return (validateFullName(val) ? '' : 'Only letters and spaces');
        case 'company-name':
        case 'farm-name':
            return (val ? '' : 'Required');
        case 'phone':
            return (validatePhone(val) ? '' : 'Must be 11 digits starting with 03');
        case 'password':
            return (validatePassword(val) ? '' : 'Password must be at least 6 characters. For stronger security, use uppercase, lowercase and a symbol.');
        case 'confirm-password':
            const pwd = document.getElementById('password');
            return (pwd && val === pwd.value ? '' : 'Passwords do not match');
        default:
            return '';
    }
}

function attachAuthValidation() {
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                const msg = validateInput(input);
                if (msg) setFieldError(input, msg); else markFieldValid(input);
            });
        });
    });
}

// Display server-side validation errors inline (same format)
function displayServerErrors(form, errors) {
    // errors: { fieldId: message }
    if (!form || !errors) return;
    Object.keys(errors).forEach(id => {
        const input = form.querySelector(`#${id}`);
        if (input) setFieldError(input, errors[id]);
    });
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) firstInvalid.focus();
}

// Form handling functions
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;

    const emailPhoneInput = document.getElementById('email-phone');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('remember-me')?.checked;

    // Clear previous errors
    [emailPhoneInput, passwordInput].forEach(clearFieldError);

    // Validate
    let hasError = false;
    const emailMsg = validateInput(emailPhoneInput);
    if (emailMsg) { setFieldError(emailPhoneInput, emailMsg); hasError = true; }
    const pwdMsg = validateInput(passwordInput);
    if (pwdMsg) { setFieldError(passwordInput, pwdMsg); hasError = true; }

    if (hasError) {
        (form.querySelector('.is-invalid') || emailPhoneInput).focus();
        return;
    }

    // Save credentials if remember me is checked
    if (rememberMe) {
        localStorage.setItem('bihhsUserCredentials', JSON.stringify({
            emailPhone: emailPhoneInput.value,
            password: passwordInput.value
        }));
    } else {
        localStorage.removeItem('bihhsUserCredentials');
    }

    // Redirect to dashboard (preserve existing flow)
    window.location.href = 'dashboard.html';
}

// Forgot password functionality (placeholder)
function handleForgotPassword() {
    const email = prompt('Please enter your email address for password reset:');
    
    if (email) {
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate password reset process
        alert(`Password reset instructions have been sent to ${email}.\n\nNote: This is a demo. Backend implementation will handle actual password reset functionality.`);
    }
}

function handleSignup(event, userType) {
    event.preventDefault();
    const form = event.target;

    const inputs = form.querySelectorAll('input');
    inputs.forEach(clearFieldError);

    let hasError = false;
    inputs.forEach(input => {
        const msg = validateInput(input);
        if (msg) { setFieldError(input, msg); hasError = true; }
    });

    if (hasError) {
        (form.querySelector('.is-invalid') || inputs[0])?.focus();
        return;
    }

    // Preserve existing redirect flow without alerts
    window.location.href = 'dashboard.html';
}
