import Swal from 'sweetalert2';
window.Swal = Swal;

// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// window.Swiper = Swiper;

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

const progressIntervals = {};

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
      window.location.href = '../index.html';
    } else {
      console.log('JWT token is still valid.');
    }
  }
});

function toggleContent() {
  const slider = document.getElementById("content-slider");
  const content = document.getElementById("content");
  // const chatIcon = document.getElementById("draggableElement");
  // const taskContainer = document.getElementById("taskTrackerContainer");

  // Hide the slider smoothly
  slider.classList.add("hidden");
  slider.classList.remove("visible");

  // Show the patient content smoothly
  content.classList.remove("hidden");
  content.classList.add("visible");

  // chatIcon.classList.remove("hidden");
  // chatIcon.classList.add("visible");

  // taskContainer.classList.remove("hidden");
  // taskContainer.classList.add("visible");
}

const params = new URLSearchParams(window.location.search);
const urlUserName = params.get('user_name');

function fetchPatientCounts() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Fetch active patients
  fetch(`${BASE_URL}patient-name-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const activeCount = data.patients?.length || 0;
      document.getElementById("activePatientCount").textContent = `Active (${activeCount})`;
    })
    .catch(error => {
      console.error("Error fetching active patients:", error);
    });

  // Fetch archived patients
  fetch(`${BASE_URL}get-archived-patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const archiveCount = data.archived_patients?.length || 0;
      document.getElementById("archivePatientCount").textContent = `Archived (${archiveCount})`;
    })
    .catch(error => {
      console.error("Error fetching archived patients:", error);
    });
}

// Call the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  fetchPatientCounts();
});


document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }
  fetchPatientList(`${BASE_URL}patient-name-list`);
});

function fetchArchivedPatientList(url) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }
 
  showLoadingMessage();

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.archived_patients && data.archived_patients.length > 0) {
        updateArchivedPatientList(data.archived_patients);
      } else {
        const patientList = document.querySelector(".navi");
        patientList.innerHTML = "";

        // Create the container
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "text-center mt-3";

        // Line 1: Trash icon
        const icon = document.createElement("i");
        icon.className = "fas fa-trash fa-2x text-muted my-2";
        emptyMsg.appendChild(icon);

        // Line break for spacing (optional)
        emptyMsg.appendChild(document.createElement("br"));

        // Line 2: Title text
        const title = document.createElement("div");
        title.textContent = "View Deleted Patients here";
        title.className = "fw-bold";
        emptyMsg.appendChild(title);

        // Line 3: Message text
        const text = document.createElement("div");
        text.textContent = "Restore them Within 60 Days";
        title.className = "fw-bold";
        emptyMsg.appendChild(text);

        // Append to the DOM
        patientList.appendChild(emptyMsg);


      }
    })
    .catch(error => console.error("Error fetching archived patient list:", error));
}

// Modified version for simple name list
function updateArchivedPatientList(patients) {
  const patientList = document.querySelector(".navi");
  patientList.innerHTML = "";
  // Add a select-all checkbox at the top if there are patients
  if (patients.length > 0) {
    const selectAllContainer = document.createElement("div");
    selectAllContainer.className = "flex items-center mb-3 px-1 pl-3";

    const selectAllCheckbox = document.createElement("input");
    selectAllCheckbox.type = "checkbox";
    selectAllCheckbox.id = "selectAllArchivePatients";
    selectAllCheckbox.className = "mr-2 cursor-pointer";

    const selectAllLabel = document.createElement("label");
    selectAllLabel.htmlFor = "selectAllArchivePatients";
    selectAllLabel.className = "text-xs cursor-pointer w-100";
    selectAllLabel.textContent = "Select All";

    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);

    // Add delete selected button
    const deleteSelectedBtn = document.createElement("button");
    deleteSelectedBtn.className = "disabled:opacity-50 disabled:pointer-events-none cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-3";
    deleteSelectedBtn.textContent = "Unarchive";
    deleteSelectedBtn.disabled = true;

    selectAllContainer.appendChild(deleteSelectedBtn);
    patientList.appendChild(selectAllContainer);

    // Select all functionality
    selectAllCheckbox.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".patient-checkbox");
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
      deleteSelectedBtn.disabled = !this.checked;
    });

    // Delete selected functionality
    deleteSelectedBtn.addEventListener("click", function () {
      const selectedPatients = Array.from(document.querySelectorAll(".patient-checkbox:checked"))
        .map(checkbox => checkbox.dataset.patientName);

      if (selectedPatients.length === 0) return;

      const token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = '../index.html';
        return;
      }

      Swal.fire({
        title: 'Unarchive',
        text: ``,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false,
        reverseButtons: true,
        customClass: {
          confirmButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9',
          cancelButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9 mr-2'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Show loading while unarchiving
          Swal.fire({
            title: 'Unarchiving...',
            text: 'Please wait while we unarchive the patients.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          try {
            const response = await fetch(`${BASE_URL}unarchive-patient`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ patient_names: selectedPatients })
            });

            const data = await response.json();
            Swal.close();

            if (data.results && data.results.every(r => r.status === "unarchived")) {
              toastr.success(`${selectedPatients.length} Patient(s) Unarchived Successfully`);
              refreshPatientList();
              fetchPatientCounts();
            } else {
              const failed = data.results.filter(r => r.status !== "unarchived");
              toastr.error(`${failed.length} Patient(s) Failed to Unarchive`);
            }

          } catch (error) {
            Swal.close();
            console.error('API Error:', error);
            toastr.error('Failed to Unarchive Patients');
          }
        }
      });
    });

    patientList.addEventListener("change", function (e) {
      if (e.target.classList.contains("patient-checkbox")) {
        const anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
        deleteSelectedBtn.disabled = !anyChecked;

        const allChecked = document.querySelectorAll(".patient-checkbox:checked").length ===
          document.querySelectorAll(".patient-checkbox").length;
        selectAllCheckbox.checked = allChecked;
      }
    });
  }

  patients.forEach(patient => {
    const { patient_name: name, diagnosis, patient_id } = patient;

    const listItem = document.createElement("li");
    listItem.className = "patient-item navi-item flex items-center justify-between bg-gray-50 rounded-2xl p-2";
    listItem.style.backgroundColor = "#F3F6F9";
    listItem.style.borderRadius = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "patient-checkbox mr-3 cursor-pointer";
    checkbox.dataset.patientName = name;
    listItem.appendChild(checkbox);

    const nameLink = document.createElement("a");
    nameLink.className = "navi-link flex-grow w-100";
    nameLink.href = "#";
    nameLink.style.padding = "5px";

    const contentContainer = document.createElement("div");
    contentContainer.style.display = "block";

    const nameSpan = document.createElement("span");
    nameSpan.className = "navi-text font-semibold text-xs text-primary block";
    nameSpan.style.color = "#0b6fac";
    nameSpan.style.display = "inline-block";
    nameSpan.textContent = name;
    contentContainer.appendChild(nameSpan);

    const diagnosisSpan = document.createElement("span");
    diagnosisSpan.className = "navi-text text-gray-500 text-[11px]";
    diagnosisSpan.style.display = "block";

    const displayDiagnosis = diagnosis === "No diagnosis available"
      ? "No diagnosis available"
      : diagnosis;

    const truncatedDiagnosis = displayDiagnosis.length > 35
      ? `${displayDiagnosis.substring(0, 35)}...`
      : displayDiagnosis;

    diagnosisSpan.textContent = truncatedDiagnosis;

    if (displayDiagnosis.length > 35) {
      diagnosisSpan.setAttribute("title", displayDiagnosis);
    }

    contentContainer.appendChild(diagnosisSpan);
    nameLink.appendChild(contentContainer);

    nameLink.onclick = function () {
      fetchArchivedPatientDetails(name, patient_id, this);
    };

    listItem.appendChild(nameLink);

    const moreIcon = document.createElement("i");
    moreIcon.className = "flaticon-more text-dark";
    moreIcon.style.marginLeft = "10px";
    moreIcon.style.marginRight = "10px";
    moreIcon.style.fontSize = "13px";
    moreIcon.style.cursor = "pointer";

    moreIcon.onclick = function (event) {
      event.stopPropagation();

      const menu = document.getElementById("unarchiveMenu");
      const rect = moreIcon.getBoundingClientRect();

      if (window.innerWidth < 992) {
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${rect.left + window.scrollX}px`;
        menu.style.minWidth = "200px";
      } else {
        menu.style.top = `${rect.top + window.scrollY + 20}px`;
        menu.style.left = `${rect.left + window.scrollX + 20}px`;
        menu.style.minWidth = "150px";
      }

      menu.style.display = "block";
      setTimeout(() => {
        menu.style.display = "none";
      }, 3000);

      menu.dataset.patientName = name;
    };

    const noteMenu = document.getElementById("unarchiveMenu");

    // noteMenu.querySelector(".note-option-unarchive").onclick = function (event) {
    //   event.stopPropagation();
    //   const token = localStorage.getItem("access_token");
    //   if (!token) {
    //     window.location.href = '../index.html';
    //     return;
    //   }
    //   const patientName = noteMenu.dataset.patientName;
    //   document.getElementById("noteMenu").style.display = "none";

    //   Swal.fire({
    //     title: 'Unarchive',
    //     text: "",
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes',
    //     cancelButtonText: 'No',
    //     allowOutsideClick: false,
    //     reverseButtons: true,
    //     customClass: {
    //       confirmButton: 'btn btn-outline-primary btn-embossed pt-2 pb-2',
    //       cancelButton: 'btn btn-outline-primary btn-embossed pt-2 pb-2'
    //     },
    //     buttonsStyling: false
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       // Show loading message
    //       Swal.fire({
    //         title: 'Unarchiving...',
    //         text: 'Please wait while unarchive the patient.',
    //         allowOutsideClick: false,
    //         didOpen: () => {
    //           Swal.showLoading();
    //         }
    //       });

    //       try {
    //         const response = await fetch(`${BASE_URL}/unarchive-patient`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //           },
    //           body: JSON.stringify({ patient_names: [patientName] })
    //         });

    //         const data = await response.json();
    //         Swal.close(); // Hide loading

    //         if (data.results && data.results.length > 0 && data.results[0].status === 'unarchived') {
    //           toastr.success('Patient Unarchived Successfully');
    //           refreshPatientList();
    //           fetchPatientCounts();
    //         } else {
    //           toastr.error('Failed to unarchive patient.');
    //         }

    //       } catch (error) {
    //         Swal.close(); // Hide loading on error
    //         console.error('API Error:', error);
    //         toastr.error('Something went wrong while unarchiving.');
    //       }
    //     }
    //   });
    // };


    patientList.appendChild(listItem);
  });
}

// transcript drawer :: start
document.addEventListener("DOMContentLoaded", function () {
    const dictatedBtn = document.getElementById("dictated"); 
    const uploadedBtn = document.getElementById("uploaded");

    window.loadSutureFix = async function (patientName, archiveState) {
        const token = localStorage.getItem("access_token");
        const container = document.getElementById("dictated_listing");
        container.innerHTML = `
            <p class="text-center text-gray-500 py-4 text-sm">Loading dictated notes...</p>
        `;

        try {
            const res = await fetch(`${BASE_URL}list-transcriptions-page`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patient_name: patientName,
                    page: 1,
                    page_size: "ALL", 
                    patient_status: archiveState
                })
            });

            const data = await res.json();

            if (!data.transcriptions || data.transcriptions.length === 0) {
                container.innerHTML = `
                    <p class="text-center text-gray-500 py-4 text-sm">No Dictated Files Available</p>
                `;
                return;
            }

            let html = "";

            data.transcriptions.forEach(t => {
                const ts = t.timestamp.replace(/ <infostream[^>]*>/, "");
                const cleanText = t.file_content.trim().replace(/\n/g, " ");

                html += `
                    <div class="mb-4 p-4 border rounded-lg shadow-sm border-gray-400 transcript-card">

                        <div class="flex justify-between text-xs text-gray-500 mb-2">
                            <span>${ts}</span>

                            <div class="flex items-center gap-3">

                                <!-- PLAY BUTTON -->
                                <span class="play-btn text-color text-sm cursor-pointer"
                                      data-audio-url="${t.audio_file_url}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" 
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </span>

                                <!-- EDIT BUTTON -->
                                <span class="edit-btn text-color text-sm cursor-pointer flex items-center gap-1"
                                      data-fulltext="${cleanText.replace(/"/g,'&quot;')}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
                                                7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 
                                                0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </span>

                            </div>
                        </div>

                        <p class="transcript-text text-sm text-gray-700"
                          data-fulltext="${cleanText.replace(/"/g, '&quot;')}">
                        </p>

                    </div>
                `;
            });

            container.innerHTML = html;

            applyDictatedShowMore();
            bindDictatedEvents();
            bindPlayEvents();

        } catch (err) {
            console.error(err);
            container.innerHTML = `
                <p class="text-center text-red-500 py-4 text-sm">Failed to load dictated notes</p>
            `;
        }
    };

    let globalAudio = new Audio();
    let currentPlayingBtn = null;

    function bindPlayEvents() {
        document.querySelectorAll(".play-btn").forEach(btn => {
            btn.addEventListener("click", async function () {
                const audioUrl = this.dataset.audioUrl;

                // SAME BUTTON → toggle play/pause
                if (currentPlayingBtn === this) {
                    if (globalAudio.paused) {
                        globalAudio.play();
                        setPauseIcon(this);
                    } else {
                        globalAudio.pause();
                        setPlayIcon(this);
                    }
                    return;
                }

                // NEW AUDIO → stop previous
                if (currentPlayingBtn) setPlayIcon(currentPlayingBtn);
                globalAudio.pause();
                globalAudio.currentTime = 0;

                // Show loading spinner icon
                this.innerHTML = `<i class="ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2 text-color"></i>`;
                currentPlayingBtn = this;
                const token = localStorage.getItem("access_token");

                try {
                    const response = await fetch(`${BASE_URL}stream-audio`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ s3_url: audioUrl })
                    });

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    globalAudio.src = blobUrl;
                    await globalAudio.play();

                    setPauseIcon(this);

                    globalAudio.onended = () => {
                        setPlayIcon(this);
                        currentPlayingBtn = null;
                    };

                } catch (err) {
                    console.error(err);
                    toastr.error("Audio playback failed");
                    setPlayIcon(this);
                }
            });
        });
    }

    function setPlayIcon(btn) {
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>`;
    }

    function setPauseIcon(btn) {
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="14"></rect>
                <rect x="14" y="4" width="4" height="14"></rect>
            </svg>`;
    }

    document.querySelector(".process-edit").addEventListener("click", async () => {

        const processBtn = document.querySelector(".process-edit");
        processBtn.disabled = true;

        // 🔄 Add spinner immediately
        processBtn.innerHTML = `
            <span class="flex items-center gap-2 justify-center">
                <i class="ki-filled ki-arrows-circle animate-spin text-lg"></i>
                Processing...
            </span>
        `;

        // 🔥 CLOSE DRAWER IMMEDIATELY (do NOT wait for API)
        const drawer = KTDrawer.getInstance(document.querySelector("#drawer_1"));
        drawer.hide();

        const patientName = document.getElementById("getPatientNameFromList").value;
        const editedText = document.getElementById("editor_textarea").value.trim();

        const transcriptEdits = {
            patient_name: patientName,
            edits: [
                {
                    timestamp: window.currentEditingTimestamp,
                    content: editedText
                }
            ]
        };

        // Save + Spinner + Tick
        await processTranscriptSave(transcriptEdits, patientName);

        // Reload dictated list after editing
        loadSutureFix(patientName, "active");

        // Reset button UI after save
        processBtn.disabled = false;
        processBtn.innerHTML = "Process";
    });

    async function processTranscriptSave(transcriptEdits, patientName) {
        const token = localStorage.getItem("access_token");

        // 1️⃣ Find patient LI
        const item = document.querySelector(
            `.patient-checkbox[data-patient-name="${patientName}"]`
        )?.closest("li");

        // 2️⃣ Remove old icons
        document.querySelectorAll(".spinner-icon, .tick-icon").forEach(el => el.remove());

        // 3️⃣ Add spinner
        if (item) {
            const spinner = document.createElement("i");
            spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
            spinner.style.marginLeft = "10px";
            spinner.style.color = "#0b6fac";
            item.appendChild(spinner);
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        // 4️⃣ Call backend
        try {
            const res = await fetch(`${BASE_URL}edit_raw_transcript_in_s3`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(transcriptEdits)
            });

            if (!res.ok) throw new Error("Failed to save");

            toastr.success("Transcription Updated Successfully");

            // 5️⃣ Replace spinner with tick
            if (item) {
                item.querySelector(".spinner-icon")?.remove();

                const tick = document.createElement("i");
                tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
                tick.style.marginLeft = "10px";
                tick.style.color = "#0b6fac";
                item.appendChild(tick);
            }

            // 6️⃣ Trigger summary refresh
            onDemandSummaryCall();

        } catch (err) {
            console.error(err);
            toastr.error("Error saving transcript");
        }
    }



    function activateDictatedTab() {
        document.getElementById("editor_section").classList.add("hidden");
        document.getElementById("footer_edit").classList.add("hidden");
        document.getElementById("footer_normal").classList.remove("hidden");
        dictatedBtn.classList.remove("bg-white");
        dictatedBtn.classList.add("bg-[#dbeeff]");
        uploadedBtn.classList.remove("bg-[#dbeeff]");
        document.getElementById("dictated_listing").classList.remove("hidden");
        document.getElementById("uploaded_listing").classList.add("hidden");
    }

    function activateUploadedTab() {
        document.getElementById("editor_section").classList.add("hidden");
        document.getElementById("footer_edit").classList.add("hidden");
        document.getElementById("footer_normal").classList.remove("hidden");
        uploadedBtn.classList.remove("bg-white");
        uploadedBtn.classList.add("bg-[#dbeeff]");
        dictatedBtn.classList.remove("bg-[#dbeeff]");
        document.getElementById("uploaded_listing").classList.remove("hidden");
        document.getElementById("dictated_listing").classList.add("hidden");
    }


    function resetTranscriptDrawer() {
        // Close editor
        document.getElementById("editor_section").classList.add("hidden");
        document.getElementById("dictated_listing").classList.remove("hidden");
        document.getElementById("uploaded_listing").classList.add("hidden");

        // Reset footer
        document.getElementById("footer_edit").classList.add("hidden");
        document.getElementById("footer_normal").classList.remove("hidden");

        // Reset tabs
        dictatedBtn.classList.add("bg-[#dbeeff]");
        uploadedBtn.classList.remove("bg-[#dbeeff]");

        // Clear editor text
        document.getElementById("editor_textarea").value = "";

        // Clear uploaded content dynamically
        document.getElementById("uploaded_listing").innerHTML = "";

        // Reapply dictated trimming
        applyDictatedShowMore();
    }
    document.getElementById("transcript_drawer")
        .addEventListener("click", () => {
            resetTranscriptDrawer();
            // openDrawer();
            const pname = document.getElementById('getPatientNameFromList').value;
        loadSutureFix(pname, 'active'); 
        });

    function applyDictatedShowMore() {
        document.querySelectorAll(".transcript-text").forEach(el => {
            truncateWithShowMore(el);
        });
    }

    /* Open dictated editor */
    function openEditMode(fullText) {
        document.getElementById("dictated_listing").classList.add("hidden");
        document.getElementById("editor_section").classList.remove("hidden");

        document.getElementById("editor_textarea").value = fullText;

        document.getElementById("footer_normal").classList.add("hidden");
        document.getElementById("footer_edit").classList.remove("hidden");
    }

    /* Cancel dictated edit */
    function cancelEditMode() {
        document.getElementById("editor_section").classList.add("hidden");
        document.getElementById("dictated_listing").classList.remove("hidden");

        document.getElementById("footer_edit").classList.add("hidden");
        document.getElementById("footer_normal").classList.remove("hidden");
    }

    function truncateWithShowMore(element, limit = 120) {
        const fullText = element.dataset.fulltext.trim();

        // formatted full HTML with <br>
        const formattedFullHTML = fullText
            .replace(/\n\n/g, "<br><br>")
            .replace(/\n/g, "<br>");

        // If text is short → show full
        if (fullText.length <= limit) {
            element.innerHTML = formattedFullHTML;
            return;
        }

        // Short preview (truncate by characters, not words)
        const shortText = fullText.slice(0, limit).trim() + " ...";

        element.innerHTML = `
            ${shortText}
            <span class="text-color cursor-pointer text-sm show-toggle">Show more</span>
        `;

        let expanded = false;

        function toggle() {
            expanded = !expanded;

            if (expanded) {
                element.innerHTML = `
                    ${formattedFullHTML}
                    <span class="text-color cursor-pointer text-sm show-toggle">Show less</span>
                `;
            } else {
                element.innerHTML = `
                    ${shortText}
                    <span class="text-color cursor-pointer text-sm show-toggle">Show more</span>
                `;
            }

            // Rebind event because HTML was replaced
            element.querySelector(".show-toggle").addEventListener("click", toggle);
        }

        element.querySelector(".show-toggle").addEventListener("click", toggle);
    }

    function applyUploadedTruncate() {
        document.querySelectorAll(".uploaded-text").forEach(el => {
            truncateWithShowMore(el);
        });
    }

    window.loadUploads = async function (patientName, archiveState) {
        const token = localStorage.getItem("access_token");
        const container = document.getElementById("uploaded_listing");

        // Show loading text instead of spinner
        container.innerHTML = `
            <p class="text-center text-gray-500 py-4 text-sm">Loading uploads...</p>
        `;

        try {
            const res = await fetch(`${BASE_URL}fetch-uploaded-txt`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patient_name: patientName,
                    page: 1,
                    page_size: "ALL",
                    patient_status: archiveState,
                }),
            });

            const data = await res.json();

            if (!data.uploads || data.uploads.length === 0) {
                container.innerHTML = `
                    <p class="text-center text-gray-500 py-4 text-sm">No Upload Files Available</p>
                `;
                return;
            }

            let html = "";

            data.uploads.forEach(upload => {
                const ts = upload.timestamp.replace(/ <infostream[^>]*>/, "");
                let content = upload.file_content;

                // Extract context
                const ctxMatch = content.match(/<upload_context:([^>]+)>/i);
                let context = ctxMatch ? ctxMatch[1].replace(/_/g, " ") : "";
                context = context.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

                // Remove upload_context tag
                const cleanText = content.replace(/<upload_context:[^>]+>/i, "").trim();

                // Convert text to HTML with <br>
                const cleanHTML = cleanText
                    .replace(/\n\n/g, "<br><br>")
                    .replace(/\n/g, "<br>");

                html += `
                    <div class="mb-4 p-4 border rounded-lg shadow-sm border-gray-400 transcript-card">
                        <div class="flex justify-between text-xs text-gray-500 mb-2">
                            <span>${ts}</span>
                            <span class="text-color text-xs">${context}</span>
                        </div>

                        <p class="uploaded-text text-sm text-gray-700"
                        data-fulltext="${cleanText.replace(/"/g, '&quot;')}">
                        ${cleanHTML}
                        </p>
                    </div>
                `;
            });

            container.innerHTML = html;

            // Enable truncation with preserved formatting
            applyUploadedTruncate();

        } catch (err) {
            console.error(err);
            container.innerHTML = `
                <p class="text-center text-red-500 py-4 text-sm">Failed to load uploads</p>
            `;
        }
    };

    function bindDictatedEvents() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", function () {

              // ⬅️ Capture timestamp for save
              const card = this.closest(".transcript-card");
              const ts = card.querySelector("span").innerText.trim();
              window.currentEditingTimestamp = ts;

              // Load text in editor
              const fullText = this.dataset.fulltext;
              openEditMode(fullText);
              document.getElementById("uploaded_listing").classList.add("hidden");
          });
      });

        document.querySelector(".cancel-edit")
            .addEventListener("click", cancelEditMode);
    }
    function bindTabEvents() {

        dictatedBtn.disabled = false;
        uploadedBtn.disabled = false;

        dictatedBtn.addEventListener("click", () => {
            activateDictatedTab();
            const pname = document.getElementById('getPatientNameFromList').value;
            loadSutureFix(pname, 'active');
        });

        uploadedBtn.addEventListener("click", () => {
            activateUploadedTab();
            const currentPatientName = document.getElementById('getPatientNameFromList').value;
            loadUploads(currentPatientName, 'active');
        });
    }


    // function bindDrawerEvents() {
    //     document.querySelector("[data-kt-drawer-dismiss]").addEventListener("click", closeDrawer);
    // }

    function initTranscriptDrawer() {
        applyDictatedShowMore();
        bindDictatedEvents();
        bindTabEvents();  
        // bindDrawerEvents();
    }

        initTranscriptDrawer();

});
// transcript drawer :: end

async function fetchArchivedPatientDetails(patientName, patientId, element) {
  // toggleContent();
  // const recordingBlock = document.querySelector('.patient-wise-recording');
  // if (recordingBlock) {
  //   recordingBlock.style.display = 'none';
  // }

  const passPatientName = document.getElementById('passPatientName');
  const addModalPatientName = document.getElementById('addModalPatientName');
  const getPatientNameFromList = document.getElementById('getPatientNameFromList');

  if (passPatientName) passPatientName.value = patientName;
  if (addModalPatientName) addModalPatientName.textContent = patientName;
  if (getPatientNameFromList) getPatientNameFromList.value = patientName;

  selectedPatientName = patientName;

  const patientDetails = document.querySelector('.patient-name');

  if (patientDetails) {
    patientDetails.innerHTML = '';
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('navi-text');
    nameSpan.textContent = patientName;
    patientDetails.appendChild(nameSpan);
  }

  const apiUrl = `${BASE_URL}summary/display-patient-jobs-output?patient_name=${patientName}&patient_status=archived`;
  const apiUrl_raw = `${BASE_URL}summary/`;
  const summaryDiv = document.querySelector(".summary-container");
  const assessmentDiv = document.querySelector(".assessment-container");
  const planDiv = document.querySelector(".assessment-plan-container");
  const rawTransDiv = document.querySelector(".raw-transcription-id");
  const reviewDiv = document.querySelector(".review-of-system-id");
  const phyExamDiv = document.querySelector(".physical-exam-id");
  const token = localStorage.getItem('access_token');

  document.querySelectorAll(".navi-link").forEach(
    link => link.classList.remove("active"));
  // link.addEventListener("click", function (e) {
  //   e.preventDefault();

  // Remove active classes from all
  document.querySelectorAll(".navi-link").forEach(l => {
    l.classList.remove("active");
    if (l.parentElement.classList.contains("navi-item")) {
      l.parentElement.classList.remove("active-li");
    }
  });

  // Add active class to clicked link and its parent <li>
  // this.classList.add("active");
  if (element) element.classList.add("active");
  if (element.parentElement.classList.contains("navi-item")) {
    element.parentElement.classList.add("active-li");
  }

  let summarySeconds = 0, assessmentSeconds = 0;

  summaryDiv.innerHTML = `<p class="loading-text text-xs">Loading... <span id="summary-timer">0</span>s</p>`;
  assessmentDiv.innerHTML = `<p class="loading-text text-xs">Loading... <span id="assessment-timer">0</span>s</p>`;
  planDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;
  reviewDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;
  phyExamDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;

  // Timers
  const summaryTimer = setInterval(() => {
    summarySeconds++;
    document.getElementById("summary-timer").innerText = summarySeconds;
  }, 1000);

  const assessmentTimer = setInterval(() => {
    assessmentSeconds++;
    document.getElementById("assessment-timer").innerText = assessmentSeconds;
  }, 1000);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    clearInterval(summaryTimer);
    clearInterval(assessmentTimer);

    const data = await response.json();


    // Update Summary
    var file_content = data.file_content;
    let jsonArray = [file_content];
    let jsonString = JSON.stringify(jsonArray);

    const newObj = {};
    for (const key in file_content) {
      if (file_content.hasOwnProperty(key)) {
        const newKey = key.replace(/\s/g, '_');
        newObj[newKey] = file_content[key];
      }
    }
    // Update Summary
    if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].length === 0) {
      summaryDiv.innerHTML = `<p class='text-xs'>No Summary Available</p>`;
    } else {
      const formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");

      summaryDiv.innerHTML = `
        <div class="pt-0 inside-summary-section text-xs">
          ${formattedText}
        </div>`;
    }




    // Update Assessment
    if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].length === 0) {
      assessmentDiv.innerHTML = `<p class='text-xs'>No Interval Events Available</p>`;
    } else {
      const formattedText = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");

      assessmentDiv.innerHTML = `
        <div class="pt-0 inside-assess-section text-xs">
          ${formattedText}
        </div>`;
    }



    // Update Assessment Plan
    if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
      planDiv.innerHTML = `<p class='text-xs'>No Assessment Plan Available</p>`;
    } else {
      const formattedText = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");

      planDiv.innerHTML = `
        <div class="pt-0 inside-plan-section text-xs">
          ${formattedText}
        </div>`;
    }


    // Update Review of System
    if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
      reviewDiv.innerHTML = `<p class='text-xs'>No Review of System Available</p>`;
    } else {
      const formattedText = newObj['Review_of_Systems'].replace(/\n/g, "<br>");

      reviewDiv.innerHTML = `
        <div class="pt-0 inside-review-system-section text-xs">
          ${formattedText}
        </div>`;
    }

    //update physical examination
    if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
      phyExamDiv.innerHTML = `<p class='text-xs'>No Physical Examination Available</p>`;
    } else {
      const formattedText = newObj['Physical_Examination'].replace(/\n/g, "<br>");

      phyExamDiv.innerHTML = `
        <div class="pt-0 inside-physical-exam-section text-xs">
          ${formattedText}
        </div>`;
    }

    const diagnosis = newObj['Principal_Diagnosis'] || '● None documented';

    // Get all <li> elements with class "navi-item"
    const diagnosisItems = document.querySelectorAll('li.navi-item');

    diagnosisItems.forEach(item => {
      const nameSpan = item.querySelector('.navi-text.font-semibold');
      const diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');

      if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
        if (diagnosis.length <= 24) {
          diagnosisSpan.style.marginRight = '40px';
        }
        // Limit diagnosis to 35 characters
        const truncatedDiagnosis = diagnosis.length > 35
          ? diagnosis.substring(0, 35) + '...'
          : diagnosis;

        diagnosisSpan.textContent = truncatedDiagnosis;
      }
    });


  } catch (error) {
    console.error("Error fetching data:", error);
    summaryDiv.innerHTML = `<p class='text-xs'>Error loading summary</p>`;
    assessmentDiv.innerHTML = `<p class='text-xs'>Error loading assessment</p>`;
    planDiv.innerHTML = `<p class='text-xs'>Error loading assessment plan</p>`;
    reviewDiv.innerHTML = `<p class='text-xs'>Error loading Review of System</p>`;
    phyExamDiv.innerHTML = `<p class='text-xs'>Error loading Physical Examination</p>`;
  }

  fetchArchivedPatientHpDetails(patientName);
  fetchArchivedPatientDsDetails(patientName);
  // loadTasks(patientName);

  // loadSutureFix(patientName, 'archived');
  // loadUploads(patientName, 'archived');      
  // loadPhrases('archived');  

}

function fetchPatientList(url, isPending = false) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }

  showLoadingMessage(); // Show loading before fetching

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (isPending) {
        // For pending patients - use original format (array of names)
        const patientNamesKey = "pending_patient_names";
        if (data[patientNamesKey] && data[patientNamesKey].length > 0) {
          updatePatientList(data[patientNamesKey], isPending);
        } else {
          showNoPatientsMessage();
        }
      } else {
        // For active patients - use new format (array of objects)
        const patientsKey = "patients";
        if (data[patientsKey] && data[patientsKey].length > 0) {
          // Convert to format expected by updatePatientList
          const patientData = data[patientsKey].map(patient => ({
            name: patient.patient_name,
            diagnosis: patient.diagnosis,
            patient_id: patient.patient_id,
            rec_status: patient.rec_status
          }));

          let selectedSortValue = null;
          if (data.sort_by && data.sort_order) {
            selectedSortValue = `${data.sort_by}_${data.sort_order}`; 
          }

          updatePatientList(patientData, isPending, selectedSortValue);
        } else {
          showNoPatientsMessage();
        }
      }
    })
    .catch(error => console.error("Error fetching patient list:", error));
}

function showLoadingMessage() {
  document.querySelectorAll('.clear-content').forEach(div => {
    div.innerHTML = '';
  });
  // document.querySelector(".patient-wise-recording").style.display = 'none';
  const patientList = document.querySelector(".navi");
  patientList.innerHTML = ""; // Clear existing content

  const loadingItem = document.createElement("div");
  loadingItem.classList.add("show-section");
  loadingItem.innerHTML = `<h4 class="navi-text text-xs">Loading...</h4>`;
  patientList.appendChild(loadingItem);
}

async function updatePatientList(patientData, isPending, selectedSortValue=null) {
  const patientList = document.querySelector(".navi");
  patientList.innerHTML = "";

  // Add a select-all checkbox at the top if there are patients
  if (patientData.length > 0) {
    const selectAllContainer = document.createElement("div");
    selectAllContainer.className = "flex items-center mb-3 px-2 pl-3 h-8";

    const selectDiv = document.createElement("div");
    selectDiv.className = "flex items-center space-x-2";

    const selectAllCheckbox = document.createElement("input");
    selectAllCheckbox.type = "checkbox";
    selectAllCheckbox.id = "selectAllPatients";
    selectAllCheckbox.className = "mr-2 cursor-pointer";

    const selectAllLabel = document.createElement("label");
    selectAllLabel.htmlFor = "selectAllPatients";
    selectAllLabel.className = "text-xs cursor-pointer";
    selectAllLabel.textContent = "Select All";

    selectAllContainer.appendChild(selectDiv);
    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);

    // === right side wrapper (delete button only) ===
    const rightActions = document.createElement("div");
    rightActions.className = "flex items-center ml-auto space-x-3";

    const deleteSelectedBtn = document.createElement("button");
    deleteSelectedBtn.className = "disabled:opacity-50 disabled:pointer-events-none cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-1.5 px-5";
    deleteSelectedBtn.textContent = "Delete";
    deleteSelectedBtn.classList.add("deleteHidden");
    deleteSelectedBtn.disabled = true;

    rightActions.appendChild(deleteSelectedBtn);
    selectAllContainer.appendChild(rightActions);

    // === Sort dropdown functionality ===
    const sortIcon = document.getElementById("sortIcon");
    const customMenu = document.createElement("div");
    customMenu.classList.add("dropdown-menu", "dropdown-menu-sm", "dropdown-menu-right", "bg-white", "dropdownHover");
    customMenu.style.position = "absolute";
    customMenu.style.top = "100%";
    customMenu.style.right = "0";
    customMenu.style.transform = "translateY(5px)";
    customMenu.style.display = "none";
    customMenu.style.border = "1px solid #ccc";
    customMenu.style.borderRadius = "4px";
    customMenu.style.width = "150px";
    customMenu.style.zIndex = "20";

    // Append to the sort icon parent
    sortIcon.parentNode.appendChild(customMenu);

    const sortLabel = document.createElement("div");
    sortLabel.textContent = "Sort By";
    sortLabel.className = "font-weight-bold text-muted mb-1 ml-3 text-primary";
    sortLabel.style.marginLeft = "11px";
    customMenu.appendChild(sortLabel);

    let selectedSort = selectedSortValue;
    const options = [
      { label: "Newest First", value: "usage_desc", icon: "ki-solid ki-arrow-down fs-2" },   
      { label: "Oldest First", value: "usage_asc", icon: "ki-solid ki-arrow-up fs-2" },  
      { label: "A - Z", value: "name_asc", icon: "ki-solid ki-textalign-left fs-2" },  
      { label: "Z - A", value: "name_desc", icon: "ki-solid ki-textalign-right fs-2" },   
    ];

    options.forEach(opt => {
      const item = document.createElement("div");
      item.className = "dropdown-item flex align-items-center";
      item.style.cursor = "pointer";

      const leftWrapper = document.createElement("div");
      leftWrapper.className = "flex align-items-center ms-2 py-2";

      // Icon on left
      const icon = document.createElement("i");
      icon.className = opt.icon;
      icon.style.marginRight = "8px";
      icon.style.color = "#096fab";
      leftWrapper.appendChild(icon);

      // Label
      const label = document.createElement("span");
      label.textContent = opt.label;
      label.className = "text-2sm";
      leftWrapper.appendChild(label);

      item.appendChild(leftWrapper);

      // === Tick on right ===
      const tick = document.createElement("span");
      tick.textContent = "✔";
      tick.style.display = "none";
      tick.style.color = "#0b6fac";
      tick.className = "ml-5 mt-1";
      item.appendChild(tick);

      // === Set initial tick if API says so ===
      if (selectedSort === opt.value) {
        tick.style.display = "inline";
      }

      item.addEventListener("click", () => {
        selectedSort = opt.value;

        // reset all ticks
        customMenu.querySelectorAll(".dropdown-item span:last-child")
                  .forEach(s => s.style.display = "none");

        // show tick for this one
        tick.style.display = "inline";

        customMenu.style.display = "none";
        handleSort(opt.value);
      });

      customMenu.appendChild(item);
    });

    patientList.appendChild(selectAllContainer);

    /// === Toggle dropdown ===
    sortIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      customMenu.style.display = customMenu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
      if (!sortIcon.contains(e.target) && !customMenu.contains(e.target)) {
        customMenu.style.display = "none";
      }
    });

    selectAllCheckbox.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".patient-checkbox");
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
      const anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
      deleteSelectedBtn.classList.toggle("deleteHidden", !anyChecked);
      deleteSelectedBtn.disabled = !anyChecked;
    });

    deleteSelectedBtn.addEventListener("click", function () {
      const selectedPatients = Array.from(document.querySelectorAll(".patient-checkbox:checked"))
        .map(checkbox => checkbox.dataset.patientName);

      if (selectedPatients.length === 0) return;

      const token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = '../index.html';
        return;
      }

      Swal.fire({
        title: 'Delete',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false,
        reverseButtons: true,
        customClass: {
          confirmButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9',
          cancelButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9 mr-2',
          title: 'custom-swal-title'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Archiving...',
            text: 'Please wait while archive the patients.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          try {
            const response = await fetch(`${BASE_URL}delete-patient`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ patient_names: selectedPatients })
            });

            const data = await response.json();
            Swal.close();

            if (data.results && data.results.every(r => r.status === "archived")) {
              toastr.success(`${selectedPatients.length} Patient(s) Archived Successfully`);
              refreshPatientList();
              fetchPatientCounts();
            } else {
              const failed = data.results.filter(r => r.status !== "archived");
              toastr.error(`${failed.length} Patient(s) Failed to Archive`);
            }
          } catch (error) {
            Swal.close();
            console.error('API Error:', error);
            toastr.error('Failed to Archive Patients');
          }
        }
      });
    });

    patientList.addEventListener("change", function (e) {
      if (e.target.classList.contains("patient-checkbox")) {
        const anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
        deleteSelectedBtn.classList.toggle("deleteHidden", !anyChecked);
        deleteSelectedBtn.disabled = !anyChecked;

        const allChecked = document.querySelectorAll(".patient-checkbox:checked").length ===
          document.querySelectorAll(".patient-checkbox").length;
        selectAllCheckbox.checked = allChecked;
      }
    });

    // === Sorting function ===
    async function handleSort(value) {
      let apiUrl = "";
      let requestBody = {};

      switch (value) {
        case "usage_asc":
          apiUrl = `${BASE_URL}patient-name-list`;
          requestBody = { sort_by: "usage", sort_order: "asc" };
          break;
        case "usage_desc":
          apiUrl = `${BASE_URL}patient-name-list`;
          requestBody = { sort_by: "usage", sort_order: "desc" };
          break;
        case "name_asc":
          apiUrl = `${BASE_URL}patient-name-list`;
          requestBody = { sort_by: "name", sort_order: "asc" };
          break;
        case "name_desc":
          apiUrl = `${BASE_URL}patient-name-list`;
          requestBody = { sort_by: "name", sort_order: "desc" };
          break;
        default:
          apiUrl = `${BASE_URL}patient-name-list`;
          requestBody = {};
      }

      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        const sortedData = await response.json();
        const patientsKey = "patients";

        if (sortedData[patientsKey] && sortedData[patientsKey].length > 0) {
          const patientData = sortedData[patientsKey].map((patient) => ({
            name: patient.patient_name,
            diagnosis: patient.diagnosis,
            patient_id: patient.patient_id,
            rec_status: patient.rec_status,
          }));
          let selectedSortValue = null;
          if (sortedData.sort_by && sortedData.sort_order) {
            selectedSortValue = `${sortedData.sort_by}_${sortedData.sort_order}`; 
          }

          updatePatientList(patientData, isPending, selectedSortValue);
        }
      } catch (err) {
        console.error("Sorting failed:", err);
        toastr.error("Failed to sort patients");
      }
    }
  }
  let patientProgressMap = {};
  let patientProgressCheck = true;
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${BASE_URL}patient-progress-bar-redis`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      data.forEach(entry => {
        if (entry.patient_id) {
          patientProgressMap[entry.patient_id] = entry;
        }
      });
    } else {
      patientProgressCheck = false;
    }
  } catch (err) {
    console.error("Progress check failed:", err);
    patientProgressCheck = false;
  }

  patientData.forEach((item) => {
    const name = typeof item === 'string' ? item : item.name;
    const diagnosis = typeof item === 'object' ? item.diagnosis : null;
    const patientId = typeof item === 'object' ? item.patient_id : null;

    const listItem = document.createElement("li");
    listItem.className = "patient-item navi-item flex items-center justify-between bg-gray-50 rounded-2xl p-2";
    listItem.style.backgroundColor = "#F3F6F9";
    listItem.style.borderRadius = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "patient-checkbox mr-3 cursor-pointer";
    checkbox.dataset.patientName = name;
    listItem.appendChild(checkbox);

    const nameLink = document.createElement("a");
    nameLink.className = "navi-link flex-grow w-100";
    nameLink.href = "#";
    nameLink.style.padding = "5px";

    const contentContainer = document.createElement("div");
    contentContainer.className = "navi-spinner";
    contentContainer.style.display = "block";

    const nameSpan = document.createElement("span");
    nameSpan.className = "navi-text font-semibold text-xs text-primary block";
    nameSpan.style.color = "#0b6fac";
    if (isPending) {
      nameSpan.style.padding = "8px 0";
    }
    nameSpan.style.display = "inline-block";
    nameSpan.textContent = name;
    contentContainer.appendChild(nameSpan);

    if (!isPending && diagnosis) {
      const diagnosisSpan = document.createElement("span");
      diagnosisSpan.className = "navi-text diagnosis-text text-gray-500 text-[11px] block truncate";
      diagnosisSpan.style.display = "block";
      diagnosisSpan.style.color = "#6c757d";

      const truncatedDiagnosis = diagnosis.length > 35
        ? `${diagnosis.substring(0, 35)}...`
        : diagnosis;

      diagnosisSpan.textContent = truncatedDiagnosis;

      if (diagnosis.length > 35) {
        diagnosisSpan.setAttribute("title", diagnosis);
      }

      contentContainer.appendChild(diagnosisSpan);
    }

    // Progress bar :: START
    const progressWrapper = document.createElement("div");
    progressWrapper.className = "flex items-center gap-2 mt-1";
    progressWrapper.style.display = "flex";
    progressWrapper.style.alignItems = "center";
    progressWrapper.style.gap = "5px";

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress flex-grow h-1 bg-blue-500 rounded-full";
    progressContainer.style.height = "5px";
    progressContainer.style.flexGrow = "1";
    progressContainer.style.display = "none";

    const progressLabel = document.createElement("span");
    progressLabel.id = `patient-progress-label-${patientId}`;
    progressLabel.style.right = "0";
    progressLabel.style.fontSize = "12px";
    progressLabel.style.color = "#0b6fac";
    progressLabel.textContent = "0%";
    progressLabel.style.display = "none";

    const progressBar = document.createElement("div");
    progressBar.id = `patient-progress-bar-${patientId}`;
    progressBar.className = "progress-bar progress-bar-animated";
    progressBar.style.width = "0%";
    progressBar.style.display = "none";

    progressContainer.appendChild(progressBar);
    progressWrapper.appendChild(progressContainer);
    progressWrapper.appendChild(progressLabel);
    contentContainer.appendChild(progressWrapper);

    if (patientProgressCheck === true) {
      (async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch(`${BASE_URL}patient-progress-bar-redis`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const data = await res.json();

          if (patientProgressMap[patientId]) {
            const progressInfo = patientProgressMap[patientId];

            if (progressInfo && progressInfo.overall_status !== "completed") {
              let progressPercentage = 0;
              if (progressInfo.overall_status === "in_progress") {
                progressPercentage = 10;
              } else if (progressInfo.overall_status === "transcription_completed") {
                progressPercentage = 25;
              }
              progressContainer.style.display = "flex";
              progressBar.style.display = "flex";
              progressLabel.style.display = "inline";
              progressBar.style.width = `${progressPercentage}%`;
              progressLabel.textContent = `${progressPercentage}%`;

              if (!progressIntervals[patientId]) {
                progressIntervals[patientId] = setInterval(() => updateProgressBarOnce(patientId), 3000);
              }

              updateProgressBarOnce(patientId);
            } else {
              // Progress completed, clean up
              progressContainer.style.display = "none";
              progressBar.style.display = "none";
              progressLabel.style.display = "none";
            }
          }
        } catch (err) {
          console.error("Progress check failed:", err);
        }
      })();
    }
    // Progress bar :: END

    nameLink.appendChild(contentContainer);
    nameLink.onclick = function () {
      if (isPending) {
        fetchPendingPatientSegments(name, this);
      } else {
        fetchActivePatientSegments(name, patientId, this);
      }
    };

    listItem.appendChild(nameLink);

    const pauseIcon = document.createElement("i");
    pauseIcon.style.color = "rgb(243, 156, 18)";
    pauseIcon.style.fontSize = "13px";
    pauseIcon.style.marginRight = "12px";
    pauseIcon.href = "#";
    listItem.appendChild(pauseIcon);

    if (item.rec_status == 'paused') {
      pauseIcon.className = `fa fa-pause pause-icon visible ${patientId}`;
    } else {
      pauseIcon.className = `fa fa-pause pause-icon hidden ${patientId}`;
    }

    patientList.appendChild(listItem);
  });
}

