document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('access_token');
  const tokenTime = localStorage.getItem('access_token_time');

  if (token && tokenTime) {
    const now = new Date().getTime();
    const timeDiff = now - parseInt(tokenTime, 10);

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

window.loadStatisticsData = async function() {
     const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = "./index.html";
      return false;
    }
    fetch(`${BASE_URL}fetch-user-statistics`, {
        method: "GET",
          headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

window.loadProfileData = async function() {
  const mfaToggle = document.querySelector('input[name="select"]');
  const mfaStatusLabel = document.getElementById('mfaStatusLabel');
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = "./index.html";
    return;
  }

  fetch(`${BASE_URL}authenticate/get-user-profile`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return response.json();
  })
  .then(data => {
    const userName = data.username || "Unknown";
    const userEmail = data.email || "Not Available";
    const userTimezone = data.user_timezone || "Not Available";
    const userPhone = data.phone_number || "Not Available";
    const userMfa = data.mfa_status || "Not Available";

    // Populate header/profile section
    const headerUser = document.getElementById("headerUserName");
    const popupUser = document.getElementById("getUserNamePopup");
    const emailEl = document.getElementById("getUserEmailId");
    const firstLetterEl = document.getElementById("headerUserFirstLetter");

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
    mfaToggle.addEventListener('change', function() {
        mfaStatusLabel.textContent = this.checked ? 'Enabled' : 'Disabled';
    });

    // Initialize Select2 dropdown
    const timezoneSelect = $('#kt_select2_2');
    if (timezoneSelect.length) {
      if (timezoneSelect.hasClass("select2-hidden-accessible")) {
        timezoneSelect.val(userTimezone).trigger("change");
      } else {
        const interval = setInterval(() => {
          if ($('#kt_select2_2').hasClass("select2-hidden-accessible")) {
            $('#kt_select2_2').val(userTimezone).trigger("change");
            clearInterval(interval);
          }
        }, 100);
      }
    }
  })
  .catch(error => {
    console.error("Error fetching profile info:", error);
    // Optional: window.location.href = "./index.html";
  });
}


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
    const verifyButton = document.getElementById("verify-setup");

    verifyButton.addEventListener("click", async function () {
      const firstOtp = document.getElementById("setup-otp").value.trim();
      const secondOtp = document.getElementById("setup-otp-1").value.trim();
       const token = localStorage.getItem('access_token');
          if (!token) {
            window.location.href = "./index.html";
            return false;
          }

      if (!firstOtp || !secondOtp) {
        toastr.warning("Both OTP codes are required.");
        return;
      }

      if (firstOtp === secondOtp) {
        toastr.warning("Second OTP must be different from the first.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}authenticate/confirm-mfa-enable-setup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            first_otp: firstOtp,
            second_otp: secondOtp
          })
        });

        const data = await response.json();

        if (response.ok) {
          toastr.success(data.message || "MFA setup successful.");
           setTimeout(function() {
            window.location.reload();
        }, 1000);
          // Optional: close the modal
          // document.querySelector('#enableMfaModal .close').click();
          // document.getElementById("mfa-setup-span-disable").style.display = "inline-block";
          // document.getElementById("mfa-setup-span-enable").style.display = "none";
        } else {
          toastr.error(data.error || "MFA setup failed.");
        }

      } catch (error) {
        console.error("Error verifying MFA:", error);
        toastr.error("An unexpected error occurred.");
      }
    });
  });

  // Optional: Handle the checkbox change to toggle modal attributes
  const checkbox = document.querySelector('input[name="select"]');
  if (checkbox) {
      checkbox.addEventListener('change', function() {
          if(!this.checked) {
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
      const mfaToggle = document.querySelector('input[name="select"]');
      const token = localStorage.getItem('access_token');
      if (mfaToggle) {
          mfaToggle.addEventListener('change', async function() {
              if(!this.checked) {
                  this.setAttribute('data-toggle', 'modal');
                  this.setAttribute('data-target', '#enableMfaModal');
                  
                  // Disable MFA flow
                  try {
                      const response = await fetch(`${BASE_URL}authenticate/disable-mfa`, {
                          method: "POST",
                          headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "application/json"
                          }
                      });

                      const data = await response.json();

                      if (response.ok) {
                          toastr.success("MFA disabled successfully.");
                      } else {
                          toastr.error("Failed to disable MFA: " + (data.error || data.message));
                          this.checked = true;
                      }
                  } catch (error) {
                      console.error("Error disabling MFA:", error);
                      toastr.warning("Something went wrong while disabling MFA.");
                      this.checked = true;
                  }
              } else {
                  // When turning ON MFA - show the MFA setup modal
                  this.removeAttribute('data-toggle');
                  this.removeAttribute('data-target');
                  // Enable MFA flow
                  try {
                      const response = await fetch(`${BASE_URL}authenticate/enable-mfa`, {
                          method: "POST",
                          headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "application/json"
                          }
                      });

                      const data = await response.json();

                      if (response.ok) {
                          const qrUri = data.qr_uri;
                          const qrImage = document.getElementById("qrImage");
                          qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrUri)}&size=150x150`;
                          
                          mfaVerified = false;
                          // enableMfaModal.show();

                          const modalEl = document.getElementById('enableMfaModal');
                          if (modalEl) {
                            let modal = KTModal.getInstance(modalEl);
                            if (!modal) {
                              modal = new KTModal(modalEl);
                            }
                            modal.show();
                          }
                      } else {
                          // toastr.error("Failed to enable MFA: " + (data.error || data.message));
                          toastr.warning("Please Login Again to Enable MFA")
                          this.checked = false;
                          document.getElementById('mfaStatusLabel').textContent = 'Disabled';
                      }
                  } catch (error) {
                      console.error("Error enabling MFA:", error);
                      toastr.warning("Something went wrong while enabling MFA.");
                      this.checked = false;
                      document.getElementById('mfaStatusLabel').textContent = 'Disabled';
                  }
              }
          });
      } else {
          console.warn('MFA toggle switch not found');
      }
  });

    // Tab switching functionality
window.switchTab = function(tabName) {
    console.log('Switching to tab:', tabName); // Debug log
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('[data-tab-target]').forEach(button => {
        button.classList.remove('text-indigo-600', 'border-indigo-600', 'border-b-2');
        button.classList.add('text-gray-500', 'hover:text-gray-700');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(`${tabName}-tab-content`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        selectedTab.classList.add('active');
        console.log('Tab content shown:', selectedTab.id); // Debug log
    }
    
    // Add active class to clicked tab button
    const activeButton = event.currentTarget;
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
}

// Helper function to format duration
function formatDuration(seconds) {
    if (!seconds) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {    
    // Set initial active state for the profile tab button
    const profileButton = document.querySelector('[data-tab-target="profile-tab-content"]');
    if (profileButton) {
        profileButton.classList.add('text-indigo-600', 'border-indigo-600', 'border-b-2');
        profileButton.classList.remove('text-gray-500', 'hover:text-gray-700');
    }
    
    // Set inactive state for statistics tab button
    const statsButton = document.querySelector('[data-tab-target="statistics-tab-content"]');
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
  const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '../index.html';
      return;
  }
    // Get the selected timezone value
    const selectedTimezone = document.getElementById('kt_select2_2').value;
    
    if (!selectedTimezone) {
        toastr.warning('Please select a timezone');
        return;
    }

    // Prepare the data to send
    const data = {
        new_timezone: selectedTimezone
    };

    // Make the API call
    fetch(`${BASE_URL}authenticate/update_timezone_for_user_cognito`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
        if (data.status === 'success') {
            toastr.success('Timezone updated successfully!');
            setTimeout(function () {
              window.location.reload();
            }, 2000);
        } else {
            toastr.error('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toastr.error('An error occurred: ' + (error.message || 'Please try again'));
    });
}
window.editTimeZone = function () {
    const timezoneDiv = document.querySelector('.select-timezone');
    if (timezoneDiv) {
        timezoneDiv.classList.remove('hidden');
    }
}