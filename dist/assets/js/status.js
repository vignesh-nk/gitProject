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
/*!*********************************!*\
  !*** ./src/assets/js/status.js ***!
  \*********************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      window.location.href = './index.html';
    } else {
      console.log('JWT token is still valid.');
    }
  }
});
var StatusDataTableManager = /*#__PURE__*/function () {
  function StatusDataTableManager(tableElement) {
    _classCallCheck(this, StatusDataTableManager);
    this.tableElement = tableElement;
    this.tableBody = document.getElementById('tableBody');
    this.currentSort = {
      column: null,
      direction: 'asc'
    };
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
  return _createClass(StatusDataTableManager, [{
    key: "init",
    value: function init() {
      if (this.isInitialized) return;
      this.checkAuthToken();
      this.initSorting();
      this.initSearch();
      this.loadStatusData();
      this.isInitialized = true;
    }
  }, {
    key: "checkAuthToken",
    value: function checkAuthToken() {
      var token = localStorage.getItem('access_token');
      var tokenTime = localStorage.getItem('access_token_time');
      if (!token) {
        this.redirectToLogin();
        return;
      }
      if (tokenTime) {
        var now = new Date().getTime();
        var timeDiff = now - parseInt(tokenTime, 10);
        if (timeDiff > 24 * 60 * 60 * 1000) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('access_token_time');
          this.redirectToLogin();
        }
      }
    }
  }, {
    key: "redirectToLogin",
    value: function redirectToLogin() {
      window.location.href = '../index.html';
    }

    // Load status data from API
  }, {
    key: "loadStatusData",
    value: function loadStatusData() {
      var _this = this;
      this.showLoader();
      if (!this.token) {
        this.showEmptyState('Authentication required. Please login.', 7);
        this.hideLoader();
        return;
      }
      $.ajax({
        url: "".concat(BASE_URL, "background-status-page"),
        type: 'GET',
        headers: {
          "Authorization": "Bearer ".concat(this.token)
        },
        success: function success(response) {
          _this.hideLoader();
          if (response && response.length > 0) {
            _this.allData = response.map(function (record) {
              return {
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
              };
            });
            _this.applyFiltersAndRender();
            _this.updateRecordCount();
          } else {
            _this.showEmptyState('No records found', 7);
            _this.updateRecordCount(0);
          }
        },
        error: function error(xhr, status, _error) {
          console.error("Error fetching status data:", _error);
          _this.hideLoader();
          _this.showEmptyState('Error loading status data', 7);
          _this.updateRecordCount(0);
        }
      });
    }

    // Update record count display
  }, {
    key: "updateRecordCount",
    value: function updateRecordCount() {
      var totalRecords = this.allData.length;
      var filteredRecords = this.filteredData.length;
      var countDisplay = document.getElementById('userCountDisplay');
      if (countDisplay) {
        if (this.searchTerm || this.statusFilter) {
          countDisplay.textContent = "Showing ".concat(filteredRecords, " of ").concat(totalRecords, " records");
        } else {
          countDisplay.textContent = "Showing ".concat(totalRecords, " records");
        }
      }
    }

    // Render records in the table
  }, {
    key: "renderRecords",
    value: function renderRecords() {
      var _this2 = this;
      if (this.filteredData.length === 0) {
        this.showEmptyState('No records found', 7);
        return;
      }
      var startIndex = (this.currentPage - 1) * this.itemsPerPage;
      var endIndex = startIndex + this.itemsPerPage;
      var pageData = this.filteredData.slice(startIndex, endIndex);
      var tableHTML = '';
      pageData.forEach(function (record) {
        var audioFileName = record.audio_file ? record.audio_file.split('/').pop() : 'N/A';
        tableHTML += "\n        <tr>\n          <td>\n            <div class=\"fw-bold text-primary\">".concat(record.recording_id || 'N/A', "</div>\n          </td>\n          <td>\n            <span class=\"badge badge-light-info\">").concat(record.recording_type || 'N/A', "</span>\n          </td>\n          <td>\n            <div class=\"audio-file-link\" title=\"").concat(record.audio_file || '', "\">\n              ").concat(audioFileName, "\n            </div>\n          </td>\n          <td>\n            <div class=\"text-gray-600\">\n              <div>").concat(_this2.formatDate(record.created_at), "</div>\n              <div class=\"fs-7\">").concat(_this2.formatTime(record.created_at), "</div>\n            </div>\n          </td>\n          <td>\n            ").concat(_this2.renderStatusProgress(record), "\n          </td>\n          <td>\n            ").concat(record.reason && record.reason !== 'null' ? "<span class=\"text-gray-700 fs-7\">".concat(record.reason, "</span>") : '<span class="text-muted">-</span>', "\n          </td>\n        </tr>\n      ");
      });
      this.tableBody.innerHTML = tableHTML;
      this.updatePagination();
      this.updateRecordCount();
    }
  }, {
    key: "renderStatusProgress",
    value: function renderStatusProgress(record) {
      var status = record.status || '';
      var pipeline = record.pipeline_status || {};
      var progressWidth = 0;
      var progressClass = '';
      var progressText = '';
      var statusBadge = '';

      // Determine progress based on your logic
      var isFailed = status === 'failed' || pipeline && (pipeline.transcription === 'failed' || pipeline.job_generation === 'failed' || pipeline.analysis === 'failed');
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
      var splits = [25, 50, 75].map(function (percent) {
        return "<div class=\"progress-split\" style=\"left: ".concat(percent, "%\"></div>");
      }).join('');
      return "\n        <div class=\"progress-container\">\n            <!-- Stage Markers -->\n            <div class=\"stage-marker\">Trans</div>\n            <div class=\"stage-marker\">Seg</div>\n            <div class=\"stage-marker\">Job</div>\n            <div class=\"stage-marker\">Complete</div>\n            \n            <!-- Progress Bar -->\n            <div class=\"progress-1 mt-2\">\n                ".concat(splits, "\n                <div class=\"progress-sheen\"></div>\n                <div class=\"progress-bar-1 ").concat(progressClass, " progress-bar-striped progress-bar-animated-1\" \n                     role=\"progressbar\" \n                     style=\"width: ").concat(progressWidth, "%;\"\n                     aria-valuenow=\"").concat(progressWidth, "\" \n                     aria-valuemin=\"0\" \n                     aria-valuemax=\"100\">\n                    ").concat(progressText, "\n                </div>\n            </div>\n        </div>\n    ");
    }

    // Format date for display
  }, {
    key: "formatDate",
    value: function formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        var date = new Date(dateString);
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
  }, {
    key: "formatTime",
    value: function formatTime(dateString) {
      if (!dateString) return '';
      try {
        var date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return '';
      }
    }

    // Show empty state
  }, {
    key: "showEmptyState",
    value: function showEmptyState(message, colspan) {
      this.tableBody.innerHTML = "\n      <tr>\n        <td colspan=\"".concat(colspan, "\" class=\"empty-state text-center p-3\">\n          <i class=\"ki-duotone ki-information-5 fs-2x text-gray-400 mb-4\">\n            <span class=\"path1\"></span>\n            <span class=\"path2\"></span>\n            <span class=\"path3\"></span>\n          </i>\n          <h3 class=\"text-gray-600 fs-5\">").concat(message, "</h3>\n        </td>\n      </tr>\n    ");
      this.updatePagination();
      this.updateRecordCount();
    }

    // Apply filters and render
  }, {
    key: "applyFiltersAndRender",
    value: function applyFiltersAndRender() {
      var _this3 = this;
      this.filteredData = this.allData.filter(function (record) {
        var matchesSearch = !_this3.searchTerm || record.recording_id && record.recording_id.toLowerCase().includes(_this3.searchTerm) || record.recording_type && record.recording_type.toLowerCase().includes(_this3.searchTerm) || record.audio_file && record.audio_file.toLowerCase().includes(_this3.searchTerm) || record.reason && record.reason.toLowerCase().includes(_this3.searchTerm);
        var matchesStatus = !_this3.statusFilter || record.status && record.status.toLowerCase() === _this3.statusFilter.toLowerCase();
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
  }, {
    key: "sortData",
    value: function sortData() {
      var _this4 = this;
      if (!this.currentSort.column) return;
      this.filteredData.sort(function (a, b) {
        var aValue = a[_this4.currentSort.column];
        var bValue = b[_this4.currentSort.column];

        // Special handling for date columns
        if (_this4.currentSort.column === 'created_at') {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        } else {
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }
        if (aValue < bValue) return _this4.currentSort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return _this4.currentSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Initialize sorting
  }, {
    key: "initSorting",
    value: function initSorting() {
      var _this5 = this;
      var sortableHeaders = this.tableElement.querySelectorAll('th.sortable');
      sortableHeaders.forEach(function (header) {
        header.addEventListener('click', function () {
          var column = header.getAttribute('data-sort');
          _this5.sortTable(column);
        });
      });
    }

    // Sort table
  }, {
    key: "sortTable",
    value: function sortTable(column) {
      this.tableElement.querySelectorAll('th.sortable').forEach(function (th) {
        th.classList.remove('sort-asc', 'sort-desc');
      });
      if (this.currentSort.column === column) {
        this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.currentSort.column = column;
        this.currentSort.direction = 'asc';
      }
      var currentHeader = this.tableElement.querySelector("th[data-sort=\"".concat(column, "\"]"));
      if (currentHeader) {
        currentHeader.classList.add("sort-".concat(this.currentSort.direction));
      }
      this.sortData();
      this.renderRecords();
    }

    // Initialize search
  }, {
    key: "initSearch",
    value: function initSearch() {
      var _this6 = this;
      var searchInput = document.getElementById('datatableSearch');
      if (searchInput) {
        searchInput.addEventListener('input', this.debounce(function () {
          _this6.searchTerm = searchInput.value.toLowerCase();
          _this6.applyFiltersAndRender();
        }, 300));
      }
    }

    // Update pagination - FIXED: Remove inline onclick handlers
  }, {
    key: "updatePagination",
    value: function updatePagination() {
      var totalItems = this.filteredData.length;
      var totalPages = Math.ceil(totalItems / this.itemsPerPage);
      var startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      var endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
      var paginationInfo = document.getElementById('paginationInfo');
      if (paginationInfo) {
        paginationInfo.textContent = totalItems > 0 ? "Showing ".concat(startItem, " to ").concat(endItem, " of ").concat(totalItems, " entries") : '';
      }
      var paginationControls = document.getElementById('paginationControls');
      if (!paginationControls) return;
      var paginationHTML = '';

      // Previous button - use event delegation
      paginationHTML += "\n      <button class=\"kt-btn kt-btn-sm kt-btn-icon kt-btn-outline pagination-btn prev-btn ".concat(this.currentPage === 1 ? 'disabled' : '', "\" \n              data-page=\"").concat(this.currentPage - 1, "\"\n              ").concat(this.currentPage === 1 ? 'disabled' : '', ">\n        <i class=\"ki-duotone ki-left\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n      </button>\n    ");

      // Page numbers - show limited pages
      var maxVisiblePages = 5;
      var startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (var i = startPage; i <= endPage; i++) {
        paginationHTML += "\n        <button class=\"kt-btn kt-btn-sm pagination-btn ".concat(this.currentPage === i ? 'kt-btn-primary' : 'kt-btn-outline', "\" \n                data-page=\"").concat(i, "\">\n          ").concat(i, "\n        </button>\n      ");
      }

      // Next button
      paginationHTML += "\n      <button class=\"kt-btn kt-btn-sm kt-btn-icon kt-btn-outline pagination-btn next-btn ".concat(this.currentPage === totalPages ? 'disabled' : '', "\" \n              data-page=\"").concat(this.currentPage + 1, "\"\n              ").concat(this.currentPage === totalPages ? 'disabled' : '', ">\n        <i class=\"ki-duotone ki-right\"><span class=\"path1\"></span><span class=\"path2\"></span></i>\n      </button>\n    ");
      paginationControls.innerHTML = paginationHTML;

      // Add event listeners to pagination buttons
      this.addPaginationEventListeners();
    }

    // Add event listeners to pagination buttons
  }, {
    key: "addPaginationEventListeners",
    value: function addPaginationEventListeners() {
      var _this7 = this;
      var paginationControls = document.getElementById('paginationControls');
      if (!paginationControls) return;

      // Remove existing listeners first to avoid duplicates
      var newPaginationControls = paginationControls.cloneNode(true);
      paginationControls.parentNode.replaceChild(newPaginationControls, paginationControls);

      // Add click event listener to the container (event delegation)
      newPaginationControls.addEventListener('click', function (event) {
        var button = event.target.closest('.pagination-btn');
        if (button && !button.disabled) {
          var page = parseInt(button.getAttribute('data-page'));
          if (page) {
            _this7.goToPage(page);
          }
        }
      });
    }

    // Go to specific page
  }, {
    key: "goToPage",
    value: function goToPage(page) {
      var totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
      if (page >= 1 && page <= totalPages) {
        this.currentPage = page;
        this.renderRecords();

        // Scroll to top of table
        this.tableElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    // Show loader
  }, {
    key: "showLoader",
    value: function showLoader() {
      if (this.loader) {
        this.loader.style.display = 'flex';
      }
    }

    // Hide loader
  }, {
    key: "hideLoader",
    value: function hideLoader() {
      if (this.loader) {
        this.loader.style.display = 'none';
      }
    }

    // Refresh the table
  }, {
    key: "refresh",
    value: function refresh() {
      this.loadStatusData();
      toastr.info("Refreshing data...");
    }

    // Debounce function
  }, {
    key: "debounce",
    value: function debounce(func, wait) {
      var timeout;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var context = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          return func.apply(context, args);
        }, wait);
      };
    }
  }]);
}(); // Global instance reference
var statusDataTableManagerInstance = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var tableElement = document.getElementById('status_table');
  if (tableElement) {
    statusDataTableManagerInstance = new StatusDataTableManager(tableElement);

    // Expose the refresh method globally for the refresh button
    window.refreshStatusTable = function () {
      if (statusDataTableManagerInstance) {
        statusDataTableManagerInstance.refresh();
      }
    };

    // Add event listener to any existing refresh button
    var refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () {
        if (statusDataTableManagerInstance) {
          statusDataTableManagerInstance.refresh();
        }
      });
    }
  }
});
/******/ 	return __webpack_exports__;
/******/ })()
;
});