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
/*!****************************************!*\
  !*** ./src/assets/js/common_script.js ***!
  \****************************************/
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
document.addEventListener("DOMContentLoaded", function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    // window.location.href = '../index.html';
  }
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
    var userName = data.username || "";
    var userTimezone = data.user_timezone || "";
    //   document.getElementById("headerUserName").textContent = userName;
    document.getElementById("getUserNamePopup").textContent = userName;
    document.getElementById("getUserEmailId").textContent = data.email;
    document.getElementById("headerUserFirstLetter").textContent = userName.charAt(0).toUpperCase();
    // document.getElementById("headerUserFirstLet").textContent = userName.charAt(0).toUpperCase();
    // document.getElementById("timeZone").textContent = userTimezone;

    // Ensure select2 is fully initialized before setting the value
    var timezoneSelect = $('#kt_select2_2');

    // Wait until select2 is ready
    if (timezoneSelect.hasClass("select2-hidden-accessible")) {
      timezoneSelect.val(userTimezone).trigger("change");
    } else {
      // Retry until select2 initializes (use a small timeout)
      var interval = setInterval(function () {
        if ($('#kt_select2_2').hasClass("select2-hidden-accessible")) {
          $('#kt_select2_2').val(userTimezone).trigger("change");
          clearInterval(interval);
        }
      }, 100); // Check every 100ms
    }
  })["catch"](function (error) {
    console.error("Error fetching profile info:", error);
    // Optionally redirect to login or show error message
  });
});
window.copyAllPlainText = function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  var nodes = Array.from(document.querySelectorAll('[data-copy="true"]'));
  if (!nodes.length) {
    window.toastr ? toastr.warning('No content found to copy!') : console.warn('No content found to copy!');
    return;
  }
  var knownHeadings = ['Summary', 'Interval Events', 'Review of Systems', 'Physical Examination', 'Assessment and Plan'];
  function isHeadingElement(el) {
    // Either a <span> or an element whose trimmed text exactly matches a known heading
    var txt = (el.textContent || '').trim();
    return el.tagName === 'SPAN' || knownHeadings.includes(txt);
  }
  function getCleanTextObject(el) {
    var clone = el.cloneNode(true);

    // Remove icons and buttons
    clone.querySelectorAll('.thumb-up, .thumb-down, .comment, i.material-icons').forEach(function (n) {
      return n.remove();
    });

    // Replace <br> with \n
    clone.querySelectorAll('br').forEach(function (br) {
      return br.replaceWith('\n');
    });
    var raw = clone.textContent || '';

    // Collapse long runs of newlines to max 2
    raw = raw.replace(/\n{3,}/g, '\n\n');

    // Trim leading/trailing whitespace
    raw = raw.replace(/^\s+|\s+$/g, '');

    // Trim trailing spaces for each line
    raw = raw.split('\n').map(function (line) {
      return line.replace(/[ \t]+$/, '');
    }).join('\n');

    // Keep one blank line before subheadings (TitleCase lines), but we will handle headings separately
    raw = raw.replace(/([^\n])\n([A-Z][A-Za-z0-9 .:-]{2,}\n)/g, '$1\n\n$2');

    // Return an object indicating whether this node is a heading or body
    var trimmed = raw.trim();
    if (isHeadingElement(el) || knownHeadings.includes(trimmed)) {
      // Normalize heading text to exact known heading when possible
      // If the element is an explicit span heading, return it as heading
      var headingText = knownHeadings.find(function (h) {
        return h === trimmed;
      }) || trimmed;
      return headingText ? {
        type: 'heading',
        text: headingText
      } : null;
    }

    // For body text, ensure we don't keep accidental leading blank lines
    var bodyText = trimmed.replace(/^\n+/, '').replace(/\n+$/, '');
    return bodyText ? {
      type: 'body',
      text: bodyText
    } : null;
  }

  // Build array of sections (objects)
  var sections = nodes.map(function (el) {
    return getCleanTextObject(el);
  }).filter(Boolean);
  if (!sections.length) {
    window.toastr ? toastr.warning('No text available to copy!') : console.warn('No text available to copy!');
    return;
  }

  // Combine: when a heading is immediately followed by a body, join them without the extra blank line
  var plainText = '';
  for (var i = 0; i < sections.length; i++) {
    var s = sections[i];
    var next = sections[i + 1];
    if (s.type === 'heading') {
      if (next && next.type === 'body') {
        // heading then body: no blank line between heading and its content
        plainText += s.text + '\n' + next.text + '\n\n';
        i++; // skip the body we already used
      } else {
        // heading alone
        plainText += s.text + '\n\n';
      }
    } else {
      // body without a preceding heading (rare)
      plainText += s.text + '\n\n';
    }
  }

  // Final cleanup: collapse 3+ newlines to 2, trim ends
  plainText = plainText.replace(/\n{3,}/g, '\n\n').replace(/^\n+|\n+$/g, '');

  // Copy to clipboard
  var ta = document.createElement('textarea');
  ta.value = plainText;
  ta.readOnly = true;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, ta.value.length);
  try {
    var ok = document.execCommand('copy');
    if (window.toastr) {
      ok ? toastr.success('Plain text copied to clipboard!') : toastr.warning('Copy failed. Please try manually.');
    }
    if (window.jQuery) $('.dropdown-menu').hide();
  } catch (e) {
    if (window.toastr) toastr.warning('Copy command failed: ' + e);
  }
  document.body.removeChild(ta);
};

