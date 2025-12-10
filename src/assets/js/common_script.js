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
  const token = localStorage.getItem('access_token');
  if (!token) {
    // window.location.href = '../index.html';
  }
  fetch(`${BASE_URL}authenticate/get-user-profile`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return response.json();
    })
    .then(data => {
      const userName = data.username || "";
      const userTimezone = data.user_timezone || "";
    //   document.getElementById("headerUserName").textContent = userName;
      document.getElementById("getUserNamePopup").textContent = userName;
      document.getElementById("getUserEmailId").textContent = data.email;
      document.getElementById("headerUserFirstLetter").textContent = userName.charAt(0).toUpperCase();
      // document.getElementById("headerUserFirstLet").textContent = userName.charAt(0).toUpperCase();
      // document.getElementById("timeZone").textContent = userTimezone;

      // Ensure select2 is fully initialized before setting the value
      const timezoneSelect = $('#kt_select2_2');

      // Wait until select2 is ready
      if (timezoneSelect.hasClass("select2-hidden-accessible")) {
        timezoneSelect.val(userTimezone).trigger("change");
      } else {
        // Retry until select2 initializes (use a small timeout)
        const interval = setInterval(() => {
          if ($('#kt_select2_2').hasClass("select2-hidden-accessible")) {
            $('#kt_select2_2').val(userTimezone).trigger("change");
            clearInterval(interval);
          }
        }, 100); // Check every 100ms
      }
    })
    .catch(error => {
      console.error("Error fetching profile info:", error);
      // Optionally redirect to login or show error message
    });
});

window.copyAllPlainText = function() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const nodes = Array.from(document.querySelectorAll('[data-copy="true"]'));
  if (!nodes.length) {
    (window.toastr ? toastr.warning('No content found to copy!') : console.warn('No content found to copy!'));
    return;
  }

  const knownHeadings = [
    'Summary',
    'Interval Events',
    'Review of Systems',
    'Physical Examination',
    'Assessment and Plan'
  ];

  function isHeadingElement(el) {
    // Either a <span> or an element whose trimmed text exactly matches a known heading
    const txt = (el.textContent || '').trim();
    return el.tagName === 'SPAN' || knownHeadings.includes(txt);
  }

  function getCleanTextObject(el) {
    const clone = el.cloneNode(true);

    // Remove icons and buttons
    clone.querySelectorAll('.thumb-up, .thumb-down, .comment, i.material-icons').forEach(n => n.remove());

    // Replace <br> with \n
    clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));

    let raw = clone.textContent || '';

    // Collapse long runs of newlines to max 2
    raw = raw.replace(/\n{3,}/g, '\n\n');

    // Trim leading/trailing whitespace
    raw = raw.replace(/^\s+|\s+$/g, '');

    // Trim trailing spaces for each line
    raw = raw.split('\n').map(line => line.replace(/[ \t]+$/, '')).join('\n');

    // Keep one blank line before subheadings (TitleCase lines), but we will handle headings separately
    raw = raw.replace(/([^\n])\n([A-Z][A-Za-z0-9 .:-]{2,}\n)/g, '$1\n\n$2');

    // Return an object indicating whether this node is a heading or body
    const trimmed = raw.trim();
    if (isHeadingElement(el) || knownHeadings.includes(trimmed)) {
      // Normalize heading text to exact known heading when possible
      // If the element is an explicit span heading, return it as heading
      const headingText = knownHeadings.find(h => h === trimmed) || trimmed;
      return headingText ? { type: 'heading', text: headingText } : null;
    }

    // For body text, ensure we don't keep accidental leading blank lines
    const bodyText = trimmed.replace(/^\n+/, '').replace(/\n+$/, '');
    return bodyText ? { type: 'body', text: bodyText } : null;
  }

  // Build array of sections (objects)
  const sections = nodes.map(el => getCleanTextObject(el)).filter(Boolean);
  if (!sections.length) {
    (window.toastr ? toastr.warning('No text available to copy!') : console.warn('No text available to copy!'));
    return;
  }

  // Combine: when a heading is immediately followed by a body, join them without the extra blank line
  let plainText = '';
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const next = sections[i + 1];

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
  const ta = document.createElement('textarea');
  ta.value = plainText;
  ta.readOnly = true;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, ta.value.length);

  try {
    const ok = document.execCommand('copy');
    if (window.toastr) {
      ok
        ? toastr.success('Plain text copied to clipboard!')
        : toastr.warning('Copy failed. Please try manually.');
    }
    if (window.jQuery) $('.dropdown-menu').hide();
  } catch (e) {
    if (window.toastr) toastr.warning('Copy command failed: ' + e);
  }

  document.body.removeChild(ta);
}

