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
      window.location.href = './index.html';
    } else {
      console.log('JWT token is still valid.');
    }
  }
});

class StatusDataTableManager {
  constructor(tableElement) {
    this.tableElement = tableElement;
    this.tableBody = document.getElementById('tableBody');
    this.currentSort = { column: null, direction: 'asc' };
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.allData = [];
    this.filteredData = [];
    this.searchTerm = '';
    this.statusFilter = '';
    this.token = localStorage.getItem('access_token');
    this.isInitialized = false;
    this.loader = document.getElementById('smallLoader');
    
    // Initialize when DOM is ready
    if (this.tableElement) {
      this.init();
    }
  }

  init() {
    if (this.isInitialized) return;

    this.checkAuthToken();
    this.initSorting();
    this.initSearch();
    this.loadStatusData();
    this.isInitialized = true;
  }

  checkAuthToken() {
    const token = localStorage.getItem('access_token');
    const tokenTime = localStorage.getItem('access_token_time');

    if (!token) {
      this.redirectToLogin();
      return;
    }

    if (tokenTime) {
      const now = new Date().getTime();
      const timeDiff = now - parseInt(tokenTime, 10);

      if (timeDiff > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_time');
        this.redirectToLogin();
      }
    }
  }

  redirectToLogin() {
    window.location.href = '../index.html';
  }

  // Load status data from API
  loadStatusData() {
    this.showLoader();
    
    if (!this.token) {
      this.showEmptyState('Authentication required. Please login.', 7);
      this.hideLoader();
      return;
    }

    $.ajax({
      url: `${BASE_URL}background-status-page`,
      type: 'GET',
      headers: { "Authorization": `Bearer ${this.token}` },
      success: (response) => {
        this.hideLoader();
        if (response && response.length > 0) {
          this.allData = response.map(record => ({
            recording_id: record.recording_id,
            recording_type: record.recording_type,
            audio_file: record.s3_aud_file_path,
            created_at: record.created_at,
            status: record.overall_status,
            pipeline_status: record.pipeline_status,
            reason: record.reason,
            s3_txt_file_path: record.s3_txt_file_path,
            s3_audio_url: record.s3_audio_url,
            s3_jobs_file_path: record.s3_jobs_file_path,
            user_name: record.user_name,
            patient_name: record.patient_name
          }));
          this.applyFiltersAndRender();
          this.updateRecordCount();
        } else {
          this.showEmptyState('No records found', 7);
          this.updateRecordCount(0);
        }
      },
      error: (xhr, status, error) => {
        console.error("Error fetching status data:", error);
        this.hideLoader();
        this.showEmptyState('Error loading status data', 7);
        this.updateRecordCount(0);
      }
    });
  }

  // Update record count display
  updateRecordCount() {
    const totalRecords = this.allData.length;
    const filteredRecords = this.filteredData.length;
    const countDisplay = document.getElementById('userCountDisplay');
    
    if (countDisplay) {
      if (this.searchTerm || this.statusFilter) {
        countDisplay.textContent = `Showing ${filteredRecords} of ${totalRecords} records`;
      } else {
        countDisplay.textContent = `Showing ${totalRecords} records`;
      }
    }
  }

