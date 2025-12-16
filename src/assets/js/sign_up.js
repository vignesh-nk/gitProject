    // Global toastr settings
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

// Toggle dropdown visibility
window.toggleCountryDropdown = function() {
    const dropdown = document.getElementById('country-dropdown');
    dropdown.classList.toggle('hidden');
}

// Select country from dropdown
window.selectCountry = function(code, country) {
    document.getElementById('country-code-input').value = code;
    document.getElementById('country-dropdown').classList.add('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.group')) {
        document.getElementById('country-dropdown').classList.add('hidden');
    }
});

// Filter countries by search
document.getElementById('country-search').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const options = document.querySelectorAll('.country-options div');

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// Validate country code input
document.getElementById('country-code-input').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

const modal = document.getElementById("exampleModalSizeSm");
  const openLink = document.getElementById("openModalLink");
  const closeBtn = document.getElementById("closeModalBtn");

  openLink.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const signUpBtn = document.getElementById('kt_signup_submit');
    const confirmBtn = document.getElementById('kt_confirmation_submit');
    const signUpForm = document.getElementById('kt_signup_form');
    const confirmForm = document.getElementById('kt_signup_confirm_form');

    // Email validation function
    window.isValidEmail = function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    // Sign Up Button Click Handler
    signUpBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm_password').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const countryCode = document.getElementById('country-code-input').value.trim();
        const phoneNumber = `+${countryCode}${phone}`;
        // Validate inputs
        if (!username || !password || !confirmPassword || !gender || !phone || !email) {
            toastr.warning('Please fill in all fields');
            return;
        }

        const checkbox = document.getElementById('myCheckbox');
        if (!checkbox.checked) {
            toastr.warning('Please accept the Terms and Conditions.');
            return;
        }
        // Username validationp
        const usernameError = validateUsername(username);
        if (usernameError) {
            document.getElementById('username-error').textContent = usernameError;
            document.getElementById('username-error').style.display = 'block';
            toastr.warning(usernameError);
            return;
        }

        // Check password match
        if (password !== confirmPassword) {
            toastr.warning('Passwords do not match');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            toastr.warning('Please enter a valid email address');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            toastr.warning(passwordError);
            return;
        }
        // reCAPTCHA integration
        grecaptcha.ready(function () {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "signup" }).then(function (token) {
            if (!token) {
                toastr.error("⚠ reCAPTCHA verification failed. Please try again.");
                return;
            }

            // Create request body with reCAPTCHA token
            const data = {
                username: username,
                password: password,
                email: email,
                phone_number: phoneNumber,
                gender: gender,
                name: username,
                recaptcha_token: token // Send token to backend for verification
            };

            // Make sign-up API call
            fetch(`${BASE_URL}authenticate/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw err; });
                    }
                    return response.json();
                })
                .then(data => {
                    toastr.success(data.message || 'Sign-up successful! Please check your email for confirmation code.');
                    // Switch to confirmation form
                    signUpForm.style.display = 'none';
                    confirmForm.style.display = 'flex';
                                    // Auto-fill the username in confirmation form
                    document.getElementById('confirmUserNmae').value = username;
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error(error.error || 'An error occurred during sign-up. Please try again.');
                });
        }).catch(() => {
            toastr.error("⚠ Failed to load reCAPTCHA. Please try again.");
        });
    });

        // // Create request body with all fields
        // const data = {
        //     username: username,
        //     password: password,
        //     email: email,
        //     phone_number: phoneNumber,  // Note the change from 'phone' to 'phone_number'
        //     gender: gender,
        //     name: username  // Added the required name field
        // };

        // // Make sign-up API call
        // fetch(`${BASE_URL}authenticate/sign-up`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             return response.json().then(err => { throw err; });
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         toastr.success(data.message || 'Sign-up successful! Please check your email for confirmation code.');

        //         // Switch to confirmation form
        //         signUpForm.style.display = 'none';
        //         confirmForm.style.display = 'flex';

        //         // Auto-fill the username in confirmation form
        //         document.getElementById('confirmUserNmae').value = username;
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         toastr.error(error.error || 'An error occurred during sign-up. Please try again.');
        //     });
    });

    // Confirmation Button Click Handler
    confirmBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const username = document.getElementById('confirmUserNmae').value.trim();
        const confirmationCode = document.getElementById('confirmCode').value.trim();

        // Validate inputs
        if (!username || !confirmationCode) {
            toastr.warning('Please fill in all fields');
            return;
        }

        // Create request body
        const data = {
            username: username,
            confirmation_code: confirmationCode
        };

        // Make confirmation API call
        fetch(`${BASE_URL}authenticate/confirm-sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                toastr.success(data.message || 'Account confirmed successfully! You can now login.');

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/login/';
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.error === "Invalid confirmation code") {
                    toastr.error('The confirmation code is invalid. Please check your email and try again.');
                } else {
                    toastr.error(error.error || 'An error occurred during confirmation. Please try again.');
                }
            });
    });
});