function showNoPatientsMessage() {
  const patientList = document.querySelector(".navi");
  patientList.innerHTML = ""; // Clear existing content
  const listItem = document.createElement("div");
  listItem.classList.add("show-section");
  // listItem.innerHTML = `<h4 class="navi-text">No Patients Available</h4>`;
  patientList.appendChild(listItem);

  const replaceTitle = document.querySelector(".replace-title");
  if (replaceTitle) {
    replaceTitle.textContent = "Patient Insights";
  }
}

// Function to fetch patient segments
let patientSegmentsData = []; // Store all patient segments
let currentPage = 1;
let recordsPerPage = 5;

function fetchPendingPatientSegments(patientName, element) {
  document.getElementById('getPatientNameFromList').value = patientName;
  selectedPatientName = patientName;
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  fetch(`${BASE_URL}summary/pending-summary`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ patientname: patientName })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const insightsHeading = document.querySelector(".card-label");
      insightsHeading.textContent = `Patient Insights - ${patientName}`;

      // Handle case where data is an array (success)
      if (Array.isArray(data) && data.length > 0) {
        patientSegmentsData = data; // Store the full array of segments
        currentPage = 1;
        displayPatientSegments(); // Update display
      }
      // Handle empty array (no data)
      else if (Array.isArray(data) && data.length === 0) {
        document.querySelector(".patient-insight-list").innerHTML =
          `<h4 class="mb-4">No insights available for ${patientName}</h4>`;
      }
      // Handle error responses (e.g., {error: "..."})
      else if (data.error) {
        throw new Error(data.error);
      }
      // Handle unexpected format
      else {
        throw new Error("Unexpected API response format");
      }

      // Highlight the selected patient
      document.querySelectorAll(".navi-link").forEach(link => link.classList.remove("active"));
      if (element) element.classList.add("active");
    })
    .catch(error => {
      console.error("Error fetching patient insights:", error);
      document.querySelector(".patient-insight-list").innerHTML =
        `<div class="alert alert-danger">Error loading insights: ${error.message}</div>`;
    });

}

// Function to display paginated records
function displayPatientSegments() {
  const insightsCard = document.querySelector(".patient-insight-list");
  let content = ``;

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedData = patientSegmentsData.slice(startIndex, endIndex);

  // Clear existing hidden inputs
  document.querySelectorAll('input[name="auto_id_0"]').forEach(input => input.remove());

  let groupedData = {};

  // Group responses by date and create hidden inputs
  paginatedData.forEach((segment, index) => {
    const rawDate = segment.created_at; // No formatting

    if (!groupedData[rawDate]) {
      groupedData[rawDate] = [];
    }
    groupedData[rawDate].push({
      text: segment.pending_summary,
      id: segment.auto_id_0
    });

    // Create hidden input for each segment's auto_id_0
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'auto_id_0';
    hiddenInput.value = segment.auto_id_0;
    hiddenInput.id = `auto_id_0_${startIndex + index}`;
    document.body.appendChild(hiddenInput);
  });


  // Generate content with common date grouping and buttons
  for (const [date, segments] of Object.entries(groupedData)) {
    content += `<div class="mb-3"><h4 class="" style="color: #3699FF;">${date}</h4>`;
    segments.forEach(item => {
      content += `
              <p style="font-size: 14px">${item.text}</p>
              <div class="d-flex mb-3">
                  <button class="btn btn-primary btn-sm mr-2" onclick="handleSummaryAction(${item.id}, 'accepted')">
                      <i class="fas fa-check"></i> Accept
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="handleSummaryAction(${item.id}, 'rejected')">
                      <i class="fas fa-times"></i> Reject
                  </button>
              </div>
              <hr>
          `;
    });
    content += `</div>`;
  }

  insightsCard.innerHTML = content;
  insightsCard.innerHTML += generatePaginationControls();
}

async function handleSummaryAction(autoId, acceptStatus) {
  const patientName = document.getElementById('getPatientNameFromList').value;
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '../index.html';
      return;
    }
    const response = await fetch(`${BASE_URL}summary/accept_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`// Include token if required
      },
      body: JSON.stringify({
        auto_id_0: autoId,
        accept_status: acceptStatus,
        patientname: patientName
      })
    });

    const data = await response.json();

    if (response.ok) {
      toastr.success('Status Updated Successfully!')
      // Reload the page after 1 second
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      console.error("Error:", data.error);
      toastr.error(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Request failed:", error);
    toastr.error("An error occurred while updating the summary.");
  }
}

// Function to generate pagination controls
function generatePaginationControls() {
  let totalPages = Math.ceil(patientSegmentsData.length / recordsPerPage);
  let paginationHTML = `<div class="d-flex justify-content-between align-items-center flex-wrap">
        <div class="d-flex flex-wrap py-2 mr-3">`;

  // First & Previous buttons
  paginationHTML += `
        <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" onclick="changePage(1)"><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>
        <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" onclick="changePage(${Math.max(1, currentPage - 1)})"><i class="ki ki-bold-arrow-back icon-xs"></i></a>`;

  // Page numbers
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    paginationHTML += `<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary ${i === currentPage ? 'active' : ''} mr-2 my-1" onclick="changePage(${i})">${i}</a>`;
  }

  if (endPage < totalPages) {
    paginationHTML += `<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>`;
  }

  // Next & Last buttons
  paginationHTML += `
        <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" onclick="changePage(${Math.min(totalPages, currentPage + 1)})"><i class="ki ki-bold-arrow-next icon-xs"></i></a>
        <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" onclick="changePage(${totalPages})"><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>
    </div>
    
    <div class="flex align-items-center py-3">
        <select class="form-control form-control-sm text-primary font-weight-bold mr-4 border-0 bg-light-primary" style="width: 75px;" onchange="changeRecordsPerPage(this.value)">
            <option value="5" ${recordsPerPage === 5 ? "selected" : ""}>5</option>
            <option value="10" ${recordsPerPage === 10 ? "selected" : ""}>10</option>
            <option value="20" ${recordsPerPage === 20 ? "selected" : ""}>20</option>
            <option value="50" ${recordsPerPage === 50 ? "selected" : ""}>50</option>
            <option value="100" ${recordsPerPage === 100 ? "selected" : ""}>100</option>
        </select>
    </div>
    </div>`;

  return paginationHTML;
}

// Function to change pages
function changePage(pageNumber) {
  let totalPages = Math.ceil(patientSegmentsData.length / recordsPerPage);
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    displayPatientSegments();
  }
}

// Function to change records per page
function changeRecordsPerPage(value) {
  recordsPerPage = parseInt(value);
  currentPage = 1; // Reset to first page
  displayPatientSegments();
}

const recordingStates = {};