  // Render records in the table
  renderRecords() {
    if (this.filteredData.length === 0) {
      this.showEmptyState('No records found', 7);
      return;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageData = this.filteredData.slice(startIndex, endIndex);

    let tableHTML = '';
    pageData.forEach(record => {
      const audioFileName = record.audio_file ? record.audio_file.split('/').pop() : 'N/A';
      
      tableHTML += `
        <tr>
          <td>
            <div class="fw-bold text-primary">${record.recording_id || 'N/A'}</div>
          </td>
          <td>
            <span class="badge badge-light-info">${record.recording_type || 'N/A'}</span>
          </td>
          <td>
            <div class="audio-file-link" title="${record.audio_file || ''}">
              ${audioFileName}
            </div>
          </td>
          <td>
            <div class="text-gray-600">
              <div>${this.formatDate(record.created_at)}</div>
              <div class="fs-7">${this.formatTime(record.created_at)}</div>
            </div>
          </td>
          <td>
            ${this.renderStatusProgress(record)}
          </td>
          <td>
            ${record.reason && record.reason !== 'null' ? 
              `<span class="text-gray-700 fs-7">${record.reason}</span>` : 
              '<span class="text-muted">-</span>'}
          </td>
        </tr>
      `;
    });

    this.tableBody.innerHTML = tableHTML;
    this.updatePagination();
    this.updateRecordCount();
  }

  renderStatusProgress(record) {
    const status = record.status || '';
    const pipeline = record.pipeline_status || {};
    
    let progressWidth = 0;
    let progressClass = '';
    let progressText = '';
    let statusBadge = '';
    
    // Determine progress based on your logic
    const isFailed = status === 'failed' || 
        (pipeline && (
            pipeline.transcription === 'failed' ||
            pipeline.job_generation === 'failed' ||
            pipeline.analysis === 'failed'
        ));
    
    if (isFailed) {
        progressWidth = 100;
        progressClass = 'bg-danger';
        progressText = 'Failed';
    } else if (status === 'completed') {
        progressWidth = 100;
        progressClass = 'bg-success';
        progressText = 'Completed';
    } else if (pipeline.analysis === 'completed') {
        progressWidth = 75;
        progressClass = 'bg-primary';
        progressText = '75%';
    } else if (pipeline.job_generation === 'completed') {
        progressWidth = 50;
        progressClass = 'bg-primary';
        progressText = '50%';
    } else if (pipeline.transcription === 'completed') {
        progressWidth = 25;
        progressClass = 'bg-primary';
        progressText = '25%';
    } else {
        progressWidth = 10;
        progressClass = 'bg-warning';
        progressText = '10%';
    }
    
    // Create splits for vertical lines
    const splits = [25, 50, 75].map(percent => 
        `<div class="progress-split" style="left: ${percent}%"></div>`
    ).join('');
    
    return `
        <div class="progress-container">
            <!-- Stage Markers -->
            <div class="stage-marker">Trans</div>
            <div class="stage-marker">Seg</div>
            <div class="stage-marker">Job</div>
            <div class="stage-marker">Complete</div>
            
            <!-- Progress Bar -->
            <div class="progress-1 mt-2">
                ${splits}
                <div class="progress-sheen"></div>
                <div class="progress-bar-1 ${progressClass} progress-bar-striped progress-bar-animated-1" 
                     role="progressbar" 
                     style="width: ${progressWidth}%;"
                     aria-valuenow="${progressWidth}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                    ${progressText}
                </div>
            </div>
        </div>
    `;
}

  // Format date for display
  formatDate(dateString) {
    if (!dateString) return 'N/A';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  }

  // Format time for display
  formatTime(dateString) {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  }

  // Show empty state
  showEmptyState(message, colspan) {
    this.tableBody.innerHTML = `
      <tr>
        <td colspan="${colspan}" class="empty-state text-center p-3">
          <i class="ki-duotone ki-information-5 fs-2x text-gray-400 mb-4">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
          <h3 class="text-gray-600 fs-5">${message}</h3>
        </td>
      </tr>
    `;
    this.updatePagination();
    this.updateRecordCount();
  }

  // Apply filters and render
  applyFiltersAndRender() {
    this.filteredData = this.allData.filter(record => {
      const matchesSearch = !this.searchTerm ||
        (record.recording_id && record.recording_id.toLowerCase().includes(this.searchTerm)) ||
        (record.recording_type && record.recording_type.toLowerCase().includes(this.searchTerm)) ||
        (record.audio_file && record.audio_file.toLowerCase().includes(this.searchTerm)) ||
        (record.reason && record.reason.toLowerCase().includes(this.searchTerm));

      const matchesStatus = !this.statusFilter || 
        (record.status && record.status.toLowerCase() === this.statusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    });

    // Apply sorting if any
    if (this.currentSort.column) {
      this.sortData();
    }

    this.currentPage = 1;
    this.renderRecords();
  }

  // Sort data
  sortData() {
    if (!this.currentSort.column) return;

    this.filteredData.sort((a, b) => {
      let aValue = a[this.currentSort.column];
      let bValue = b[this.currentSort.column];

      // Special handling for date columns
      if (this.currentSort.column === 'created_at') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      } else {
        aValue = String(aValue || '').toLowerCase();
        bValue = String(bValue || '').toLowerCase();
      }

      if (aValue < bValue) return this.currentSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.currentSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Initialize sorting
  initSorting() {
    const sortableHeaders = this.tableElement.querySelectorAll('th.sortable');
    sortableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const column = header.getAttribute('data-sort');
        this.sortTable(column);
      });
    });
  }

