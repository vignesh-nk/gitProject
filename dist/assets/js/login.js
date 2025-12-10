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
/*!********************************!*\
  !*** ./src/assets/js/login.js ***!
  \********************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  var hasNumber = /\d/.test(password);
  var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var errorMessages = [];
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
var tempSession = "";
var tempUsername = "";
var tempPassword = "";
document.getElementById('kt_login_signin_submit').addEventListener('click', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
    var username, password, res, data, decoded, modal, backdrop, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          e.preventDefault();
          username = document.getElementById('username').value.trim();
          password = document.getElementById('password').value.trim();
          if (!(!username || !password)) {
            _context.n = 1;
            break;
          }
          toastr.warning("Username and password are required");
          return _context.a(2);
        case 1:
          tempUsername = username;
          tempPassword = password;
          _context.p = 2;
          _context.n = 3;
          return fetch("".concat(window.BASE_URL, "/authenticate/login-with-cognito"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          });
        case 3:
          res = _context.v;
          _context.n = 4;
          return res.json();
        case 4:
          data = _context.v;
          if (!(data.challenge === "NEW_PASSWORD_REQUIRED")) {
            _context.n = 5;
            break;
          }
          tempSession = data.session;
          // Show new password form to the user
          document.getElementById("new-password-form").style.display = "block";
          document.getElementById("kt_login_signin_form").style.display = "none";
          return _context.a(2);
        case 5:
          if (!data.setup_required) {
            _context.n = 7;
            break;
          }
          if (!isAdminLogin(username)) {
            _context.n = 6;
            break;
          }
          toastr.success("Admin login successful!");
          window.location.href = "admin/admin-dashboard.html";
          return _context.a(2);
        case 6:
          tempSession = data.session;
          document.getElementById("qrImage").src = "https://api.qrserver.com/v1/create-qr-code/?data=".concat(encodeURIComponent(data.qr_uri), "&size=200x200");
          document.getElementById("mfa-setup").style.display = "block";
          document.getElementById("kt_login_signin_form").style.display = "none";
          _context.n = 10;
          break;
        case 7:
          if (!data.mfa_required) {
            _context.n = 9;
            break;
          }
          if (!isAdminLogin(username)) {
            _context.n = 8;
            break;
          }
          toastr.success("Admin login successful!");
          window.location.href = "admin/admin-dashboard.html";
          return _context.a(2);
        case 8:
          tempSession = data.session;
          document.getElementById("mfa-challenge").style.display = "block";
          document.getElementById("kt_login_signin_form").style.display = "none";
          _context.n = 10;
          break;
        case 9:
          if (data.access_token) {
            // Save the tokens temporarily in window scope or a global var
            window.pendingLoginData = {
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              id_token: data.id_token,
              timestamp: new Date().getTime()
            };
            decoded = getPasswordExpirationWarning(data.id_token);
            if (decoded && decoded.password_expiration_warning) {
              document.getElementById("passwordExpiryMessage").textContent = decoded.password_expiration_warning;

              // Show modal (use style instead of Bootstrap classes)
              modal = document.getElementById("passwordExpiryModal");
              modal.style.display = "flex";

              // Add backdrop manually
              backdrop = document.createElement("div");
              backdrop.className = "modal-backdrop fade show";
              backdrop.id = "customBackdrop"; // give ID so we can remove it later
              document.body.appendChild(backdrop);
              setTimeout(function () {
                var _document$getElementB, _document$getElementB3;
                (_document$getElementB = document.getElementById("resetPasswordBtn")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("click", function () {
                  var _document$getElementB2;
                  toastr.clear(); // close toastr
                  document.getElementById("kt_login_signin_form").style.display = "none";
                  document.getElementById("forgot_passwrod_form").style.display = "block";
                  document.getElementById("forgotUsername").value = tempUsername;

                  // Close modal
                  modal.style.display = "none";
                  (_document$getElementB2 = document.getElementById("customBackdrop")) === null || _document$getElementB2 === void 0 || _document$getElementB2.remove();
                });
                (_document$getElementB3 = document.getElementById("skipForNowBtn")) === null || _document$getElementB3 === void 0 || _document$getElementB3.addEventListener("click", function () {
                  var _document$getElementB4;
                  toastr.clear(); // close toastr
                  modal.style.display = "none";
                  (_document$getElementB4 = document.getElementById("customBackdrop")) === null || _document$getElementB4 === void 0 || _document$getElementB4.remove();

                  // Show disclaimer modal
                  // showModal();
                  // window.handleConfirm = async () => {
                  handlePostLogin();
                  // };
                });
              }, 300);
            } else {
              // No expiration warning → then show login modal
              // showModal();

              // When user confirms modal, continue login
              // window.handleConfirm = async () => {
              handlePostLogin();
              // };
            }
          } else if (data.error === "PASSWORD_EXPIRED") {
            toastr.error("Your password has expired. Please reset your password.");
            document.getElementById("kt_login_signin_form").style.display = "none";
            document.getElementById("forgot_passwrod_form").style.display = "block";
            document.getElementById("forgotUsername").value = tempUsername;
          } else {
            toastr.error(data.error || "Unexpected response");
          }
        case 10:
          _context.n = 12;
          break;
        case 11:
          _context.p = 11;
          _t = _context.v;
          console.error(_t);
          toastr.error("Login failed");
        case 12:
          return _context.a(2);
      }
    }, _callee, null, [[2, 11]]);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
function getPasswordExpirationWarning(idToken) {
  var parts = idToken.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid ID token format");
  }
  var payload = parts[1];
  var normalized = payload.padEnd(payload.length + (4 - payload.length % 4) % 4, "=");
  var payloadJson = atob(normalized.replace(/-/g, "+").replace(/_/g, "/"));
  var payloadMap = JSON.parse(payloadJson);
  return payloadMap;
}
function handlePostLogin() {
  return _handlePostLogin.apply(this, arguments);
} // Handle new password submission
function _handlePostLogin() {
  _handlePostLogin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
    var _ref8, access_token, refresh_token, timestamp;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _ref8 = window.pendingLoginData || {}, access_token = _ref8.access_token, refresh_token = _ref8.refresh_token, timestamp = _ref8.timestamp;
          if (!(!access_token || !refresh_token)) {
            _context8.n = 1;
            break;
          }
          toastr.error("Missing login data");
          // closeModal();
          return _context8.a(2);
        case 1:
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
            setTimeout(function () {
              window.location.href = "patient_summary.html";
            }, 500);
          }
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return _handlePostLogin.apply(this, arguments);
}
document.getElementById('submit-new-password').addEventListener('click', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
    var newPassword, newConfirmPassword, passwordError, res, data, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          e.preventDefault();
          newPassword = document.getElementById('new-password').value.trim();
          newConfirmPassword = document.getElementById('new-confirm-password').value.trim();
          passwordError = validatePassword(newPassword);
          if (!passwordError) {
            _context2.n = 1;
            break;
          }
          toastr.warning(passwordError);
          return _context2.a(2);
        case 1:
          if (!(!newPassword || !newConfirmPassword)) {
            _context2.n = 2;
            break;
          }
          toastr.warning("Please Fill all the Fields");
          return _context2.a(2);
        case 2:
          if (!(newPassword !== newConfirmPassword)) {
            _context2.n = 3;
            break;
          }
          toastr.warning('Passwords do not match');
          return _context2.a(2);
        case 3:
          _context2.p = 3;
          _context2.n = 4;
          return fetch("".concat(window.BASE_URL, "/authenticate/login-with-cognito"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: tempUsername,
              password: tempPassword,
              new_password: newPassword
            })
          });
        case 4:
          res = _context2.v;
          _context2.n = 5;
          return res.json();
        case 5:
          data = _context2.v;
          if (!data.setup_required) {
            _context2.n = 6;
            break;
          }
          toastr.success("Password Reset Successfully!");
          tempSession = data.session;
          document.getElementById("qrImage").src = "https://api.qrserver.com/v1/create-qr-code/?data=".concat(encodeURIComponent(data.qr_uri), "&size=200x200");
          document.getElementById("mfa-setup").style.display = "block";
          document.getElementById("new-password-form").style.display = "none";
          return _context2.a(2);
        case 6:
          if (!data.access_token) {
            _context2.n = 8;
            break;
          }
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
          _context2.n = 7;
          return handlePostLogin();
        case 7:
          _context2.n = 9;
          break;
        case 8:
          toastr.error(data.error || "Unexpected response after setting new password");
        case 9:
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t2 = _context2.v;
          console.error(_t2);
          toastr.error("Failed to set new password");
        case 11:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// MFA Setup OTP Submit
document.getElementById('verify-setup').addEventListener('click', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
    var now, firstOtp, secondOtp, newConfirmPassword_1, tempPassword1, res, data, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          e.preventDefault();
          now = new Date();
          firstOtp = document.getElementById('setup-otp').value.trim();
          secondOtp = document.getElementById('setup-otp-1').value.trim();
          newConfirmPassword_1 = document.getElementById('new-confirm-password').value.trim();
          tempPassword1 = '';
          if (newConfirmPassword_1 === '' || newConfirmPassword_1 === null) {
            tempPassword1 = tempPassword;
          } else {
            tempPassword1 = newConfirmPassword_1;
          }
          tempPassword = tempPassword1;
          if (!(!firstOtp || !secondOtp)) {
            _context3.n = 1;
            break;
          }
          toastr.warning("Both OTP entries are required");
          return _context3.a(2);
        case 1:
          _context3.p = 1;
          _context3.n = 2;
          return fetch("".concat(window.BASE_URL, "/authenticate/verify-totp-setup"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: tempUsername,
              password: tempPassword,
              first_otp: firstOtp,
              second_otp: secondOtp,
              session: tempSession
            })
          });
        case 2:
          res = _context3.v;
          _context3.n = 3;
          return res.json();
        case 3:
          data = _context3.v;
          if (res.ok) {
            toastr.success("Login successful with MFA");
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('access_token_time', now.getTime());
            setTimeout(function () {
              window.location.href = "patient_summary.html";
            }, 1000);
            // location.reload();
          } else {
            toastr.error(data.error || "MFA setup failed.");
          }
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          toastr.error("MFA verification failed");
          console.error(_t3);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 4]]);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

// forgot password
document.getElementById('show_forgot_password_section').addEventListener('click', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e) {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          e.preventDefault();
          document.getElementById("kt_login_signin_form").style.display = "none";
          document.getElementById("forgot_passwrod_form").style.display = "block";
        case 1:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
document.getElementById('forgot_password_submit').addEventListener('click', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
    var userName, res, data, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          e.preventDefault();
          userName = document.getElementById('forgotUsername').value.trim();
          if (userName) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2, toastr.warning("Enter User Name"));
        case 1:
          tempUsername = userName;
          _context5.p = 2;
          _context5.n = 3;
          return fetch("".concat(window.BASE_URL, "/authenticate/forgot-password"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: userName
            })
          });
        case 3:
          res = _context5.v;
          _context5.n = 4;
          return res.json();
        case 4:
          data = _context5.v;
          if (res.ok) {
            document.getElementById("reset_passwrod_form").style.display = "block";
            document.getElementById("forgot_passwrod_form").style.display = "none";
            toastr.success(data.message || "Verification code sent to registered email");
          } else {
            toastr.error(data.error || "Authentication failed");
          }
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t4 = _context5.v;
          toastr.error("Something went wrong. Please try again later.");
          console.error(_t4);
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[2, 5]]);
  }));
  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}());
document.getElementById('reset_password_submit').addEventListener('click', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
    var verificationCode, newPassword, newConfirmPassword, passwordError, res, data, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          e.preventDefault();
          verificationCode = document.getElementById('verificationCode').value.trim();
          newPassword = document.getElementById('newPassword').value.trim();
          newConfirmPassword = document.getElementById('newConfirmPassword').value.trim();
          passwordError = validatePassword(newPassword);
          if (!passwordError) {
            _context6.n = 1;
            break;
          }
          toastr.warning(passwordError);
          return _context6.a(2);
        case 1:
          if (!(!username || !verificationCode || !newPassword || !newConfirmPassword)) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, toastr.warning("Please fill all the fields."));
        case 2:
          if (!(newPassword !== newConfirmPassword)) {
            _context6.n = 3;
            break;
          }
          toastr.warning('Passwords do not match');
          return _context6.a(2);
        case 3:
          _context6.p = 3;
          _context6.n = 4;
          return fetch("".concat(window.BASE_URL, "/authenticate/confirm-forgot-password"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: tempUsername,
              verification_code: verificationCode,
              new_password: newPassword
            })
          });
        case 4:
          res = _context6.v;
          _context6.n = 5;
          return res.json();
        case 5:
          data = _context6.v;
          if (res.ok) {
            toastr.success("Password reset successful.");
            location.reload();
            // Optional: redirect to login page after success
            // setTimeout(() => window.location.href = '/login.html', 2000);
          } else {
            toastr.error(data.error || "Password reset failed");
          }
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t5 = _context6.v;
          toastr.error("Something went wrong. Please try again later.");
          console.error(_t5);
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[3, 6]]);
  }));
  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}());
document.getElementById('newPassword').addEventListener('input', function (e) {
  var errorMsg = validatePassword(e.target.value);
  var errorEl = document.getElementById('newPassword-error');
  errorEl.textContent = errorMsg;
  errorEl.style.display = errorMsg ? 'block' : 'none';
});
document.getElementById('new-password').addEventListener('input', function (e) {
  var errorMsg = validatePassword(e.target.value);
  var errorEl = document.getElementById('new-password-error');
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

document.getElementById('submit-otp').addEventListener('click', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(e) {
    var otp, res, data, decoded, modal, backdrop, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          e.preventDefault();
          otp = document.getElementById('challenge-otp').value.trim();
          if (otp) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, toastr.warning("Enter OTP"));
        case 1:
          _context7.p = 1;
          _context7.n = 2;
          return fetch("".concat(window.BASE_URL, "/authenticate/respond-to-mfa"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: tempUsername,
              otp: otp,
              session: tempSession
            })
          });
        case 2:
          res = _context7.v;
          _context7.n = 3;
          return res.json();
        case 3:
          data = _context7.v;
          if (!data.access_token) {
            _context7.n = 6;
            break;
          }
          window.pendingLoginData = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            id_token: data.id_token,
            timestamp: new Date().getTime()
          };
          decoded = getPasswordExpirationWarning(data.id_token);
          if (!(decoded && decoded.password_expiration_warning)) {
            _context7.n = 4;
            break;
          }
          document.getElementById("passwordExpiryMessage").textContent = decoded.password_expiration_warning;

          // Show modal (use style instead of Bootstrap classes)
          modal = document.getElementById("passwordExpiryModal");
          modal.style.display = "flex";

          // Add backdrop manually
          backdrop = document.createElement("div");
          backdrop.className = "modal-backdrop fade show";
          backdrop.id = "customBackdrop"; // give ID so we can remove it later
          document.body.appendChild(backdrop);
          setTimeout(function () {
            var _document$getElementB5, _document$getElementB7;
            (_document$getElementB5 = document.getElementById("resetPasswordBtn")) === null || _document$getElementB5 === void 0 || _document$getElementB5.addEventListener("click", function () {
              var _document$getElementB6;
              toastr.clear(); // close toastr
              document.getElementById("mfa-challenge").style.display = "none";
              document.getElementById("forgot_passwrod_form").style.display = "block";
              document.getElementById("forgotUsername").value = tempUsername;

              // Close modal
              modal.style.display = "none";
              (_document$getElementB6 = document.getElementById("customBackdrop")) === null || _document$getElementB6 === void 0 || _document$getElementB6.remove();
            });
            (_document$getElementB7 = document.getElementById("skipForNowBtn")) === null || _document$getElementB7 === void 0 || _document$getElementB7.addEventListener("click", function () {
              var _document$getElementB8;
              toastr.clear(); // close toastr
              modal.style.display = "none";
              (_document$getElementB8 = document.getElementById("customBackdrop")) === null || _document$getElementB8 === void 0 || _document$getElementB8.remove();

              // Show disclaimer modal
              // showModal();
              // window.handleConfirm = async () => {
              handleOtpAuthentication(data);
              // };
            });
          }, 300);
          _context7.n = 5;
          break;
        case 4:
          _context7.n = 5;
          return handleOtpAuthentication(data);
        case 5:
          _context7.n = 7;
          break;
        case 6:
          if (data.error === "PASSWORD_EXPIRED") {
            toastr.error("Your password has expired. Please reset your password.");
            document.getElementById("mfa-challenge").style.display = "none";
            document.getElementById("forgot_passwrod_form").style.display = "block";
            document.getElementById("forgotUsername").value = tempUsername;
          } else {
            toastr.error(data.error || "Authentication failed");
          }
        case 7:
          _context7.n = 9;
          break;
        case 8:
          _context7.p = 8;
          _t6 = _context7.v;
          toastr.error("OTP submission failed");
          console.error("OTP submission failed:", _t6);
        case 9:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}());
// function closeModal() {
//   const modal = document.getElementById("passwordExpiryModal");
//   modal.classList.remove("show", "d-block");
//   document.querySelector(".modal-backdrop")?.remove();
// }

// ✅ Function to handle Terms & Conditions AFTER OTP success
function handleOtpAuthentication(_x8) {
  return _handleOtpAuthentication.apply(this, arguments);
} // ✅ Functions to show/hide your custom modal
// function showModal() {
//   document.getElementById('customModal').style.display = 'flex';
// }
// function closeModal() {
//   document.getElementById('customModal').style.display = 'none';
// }
function _handleOtpAuthentication() {
  _handleOtpAuthentication = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(data) {
    var statusRes, statusData, _t8;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('access_token_time', new Date().getTime());
          _context0.p = 1;
          _context0.n = 2;
          return fetch("".concat(window.BASE_URL, "get-terms-condition-status"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_name: tempUsername
            }) // 👈 this endpoint expects user_name
          });
        case 2:
          statusRes = _context0.v;
          _context0.n = 3;
          return statusRes.json();
        case 3:
          statusData = _context0.v;
          if (statusData.terms_condition === "yes") {
            // Already accepted → go straight to patient summary
            window.location.href = "patient_summary.html";
            toastr.success("Login successful with MFA");
          } else if (statusData.terms_condition === "no" || statusData.terms_condition === "null" || statusData.terms_condition === null) {
            // Show modal → accept on confirm
            //   showModal();
            window.handleConfirm = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
              var _t7;
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.p = _context9.n) {
                  case 0:
                    _context9.p = 0;
                    _context9.n = 1;
                    return fetch("".concat(window.BASE_URL, "update-terms-condition"), {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        user_name: tempUsername,
                        accepted: "yes"
                      })
                    });
                  case 1:
                    // closeModal();
                    window.location.href = "patient_summary.html";
                    _context9.n = 3;
                    break;
                  case 2:
                    _context9.p = 2;
                    _t7 = _context9.v;
                    toastr.error("Failed to update terms condition");
                  case 3:
                    return _context9.a(2);
                }
              }, _callee9, null, [[0, 2]]);
            }));
          } else {
            toastr.error("Unexpected terms condition status");
          }
          _context0.n = 5;
          break;
        case 4:
          _context0.p = 4;
          _t8 = _context0.v;
          toastr.error("Terms condition check failed");
        case 5:
          return _context0.a(2);
      }
    }, _callee0, null, [[1, 4]]);
  }));
  return _handleOtpAuthentication.apply(this, arguments);
}
window.triggerForgotPassword = function () {
  document.getElementById('forgot_password_submit').click();
};
document.querySelectorAll('.eye-icon').forEach(function (icon) {
  icon.addEventListener('click', function () {
    var targetId = this.getAttribute('data-target');
    var input = document.getElementById(targetId);
    var isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    // Toggle eye icon
    this.innerHTML = isPassword ? "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5 text-gray-400\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21\" />\n            </svg>" : "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5 text-gray-400\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" />\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\" />\n            </svg>";
  });
});
function handleGoogleSignIn() {
  return _handleGoogleSignIn.apply(this, arguments);
}
function _handleGoogleSignIn() {
  _handleGoogleSignIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
    var clientResponse, clientData, clientId, redirectUri, scope, nonce, googleAuthUrl, _t9;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return fetch("".concat(window.BASE_URL, "auth/login/google?fetch_client_id=true"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
        case 1:
          clientResponse = _context1.v;
          if (clientResponse.ok) {
            _context1.n = 2;
            break;
          }
          throw new Error("Failed to get client ID: ".concat(clientResponse.status));
        case 2:
          _context1.n = 3;
          return clientResponse.json();
        case 3:
          clientData = _context1.v;
          clientId = clientData.google_web_client_id;
          if (clientId) {
            _context1.n = 4;
            break;
          }
          throw new Error("Missing google_client_id in API response");
        case 4:
          // 2️⃣ Redirect URI (must match Google Console)
          redirectUri = "".concat(window.BASE_URL, "google-callback"); // 3️⃣ Build the Google OAuth URL
          scope = encodeURIComponent("openid email profile");
          nonce = Math.random().toString(36).substring(2);
          googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth" + "?client_id=".concat(clientId) + "&redirect_uri=".concat(redirectUri) + "&response_type=id_token" + "&scope=".concat(scope) + "&nonce=".concat(nonce) + "&prompt=consent"; // 4️⃣ Redirect to Google
          window.location.href = googleAuthUrl;
          _context1.n = 6;
          break;
        case 5:
          _context1.p = 5;
          _t9 = _context1.v;
          console.error("Google login error:", _t9);
          toastr.error("Error: ".concat(_t9.message));
        case 6:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 5]]);
  }));
  return _handleGoogleSignIn.apply(this, arguments);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});