// Process upload queue to ensure sequential uploads
const processUploadQueue = async (state) => {
  // If already uploading, wait until finished
  if (state.isUploading) {
    return new Promise(resolve => {
      const check = setInterval(() => {
        if (!state.isUploading) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    });
  }

  if (state.uploadQueue.length === 0) return;

  state.isUploading = true;

  // Sort queue by sequence number
  state.uploadQueue.sort((a, b) => a.sequence - b.sequence);

  while (state.uploadQueue.length > 0) {
    const chunk = state.uploadQueue.shift();

    const formData = new FormData();
    formData.append('audio_data', chunk.blob, `chunk_${chunk.sequence}.pcm`);
    formData.append('session_id', chunk.sessionId);

    try {
      const token = localStorage.getItem('access_token');
      await fetch(`${BASE_URL_KINESIS}upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      console.log(`✅ Uploaded chunk ${chunk.sequence} successfully`);
    } catch (err) {
      console.error(`❌ Error uploading chunk ${chunk.sequence}:`, err);
      state.uploadQueue.unshift(chunk);
      break;
    }
  }

  state.isUploading = false;
};

function floatTo16BitPCM(float32Array) {
      const buffer = new ArrayBuffer(float32Array.length * 2);
      const view = new DataView(buffer);
      let offset = 0;
      for (let i = 0; i < float32Array.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, float32Array[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
      return buffer;
    }

const stopCurrentRecording = async (patientId) => {
  const state = recordingStates[patientId];
  console.log('Current recording state for', patientId, state);
  console.log('pcmchunk recording state for', patientId, state.pcmChunks);
  if (!state) return;

  console.log('🛑 Stopping PCM16 recording for:', patientId);

  try {
    // Stop periodic PCM uploads (20s chunks)
    state.isStopping = true; 
    if (state.chunkTimer) clearInterval(state.chunkTimer);

    // Stop timer
    if (state.timerInterval) clearInterval(state.timerInterval);

    // ✅ Upload the final PCM chunk (if any)
    if (state.pcmChunks && state.pcmChunks.length > 0) {
      console.log('📤 Uploading final PCM16 chunk...');
      const flat = mergeBuffersFinal(state.pcmChunks);
      const pcm16 = floatTo16BitPCM(flat);
      const blob = new Blob([pcm16], { type: 'application/octet-stream' });

      const formData = new FormData();
      formData.append('audio_data', blob, 'final_recording.pcm');
      formData.append('session_id', state.sessionId);

      try {
        const token = localStorage.getItem('access_token');
        await fetch(`${BASE_URL_KINESIS}upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        console.log('✅ Final PCM chunk uploaded successfully');
      } catch (err) {
        console.error('❌ Error uploading final PCM chunk:', err);
      }

      // Clear PCM chunks from memory
      state.pcmChunks = [];
    }

    // ✅ Stop the audio stream and close context
    if (state.processor) {
      try { state.processor.disconnect(); } catch (err) { console.warn(err); }
    }
    if (state.source) {
      try { state.source.disconnect(); } catch (err) { console.warn(err); }
    }

    // ✅ Stop the audio stream and processor
    if (state.stream) {
      state.stream.getTracks().forEach(track => track.stop());
    }

    // If we used an AudioContext, close it
    if (state.audioContext && state.audioContext.state !== 'closed') {
      await state.audioContext.close();
    }

    // ✅ Send stop command to backend
    const token = localStorage.getItem('access_token');
    if (token && state.sessionId) {
      try {
        console.log('📡 Sending stop command...');
        const response = await fetch(`${BASE_URL_KINESIS}send-command`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            command: 'stop',
            session_id: state.sessionId
          })
        });

        if (response.ok) {
          const sendResponse = await response.json();
          const stateSession = sendResponse.job_id;

          const jobResponse = await fetch(`${BASE_URL_KINESIS}job-status/${stateSession}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          const data = await jobResponse.json();
          if (jobResponse.ok && data.status !== 'completed') {
            setTimeout(() => {
              fetch(`${BASE_URL_KINESIS}job-status/${stateSession}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
            }, 30000);
          }
        } else {
          console.error('❌ Stop command failed:', await response.text());
        }
      } catch (err) {
        console.error('❌ Failed to call send-command:', err);
      }
    }

    // ✅ UI updates
    const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
    if (pauseIcon) togglePauseIcon(patientId, false);

    const renderPatientRecording = document.querySelector('.render-patient-recording');
    const renderWaveTimer = document.querySelector('.wave-timer');
    if (renderPatientRecording) {
      renderPatientRecording.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
      renderPatientRecording.querySelector('.pause-icon-wrapper').style.display = 'none';
      renderPatientRecording.querySelector('.play-icon-wrapper').style.display = 'none';
      renderPatientRecording.querySelector('.stop-icon-wrapper').style.display = 'none';
      if (renderWaveTimer) {
        renderWaveTimer.querySelector('.recording-timer').style.display = 'none';
      }
    }

    // ✅ Reset all state
    state.stream = null;
    state.audioContext = null;
    state.source = null;
    state.processor = null;
    state.isRecording = false;
    state.isPaused = false;
    state.seconds = 0;
    state.totalDuration = 0;
    state.pausedDuration = 0;
    state.lastResumeTime = null;
    state.lastPauseTime = null;
    if (state.chunkSequence !== undefined) state.chunkSequence = 0;
    if (state.uploadQueue) state.uploadQueue = [];
    if (state.isUploading !== undefined) state.isUploading = false;
    console.log('✅ Recording stopped and cleaned up.');
    return true;

  } catch (error) {
    console.error("❌ Error stopping PCM16 recording:", error);
    return false;
  }
};

function mergeBuffersFinal(chunks) {
  const length = chunks.reduce((acc, val) => acc + val.length, 0);
  const result = new Float32Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

const callPauseBackendAPI = async (endpoint, method = 'POST', body = null) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL_KINESIS}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    });
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${error}`);
    toastr.error(`Failed to ${method} ${endpoint}`);
    return null;
  }
};

const pauseCurrentRecording = async (patientId, currentPatientName) => {
  const state = recordingStates[patientId];
  if (!state || !state.stream) return;

  try {
    // Stop chunk timer
    if (state.chunkTimer) {
      clearInterval(state.chunkTimer);
      state.chunkTimer = null;
    }

    // Upload remaining chunks
    if (state.pcmChunks && state.pcmChunks.length > 0) {
      const flat = mergeBuffersFinal(state.pcmChunks);
      const pcm16 = floatTo16BitPCM(flat);
      const blob = new Blob([pcm16], { type: 'application/octet-stream' });
      
      state.uploadQueue.push({
        blob: blob,
        sessionId: state.sessionId,
        sequence: state.chunkSequence++,
        timestamp: Date.now()
      });
      
      state.pcmChunks = [];
      await processUploadQueue(state);
    }

    // Pause AudioContext if recording
    if (state.audioContext && state.audioContext.state === 'running') {
      await state.audioContext.suspend();
    }

    // Clear UI timer
    clearInterval(state.timerInterval);

    // Send pause command to backend
    state.lastPauseTime = new Date();
    await callPauseBackendAPI('send-command', 'POST', {
      command: 'pause',
      session_id: state.sessionId,
      pause_time: state.lastPauseTime.toISOString()
    });

    // Update state
    state.isPaused = true;
    
    // Update pause icon in patient list
    const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
    if (pauseIcon) togglePauseIcon(patientId, true);

  } catch (error) {
    console.error("Pause error:", error);
  }

  // const renderPatientRecording = document.querySelector('.render-patient-recording');
  // if (!renderPatientRecording) return;

  // renderPatientRecording.innerHTML = '';

  // const nameSpan = document.createElement('span');
  // nameSpan.classList.add('navi-text');
  // nameSpan.textContent = currentPatientName; // Fixed: changed from patientName to currentPatientName
  // renderPatientRecording.appendChild(nameSpan);

  // const timerSpan = document.createElement('span');
  // timerSpan.classList.add('recording-timer', 'ml-2', 'mr-2');
  // timerSpan.style.width = '40px';
  // timerSpan.style.fontWeight = 'bold';
  // timerSpan.style.fontSize = '13px';
  // timerSpan.textContent = '00:00';
  // timerSpan.style.display = 'none';
  // timerSpan.style.alignItems = 'center';
  // timerSpan.style.color = '#0a6dab';

  // const updateTimer = () => {
  //   state.seconds++;
  //   const mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
  //   const secs = String(state.seconds % 60).padStart(2, '0');
  //   timerSpan.textContent = `${mins}:${secs}`;
  // };

  // // Create Metronic 9 SVG Icons
  // const createMetronicIcon = (iconName, color) => {
  //   const iconSvg = document.createElement('span');
  //   iconSvg.classList.add('svg-icon', 'svg-icon-3');
  //   iconSvg.style.cssText = `display: flex; align-items: center; justify-content: center;`;
    
  //   let svgContent = '';
    
  //   switch(iconName) {
  //     case 'microphone':
  //       svgContent = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
  //           <path d="M11.5 19C15.9183 19 19.5 15.4183 19.5 11V7C19.5 6.44772 19.0523 6 18.5 6C17.9477 6 17.5 6.44772 17.5 7V11C17.5 14.3137 14.8137 17 11.5 17C8.18629 17 5.5 14.3137 5.5 11V7C5.5 6.44772 5.05228 6 4.5 6C3.94772 6 3.5 6.44772 3.5 7V11C3.5 15.4183 7.08172 19 11.5 19Z" fill="${color}"/>
  //           <path opacity="0.3" d="M6.5 11C6.5 13.2091 8.29086 15 10.5 15H12.5C14.7091 15 16.5 13.2091 16.5 11V6C16.5 3.79086 14.7091 2 12.5 2H10.5C8.29086 2 6.5 3.79086 6.5 6V11Z" fill="${color}"/>
  //         </svg>
  //       `;
  //       break;
        
  //     case 'microphone-active':
  //       svgContent = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
  //           <path d="M11.5 19C15.9183 19 19.5 15.4183 19.5 11V7C19.5 6.44772 19.0523 6 18.5 6C17.9477 6 17.5 6.44772 17.5 7V11C17.5 14.3137 14.8137 17 11.5 17C8.18629 17 5.5 14.3137 5.5 11V7C5.5 6.44772 5.05228 6 4.5 6C3.94772 6 3.5 6.44772 3.5 7V11C3.5 15.4183 7.08172 19 11.5 19Z" fill="${color}"/>
  //           <path d="M6.5 11C6.5 13.2091 8.29086 15 10.5 15H12.5C14.7091 15 16.5 13.2091 16.5 11V6C16.5 3.79086 14.7091 2 12.5 2H10.5C8.29086 2 6.5 3.79086 6.5 6V11Z" fill="${color}"/>
  //           <rect opacity="0.3" x="10" y="20" width="4" height="2" rx="1" fill="${color}"/>
  //         </svg>
  //       `;
  //       break;
        
  //     case 'pause':
  //       svgContent = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
  //           <rect x="8" y="5" width="4" height="13" rx="1" fill="${color}"/>
  //           <rect x="13" y="5" width="4" height="13" rx="1" fill="${color}"/>
  //         </svg>
  //       `;
  //       break;
        
  //     case 'play':
  //     case 'dot-circle':
  //       svgContent = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
  //           <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8707 8.6812 19.788 7.37983 19.4194C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58061C8.6812 4.212 10.296 5.1293 13.5257 6.96386C16.8667 8.86196 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="${color}"/>
  //         </svg>
  //       `;
  //       break;
        
  //     case 'stop':
  //       svgContent = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
  //           <rect x="6" y="6" width="12" height="12" rx="1" fill="${color}"/>
  //         </svg>
  //       `;
  //       break;
  //   }
    
  //   iconSvg.innerHTML = svgContent;
  //   return iconSvg;
  // };

  // const createIconWrapper = (iconName, id, color, isMicrophone = false) => {
  //   const wrapper = document.createElement('span');
  //   wrapper.classList.add(`${id}-wrapper`);

  //   const size = isMicrophone ? '25px' : '30px';
  //   const margin = isMicrophone ? '8px' : '8px';
    
  //   wrapper.style.cssText = `
  //     display: inline-flex;
  //     align-items: center;
  //     justify-content: center;
  //     width: ${size};
  //     height: ${size};
  //     border-radius: 50%;
  //     background-color: #fff;
  //     margin-left: ${margin};
  //     cursor: pointer;
  //     border: 1px solid #e4e6ef;
  //     transition: all 0.3s ease;
  //   `;

  //   // Add hover effect
  //   wrapper.addEventListener('mouseenter', () => {
  //     wrapper.style.backgroundColor = '#f8f9fa';
  //     wrapper.style.borderColor = color;
  //   });
    
  //   wrapper.addEventListener('mouseleave', () => {
  //     wrapper.style.backgroundColor = '#fff';
  //     wrapper.style.borderColor = '#e4e6ef';
  //   });

  //   const icon = createMetronicIcon(iconName, color);
  //   wrapper.appendChild(icon);
  //   return wrapper;
  // };

  // // Create icons with Metronic 9 SVG
  // const micWrapper = createIconWrapper('microphone', 'rec-icon', '#0b6fac', true);
  // const pauseWrapper = createIconWrapper('pause', 'pause-icon', '#f39c12');
  // const playWrapper = createIconWrapper('play', 'play-icon', '#2ecc71');
  // const stopWrapper = createIconWrapper('stop', 'stop-icon', '#e74c3c');

  // pauseWrapper.style.display = 'none';
  // playWrapper.style.display = 'none';
  // stopWrapper.style.display = 'none';

  // const renderWaveTimer = document.querySelector('.wave-timer');

  // renderPatientRecording.appendChild(micWrapper);
  // renderPatientRecording.appendChild(pauseWrapper);
  // renderPatientRecording.appendChild(playWrapper);
  // renderPatientRecording.appendChild(stopWrapper);
  // renderWaveTimer.appendChild(timerSpan);
  

  // // Function to update microphone icon state
  // const updateMicrophoneIcon = (isActive) => {
  //   const iconElement = micWrapper.querySelector('.svg-icon');
  //   if (iconElement) {
  //     iconElement.innerHTML = isActive ? 
  //       createMetronicIcon('microphone-active', '#0b6fac').innerHTML :
  //       createMetronicIcon('microphone', '#0b6fac').innerHTML;
  //   }
  // };

  // if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
  //   try {
  //     state.mediaRecorder.requestData();
  //     state.mediaRecorder.pause();
  //     state.lastPauseTime = new Date();
  //     clearInterval(state.timerInterval);

  //     const pauseResponse = await callPauseBackendAPI('send-command', 'POST', {
  //       command: 'pause',
  //       session_id: state.sessionId,
  //       pause_time: state.lastPauseTime.toISOString()
  //     });
  //     const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
  //     if (pauseIcon) {
  //       togglePauseIcon(patientId, true);
  //     } else {
  //       togglePauseIcon(patientId, false);
  //     }

  //     if (pauseResponse && pauseResponse.status === 'pause acknowledged') {
  //       pauseWrapper.style.display = 'none';
  //       playWrapper.style.display = 'inline-flex';
  //       state.isPaused = true;
  //       // Update microphone icon to active state
  //       updateMicrophoneIcon(true);
  //     } else {
  //       throw new Error('Pause not acknowledged by server');
  //     }
  //   } catch (error) {
  //     console.error("Pause error:", error);
  //     toastr.error("Failed to pause recording");

  //     // Revert if pause failed
  //     if (state.mediaRecorder.state === 'paused') {
  //       state.mediaRecorder.resume();
  //       state.timerInterval = setInterval(updateTimer, 1000);
  //       updateMicrophoneIcon(false);
  //     }
  //   }
  // }
  // return false;
};

function getRecordingState(patientId) {
  if (!recordingStates[patientId]) {
    recordingStates[patientId] = {
      timerInterval: null,
      seconds: 0,
      mediaRecorder: null,
      audioChunks: [],
      sessionId: null,
      stream: null,
      isPaused: false,
      isRecording: false,
      isProcessing: false,
      isProcessingResume: false,
      lastResumeTime: null,
      totalDuration: 0,
      pausedDuration: 0,
      currentPatientId: patientId,
      lastPauseTime: null,
      patientName: patientName
    };
  }
  return recordingStates[patientId];
}

function resetUI(state) {
  if (!state) return;

  // Clear intervals
  clearInterval(state.timerInterval);

  // Reset state
  state.seconds = 0;
  state.totalDuration = 0;
  state.pausedDuration = 0;
  state.isPaused = false;
  state.lastResumeTime = null;
  state.lastPauseTime = null;
  state.isRecording = false;
  state.isProcessing = false;
  state.isProcessingResume = false;

  // Clean up media resources
  if (state.stream) {
    state.stream.getTracks().forEach(track => track.stop());
    state.stream = null;
  }

  state.mediaRecorder = null;
  state.audioChunks = [];
}

