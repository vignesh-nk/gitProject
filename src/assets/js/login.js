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

// let otpSentTime = null;
// const currentYear = new Date().getFullYear();
// document.getElementById('current-year').textContent = currentYear;

// async function handleLoginSubmit() {
//     const userName = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const now = new Date();

//     document.getElementById("kt_login_signin_submit").disabled = true;

//     if (!userName || !password) {
//         document.getElementById("kt_login_signin_submit").disabled = false;
//         toastr.warning("Please enter both username and password.");
//         return;
//     }

//     try {
//         const response = await fetch(`${BASE_URL}login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user_name: userName,
//                 password: password,
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             if (data.access_token) {
//                 localStorage.setItem('access_token', data.access_token);
//                 localStorage.setItem('access_token_time', now.getTime()); 
//                 // Call this after login attempt
//                 logEvent("token-generated", "Token Generated successfully.","");

//                 if (data.mfa_required) {
//                     // MFA is required
//                     document.getElementById('kt_login_signin_form').style.display = 'none';
//                     document.getElementById('kt_login_mfa_form').style.display = 'flex';
//                     toastr.success('OTP sent to your registered Email ID. Please verify.');
//                     otpSentTime = new Date();
//                     // Call this after login attempt
//                     logEvent("mfa-login-success", "User admin mfa-logged in successfully.","");

//                 } else {
//                     // Call this after login attempt
//                     logEvent("Normal-login-success", "User Normal logged in successfully.","");

//                     // MFA is not required, redirect
//                     toastr.success('Login successful!');
//                     setTimeout(() => {
//                         window.location.href = "template/patient_summary.html?user_name=" + encodeURIComponent(userName);
//                     }, 1000); // Optional delay to show success toast
//                 }
//             } else {
//                 // Call this after login attempt
//                 logEvent("Token-not-generate", "token not generated for user", "");

//                 toastr.error('JWT token not received.');
//             }
//         } else {
//             document.getElementById("kt_login_signin_submit").disabled = false;
//             toastr.error(data.message || 'Login failed! Please check your credentials.');
//         }
//     } catch (error) {
//         // Call this after login attempt
//         logEvent("Login-error", "User admin logging-in error.", error);

//         document.getElementById("kt_login_signin_submit").disabled = false;
//         console.error('Error:', error);
//         toastr.error('An unexpected error occurred. Please try again later.');
//     }
// }



// document.getElementById('kt_login_mfa_submit').addEventListener('click', async () => {
//   const otp = document.getElementById('otp').value;
//   const userName = document.getElementById('username').value;
//   const token = localStorage.getItem('access_token');
//     if (!token) {
//         window.location.href = 'index.html';
//     }

//      // ✅ Check if OTP is expired
//   const now = new Date();
//   const timeDiffInSeconds = (now - otpSentTime) / 1000;

//   if(otp === ''){
//     toastr.warning("Please Enter Otp");
//     return false;
//   }
//   if (timeDiffInSeconds > 300) {
//     document.getElementById('otp').value ='';
//     toastr.error("OTP expired. Click Resend to get Otp");
//     return;
//   }

//   // Send OTP verification request to the backend
//   const response = await fetch(`${BASE_URL}verify-otp`, {
//     method: 'POST',
//     headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//     body: JSON.stringify({ 
//         user_name: userName,
//         otp: otp, }),
//   });

//   const data = await response.json();
//   if (data.authenticated) {
//     toastr.success('MFA verified! Login complete.');
//     window.location.href = "template/patient_summary.html?user_name="+userName;
//   } else {
//     toastr.error('OTP verification failed!');
//   }
// });

//     const input = document.getElementById("kt_login_signin_form");
// 	input.addEventListener("keypress", function(event) {
// 	if (event.key === "Enter") {
// 		event.preventDefault();
// 		document.getElementById("kt_login_signin_submit").click();
// 	}
// 	});

//     const inputMfa = document.getElementById("kt_login_mfa_form");
// 	inputMfa.addEventListener("keypress", function(event) {
// 	if (event.key === "Enter") {
// 		event.preventDefault();
// 		document.getElementById("kt_login_mfa_submit").click();
// 	}
// 	});

// // to add log for login 
//     function logEvent(eventType, message, error) {
//         const log = {
//           eventType: eventType,
//           message: message,
//           timestamp: new Date().toISOString(),
//           userAgent: navigator.userAgent,
//           errorMessage: error
//         };

//         fetch(`${BASE_URL}logs`, {  // Adjust port & URL if needed
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(log)
//         }).catch(err => console.error("Logging failed", err));
//       }

//     document.getElementById('kt_login_signin_submit').addEventListener('click', handleLoginSubmit);

//     function resendOtp(){
//         handleLoginSubmit(); 
//     }
function validatePassword(password) {
  if (password.length < 12) {
    return "Password must be at least 12 characters long.";
  }

  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  let errorMessages = [];
  if (!hasNumber) errorMessages.push("1 number");
  if (!hasSpecialChar) errorMessages.push("1 special character");
  if (!hasUpperCase) errorMessages.push("1 uppercase letter");
  if (!hasLowerCase) errorMessages.push("1 lowercase letter");

  if (errorMessages.length > 0) {
    return "Password must contain " + errorMessages.join(", ");
  }

  return "";
}

function isAdminLogin(username) {
  return username === "administrator";
}


let tempSession = "";
let tempUsername = "";
let tempPassword = "";

document.getElementById('kt_login_signin_submit').addEventListener('click', async (e) => {
  e.preventDefault()
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    toastr.warning("Username and password are required");
    return;
  }

  tempUsername = username;
  tempPassword = password;

  try {
    const res = await fetch(`${window.BASE_URL}/authenticate/login-with-cognito`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.challenge === "NEW_PASSWORD_REQUIRED") {
      tempSession = data.session;
      // Show new password form to the user
      document.getElementById("new-password-form").style.display = "block";
      document.getElementById("kt_login_signin_form").style.display = "none";
      return;
    }
    else if (data.setup_required) {
      // Show QR code for MFA setup
      if (isAdminLogin(username)) {
        toastr.success("Admin login successful!");
        window.location.href = "admin/admin-dashboard.html";
        return;
      }
      tempSession = data.session;
      document.getElementById("qrImage").src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data.qr_uri)}&size=200x200`;
      document.getElementById("mfa-setup").style.display = "block";
      document.getElementById("kt_login_signin_form").style.display = "none";
    } else if (data.mfa_required) {
      if (isAdminLogin(username)) {
        toastr.success("Admin login successful!");
        window.location.href = "admin/admin-dashboard.html";
        return;
      }
      tempSession = data.session;
      document.getElementById("mfa-challenge").style.display = "block";
      document.getElementById("kt_login_signin_form").style.display = "none";
    } else if (data.access_token) {
      // Save the tokens temporarily in window scope or a global var
      window.pendingLoginData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        id_token: data.id_token,
        timestamp: new Date().getTime()
      };
      const decoded = getPasswordExpirationWarning(data.id_token);
      if (decoded && decoded.password_expiration_warning) {
        document.getElementById("passwordExpiryMessage").textContent = decoded.password_expiration_warning;

        // Show modal (use style instead of Bootstrap classes)
        const modal = document.getElementById("passwordExpiryModal");
        modal.style.display = "flex";

        // Add backdrop manually
        let backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "customBackdrop"; // give ID so we can remove it later
        document.body.appendChild(backdrop);

        setTimeout(() => {
          document.getElementById("resetPasswordBtn")?.addEventListener("click", () => {
            toastr.clear();  // close toastr
            document.getElementById("kt_login_signin_form").style.display = "none";
            document.getElementById("forgot_passwrod_form").style.display = "block";
            document.getElementById("forgotUsername").value = tempUsername;

            // Close modal
            modal.style.display = "none";
            document.getElementById("customBackdrop")?.remove();
          });

          document.getElementById("skipForNowBtn")?.addEventListener("click", () => {
            toastr.clear();  // close toastr
            modal.style.display = "none";
            document.getElementById("customBackdrop")?.remove();

            // Show disclaimer modal
            // showModal();
            // window.handleConfirm = async () => {
               handlePostLogin();
            // };
          });
        }, 300);
      }
      else {
        // No expiration warning → then show login modal
        // showModal();

        // When user confirms modal, continue login
        // window.handleConfirm = async () => {
           handlePostLogin();
        // };
      }
    }
    else if (data.error === "PASSWORD_EXPIRED") {
      toastr.error("Your password has expired. Please reset your password.");

      document.getElementById("kt_login_signin_form").style.display = "none";
      document.getElementById("forgot_passwrod_form").style.display = "block";
      document.getElementById("forgotUsername").value = tempUsername;
    }
    else {
      toastr.error(data.error || "Unexpected response");
    }

  } catch (err) {
    console.error(err);
    toastr.error("Login failed");
  }
});
function getPasswordExpirationWarning(idToken) {
  const parts = idToken.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid ID token format");
  }

  const payload = parts[1];
  const normalized = payload.padEnd(
    payload.length + (4 - (payload.length % 4)) % 4,
    "="
  );

  const payloadJson = atob(normalized.replace(/-/g, "+").replace(/_/g, "/"));
  const payloadMap = JSON.parse(payloadJson);

  return payloadMap;
}
async function handlePostLogin() {
  const { access_token, refresh_token, timestamp } = window.pendingLoginData || {};

  if (!access_token || !refresh_token) {
    toastr.error("Missing login data");
    // closeModal();
    return;
  }

  // Store tokens in localStorage
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
  localStorage.setItem('access_token_time', timestamp);

  // Optional: update terms condition
  // try {
  //   await fetch(`${BASE_URL}update-terms-condition`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       user_name: tempUsername,
  //       accepted: "yes"
  //     })
  //   });
  // } catch (err) {
  //   console.warn("Failed to update terms condition:", err);
  // }

  toastr.success("Login successful");
  // closeModal();

  if (isAdminLogin(tempUsername)) {
  window.location.href = "admin/admin-dashboard.html";
} else {

  // Redirect to summary page
  setTimeout(() => {
    window.location.href = "patient_summary.html";
  }, 500);
}
}

// Handle new password submission
document.getElementById('submit-new-password').addEventListener('click', async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('new-password').value.trim();
  const newConfirmPassword = document.getElementById('new-confirm-password').value.trim();
  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    toastr.warning(passwordError);
    return;
  }


  if (!newPassword || !newConfirmPassword) {
    toastr.warning("Please Fill all the Fields");
    return;
  }

  if (newPassword !== newConfirmPassword) {
    toastr.warning('Passwords do not match');
    return;
  }

  try {
    const res = await fetch(`${window.BASE_URL}/authenticate/login-with-cognito`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: tempUsername,
        password: tempPassword,
        new_password: newPassword
      }),
    });

    const data = await res.json();

    if (data.setup_required) {
      toastr.success("Password Reset Successfully!")
      tempSession = data.session;
      document.getElementById("qrImage").src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data.qr_uri)}&size=200x200`;
      document.getElementById("mfa-setup").style.display = "block";
      document.getElementById("new-password-form").style.display = "none";
      return;
    }

    if (data.access_token) {
      // toastr.success("Password updated and login successful");
      // console.log("Access Token:", data.access_token);
    //   showModal(); // Show modal

      // Save the tokens temporarily in window scope or a global var
      window.pendingLoginData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        timestamp: new Date().getTime()
      };

      // When user confirms, call login success handler
      // window.handleConfirm = async () => {
        await handlePostLogin(); // ⬅️ define this next
      // };
      // Redirect or use token as needed
    } else {
      toastr.error(data.error || "Unexpected response after setting new password");
    }

  } catch (err) {
    console.error(err);
    toastr.error("Failed to set new password");
  }
});