// Function to copy content from a specified element
window.copyPlainText = function(elementId, event) {
    event.stopPropagation(); // Prevent dropdown from closing

    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    // Record copy count
    fetch(`${BASE_URL}copy_count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ click_type: 'copy' })
    })
    .then(res => res.json())
    .then(data => console.log(data.message || data.error))
    .catch(err => console.error('Request failed:', err));

    const contentElement = document.getElementById(elementId);
    if (!contentElement) {
        console.error('Element not found:', elementId);
        return;
    }

    // 🔍 Locate section content (e.g. inside-summary-section)
    const innerSection = contentElement.querySelector('[class*="inside-"]');
    const sectionElement = innerSection || contentElement;

    // Extract text like UI
    let plainText = getVisibleText(sectionElement);

    // Clean up: remove UI control labels (thumbs, comment, etc.)
    plainText = plainText.replace(/\b(thumb_up|thumb_down|comment|edit|delete|reply|more_vert)\b/gi, '');

    // Clean redundant spaces and lines
    plainText = plainText
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ ]{2,}/g, ' ')
        .trim();

    // 📋 Copy logic
    const tempTextArea = document.createElement('textarea');
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
        const successful = document.execCommand('copy');
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
        let text = '';

        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent.trim();
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const tag = child.tagName.toLowerCase();

                if (tag === 'br') {
                    text += '\n';
                } 
                else if (['p', 'div', 'section'].includes(tag)) {
                    const subText = getVisibleText(child).trim();
                    if (subText) text += subText + '\n';
                } 
                else if (['ul', 'ol'].includes(tag)) {
                    child.querySelectorAll('li').forEach(li => {
                        const liText = getVisibleText(li).trim();
                        if (liText) text += `- ${liText}\n`;
                    });
                } 
                else {
                    const subText = getVisibleText(child).trim();
                    if (subText) text += subText + ' ';
                }
            }
        });

        return text.replace(/[ \t]+\n/g, '\n').replace(/\n{2,}/g, '\n\n');
    }
}

window.copyAllPlainTextDshp = function(copyAttrValue) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Track copy action
  fetch(`${BASE_URL}copy_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ click_type: 'copy_all' })
  }).catch(console.error);

  let plainText = '';

  const orderedDsSections = [
    'Principal Diagnosis',
    'Discharge Summary',
    'Discharge Diagnoses',
    'Discharge Medications',
    'Discharge Condition',
    'Discharge Disposition',
    'Discharge Instructions',
    'Follow-up Care'
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
    'Review of Systems',
    'Physical Examination',
    'Assessment and Plan'
  ];

  const orderedSections = copyAttrValue === 'true-ds' ? orderedDsSections : orderedHpSections;

  // Word wrap utility (same as in first function)
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

  orderedSections.forEach(sectionTitle => {
    // Add section title with line break before (like first function)
    plainText += `${sectionTitle}\n`;

    // Find the title element (span.kt-accordion-title) with this section title
    const titleElements = document.querySelectorAll(`span.kt-accordion-title[data-copy="${copyAttrValue}"]`);
    let targetTitleElement = null;
    
    for (let titleEl of titleElements) {
      if (titleEl.textContent.trim() === sectionTitle) {
        targetTitleElement = titleEl;
        break;
      }
    }

    if (!targetTitleElement) {
      console.warn(`Title not found for section: ${sectionTitle}`);
      return;
    }

    // Find the closest .kt-accordion-item
    const accordionItem = targetTitleElement.closest('.kt-accordion-item');
    if (!accordionItem) {
      console.warn(`Accordion item not found for: ${sectionTitle}`);
      return;
    }

    // Find the content div (.kt-accordion-wrapper) within this accordion item
    const contentEl = accordionItem.querySelector(`div.kt-accordion-wrapper[data-copy="${copyAttrValue}"]`);
    if (!contentEl) {
      console.warn(`Content not found for: ${sectionTitle}`);
      return;
    }

    // Extract text from contentEl
    const children = Array.from(contentEl.children);

    if (children.length === 0) {
      // Direct text content (like inside a div without child elements)
      const rawText = contentEl.innerText || contentEl.textContent || '';
      if (rawText.trim()) {
        plainText += rawText.trim() + '\n';
      }
    } else {
      children.forEach(child => {
        if (child.tagName === 'P') {
          // For paragraphs, preserve line breaks (same as first function)
          const html = child.innerHTML.replace(/<br\s*\/?>/gi, '\n');
          // const cleanText = html.replace(/<\/?[^>]+(>|$)/g, '').trim();
          if (html.trim()) plainText += html + '\n';
        }
        else if (child.tagName === 'UL') {
          // For unordered lists - use wrapText like first function
          child.querySelectorAll('li').forEach(li => {
            let text = li.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();
            if (!text.startsWith('•')) text = '• ' + text;
            plainText += wrapText(text, '        ', 80);
          });
        }
        else if (child.textContent && child.tagName !== 'UL' && child.tagName !== 'P') {
          // For other elements (like divs with direct text)
          const raw = child.innerHTML.replace(/<br\s*\/?>/gi, '\n').trim();
          if (raw) plainText += raw + '\n';
        }
      });
    }

    plainText += '\n'; // Add spacing after each section (like first function)
  });

  // Copy to clipboard
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = plainText.trim();
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.opacity = '0';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();

  try {
    const successful = document.execCommand('copy');
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