function addRecIcon(patientName, patientId) {
  const renderPatientRecording = document.querySelector('.render-patient-recording');
  const renderWaveTimer = document.querySelector('.wave-timer');
  if (!renderPatientRecording) return;

  renderPatientRecording.innerHTML = '';
  renderWaveTimer.innerHTML = '';

  // const nameSpan = document.createElement('span');
  // nameSpan.classList.add('navi-text');
  // nameSpan.textContent = patientName;
  // renderPatientRecording.appendChild(nameSpan);

  if (!document.querySelector('.rec-icon')) {
    const state = getRecordingState(patientId);
    

    // Timer elements
    const timerSpan = document.createElement('span');
    timerSpan.classList.add('recording-timer', 'ml-2', 'mr-2', 'h-9');
    timerSpan.style.width = '40px';
    timerSpan.style.fontWeight = 'bold';
    timerSpan.style.fontSize = '13px';
    timerSpan.textContent = '00:00';
    timerSpan.style.display = 'none';
    timerSpan.style.alignItems = 'center';
    timerSpan.style.color = '#0a6dab';

    const updateTimer = () => {
      state.seconds++;
      const mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
      const secs = String(state.seconds % 60).padStart(2, '0');
      timerSpan.textContent = `${mins}:${secs}`;
    };

    // Create Metronic 9 SVG Icons
    const createMetronicIcon = (iconName, color) => {
      const iconSvg = document.createElement('span');
      iconSvg.classList.add('svg-icon', 'svg-icon-3', 'flex','justify-center','navi-text');      
      let svgContent = '';
      
      switch(iconName) {
        case 'microphone':
          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 15.5C14.2091 15.5 16 13.7091 16 11.5V6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5V11.5C8 13.7091 9.79086 15.5 12 15.5Z" fill="currentColor"></path>
              <path opacity="0.3" d="M5 9.5C5.55228 9.5 6 9.94772 6 10.5V11.5C6 14.8137 8.68629 17.5 12 17.5C15.3137 17.5 18 14.8137 18 11.5V10.5C18 9.94772 18.4477 9.5 19 9.5C19.5523 9.5 20 9.94772 20 10.5V11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5V10.5C4 9.94772 4.44772 9.5 5 9.5Z" fill="currentColor"></path>
              <path d="M12 21.5C11.4477 21.5 11 21.0523 11 20.5V18.5C11 17.9477 11.4477 17.5 12 17.5C12.5523 17.5 13 17.9477 13 18.5V20.5C13 21.0523 12.5523 21.5 12 21.5Z" fill="currentColor"></path>
            </svg>
          `;
          break;
          
        case 'microphone-active':
          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 15.5C14.2091 15.5 16 13.7091 16 11.5V6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5V11.5C8 13.7091 9.79086 15.5 12 15.5Z" fill="currentColor"></path>
              <path opacity="0.3" d="M5 9.5C5.55228 9.5 6 9.94772 6 10.5V11.5C6 14.8137 8.68629 17.5 12 17.5C15.3137 17.5 18 14.8137 18 11.5V10.5C18 9.94772 18.4477 9.5 19 9.5C19.5523 9.5 20 9.94772 20 10.5V11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5V10.5C4 9.94772 4.44772 9.5 5 9.5Z" fill="currentColor"></path>
              <path d="M12 21.5C11.4477 21.5 11 21.0523 11 20.5V18.5C11 17.9477 11.4477 17.5 12 17.5C12.5523 17.5 13 17.9477 13 18.5V20.5C13 21.0523 12.5523 21.5 12 21.5Z" fill="currentColor"></path>
            </svg>
          `;
          break;
          
        case 'pause':
          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="8" y="5" width="4" height="15" rx="1" fill="${color}"/>
              <rect x="13" y="5" width="4" height="15" rx="1" fill="${color}"/>
            </svg>
          `;
          break;
          
        case 'play':
        case 'dot-circle':
          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8707 8.6812 19.788 7.37983 19.4194C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58061C8.6812 4.212 10.296 5.1293 13.5257 6.96386C16.8667 8.86196 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="${color}"/>
            </svg>
          `;
          break;
          
        case 'stop':
          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="6" width="12" height="12" rx="1" fill="${color}"/>
            </svg>
          `;
          break;
      }
      
      iconSvg.innerHTML = svgContent;
      return iconSvg;
    };

    // Create control icons
    const createIconWrapper = (iconName, id, color, labelText) => {
      const wrapper = document.createElement('span');
      if (iconName != 'microphone') {
        wrapper.classList.add(`${id}-wrapper`, 'rounded-2xl', 'recording-styles', 'cursor-pointer', 'mb-3', 'px-2', 'py-4', 'w-100');
        if (iconName != 'stop') {
          wrapper.style.cssText = `display:inline-flex; align-items:center;justify-content:center; margin-right: 0.5rem !important;`;
        } else {
          wrapper.style.cssText = `display:inline-flex; align-items:center;justify-content:center`;
        }
      } else {
        wrapper.classList.add(`${id}-wrapper`, 'rounded-2xl', 'recording-styles', 'cursor-pointer', 'mb-3', 'px-2', 'py-4', 'w-full'); 
        wrapper.style.cssText = `display:inline-flex; align-items:center;justify-content:center`;       
      }
      
      
      const circle = document.createElement('span');
      if (iconName === 'pause') {
        circle.style.cssText = `display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;`;
      } else if (iconName === 'stop') {
        circle.style.cssText = `display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;`;
      } else {
        circle.style.cssText = `display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;`;
      }

      const icon = createMetronicIcon(iconName, color);
      
      // Store icon type for later updates
      icon.dataset.iconType = iconName;
      icon.dataset.iconColor = color;

      const label = document.createElement('span');
      label.textContent = labelText;
      if (iconName === 'microphone') {
        label.style.cssText = `font-size: 12px; color: #0a6dab; font-weight: 500; pointer-events: none; text-align:center;`;
      } else {
        label.style.cssText = `font-size: 12px; color: #0a6dab; font-weight: 500; pointer-events: none;`;
      }
      
      

      circle.appendChild(icon);
      wrapper.appendChild(circle);
      wrapper.appendChild(label);
      
      // Add hover effect
      wrapper.addEventListener('mouseenter', () => {
        circle.style.backgroundColor = '#f8f9fa';
        circle.style.borderColor = color;
      });
      
      wrapper.addEventListener('mouseleave', () => {
        circle.style.backgroundColor = '#fff';
        circle.style.borderColor = '#e4e6ef';
      });
      
      return wrapper;
    };

    const createAudioWave = () => {
      const wave = document.createElement('span');
      wave.className = 'audio-wave';
      wave.style.cssText = `
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          height: 25px;
          width: auto;
          margin: 0 2%;
          gap: 2px;
      `;

      for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.cssText = `
          width: 2px;
          background-color: #0b6fac;
          border-radius: 1px;
          transition: height 0.3s ease;
          animation: wave-animation 1.2s ease-in-out infinite;
          animation-delay: ${i * 0.1}s;
        `;
        wave.appendChild(bar);
      }
      
      // Add CSS animation if not already added
      if (!document.getElementById('wave-animation-style')) {
        const style = document.createElement('style');
        style.id = 'wave-animation-style';
        style.textContent = `
          @keyframes wave-animation {
            0%, 100% { height: 3px; }
            50% { height: 15px; }
          }
          
          .audio-wave.recording .bar {
            animation-play-state: running;
          }
          
          .audio-wave.paused .bar {
            animation-play-state: paused;
            height: 5px !important;
            background-color: #f39c12;
          }
          
          .audio-wave.stop .bar {
            animation-play-state: paused;
            height: 0;
          }
        `;
        document.head.appendChild(style);
      }
      
      return wave;
    };

    const wave = createAudioWave();
    wave.style.display = 'none'; // hide initially

    const setWaveState = (waveState) => {
      if (!wave) return;

      // Reset all states
      wave.classList.remove('recording', 'paused', 'resume', 'stop');

      if (waveState === 'recording') {
        wave.classList.add('recording');
        wave.style.display = 'inline-flex';
      } else if (waveState === 'paused') {
        wave.classList.add('paused');
        wave.style.display = 'inline-flex';
      } else if (waveState === 'resume') {
        wave.classList.add('recording');
        wave.style.display = 'inline-flex';
      } else if (waveState === 'stop') {
        wave.classList.add('stop');
        wave.style.display = 'none';
      }
    };

    // Control buttons with Metronic 9 icons
    const micWrapper = createIconWrapper('microphone', 'rec-icon', '#0b6fac', 'Record');
    const pauseWrapper = createIconWrapper('pause', 'pause-icon', '#f39c12', 'Pause');
    const playWrapper = createIconWrapper('play', 'play-icon', '#2ecc71', 'Resume');
    const stopWrapper = createIconWrapper('stop', 'stop-icon', '#e74c3c', 'Stop');

    pauseWrapper.style.display = 'none';
    playWrapper.style.display = 'none';
    stopWrapper.style.display = 'none';

    renderPatientRecording.appendChild(micWrapper);
    renderWaveTimer.appendChild(wave);
    renderWaveTimer.appendChild(timerSpan);
    state.wave = wave; // store for later use
    renderPatientRecording.appendChild(pauseWrapper);
    renderPatientRecording.appendChild(playWrapper);
    renderPatientRecording.appendChild(stopWrapper);

    // Function to update microphone icon state
    const updateMicrophoneIcon = (isActive) => {
      const iconElement = micWrapper.querySelector('.svg-icon');
      if (iconElement) {
        const color = iconElement.dataset.iconColor;
        iconElement.innerHTML = isActive ? 
          createMetronicIcon('microphone-active', color).innerHTML :
          createMetronicIcon('microphone', color).innerHTML;
      }
    };

    // Check for existing session
    const checkExistingSession = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          window.location.href = '../index.html';
          return;
        }

        const response = await fetch(`${BASE_URL_KINESIS}check-session`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patient_id: patientId })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.session_id) {
            state.sessionId = data.session_id;
            state.pausedDuration = data.pause_duration || 0;

            micWrapper.style.display = 'none';
            updateMicrophoneIcon(true);
            
            if (data.total_duration > 0) {
              playWrapper.style.display = 'inline-flex';
              state.isPaused = true;
            } else {
              pauseWrapper.style.display = 'inline-flex';
            }
            stopWrapper.style.display = 'inline-flex';
            timerSpan.style.display = 'flex';

            const duration = data.total_duration || 0;
            if (parseFloat(duration) !== 0) {
              const total_seconds = Math.floor(parseFloat(duration)); // convert to integer seconds
              const mins = String(Math.floor(total_seconds / 60)).padStart(2, '0');
              const secs = String(total_seconds % 60).padStart(2, '0');
              timerSpan.textContent = `${mins}:${secs}`;
              setWaveState('paused');
            } else {
              const mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
              const secs = String(state.seconds % 60).padStart(2, '0');
              timerSpan.textContent = `${mins}:${secs}`;
            }

          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkExistingSession();

    // API helper
    const callBackendAPI = async (endpoint, method = 'POST', body = null) => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '../index.html';
        return null;
      }

      try {
        const response = await fetch(`${BASE_URL_KINESIS}${endpoint}`, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: body ? JSON.stringify(body) : null
        });
        return await response.json();
      } catch (error) {
        console.error(`API call failed: ${error}`);
        toastr.error(`Failed to ${method} ${endpoint}`);
        return null;
      }
    };

    // Start recording
    micWrapper.addEventListener('click', async () => {
      // ✅ Prevent double click starting multiple sessions
      if (state.isRecording) {
        console.warn('Recording already started');
        return;
      }
      state.isRecording = true; // mark recording in progress
      const uniqueId = generateUniqueId();
      try {
        const startResponse = await callBackendAPI('start', 'POST', {
          patient_id: patientId,
          patient_name: patientName,
          recording_id: uniqueId
        });

        if (!startResponse || !startResponse.session_id) {
          throw new Error('Failed to start recording session');
        }

        state.sessionId = startResponse.session_id;
        if (!state.wave) {
          const wave = createAudioWave();
          const container = document.querySelector('.render-patient-recording');
          if (container) container.appendChild(wave);
          state.wave = wave;
        }

        // ✅ Initialize audio context and PCM capture
         if (state.chunkTimer) clearInterval(state.chunkTimer); // safety

        // ✅ PCM16 capture replacement for MediaRecorder
        state.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new AudioContext({ sampleRate: 16000 });
        const source = audioCtx.createMediaStreamSource(state.stream);
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);

        // Store references for stop cleanup
        state.audioContext = audioCtx;
        state.source = source;
        state.processor = processor;
        state.pcmChunks = [];
        state.chunkSequence = 0;
        state.uploadQueue = [];
        state.isUploading = false;
        source.connect(processor);
        processor.connect(audioCtx.destination);

        function floatTo16BitPCM(float32Array) {
          const buffer = new ArrayBuffer(float32Array.length * 2);
          const view = new DataView(buffer);
          let offset = 0;
          for (let i = 0; i < float32Array.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, float32Array[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
          }
          return buffer;
        }

        function mergeBuffers(chunks) {
          const length = chunks.reduce((acc, val) => acc + val.length, 0);
          const result = new Float32Array(length);
          let offset = 0;
          for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
          }
          return result;
        }

        async function uploadPCMChunk() {
          if (state.pcmChunks.length === 0) return;
          const flat = mergeBuffers(state.pcmChunks);
          const pcm16 = floatTo16BitPCM(flat);
          state.pcmChunks = [];

          const blob = new Blob([pcm16], { type: 'application/octet-stream' });
          const formData = new FormData();
          formData.append('audio_data', blob, 'recording.pcm');
          formData.append('session_id', state.sessionId);

          try {
            console.log("micwrappeer pause");
            const token = localStorage.getItem('access_token');
            await fetch(`${BASE_URL_KINESIS}upload`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: formData
            });
            console.log('✅ Uploaded PCM chunk of', blob.size, 'bytes');
          } catch (err) {
            console.error('Error uploading PCM chunk:', err);
          }
        }

        processor.onaudioprocess = (event) => {
          if (!state.isPaused) {
            const data = event.inputBuffer.getChannelData(0);
            state.pcmChunks.push(new Float32Array(data));
          }
        };

        // Upload every 20 seconds with sequencing
        state.isStopping = false;
        if (state.chunkTimer) clearInterval(state.chunkTimer);
        state.chunkTimer = setInterval(async () => {
          if (!state.isStopping && !state.isPaused && state.pcmChunks.length > 0) {
            const flat = mergeBuffers(state.pcmChunks);
            const pcm16 = floatTo16BitPCM(flat);
            const blob = new Blob([pcm16], { type: 'application/octet-stream' });
            
            // Add to upload queue with sequence
            state.uploadQueue.push({
              blob: blob,
              sessionId: state.sessionId,
              sequence: state.chunkSequence++,
              timestamp: Date.now()
            });
            
            state.pcmChunks = [];
            await processUploadQueue(state);
          }
        }, 20000);

        micWrapper.style.display = 'none';
        pauseWrapper.style.display = 'inline-flex';
        stopWrapper.style.display = 'inline-flex';
        timerSpan.style.display = 'flex';
        setWaveState('recording');
        state.seconds = 0;
        timerSpan.textContent = '00:00';
        state.timerInterval = setInterval(updateTimer, 1000);
        state.lastResumeTime = new Date();
        state.isPaused = false;
        state.isRecording = false;
        updateMicrophoneIcon(true);
      } catch (err) {
        console.error("Error starting recording:", err);
        if (err.name === 'NotAllowedError') {
          toastr.error("Microphone access is blocked. Please allow mic permissions in your browser settings.");
        } else if (err.name === 'NotFoundError') {
          toastr.error("No microphone detected. Please connect a mic and try again.");
        } else {
          toastr.error("Failed to start recording: " + err.message);
        }
        resetUI(state);
        state.isRecording = false;
      }
    });

    // Pause recording - FIXED
    pauseWrapper.addEventListener('click', async () => {
      if (state.isProcessing) return;
      state.isProcessing = true;

      // If currently recording, pause it
      if (state.stream && !state.isPaused) {
        try {
          console.log('⏸️ Pausing PCM16 recording for:', patientId);
          
          // ✅ CRITICAL: Stop chunk timer first to prevent duplicate uploads
          if (state.chunkTimer) {
            clearInterval(state.chunkTimer);
            state.chunkTimer = null;
          }
          
          // Pause the AudioContext recording
          if (state.audioContext && state.audioContext.state === 'running') {
            await state.audioContext.suspend();
          }

          // ✅ Queue remaining chunks for upload (don't wait)
          if (state.pcmChunks && state.pcmChunks.length > 0) {
            const flat = mergeBuffersFinal(state.pcmChunks);
            const pcm16 = floatTo16BitPCM(flat);
            const blob = new Blob([pcm16], { type: 'application/octet-stream' });
            
            state.uploadQueue.push({
              blob: blob,
              sessionId: state.sessionId,
              sequence: state.chunkSequence++,
              timestamp: Date.now()
            });
            
            state.pcmChunks = [];
            // Don't await - let it upload in background
            await processUploadQueue(state);
          }

          state.lastPauseTime = new Date();
          setWaveState('paused');
          clearInterval(state.timerInterval);

          // Notify backend and wait for response
          const pauseResponse = await callBackendAPI('send-command', 'POST', {
            command: 'pause',
            session_id: state.sessionId,
            pause_time: state.lastPauseTime.toISOString()
          });

          const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
          if (pauseIcon) {
            togglePauseIcon(patientId, true);
          }

          if (pauseResponse && pauseResponse.status === 'pause acknowledged') {
            pauseWrapper.style.display = 'none';
            playWrapper.style.display = 'inline-flex';
            state.isPaused = true;
            state.isProcessing = false;
          } else {
            throw new Error('Pause not acknowledged by server');
          }
        } catch (error) {
          console.error("Pause error:", error);
          toastr.error("Failed to pause recording");
          state.isProcessing = false;
        }
      }
    });

    // Resume recording - FIXED
    playWrapper.addEventListener('click', async () => {
      if (state.isProcessingResume) return;
      state.isProcessingResume = true;

      try {
        // === CASE 1: Resume existing paused PCM16 recording ===
        if (state.isPaused && state.audioContext) {
          await state.audioContext.resume();
          state.lastResumeTime = new Date();

          // ✅ CRITICAL: Restart chunk timer on resume
          if (!state.chunkTimer) {
            async function uploadPCMChunk() {
              if (state.pcmChunks.length === 0 || state.isPaused) return;
              const flat = mergeBuffersFinal(state.pcmChunks);
              const pcm16 = floatTo16BitPCM(flat);
              const blob = new Blob([pcm16], { type: 'application/octet-stream' });
              
              state.uploadQueue.push({
                blob: blob,
                sessionId: state.sessionId,
                sequence: state.chunkSequence++,
                timestamp: Date.now()
              });
              
              state.pcmChunks = [];
              await processUploadQueue(state);
            }
            
            state.chunkTimer = setInterval(() => {
              if (!state.isStopping && !state.isPaused) uploadPCMChunk();
            }, 20000);
          }

          setWaveState('resume');
          state.timerInterval = setInterval(updateTimer, 1000);

          // Notify backend
          const resumeResponse = await callBackendAPI('send-command', 'POST', {
            command: 'resume',
            session_id: state.sessionId,
            resume_time: state.lastResumeTime.toISOString()
          });

          if (resumeResponse && resumeResponse.status === 'resume acknowledged') {
            playWrapper.style.display = 'none';
            pauseWrapper.style.display = 'inline-flex';
            state.isPaused = false;
            state.isProcessingResume = false;
          } else {
            throw new Error('Resume not acknowledged by server');
          }
          return;
        }

        // === CASE 2: Start new AudioContext PCM16 recording ===
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${BASE_URL_KINESIS}check-session`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patient_id: patientId })
        });

        if (!response.ok) throw new Error('Failed to check session');
        const data = await response.json();
        state.sessionId = data.session_id;

        // Create new audio context and setup
        state.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new AudioContext({ sampleRate: 16000 });
        const source = audioCtx.createMediaStreamSource(state.stream);
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);

        state.audioContext = audioCtx;
        state.source = source;
        state.processor = processor;
        state.pcmChunks = [];
        state.chunkSequence = state.chunkSequence || 0;
        state.uploadQueue = state.uploadQueue || [];
        state.isUploading = state.isUploading || false;
        source.connect(processor);
        processor.connect(audioCtx.destination);

        processor.onaudioprocess = (event) => {
          if (!state.isPaused) {
            const data = event.inputBuffer.getChannelData(0);
            state.pcmChunks.push(new Float32Array(data));
          }
        };

        // Setup chunk upload timer
        async function uploadPCMChunk() {
          if (state.pcmChunks.length === 0 || state.isPaused) return;
          const flat = mergeBuffersFinal(state.pcmChunks);
          const pcm16 = floatTo16BitPCM(flat);
          const blob = new Blob([pcm16], { type: 'application/octet-stream' });
          
          state.uploadQueue.push({
            blob: blob,
            sessionId: state.sessionId,
            sequence: state.chunkSequence++,
            timestamp: Date.now()
          });
          
          state.pcmChunks = [];
          await processUploadQueue(state);
        }

        state.isStopping = false;
        state.chunkTimer = setInterval(() => {
          if (!state.isStopping && !state.isPaused) uploadPCMChunk();
        }, 20000);

        // Resume recording
        await state.audioContext.resume();
        state.lastResumeTime = new Date();

        // Sync timer to existing time if available
        const timerElements = document.getElementsByClassName('recording-timer');
        if (timerElements.length > 0) {
          const current_timer = timerElements[0].textContent.trim();
          const crnt_timer = current_timer.split(':');
          state.seconds = parseInt(crnt_timer[0], 10) * 60 + parseInt(crnt_timer[1], 10);
        }

        state.timerInterval = setInterval(updateTimer, 1000);
        setWaveState('recording');

        // Notify backend resume
        const resumeResponse = await callBackendAPI('send-command', 'POST', {
          command: 'resume',
          session_id: state.sessionId,
          resume_time: state.lastResumeTime.toISOString()
        });

        if (resumeResponse && resumeResponse.status === 'resume acknowledged') {
          playWrapper.style.display = 'none';
          pauseWrapper.style.display = 'inline-flex';
          state.isPaused = false;
          state.isProcessingResume = false;
          state.isRecording = true;
        } else {
          throw new Error('Resume not acknowledged by server');
        }
      } catch (err) {
        console.error("Error starting/resuming recording:", err);
        state.isProcessingResume = false;
        if (err.name === 'NotAllowedError') {
          toastr.error("Microphone access is blocked. Please allow mic permissions in your browser settings.");
        } else if (err.name === 'NotFoundError') {
          toastr.error("No microphone detected. Please connect a mic and try again.");
        } else {
          toastr.error("Failed to start or resume recording: " + err.message);
        }
      }
    });

    // Stop recording - USING stop Current Recording
    stopWrapper.addEventListener('click', async () => {
      if (state.audioContext && state.audioContext.state !== 'closed') {
        setWaveState('stop');
        const stream = state.stream;

        // Stop all tracks
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        // Stop audio processing
        if (state.processor) {
          state.processor.disconnect();
        }
        if (state.source) {
          state.source.disconnect();
        }
        if (state.audioContext.state !== 'closed') {
          await state.audioContext.close();
        }

        const renderPatientRecording = document.querySelector('.render-patient-recording');
        const renderWaveTimer = document.querySelector('.wave-timer');
        if (renderPatientRecording) {
          renderPatientRecording.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
          renderPatientRecording.querySelector('.pause-icon-wrapper').style.display = 'none';
          renderPatientRecording.querySelector('.play-icon-wrapper').style.display = 'none';
          renderPatientRecording.querySelector('.stop-icon-wrapper').style.display = 'none';
          if (renderWaveTimer) {
            renderWaveTimer.querySelector('.recording-timer').style.display = 'none';
          }
        }
             
        Swal.fire({
          title: 'Save Recording',
          text: "",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          allowOutsideClick: false,
          reverseButtons: true,
          customClass: {
            confirmButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9',
            cancelButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9 mr-2'
          },
          buttonsStyling: false
        }).then(async (result) => {
          if (result.isConfirmed) {
            document.getElementById("loader-overlay").style.display = "flex";

            try {
              const token = localStorage.getItem('access_token');

              const success = await stopCurrentRecording(patientId);
              if (success) {
                document.getElementById("loader-overlay").style.display = "none";
                toastr.success("Recording saved successfully");

                // Progress bar :: START
                const bar = document.getElementById(`patient-progress-bar-${patientId}`);
                const label = document.getElementById(`patient-progress-label-${patientId}`);
                if (!bar || !label) {
                  const progressWrapper = document.createElement("div");
                  progressWrapper.style.display = "flex";
                  progressWrapper.style.alignItems = "center";
                  progressWrapper.style.gap = "5px";

                  const progressContainer = document.createElement("div");
                  progressContainer.className = "progress mt-1";
                  progressContainer.style.height = "5px";
                  progressContainer.style.flexGrow = "1";

                  bar = document.createElement("div");
                  bar.id = `patient-progress-bar-${patientId}`;
                  bar.className = "progress-bar progress-bar-animated";
                  bar.style.width = "10%";
                  bar.style.display = "flex";

                  label = document.createElement("span");
                  label.id = `patient-progress-label-${patientId}`;
                  label.style.fontSize = "12px";
                  label.style.color = "#0b6fac";
                  label.textContent = "10%";
                  label.style.display = "inline";

                  progressContainer.appendChild(bar);
                  progressWrapper.appendChild(progressContainer);
                  progressWrapper.appendChild(label);
                } else {
                  const progressContainer = bar.parentElement;
                  if (progressContainer) progressContainer.style.display = "flex";
                  bar.style.display = "flex";
                  bar.style.width = "10%";
                  label.style.display = "inline";
                  label.textContent = "10%";
                }

                if (!progressIntervals[patientId]) {
                  progressIntervals[patientId] = setInterval(() => updateProgressBarOnce(patientId), 3000);
                }

                updateProgressBarOnce(patientId);
                // Progress bar :: END
                try {
                  document.getElementById("loader-overlay").style.display = "flex";
                  document.getElementById("loader-overlay").style.display = "none";
                  toastr.success("Audio File Updated Successfully");

                  const patientItems = document.querySelectorAll(".navi-item");
                  let selectedItem = null;
                  patientItems.forEach((item) => {
                    const nameSpan = item.querySelector(".navi-text");
                    const nameSpinner = item.querySelector(".navi-spinner");
                    if (nameSpan && nameSpan.textContent.trim() === patientName) {
                      selectedItem = item; // Store the selected item for later scrolling

                      // ✅ Always remove tick and spinner first
                      const existingTick = item.querySelector(".tick-icon");
                      if (existingTick) existingTick.remove();
                      const existingSpinner = item.querySelector(".spinner-icon");
                      if (existingSpinner) existingSpinner.remove();

                      const spinner = document.createElement("i");
                      spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
                      spinner.style.color = "#0b6fac";
                      nameSpinner.parentNode.appendChild(spinner);

                      // Scroll to the selected patient
                      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  });

                  // Connect to the backend WebSocket server
                  const socket = io(`${BASE_URL}`, {
                    transports: ['websocket', 'polling'],
                    reconnection: true
                  });

                  const summaryContainer = document.getElementById('summary-container');
                  const assessContainer = document.getElementById('assessment-container');
                  const assessPlanContainer = document.getElementById('assessment-plan-container');
                  const reviewofSystemContainer = document.getElementById('review-of-system-id');
                  const phyExamContainer = document.getElementById('physical-exam-id');

                  if (summaryContainer && assessContainer && assessPlanContainer && phyExamContainer) {
                    socket.on('connect', () => {
                      console.log('WebSocket connected');
                    });                    

                    socket.on('connect_error', (error) => {
                      console.error('WebSocket connection error:', error);
                      socket.disconnect();
                    });
                    socket.on('summary_complete', (data) => {
                      // if (data.user === urlUserName) {
                        loadSutureFix(data.patient_name, 'unarchived');
                        checkSoapNotification(patientId, token);

                        // Handle patient list update
                        const patientName = data.patient_name;
                        const patientItems = document.querySelectorAll(".navi-item");
                        const diagnosis = (data.file_content) ? data.file_content['Principal Diagnosis'] || '● None documented' : '● None documented';

                        patientItems.forEach((item) => {
                          const nameSpan = item.querySelector(".navi-text");
                          const nameSpinner = item.querySelector(".navi-spinner");
                          const diagnosisSpan = item.querySelector('.navi-text:not(.font-weight-bolder)');

                          if (nameSpan && nameSpan.textContent.trim() === patientName) {

                            // Remove spinner if exists
                            const spinner = item.querySelector(".spinner-icon");
                            if (spinner) spinner.remove();

                            // Remove existing tick if already present
                            const existingTick = item.querySelector(".tick-icon");
                            if (existingTick) existingTick.remove();

                            // Add checkmark if not exists
                            // if (!item.querySelector(".tick-icon")) {
                              const tick = document.createElement("i");
                              tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
                              tick.style.marginLeft = "10px";
                              tick.style.color = "#0b6fac";

                              const link = document.createElement("a");
                              link.className = "navi-link";
                              link.style.display = "none";
                              link.href = "#";

                              const wrapper = document.createElement("li");
                              wrapper.className = "navi-item";
                              wrapper.style.display = "none";
                              wrapper.appendChild(link);

                              nameSpinner.parentNode.appendChild(tick);
                              nameSpinner.parentNode.appendChild(wrapper);

                              const currentPatientName = document.getElementById('getPatientNameFromList').value;
                              // if (currentPatientName == patientName) {
                                // Clear containers and intervals
                                if (summaryContainer && assessContainer && assessPlanContainer && reviewofSystemContainer) {
                                  //
                                }

                                // Populate the content from file_content
                                const fileContent = data.file_content;

                                if (fileContent) {
                                  // Create new object with spaces replaced by underscores in keys
                                  const newObj = {};
                                  for (const key in fileContent) {
                                    if (fileContent.hasOwnProperty(key)) {
                                      const newKey = key.replace(/\s/g, '_');
                                      newObj[newKey] = fileContent[key];
                                    }
                                  }

                                  // Clinical Summary
                                  if (newObj['Clinical_Summary'] && summaryContainer) {
                                    const formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");

                                    summaryContainer.innerHTML = `
                                        <div class="pt-0 inside-summary-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Subjective and Interval Events
                                  if (newObj['Subjective_and_Interval_Events'] && assessContainer) {
                                    const formattedText = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");

                                    assessContainer.innerHTML = `
                                        <div class="pt-0 inside-assess-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Review of Systems
                                  if (newObj['Review_of_Systems'] && reviewofSystemContainer) {
                                    const formattedText = newObj['Review_of_Systems'].replace(/\n/g, "<br>");

                                    reviewofSystemContainer.innerHTML = `
                                        <div class="pt-0 inside-review-system-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Physical Examination
                                  if (newObj['Physical_Examination'] && phyExamContainer) {
                                    const formattedText = newObj['Physical_Examination'].replace(/\n/g, "<br>");

                                    phyExamContainer.innerHTML = `
                                        <div class="pt-0 inside-physical-exam-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Assessment and Plan
                                  if (newObj['Assessment_and_Plan'] && assessPlanContainer) {
                                    const formattedText = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");

                                    assessPlanContainer.innerHTML = `
                                        <div class="pt-0 inside-plan-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }
                                }
                              // }
                            // }

                            // Update diagnosis if diagnosis span exists
                            if (diagnosisSpan && data.file_content) {
                              if (diagnosis.length <= 24) {
                                diagnosisSpan.style.marginRight = '40px';
                              }
                              // Limit diagnosis to 35 characters
                              const truncatedDiagnosis = diagnosis.length > 35
                                ? diagnosis.substring(0, 35) + '...'
                                : diagnosis;

                              diagnosisSpan.textContent = truncatedDiagnosis;
                            }
                            if (diagnosis.length > 35) {
                              diagnosisSpan.setAttribute("title", diagnosis); // Shows native tooltip on hover
                            }
                          }
                        });
                        // Show toastr message only once
                        toastr.success("Segmentation Completed");

                        // socket.disconnect();
                      // } else {
                      //   console.log(`User mismatch: userFrom (${data.use}) !== urlUserName (${urlUserName})`);
                      // }
                    });

                    socket.on("transcription_failed", (data) => {
                      document.getElementById("loader-overlay").style.display = "none";
                      // if (data.user === urlUserName) {
                        console.error("Transcription failed:", data.error);

                        if (summaryContainer) {
                          summaryContainer.innerHTML = `
                                                  <div class="error-message">
                                                      <p style="color: red; font-weight: bold;">Error: ${data.error}</p>
                                                  </div>
                                              `;
                        }

                        socket.disconnect();
                      // } else {
                      //   console.log(`User mismatch: userFrom (${data.user}) !== urlUserName (${urlUserName})`);
                      // }
                    });
                  }
                } catch (error) {
                  document.getElementById("loader-overlay").style.display = "none";
                  toastr.error("Error saving audio: " + error.message);
                }
              } else {
                throw new Error('Failed to stop recording');
              }
            } catch (error) {
              document.getElementById("loader-overlay").style.display = "none";
              toastr.error("Error stopping recording 1:" + error.message);
            }
          } else {
            // state.mediaRecorder.stop();
            setWaveState('stop');
            deletePatientRecording(patientId, state.sessionId, state);
          }
        });
      } else {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${BASE_URL_KINESIS}check-session`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patient_id: patientId })
        });
        const data = response.json();
        if (response.ok) {
          try {
            Swal.fire({
              title: 'Save Recording',
              text: "",
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              allowOutsideClick: false,
              reverseButtons: true,
              customClass: {
                confirmButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9',
                cancelButton: 'cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-9 mr-2'
              },
              buttonsStyling: false
            }).then(async (result) => {
              if (result.isConfirmed) {
                document.getElementById("loader-overlay").style.display = "flex";
                // try {
                const token = localStorage.getItem('access_token');
                const success = await stopCurrentRecording(patientId);
                setWaveState('stop');
                // if (success) {
                document.getElementById("loader-overlay").style.display = "none";
                toastr.success("Recording saved successfully");

                // Progress bar :: START
                const bar = document.getElementById(`patient-progress-bar-${patientId}`);
                const label = document.getElementById(`patient-progress-label-${patientId}`);
                if (bar && label) {
                  bar.style.display = "flex";
                  bar.style.width = "10%";
                  label.style.display = "inline"
                  label.textContent = "10%";

                  const progressContainer = bar.parentElement;
                  if (progressContainer) progressContainer.style.display = "block";

                  if (!progressIntervals[patientId]) {
                    progressIntervals[patientId] = setInterval(() => updateProgressBarOnce(patientId), 3000);
                  }
                  updateProgressBarOnce(patientId);
                }
                // Progress bar :: END

                if (token && state.sessionId) {
                  const stateSession = state.sessionId;
                  const jobResponse = await fetch(`${BASE_URL_KINESIS}job-status/${stateSession}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  });
                  const data = await jobResponse.json();
                  if (jobResponse.ok) {
                    if (data.status != 'completed') {
                      setTimeout(() => {
                        fetch(`${BASE_URL_KINESIS}job-status/${stateSession}`, {
                          method: 'GET',
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                          }
                        });
                      }, 30000);
                    }
                  } else {
                    document.getElementById("loader-overlay").style.display = "none";
                  }
                }

                try {
                  document.getElementById("loader-overlay").style.display = "flex";

                  // if (success) {
                  document.getElementById("loader-overlay").style.display = "none";
                  toastr.success("Audio File Updated Successfully");

                  const patientItems = document.querySelectorAll(".navi-item");
                  let selectedItem = null;
                  patientItems.forEach((item) => {
                    const nameSpan = item.querySelector(".navi-text");
                    const nameSpinner = item.querySelector(".navi-spinner");
                    if (nameSpan && nameSpan.textContent.trim() === patientName) {
                      selectedItem = item; // Store the selected item for later scrolling
                      if (!item.querySelector(".spinner-icon")) {
                        const existingSpinner = item.querySelector(".spinner-icon");
                        const existingTick = item.querySelector(".tick-icon");
                        if (existingSpinner) existingSpinner.remove();
                        if (existingTick) existingTick.remove();

                        const spinner = document.createElement("i");
                        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
                        spinner.style.color = "#0b6fac";
                        nameSpinner.parentNode.appendChild(spinner);

                        // Scroll to the selected patient
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }
                    }
                  });

                  // Connect to the backend WebSocket server
                  const socket = io(`${BASE_URL}`, {
                    transports: ['websocket', 'polling'],
                    reconnection: true
                  });

                  const summaryContainer = document.getElementById('summary-container');
                  const assessContainer = document.getElementById('assessment-container');
                  const assessPlanContainer = document.getElementById('assessment-plan-container');
                  const reviewofSystemContainer = document.getElementById('review-of-system-id');
                  const phyExamContainer = document.getElementById('physical-exam-id');

                  if (summaryContainer && assessContainer && assessPlanContainer && phyExamContainer) {
                    socket.on('connect', () => {
                      console.log('WebSocket connected');
                    });
                    
                    socket.on('connect_error', (error) => {
                      console.error('WebSocket connection error:', error);
                      socket.disconnect();
                    });

                    socket.on('summary_complete', (data) => {
                      // if (data.user === urlUserName) {
                        checkSoapNotification(patientId, token);
                        // Handle patient list update
                        const patientName = data.patient_name;
                        const patientItems = document.querySelectorAll(".navi-item");
                        const diagnosis = (data.file_content) ? data.file_content['Principal Diagnosis'] || '● None documented' : '● None documented';

                        patientItems.forEach((item) => {
                          const nameSpan = item.querySelector(".navi-text");
                          const nameSpinner = item.querySelector(".navi-spinner");
                          const diagnosisSpan = item.querySelector('.navi-text:not(.font-weight-bolder)');

                          if (nameSpan && nameSpan.textContent.trim() === patientName) {
                            // Remove spinner if exists
                            const spinner = item.querySelector(".spinner-icon");
                            if (spinner) spinner.remove();

                            // Add checkmark if not exists
                            if (!item.querySelector(".tick-icon")) {
                              const tick = document.createElement("i");
                              tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
                              tick.style.marginLeft = "10px";
                              tick.style.color = "#0b6fac";

                              const link = document.createElement("a");
                              link.className = "navi-link";
                              link.style.display = "none";
                              link.href = "#";

                              const wrapper = document.createElement("li");
                              wrapper.className = "navi-item";
                              wrapper.style.display = "none";
                              wrapper.appendChild(link);

                              nameSpinner.parentNode.appendChild(tick);
                              nameSpinner.parentNode.appendChild(wrapper);

                              const currentPatientName = document.getElementById('getPatientNameFromList').value;
                              if (currentPatientName == patientName) {
                                // Clear containers and intervals
                                if (summaryContainer && assessContainer && assessPlanContainer && reviewofSystemContainer) {
                                  summaryContainer.innerHTML = "";
                                  assessContainer.innerHTML = "";
                                  reviewofSystemContainer.innerHTML = "";
                                  assessPlanContainer.innerHTML = "";
                                  phyExamContainer.innerHTML = "";
                                }

                                // Populate the content from file_content
                                const fileContent = data.file_content;

                                if (fileContent) {
                                  // Create new object with spaces replaced by underscores in keys
                                  const newObj = {};
                                  for (const key in fileContent) {
                                    if (fileContent.hasOwnProperty(key)) {
                                      const newKey = key.replace(/\s/g, '_');
                                      newObj[newKey] = fileContent[key];
                                    }
                                  }

                                  // Clinical Summary
                                  if (newObj['Clinical_Summary'] && summaryContainer) {
                                    const formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");

                                    summaryContainer.innerHTML = `
                                        <div class="pt-0 inside-summary-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Subjective and Interval Events
                                  if (newObj['Subjective_and_Interval_Events'] && assessContainer) {
                                    const formattedText = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");

                                    assessContainer.innerHTML = `
                                        <div class="pt-0 inside-assess-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Review of Systems
                                  if (newObj['Review_of_Systems'] && reviewofSystemContainer) {
                                    const formattedText = newObj['Review_of_Systems'].replace(/\n/g, "<br>");

                                    reviewofSystemContainer.innerHTML = `
                                        <div class="pt-0 inside-review-system-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Physical Examination
                                  if (newObj['Physical_Examination'] && phyExamContainer) {
                                    const formattedText = newObj['Physical_Examination'].replace(/\n/g, "<br>");

                                    phyExamContainer.innerHTML = `
                                        <div class="pt-0 inside-physical-exam-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }

                                  // Assessment and Plan
                                  if (newObj['Assessment_and_Plan'] && assessPlanContainer) {
                                    const formattedText = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");

                                    assessPlanContainer.innerHTML = `
                                        <div class="pt-0 inside-plan-section" style="font-size: 12px;">
                                          ${formattedText}
                                        </div>`;
                                  }
                                }
                              }
                            }

                            // Update diagnosis if diagnosis span exists
                            if (diagnosisSpan && data.file_content) {
                              if (diagnosis.length <= 24) {
                                diagnosisSpan.style.marginRight = '40px';
                              }
                              // Limit diagnosis to 35 characters
                              const truncatedDiagnosis = diagnosis.length > 35
                                ? diagnosis.substring(0, 35) + '...'
                                : diagnosis;

                              diagnosisSpan.textContent = truncatedDiagnosis;
                            }
                            if (diagnosis.length > 35) {
                              diagnosisSpan.setAttribute("title", diagnosis); // Shows native tooltip on hover
                            }
                          }
                        });
                        // Show toastr message only once
                        toastr.success("Segmentation Completed");

                        socket.disconnect();
                      // } else {
                      //   console.log(`User mismatch: userFrom (${data.use}) !== urlUserName (${urlUserName})`);
                      // }
                    });

                    socket.on("transcription_failed", (data) => {
                      document.getElementById("loader-overlay").style.display = "none";
                      // if (data.user === urlUserName) {
                        console.error("Transcription failed:", data.error);
                        
                        if (summaryContainer) {
                          summaryContainer.innerHTML = `
                                                      <div class="error-message">
                                                          <p style="color: red; font-weight: bold;">Error: ${data.error}</p>
                                                      </div>
                                                  `;
                        }

                        // socket.disconnect();
                      // } else {
                      //   console.log(`User mismatch: userFrom (${data.user}) !== urlUserName (${urlUserName})`);
                      // }
                    });
                  }
                } catch (error) {
                  document.getElementById("loader-overlay").style.display = "none";
                  toastr.error("Error saving audio: " + error.message);
                }
              } else {
                setWaveState('stop');
                deletePatientRecording(patientId, state.sessionId, state);
              }
            });

            // Reset UI state
            const renderPatientRecording = document.querySelector('.render-patient-recording');
            const renderWaveTimer = document.querySelector('.wave-timer');
            if (renderPatientRecording) {
              renderPatientRecording.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
              renderPatientRecording.querySelector('.pause-icon-wrapper').style.display = 'none';
              renderPatientRecording.querySelector('.play-icon-wrapper').style.display = 'none';
              renderPatientRecording.querySelector('.stop-icon-wrapper').style.display = 'none';
              if (renderWaveTimer) {
                renderWaveTimer.querySelector('.recording-timer').style.display = 'none';
              }
            }

            // Clear intervals
            clearInterval(state.timerInterval);

            // Reset state
            state.mediaRecorder = null;
            state.stream = null;
            state.audioChunks = [];
            state.isPaused = false;
            state.seconds = 0;
            state.totalDuration = 0;
            state.pausedDuration = 0;
            state.lastResumeTime = null;
            state.lastPauseTime = null;

            return true;
          } catch (error) {
            console.error("Error stopping recording 2:", error);
            return false;
          }
        } else {
          console.error("Error stopping recording 3:", error);
          return false;
        }
      }
    });
  }
}

