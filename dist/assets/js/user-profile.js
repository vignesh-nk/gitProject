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
/*!***************************************!*\
  !*** ./src/assets/js/user-profile.js ***!
  \***************************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.addEventListener('DOMContentLoaded', function () {
  var token = localStorage.getItem('access_token');
  var tokenTime = localStorage.getItem('access_token_time');
  if (token && tokenTime) {
    var now = new Date().getTime();
    var timeDiff = now - parseInt(tokenTime, 10);
    if (timeDiff > 24 * 60 * 60 * 1000) {
      // Token is older than 24 hours
      localStorage.removeItem('access_token');
      localStorage.removeItem('access_token_time');
      window.location.href = "./index.html";
    } else {
      console.log('JWT token is still valid.');
    }
  }
});
window.loadStatisticsData = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var token;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        token = localStorage.getItem('access_token');
        if (token) {
          _context.n = 1;
          break;
        }
        window.location.href = "./index.html";
        return _context.a(2, false);
      case 1:
        fetch("".concat(BASE_URL, "fetch-user-statistics"), {
          method: "GET",
          headers: {
            'Authorization': "Bearer ".concat(token)
          }
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.user_id) {
            document.getElementById("user-id").textContent = data.user_id;
            document.getElementById("total-recordings").textContent = data.total_recordings;
            document.getElementById("total-rec-duration").textContent = data.total_rec_duration;
            document.getElementById("avg-rec-duration").textContent = data.avg_rec_duration;
            document.getElementById("total-copy-all").textContent = data.total_copy_all;
            document.getElementById("total-copy").textContent = data.total_copy;
            document.getElementById("nonDictatedNotes").textContent = data.total_external_notes;
          } else {
            console.error("No stats found:", data.message);
          }
        })["catch"](function (error) {
          console.error("Fetch error:", error);
        });
      case 2:
        return _context.a(2);
    }
  }, _callee);
}));
window.loadProfileData = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var mfaToggle, mfaStatusLabel, token;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        mfaToggle = document.querySelector('input[name="select"]');
        mfaStatusLabel = document.getElementById('mfaStatusLabel');
        token = localStorage.getItem('access_token');
        if (token) {
          _context2.n = 1;
          break;
        }
        window.location.href = "./index.html";
        return _context2.a(2);
      case 1:
        fetch("".concat(BASE_URL, "authenticate/get-user-profile"), {
          method: "POST",
          headers: {
            "Authorization": "Bearer ".concat(token),
            "Content-Type": "application/json"
          }
        }).then(function (response) {
          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }
          return response.json();
        }).then(function (data) {
          var userName = data.username || "Unknown";
          var userEmail = data.email || "Not Available";
          var userTimezone = data.user_timezone || "Not Available";
          var userPhone = data.phone_number || "Not Available";
          var userMfa = data.mfa_status || "Not Available";

          // Populate header/profile section
          var headerUser = document.getElementById("headerUserName");
          var popupUser = document.getElementById("getUserNamePopup");
          var emailEl = document.getElementById("getUserEmailId");
          var firstLetterEl = document.getElementById("headerUserFirstLetter");
          if (headerUser) headerUser.textContent = userName;
          if (popupUser) popupUser.textContent = userName;
          if (emailEl) emailEl.textContent = userEmail;
          if (firstLetterEl) firstLetterEl.textContent = userName.charAt(0).toUpperCase();

          // Populate profile section
          if (document.getElementById("profile-user-name")) document.getElementById("profile-user-name").textContent = userName;
          if (document.getElementById("profile-email")) document.getElementById("profile-email").textContent = userEmail;
          if (document.getElementById("profile-timezone")) document.getElementById("profile-timezone").textContent = userTimezone;
          if (document.getElementById("mfa-security")) document.getElementById("mfa-security").textContent = userMfa;
          if (document.getElementById("profile-phone")) document.getElementById("profile-phone").textContent = userPhone;
          // Assume userMfa is a boolean variable indicating MFA is enabled or not
          // if (userMfa === 'enabled') {
          //     // Show "Disable", hide "Enable"
          //     document.getElementById("mfa-setup-span-disable").style.display = "block";
          //     document.getElementById("mfa-setup-span-enable").style.display = "none";
          // } else {
          //     // Show "Enable", hide "Disable"
          //     document.getElementById("mfa-setup-span-disable").style.display = "none";
          //     document.getElementById("mfa-setup-span-enable").style.display = "block";
          // }
          document.getElementById('showThisForm').style.display = 'block';
          if (userMfa === 'enabled') {
            mfaToggle.checked = true;
            mfaStatusLabel.textContent = 'Enabled';
          } else {
            mfaToggle.checked = false;
            mfaStatusLabel.textContent = 'Disabled';
          }

          // Update label when toggle changes
          mfaToggle.addEventListener('change', function () {
            mfaStatusLabel.textContent = this.checked ? 'Enabled' : 'Disabled';
          });

          // Initialize Select2 dropdown
          var timezoneSelect = $('#kt_select2_2');
          if (timezoneSelect.length) {
            if (timezoneSelect.hasClass("select2-hidden-accessible")) {
              timezoneSelect.val(userTimezone).trigger("change");
            } else {
              var interval = setInterval(function () {
                if ($('#kt_select2_2').hasClass("select2-hidden-accessible")) {
                  $('#kt_select2_2').val(userTimezone).trigger("change");
                  clearInterval(interval);
                }
              }, 100);
            }
          }
        })["catch"](function (error) {
          console.error("Error fetching profile info:", error);
          // Optional: window.location.href = "./index.html";
        });
      case 1:
        return _context2.a(2);
    }
  }, _callee2);
}));

//   document.addEventListener("DOMContentLoaded", function () {
//     const mfaTrigger = document.getElementById("enable-mfa-trigger");

//     mfaTrigger.addEventListener("click", async function () {
//       try {
//           const token = localStorage.getItem('access_token');
//           if (!token) {
//             window.location.href = "./index.html";
//             return false;
//           }
//         const response = await fetch(`${BASE_URL}authenticate/enable-mfa`, {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         });

//         const data = await response.json();

//         if (response.ok) {
//           const qrUri = data.qr_uri;
//           const qrImage = document.getElementById("qrImage");

//           // Use a free service to generate QR code image
//           qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrUri)}&size=150x150`;

//         } else {
//           toastr.error("Failed to enable MFA: " + data.error);
//         }
//       } catch (error) {
//         console.error("Error enabling MFA:", error);
//         toastr.warning("Something went wrong while enabling MFA.");
//       }
//     });
//   });

// document.addEventListener("DOMContentLoaded", function () {
//   const disableTrigger = document.getElementById("disable-mfa-trigger");

//   disableTrigger.addEventListener("click", async function () {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         window.location.href = "./index.html";
//         return;
//       }

//       const response = await fetch(`${BASE_URL}authenticate/disable-mfa`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toastr.success("MFA disabled successfully.");
//         // Optionally hide or update UI elements
//         // document.getElementById("mfa-setup-span-disable").style.display = "none";
//         // document.getElementById("mfa-setup-span-enable").style.display = "inline-block";
//       } else {
//         toastr.error("Failed to disable MFA: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error disabling MFA:", error);
//       toastr.warning("Something went wrong while disabling MFA.");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  var verifyButton = document.getElementById("verify-setup");
  verifyButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var firstOtp, secondOtp, token, response, data, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          firstOtp = document.getElementById("setup-otp").value.trim();
          secondOtp = document.getElementById("setup-otp-1").value.trim();
          token = localStorage.getItem('access_token');
          if (token) {
            _context3.n = 1;
            break;
          }
          window.location.href = "./index.html";
          return _context3.a(2, false);
        case 1:
          if (!(!firstOtp || !secondOtp)) {
            _context3.n = 2;
            break;
          }
          toastr.warning("Both OTP codes are required.");
          return _context3.a(2);
        case 2:
          if (!(firstOtp === secondOtp)) {
            _context3.n = 3;
            break;
          }
          toastr.warning("Second OTP must be different from the first.");
          return _context3.a(2);
        case 3:
          _context3.p = 3;
          _context3.n = 4;
          return fetch("".concat(BASE_URL, "authenticate/confirm-mfa-enable-setup"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(token)
            },
            body: JSON.stringify({
              first_otp: firstOtp,
              second_otp: secondOtp
            })
          });
        case 4:
          response = _context3.v;
          _context3.n = 5;
          return response.json();
        case 5:
          data = _context3.v;
          if (response.ok) {
            toastr.success(data.message || "MFA setup successful.");
            setTimeout(function () {
              window.location.reload();
            }, 1000);
            // Optional: close the modal
            // document.querySelector('#enableMfaModal .close').click();
            // document.getElementById("mfa-setup-span-disable").style.display = "inline-block";
            // document.getElementById("mfa-setup-span-enable").style.display = "none";
          } else {
            toastr.error(data.error || "MFA setup failed.");
          }
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t = _context3.v;
          console.error("Error verifying MFA:", _t);
          toastr.error("An unexpected error occurred.");
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[3, 6]]);
  })));
});

// Optional: Handle the checkbox change to toggle modal attributes
var checkbox = document.querySelector('input[name="select"]');
if (checkbox) {
  checkbox.addEventListener('change', function () {
    if (!this.checked) {
      this.setAttribute('data-toggle', 'modal');
      this.setAttribute('data-target', '#enableMfaModal');
    } else {
      this.removeAttribute('data-toggle');
      this.removeAttribute('data-target');
    }
  });
}

// Fix 1: Wrap in DOMContentLoaded and check if element exists
document.addEventListener("DOMContentLoaded", function () {
  var mfaToggle = document.querySelector('input[name="select"]');
  var token = localStorage.getItem('access_token');
  if (mfaToggle) {
    mfaToggle.addEventListener('change', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response, data, _response, _data, qrUri, qrImage, modalEl, modal, _t2, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (this.checked) {
              _context4.n = 6;
              break;
            }
            this.setAttribute('data-toggle', 'modal');
            this.setAttribute('data-target', '#enableMfaModal');

            // Disable MFA flow
            _context4.p = 1;
            _context4.n = 2;
            return fetch("".concat(BASE_URL, "authenticate/disable-mfa"), {
              method: "POST",
              headers: {
                "Authorization": "Bearer ".concat(token),
                "Content-Type": "application/json"
              }
            });
          case 2:
            response = _context4.v;
            _context4.n = 3;
            return response.json();
          case 3:
            data = _context4.v;
            if (response.ok) {
              toastr.success("MFA disabled successfully.");
            } else {
              toastr.error("Failed to disable MFA: " + (data.error || data.message));
              this.checked = true;
            }
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t2 = _context4.v;
            console.error("Error disabling MFA:", _t2);
            toastr.warning("Something went wrong while disabling MFA.");
            this.checked = true;
          case 5:
            _context4.n = 11;
            break;
          case 6:
            // When turning ON MFA - show the MFA setup modal
            this.removeAttribute('data-toggle');
            this.removeAttribute('data-target');
            // Enable MFA flow
            _context4.p = 7;
            _context4.n = 8;
            return fetch("".concat(BASE_URL, "authenticate/enable-mfa"), {
              method: "POST",
              headers: {
                "Authorization": "Bearer ".concat(token),
                "Content-Type": "application/json"
              }
            });
          case 8:
            _response = _context4.v;
            _context4.n = 9;
            return _response.json();
          case 9:
            _data = _context4.v;
            if (_response.ok) {
              qrUri = _data.qr_uri;
              qrImage = document.getElementById("qrImage");
              qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?data=".concat(encodeURIComponent(qrUri), "&size=150x150");
              mfaVerified = false;
              // enableMfaModal.show();
              modalEl = document.getElementById('enableMfaModal');
              if (modalEl) {
                modal = KTModal.getInstance(modalEl);
                if (!modal) {
                  modal = new KTModal(modalEl);
                }
                modal.show();
              }
            } else {
              // toastr.error("Failed to enable MFA: " + (data.error || data.message));
              toastr.warning("Please Login Again to Enable MFA");
              this.checked = false;
              document.getElementById('mfaStatusLabel').textContent = 'Disabled';
            }
            _context4.n = 11;
            break;
          case 10:
            _context4.p = 10;
            _t3 = _context4.v;
            console.error("Error enabling MFA:", _t3);
            toastr.warning("Something went wrong while enabling MFA.");
            this.checked = false;
            document.getElementById('mfaStatusLabel').textContent = 'Disabled';
          case 11:
            return _context4.a(2);
        }
      }, _callee4, this, [[7, 10], [1, 4]]);
    })));
  } else {
    console.warn('MFA toggle switch not found');
  }
});

// Tab switching functionality
window.switchTab = function (tabName) {
  console.log('Switching to tab:', tabName); // Debug log

  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(function (content) {
    content.classList.add('hidden');
    content.classList.remove('active');
  });

  // Remove active class from all tab buttons
  document.querySelectorAll('[data-tab-target]').forEach(function (button) {
    button.classList.remove('text-indigo-600', 'border-indigo-600', 'border-b-2');
    button.classList.add('text-gray-500', 'hover:text-gray-700');
  });

  // Show selected tab content
  var selectedTab = document.getElementById("".concat(tabName, "-tab-content"));
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
    selectedTab.classList.add('active');
    console.log('Tab content shown:', selectedTab.id); // Debug log
  }

  // Add active class to clicked tab button
  var activeButton = event.currentTarget;
  if (activeButton) {
    activeButton.classList.add('text-indigo-600', 'border-indigo-600', 'border-b-2');
    activeButton.classList.remove('text-gray-500', 'hover:text-gray-700');
    console.log('Button activated:', activeButton.textContent); // Debug log
  }

  // Load data for the selected tab
  if (tabName === 'profile') {
    console.log('Loading profile data...'); // Debug log
    loadProfileData();
  } else if (tabName === 'statistics') {
    console.log('Loading statistics data...'); // Debug log
    loadStatisticsData();
  }
};

// Helper function to format duration
function formatDuration(seconds) {
  if (!seconds) return '0s';
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  var secs = seconds % 60;
  if (hours > 0) {
    return "".concat(hours, "h ").concat(minutes, "m ").concat(secs, "s");
  } else if (minutes > 0) {
    return "".concat(minutes, "m ").concat(secs, "s");
  } else {
    return "".concat(secs, "s");
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  // Set initial active state for the profile tab button
  var profileButton = document.querySelector('[data-tab-target="profile-tab-content"]');
  if (profileButton) {
    profileButton.classList.add('text-indigo-600', 'border-indigo-600', 'border-b-2');
    profileButton.classList.remove('text-gray-500', 'hover:text-gray-700');
  }

  // Set inactive state for statistics tab button
  var statsButton = document.querySelector('[data-tab-target="statistics-tab-content"]');
  if (statsButton) {
    statsButton.classList.add('text-gray-500', 'hover:text-gray-700');
    statsButton.classList.remove('text-indigo-600', 'border-indigo-600', 'border-b-2');
  }

  // Load profile data by default
  if (document.getElementById('profile-tab-content').classList.contains('active')) {
    loadProfileData();
  }
});
window.selectTimeZone = function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  // Get the selected timezone value
  var selectedTimezone = document.getElementById('kt_select2_2').value;
  if (!selectedTimezone) {
    toastr.warning('Please select a timezone');
    return;
  }

  // Prepare the data to send
  var data = {
    new_timezone: selectedTimezone
  };

  // Make the API call
  fetch("".concat(BASE_URL, "authenticate/update_timezone_for_user_cognito"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
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
    if (data.status === 'success') {
      toastr.success('Timezone updated successfully!');
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      toastr.error('Error: ' + data.message);
    }
  })["catch"](function (error) {
    console.error('Error:', error);
    toastr.error('An error occurred: ' + (error.message || 'Please try again'));
  });
};
window.editTimeZone = function () {
  var timezoneDiv = document.querySelector('.select-timezone');
  if (timezoneDiv) {
    timezoneDiv.classList.remove('hidden');
  }
};
/******/ 	return __webpack_exports__;
/******/ })()
;
});