// Function to copy content from a specified element
window.copyPlainText = function (elementId, event) {
  event.stopPropagation(); // Prevent dropdown from closing

  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Record copy count
  fetch("".concat(BASE_URL, "copy_count"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      click_type: 'copy'
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return console.log(data.message || data.error);
  })["catch"](function (err) {
    return console.error('Request failed:', err);
  });
  var contentElement = document.getElementById(elementId);
  if (!contentElement) {
    console.error('Element not found:', elementId);
    return;
  }

  // 🔍 Locate section content (e.g. inside-summary-section)
  var innerSection = contentElement.querySelector('[class*="inside-"]');
  var sectionElement = innerSection || contentElement;

  // Extract text like UI
  var plainText = getVisibleText(sectionElement);

  // Clean up: remove UI control labels (thumbs, comment, etc.)
  plainText = plainText.replace(/\b(thumb_up|thumb_down|comment|edit|delete|reply|more_vert)\b/gi, '');

  // Clean redundant spaces and lines
  plainText = plainText.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ ]{2,}/g, ' ').trim();

  // 📋 Copy logic
  var tempTextArea = document.createElement('textarea');
  tempTextArea.value = plainText;
  tempTextArea.setAttribute('readonly', '');
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.top = '0';
  tempTextArea.style.left = '0';
  tempTextArea.style.opacity = '0';
  tempTextArea.style.zIndex = '-1';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    var successful = document.execCommand('copy');
    if (successful) {
      toastr.success('Plain text copied to clipboard!');
    } else {
      toastr.warning('Copy failed. Please try manually.');
    }
  } catch (err) {
    console.error('Unable to copy content', err);
    toastr.warning('Copy command failed: ' + err);
  }
  document.body.removeChild(tempTextArea);

  // Helper: extract visible text while keeping layout
  function getVisibleText(node) {
    var text = '';
    node.childNodes.forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent.trim();
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        var tag = child.tagName.toLowerCase();
        if (tag === 'br') {
          text += '\n';
        } else if (['p', 'div', 'section'].includes(tag)) {
          var subText = getVisibleText(child).trim();
          if (subText) text += subText + '\n';
        } else if (['ul', 'ol'].includes(tag)) {
          child.querySelectorAll('li').forEach(function (li) {
            var liText = getVisibleText(li).trim();
            if (liText) text += "- ".concat(liText, "\n");
          });
        } else {
          var _subText = getVisibleText(child).trim();
          if (_subText) text += _subText + ' ';
        }
      }
    });
    return text.replace(/[ \t]+\n/g, '\n').replace(/\n{2,}/g, '\n\n');
  }
};
window.copyAllPlainTextDshp = function (copyAttrValue) {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Track copy action
  fetch("".concat(BASE_URL, "copy_count"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      click_type: 'copy_all'
    })
  })["catch"](console.error);
  var plainText = '';
  var orderedDsSections = ['Principal Diagnosis', 'Discharge Summary', 'Discharge Diagnoses', 'Discharge Medications', 'Discharge Condition', 'Discharge Disposition', 'Discharge Instructions', 'Follow-up Care'];
  var orderedHpSections = ['Principal Diagnosis', 'Chief Complaint', 'History of Present Illness', 'Past Medical History', 'Past Surgical History', 'Medications', 'Allergies', 'Family History', 'Social History', 'Review of Systems', 'Physical Examination', 'Assessment and Plan'];
  var orderedSections = copyAttrValue === 'true-ds' ? orderedDsSections : orderedHpSections;

  // Word wrap utility (same as in first function)
  function wrapText(text) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '        ';
    var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
    var words = text.split(' ');
    var result = '';
    var line = '';
    var _iterator = _createForOfIteratorHelper(words),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var word = _step.value;
        if ((line + word).length > maxLength) {
          result += indent + line.trim() + '\n';
          line = '';
        }
        line += word + ' ';
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (line) result += indent + line.trim() + '\n';
    return result;
  }
  orderedSections.forEach(function (sectionTitle) {
    // Add section title with line break before (like first function)
    plainText += "".concat(sectionTitle, "\n");

    // Find the title element (span.kt-accordion-title) with this section title
    var titleElements = document.querySelectorAll("span.kt-accordion-title[data-copy=\"".concat(copyAttrValue, "\"]"));
    var targetTitleElement = null;
    var _iterator2 = _createForOfIteratorHelper(titleElements),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var titleEl = _step2.value;
        if (titleEl.textContent.trim() === sectionTitle) {
          targetTitleElement = titleEl;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (!targetTitleElement) {
      console.warn("Title not found for section: ".concat(sectionTitle));
      return;
    }

    // Find the closest .kt-accordion-item
    var accordionItem = targetTitleElement.closest('.kt-accordion-item');
    if (!accordionItem) {
      console.warn("Accordion item not found for: ".concat(sectionTitle));
      return;
    }

    // Find the content div (.kt-accordion-wrapper) within this accordion item
    var contentEl = accordionItem.querySelector("div.kt-accordion-wrapper[data-copy=\"".concat(copyAttrValue, "\"]"));
    if (!contentEl) {
      console.warn("Content not found for: ".concat(sectionTitle));
      return;
    }

    // Extract text from contentEl
    var children = Array.from(contentEl.children);
    if (children.length === 0) {
      // Direct text content (like inside a div without child elements)
      var rawText = contentEl.innerText || contentEl.textContent || '';
      if (rawText.trim()) {
        plainText += rawText.trim() + '\n';
      }
    } else {
      children.forEach(function (child) {
        if (child.tagName === 'P') {
          // For paragraphs, preserve line breaks (same as first function)
          var html = child.innerHTML.replace(/<br\s*\/?>/gi, '\n');
          // const cleanText = html.replace(/<\/?[^>]+(>|$)/g, '').trim();
          if (html.trim()) plainText += html + '\n';
        } else if (child.tagName === 'UL') {
          // For unordered lists - use wrapText like first function
          child.querySelectorAll('li').forEach(function (li) {
            var text = li.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();
            if (!text.startsWith('•')) text = '• ' + text;
            plainText += wrapText(text, '        ', 80);
          });
        } else if (child.textContent && child.tagName !== 'UL' && child.tagName !== 'P') {
          // For other elements (like divs with direct text)
          var raw = child.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();
          if (raw) plainText += raw + '\n';
        }
      });
    }
    plainText += '\n'; // Add spacing after each section (like first function)
  });

  // Copy to clipboard
  var tempTextArea = document.createElement('textarea');
  tempTextArea.value = plainText.trim();
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.opacity = '0';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    var successful = document.execCommand('copy');
    if (successful) {
      toastr.success('Plain text copied to clipboard!');
      $('.dropdown-menu').hide();
    } else {
      toastr.warning('Copy failed. Please try manually.');
    }
  } catch (err) {
    toastr.warning('Copy command failed: ' + err);
  }
  document.body.removeChild(tempTextArea);
};
/******/ 	return __webpack_exports__;
/******/ })()
;
});