// Helper function to clear all intervals
function clearAllIntervals(...intervals) {
  intervals.forEach(interval => {
    if (interval) clearInterval(interval);
  });
}

// Helper function to handle summary completion
function handleSummaryComplete(data, patientName, socket, ...intervals) {
  // Implementation of summary completion handling
  // (Same as your existing code for processing the summary data)

  // Don't forget to clear intervals and disconnect socket when done
  clearAllIntervals(...intervals);
  socket.disconnect();
}

// Helper function to handle transcription failure
function handleTranscriptionFailure(data, socket, ...intervals) {
  // Implementation of failure handling
  // (Same as your existing error handling code)

  clearAllIntervals(...intervals);
  socket.disconnect();
}

function createIconRow(currentPatient, id) {
  const iconRow = document.createElement('div');
  iconRow.className = 'flex pt-5 feedback';

  iconRow.innerHTML = `
    <i class="material-icons mr-5 cursor-pointer thumb-up text-gray-300" onclick="updateLikeAndDisLike('${currentPatient}', 'thumbs_up', '${id}')">thumb_up</i>
    <i class="material-icons mr-5 cursor-pointer thumb-down text-gray-300" onclick="updateLikeAndDisLike('${currentPatient}', 'thumbs_down', '${id}')">thumb_down</i>
    <i class="material-icons cursor-pointer comment text-gray-300" onclick="openCommentModal('${currentPatient}', '${id}')">comment</i>
  `;
  return iconRow;
}

function displayFeedbackDesign(currentPatient) {
  // all the container IDs you want to target
  const containerClasses = [
    'summary-container',
    'assessment-container',
    'review-of-system-id',
    'physical-exam-id',
    'assessment-plan-container',
    'principal-diagnosis',
    'chief-complaint-container',
    'history-present-ill',
    'past-med-hist',
    'past-surg-hist',
    'medi-container',
    'allergy-container',
    'family-container',
    'social-container',
    'hp-ros-container',
    'phy-exam-container',
    'assess-plan-container',
    'principal-diagnosis-container',
    'discharge-summary-container',
    'discharge-diagnoses-container',
    'discharge-medications-container',
    'discharge-condition-container',
    'discharge-disposition-container',
    'discharge-instructions-container',
    'followup-care-container',
  ];

  containerClasses.forEach(className => {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el && !el.querySelector('.thumb-up')) {
        el.appendChild(createIconRow(currentPatient, className));
      }
    }
  });
}