// Username validation logic (used in both places)

    window.validateUsername = function(value) {
        const reservedUsernames = ['admin','root','support','null','undefined','administrator','qa','tester','uat','staging','sandbox','tem','dns','ftp','mail','smtp','relay','proxy','firewall','vpn','router','switch','service','services','api','apiuser','automation','bot','daemon','monitor','backup','restore','reporting','scheduler','cron','ceo','coo','cfo','founder','president','chairman','director','vp','hr','finance','accounting','payroll','securityteam','infosec','blue','redteam','soc','secops','forensics','incident','dev','developer','devops','engineer','architect','cto','cio','ciso','itstaff','techsupport','technician','sa','oracle','postgres','mysql','dbowner','dba','schemaadmin','user','rootuser','default','test','administrator1','admin1','admin123','cloudadmin','awsadmin','azureadmin','gcpadmin','platformadmin','tenantadmin','system','sysadmin','supervisor','manager','owner','operator','poweruser','helpdesk','itadmin','netadmin','secadmin', 'superuser', 'superadmin'];
        const blocklistWords = ['badword', 'offensive']; // Extend as needed

    const username = value.trim();

    // 1. Length check
    if (username.length < 3) {
        return "Username must be atleast 3 characters.";
    }

    // 2. Allowed character pattern
    const validPattern = /^[a-zA-Z0-9._-]+$/;
    if (!validPattern.test(username)) {
        return "Username contains invalid characters.";
    }

    // 3. No leading/trailing special characters
    if (/^[._-]/.test(username) || /[._-]$/.test(username)) {
        return "Username cannot start or end with a special character.";
    }

    // 4. No consecutive special characters
    if (/[\.\-_]{2,}/.test(username)) {
        return "Username cannot contain consecutive special characters.";
    }

    // 5. Reserved usernames
    if (reservedUsernames.includes(username.toLowerCase())) {
        return "This username is reserved. Please choose another.";
    }

    // 6. Offensive words
    for (const word of blocklistWords) {
        if (username.toLowerCase().includes(word)) {
            return "Username contains inappropriate content.";
        }
    }

    return ""; // No error
}


// Handle username keyup validation
window.handleUsernameKeyup = function() {
    const input = document.getElementById('username');
    const errorEl = document.getElementById('username-error');
    const errorMsg = validateUsername(input.value.trim());

    if (errorMsg) {
        errorEl.textContent = errorMsg;
        errorEl.style.display = "block";
        errorEl.style.fontSize = "12px";
    } else {
        errorEl.textContent = "";
        errorEl.style.display = "none";
    }
}


window.validatePassword = function(password) {
    // Minimum length check
    if (password.length < 12) {
        return "Password must be at least 12 characters long.";
    }

    // Complexity checks
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    let errorMessages = [];
    
    if (!hasNumber) {
        errorMessages.push("at least 1 number");
    }
    if (!hasSpecialChar) {
        errorMessages.push("at least 1 special character");
    }
    if (!hasUpperCase) {
        errorMessages.push("at least 1 uppercase letter");
    }
    if (!hasLowerCase) {
        errorMessages.push("at least 1 lowercase letter");
    }

    if (errorMessages.length > 0) {
        return "Password must contain " + errorMessages.join(", ");
    }

    return ""; // No error
}


document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    const errorEl = document.getElementById('password-error');
    
    // Create error element if it doesn't exist
    if (!errorEl) {
        const passwordDiv = document.querySelector('[name="password"]').parentNode;
        const newErrorEl = document.createElement('span');
        newErrorEl.id = 'password-error';
        newErrorEl.style.color = 'red';
        newErrorEl.style.display = 'none';
        newErrorEl.style.fontSize = '12px';
        passwordDiv.appendChild(newErrorEl);
    }
    
    const errorMsg = validatePassword(password);
    const errorElement = document.getElementById('password-error');
    
    if (errorMsg) {
        errorElement.textContent = errorMsg;
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
});

document.querySelectorAll('.eyeToggle').forEach(icon => {
    icon.addEventListener('click', function() { 
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const isPassword = input.type === 'password';
        
        input.type = isPassword ? 'text' : 'password';
        
        this.innerHTML = isPassword ? '<i class="ki-outline ki-eye-slash"></i>' : '<i class="ki-outline ki-eye"></i>';
    });
});