// MFA Setup OTP Submit
document.getElementById('verify-setup').addEventListener('click', async (e) => {
  e.preventDefault();
  const now = new Date();
  const firstOtp = document.getElementById('setup-otp').value.trim();
  const secondOtp = document.getElementById('setup-otp-1').value.trim();
  const newConfirmPassword_1 = document.getElementById('new-confirm-password').value.trim();
  let tempPassword1 = '';
  if (newConfirmPassword_1 === '' || newConfirmPassword_1 === null) {
    tempPassword1 = tempPassword;
  }
  else {
    tempPassword1 = newConfirmPassword_1;
  }
  tempPassword = tempPassword1;

  if (!firstOtp || !secondOtp) {
    toastr.warning("Both OTP entries are required");
    return;
  }

  try {
    const res = await fetch(`${window.BASE_URL}/authenticate/verify-totp-setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: tempUsername,
        password: tempPassword,
        first_otp: firstOtp,
        second_otp: secondOtp,
        session: tempSession
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toastr.success("Login successful with MFA");
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('access_token_time', now.getTime());
      setTimeout(() => {
        window.location.href = "patient_summary.html";
      }, 1000);
      // location.reload();
    } else {
      toastr.error(data.error || "MFA setup failed.");
    }
  } catch (err) {
    toastr.error("MFA verification failed");
    console.error(err);
  }
});

// forgot password
document.getElementById('show_forgot_password_section').addEventListener('click', async (e) => {
  e.preventDefault();
  document.getElementById("kt_login_signin_form").style.display = "none";
  document.getElementById("forgot_passwrod_form").style.display = "block";
});

document.getElementById('forgot_password_submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const userName = document.getElementById('forgotUsername').value.trim();

  if (!userName) return toastr.warning("Enter User Name");
  tempUsername = userName;
  try {
    const res = await fetch(`${window.BASE_URL}/authenticate/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName
      }),
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById("reset_passwrod_form").style.display = "block";
      document.getElementById("forgot_passwrod_form").style.display = "none";
      toastr.success(data.message || "Verification code sent to registered email");
    } else {
      toastr.error(data.error || "Authentication failed");
    }
  } catch (err) {
    toastr.error("Something went wrong. Please try again later.");
    console.error(err);
  }
});