async function fetchActivePatientSegments(patientName, patientId, element) {
  // handleUploadButtonState('active');
  // handleSuturePhraseButtonState('active');
  loadUploads(patientName, 'active');
  showAllFeedback();

  for (const id in recordingStates) {
    if (id !== patientId && recordingStates[id].mediaRecorder) {
      const currentPatientState = recordingStates[id];
      const currentPatientName = currentPatientState.patientName || 'Previous Patient';

      await pauseCurrentRecording(id, currentPatientName);
    }
  }
  // toggleContent();
  // const recordingBlock = document.querySelector('.patient-wise-recording');
  // if (recordingBlock) {
  //   recordingBlock.style.display = 'block';
  // }
  const passPatientName = document.getElementById('passPatientName');
  const addModalPatientName = document.getElementById('addModalPatientName');
  const getPatientNameFromList = document.getElementById('getPatientNameFromList');

  if (passPatientName) passPatientName.value = patientName;
  if (addModalPatientName) addModalPatientName.textContent = patientName;
  if (getPatientNameFromList) getPatientNameFromList.value = patientName;
  
  selectedPatientName = patientName;

  const patientDetails = document.querySelector('.patient-name');
  const nameSpan = document.createElement('span');

  if (patientDetails) {
    patientDetails.innerHTML = '';
    nameSpan.classList.add('navi-text');
    nameSpan.textContent = patientName;
    patientDetails.appendChild(nameSpan);
  }

   addRecIcon(patientName, patientId);
  //   document.getElementById('activePatientId').value = patientId;
  // if ($('#kt_chat_modal_new').hasClass('show')) {
  //   $('#kt_chat_modal_new').modal('hide');
  // }

  const apiUrl = `${BASE_URL}summary/display-patient-jobs-output?patient_name=` + patientName;
  const apiUrl_raw = `${BASE_URL}summary/`;
  const summaryDiv = document.querySelector(".summary-container");
  const assessmentDiv = document.querySelector(".assessment-container");
  const planDiv = document.querySelector(".assessment-plan-container");
  const rawTransDiv = document.querySelector(".raw-transcription-id");
  const rawUploadsDiv = document.querySelector(".raw-uploads-id");
  const reviewDiv = document.querySelector(".review-of-system-id");
  const phyExamDiv = document.querySelector(".physical-exam-id");
  const token = localStorage.getItem('access_token');

  document.querySelectorAll(".navi-link").forEach(
    link => link.classList.remove("active"));
  // link.addEventListener("click", function (e) {
  //   e.preventDefault();

  // Remove active classes from all
  document.querySelectorAll(".navi-link").forEach(l => {
    l.classList.remove("active");
    if (l.parentElement.classList.contains("navi-item")) {
      l.parentElement.classList.remove("active-li");
    }
  });

  // Add active class to clicked link and its parent <li>
  // this.classList.add("active");
  if (element) element.classList.add("active");
  if (element.parentElement.classList.contains("navi-item")) {
    element.parentElement.classList.add("active-li");
  }

  let summarySeconds = 0, assessmentSeconds = 0;

  summaryDiv.innerHTML = `<p class="loading-text text-xs">Loading... <span id="summary-timer">0</span>s</p>`;
  assessmentDiv.innerHTML = `<p class="loading-text text-xs">Loading... <span id="assessment-timer">0</span>s</p>`;
  planDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;
  reviewDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;
  phyExamDiv.innerHTML = `<p class="loading-text text-xs">Loading...</p>`;

  // Timers
  const summaryTimer = setInterval(() => {
    summarySeconds++;
    document.getElementById("summary-timer").innerText = summarySeconds;
  }, 1000);

  const assessmentTimer = setInterval(() => {
    assessmentSeconds++;
    document.getElementById("assessment-timer").innerText = assessmentSeconds;
  }, 1000);

  const idTitleMap = {
    "summary-container": "Summary",
    "assessment-container": "Interval Events",
    "review-of-system-id": "Review of Systems",
    "physical-exam-id": "Physical Examination",
    "assessment-plan-container": "Assessment and Plan",
  };

  document.getElementById("hd_soap_url").value = '';
  document.getElementById("hd_hp_url").value = '';
  document.getElementById("hd_ds_url").value = '';

  Object.keys(idTitleMap).flat().forEach(containerClass => {
    const card = document.querySelector(`.${containerClass}`).closest('.kt-accordion-content');
    if (!card) return;

    const icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
    icons.forEach(icon => icon.classList.remove('active'));
  });

  // checkSoapNotification(patientId, token);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    clearInterval(summaryTimer);
    clearInterval(assessmentTimer);

    const data = await response.json();

    // Update Summary
    var file_content = data.file_content;
    let jsonArray = [file_content];
    let jsonString = JSON.stringify(jsonArray);

    const newObj = {};
    for (const key in file_content) {
      if (file_content.hasOwnProperty(key)) {
        const newKey = key.replace(/\s/g, '_');
        newObj[newKey] = file_content[key];
      }
    }
    // Update Summary
    if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].length === 0) {
      summaryDiv.innerHTML = `<p class='text-xs'>No Summary Available</p>`;
    } else {
      const formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");

      summaryDiv.innerHTML = `
        <div class="pt-0 inside-summary-section text-xs">
          ${formattedText}
        </div>`;
    }


    // Update Assessment
    if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].length === 0) {
      assessmentDiv.innerHTML = `<p class='text-xs'>No Interval Events Available</p>`;
    } else {
      const formattedText = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");

      assessmentDiv.innerHTML = `
        <div class="pt-0 inside-assess-section text-xs">
          ${formattedText}
        </div>`;
    }
    // Update Assessment Plan
    if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
      planDiv.innerHTML = `<p class='text-xs'>No Assessment Plan Available</p>`;
    } else {
      const formattedText = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");

      planDiv.innerHTML = `
        <div class="pt-0 inside-plan-section text-xs">
          ${formattedText}
        </div>`;
    }

    // Update Review of System
    if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
      reviewDiv.innerHTML = `<p class='text-xs'>No Review of System Available</p>`;
    } else {
      const formattedText = newObj['Review_of_Systems'].replace(/\n/g, "<br>");

      reviewDiv.innerHTML = `
        <div class="pt-0 inside-review-system-section text-xs">
          ${formattedText}
        </div>`;
    }

    //update physical examination
    if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
      phyExamDiv.innerHTML = `<p class='text-xs'>No Physical Examination Available</p>`;
    } else {
      const formattedText = newObj['Physical_Examination'].replace(/\n/g, "<br>");

      phyExamDiv.innerHTML = `
        <div class="pt-0 inside-physical-exam-section text-xs">
          ${formattedText}
        </div>`;
    }

    const diagnosis = newObj['Principal_Diagnosis'] || '● None documented';

    // Get all <li> elements with class "navi-item"
    const diagnosisItems = document.querySelectorAll('li.navi-item');
    diagnosisItems.forEach(item => {
      const nameSpan = item.querySelector('.navi-text.font-semibold');
      const diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');

      if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
        if (diagnosis.length <= 24) {
          diagnosisSpan.style.marginRight = '40px';
        }
        // Limit diagnosis to 35 characters
        const truncatedDiagnosis = diagnosis.length > 35
          ? diagnosis.substring(0, 35) + '...'
          : diagnosis;

        diagnosisSpan.textContent = truncatedDiagnosis;
      }
    });

    if (data.s3_overall_jobs_path) {
      const part = data.s3_overall_jobs_path.split("/")[3];
      const currentPatient = part.split("_")[1];
      displayFeedbackDesign(currentPatient);
    } else {
      displayFeedbackDesign(patientId);
    }
    
    let responseType = '';
    let responseUrl = '';
    let title = '';
    let currentId = '';

    const currentNoteTypeElement = document.getElementById('currentNoteType');
    const selectedTab = currentNoteTypeElement?.textContent.trim() || 'SOAP';
    
    const hiddenSoap = document.getElementById("hd_soap_url");
    if (hiddenSoap) {
      hiddenSoap.value = data.s3_overall_jobs_path;
      responseUrl = data.s3_overall_jobs_path;
      responseType = 'SOAP';
    }

    if (responseType === 'SOAP' && responseUrl && responseUrl !== 'undefined') {
      let sectionName = '';
      for (const [className, sectionTitle] of Object.entries(idTitleMap)) {
        const container = document.querySelector(`.${className}`);
        if (container) {
          currentId = className;
          sectionName = sectionTitle;
          break;
        }
      }
      const card = document.querySelector(`.${currentId}`).closest('.kt-accordion-content');

      // clear old actives
      const icons = card.querySelectorAll('.thumb-up, .thumb-down');
      icons.forEach(icon => icon.classList.remove('active'));

      const accordionItem = card.parentElement;
      const titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
      const titleSpan = titleToggle ? titleToggle.querySelector('span') : null;
      const title = titleSpan ? titleSpan.textContent.trim() : '';

      if (card) {
        const result = await fetch(`${BASE_URL}summary/display_user_rating?patient_id=${patientId}&response_type=${responseType}&response_url=${responseUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if(result.ok) {
          const response_data = await result.json();
          if (response_data.user_ratings && response_data.user_ratings.length > 0) {
            const ratings = response_data.user_ratings[0].good_bad;
            const idMap = {
              "Summary": ["summary-container"],
              "Interval Events": ["assessment-container"],
              "Review of Systems": ["review-of-system-id"],
              "Physical Examination": ["physical-exam-id"],
              "Assessment and Plan": ["assessment-plan-container"],
            };

            Object.entries(ratings).forEach(([title, ratingValue]) => {
              const containerIds = idMap[title];
              if (!containerIds) return;

              containerIds.forEach(containerId => {
                const card = document.querySelector(`.${containerId}`).closest('.kt-accordion-content');
                if (!card) return;

                // set based on API
                if (ratingValue === "good") {
                  card.querySelector('.thumb-up')?.classList.add('active');
                } else if (ratingValue === "bad") {
                  card.querySelector('.thumb-down')?.classList.add('active');
                }
              });
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    summaryDiv.innerHTML = `<p class='text-xs'>Error loading summary</p>`;
    assessmentDiv.innerHTML = `<p class='text-xs'>Error loading assessment</p>`;
    planDiv.innerHTML = `<p class='text-xs'>Error loading assessment plan</p>`;
    reviewDiv.innerHTML = `<p class='text-xs'>Error loading Review of System</p>`;
    phyExamDiv.innerHTML = `<p class='text-xs'>Error loading Physical Examination</p>`;
  }

  fetchPatientHpDetails(patientName);
  fetchPatientDsDetails(patientName);
  // loadTasks(patientName);

  // loadSutureFix(patientName, 'unarchived');
  // loadUploads(patientName, 'unarchived');
}

async function fetchPatientHpDetails(patientName) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  // Map JSON keys to class selectors
  const sectionMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-section",
    "Chief Complaint": ".inside-chief-complaint-section",
    "History of Present Illness": ".inside-history-present-ill-section",
    "Past Medical History": ".inside-past-med-hist-section",
    "Past Surgical History": ".inside-past-surg-hist-section",
    "Medications": ".inside-medi-container-section",
    "Allergies": ".inside-allergy-container-section",
    "Review of Systems": ".inside-hp-ros-container-section",
    "Physical Examination": ".inside-phy-exam-section",
    "Family History": ".inside-family-container-section",
    "Assessment and Plan": ".inside-assess-plan-container-section",
    "Social History": ".inside-social-container-section",
  };

  // Clear all sections initially
  Object.values(sectionMap).forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });

  // idMap for H&P
  const idMap = {
    "Principal Diagnosis": ["principal-diagnosis"],
    "Chief Complaint": ["chief-complaint-container"],
    "History of Present Illness": ["history-present-ill"],
    "Past Medical History": ["past-med-hist"],
    "Past Surgical History": ["past-surg-hist"],
    "Medications": ["medi-container"],
    "Allergies": ["allergy-container"],
    "Family History": ["family-container"],
    "Social History": ["social-container"],
    "Review of Systems": ["hp-ros-container"],
    "Physical Examination": ["phy-exam-container"],
    "Assessment and Plan": ["assess-plan-container"],
  };

  Object.values(idMap).flat().forEach(containerId => {
    const card = document.querySelector(`.${containerId}`).closest('.kt-accordion-content');
    if (!card) return;

    const icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
    icons.forEach(icon => icon.classList.remove('active'));
  });

  try {
    const response = await fetch(`${BASE_URL}summary/display-patient-hp-output?patient_name=${encodeURIComponent(patientName)}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch patient data');
      const data = await response.json();

      const hpContent = data.hp_content;
      if (!hpContent) {
        toastr.warning('No patient data found');
        return;
      }

      for (const [key, value] of Object.entries(hpContent)) {
        const selector = sectionMap[key];
        if (selector) {
          const container = document.querySelector(selector);
          if (container) {
            if (value && value.trim() !== '') {
              // if (key === "Assessment and Plan" || key === "Review of Systems" || key === "Physical Examination") {
                container.innerHTML = `${value.replace(/\n/g, '<br>')}`;
              // } else {
              //   container.innerHTML = marked.parse(formatToMarkdownSafe(value));
              // }
            } else {
              container.innerHTML = '<p class="text-xs">No data available.</p>';
            }
          }
        } else {
          console.warn(`No matching section for key: "${key}"`);
        }
      }

      const part = data.s3_hp_path.split("/")[3];
      const currentPatient = part.split("_")[1];

      const hiddenHp = document.getElementById("hd_hp_url");
      if (hiddenHp) hiddenHp.value = data.s3_hp_path;
      const responseUrl = data.s3_hp_path;
      const responseType = "HP";

    if (responseUrl === 'undefined' || !responseUrl) return;
      
      const ratingRes = await fetch(`${BASE_URL}summary/display_user_rating?patient_id=${currentPatient}&response_type=${responseType}&response_url=${responseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!ratingRes.ok) throw new Error('Failed to fetch ratings');
      const ratingData = await ratingRes.json();

      if (ratingData.user_ratings && ratingData.user_ratings.length > 0) {
        const ratings = ratingData.user_ratings[0].good_bad;

        Object.entries(ratings).forEach(([title, ratingValue]) => {
          const containerIds = idMap[title];
          if (!containerIds) return;

          containerIds.forEach(containerId => {
            const card = document.querySelector(`.${containerId}`).closest('.kt-accordion-content');
            if (!card) return;

            // clear old actives
            const icons = card.querySelectorAll('.thumb-up, .thumb-down');
            icons.forEach(icon => icon.classList.remove('active'));

            // apply rating
            if (ratingValue === "good") {
              card.querySelector('.thumb-up')?.classList.add('active');
            } else if (ratingValue === "bad") {
              card.querySelector('.thumb-down')?.classList.add('active');
            }
          });
        });
      }
  } catch (error) {
    console.error('Error fetching H&P details:', error);
  }
}

function fetchArchivedPatientHpDetails(patientName) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Map JSON keys to class selectors
  const sectionMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-section",
    "Chief Complaint": ".inside-chief-complaint-section",
    "History of Present Illness": ".inside-history-present-ill-section",
    "Past Medical History": ".inside-past-med-hist-section",
    "Past Surgical History": ".inside-past-surg-hist-section",
    "Medications": ".inside-medi-container-section",
    "Allergies": ".inside-allergy-container-section",
    "Review of Systems": ".inside-hp-ros-container-section",
    "Physical Examination": ".inside-phy-exam-section",
    "Family History": ".inside-family-container-section",
    "Assessment and Plan": ".inside-assess-plan-container-section",
    "Social History": ".inside-social-container-section",
  };

  // Clear all sections initially
  Object.values(sectionMap).forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });

  fetch(`${BASE_URL}summary/display-patient-hp-output?patient_name=${patientName}&patient_status=archived`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch patient data');
      return response.json();
    })
    .then(data => {
      const hpContent = data.hp_content;
      if (!hpContent) {
        toastr.warning('No patient data found');
        return;
      }

      for (const [key, value] of Object.entries(hpContent)) {
        const selector = sectionMap[key];
        if (selector) {
          const container = document.querySelector(selector);
          if (container) {
            if (value && value.trim() !== '') {
              // if (key === "Assessment and Plan" || key === "Review of Systems" || key === "Physical Examination") {
                container.innerHTML = `${value.replace(/\n/g, '<br>')}`;
              // } else {
              //   container.innerHTML = marked.parse(formatToMarkdownSafe(value));
              // }
            } else {
              container.innerHTML = '<p class="text-xs">No data available.</p>';
            }
          }
        } else {
          console.warn(`No matching section for key: "${key}"`);
        }
      }


    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function fetchPatientDsDetails(patientName) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  // Map JSON keys to class selectors
  const sectionMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Follow-up Care": ".inside-followup-care-container"
  };

  // Clear all sections initially
  Object.values(sectionMap).forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });

  // idMap for DS
  const idMap = {
    "Principal Diagnosis": ["principal-diagnosis-container"],
    "Discharge Summary": ["discharge-summary-container"],
    "Discharge Diagnoses": ["discharge-diagnoses-container"],
    "Discharge Medications": ["discharge-medications-container"],
    "Discharge Condition": ["discharge-condition-container"],
    "Discharge Disposition": ["discharge-disposition-container"],
    "Discharge Instructions": ["discharge-instructions-container"],
    "Follow-up Care": ["followup-care-container"]
  };

  Object.values(idMap).flat().forEach(containerId => {
    const card = document.querySelector(`.${containerId}`).closest('.kt-accordion-content');
    if (!card) return;

    const icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
    icons.forEach(icon => icon.classList.remove('active'));
  });

  fetch(`${BASE_URL}summary/display-patient-discharge-output?patient_name=${encodeURIComponent(patientName)}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch patient data');
      return response.json();
    })
    .then(data => {
      const dsContent = data.discharge_content;
      if (!dsContent) {
        toastr.warning('No patient data found');
        return;
      }

      for (const [key, value] of Object.entries(dsContent)) {
        const selector = sectionMap[key];
        if (selector) {
          const container = document.querySelector(selector);
          if (container) {
            if (value && value.trim() !== '') {
              const formattedText = value.replace(/\n/g, "<br>");
              container.innerHTML = `${formattedText}`;
            } else {
              container.innerHTML = '<p class="text-xs">No data available.</p>';
            }
            // if (value && value.trim() !== '') {
            //   container.innerHTML = marked.parse(formatToMarkdownSafe(value));
            // } else {
            //   container.innerHTML = '<p style="font-size:14px;">No data available.</p>';
            // }
          }
        } else {
          console.warn(`No matching section for key: "${key}"`);
        }
      }

      const part = data.s3_discharge_path.split("/")[3];
      const currentPatient = part.split("_")[1];

      // Save hidden input for DS path
      const hiddenDs = document.getElementById("hd_ds_url");
      if (hiddenDs) hiddenDs.value = data.s3_discharge_path;

      const responseUrl = data.s3_discharge_path;
      const responseType = "DS";

      if (responseUrl === 'undefined' || !responseUrl) return;

      // Fetch ratings for discharge summary
      return fetch(`${BASE_URL}summary/display_user_rating?patient_id=${currentPatient}&response_type=${responseType}&response_url=${responseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    })
    .then(res => {
      if (!res) return; // skip if no ratings call
      if (!res.ok) throw new Error("Failed to fetch ratings");
      return res.json();
    })
    .then(ratingData => {
      if (!ratingData) return;

      if (ratingData.user_ratings && ratingData.user_ratings.length > 0) {
        const ratings = ratingData.user_ratings[0].good_bad;

        Object.entries(ratings).forEach(([title, ratingValue]) => {
          const containerIds = idMap[title];
          if (!containerIds) return;

          containerIds.forEach(containerId => {
            const card = document.querySelector(`.${containerId}`).closest('.kt-accordion-content');
            if (!card) return;

            // clear old actives
            const icons = card.querySelectorAll('.thumb-up, .thumb-down');
            icons.forEach(icon => icon.classList.remove('active'));

            // set new active
            if (ratingValue === "good") {
              card.querySelector('.thumb-up')?.classList.add('active');
            } else if (ratingValue === "bad") {
              card.querySelector('.thumb-down')?.classList.add('active');
            }
          });
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function handleUploadButtonState(archiveState) {
  const uploadAddBtn = document.getElementById('notesAddBtn'); // upload add button
  if (!uploadAddBtn) return;

  if (archiveState === 'archived') {
    uploadAddBtn.disabled = true;
    uploadAddBtn.style.opacity = '0.5';
    uploadAddBtn.style.cursor = 'not-allowed';
    uploadAddBtn.title = 'Upload disabled for archived patients';
  } else {
    uploadAddBtn.disabled = false;
    uploadAddBtn.style.opacity = '1';
    uploadAddBtn.style.cursor = 'pointer';
    uploadAddBtn.removeAttribute('title');
  }
}

function handleSuturePhraseButtonState(archiveState) {
  const sutureAddBtn = document.getElementById('addNewPhraseBtn'); // suture phrase add button
  if (!sutureAddBtn) return;

  if (archiveState === 'archived') {
    sutureAddBtn.disabled = true;
    sutureAddBtn.style.opacity = '0.5';
    sutureAddBtn.style.cursor = 'not-allowed';
    sutureAddBtn.title = 'Adding phrases disabled for archived patients';
  } else {
    sutureAddBtn.disabled = false;
    sutureAddBtn.style.opacity = '1';
    sutureAddBtn.style.cursor = 'pointer';
    sutureAddBtn.removeAttribute('title');
  }
}

function fetchArchivedPatientDsDetails(patientName) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Map JSON keys to class selectors
  const sectionMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Follow-up Care": ".inside-followup-care-container"
  };

  // Clear all sections initially
  Object.values(sectionMap).forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });

  fetch(`${BASE_URL}summary/display-patient-discharge-output?patient_name=${patientName}&patient_status=archived`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch patient data');
      return response.json();
    })
    .then(data => {
      const dsContent = data.discharge_content;
      if (!dsContent) {
        toastr.warning('No patient data found');
        return;
      }

      for (const [key, value] of Object.entries(dsContent)) {
        const selector = sectionMap[key];
        if (selector) {
          const container = document.querySelector(selector);
          if (container) {
            if (value && value.trim() !== '') {
              const formattedText = value.replace(/\n/g, "<br>");

              container.innerHTML = `${formattedText}`;
              // container.innerHTML = marked.parse(formatToMarkdownSafe(value));
            } else {
              container.innerHTML = '<p class="text-xs">No data available.</p>';
            }
          }
        } else {
          console.warn(`No matching section for key: "${key}"`);
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

window.filterPatients = function() {
  const input = document.getElementById("patientSearch").value.toLowerCase().trim();
  const items = document.querySelectorAll(".navi-item");

  items.forEach(item => {
    const nameSpan = item.querySelector(".navi-text");
    const name = nameSpan ? nameSpan.textContent.toLowerCase() : "";

    if (name.includes(input)) {
      item.style.setProperty("display", "flex", "important");
    } else {
      item.style.setProperty("display", "none", "important");
    }
  });
}

let seconds = 0;
let timerInterval;
let alertTimeout;
let stopTimeout;

function startTimer() {
  // Hide start image and show stop image
  document.getElementById("startRecording").style.display = "none";
  document.getElementById("RecordingHint").style.display = "none";
  document.getElementById("stopRecording").style.display = "flex";

  // Show the timer display
  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.style.display = "flex";

  // Start the timer
  timerInterval = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    // Show an alert at the 9th minute
    if (seconds === 29 * 60) {
      showCountdownAlert();
    }

    // Stop recording automatically at the 30th minute
    if (seconds >= 30 * 60) {
      stopTimer('auto');
    }
  }, 1000);
}

function stopTimer(res) {
  // Stop the timer
  clearInterval(timerInterval);
  clearTimeout(alertTimeout);
  clearTimeout(stopTimeout);
  seconds = 0; // Reset the timer count

  // Reset the UI: hide stop image, show start image, and hide timer display
  document.getElementById("stopRecording").style.display = "none";
  document.getElementById("RecordingHint").style.display = "block";
  document.getElementById("startRecording").style.display = "flex";
  document.getElementById("timerDisplay").style.display = "none";

  // Reset the timer text
  document.getElementById("timerDisplay").textContent = "00:00";

  // Simulate a click on the stop button
  if (res === 'auto') {
    document.getElementById("stopRecording").click();
  }
}

function showCountdownAlert() {
  let countdown = 59; // 1-minute countdown
  const alertMessage = document.getElementById("countdownMessage"); // Select the <p> tag

  alertMessage.style.display = "block"; // Show the message container

  alertTimeout = setInterval(() => {
    if (countdown > 1) {
      alertMessage.textContent = `Recording will stop in ${countdown} seconds.`;
      countdown--;
    } else {
      clearInterval(alertTimeout);
      alertMessage.textContent = '';
      alertMessage.style.display = "none"; // Hide the message after countdown
    }
  }, 1000);
}

const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const statusDiv = document.getElementById('status');

let mediaRecorder;
let audioChunks = [];
let uniqueId = generateUniqueId();
let stream;
function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit unique ID
}

function refreshPatientList() {
  document.getElementById('getPatientNameFromList').value = '';
  const patientList = document.querySelector(".navi");
  if (!patientList) {
    console.error("Element .navi not found!");
    return;
  }

  // Clear the list
  patientList.innerHTML = "";

  // Show loading message
  if (typeof showLoadingMessage === "function") {
    showLoadingMessage();
  } else {
    console.warn("showLoadingMessage function is missing!");
  }

  // Get the currently active tab
  const activeTab = document.querySelector('.nav-link.active');
  // if (!activeTab) {
  //   console.error("No active tab found!");
  //   return;
  // }

  // Determine which tab is active using ID
  const archiveTab = document.getElementById("archivedPatientLink");

  if (activeTab === archiveTab) {
    const url = `${BASE_URL}get-archived-patients`;
    if (typeof fetchArchivedPatientList === "function") {
      fetchArchivedPatientList(url); // ✅ Pass URL here
    } else {
      console.error("fetchArchivedPatientList function is missing!");
    }
  } else {
    const url = `${BASE_URL}patient-name-list`;
    if (typeof fetchPatientList === "function") {
      fetchPatientList(url);
    } else {
      console.error("fetchPatientList function is missing!");
    }
  }

  selectedPatientName = null;
}

let isRecording = false;
let currentRecordingPatient = "Common Recording";
let selectedPatientName = null;

function handleRecordingClick() {
  let patientName = selectedPatientName || "Common Recording";

  if (isRecording) {
    if (currentRecordingPatient === patientName) {
      stopRecording();
    } else {
      // showNotification(`Already recording for (${currentRecordingPatient}). Stop it first!`, "warning");
    }
    return;
  }

  // Start recording
  isRecording = true;
  currentRecordingPatient = patientName;

  if (currentRecordingPatient !== 'Common Recording') {
    // Temporarily override toastr options
    const prevOptions = { ...toastr.options }; // Save current global options

    toastr.options = {
      "positionClass": "toast-top-left",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
    };

    toastr.info(`Recording started for (${patientName})`);

    // Restore previous toastr options
    toastr.options = prevOptions;
  }

  // updateRecordingUI(patientName, true); // Show recording icon
  // startTimer();
}

function stopRecording() {
  if (!isRecording) return;

  // showNotification(`Recording stopped for (${currentRecordingPatient})`, "success");

  //  Properly remove the recording icon
  updateRecordingUI(currentRecordingPatient, false);

  isRecording = false;
  currentRecordingPatient = "Common Recording";
  stopTimer();
}

// Initialize the visualizer and audio analyser
function initAudioAnalyser(stream, canvas) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();

  // Use a larger FFT size for better frequency resolution
  analyser.fftSize = 512; // Increased from 256
  analyser.minDecibels = -90; // Lower minimum dB for quieter sounds
  analyser.maxDecibels = -10; // Adjusted max dB for better sensitivity
  analyser.smoothingTimeConstant = 0.4; // Less smoothing for more responsiveness

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function drawVisualizer() {
    analyser.getByteFrequencyData(dataArray);
    const canvasContext = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // Clear canvas
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
    canvasContext.fillStyle = '#b3e5fc';
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / analyser.frequencyBinCount) * 25;
    let x = 0;

    // Amplify the values for better visibility with quiet sounds
    const amplificationFactor = 1.5; // Increase this for more sensitivity

    for (let i = 0; i < analyser.frequencyBinCount; i++) {
      // Apply amplification and ensure it doesn't exceed canvas height
      let barHeight = Math.min((dataArray[i] / 255) * HEIGHT * amplificationFactor, HEIGHT);

      // Add a minimum height for very quiet sounds to make them visible
      if (dataArray[i] > 0 && barHeight < 2) barHeight = 2;

      // Gradient color based on intensity
      const intensity = dataArray[i] / 255;
      canvasContext.fillStyle = `rgb(${Math.floor(100 + intensity * 155)}, ${Math.floor(50 + intensity * 50)}, 50)`;
      canvasContext.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
    requestAnimationFrame(drawVisualizer);
  }

  drawVisualizer();
}

// Set up the visualizer by creating the canvas and calling initAudioAnalyser
function setupVisualizer(canvas, stream) {
  canvas.width = 50;  // Width of 50px
  canvas.height = 20; // Height of 20px

  initAudioAnalyser(stream, canvas);
}

// Update the UI with the visualizer
function updateRecordingUI(patientName, showIcon) {
  document.querySelectorAll('.navi-link').forEach(link => {
    const nameElement = link.querySelector('.navi-text');

    if (nameElement && nameElement.textContent.trim() === patientName) {
      let visualizerElement = nameElement.querySelector('.audio-visualizer');

      if (showIcon) {
        // Add the audio visualizer if it doesn't exist
        if (!visualizerElement) {
          const visualizer = document.createElement('canvas');
          visualizer.className = 'audio-visualizer';
          visualizer.style.paddingLeft = '5px';
          visualizer.style.marginBottom = '-2px';
          nameElement.appendChild(visualizer);

          // Initialize the visualizer with the audio stream
          setupVisualizer(visualizer, stream);
        }
      } else {
        // Remove the visualizer if it exists when stopping recording
        if (visualizerElement) {
          visualizerElement.remove();
        }
      }
    }
  });
}

let activePatientName = '';
// Attach click listener to all patient list items
document.addEventListener("click", (e) => {
  var li = e.target.closest("li");
  if (li && li.classList.contains("active-li")) {
    var nameSpan = li.querySelector(".navi-text.font-semibold");
    if (nameSpan) {
      activePatientName = nameSpan.textContent.trim();
    }
  }
});

window.onDemandSummaryCall = function() {
  const summaryDiv = document.querySelector(".summary-container");
  const planDiv = document.querySelector(".assessment-plan-container");
  const token = localStorage.getItem('access_token');

  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }
  toastr.success(`reSuture Started for Patient ${patientName}`);

  // ✅ Remove SOAP notification dots when starting job
  const soapTab = Array.from(document.querySelectorAll('#navTabsDropdown .nav-link'))
    .find(link => link.querySelector('.nav-text')?.textContent.trim() === 'SOAP');
  if (soapTab) {
    const dot = soapTab.querySelector('.notification-dot');
    if (dot) dot.remove();
  }

  const soapButton = document.getElementById('onDemandSummaryCall');
  if (soapButton) {
    const btnDot = soapButton.querySelector('.notification-dot');
    if (btnDot) btnDot.remove();
  }

  // ✅ Add spinner next to selected patient
  const patientItems = document.querySelectorAll(".navi-item");
  let selectedItem = null;

  patientItems.forEach((item) => {
    const nameSpan = item.querySelector(".navi-text");
    const nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        const existingSpinner = item.querySelector(".spinner-icon");
        const existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();

        const spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });

  // ✅ Send the API request with error handling
  fetch(`${BASE_URL}ondemand/generate-jobs-on-demand?patient_name=${encodeURIComponent(patientName)}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 504 || response.status >= 500) {
          console.warn("Server timeout or internal error occurred, but continuing to wait on socket...");
          return null;
        }
        return response.json().then(err => {
          console.log(err.error)
          if (err.error) {
            toastr.warning(err.error);

            // ❌ Remove spinner for this patient
            patientItems.forEach((item) => {
              const nameSpan = item.querySelector(".navi-text");
              if (nameSpan && nameSpan.textContent.trim() === patientName) {
                const spinner = item.querySelector(".spinner-icon");
                if (spinner) {
                  // Create the Font Awesome times icon
                  const crossIcon = document.createElement("i");
                  crossIcon.className = "fas fa-times cross-icon";
                  crossIcon.style.marginLeft = "10px";
                  crossIcon.style.color = "#F64E60"; // Optional: red color for error

                  // Replace spinner with the cross icon
                  spinner.replaceWith(crossIcon);
                }

                // Scroll to the patient when there's an error
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            });
            setTimeout(() => {
              socket.disconnect();
            }, 2000);
          }
          return null;
        });
      }
      return response.json();
    })
    .catch(err => {
      console.warn("Fetch failed, but still listening on socket:", err.message);
    });

  // ✅ Open Socket.IO connection
  const socket = io(`${window.BASE_URL}`, {
    transports: ['websocket', 'polling'],
    reconnection: true
  });

  socket.on('connect', () => {
    console.log('WebSocket connected');
  });
  socket.on('connect_error', (err) => {
    console.error('Connection Error:', err.message);
  });
  socket.on('disconnect', (reason) => {
    console.warn('Socket disconnected:', reason);
  });

  // socket.on('job_error', function(data) {
  //   console.log(data)
  //   // Validate user and patient name match
  //   if (data.patient_name === patientName && data.user === urlUserName) {
  //     // Show Toastr error
  //     const message = `Job failed for ${data.patient_name}: ${data.error}`;
  //     toastr.error(message, 'Error');

  //     // Remove spinner for this patient
  //     patientItems.forEach((item) => {
  //       const nameSpan = item.querySelector(".navi-text");
  //       if (nameSpan && nameSpan.textContent.trim() === patientName) {
  //         const spinner = item.querySelector(".spinner-icon");
  //          if (spinner) {
  //           // Create the cross icon
  //           const crossIcon = document.createElement("span");
  //           crossIcon.classList.add("cross-icon");
  //           crossIcon.innerHTML = "&times;"; // × symbol

  //           // Replace spinner with cross icon in the same parent and position
  //           spinner.replaceWith(crossIcon);
  //         }

  //         // Scroll to the patient for visibility
  //         item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //       }
  //     });
  //   }
  // });

  // ✅ Listen for job completion
  socket.on("job_generated", (socketData) => {
    if (socketData.patient_name === patientName) {
      // if (socketData.user === urlUserName) {
        // ✅ Remove spinner and add tick mark
        patientItems.forEach((item) => {
          const nameSpan = item.querySelector(".navi-text");
          const nameSpinner = item.querySelector(".navi-spinner");
          if (nameSpan && nameSpan.textContent.trim() === patientName) {
            // Remove spinner if exists
            const existingSpinner = item.querySelector(".spinner-icon");
            if (existingSpinner) existingSpinner.remove();

            // Remove tick if exists
            const existingTick = item.querySelector(".tick-icon");
            if (existingTick) existingTick.remove();

            if (!item.querySelector(".tick-icon")) {
              const tick = document.createElement("i");
              tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
              tick.style.color = "#0b6fac";

              const link = document.createElement("a");
              link.className = "navi-link";
              link.style.display = "none";
              link.href = "#";

              // Wrap the link in a <li> (to ensure parent exists and has class 'navi-item')
              const wrapper = document.createElement("li");
              wrapper.className = "navi-item";
              wrapper.style.display = "none";
              wrapper.appendChild(link);

              // Append both tick and wrapper to DOM
              nameSpinner.parentNode.appendChild(tick);
              nameSpinner.parentNode.appendChild(wrapper); // Now link has a parentElement

              link.addEventListener("click", (e) => {
                e.preventDefault();
                fetchActivePatientSegments(patientName, link);
              });
              
              // ✅ Auto trigger
              // link.click();
              // const link = document.createElement("a");
              // link.className = "navi-link";
              // link.href = "#";
              // link.textContent = patientName;

              // // Simulate that link has a parent to avoid null parentElement
              // const tempWrapper = document.createElement("li");
              // tempWrapper.className = "navi-item";
              // tempWrapper.appendChild(link);
              // fetchActivePatientSegments(patientName, link);
            }

            // Scroll to the patient when job is complete
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });

        const diagnosis = socketData.file_content["Principal Diagnosis"] || "";
        const diagnosisItems = document.querySelectorAll('li.navi-item');

        diagnosisItems.forEach(item => {
          const nameSpan = item.querySelector('.navi-text.font-semibold');
          const diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');

          if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
            const truncatedDiagnosis = diagnosis.length > 35
              ? diagnosis.substring(0, 35) + '...'
              : diagnosis;
            diagnosisSpan.textContent = truncatedDiagnosis;
          }
        });

        toastr.success(`reSuture Updated for Patient ${patientName}`);

        // ✅ Reset all SOAP thumbs (remove active)
        const soapIds = [
          "summary-container",
          "assessment-container",
          "review-of-system-id",
          "physical-exam-id",
          "assessment-plan-container"
        ];

        soapIds.forEach(id => {
          const card = document.querySelector(`.${id}`).closest('.kt-accordion-content');
          if (card) {
            const icons = card.querySelectorAll('.thumb-up, .thumb-down');
            icons.forEach(icon => icon.classList.remove('active'));
          }
        });

        // ✅ Update hidden soap url
        const hiddenSoap = document.getElementById("hd_soap_url");
        if (hiddenSoap) {
          hiddenSoap.value = socketData.s3_jobs_file_url;
        }

        if (activePatientName === patientName) {
          refreshSoapSections(patientName);
        }

        socket.disconnect(); // Optional
      // } else {
      //   console.log(`User mismatch: userFrom (${socketData.user}) !== urlUserName (${urlUserName})`);
      // }
    }
  });
}

window.onDemandHpCall = function() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }

  const patientItems = document.querySelectorAll(".navi-item");
  let selectedItem = null;

  patientItems.forEach((item) => {
    const nameSpan = item.querySelector(".navi-text");
    const nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        const existingSpinner = item.querySelector(".spinner-icon");
        const existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();

        const spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
  // Show "Loading..." message in all containers
  const sectionClassMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-section",
    "Chief Complaint": ".inside-chief-complaint-section",
    "History of Present Illness": ".inside-history-present-ill-section",
    "Past Medical History": ".inside-past-med-hist-section",
    "Past Surgical History": ".inside-past-surg-hist-section",
    "Medications": ".inside-medi-container-section",
    "Allergies": ".inside-allergy-container-section",
    "Family History": ".inside-family-container-section",
    "Social History": ".inside-social-container-section",
    "Review of Systems": ".inside-hp-ros-container-section",
    "Physical Examination": ".inside-phy-exam-section",
    "Assessment and Plan": ".inside-assess-plan-container-section"
  };

  for (const selector of Object.values(sectionClassMap)) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '<p style="font-size:14px;color:#999;">Loading...</p>';
    }
  }

  // Step 1: Open WebSocket connection immediately
  const socket = io(`${BASE_URL}`, {
    transports: ['websocket', 'polling'],
    reconnection: true
  });

  socket.on('connect', () => {
    console.log('🔌 WebSocket connected');
  });

  socket.on("hp_generated", ({ status, patient_name: pname, hp_content, user, s3_hp_file_url }) => {
    if (status === "success" && pname === patientName) { 
      // if (user === urlUserName) {
         // ✅ Reset all HP thumbs
        const hpIds = [
          "principal-diagnosis",
          "chief-complaint-container",
          "history-present-ill",
          "past-med-hist",
          "past-surg-hist",
          "medi-container",
          "allergy-container",
          "family-container",
          "social-container",
          "hp-ros-container",
          "phy-exam-container",
          "assess-plan-container"
        ];
        hpIds.forEach(id => {
          const card = document.querySelector(`.${id}`).closest('.kt-accordion-content');
          if (card) {
            const icons = card.querySelectorAll('.thumb-up, .thumb-down');
            icons.forEach(icon => icon.classList.remove('active'));
          }
        });

        document.getElementById("hd_hp_url").value = s3_hp_file_url;

        patientItems.forEach((item) => {
          const nameSpan = item.querySelector(".navi-text");
          const nameSpinner = item.querySelector(".navi-spinner");

          if (nameSpan && nameSpan.textContent.trim() === patientName) {
            // Remove spinner if exists
            const existingSpinner = item.querySelector(".spinner-icon");
            if (existingSpinner) existingSpinner.remove();

            // Remove tick if exists
            const existingTick = item.querySelector(".tick-icon");
            if (existingTick) existingTick.remove();

            if (!item.querySelector(".tick-icon")) {
              const tick = document.createElement("i");
              tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
              tick.style.color = "#0b6fac";

              const link = document.createElement("a");
              link.className = "navi-link";
              link.style.display = "none";
              link.href = "#";

              // link.addEventListener("click", (e) => {
              //   e.preventDefault();
              //   fetchActivePatientSegments(patientName, link);
              // });

              nameSpinner.parentNode.appendChild(tick);
              nameSpinner.parentNode.appendChild(link);

              // ✅ Auto trigger
              // link.click();
            }

            // Scroll to the patient when job is complete
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      // }

      if (hp_content && Object.keys(hp_content).length > 0) {
        if (activePatientName === patientName) {
          injectHpContent(hp_content); // Auto-inject if this patient is active
        }
        toastr.success("H&P generated successfully");
      } else {
        toastr.warning("H&P content is empty.");
      }
    }
    socket.disconnect();
  });


  // Listen for error
  socket.on("hp_error", ({ error, patient_name: pname }) => {
    if (pname === patientName) {
      toastr.error(error);
      console.error("Socket error:", error);
      socket.disconnect();
    }
  });

  // Step 2: Trigger backend job via POST
  fetch(`${BASE_URL}ondemand/generate-hp-on-demand?patient_name=${encodeURIComponent(patientName)}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      if (data.status !== 'success') {
        console.error("Backend returned:", data.error || data);
        toastr.error("❌ Failed to start H&P generation.");
        patientItems.forEach((item) => {
          const nameSpan = item.querySelector(".navi-text");
          if (nameSpan && nameSpan.textContent.trim() === patientName) {
            const spinner = item.querySelector(".spinner-icon");
            if (spinner) {
              // Create the Font Awesome times icon
              const crossIcon = document.createElement("i");
              crossIcon.className = "fas fa-times cross-icon";
              crossIcon.style.marginLeft = "10px";
              crossIcon.style.color = "#F64E60"; // Optional: red color for error

              // Replace spinner with the cross icon
              spinner.replaceWith(crossIcon);
            }

            // Scroll to the patient when there's an error
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
        Object.values(sectionClassMap).forEach(selector => {
          const container = document.querySelector(selector);
          if (container) {
            container.innerHTML = '';
          }
        });
        socket.disconnect();
      }
    })
    .catch(err => {
      toastr.error("❌ API call failed: " + err.message);
      console.error("API error:", err);
      patientItems.forEach((item) => {
        const nameSpan = item.querySelector(".navi-text");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          const spinner = item.querySelector(".spinner-icon");
          if (spinner) {
            // Create the Font Awesome times icon
            const crossIcon = document.createElement("i");
            crossIcon.className = "fas fa-times cross-icon";
            crossIcon.style.marginLeft = "10px";
            crossIcon.style.color = "#F64E60"; // Optional: red color for error

            // Replace spinner with the cross icon
            spinner.replaceWith(crossIcon);
          }

          // Scroll to the patient when there's an error
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      socket.disconnect();
    });
}

function injectHpContent(hpContent) {
  const sectionClassMap = {
    "Principal Diagnosis": ".inside-principal-diagnosis-section",
    "Chief Complaint": ".inside-chief-complaint-section",
    "History of Present Illness": ".inside-history-present-ill-section",
    "Past Medical History": ".inside-past-med-hist-section",
    "Past Surgical History": ".inside-past-surg-hist-section",
    "Medications": ".inside-medi-container-section",
    "Allergies": ".inside-allergy-container-section",
    "Family History": ".inside-family-container-section",
    "Social History": ".inside-social-container-section",
    "Review of Systems": ".inside-hp-ros-container-section",
    "Physical Examination": ".inside-phy-exam-section",
    "Assessment and Plan": ".inside-assess-plan-container-section"
  };

  marked.setOptions({ breaks: true });

  for (const [sectionName, selector] of Object.entries(sectionClassMap)) {
    const container = document.querySelector(selector);
    const content = hpContent[sectionName];

    if (container) {
      container.innerHTML = ''; // Clear "Loading..." or any old content

      if (content && content.trim() !== '') {
        // if (sectionName === "Assessment and Plan" || sectionName === "Review of Systems" || sectionName === "Physical Examination") {
          // const escaped = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          // container.innerHTML = `<p>${escaped.replace(/\n/g, '<br>')}</p>`;
          container.innerHTML = `${content.replace(/\n/g, '<br>')}`;
        // } else {
        //   container.innerHTML = marked.parse(formatToMarkdownSafe(content));
        // }
      } else {
        container.innerHTML = '<p class="text-xs">No data available.</p>';
      }
    }
  }
}

function formatToMarkdownSafe(text) {
  return text
    .replace(/\n•/g, '\n-')  // turn bullets into markdown lists
    .replace(/•/g, '- ')     // fallback for lone bullets
    .replace(/\n/g, '  \n'); // force markdown line breaks
}

window.onDemandDsCall = function() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }

  const patientItems = document.querySelectorAll(".navi-item");
  let selectedItem = null;

  patientItems.forEach((item) => {
    const nameSpan = item.querySelector(".navi-text");
    const nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        const existingSpinner = item.querySelector(".spinner-icon");
        const existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();

        const spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });

  const sectionClassMap = {
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Follow-up Care": ".inside-followup-care-container",
    "Principal Diagnosis": ".inside-principal-diagnosis-container"
  };

  for (const selector of Object.values(sectionClassMap)) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '<p style="font-size:14px;color:#999;">Loading...</p>';
    }
  }

  const socket = io(BASE_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true
  });

  socket.on('connect', () => {
    console.log('🔌 WebSocket connected');
  });

  // Updated: Listen to 'ds_generated'
  socket.on("ds_generated", ({ status, patient_name: pname, ds_content, user, s3_ds_file_url }) => {
    if (status === "success" && pname === patientName) {
      // ✅ Reset all DS thumbs
      const dsIds = [
        "discharge-condition-container",
        "discharge-diagnoses-container",
        "discharge-disposition-container",
        "discharge-instructions-container",
        "discharge-medications-container",
        "discharge-summary-container",
        "followup-care-container",
        "principal-diagnosis-container"
      ];
      dsIds.forEach(id => {
        const card = document.querySelector(`.${id}`).closest('.kt-accordion-content');
        if (card) {
          const icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(icon => icon.classList.remove('active'));
        }
      });
      
      document.getElementById("hd_ds_url").value = s3_ds_file_url;

      patientItems.forEach((item) => {
        const nameSpan = item.querySelector(".navi-text");
        const nameSpinner = item.querySelector(".navi-spinner");

        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          // Remove spinner if exists
          const existingSpinner = item.querySelector(".spinner-icon");
          if (existingSpinner) existingSpinner.remove();

          // Remove tick if exists
          const existingTick = item.querySelector(".tick-icon");
          if (existingTick) existingTick.remove();

          if (!item.querySelector(".tick-icon")) {
            const tick = document.createElement("i");
            tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
            tick.style.color = "#0b6fac";

            const link = document.createElement("a");
            link.className = "navi-link";
            link.style.display = "none";
            link.href = "#";

            // link.addEventListener("click", (e) => {
            //   e.preventDefault();
            //   fetchActivePatientSegments(patientName, link);
            // });

            nameSpinner.parentNode.appendChild(tick);
            nameSpinner.parentNode.appendChild(link);

            // ✅ Auto trigger
            // link.click();
          }

          // Scroll to the patient when job is complete
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      
      if (ds_content && Object.keys(ds_content).length > 0 ) {
        if (activePatientName === patientName) {
          injectDsContent(ds_content);  // updated to use ds_content
        }
        toastr.success("📄 Discharge Summary generated successfully.");
      } else {
        toastr.warning("Discharge Summary content is empty.");
      }
      socket.disconnect();
    }
  });

  // Updated: Listen to 'ds_error'
  socket.on("ds_error", ({ error, patient_name: pname }) => {
    if (pname === patientName) {
      toastr.error("⚠️ " + error);
      console.error("Socket error:", error);
      socket.disconnect();
    }
  });

  // Trigger backend POST request
  fetch(`${BASE_URL}ondemand/generate-ds-on-demand?patient_name=${encodeURIComponent(patientName)}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        toastr.error("❌ Failed to start Discharge Summary generation.");
        patientItems.forEach((item) => {
          const nameSpan = item.querySelector(".navi-text");
          if (nameSpan && nameSpan.textContent.trim() === patientName) {
            const spinner = item.querySelector(".spinner-icon");
            if (spinner) {
              // Create the Font Awesome times icon
              const crossIcon = document.createElement("i");
              crossIcon.className = "fas fa-times cross-icon";
              crossIcon.style.marginLeft = "10px";
              crossIcon.style.color = "#F64E60"; // Optional: red color for error

              // Replace spinner with the cross icon
              spinner.replaceWith(crossIcon);
            }

            // Scroll to the patient when there's an error
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
        Object.values(sectionClassMap).forEach(selector => {
          const container = document.querySelector(selector);
          if (container) {
            container.innerHTML = '';
          }
        });
        socket.disconnect();
      }
    })
    .catch(err => {
      toastr.error("❌ API call failed: " + err.message);
      console.error("API error:", err);
      patientItems.forEach((item) => {
        const nameSpan = item.querySelector(".navi-text");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          const spinner = item.querySelector(".spinner-icon");
          if (spinner) {
            // Create the Font Awesome times icon
            const crossIcon = document.createElement("i");
            crossIcon.className = "fas fa-times cross-icon";
            crossIcon.style.marginLeft = "10px";
            crossIcon.style.color = "#F64E60"; // Optional: red color for error

            // Replace spinner with the cross icon
            spinner.replaceWith(crossIcon);
          }

          // Scroll to the patient when there's an error
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      socket.disconnect();
    });
}

function injectDsContent(dsContent) {
  const sectionClassMap = {
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Follow-up Care": ".inside-followup-care-container",
    "Principal Diagnosis": ".inside-principal-diagnosis-container"
  };

  marked.setOptions({ breaks: true });

  for (const [sectionName, selector] of Object.entries(sectionClassMap)) {
    const container = document.querySelector(selector);
    const content = dsContent[sectionName];

    if (container) {
      container.innerHTML = ''; // Clear "Loading..." or old content

      if (content && content.trim() !== '') {
        const formattedText = content.replace(/\n/g, "<br>");
        container.innerHTML = `${formattedText}`;
        // const formatted = formatToMarkdownSafe(content);
        // container.innerHTML = marked.parse(formatted);
      } else {
        container.innerHTML = '<p class="text-xs">No data available.</p>';
      }
    }
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   const token = localStorage.getItem('access_token');
//   if (!token) {
//     window.location.href = '../index.html';
//   }
//   fetch(`${BASE_URL}authenticate/get-user-profile`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch user profile");
//       }
//       return response.json();
//     })
//     .then(data => {
//       const userName = data.username || "";
//       const userTimezone = data.user_timezone || "";
//       // document.getElementById("headerUserName").textContent = userName;
//       // document.getElementById("getUserNamePopup").textContent = userName;
//       // document.getElementById("getUserEmailId").textContent = data.email;
//       // document.getElementById("headerUserFirstLetter").textContent = userName.charAt(0).toUpperCase();

//       // Ensure select2 is fully initialized before setting the value
//       const timezoneSelect = $('#kt_select2_2');

//       // Wait until select2 is ready
//       if (timezoneSelect.hasClass("select2-hidden-accessible")) {
//         timezoneSelect.val(userTimezone).trigger("change");
//       } else {
//         // Retry until select2 initializes (use a small timeout)
//         const interval = setInterval(() => {
//           if ($('#kt_select2_2').hasClass("select2-hidden-accessible")) {
//             $('#kt_select2_2').val(userTimezone).trigger("change");
//             clearInterval(interval);
//           }
//         }, 100); // Check every 100ms
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching profile info:", error);
//       // Optionally redirect to login or show error message
//     });
// });

function copyAllRichText() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch(`${BASE_URL}copy_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ click_type: 'copy_all' })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        console.log(data.message);
      } else {
        console.error('Error:', data.error);
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    });

  // Create one container for all copy content
  const tempDiv = document.createElement('div');

  // Process all data-copy elements EXCEPT those containing inside-plan-section
  const elements = document.querySelectorAll('[data-copy="true"]');
  elements.forEach((el, index) => {
    // Skip if this element contains an inside-plan-section (we'll process that separately)
    if (el.querySelector('.inside-plan-section')) {
      return;
    }

    const clone = el.cloneNode(true);
    const parent = el.closest('.card-title');

    if (parent) {
      const span = document.createElement('span');
      span.style.fontWeight = 'bold';
      span.style.textDecoration = 'underline';

      while (clone.firstChild) {
        span.appendChild(clone.firstChild);
      }

      clone.appendChild(span);
    }

    tempDiv.appendChild(clone);
    if (parent) {
      tempDiv.appendChild(document.createElement('br'));
    }
    const nextElement = elements[index + 1];
    const nextIsListContainer = nextElement && nextElement.querySelector('ul, ol, li');

    if (parent || (!nextIsListContainer && index < elements.length - 1)) {
      tempDiv.appendChild(document.createElement('br'));
    }
  });

  // --- Process inside-plan-section ---
  // --- Process inside-plan-section ---
  const container = document.querySelector('.inside-plan-section');
  if (container) {
    const children = Array.from(container.children);
    children.forEach(child => {
      // If the child is a <div> and contains <strong>, treat as a section header
      if (child.tagName === 'DIV' && child.querySelector('strong')) {
        const strongDiv = document.createElement('div');
        strongDiv.style.fontWeight = 'bold';
        strongDiv.style.marginTop = '12px';
        strongDiv.innerHTML = child.innerHTML;
        tempDiv.appendChild(strongDiv);
      }

      // If the child is a <ul>, preserve it directly
      else if (child.tagName === 'UL') {
        const ulClone = child.cloneNode(true);
        ulClone.style.paddingLeft = '20px';
        ulClone.querySelectorAll('li').forEach(li => {
          li.textContent = li.textContent.replace(/^•\s*/, '');
          li.style.marginTop = '0';
        });
        tempDiv.appendChild(ulClone);
      }

      // If it's a normal text <div>, treat it as a paragraph
      else if (child.tagName === 'DIV' && child.textContent.trim()) {
        const p = document.createElement('div');
        p.textContent = child.textContent.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    });
  }
  // --- Copy to clipboard ---
  document.body.appendChild(tempDiv);
  const range = document.createRange();
  range.selectNodeContents(tempDiv);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      toastr.success('Rich text copied to clipboard!');
      $('.dropdown-menu').hide();
    } else {
      toastr.warning('Copy failed. Please try manually.');
    }
  } catch (err) {
    toastr.warning('Copy command failed: ' + err);
  }

  selection.removeAllRanges();
  document.body.removeChild(tempDiv);
}

function copyAllRichTextDshp(copyAttrValue) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // window.location.href = '../index.html';
    // return;
  }

  fetch(`${BASE_URL}copy_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ click_type: 'copy_all' })
  }).catch(console.error);

  let plainText = '';
  const tempDiv = document.createElement('div');
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.fontSize = '14px';

  const elements = document.querySelectorAll(`[data-copy="${copyAttrValue}"]`);

  const orderedDsSections = [
    'Principal Diagnosis',
    'Discharge Summary',
    'Discharge Diagnoses',
    'Discharge Medications',
    'Discharge Condition',
    'Discharge Disposition',
    'Discharge Instructions',
    'Follow-Up-Care'
  ];

  const orderedHpSections = [
    'Principal Diagnosis',
    'Chief Complaint',
    'History of Present Illness',
    'Past Medical History',
    'Past Surgical History',
    'Medications',
    'Allergies',
    'Family History',
    'Social History',
    'Review of System',
    'Physical Examination',
    'Assessment and Plan'
  ];

  const orderedSections = copyAttrValue === 'true-ds' ? orderedDsSections : orderedHpSections;

  orderedSections.forEach(sectionTitle => {
    const matchingEl = Array.from(elements).find(el => el.textContent.trim() === sectionTitle);
    if (!matchingEl) return;

    plainText += `\n${sectionTitle}\n`;

    const titleDiv = document.createElement('div');
    titleDiv.textContent = sectionTitle;
    titleDiv.style.fontWeight = 'bold';
    titleDiv.style.marginTop = '12px';
    titleDiv.style.textDecoration = 'underline';
    tempDiv.appendChild(titleDiv);
    tempDiv.appendChild(document.createElement('br'));
    const contentEl = matchingEl.closest('.card')?.querySelector(`.card-body div[data-copy="${copyAttrValue}"]`);
    if (!contentEl) return;

    const children = Array.from(contentEl.children);

    if (children.length === 0) {
      const rawText = contentEl.innerText || contentEl.textContent || '';
      if (rawText.trim()) {
        plainText += rawText.trim() + '\n';
        const p = document.createElement('div');
        p.textContent = rawText.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    } else {
      children.forEach(child => {
        const formattedText = child.innerHTML.replace(/\n/g, "<br>");
        plainText += `${formattedText}`;

        // if (child.tagName === 'P') {
        //   const text = child.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, '').trim();
        //   if (text) {
        //     plainText += text + '\n';
        //     const p = document.createElement('div');
        //     p.textContent = text;
        //     p.style.marginTop = '6px';
        //     tempDiv.appendChild(p);
        //   }
        // } else if (child.tagName === 'UL') {
        //   const lis = child.querySelectorAll('li');
        //   if (lis.length) {
        //     plainText += '\n';
        //     const ul = document.createElement('ul');
        //     ul.style.paddingLeft = '20px';
        //     lis.forEach(li => {
        //       let text = li.textContent.trim();
        //       if (!text.startsWith('•')) text = '• ' + text;
        //       plainText += wrapText(text, '        ', 80);
        //       const liElement = document.createElement('li');
        //       liElement.textContent = text.replace(/^•\s*/, '');
        //       liElement.style.marginTop = '4px';
        //       ul.appendChild(liElement);
        //     });
        //     tempDiv.appendChild(ul);
        //   }
        // } else if (child.textContent) {
        //   const raw = child.textContent.trim();
        //   if (raw) {
        //     plainText += raw + '\n';
        //     const p = document.createElement('div');
        //     p.textContent = raw;
        //     p.style.marginTop = '6px';
        //     tempDiv.appendChild(p);
        //   }
        // }
      });
    }

    plainText += '\n';
    tempDiv.appendChild(document.createElement('br'));
  });

  // Word wrap utility
  function wrapText(text, indent = '        ', maxLength = 80) {
    const words = text.split(' ');
    let result = '';
    let line = '';
    for (let word of words) {
      if ((line + word).length > maxLength) {
        result += indent + line.trim() + '\n';
        line = '';
      }
      line += word + ' ';
    }
    if (line) result += indent + line.trim() + '\n';
    return result;
  }

  // Copy to clipboard as rich + plain text
  document.body.appendChild(tempDiv);
  const range = document.createRange();
  range.selectNodeContents(tempDiv);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      toastr.success('Rich text copied to clipboard!');
      $('.dropdown-menu').hide();
    } else {
      toastr.warning('Copy failed. Please try manually.');
    }
  } catch (err) {
    toastr.warning('Copy command failed: ' + err);
  }

  selection.removeAllRanges();
  document.body.removeChild(tempDiv);
}

function copyRichText(id, event) {
  event.stopPropagation();
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch(`${BASE_URL}copy_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      click_type: 'copy'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        console.log(data.message);
      } else {
        console.error('Error:', data.error);
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
  const element = document.getElementById(id);
  if (!element) {
    toastr.warning('Element not found');
    return;
  }

  const planSection = element.querySelector('.inside-plan-section');

  let tempDiv = document.createElement('div');

  if (planSection) {
    const children = Array.from(planSection.children);
    children.forEach(child => {
      // If the child is a <div> and contains <strong>, treat as a section header
      if (child.tagName === 'DIV' && child.querySelector('strong')) {
        const strongDiv = document.createElement('div');
        strongDiv.style.fontWeight = 'bold';
        strongDiv.style.marginTop = '12px';
        strongDiv.innerHTML = child.innerHTML;
        tempDiv.appendChild(strongDiv);
      }

      // If the child is a <ul>, preserve it directly
      else if (child.tagName === 'UL') {
        const ulClone = child.cloneNode(true);
        ulClone.style.paddingLeft = '20px';
        ulClone.querySelectorAll('li').forEach(li => {
          li.textContent = li.textContent.replace(/^•\s*/, ''); // remove leading bullets
          li.style.marginTop = '0';
        });
        tempDiv.appendChild(ulClone);
      }

      // If it's a normal text <div>, treat it as a paragraph
      else if (child.tagName === 'DIV' && child.textContent.trim()) {
        const p = document.createElement('div');
        p.textContent = child.textContent.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    });
  } else {
    // No special formatting needed, clone entire element
    const clone = element.cloneNode(true); // deep clone
    tempDiv.appendChild(clone);
  }

  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px'; // hide off-screen
  document.body.appendChild(tempDiv);

  // Select content
  const range = document.createRange();
  range.selectNodeContents(tempDiv);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);


  try {
    const successful = document.execCommand('copy');
    if (successful) {
      toastr.success('Rich text copied to clipboard!');
      $('.dropdown-menu').hide();
    } else {
      toastr.warning('Copy failed. Please try manually.');
    }
  } catch (err) {
    toastr.warning('Copy command failed: ' + err);
  }

  selection.removeAllRanges();
  document.body.removeChild(tempDiv);
}

function closePatientInfo() {
  const modalEl = document.getElementById('kt_chat_modal_new');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  // Cleanup
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  document.body.classList.remove('modal-open');
  document.body.style = ''; // Reset body styles just in case
}

function deletePatientRecording(patientId, sessionId, state) {
  const token = localStorage.getItem("access_token");
  const response = fetch(`${BASE_URL_KINESIS}delete-recording`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      patient_id: patientId,
      session_id: sessionId
    })
  });

  const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
  if (pauseIcon) {
    togglePauseIcon(patientId, false);
  }

  clearInterval(state.timerInterval);

  state.mediaRecorder = null;
  state.stream = null;
  state.audioChunks = [];
  state.isPaused = false;
  state.seconds = 0;
  state.totalDuration = 0;
  state.pausedDuration = 0;
  state.lastResumeTime = null;
  state.lastPauseTime = null;

  const renderPatientRecording = document.querySelector('.render-patient-recording');
  const renderWaveTimer = document.querySelector('.wave-timer');

  renderPatientRecording.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
  renderPatientRecording.querySelector('.pause-icon-wrapper').style.display = 'none';
  renderPatientRecording.querySelector('.play-icon-wrapper').style.display = 'none';
  renderPatientRecording.querySelector('.stop-icon-wrapper').style.display = 'none';
  if (renderWaveTimer) {
    renderWaveTimer.querySelector('.recording-timer').style.display = 'none';
  }
  toastr.success('Audio discarded successfully!');
}

function togglePauseIcon(patientId, show) {
  const pauseIcon = document.querySelector(`.pause-icon.${patientId}`);
  if (!pauseIcon) return;

  if (show) {
    pauseIcon.classList.remove('hidden');
    pauseIcon.classList.add('visible');
  } else {
    pauseIcon.classList.remove('visible');
    pauseIcon.classList.add('hidden');
  }
}

function enableSutureNote() {
  const editText = document.getElementById('saveTranscriptEdits');
  editText.disabled = false;
}

async function refreshSoapSections(patientName) {
  const apiUrl = `${BASE_URL}summary/display-patient-jobs-output?patient_name=` + patientName;
  const token = localStorage.getItem('access_token');

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    const file_content = data.file_content || {};

    const summaryDiv = document.querySelector(".summary-container");
    const assessmentDiv = document.querySelector(".assessment-container");
    const planDiv = document.querySelector(".assessment-plan-container");
    const reviewDiv = document.querySelector(".review-of-system-id");
    const phyExamDiv = document.querySelector(".physical-exam-id");

    // Normalize keys (replace spaces with underscores)
    const newObj = {};
    for (const key in file_content) {
      if (file_content.hasOwnProperty(key)) {
        const newKey = key.replace(/\s/g, '_');
        newObj[newKey] = file_content[key];
      }
    }

    // --- Clinical Summary ---
    if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].trim() === "") {
      summaryDiv.innerHTML = `<p class='text-xs'>No Summary Available</p>`;
    } else {
      summaryDiv.innerHTML = `
        <div class="pt-0 inside-summary-section text-xs">
          ${newObj['Clinical_Summary'].replace(/\n/g, "<br>")}
        </div>`;
    }

    // --- Subjective / Interval Events ---
    if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].trim() === "") {
      assessmentDiv.innerHTML = `<p class='text-xs'>No Interval Events Available</p>`;
    } else {
      assessmentDiv.innerHTML = `
        <div class="pt-0 inside-assess-section text-xs">
          ${newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>")}
        </div>`;
    }

    // --- Assessment & Plan ---
    if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
      planDiv.innerHTML = `<p class='text-xs'>No Assessment Plan Available</p>`;
    } else {
      planDiv.innerHTML = `
        <div class="pt-0 inside-plan-section text-xs">
          ${newObj['Assessment_and_Plan'].replace(/\n/g, "<br>")}
        </div>`;
    }

    // --- Review of Systems ---
    if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
      reviewDiv.innerHTML = `<p class='text-xs'>No Review of System Available</p>`;
    } else {
      reviewDiv.innerHTML = `
        <div class="pt-0 inside-review-system-section text-xs">
          ${newObj['Review_of_Systems'].replace(/\n/g, "<br>")}
        </div>`;
    }

    // --- Physical Exam ---
    if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
      phyExamDiv.innerHTML = `<p class='text-xs'>No Physical Examination Available</p>`;
    } else {
      phyExamDiv.innerHTML = `
        <div class="pt-0 inside-physical-exam-section text-xs">
          ${newObj['Physical_Examination'].replace(/\n/g, "<br>")}
        </div>`;
    }

    // --- Diagnosis ---
    const diagnosis = newObj['Principal_Diagnosis'] || '● None documented';
    const diagnosisItems = document.querySelectorAll('li.navi-item');

    diagnosisItems.forEach(item => {
      const nameSpan = item.querySelector('.navi-text.font-semibold');
      const diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');

      if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
        const truncated = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
        diagnosisSpan.textContent = truncated;
        if (diagnosis.length <= 24) {
          diagnosisSpan.style.marginRight = '40px';
        }
      }
    });
    
    let soap_url  = document.getElementById('hd_soap_url').value; 
    if (soap_url && soap_url != 'undefined') {
      const part = soap_url.split("/")[3];
      const crtPatient = part.split("_")[1];
      displayFeedbackDesign(crtPatient);
    }


  } catch (error) {
    console.error("Error refreshing SOAP sections:", error);
  }
}



// Progress bar :: START
async function updateProgressBarOnce(patientId) {
  const bar = document.getElementById(`patient-progress-bar-${patientId}`);
  const label = document.getElementById(`patient-progress-label-${patientId}`);
  if (!bar || !label) return;

  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${BASE_URL}patient-progress-bar-redis`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();

    if (!res.ok || !Array.isArray(data) || !data.length) return;

    const { overall_status, pipeline_status } = data[0];

    // 🛑 If failed — no need to calculate or animate anything
    if (overall_status === "failed") {
      // Hide progress bar and label
      bar.style.display = "none";
      label.style.display = "none";
      const progressContainer = bar.parentElement;
      if (progressContainer) progressContainer.style.display = "none";

      // Find the matching patient item and add cross icon
      const patientItems = document.querySelectorAll(".navi-item");
      patientItems.forEach((item) => {
        const nameSpan = item.querySelector(".navi-text");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          // Remove any existing cross icons to avoid duplicates
          const existingCross = item.querySelector(".cross-icon");
          if (existingCross) existingCross.remove();

          // Create red cross icon
          const crossIcon = document.createElement("i");
          crossIcon.className = "fas fa-times cross-icon";
          crossIcon.style.marginLeft = "10px";
          crossIcon.style.color = "#F64E60"; // red color

          // Append to the patient item
          item.appendChild(crossIcon);
        }
      });

      // Toastr message
      toastr.error(reason || "Transcription failed");

      // Stop polling for this patient (no further API calls)
      if (progressIntervals[patientId]) {
        clearInterval(progressIntervals[patientId]);
        delete progressIntervals[patientId];
      }

      return; // ⛔ Stop further execution
    }

    let targetPercent = 0;

    if (pipeline_status?.transcription === "in_progress") targetPercent = 10;
    if (pipeline_status?.transcription === "completed") targetPercent = 25;

    if (
      overall_status === "completed" ||
      (
        pipeline_status?.transcription === "completed" &&
        pipeline_status?.analysis === "completed" &&
        pipeline_status?.job_generation === "completed"
      )
    ) {
      targetPercent = 100;
    }

    let currentPercent = parseInt(bar.style.width) || 0;

    const progressContainer = bar.parentElement;
    if (progressContainer) {
      progressContainer.style.display = "flex";
    }
    bar.style.display = "flex";
    if (label) label.style.display = "inline";

    // Smooth increase animation
    const animate = setInterval(() => {
      if (currentPercent < targetPercent) {
        currentPercent++;
        bar.style.width = `${currentPercent}%`;
        if (label) label.textContent = `${currentPercent}%`;
      } else {
        clearInterval(animate);

        // Stop polling if fully done
        if (targetPercent === 100 && progressIntervals[patientId]) {
          clearInterval(progressIntervals[patientId]);
          delete progressIntervals[patientId];
          bar.style.display = "none";
          label.style.display = "none";
          if (progressContainer) progressContainer.style.display = "none";
        }
      }
    }, 50);

  } catch (err) {
    console.error("Progress fetch error:", err);
  }
}
// Progress bar :: END

// Notes :: start
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const summaryContainer = document.getElementById('summary-container');
  const assessContainer = document.getElementById('assessment-container');
  const assessPlanContainer = document.getElementById('assessment-plan-container');
  const reviewofSystemContainer = document.getElementById('review-of-system-id');
  const phyExamContainer = document.getElementById('physical-exam-id');

    const dictatedBtn = document.getElementById("tab_pastAdmission");
    const uploadedBtn = document.getElementById("tab_encounter");
    // const enableBtn = document.getElementById("tab_enable");
    const textarea = document.getElementById("upload_textarea");
    const errorMsg = document.getElementById("tab_error");
    const submitBtn = document.getElementById("upload_submit");
    const drawerEl = document.getElementById("drawer_end");
    const closeBtn = document.getElementById("upload_close");

    let selectedTab = null;
    // let tabsEnabled = false;

    function resetDrawerForm() {
        selectedTab = null;
        // tabsEnabled = false;

        // dictatedBtn.disabled = true;
        // uploadedBtn.disabled = true;

        dictatedBtn.classList.add("bg-white");
        dictatedBtn.classList.remove("bg-[#dbeeff]");

        uploadedBtn.classList.add("bg-white");
        uploadedBtn.classList.remove("bg-[#dbeeff]");

        textarea.value = "";
        errorMsg.classList.add("hidden");
    }

    document.getElementById("open_upload_drawer")
        .addEventListener("click", resetDrawerForm);

        // enableBtn.onclick = () => {
        // tabsEnabled = true;
        // dictatedBtn.disabled = false;
        // uploadedBtn.disabled = false;

        // dictatedBtn.classList.remove("opacity-50");
        // uploadedBtn.classList.remove("opacity-50");
    // };

    function resetButtons() {
        dictatedBtn.classList.add("bg-white");
        dictatedBtn.classList.remove("bg-[#dbeeff]");

        uploadedBtn.classList.add("bg-white");
        uploadedBtn.classList.remove("bg-[#dbeeff]");
    }

    dictatedBtn.onclick = () => {
        // if (!tabsEnabled) return;

        resetButtons();
        dictatedBtn.classList.remove("bg-white");
        dictatedBtn.classList.add("bg-[#dbeeff]");
        selectedTab = "past_admission";
        errorMsg.classList.add("hidden");
    };

    uploadedBtn.onclick = () => {
        // if (!tabsEnabled) return;

        resetButtons();
        uploadedBtn.classList.remove("bg-white");
        uploadedBtn.classList.add("bg-[#dbeeff]");
        selectedTab = "current_encounter";
        errorMsg.classList.add("hidden");
    };

    textarea.addEventListener("focus", (e) => {
        if (!selectedTab) {
            e.preventDefault();
            textarea.blur();
            errorMsg.classList.remove("hidden");
        }
    });

   closeBtn.addEventListener("click", function () {
        const drawer = KTDrawer.getInstance(drawerEl);
        if (drawer) drawer.hide();
    });

  // 🔹 Submit button
  submitBtn.addEventListener("click", async function () {
  try {
    const patientName = document.getElementById("addModalPatientName").textContent.trim();
    const noteContext = selectedTab;
    const content = textarea.value.trim();

    if (!noteContext) {
            toastr.warning("Select one context");
            errorMsg.classList.remove("hidden");
            return;
        }
    if (!content) {
            toastr.warning("Enter some content.");
            return;
        }

         const drawer = KTDrawer.getInstance(drawerEl);
        if (drawer) drawer.hide();

        // 🔹 Create socket connection RIGHT AWAY (before fetch)
        const socket = io(`${BASE_URL}`, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          auth: { token }
        });

    socket.on("connect", () => {
      console.log("✅ WebSocket connected:");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket connection error:", err);
    });

    socket.on("soap_generated", (data) => {
      if (data.patient_name === patientName) {
        const fileContent = data.content;

        if (fileContent) {
          if (fileContent['Clinical Summary']) {
            summaryContainer.innerHTML = `<div class="pt-0 inside-summary-section" style="font-size: 12px;">${fileContent['Clinical Summary'].replace(/\n/g, "<br>")}</div>`;
          }
          if (fileContent['Subjective and Interval Events']) {
            assessContainer.innerHTML = `<div class="pt-0 inside-assess-section" style="font-size: 12px;">${fileContent['Subjective and Interval Events'].replace(/\n/g, "<br>")}</div>`;
          }
          if (fileContent['Review of Systems']) {
            reviewofSystemContainer.innerHTML = `<div class="pt-0 inside-review-system-section" style="font-size: 12px;">${fileContent['Review of Systems'].replace(/\n/g, "<br>")}</div>`;
          }
          if (fileContent['Physical Examination']) {
            phyExamContainer.innerHTML = `<div class="pt-0 inside-physical-exam-section" style="font-size: 12px;">${fileContent['Physical Examination'].replace(/\n/g, "<br>")}</div>`;
          }
          if (fileContent['Assessment and Plan']) {
            assessPlanContainer.innerHTML = `<div class="pt-0 inside-plan-section" style="font-size: 12px;">${fileContent['Assessment and Plan'].replace(/\n/g, "<br>")}</div>`;
          }
        }

        loadSutureFix(patientName);
      }
    });

    socket.on("transcription_failed", (data) => {
      if (data.user === urlUserName) {
        console.error("Transcription failed:", data.error);
        toastr.error("Transcription failed: " + data.error);
      }
    });

    // 🔹 Spinner/tick logic stays here ✅
    const patientItems = document.querySelectorAll(".navi-item");
    let selectedItem = null;
    patientItems.forEach((item) => {
      const nameSpan = item.querySelector(".navi-text");
      const nameSpinner = item.querySelector(".navi-spinner");
      if (nameSpan && nameSpan.textContent.trim() === patientName) {
        selectedItem = item; // Store the selected item for later scrolling

        // ✅ Always remove tick and spinner first
        const existingTick = item.querySelector(".tick-icon");
        if (existingTick) existingTick.remove();
        const existingSpinner = item.querySelector(".spinner-icon");
        if (existingSpinner) existingSpinner.remove();

        const spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        if (nameSpinner) {
          nameSpinner.parentNode.appendChild(spinner);
        }
      }
    });

    // 🔹 Continue with fetch request
    const payload = { patient_name: patientName, upload_context: noteContext, content };

    const response = await fetch(`${window.BASE_URL}ondemand/upload-note-manually`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      toastr.success(result.message || "Content saved successfully!");

      const part = result.master_s3_url.split("/")[3];
      const patientId = part.split("_")[1];

      checkSoapNotification(patientId, token);
      loadUploads(patientName, 'unarchived');
      if (selectedItem) {
        const spinner = selectedItem.querySelector(".spinner-icon");
        if (spinner) {
          const tick = document.createElement("i");
          tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
          tick.style.marginLeft = "10px";
          tick.style.color = "#0b6fac";
          spinner.replaceWith(tick);
        }
      }
      addExternalCounts('external_notes');
    } else {
      toastr.error(result.error || "Failed to save note.");
      if (selectedItem) {
        const spinner = selectedItem.querySelector(".spinner-icon");
        if (spinner) spinner.remove();
      }
    }

  } catch (err) {
    console.error("Error submitting note:", err);
    const patientName = document.getElementById("addModalPatientName").innerText.trim();
    const patientItems = document.querySelectorAll(".navi-item");
    patientItems.forEach((item) => {
      const nameSpan = item.querySelector(".navi-text");
      if (nameSpan && nameSpan.textContent.trim() === patientName) {
        const spinner = item.querySelector(".spinner-icon");
        if (spinner) spinner.remove();
      }
    });
  }
});

});


