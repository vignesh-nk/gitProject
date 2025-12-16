(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./src/assets/js/sign_up.js ***!
  \**********************************/
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
window.toggleCountryDropdown = function () {
  var dropdown = document.getElementById('country-dropdown');
  dropdown.classList.toggle('hidden');
};

// Select country from dropdown
window.selectCountry = function (code, country) {
  document.getElementById('country-code-input').value = code;
  document.getElementById('country-dropdown').classList.add('hidden');
};

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  if (!e.target.closest('.group')) {
    document.getElementById('country-dropdown').classList.add('hidden');
  }
});

// Filter countries by search
document.getElementById('country-search').addEventListener('input', function (e) {
  var searchTerm = e.target.value.toLowerCase();
  var options = document.querySelectorAll('.country-options div');
  options.forEach(function (option) {
    var text = option.textContent.toLowerCase();
    option.style.display = text.includes(searchTerm) ? 'block' : 'none';
  });
});

// Validate country code input
document.getElementById('country-code-input').addEventListener('input', function (e) {
  this.value = this.value.replace(/[^0-9]/g, '');
});
var modal = document.getElementById("exampleModalSizeSm");
var openLink = document.getElementById("openModalLink");
var closeBtn = document.getElementById("closeModalBtn");
openLink.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "block";
});
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
document.addEventListener('DOMContentLoaded', function () {
  // Form elements
  var signUpBtn = document.getElementById('kt_signup_submit');
  var confirmBtn = document.getElementById('kt_confirmation_submit');
  var signUpForm = document.getElementById('kt_signup_form');
  var confirmForm = document.getElementById('kt_signup_confirm_form');

  // Email validation function
  window.isValidEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Sign Up Button Click Handler
  signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirm_password').value.trim();
    var gender = document.getElementById('gender').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var countryCode = document.getElementById('country-code-input').value.trim();
    var phoneNumber = "+".concat(countryCode).concat(phone);
    // Validate inputs
    if (!username || !password || !confirmPassword || !gender || !phone || !email) {
      toastr.warning('Please fill in all fields');
      return;
    }
    var checkbox = document.getElementById('myCheckbox');
    if (!checkbox.checked) {
      toastr.warning('Please accept the Terms and Conditions.');
      return;
    }
    // Username validationp
    var usernameError = validateUsername(username);
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
    var passwordError = validatePassword(password);
    if (passwordError) {
      toastr.warning(passwordError);
      return;
    }
    // reCAPTCHA integration
    grecaptcha.ready(function () {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "signup"
      }).then(function (token) {
        if (!token) {
          toastr.error("⚠ reCAPTCHA verification failed. Please try again.");
          return;
        }

        // Create request body with reCAPTCHA token
        var data = {
          username: username,
          password: password,
          email: email,
          phone_number: phoneNumber,
          gender: gender,
          name: username,
          recaptcha_token: token // Send token to backend for verification
        };

        // Make sign-up API call
        fetch("".concat(BASE_URL, "authenticate/sign-up"), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              throw err;
            });
          }
          return response.json();
        }).then(function (data) {
          toastr.success(data.message || 'Sign-up successful! Please check your email for confirmation code.');
          // Switch to confirmation form
          signUpForm.style.display = 'none';
          confirmForm.style.display = 'flex';
          // Auto-fill the username in confirmation form
          document.getElementById('confirmUserNmae').value = username;
        })["catch"](function (error) {
          console.error('Error:', error);
          toastr.error(error.error || 'An error occurred during sign-up. Please try again.');
        });
      })["catch"](function () {
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
    var username = document.getElementById('confirmUserNmae').value.trim();
    var confirmationCode = document.getElementById('confirmCode').value.trim();

    // Validate inputs
    if (!username || !confirmationCode) {
      toastr.warning('Please fill in all fields');
      return;
    }

    // Create request body
    var data = {
      username: username,
      confirmation_code: confirmationCode
    };

    // Make confirmation API call
    fetch("".concat(BASE_URL, "authenticate/confirm-sign-up"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          throw err;
        });
      }
      return response.json();
    }).then(function (data) {
      toastr.success(data.message || 'Account confirmed successfully! You can now login.');

      // Redirect to login page after 2 seconds
      setTimeout(function () {
        window.location.href = '/login/';
      }, 2000);
    })["catch"](function (error) {
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

window.validateUsername = function (value) {
  var reservedUsernames = ['admin', 'root', 'support', 'null', 'undefined', 'administrator', 'qa', 'tester', 'uat', 'staging', 'sandbox', 'tem', 'dns', 'ftp', 'mail', 'smtp', 'relay', 'proxy', 'firewall', 'vpn', 'router', 'switch', 'service', 'services', 'api', 'apiuser', 'automation', 'bot', 'daemon', 'monitor', 'backup', 'restore', 'reporting', 'scheduler', 'cron', 'ceo', 'coo', 'cfo', 'founder', 'president', 'chairman', 'director', 'vp', 'hr', 'finance', 'accounting', 'payroll', 'securityteam', 'infosec', 'blue', 'redteam', 'soc', 'secops', 'forensics', 'incident', 'dev', 'developer', 'devops', 'engineer', 'architect', 'cto', 'cio', 'ciso', 'itstaff', 'techsupport', 'technician', 'sa', 'oracle', 'postgres', 'mysql', 'dbowner', 'dba', 'schemaadmin', 'user', 'rootuser', 'default', 'test', 'administrator1', 'admin1', 'admin123', 'cloudadmin', 'awsadmin', 'azureadmin', 'gcpadmin', 'platformadmin', 'tenantadmin', 'system', 'sysadmin', 'supervisor', 'manager', 'owner', 'operator', 'poweruser', 'helpdesk', 'itadmin', 'netadmin', 'secadmin', 'superuser', 'superadmin'];
  var blocklistWords = ['badword', 'offensive']; // Extend as needed

  var username = value.trim();

  // 1. Length check
  if (username.length < 3) {
    return "Username must be atleast 3 characters.";
  }

  // 2. Allowed character pattern
  var validPattern = /^[a-zA-Z0-9._-]+$/;
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
  for (var _i = 0, _blocklistWords = blocklistWords; _i < _blocklistWords.length; _i++) {
    var word = _blocklistWords[_i];
    if (username.toLowerCase().includes(word)) {
      return "Username contains inappropriate content.";
    }
  }
  return ""; // No error
};

// Handle username keyup validation
window.handleUsernameKeyup = function () {
  var input = document.getElementById('username');
  var errorEl = document.getElementById('username-error');
  var errorMsg = validateUsername(input.value.trim());
  if (errorMsg) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = "block";
    errorEl.style.fontSize = "12px";
  } else {
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }
};
window.validatePassword = function (password) {
  // Minimum length check
  if (password.length < 12) {
    return "Password must be at least 12 characters long.";
  }

  // Complexity checks
  var hasNumber = /\d/.test(password);
  var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var errorMessages = [];
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
};
document.getElementById('password').addEventListener('input', function (e) {
  var password = e.target.value;
  var errorEl = document.getElementById('password-error');

  // Create error element if it doesn't exist
  if (!errorEl) {
    var passwordDiv = document.querySelector('[name="password"]').parentNode;
    var newErrorEl = document.createElement('span');
    newErrorEl.id = 'password-error';
    newErrorEl.style.color = 'red';
    newErrorEl.style.display = 'none';
    newErrorEl.style.fontSize = '12px';
    passwordDiv.appendChild(newErrorEl);
  }
  var errorMsg = validatePassword(password);
  var errorElement = document.getElementById('password-error');
  if (errorMsg) {
    errorElement.textContent = errorMsg;
    errorElement.style.display = 'block';
  } else {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
});
document.querySelectorAll('.eyeToggle').forEach(function (icon) {
  icon.addEventListener('click', function () {
    var targetId = this.getAttribute('data-target');
    var input = document.getElementById(targetId);
    var isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    this.innerHTML = isPassword ? '<i class="ki-outline ki-eye-slash"></i>' : '<i class="ki-outline ki-eye"></i>';
  });
});
/******/ 	return __webpack_exports__;
/******/ })()
;
});