document.getElementById('reset_password_submit').addEventListener('click', async (e) => {
  e.preventDefault();

  const verificationCode = document.getElementById('verificationCode').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();
  const newConfirmPassword = document.getElementById('newConfirmPassword').value.trim();

  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    toastr.warning(passwordError);
    return;
  }


  if (!username || !verificationCode || !newPassword || !newConfirmPassword) {
    return toastr.warning("Please fill all the fields.");
  }

  // Check password match
  if (newPassword !== newConfirmPassword) {
    toastr.warning('Passwords do not match');
    return;
  }

  try {
    const res = await fetch(`${window.BASE_URL}/authenticate/confirm-forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: tempUsername,
        verification_code: verificationCode,
        new_password: newPassword
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toastr.success("Password reset successful.");
      location.reload();
      // Optional: redirect to login page after success
      // setTimeout(() => window.location.href = '/login.html', 2000);
    } else {
      toastr.error(data.error || "Password reset failed");
    }
  } catch (err) {
    toastr.error("Something went wrong. Please try again later.");
    console.error(err);
  }
});

document.getElementById('newPassword').addEventListener('input', function (e) {
  const errorMsg = validatePassword(e.target.value);
  const errorEl = document.getElementById('newPassword-error');
  errorEl.textContent = errorMsg;
  errorEl.style.display = errorMsg ? 'block' : 'none';
});

document.getElementById('new-password').addEventListener('input', function (e) {
  const errorMsg = validatePassword(e.target.value);
  const errorEl = document.getElementById('new-password-error');
  errorEl.textContent = errorMsg;
  errorEl.style.display = errorMsg ? 'block' : 'none';
});


// // OTP Challenge Submit
// document.getElementById('submit-otp').addEventListener('click', async (e) => {
//   e.preventDefault();
//   const otp = document.getElementById('challenge-otp').value.trim();
//   if (!otp) return toastr.warning("Enter OTP");

//   try {
//     // Step 1: Call new terms condition status endpoint
//     const statusRes = await fetch(`${BASE_URL}get-terms-condition-status`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_name: tempUsername })
//     });

//     const statusData = await statusRes.json();

//     if (statusData.terms_condition === "yes") {
//       // Skip modal, go straight to OTP verification
//       showModal();
//       window.handleConfirm = async () => {
//         await handleOtpAuthentication(otp);
//       };
//     } else if (statusData.terms_condition === "no" || statusData.terms_condition === 'null' || statusData.terms_condition === null) {
//       // Show your custom modal
//       showModal();
//       // Assign dynamic action for "Yes" button
//       window.handleConfirm = async () => {
//         await handleOtpAuthentication(otp);
//       };
//     } 
//     else {
//       toastr.error("Unexpected terms condition status");
//     }
//   } catch (err) {
//     toastr.error("Terms condition check failed");
//   }
// });

// // ✅ Function to handle OTP authentication
// async function handleOtpAuthentication(otp) {
//   const now = new Date();
//   try {
//     const res = await fetch(`${BASE_URL}/authenticate/respond-to-mfa`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: tempUsername,
//         otp,
//         session: tempSession
//       }),
//     });

//     const data = await res.json();
//     if (data.access_token) {
//       toastr.success("Login successful with MFA");
//       localStorage.setItem('access_token', data.access_token);
//       localStorage.setItem('refresh_token', data.refresh_token);
//       localStorage.setItem('access_token_time', now.getTime());


//       // Step 2: Call updated terms acceptance endpoint
//       try {
//         await fetch(`${BASE_URL}update-terms-condition`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             user_name: tempUsername,
//             accepted: "yes"
//           })
//         });
//       } catch (logError) {
//         closeModal();
//         console.warn("Failed to update terms condition:", logError);
//       }


//       setTimeout(() => {
//         window.location.href = "template/patient_summary.html?user_name=" + encodeURIComponent(tempUsername);
//       }, 500);
//       console.log("Access Token:", data.access_token);
//     } else {
//       closeModal();
//       toastr.error(data.error || "Authentication failed");
//     }
//   } catch (err) {
//     closeModal();
//     toastr.error("OTP submission failed");
//   }
// }

document.getElementById('submit-otp').addEventListener('click', async (e) => {
  e.preventDefault();
  const otp = document.getElementById('challenge-otp').value.trim();
  if (!otp) return toastr.warning("Enter OTP");

  try {
    // ✅ Step 1: Call respond-to-mfa
    const res = await fetch(`${window.BASE_URL}/authenticate/respond-to-mfa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: tempUsername,
        otp,
        session: tempSession
      }),
    });

    const data = await res.json();
    if (data.access_token) {

      window.pendingLoginData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        id_token: data.id_token,
        timestamp: new Date().getTime()
      };
      const decoded = getPasswordExpirationWarning(data.id_token);

      if (decoded && decoded.password_expiration_warning) {
        document.getElementById("passwordExpiryMessage").textContent = decoded.password_expiration_warning;

        // Show modal (use style instead of Bootstrap classes)
        const modal = document.getElementById("passwordExpiryModal");
        modal.style.display = "flex";

        // Add backdrop manually
        let backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "customBackdrop"; // give ID so we can remove it later
        document.body.appendChild(backdrop);

        setTimeout(() => {
          document.getElementById("resetPasswordBtn")?.addEventListener("click", () => {
            toastr.clear();  // close toastr
            document.getElementById("mfa-challenge").style.display = "none";
            document.getElementById("forgot_passwrod_form").style.display = "block";
            document.getElementById("forgotUsername").value = tempUsername;

            // Close modal
            modal.style.display = "none";
            document.getElementById("customBackdrop")?.remove();
          });

          document.getElementById("skipForNowBtn")?.addEventListener("click", () => {
            toastr.clear();  // close toastr
            modal.style.display = "none";
            document.getElementById("customBackdrop")?.remove();

            // Show disclaimer modal
            // showModal();
            // window.handleConfirm = async () => {
               handleOtpAuthentication(data);
            // };
          });
        }, 300);
      }

      else {
        // showModal();
        // window.handleConfirm = async () => {
          await handleOtpAuthentication(data);
        // };
      }
    } else if (data.error === "PASSWORD_EXPIRED") {
      toastr.error("Your password has expired. Please reset your password.");

      document.getElementById("mfa-challenge").style.display = "none";
      document.getElementById("forgot_passwrod_form").style.display = "block";
      document.getElementById("forgotUsername").value = tempUsername;
    } else {
      toastr.error(data.error || "Authentication failed");
    }
  } catch (err) {
    toastr.error("OTP submission failed");
    console.error("OTP submission failed:", err);
  }
});
// function closeModal() {
//   const modal = document.getElementById("passwordExpiryModal");
//   modal.classList.remove("show", "d-block");
//   document.querySelector(".modal-backdrop")?.remove();
// }