function addExternalCounts(clickType) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  fetch(`${BASE_URL}copy_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ click_type: clickType })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        console.log(data.message);
      } else {
        console.error('Error:', data.error);
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
}

window.updateLikeAndDisLike = async function(currentPatient, feedbackType, currentId) {
  const currentNoteTypeElement = document.getElementById('currentNoteType');
  const selectedTab = currentNoteTypeElement?.textContent.trim() || 'SOAP';

  let responseUrl = "";
  let responseType = "";
  if (selectedTab == 'SOAP') {
    responseUrl = document.getElementById('hd_soap_url').value;
    responseType = 'SOAP';
  } else if (selectedTab == 'H&P') {
    responseUrl = document.getElementById('hd_hp_url').value;
    responseType = 'HP';
  } else if (selectedTab == 'Discharge') {
    responseUrl = document.getElementById('hd_ds_url').value;
    responseType = 'DS';
  }
 
  if (!currentPatient || !responseUrl || !responseType || responseUrl === 'undefined') {
    toastr.warning("There is no record for this patient");
    return;
  }
  
  const card = document.querySelector(`.${currentId}`).closest('.kt-accordion-content');
  const token = localStorage.getItem('access_token');

  if (card && responseUrl != 'undefined') {
    const part = responseUrl.split("/")[3];
    const crtPatient = part.split("_")[1];

    const accordionItem = card.parentElement;
    const titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
    const titleSpan = titleToggle ? titleToggle.querySelector('span') : null;
    const title = titleSpan ? titleSpan.textContent.trim() : '';

    if (titleSpan) {
      const payload = {
        patient_id: crtPatient,
        response_type: responseType,
        response_url: responseUrl,
        fields: {
          [title]: { [feedbackType]: true }
        }
      };

      // clear active icons
      const icons = card.querySelectorAll('.thumb-up, .thumb-down');
      icons.forEach(icon => icon.classList.remove('active'));

      const response = await fetch(`${BASE_URL}summary/user_rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data) {
        const result = await fetch(`${BASE_URL}summary/display_user_rating?patient_id=${crtPatient}&response_type=${responseType}&response_url=${responseUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if(result.ok) {
          const response_data = await result.json();
          if (response_data.user_ratings && response_data.user_ratings.length > 0) {
            const ratings = response_data.user_ratings[0].good_bad;
            const ratingValue = ratings[title];

            // set active based on API response
            if (ratingValue === "good") {
              const upIcon = card.querySelector('.thumb-up');
              if (upIcon) upIcon.classList.add('active');
            } else if (ratingValue === "bad") {
              const downIcon = card.querySelector('.thumb-down');
              if (downIcon) downIcon.classList.add('active');
            }
          }
        }
      } else {
        toastr.warning("There is no record for this patient");
        return;
      }
    }
  }
}

let currentPatientId = null;
let currentCardId = null;

window.openCommentModal = function(currentPatient, cardId) {
  // Store the current patient and card ID for later use
  currentPatientId = currentPatient;
  currentCardId = cardId;
  
  // Reset the form
  const commentText = document.getElementById('commentText');
  const commentError = document.getElementById('commentError');
  
  if (commentText) commentText.value = "";
  if (commentError) commentError.style.display = "none";
  
  // Show the KT modal using the same pattern as showPatientModal
  const modalEl = document.getElementById('commentModal');
  
  if (modalEl) {
    // Get existing modal instance or create new one
    let modal = KTModal.getInstance(modalEl);
    
    if (!modal) {
      // Initialize the modal if it's not already initialized
      modal = new KTModal(modalEl);
    }
    
    // Show the modal
    modal.show();
    
    // Focus on textarea for better UX
    setTimeout(() => {
      if (commentText) {
        commentText.focus();
      }
    }, 100);
  }
};

// Save comment button event listener
const saveCommentBtn = document.getElementById('saveCommentBtn');
if (saveCommentBtn) {
  saveCommentBtn.addEventListener('click', async function() {
    const commentText = document.getElementById("commentText");
    const errorEl = document.getElementById("commentError");
    
    if (!commentText) {
      console.error("Comment textarea not found");
      return;
    }
    
    const comment = commentText.value.trim();
    
    if (!comment) {
      if (errorEl) {
        errorEl.style.display = "block"; // show error
      }
      return;
    }
    
    if (errorEl) {
      errorEl.style.display = "none"; // hide error
    }
    
    const currentNoteTypeElement = document.getElementById('currentNoteType');
    const selectedTab = currentNoteTypeElement?.textContent?.trim() || 'SOAP';
    
    let responseUrl = "";
    let responseType = "";
    
    if (selectedTab === 'SOAP') {
      const hdSoapUrl = document.getElementById('hd_soap_url');
      responseUrl = hdSoapUrl ? hdSoapUrl.value : "";
      responseType = 'SOAP';
    } else if (selectedTab === 'H&P') {
      const hdHpUrl = document.getElementById('hd_hp_url');
      responseUrl = hdHpUrl ? hdHpUrl.value : "";
      responseType = 'HP';
    } else if (selectedTab === 'Discharge') {
      const hdDsUrl = document.getElementById('hd_ds_url');
      responseUrl = hdDsUrl ? hdDsUrl.value : "";
      responseType = 'DS';
    }
    
    // Validate response URL
    if (!responseUrl || !responseType || responseUrl === 'undefined' || responseUrl === 'null') {
      toastr.warning("There is no record for this patient");
      
      // Close KT modal properly
      const modalEl = document.getElementById('commentModal');
      if (modalEl) {
        const modal = KTModal.getInstance(modalEl);
        if (modal) {
          modal.hide();
        }
      }
      return;
    }
    
    // Parse patient ID from response URL
    let crtPatient = null;
    try {
      // Assuming responseUrl format like: /something/patient_123/...
      const urlParts = responseUrl.split("/");
      const patientPart = urlParts.find(part => part.includes("patient_"));
      if (patientPart) {
        crtPatient = patientPart.split("_")[1];
      } else {
        // Fallback: try to extract from the URL structure
        const parts = responseUrl.split("/");
        if (parts.length > 1) {
          // Try to get patient ID from the path
          for (let part of parts) {
            if (part.startsWith("patient_")) {
              crtPatient = part.split("_")[1];
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error parsing patient ID:", error);
      toastr.error("Error parsing patient information");
      return;
    }
    
    if (!crtPatient) {
      toastr.error("Could not determine patient ID from the URL");
      return;
    }
    
    // Get the card element
    let title = '';
    let card = null;
    
    if (currentCardId) {
      const cardElement = document.querySelector(`.${currentCardId}`);
      if (cardElement) {
        card = cardElement.closest('.kt-accordion-content');
        if (card) {
          const accordionItem = card.parentElement;
          if (accordionItem) {
            const titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
            if (titleToggle) {
              const titleSpan = titleToggle.querySelector('span');
              if (titleSpan) {
                title = titleSpan.textContent.trim();
              }
            }
          }
        }
      }
    }
    
    if (!title) {
      title = 'Unknown Section';
    }
    
    const payload = {
      patient_id: crtPatient,
      response_type: responseType,
      response_url: responseUrl,
      fields: {
        [title]: { comment: comment }
      }
    };
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      toastr.error("Authentication required. Please log in again.");
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}summary/user_rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        let data = null;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.warn("Response was OK but not valid JSON");
        }
        
        toastr.success("Comment saved successfully!");
        
        // Close KT modal properly
        const modalEl = document.getElementById('commentModal');
        if (modalEl) {
          const modal = KTModal.getInstance(modalEl);
          if (modal) {
            modal.hide();
          }
        }
        
        // Clear textarea
        if (commentText) {
          commentText.value = '';
        }
        
        // Fetch updated ratings if data is available
        if (data || true) { // Always try to fetch updated ratings
          try {
            const result = await fetch(`${BASE_URL}summary/display_user_rating?patient_id=${crtPatient}&response_type=${responseType}&response_url=${encodeURIComponent(responseUrl)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            
            if (result.ok) {
              const responseData = await result.json();
              if (responseData.user_ratings && responseData.user_ratings.length > 0) {
                const ratings = responseData.user_ratings[0].good_bad;
                const ratingValue = ratings[title];
                
                // Update UI if card element exists
                if (card) {
                  // Remove existing active classes first
                  const upIcon = card.querySelector('.thumb-up');
                  const downIcon = card.querySelector('.thumb-down');
                  
                  if (upIcon) upIcon.classList.remove('active');
                  if (downIcon) downIcon.classList.remove('active');
                  
                  // Set active based on API response
                  if (ratingValue === "good") {
                    if (upIcon) upIcon.classList.add('active');
                  } else if (ratingValue === "bad") {
                    if (downIcon) downIcon.classList.add('active');
                  }
                }
              }
            }
          } catch (fetchError) {
            console.error("Error fetching updated ratings:", fetchError);
            // Don't show error toast for this - it's a secondary action
          }
        }
      } else {
        console.error("Failed to save comment. Status:", response.status);
        toastr.error("Failed to save comment. Please try again.");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      toastr.error("An error occurred while saving the comment.");
    }
  });
}