  // Sort table
  sortTable(column) {
    this.tableElement.querySelectorAll('th.sortable').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
    });

    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    const currentHeader = this.tableElement.querySelector(`th[data-sort="${column}"]`);
    if (currentHeader) {
      currentHeader.classList.add(`sort-${this.currentSort.direction}`);
    }

    this.sortData();
    this.renderRecords();
  }

  // Initialize search
  initSearch() {
    const searchInput = document.getElementById('datatableSearch');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce(() => {
        this.searchTerm = searchInput.value.toLowerCase();
        this.applyFiltersAndRender();
      }, 300));
    }
  }

  // Update pagination - FIXED: Remove inline onclick handlers
  updatePagination() {
    const totalItems = this.filteredData.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    const startItem = ((this.currentPage - 1) * this.itemsPerPage) + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

    const paginationInfo = document.getElementById('paginationInfo');
    if (paginationInfo) {
      paginationInfo.textContent = totalItems > 0
        ? `Showing ${startItem} to ${endItem} of ${totalItems} entries`
        : '';
    }

    const paginationControls = document.getElementById('paginationControls');
    if (!paginationControls) return;

    let paginationHTML = '';

    // Previous button - use event delegation
    paginationHTML += `
      <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline pagination-btn prev-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
              data-page="${this.currentPage - 1}"
              ${this.currentPage === 1 ? 'disabled' : ''}>
        <i class="ki-duotone ki-left"><span class="path1"></span><span class="path2"></span></i>
      </button>
    `;

    // Page numbers - show limited pages
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button class="kt-btn kt-btn-sm pagination-btn ${this.currentPage === i ? 'kt-btn-primary' : 'kt-btn-outline'}" 
                data-page="${i}">
          ${i}
        </button>
      `;
    }

    // Next button
    paginationHTML += `
      <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline pagination-btn next-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
              data-page="${this.currentPage + 1}"
              ${this.currentPage === totalPages ? 'disabled' : ''}>
        <i class="ki-duotone ki-right"><span class="path1"></span><span class="path2"></span></i>
      </button>
    `;

    paginationControls.innerHTML = paginationHTML;
    
    // Add event listeners to pagination buttons
    this.addPaginationEventListeners();
  }

  // Add event listeners to pagination buttons
  addPaginationEventListeners() {
    const paginationControls = document.getElementById('paginationControls');
    if (!paginationControls) return;

    // Remove existing listeners first to avoid duplicates
    const newPaginationControls = paginationControls.cloneNode(true);
    paginationControls.parentNode.replaceChild(newPaginationControls, paginationControls);

    // Add click event listener to the container (event delegation)
    newPaginationControls.addEventListener('click', (event) => {
      const button = event.target.closest('.pagination-btn');
      if (button && !button.disabled) {
        const page = parseInt(button.getAttribute('data-page'));
        if (page) {
          this.goToPage(page);
        }
      }
    });
  }

  // Go to specific page
  goToPage(page) {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderRecords();
      
      // Scroll to top of table
      this.tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Show loader
  showLoader() {
    if (this.loader) {
      this.loader.style.display = 'flex';
    }
  }

  // Hide loader
  hideLoader() {
    if (this.loader) {
      this.loader.style.display = 'none';
    }
  }

  // Refresh the table
  refresh() {
    this.loadStatusData();
    toastr.info("Refreshing data...");
  }

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
}

// Global instance reference
let statusDataTableManagerInstance = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const tableElement = document.getElementById('status_table');
  if (tableElement) {
    statusDataTableManagerInstance = new StatusDataTableManager(tableElement);
    
    // Expose the refresh method globally for the refresh button
    window.refreshStatusTable = function() {
      if (statusDataTableManagerInstance) {
        statusDataTableManagerInstance.refresh();
      }
    };
    
    // Add event listener to any existing refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        if (statusDataTableManagerInstance) {
          statusDataTableManagerInstance.refresh();
        }
      });
    }
  }
});