// ✅ Function to handle Terms & Conditions AFTER OTP success
async function handleOtpAuthentication(data) {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('access_token_time', new Date().getTime());
  try {
    const statusRes = await fetch(`${window.BASE_URL}get-terms-condition-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name: tempUsername })  // 👈 this endpoint expects user_name
    });

    const statusData = await statusRes.json();

    if (statusData.terms_condition === "yes") {
      // Already accepted → go straight to patient summary
      window.location.href = "patient_summary.html";
      toastr.success("Login successful with MFA");
    }
    else if (
      statusData.terms_condition === "no" ||
      statusData.terms_condition === "null" ||
      statusData.terms_condition === null
    ) {
      // Show modal → accept on confirm
    //   showModal();
      window.handleConfirm = async () => {
        try {
          await fetch(`${window.BASE_URL}update-terms-condition`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_name: tempUsername,
              accepted: "yes"
            })
          });
          // closeModal();
          window.location.href = "patient_summary.html";
        } catch (err) {
          toastr.error("Failed to update terms condition");
        }
      };
    }
    else {
      toastr.error("Unexpected terms condition status");
    }
  } catch (err) {
    toastr.error("Terms condition check failed");
  }
}


// ✅ Functions to show/hide your custom modal
// function showModal() {
//   document.getElementById('customModal').style.display = 'flex';
// }

// function closeModal() {
//   document.getElementById('customModal').style.display = 'none';
// }

window.triggerForgotPassword = function () {
  document.getElementById('forgot_password_submit').click();
}

document.querySelectorAll('.eye-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';

    // Toggle eye icon
    this.innerHTML = isPassword ?
      `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>` :
      `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>`;
  });
});

async function handleGoogleSignIn() {
  try {
    const clientResponse = await fetch(`${window.BASE_URL}auth/login/google?fetch_client_id=true`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!clientResponse.ok) throw new Error(`Failed to get client ID: ${clientResponse.status}`);

    const clientData = await clientResponse.json();
    const clientId = clientData.google_web_client_id;
    if (!clientId) throw new Error("Missing google_client_id in API response");

    // 2️⃣ Redirect URI (must match Google Console)
    const redirectUri = `${window.BASE_URL}google-callback`

    // 3️⃣ Build the Google OAuth URL
    const scope = encodeURIComponent("openid email profile");
    const nonce = Math.random().toString(36).substring(2);

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=id_token` +
      `&scope=${scope}` +
      `&nonce=${nonce}` +
      `&prompt=consent`;

    // 4️⃣ Redirect to Google
    window.location.href = googleAuthUrl;

  } catch (error) {
    console.error("Google login error:", error);
    toastr.error(`Error: ${error.message}`);
  }
}