async function checkSoapNotification(patientId, token) {
  try {
    const soap_notes = await fetch(`${BASE_URL}ondemand/pending-soap-notes?patient_id=${patientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!soap_notes.ok) return;

    const soap_response = await soap_notes.json();

    // --- Find SOAP Tab (by text) ---
    const allNavLinks = document.querySelectorAll('#navTabsDropdown .nav-link');
    let soapTab = null;
    allNavLinks.forEach(link => {
      const textEl = link.querySelector('.nav-text');
      if (textEl && textEl.textContent.trim() === 'SOAP') {
        soapTab = link;
      }
    });

    // --- Button reference ---
    const soapButton = document.getElementById('onDemandSummaryCall');

    // --- Remove existing dots ---
    if (soapTab) {
      const oldDot = soapTab.querySelector('.notification-dot');
      if (oldDot) oldDot.remove();
    }
    if (soapButton) {
      const oldBtnDot = soapButton.querySelector('.notification-dot');
      if (oldBtnDot) oldBtnDot.remove();
    }

    // --- Add new dots if needed ---
    if (soap_response.needs_soap === true) {
      if (soapTab) {
        const tabDot = document.createElement('span');
        tabDot.className = 'notification-dot';
        tabDot.style.position = 'absolute';
        tabDot.style.top = '2px';
        tabDot.style.right = '2px';
        tabDot.style.width = '8px';
        tabDot.style.height = '8px';
        tabDot.style.backgroundColor = 'red';
        tabDot.style.borderRadius = '50%';
        tabDot.style.display = 'inline-block';
        soapTab.style.position = 'relative';
        soapTab.appendChild(tabDot);
      }

      if (soapButton) {
        const btnDot = document.createElement('span');
        btnDot.className = 'notification-dot';
        btnDot.style.position = 'absolute';
        btnDot.style.top = '0px';
        btnDot.style.right = '0px';
        btnDot.style.width = '10px';
        btnDot.style.height = '10px';
        btnDot.style.backgroundColor = 'red';
        btnDot.style.borderRadius = '50%';
        btnDot.style.display = 'inline-block';
        soapButton.style.position = 'relative';
        soapButton.appendChild(btnDot);
      }
    }

  } catch (err) {
    console.error("SOAP notification check failed:", err);
  }
}

function copyAllTimestamp(sectionId) {
  const container = document.getElementById(sectionId);
  if (!container) {
    toastr.warning('No content found to copy!');
    return;
  }

  let allText = "";
  let children = container.children;
  let block = [];

  for (let i = 0; i < children.length; i++) {
    let child = children[i];

    // Timestamps / Notes Date / Notes Type
    if (child.classList.contains("timestamp-section")) {
      block.push(child.innerText.trim());
    }

    // Main note content
    if (child.classList.contains("editable-section")) {
      let noteText = child.querySelector(".display-text")?.innerText.trim() || "";
      block.push(noteText);

      // End of one block
      allText += block.join("\n") + "\n\n";
      block = []; // reset for next block
    }
  }

  allText = allText.trim();

  if (allText) {
    navigator.clipboard.writeText(allText).then(
      () => toastr.success('Plain text copied to clipboard!'),
      err => console.error("Failed to copy: ", err)
    );
  } else {
    alert("No text available to copy.");
  }
}

// patient list dropdown :: start
let currentFilter = 'active';
let patientCounts = {
    active: 0,
    archive: 0,
    pending: 0
};

function setButtonState(buttonId, isDisabled, opacity) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = isDisabled;
        button.style.opacity = opacity;
    }
}

// Function to update which suture button is visible
function updateVisibleSutureButton(noteType) {
    // Hide all suture buttons
    document.querySelectorAll('.suture-btn').forEach(btn => {
        btn.classList.add('hidden');
    });
    
    // Show the correct button based on note type
    switch(noteType) {
        case 'SOAP':
            document.getElementById('onDemandSummaryCall')?.classList.remove('hidden');
            break;
        case 'H&P':
            document.getElementById('onDemandHpCall')?.classList.remove('hidden');
            break;
        case 'Discharge':
            document.getElementById('onDemandDsCall')?.classList.remove('hidden');
            break;
    }
}
function hideAllFeedback() {
  document.querySelectorAll('.thumb-up, .thumb-down, .comment').forEach(icon => {
    icon.style.display = 'none';
  });
}

function showAllFeedback() {
  document.querySelectorAll('.thumb-up, .thumb-down, .comment').forEach(icon => {
    icon.style.display = 'block';
  });
}

function updateButtonStates() {
    // Get current filter
    const currentFilterElement = document.getElementById('currentFilter');
    const currentFilterText = currentFilterElement?.textContent.trim() || 'Active';
    
    // Get current note type
    const currentNoteTypeElement = document.getElementById('currentNoteType');
    const currentNoteType = currentNoteTypeElement?.textContent.trim() || 'SOAP';
        
    // Update which button is visible
    updateVisibleSutureButton(currentNoteType);
    
    // Apply enabled/disabled state based on filter
    if (currentFilterText === 'Active') {
        // Enable buttons based on current note type
        if (currentNoteType === 'SOAP') {
            setButtonState('onDemandSummaryCall', false, '1');
        } else if (currentNoteType === 'H&P') {
            setButtonState('onDemandHpCall', false, '1');
        } else if (currentNoteType === 'Discharge') {
            setButtonState('onDemandDsCall', false, '1');
        }
    } else if (currentFilterText === 'Archived') {
        // Disable buttons based on current note type
        if (currentNoteType === 'SOAP') {
            setButtonState('onDemandSummaryCall', true, '0.5');
        } else if (currentNoteType === 'H&P') {
            hideAllFeedback();
            setButtonState('onDemandHpCall', true, '0.5');
        } else if (currentNoteType === 'Discharge') {
            hideAllFeedback();
            setButtonState('onDemandDsCall', true, '0.5');
        }
    }
}


function updateCopyButton(noteType) {
    const copyAllButton = document.getElementById("dropdownMenuButton");
    if (!copyAllButton) return;
    
    switch(noteType) {
        case 'SOAP':
            copyAllButton.setAttribute('onclick', "copyAllPlainText()");
            break;
        case 'H&P':
            copyAllButton.setAttribute('onclick', "copyAllPlainTextDshp('true-hp')");
            break;
        case 'Discharge':
            copyAllButton.setAttribute('onclick', "copyAllPlainTextDshp('true-ds')");
            break;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.getElementById("noteTypeButton");
    const dropdown = document.getElementById("navTabsDropdown");
    const navLinks = document.querySelectorAll('#navTabsDropdown .nav-linkDropdown');

    // Handle dropdown toggle
    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
                dropdown.classList.add("hidden");
            }
        });
    }

    const patientDetails = document.querySelector('.overall-patient-details');
    const patientHpDetails = document.querySelector('.overall-handp-details');
    const patientDsDetails = document.querySelector('.overall-discharges-details');

    if (patientDetails) patientDetails.style.display = 'block';
    if (patientHpDetails) patientHpDetails.style.display = 'none';
    if (patientDsDetails) patientDsDetails.style.display = 'none';

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Remove active classes from all links
            navLinks.forEach(nav => {
                nav.classList.remove("active", "bg-light-secondary");
                nav.classList.remove("bg-[rgb(240,248,255)]", "font-semibold", "text-color");
            });

            // Add active classes to clicked link
            this.classList.add("active", "bg-light-secondary");
            this.classList.add("bg-[rgb(240,248,255)]", "font-semibold", "text-color");

            // Get the selected tab value and update button text
            const selectedTab = this.getAttribute('data-value');
            document.getElementById("currentNoteType").textContent = selectedTab;

            // Hide dropdown after selection
            dropdown.classList.add("hidden");
            
            // Update copy button
            updateCopyButton(selectedTab);

            // Get other elements
            const patientDetails = document.querySelector('.overall-patient-details');
            const patientHpDetails = document.querySelector('.overall-handp-details');
            const patientDsDetails = document.querySelector('.overall-discharges-details');
            const rawPatientDetails = document.querySelector('.overall-raw-transcription-system');
            const patientUploadDetails = document.querySelector('.overall-uploads-system');
            const patientSuturePhraseDetails = document.querySelector('.overall-suturephrase-system'); 

            // Handle display logic for different tabs
            if (selectedTab === 'SOAP') {
              const currentFilterElement = document.getElementById('currentFilter');
              const currentFilterText = currentFilterElement?.textContent.trim() || 'Active';

                // if (typeof refreshSoapSections === 'function' && selectedPatientName && currentFilterText === 'Active') {
                //     refreshSoapSections(selectedPatientName);
                // }
                if (patientDetails) patientDetails.style.display = 'block';
                if (patientHpDetails) patientHpDetails.style.display = 'none';
                if (patientDsDetails) patientDsDetails.style.display = 'none';
                if (patientUploadDetails) patientUploadDetails.style.display = 'none';
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
                if (rawPatientDetails) rawPatientDetails.style.display = 'none';
            }
            else if (selectedTab === 'H&P') {
                if (patientHpDetails) patientHpDetails.style.display = 'block';
                if (patientDetails) patientDetails.style.display = 'none';
                if (patientDsDetails) patientDsDetails.style.display = 'none';
                if (patientUploadDetails) patientUploadDetails.style.display = 'none';
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
                if (rawPatientDetails) rawPatientDetails.style.display = 'none';
            }
            else if (selectedTab === 'Discharge') {
                if (patientDsDetails) patientDsDetails.style.display = 'block';
                if (patientDetails) patientDetails.style.display = 'none';
                if (patientHpDetails) patientHpDetails.style.display = 'none';
                if (patientUploadDetails) patientUploadDetails.style.display = 'none';
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
                if (rawPatientDetails) rawPatientDetails.style.display = 'none';
            }
            else if (selectedTab === 'Transcript') {
                if (rawPatientDetails) rawPatientDetails.style.display = 'block';
                if (patientDetails) patientDetails.style.display = 'none';
                if (patientHpDetails) patientHpDetails.style.display = 'none';
                if (patientDsDetails) patientDsDetails.style.display = 'none';
                if (patientUploadDetails) patientUploadDetails.style.display = 'none';
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
            }
            else if (selectedTab === 'Uploads') {
                if (patientUploadDetails) patientUploadDetails.style.display = 'block';
                if (rawPatientDetails) rawPatientDetails.style.display = 'none';
                if (patientDetails) patientDetails.style.display = 'none';
                if (patientHpDetails) patientHpDetails.style.display = 'none';
                if (patientDsDetails) patientDsDetails.style.display = 'none';
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
            }
            else if (selectedTab === 'Suture Phrase') {
                if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'block';
                if (patientDetails) patientDetails.style.display = 'none';
                if (patientHpDetails) patientHpDetails.style.display = 'none';
                if (rawPatientDetails) rawPatientDetails.style.display = 'none';
                if (patientUploadDetails) patientUploadDetails.style.display = 'none';
                if (patientDsDetails) patientDsDetails.style.display = 'none';
            }
            else {
                if (patientDetails) patientDetails.style.display = 'none';
            }
            
            // Update button states after changing note type
            updateButtonStates();
        });
    });
});

function initializePatientSummary() {
    // Check if required elements exist before proceeding
    const dropdownButton = document.getElementById('filterDropdownButton');
    const dropdownMenu = document.getElementById('filterDropdown');
    
    if (!dropdownButton || !dropdownMenu) {
        console.error('Required DOM elements not found');
        return;
    }


    const active_url = `${window.BASE_URL}patient-name-list`;
    // fetchPatientList(active_url);
    showPatientList('active');
    
    // Initialize dropdown with active state and count
    updateDropdownSelection('active');
    
    // Dropdown toggle functionality
    dropdownButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.classList.add('hidden');
    });
    
    // Filter option selection
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // Update dropdown selection visually with count
            updateDropdownSelection(filter);
            
            // Call appropriate function based on filter
            if (filter === 'active') {
                const url = `${window.BASE_URL}patient-name-list`;
                fetchPatientList(url);
                showPatientList('active');
            } else if (filter === 'archive') {
                const url = `${window.BASE_URL}get-archived-patients`
                fetchArchivedPatientList(url);
                showPatientList('archive');
            }
            setTimeout(updateButtonStates, 100);
            
            dropdownMenu.classList.add('hidden');
        });
    });
}

function updateDropdownSelection(filter) {
    const currentFilterElement = document.getElementById('currentFilter');
    const filterOptions = document.querySelectorAll('.filter-option');
    
    // Get the count for the selected filter
    const count = patientCounts[filter] || 0;
    
    // Update dropdown button text with count
    if (currentFilterElement) {
        if (filter === 'active') {
            currentFilterElement.textContent = `Active`;
        } else if (filter === 'archive') {
            currentFilterElement.textContent = `Archived`;
        }
    }
    
    // Update active state in dropdown
    filterOptions.forEach(option => {
        const optionFilter = option.getAttribute('data-filter');
        const icon = option.querySelector('i');
        const text = option.querySelector('span:last-child');
        
        if (optionFilter === filter) {
            option.classList.add('active');
            if (icon) icon.classList.add('text-color');
            if (text) {
                text.classList.add('text-color', 'font-semibold');
                text.classList.remove('text-gray-500');
            }
        } else {
            option.classList.remove('active');
            if (icon) {
                icon.classList.remove('text-color');
                icon.classList.add('text-gray-500');
            }
            if (text) {
                text.classList.remove('text-color', 'font-semibold');
                text.classList.add('text-gray-500');
            }
        }
    });
}

function showPatientList(filter) {
    const patientItems = document.querySelectorAll('.patient-item');
    
    patientItems.forEach(item => {
        if (item.getAttribute('data-status') === filter) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Function to refresh patient counts (you can call this after adding/archiving patients)
function updatePatientCounts(activeCount, archiveCount, pendingCount) {
    // Update the global counts object
    patientCounts.active = activeCount;
    patientCounts.archive = archiveCount;
    
    // Update count display in dropdown
    const activeCountElement = document.getElementById('activePatientCount');
    const archiveCountElement = document.getElementById('archivePatientCount');
    
    if (activeCountElement) {
        activeCountElement.textContent = activeCount;
    }
    if (archiveCountElement) {
        archiveCountElement.textContent = archiveCount;
    }
    
    // Update current filter button with new count
    updateCurrentFilterDisplay();
}

function updateCurrentFilterDisplay() {
    const currentFilterElement = document.getElementById('currentFilter');
    if (!currentFilterElement) return;
    
    const count = patientCounts[currentFilter] || 0;
    if (currentFilter === 'active') {
        currentFilterElement.textContent = `Active`;
    } else if (currentFilter === 'archive') {
        currentFilterElement.textContent = `Archived`;
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with a small delay to ensure all elements are loaded
    setTimeout(function() {
        initializePatientSummary();
        updateButtonStates(); // Add this line
    }, 100);
    
    // Fetch initial patient counts
    if (typeof fetchPatientCounts === 'function') {
        fetchPatientCounts();
    }
});
// patient list dropdown :: end

