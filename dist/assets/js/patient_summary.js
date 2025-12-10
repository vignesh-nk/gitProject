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
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/***/ (function(module) {

/*!
* sweetalert2 v11.26.3
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
  }
  function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
  function _classPrivateFieldGet2(s, a) {
    return s.get(_assertClassBrand(s, a));
  }
  function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
  }
  function _classPrivateFieldSet2(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
  }

  const RESTORE_FOCUS_TIMEOUT = 100;

  /** @type {GlobalState} */
  const globalState = {};
  const focusPreviousActiveElement = () => {
    if (globalState.previousActiveElement instanceof HTMLElement) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  };

  /**
   * Restore previous active (focused) element
   *
   * @param {boolean} returnFocus
   * @returns {Promise<void>}
   */
  const restoreActiveElement = returnFocus => {
    return new Promise(resolve => {
      if (!returnFocus) {
        return resolve();
      }
      const x = window.scrollX;
      const y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(() => {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      window.scrollTo(x, y);
    });
  };

  const swalPrefix = 'swal2-';

  /**
   * @typedef {Record<SwalClass, string>} SwalClasses
   */

  /**
   * @typedef {'success' | 'warning' | 'info' | 'question' | 'error'} SwalIcon
   * @typedef {Record<SwalIcon, string>} SwalIcons
   */

  /** @type {SwalClass[]} */
  const classNames = ['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error', 'draggable', 'dragging'];
  const swalClasses = classNames.reduce((acc, className) => {
    acc[className] = swalPrefix + className;
    return acc;
  }, /** @type {SwalClasses} */{});

  /** @type {SwalIcon[]} */
  const icons = ['success', 'warning', 'info', 'question', 'error'];
  const iconTypes = icons.reduce((acc, icon) => {
    acc[icon] = swalPrefix + icon;
    return acc;
  }, /** @type {SwalIcons} */{});

  const consolePrefix = 'SweetAlert2:';

  /**
   * Capitalize the first letter of a string
   *
   * @param {string} str
   * @returns {string}
   */
  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  /**
   * Standardize console warnings
   *
   * @param {string | string[]} message
   */
  const warn = message => {
    console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`);
  };

  /**
   * Standardize console errors
   *
   * @param {string} message
   */
  const error = message => {
    console.error(`${consolePrefix} ${message}`);
  };

  /**
   * Private global state for `warnOnce`
   *
   * @type {string[]}
   * @private
   */
  const previousWarnOnceMessages = [];

  /**
   * Show a console warning, but only if it hasn't already been shown
   *
   * @param {string} message
   */
  const warnOnce = message => {
    if (!previousWarnOnceMessages.includes(message)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };

  /**
   * Show a one-time console warning about deprecated params/methods
   *
   * @param {string} deprecatedParam
   * @param {string?} useInstead
   */
  const warnAboutDeprecation = (deprecatedParam, useInstead = null) => {
    warnOnce(`"${deprecatedParam}" is deprecated and will be removed in the next major release.${useInstead ? ` Use "${useInstead}" instead.` : ''}`);
  };

  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   *
   * @param {(() => *) | *} arg
   * @returns {*}
   */
  const callIfFunction = arg => typeof arg === 'function' ? arg() : arg;

  /**
   * @param {*} arg
   * @returns {boolean}
   */
  const hasToPromiseFn = arg => arg && typeof arg.toPromise === 'function';

  /**
   * @param {*} arg
   * @returns {Promise<*>}
   */
  const asPromise = arg => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);

  /**
   * @param {*} arg
   * @returns {boolean}
   */
  const isPromise = arg => arg && Promise.resolve(arg) === arg;

  /**
   * Gets the popup container which contains the backdrop and the popup itself.
   *
   * @returns {HTMLElement | null}
   */
  const getContainer = () => document.body.querySelector(`.${swalClasses.container}`);

  /**
   * @param {string} selectorString
   * @returns {HTMLElement | null}
   */
  const elementBySelector = selectorString => {
    const container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  /**
   * @param {string} className
   * @returns {HTMLElement | null}
   */
  const elementByClass = className => {
    return elementBySelector(`.${className}`);
  };

  /**
   * @returns {HTMLElement | null}
   */
  const getPopup = () => elementByClass(swalClasses.popup);

  /**
   * @returns {HTMLElement | null}
   */
  const getIcon = () => elementByClass(swalClasses.icon);

  /**
   * @returns {HTMLElement | null}
   */
  const getIconContent = () => elementByClass(swalClasses['icon-content']);

  /**
   * @returns {HTMLElement | null}
   */
  const getTitle = () => elementByClass(swalClasses.title);

  /**
   * @returns {HTMLElement | null}
   */
  const getHtmlContainer = () => elementByClass(swalClasses['html-container']);

  /**
   * @returns {HTMLElement | null}
   */
  const getImage = () => elementByClass(swalClasses.image);

  /**
   * @returns {HTMLElement | null}
   */
  const getProgressSteps = () => elementByClass(swalClasses['progress-steps']);

  /**
   * @returns {HTMLElement | null}
   */
  const getValidationMessage = () => elementByClass(swalClasses['validation-message']);

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getConfirmButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getCancelButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getDenyButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`));

  /**
   * @returns {HTMLElement | null}
   */
  const getInputLabel = () => elementByClass(swalClasses['input-label']);

  /**
   * @returns {HTMLElement | null}
   */
  const getLoader = () => elementBySelector(`.${swalClasses.loader}`);

  /**
   * @returns {HTMLElement | null}
   */
  const getActions = () => elementByClass(swalClasses.actions);

  /**
   * @returns {HTMLElement | null}
   */
  const getFooter = () => elementByClass(swalClasses.footer);

  /**
   * @returns {HTMLElement | null}
   */
  const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);

  /**
   * @returns {HTMLElement | null}
   */
  const getCloseButton = () => elementByClass(swalClasses.close);

  // https://github.com/jkup/focusable/blob/master/index.js
  const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`;
  /**
   * @returns {HTMLElement[]}
   */
  const getFocusableElements = () => {
    const popup = getPopup();
    if (!popup) {
      return [];
    }
    /** @type {NodeListOf<HTMLElement>} */
    const focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])');
    const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex)
    // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex') || '0');
      const tabindexB = parseInt(b.getAttribute('tabindex') || '0');
      if (tabindexA > tabindexB) {
        return 1;
      } else if (tabindexA < tabindexB) {
        return -1;
      }
      return 0;
    });

    /** @type {NodeListOf<HTMLElement>} */
    const otherFocusableElements = popup.querySelectorAll(focusable);
    const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(el => el.getAttribute('tabindex') !== '-1');
    return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter(el => isVisible$1(el));
  };

  /**
   * @returns {boolean}
   */
  const isModal = () => {
    return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses['toast-shown']) && !hasClass(document.body, swalClasses['no-backdrop']);
  };

  /**
   * @returns {boolean}
   */
  const isToast = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return hasClass(popup, swalClasses.toast);
  };

  /**
   * @returns {boolean}
   */
  const isLoading = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return popup.hasAttribute('data-loading');
  };

  /**
   * Securely set innerHTML of an element
   * https://github.com/sweetalert2/sweetalert2/issues/1926
   *
   * @param {HTMLElement} elem
   * @param {string} html
   */
  const setInnerHtml = (elem, html) => {
    elem.textContent = '';
    if (html) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, `text/html`);
      const head = parsed.querySelector('head');
      if (head) {
        Array.from(head.childNodes).forEach(child => {
          elem.appendChild(child);
        });
      }
      const body = parsed.querySelector('body');
      if (body) {
        Array.from(body.childNodes).forEach(child => {
          if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
            elem.appendChild(child.cloneNode(true)); // https://github.com/sweetalert2/sweetalert2/issues/2507
          } else {
            elem.appendChild(child);
          }
        });
      }
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {boolean}
   */
  const hasClass = (elem, className) => {
    if (!className) {
      return false;
    }
    const classList = className.split(/\s+/);
    for (let i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   */
  const removeCustomClasses = (elem, params) => {
    Array.from(elem.classList).forEach(className => {
      if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass || {}).includes(className)) {
        elem.classList.remove(className);
      }
    });
  };

  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   * @param {string} className
   */
  const applyCustomClass = (elem, params, className) => {
    removeCustomClasses(elem, params);
    if (!params.customClass) {
      return;
    }
    const customClass = params.customClass[(/** @type {keyof SweetAlertCustomClass} */className)];
    if (!customClass) {
      return;
    }
    if (typeof customClass !== 'string' && !customClass.forEach) {
      warn(`Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof customClass}"`);
      return;
    }
    addClass(elem, customClass);
  };

  /**
   * @param {HTMLElement} popup
   * @param {import('./renderers/renderInput').InputClass | SweetAlertInput} inputClass
   * @returns {HTMLInputElement | null}
   */
  const getInput$1 = (popup, inputClass) => {
    if (!inputClass) {
      return null;
    }
    switch (inputClass) {
      case 'select':
      case 'textarea':
      case 'file':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputClass]}`);
      case 'checkbox':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`);
      case 'radio':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) || popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`);
      case 'range':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`);
      default:
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`);
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
   */
  const focusInput = input => {
    input.focus();

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      const val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   * @param {boolean} condition
   */
  const toggleClass = (target, classList, condition) => {
    if (!target || !classList) {
      return;
    }
    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }
    classList.forEach(className => {
      if (Array.isArray(target)) {
        target.forEach(elem => {
          if (condition) {
            elem.classList.add(className);
          } else {
            elem.classList.remove(className);
          }
        });
      } else {
        if (condition) {
          target.classList.add(className);
        } else {
          target.classList.remove(className);
        }
      }
    });
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   */
  const addClass = (target, classList) => {
    toggleClass(target, classList, true);
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   */
  const removeClass = (target, classList) => {
    toggleClass(target, classList, false);
  };

  /**
   * Get direct child of an element by class name
   *
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {HTMLElement | undefined}
   */
  const getDirectChildByClass = (elem, className) => {
    const children = Array.from(elem.children);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child instanceof HTMLElement && hasClass(child, className)) {
        return child;
      }
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {string} property
   * @param {string | number | null | undefined} value
   */
  const applyNumericalStyle = (elem, property, value) => {
    if (value === `${parseInt(`${value}`)}`) {
      value = parseInt(value);
    }
    if (value || parseInt(`${value}`) === 0) {
      elem.style.setProperty(property, typeof value === 'number' ? `${value}px` : value);
    } else {
      elem.style.removeProperty(property);
    }
  };

  /**
   * @param {HTMLElement | null} elem
   * @param {string} display
   */
  const show = (elem, display = 'flex') => {
    if (!elem) {
      return;
    }
    elem.style.display = display;
  };

  /**
   * @param {HTMLElement | null} elem
   */
  const hide = elem => {
    if (!elem) {
      return;
    }
    elem.style.display = 'none';
  };

  /**
   * @param {HTMLElement | null} elem
   * @param {string} display
   */
  const showWhenInnerHtmlPresent = (elem, display = 'block') => {
    if (!elem) {
      return;
    }
    new MutationObserver(() => {
      toggle(elem, elem.innerHTML, display);
    }).observe(elem, {
      childList: true,
      subtree: true
    });
  };

  /**
   * @param {HTMLElement} parent
   * @param {string} selector
   * @param {string} property
   * @param {string} value
   */
  const setStyle = (parent, selector, property, value) => {
    /** @type {HTMLElement | null} */
    const el = parent.querySelector(selector);
    if (el) {
      el.style.setProperty(property, value);
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {boolean | string | null | undefined} condition
   * @param {string} display
   */
  const toggle = (elem, condition, display = 'flex') => {
    if (condition) {
      show(elem, display);
    } else {
      hide(elem);
    }
  };

  /**
   * borrowed from jquery $(elem).is(':visible') implementation
   *
   * @param {HTMLElement | null} elem
   * @returns {boolean}
   */
  const isVisible$1 = elem => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

  /**
   * @returns {boolean}
   */
  const allButtonsAreHidden = () => !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

  /**
   * @param {HTMLElement} elem
   * @returns {boolean}
   */
  const isScrollable = elem => !!(elem.scrollHeight > elem.clientHeight);

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} stopElement
   * @returns {boolean}
   */
  const selfOrParentIsScrollable = (element, stopElement) => {
    let parent = element;
    while (parent && parent !== stopElement) {
      if (isScrollable(parent)) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  };

  /**
   * borrowed from https://stackoverflow.com/a/46352119
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */
  const hasCssAnimation = elem => {
    const style = window.getComputedStyle(elem);
    const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };

  /**
   * @param {number} timer
   * @param {boolean} reset
   */
  const animateTimerProgressBar = (timer, reset = false) => {
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    if (isVisible$1(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }
      setTimeout(() => {
        timerProgressBar.style.transition = `width ${timer / 1000}s linear`;
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  const stopTimerProgressBar = () => {
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
    timerProgressBar.style.width = `${timerProgressBarPercent}%`;
  };

  /**
   * Detect Node env
   *
   * @returns {boolean}
   */
  const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

  const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" id="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}" id="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label class="${swalClasses.checkbox}">
     <input type="checkbox" id="${swalClasses.checkbox}" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}" id="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '');

  /**
   * @returns {boolean}
   */
  const resetOldContainer = () => {
    const oldContainer = getContainer();
    if (!oldContainer) {
      return false;
    }
    oldContainer.remove();
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };
  const resetValidationMessage$1 = () => {
    globalState.currentInstance.resetValidationMessage();
  };
  const addInputChangeListeners = () => {
    const popup = getPopup();
    const input = getDirectChildByClass(popup, swalClasses.input);
    const file = getDirectChildByClass(popup, swalClasses.file);
    /** @type {HTMLInputElement} */
    const range = popup.querySelector(`.${swalClasses.range} input`);
    /** @type {HTMLOutputElement} */
    const rangeOutput = popup.querySelector(`.${swalClasses.range} output`);
    const select = getDirectChildByClass(popup, swalClasses.select);
    /** @type {HTMLInputElement} */
    const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`);
    const textarea = getDirectChildByClass(popup, swalClasses.textarea);
    input.oninput = resetValidationMessage$1;
    file.onchange = resetValidationMessage$1;
    select.onchange = resetValidationMessage$1;
    checkbox.onchange = resetValidationMessage$1;
    textarea.oninput = resetValidationMessage$1;
    range.oninput = () => {
      resetValidationMessage$1();
      rangeOutput.value = range.value;
    };
    range.onchange = () => {
      resetValidationMessage$1();
      rangeOutput.value = range.value;
    };
  };

  /**
   * @param {string | HTMLElement} target
   * @returns {HTMLElement}
   */
  const getTarget = target => typeof target === 'string' ? document.querySelector(target) : target;

  /**
   * @param {SweetAlertOptions} params
   */
  const setupAccessibility = params => {
    const popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  /**
   * @param {HTMLElement} targetElement
   */
  const setupRTL = targetElement => {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };

  /**
   * Add modal + backdrop to DOM
   *
   * @param {SweetAlertOptions} params
   */
  const init = params => {
    // Clean up the old popup container if it exists
    const oldContainerExisted = resetOldContainer();
    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }
    const container = document.createElement('div');
    container.className = swalClasses.container;
    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }
    setInnerHtml(container, sweetHTML);
    container.dataset['swal2Theme'] = params.theme;
    const targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    if (params.topLayer) {
      container.setAttribute('popover', '');
      container.showPopover();
    }
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  /**
   * @param {HTMLElement | object | string} param
   * @param {HTMLElement} target
   */
  const parseHtmlToContainer = (param, target) => {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param);
    }

    // Object
    else if (typeof param === 'object') {
      handleObject(param, target);
    }

    // Plain string
    else if (param) {
      setInnerHtml(target, param);
    }
  };

  /**
   * @param {object} param
   * @param {HTMLElement} target
   */
  const handleObject = (param, target) => {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param);
    }

    // For other objects use their string representation
    else {
      setInnerHtml(target, param.toString());
    }
  };

  /**
   * @param {HTMLElement} target
   * @param {object} elem
   */
  const handleJqueryElem = (target, elem) => {
    target.textContent = '';
    if (0 in elem) {
      for (let i = 0; i in elem; i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderActions = (instance, params) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }

    // Actions (buttons) wrapper
    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    }

    // Custom class
    applyCustomClass(actions, params, 'actions');

    // Render all the buttons
    renderButtons(actions, loader, params);

    // Loader
    setInnerHtml(loader, params.loaderHtml || '');
    applyCustomClass(loader, params, 'loader');
  };

  /**
   * @param {HTMLElement} actions
   * @param {HTMLElement} loader
   * @param {SweetAlertOptions} params
   */
  function renderButtons(actions, loader, params) {
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();
    if (!confirmButton || !denyButton || !cancelButton) {
      return;
    }

    // Render buttons
    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params);
    handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
    if (params.reverseButtons) {
      if (params.toast) {
        actions.insertBefore(cancelButton, confirmButton);
        actions.insertBefore(denyButton, confirmButton);
      } else {
        actions.insertBefore(cancelButton, loader);
        actions.insertBefore(denyButton, loader);
        actions.insertBefore(confirmButton, loader);
      }
    }
  }

  /**
   * @param {HTMLElement} confirmButton
   * @param {HTMLElement} denyButton
   * @param {HTMLElement} cancelButton
   * @param {SweetAlertOptions} params
   */
  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    if (!params.buttonsStyling) {
      removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
      return;
    }
    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);

    // Apply custom background colors to action buttons
    if (params.confirmButtonColor) {
      confirmButton.style.setProperty('--swal2-confirm-button-background-color', params.confirmButtonColor);
    }
    if (params.denyButtonColor) {
      denyButton.style.setProperty('--swal2-deny-button-background-color', params.denyButtonColor);
    }
    if (params.cancelButtonColor) {
      cancelButton.style.setProperty('--swal2-cancel-button-background-color', params.cancelButtonColor);
    }

    // Apply the outline color to action buttons
    applyOutlineColor(confirmButton);
    applyOutlineColor(denyButton);
    applyOutlineColor(cancelButton);
  }

  /**
   * @param {HTMLElement} button
   */
  function applyOutlineColor(button) {
    const buttonStyle = window.getComputedStyle(button);
    if (buttonStyle.getPropertyValue('--swal2-action-button-focus-box-shadow')) {
      // If the button already has a custom outline color, no need to change it
      return;
    }
    const outlineColor = buttonStyle.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/, 'rgba($1, $2, $3, 0.5)');
    button.style.setProperty('--swal2-action-button-focus-box-shadow', buttonStyle.getPropertyValue('--swal2-outline').replace(/ rgba\(.*/, ` ${outlineColor}`));
  }

  /**
   * @param {HTMLElement} button
   * @param {'confirm' | 'deny' | 'cancel'} buttonType
   * @param {SweetAlertOptions} params
   */
  function renderButton(button, buttonType, params) {
    const buttonName = /** @type {'Confirm' | 'Deny' | 'Cancel'} */capitalizeFirstLetter(buttonType);
    toggle(button, params[`show${buttonName}Button`], 'inline-block');
    setInnerHtml(button, params[`${buttonType}ButtonText`] || ''); // Set caption text
    button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`] || ''); // ARIA label

    // Add buttons custom classes
    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, `${buttonType}Button`);
  }

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderCloseButton = (instance, params) => {
    const closeButton = getCloseButton();
    if (!closeButton) {
      return;
    }
    setInnerHtml(closeButton, params.closeButtonHtml || '');

    // Custom class
    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel || '');
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderContainer = (instance, params) => {
    const container = getContainer();
    if (!container) {
      return;
    }
    handleBackdropParam(container, params.backdrop);
    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow);

    // Custom class
    applyCustomClass(container, params, 'container');
  };

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['backdrop']} backdrop
   */
  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['position']} position
   */
  function handlePositionParam(container, position) {
    if (!position) {
      return;
    }
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['grow']} grow
   */
  function handleGrowParam(container, grow) {
    if (!grow) {
      return;
    }
    addClass(container, swalClasses[`grow-${grow}`]);
  }

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateProps = {
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  /// <reference path="../../../../sweetalert2.d.ts"/>


  /** @type {InputClass[]} */
  const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderInput = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const innerParams = privateProps.innerParams.get(instance);
    const rerender = !innerParams || params.input !== innerParams.input;
    inputClasses.forEach(inputClass => {
      const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);
      if (!inputContainer) {
        return;
      }

      // set attributes
      setAttributes(inputClass, params.inputAttributes);

      // set class
      inputContainer.className = swalClasses[inputClass];
      if (rerender) {
        hide(inputContainer);
      }
    });
    if (params.input) {
      if (rerender) {
        showInput(params);
      }
      // set custom class
      setCustomClass(params);
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  const showInput = params => {
    if (!params.input) {
      return;
    }
    if (!renderInputType[params.input]) {
      error(`Unexpected type of input! Expected ${Object.keys(renderInputType).join(' | ')}, got "${params.input}"`);
      return;
    }
    const inputContainer = getInputContainer(params.input);
    if (!inputContainer) {
      return;
    }
    const input = renderInputType[params.input](inputContainer, params);
    show(inputContainer);

    // input autofocus
    if (params.inputAutoFocus) {
      setTimeout(() => {
        focusInput(input);
      });
    }
  };

  /**
   * @param {HTMLInputElement} input
   */
  const removeAttributes = input => {
    for (let i = 0; i < input.attributes.length; i++) {
      const attrName = input.attributes[i].name;
      if (!['id', 'type', 'value', 'style'].includes(attrName)) {
        input.removeAttribute(attrName);
      }
    }
  };

  /**
   * @param {InputClass} inputClass
   * @param {SweetAlertOptions['inputAttributes']} inputAttributes
   */
  const setAttributes = (inputClass, inputAttributes) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const input = getInput$1(popup, inputClass);
    if (!input) {
      return;
    }
    removeAttributes(input);
    for (const attr in inputAttributes) {
      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  const setCustomClass = params => {
    if (!params.input) {
      return;
    }
    const inputContainer = getInputContainer(params.input);
    if (inputContainer) {
      applyCustomClass(inputContainer, params, 'input');
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions} params
   */
  const setInputPlaceholder = (input, params) => {
    if (!input.placeholder && params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  /**
   * @param {Input} input
   * @param {Input} prependTo
   * @param {SweetAlertOptions} params
   */
  const setInputLabel = (input, prependTo, params) => {
    if (params.inputLabel) {
      const label = document.createElement('label');
      const labelClass = swalClasses['input-label'];
      label.setAttribute('for', input.id);
      label.className = labelClass;
      if (typeof params.customClass === 'object') {
        addClass(label, params.customClass.inputLabel);
      }
      label.innerText = params.inputLabel;
      prependTo.insertAdjacentElement('beforebegin', label);
    }
  };

  /**
   * @param {SweetAlertInput} inputType
   * @returns {HTMLElement | undefined}
   */
  const getInputContainer = inputType => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    return getDirectChildByClass(popup, swalClasses[(/** @type {SwalClass} */inputType)] || swalClasses.input);
  };

  /**
   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions['inputValue']} inputValue
   */
  const checkAndSetInputValue = (input, inputValue) => {
    if (['string', 'number'].includes(typeof inputValue)) {
      input.value = `${inputValue}`;
    } else if (!isPromise(inputValue)) {
      warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`);
    }
  };

  /** @type {Record<SweetAlertInput, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */
  const renderInputType = {};

  /**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = renderInputType.search = renderInputType.date = renderInputType['datetime-local'] = renderInputType.time = renderInputType.week = renderInputType.month = /** @type {(input: Input | HTMLElement, params: SweetAlertOptions) => Input} */
  (input, params) => {
    checkAndSetInputValue(input, params.inputValue);
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  /**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.file = (input, params) => {
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    return input;
  };

  /**
   * @param {HTMLInputElement} range
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.range = (range, params) => {
    const rangeInput = range.querySelector('input');
    const rangeOutput = range.querySelector('output');
    checkAndSetInputValue(rangeInput, params.inputValue);
    rangeInput.type = params.input;
    checkAndSetInputValue(rangeOutput, params.inputValue);
    setInputLabel(rangeInput, range, params);
    return range;
  };

  /**
   * @param {HTMLSelectElement} select
   * @param {SweetAlertOptions} params
   * @returns {HTMLSelectElement}
   */
  renderInputType.select = (select, params) => {
    select.textContent = '';
    if (params.inputPlaceholder) {
      const placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }
    setInputLabel(select, select, params);
    return select;
  };

  /**
   * @param {HTMLInputElement} radio
   * @returns {HTMLInputElement}
   */
  renderInputType.radio = radio => {
    radio.textContent = '';
    return radio;
  };

  /**
   * @param {HTMLLabelElement} checkboxContainer
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.checkbox = (checkboxContainer, params) => {
    const checkbox = getInput$1(getPopup(), 'checkbox');
    checkbox.value = '1';
    checkbox.checked = Boolean(params.inputValue);
    const label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder || params.inputLabel);
    return checkbox;
  };

  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {SweetAlertOptions} params
   * @returns {HTMLTextAreaElement}
   */
  renderInputType.textarea = (textarea, params) => {
    checkAndSetInputValue(textarea, params.inputValue);
    setInputPlaceholder(textarea, params);
    setInputLabel(textarea, textarea, params);

    /**
     * @param {HTMLElement} el
     * @returns {number}
     */
    const getMargin = el => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

    // https://github.com/sweetalert2/sweetalert2/issues/2291
    setTimeout(() => {
      // https://github.com/sweetalert2/sweetalert2/issues/1699
      if ('MutationObserver' in window) {
        const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
        const textareaResizeHandler = () => {
          // check if texarea is still in document (i.e. popup wasn't closed in the meantime)
          if (!document.body.contains(textarea)) {
            return;
          }
          const textareaWidth = textarea.offsetWidth + getMargin(textarea);
          if (textareaWidth > initialPopupWidth) {
            getPopup().style.width = `${textareaWidth}px`;
          } else {
            applyNumericalStyle(getPopup(), 'width', params.width);
          }
        };
        new MutationObserver(textareaResizeHandler).observe(textarea, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    });
    return textarea;
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderContent = (instance, params) => {
    const htmlContainer = getHtmlContainer();
    if (!htmlContainer) {
      return;
    }
    showWhenInnerHtmlPresent(htmlContainer);
    applyCustomClass(htmlContainer, params, 'htmlContainer');

    // Content as HTML
    if (params.html) {
      parseHtmlToContainer(params.html, htmlContainer);
      show(htmlContainer, 'block');
    }

    // Content as plain text
    else if (params.text) {
      htmlContainer.textContent = params.text;
      show(htmlContainer, 'block');
    }

    // No content
    else {
      hide(htmlContainer);
    }
    renderInput(instance, params);
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderFooter = (instance, params) => {
    const footer = getFooter();
    if (!footer) {
      return;
    }
    showWhenInnerHtmlPresent(footer);
    toggle(footer, Boolean(params.footer), 'block');
    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    }

    // Custom class
    applyCustomClass(footer, params, 'footer');
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderIcon = (instance, params) => {
    const innerParams = privateProps.innerParams.get(instance);
    const icon = getIcon();
    if (!icon) {
      return;
    }

    // if the given icon already rendered, apply the styling without re-rendering the icon
    if (innerParams && params.icon === innerParams.icon) {
      // Custom or default content
      setContent(icon, params);
      applyStyles(icon, params);
      return;
    }
    if (!params.icon && !params.iconHtml) {
      hide(icon);
      return;
    }
    if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
      error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`);
      hide(icon);
      return;
    }
    show(icon);

    // Custom or default content
    setContent(icon, params);
    applyStyles(icon, params);

    // Animate icon
    addClass(icon, params.showClass && params.showClass.icon);

    // Re-adjust the success icon on system theme change
    const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQueryList.addEventListener('change', adjustSuccessIconBackgroundColor);
  };

  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */
  const applyStyles = (icon, params) => {
    for (const [iconType, iconClassName] of Object.entries(iconTypes)) {
      if (params.icon !== iconType) {
        removeClass(icon, iconClassName);
      }
    }
    addClass(icon, params.icon && iconTypes[params.icon]);

    // Icon color
    setColor(icon, params);

    // Success icon background color
    adjustSuccessIconBackgroundColor();

    // Custom class
    applyCustomClass(icon, params, 'icon');
  };

  // Adjust success icon background color to match the popup background color
  const adjustSuccessIconBackgroundColor = () => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    /** @type {NodeListOf<HTMLElement>} */
    const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
    for (let i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  /**
   *
   * @param {SweetAlertOptions} params
   * @returns {string}
   */
  const successIconHtml = params => `
  ${params.animation ? '<div class="swal2-success-circular-line-left"></div>' : ''}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${params.animation ? '<div class="swal2-success-fix"></div>' : ''}
  ${params.animation ? '<div class="swal2-success-circular-line-right"></div>' : ''}
`;
  const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`;

  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */
  const setContent = (icon, params) => {
    if (!params.icon && !params.iconHtml) {
      return;
    }
    let oldContent = icon.innerHTML;
    let newContent = '';
    if (params.iconHtml) {
      newContent = iconContent(params.iconHtml);
    } else if (params.icon === 'success') {
      newContent = successIconHtml(params);
      oldContent = oldContent.replace(/ style=".*?"/g, ''); // undo adjustSuccessIconBackgroundColor()
    } else if (params.icon === 'error') {
      newContent = errorIconHtml;
    } else if (params.icon) {
      const defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      newContent = iconContent(defaultIconHtml[params.icon]);
    }
    if (oldContent.trim() !== newContent.trim()) {
      setInnerHtml(icon, newContent);
    }
  };

  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */
  const setColor = (icon, params) => {
    if (!params.iconColor) {
      return;
    }
    icon.style.color = params.iconColor;
    icon.style.borderColor = params.iconColor;
    for (const sel of ['.swal2-success-line-tip', '.swal2-success-line-long', '.swal2-x-mark-line-left', '.swal2-x-mark-line-right']) {
      setStyle(icon, sel, 'background-color', params.iconColor);
    }
    setStyle(icon, '.swal2-success-ring', 'border-color', params.iconColor);
  };

  /**
   * @param {string} content
   * @returns {string}
   */
  const iconContent = content => `<div class="${swalClasses['icon-content']}">${content}</div>`;

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderImage = (instance, params) => {
    const image = getImage();
    if (!image) {
      return;
    }
    if (!params.imageUrl) {
      hide(image);
      return;
    }
    show(image, '');

    // Src, alt
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt || '');

    // Width, height
    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight);

    // Class
    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  let dragging = false;
  let mousedownX = 0;
  let mousedownY = 0;
  let initialX = 0;
  let initialY = 0;

  /**
   * @param {HTMLElement} popup
   */
  const addDraggableListeners = popup => {
    popup.addEventListener('mousedown', down);
    document.body.addEventListener('mousemove', move);
    popup.addEventListener('mouseup', up);
    popup.addEventListener('touchstart', down);
    document.body.addEventListener('touchmove', move);
    popup.addEventListener('touchend', up);
  };

  /**
   * @param {HTMLElement} popup
   */
  const removeDraggableListeners = popup => {
    popup.removeEventListener('mousedown', down);
    document.body.removeEventListener('mousemove', move);
    popup.removeEventListener('mouseup', up);
    popup.removeEventListener('touchstart', down);
    document.body.removeEventListener('touchmove', move);
    popup.removeEventListener('touchend', up);
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  const down = event => {
    const popup = getPopup();
    if (event.target === popup || getIcon().contains(/** @type {HTMLElement} */event.target)) {
      dragging = true;
      const clientXY = getClientXY(event);
      mousedownX = clientXY.clientX;
      mousedownY = clientXY.clientY;
      initialX = parseInt(popup.style.insetInlineStart) || 0;
      initialY = parseInt(popup.style.insetBlockStart) || 0;
      addClass(popup, 'swal2-dragging');
    }
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  const move = event => {
    const popup = getPopup();
    if (dragging) {
      let {
        clientX,
        clientY
      } = getClientXY(event);
      popup.style.insetInlineStart = `${initialX + (clientX - mousedownX)}px`;
      popup.style.insetBlockStart = `${initialY + (clientY - mousedownY)}px`;
    }
  };
  const up = () => {
    const popup = getPopup();
    dragging = false;
    removeClass(popup, 'swal2-dragging');
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   * @returns {{ clientX: number, clientY: number }}
   */
  const getClientXY = event => {
    let clientX = 0,
      clientY = 0;
    if (event.type.startsWith('mouse')) {
      clientX = /** @type {MouseEvent} */event.clientX;
      clientY = /** @type {MouseEvent} */event.clientY;
    } else if (event.type.startsWith('touch')) {
      clientX = /** @type {TouchEvent} */event.touches[0].clientX;
      clientY = /** @type {TouchEvent} */event.touches[0].clientY;
    }
    return {
      clientX,
      clientY
    };
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderPopup = (instance, params) => {
    const container = getContainer();
    const popup = getPopup();
    if (!container || !popup) {
      return;
    }

    // Width
    // https://github.com/sweetalert2/sweetalert2/issues/2170
    if (params.toast) {
      applyNumericalStyle(container, 'width', params.width);
      popup.style.width = '100%';
      const loader = getLoader();
      if (loader) {
        popup.insertBefore(loader, getIcon());
      }
    } else {
      applyNumericalStyle(popup, 'width', params.width);
    }

    // Padding
    applyNumericalStyle(popup, 'padding', params.padding);

    // Color
    if (params.color) {
      popup.style.color = params.color;
    }

    // Background
    if (params.background) {
      popup.style.background = params.background;
    }
    hide(getValidationMessage());

    // Classes
    addClasses$1(popup, params);
    if (params.draggable && !params.toast) {
      addClass(popup, swalClasses.draggable);
      addDraggableListeners(popup);
    } else {
      removeClass(popup, swalClasses.draggable);
      removeDraggableListeners(popup);
    }
  };

  /**
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */
  const addClasses$1 = (popup, params) => {
    const showClass = params.showClass || {};
    // Default Class + showClass when updating Swal.update({})
    popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? showClass.popup : ''}`;
    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    }

    // Custom class
    applyCustomClass(popup, params, 'popup');
    // TODO: remove in the next major
    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    }

    // Icon class (#1842)
    if (params.icon) {
      addClass(popup, swalClasses[`icon-${params.icon}`]);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderProgressSteps = (instance, params) => {
    const progressStepsContainer = getProgressSteps();
    if (!progressStepsContainer) {
      return;
    }
    const {
      progressSteps,
      currentProgressStep
    } = params;
    if (!progressSteps || progressSteps.length === 0 || currentProgressStep === undefined) {
      hide(progressStepsContainer);
      return;
    }
    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    if (currentProgressStep >= progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    progressSteps.forEach((step, index) => {
      const stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);
      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }
      if (index !== progressSteps.length - 1) {
        const lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  /**
   * @param {string} step
   * @returns {HTMLLIElement}
   */
  const createStepElement = step => {
    const stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  /**
   * @param {SweetAlertOptions} params
   * @returns {HTMLLIElement}
   */
  const createLineElement = params => {
    const lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);
    if (params.progressStepsDistance) {
      applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
    }
    return lineEl;
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderTitle = (instance, params) => {
    const title = getTitle();
    if (!title) {
      return;
    }
    showWhenInnerHtmlPresent(title);
    toggle(title, Boolean(params.title || params.titleText), 'block');
    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }
    if (params.titleText) {
      title.innerText = params.titleText;
    }

    // Custom class
    applyCustomClass(title, params, 'title');
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const render = (instance, params) => {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderProgressSteps(instance, params);
    renderIcon(instance, params);
    renderImage(instance, params);
    renderTitle(instance, params);
    renderCloseButton(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);
    const popup = getPopup();
    if (typeof params.didRender === 'function' && popup) {
      params.didRender(popup);
    }
    globalState.eventEmitter.emit('didRender', popup);
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */
  const isVisible = () => {
    return isVisible$1(getPopup());
  };

  /*
   * Global function to click 'Confirm' button
   */
  const clickConfirm = () => {
    var _dom$getConfirmButton;
    return (_dom$getConfirmButton = getConfirmButton()) === null || _dom$getConfirmButton === void 0 ? void 0 : _dom$getConfirmButton.click();
  };

  /*
   * Global function to click 'Deny' button
   */
  const clickDeny = () => {
    var _dom$getDenyButton;
    return (_dom$getDenyButton = getDenyButton()) === null || _dom$getDenyButton === void 0 ? void 0 : _dom$getDenyButton.click();
  };

  /*
   * Global function to click 'Cancel' button
   */
  const clickCancel = () => {
    var _dom$getCancelButton;
    return (_dom$getCancelButton = getCancelButton()) === null || _dom$getCancelButton === void 0 ? void 0 : _dom$getCancelButton.click();
  };

  /** @type {Record<DismissReason, DismissReason>} */
  const DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  /**
   * @param {GlobalState} globalState
   */
  const removeKeydownHandler = globalState => {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }
  };

  /**
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const addKeydownHandler = (globalState, innerParams, dismissWith) => {
    removeKeydownHandler(globalState);
    if (!innerParams.toast) {
      globalState.keydownHandler = e => keydownHandler(innerParams, e, dismissWith);
      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  };

  /**
   * @param {number} index
   * @param {number} increment
   */
  const setFocus = (index, increment) => {
    var _dom$getPopup;
    const focusableElements = getFocusableElements();
    // search for visible elements and select the next possible match
    if (focusableElements.length) {
      index = index + increment;

      // shift + tab when .swal2-popup is focused
      if (index === -2) {
        index = focusableElements.length - 1;
      }

      // rollover to first item
      if (index === focusableElements.length) {
        index = 0;

        // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }
      focusableElements[index].focus();
      return;
    }
    // no visible focusable elements, focus the popup
    (_dom$getPopup = getPopup()) === null || _dom$getPopup === void 0 || _dom$getPopup.focus();
  };
  const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];
  const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {KeyboardEvent} event
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const keydownHandler = (innerParams, event, dismissWith) => {
    if (!innerParams) {
      return; // This instance has already been destroyed
    }

    // Ignore keydown during IME composition
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    // https://github.com/sweetalert2/sweetalert2/issues/720
    // https://github.com/sweetalert2/sweetalert2/issues/2406
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (innerParams.stopKeydownPropagation) {
      event.stopPropagation();
    }

    // ENTER
    if (event.key === 'Enter') {
      handleEnter(event, innerParams);
    }

    // TAB
    else if (event.key === 'Tab') {
      handleTab(event);
    }

    // ARROWS - switch focus between buttons
    else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) {
      handleArrows(event.key);
    }

    // ESC
    else if (event.key === 'Escape') {
      handleEsc(event, innerParams, dismissWith);
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   */
  const handleEnter = (event, innerParams) => {
    // https://github.com/sweetalert2/sweetalert2/issues/2386
    if (!callIfFunction(innerParams.allowEnterKey)) {
      return;
    }
    const input = getInput$1(getPopup(), innerParams.input);
    if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
      if (['textarea', 'file'].includes(innerParams.input)) {
        return; // do not submit
      }
      clickConfirm();
      event.preventDefault();
    }
  };

  /**
   * @param {KeyboardEvent} event
   */
  const handleTab = event => {
    const targetElement = event.target;
    const focusableElements = getFocusableElements();
    let btnIndex = -1;
    for (let i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    // Cycle to the next button
    if (!event.shiftKey) {
      setFocus(btnIndex, 1);
    }

    // Cycle to the prev button
    else {
      setFocus(btnIndex, -1);
    }
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * @param {string} key
   */
  const handleArrows = key => {
    const actions = getActions();
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();
    if (!actions || !confirmButton || !denyButton || !cancelButton) {
      return;
    }
    /** @type HTMLElement[] */
    const buttons = [confirmButton, denyButton, cancelButton];
    if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
      return;
    }
    const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
    let buttonToFocus = document.activeElement;
    if (!buttonToFocus) {
      return;
    }
    for (let i = 0; i < actions.children.length; i++) {
      buttonToFocus = buttonToFocus[sibling];
      if (!buttonToFocus) {
        return;
      }
      if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
        break;
      }
    }
    if (buttonToFocus instanceof HTMLButtonElement) {
      buttonToFocus.focus();
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleEsc = (event, innerParams, dismissWith) => {
    event.preventDefault();
    if (callIfFunction(innerParams.allowEscapeKey)) {
      dismissWith(DismissReason.esc);
    }
  };

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateMethods = {
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap()
  };

  // From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  const setAriaHidden = () => {
    const container = getContainer();
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.contains(container)) {
        return;
      }
      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden') || '');
      }
      el.setAttribute('aria-hidden', 'true');
    });
  };
  const unsetAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden') || '');
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  // @ts-ignore
  const isSafariOrIOS = typeof window !== 'undefined' && !!window.GestureEvent; // true for Safari desktop + all iOS browsers https://stackoverflow.com/a/70585394

  /**
   * Fix iOS scrolling
   * http://stackoverflow.com/q/39626302
   */
  const iOSfix = () => {
    if (isSafariOrIOS && !hasClass(document.body, swalClasses.iosfix)) {
      const offset = document.body.scrollTop;
      document.body.style.top = `${offset * -1}px`;
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
    }
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1246
   */
  const lockBodyScroll = () => {
    const container = getContainer();
    if (!container) {
      return;
    }
    /** @type {boolean} */
    let preventTouchMove;
    /**
     * @param {TouchEvent} event
     */
    container.ontouchstart = event => {
      preventTouchMove = shouldPreventTouchMove(event);
    };
    /**
     * @param {TouchEvent} event
     */
    container.ontouchmove = event => {
      if (preventTouchMove) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  };

  /**
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const shouldPreventTouchMove = event => {
    const target = event.target;
    const container = getContainer();
    const htmlContainer = getHtmlContainer();
    if (!container || !htmlContainer) {
      return false;
    }
    if (isStylus(event) || isZoom(event)) {
      return false;
    }
    if (target === container) {
      return true;
    }
    if (!isScrollable(container) && target instanceof HTMLElement && !selfOrParentIsScrollable(target, htmlContainer) &&
    // #2823
    target.tagName !== 'INPUT' &&
    // #1603
    target.tagName !== 'TEXTAREA' &&
    // #2266
    !(isScrollable(htmlContainer) &&
    // #1944
    htmlContainer.contains(target))) {
      return true;
    }
    return false;
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1786
   *
   * @param {object} event
   * @returns {boolean}
   */
  const isStylus = event => {
    return event.touches && event.touches.length && event.touches[0].touchType === 'stylus';
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1891
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const isZoom = event => {
    return event.touches && event.touches.length > 1;
  };
  const undoIOSfix = () => {
    if (hasClass(document.body, swalClasses.iosfix)) {
      const offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /**
   * Measure scrollbar width for padding body during modal show/hide
   * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
   *
   * @returns {number}
   */
  const measureScrollbar = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  /**
   * Remember state in cases where opening and handling a modal will fiddle with it.
   * @type {number | null}
   */
  let previousBodyPadding = null;

  /**
   * @param {string} initialBodyOverflow
   */
  const replaceScrollbarWithPadding = initialBodyOverflow => {
    // for queues, do not do this more than once
    if (previousBodyPadding !== null) {
      return;
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight || initialBodyOverflow === 'scroll' // https://github.com/sweetalert2/sweetalert2/issues/2663
    ) {
      // add padding so the content doesn't shift after removal of scrollbar
      previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = `${previousBodyPadding + measureScrollbar()}px`;
    }
  };
  const undoReplaceScrollbarWithPadding = () => {
    if (previousBodyPadding !== null) {
      document.body.style.paddingRight = `${previousBodyPadding}px`;
      previousBodyPadding = null;
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {HTMLElement} container
   * @param {boolean} returnFocus
   * @param {() => void} didClose
   */
  function removePopupAndResetState(instance, container, returnFocus, didClose) {
    if (isToast()) {
      triggerDidCloseAndDispose(instance, didClose);
    } else {
      restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
      removeKeydownHandler(globalState);
    }

    // workaround for https://github.com/sweetalert2/sweetalert2/issues/2088
    // for some reason removing the container in Safari will scroll the document to bottom
    if (isSafariOrIOS) {
      container.setAttribute('style', 'display:none !important');
      container.removeAttribute('class');
      container.innerHTML = '';
    } else {
      container.remove();
    }
    if (isModal()) {
      undoReplaceScrollbarWithPadding();
      undoIOSfix();
      unsetAriaHidden();
    }
    removeBodyClasses();
  }

  /**
   * Remove SweetAlert2 classes from body
   */
  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]);
  }

  /**
   * Instance method to close sweetAlert
   *
   * @param {SweetAlertResult | undefined} resolveValue
   */
  function close(resolveValue) {
    resolveValue = prepareResolveValue(resolveValue);
    const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    const didClose = triggerClosePopup(this);
    if (this.isAwaitingPromise) {
      // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
      if (!resolveValue.isDismissed) {
        handleAwaitingPromise(this);
        swalPromiseResolve(resolveValue);
      }
    } else if (didClose) {
      // Resolve Swal promise
      swalPromiseResolve(resolveValue);
    }
  }
  const triggerClosePopup = instance => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    const innerParams = privateProps.innerParams.get(instance);
    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return false;
    }
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    const backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(instance, popup, innerParams);
    return true;
  };

  /**
   * @param {Error | string} error
   */
  function rejectPromise(error) {
    const rejectPromise = privateMethods.swalPromiseReject.get(this);
    handleAwaitingPromise(this);
    if (rejectPromise) {
      // Reject Swal promise
      rejectPromise(error);
    }
  }

  /**
   * @param {SweetAlert} instance
   */
  const handleAwaitingPromise = instance => {
    if (instance.isAwaitingPromise) {
      delete instance.isAwaitingPromise;
      // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
      if (!privateProps.innerParams.get(instance)) {
        instance._destroy();
      }
    }
  };

  /**
   * @param {SweetAlertResult | undefined} resolveValue
   * @returns {SweetAlertResult}
   */
  const prepareResolveValue = resolveValue => {
    // When user calls Swal.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }
    return Object.assign({
      isConfirmed: false,
      isDenied: false,
      isDismissed: false
    }, resolveValue);
  };

  /**
   * @param {SweetAlert} instance
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} innerParams
   */
  const handlePopupAnimation = (instance, popup, innerParams) => {
    var _globalState$eventEmi;
    const container = getContainer();
    // If animation is supported, animate
    const animationIsSupported = hasCssAnimation(popup);
    if (typeof innerParams.willClose === 'function') {
      innerParams.willClose(popup);
    }
    (_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit('willClose', popup);
    if (animationIsSupported) {
      animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {HTMLElement} popup
   * @param {HTMLElement} container
   * @param {boolean} returnFocus
   * @param {() => void} didClose
   */
  const animatePopup = (instance, popup, container, returnFocus, didClose) => {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
    /**
     * @param {AnimationEvent | TransitionEvent} e
     */
    const swalCloseAnimationFinished = function (e) {
      if (e.target === popup) {
        var _globalState$swalClos;
        (_globalState$swalClos = globalState.swalCloseEventFinishedCallback) === null || _globalState$swalClos === void 0 || _globalState$swalClos.call(globalState);
        delete globalState.swalCloseEventFinishedCallback;
        popup.removeEventListener('animationend', swalCloseAnimationFinished);
        popup.removeEventListener('transitionend', swalCloseAnimationFinished);
      }
    };
    popup.addEventListener('animationend', swalCloseAnimationFinished);
    popup.addEventListener('transitionend', swalCloseAnimationFinished);
  };

  /**
   * @param {SweetAlert} instance
   * @param {() => void} didClose
   */
  const triggerDidCloseAndDispose = (instance, didClose) => {
    setTimeout(() => {
      var _globalState$eventEmi2;
      if (typeof didClose === 'function') {
        didClose.bind(instance.params)();
      }
      (_globalState$eventEmi2 = globalState.eventEmitter) === null || _globalState$eventEmi2 === void 0 || _globalState$eventEmi2.emit('didClose');
      // instance might have been destroyed already
      if (instance._destroy) {
        instance._destroy();
      }
    });
  };

  /**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   *
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const showLoading = buttonToReplace => {
    let popup = getPopup();
    if (!popup) {
      new Swal();
    }
    popup = getPopup();
    if (!popup) {
      return;
    }
    const loader = getLoader();
    if (isToast()) {
      hide(getIcon());
    } else {
      replaceButton(popup, buttonToReplace);
    }
    show(loader);
    popup.setAttribute('data-loading', 'true');
    popup.setAttribute('aria-busy', 'true');
    popup.focus();
  };

  /**
   * @param {HTMLElement} popup
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const replaceButton = (popup, buttonToReplace) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }
    if (!buttonToReplace && isVisible$1(getConfirmButton())) {
      buttonToReplace = getConfirmButton();
    }
    show(actions);
    if (buttonToReplace) {
      hide(buttonToReplace);
      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
      actions.insertBefore(loader, buttonToReplace);
    }
    addClass([popup, actions], swalClasses.loading);
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputOptionsAndValue = (instance, params) => {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].some(i => i === params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      showLoading(getConfirmButton());
      handleInputValue(instance, params);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} innerParams
   * @returns {SweetAlertInputValue}
   */
  const getInputValue = (instance, innerParams) => {
    const input = instance.getInput();
    if (!input) {
      return null;
    }
    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);
      case 'radio':
        return getRadioValue(input);
      case 'file':
        return getFileValue(input);
      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  /**
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  const getCheckboxValue = input => input.checked ? 1 : 0;

  /**
   * @param {HTMLInputElement} input
   * @returns {string | null}
   */
  const getRadioValue = input => input.checked ? input.value : null;

  /**
   * @param {HTMLInputElement} input
   * @returns {FileList | File | null}
   */
  const getFileValue = input => input.files && input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputOptions = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    /**
     * @param {*} inputOptions
     */
    const processInputOptions = inputOptions => {
      if (params.input === 'select') {
        populateSelectOptions(popup, formatInputOptions(inputOptions), params);
      } else if (params.input === 'radio') {
        populateRadioOptions(popup, formatInputOptions(inputOptions), params);
      }
    };
    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading(getConfirmButton());
      asPromise(params.inputOptions).then(inputOptions => {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (typeof params.inputOptions === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputValue = (instance, params) => {
    const input = instance.getInput();
    if (!input) {
      return;
    }
    hide(input);
    asPromise(params.inputValue).then(inputValue => {
      input.value = params.input === 'number' ? `${parseFloat(inputValue) || 0}` : `${inputValue}`;
      show(input);
      input.focus();
      instance.hideLoading();
    }).catch(err => {
      error(`Error in inputValue promise: ${err}`);
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  /**
   * @param {HTMLElement} popup
   * @param {InputOptionFlattened[]} inputOptions
   * @param {SweetAlertOptions} params
   */
  function populateSelectOptions(popup, inputOptions, params) {
    const select = getDirectChildByClass(popup, swalClasses.select);
    if (!select) {
      return;
    }
    /**
     * @param {HTMLElement} parent
     * @param {string} optionLabel
     * @param {string} optionValue
     */
    const renderOption = (parent, optionLabel, optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      setInnerHtml(option, optionLabel);
      option.selected = isSelected(optionValue, params.inputValue);
      parent.appendChild(option);
    };
    inputOptions.forEach(inputOption => {
      const optionValue = inputOption[0];
      const optionLabel = inputOption[1];
      // <optgroup> spec:
      // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
      // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
      // check whether this is a <optgroup>
      if (Array.isArray(optionLabel)) {
        // if it is an array, then it is an <optgroup>
        const optgroup = document.createElement('optgroup');
        optgroup.label = optionValue;
        optgroup.disabled = false; // not configurable for now
        select.appendChild(optgroup);
        optionLabel.forEach(o => renderOption(optgroup, o[1], o[0]));
      } else {
        // case of <option>
        renderOption(select, optionLabel, optionValue);
      }
    });
    select.focus();
  }

  /**
   * @param {HTMLElement} popup
   * @param {InputOptionFlattened[]} inputOptions
   * @param {SweetAlertOptions} params
   */
  function populateRadioOptions(popup, inputOptions, params) {
    const radio = getDirectChildByClass(popup, swalClasses.radio);
    if (!radio) {
      return;
    }
    inputOptions.forEach(inputOption => {
      const radioValue = inputOption[0];
      const radioLabel = inputOption[1];
      const radioInput = document.createElement('input');
      const radioLabelElement = document.createElement('label');
      radioInput.type = 'radio';
      radioInput.name = swalClasses.radio;
      radioInput.value = radioValue;
      if (isSelected(radioValue, params.inputValue)) {
        radioInput.checked = true;
      }
      const label = document.createElement('span');
      setInnerHtml(label, radioLabel);
      label.className = swalClasses.label;
      radioLabelElement.appendChild(radioInput);
      radioLabelElement.appendChild(label);
      radio.appendChild(radioLabelElement);
    });
    const radios = radio.querySelectorAll('input');
    if (radios.length) {
      radios[0].focus();
    }
  }

  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   *
   * @param {*} inputOptions
   * @typedef {string[]} InputOptionFlattened
   * @returns {InputOptionFlattened[]}
   */
  const formatInputOptions = inputOptions => {
    /** @type {InputOptionFlattened[]} */
    const result = [];
    if (inputOptions instanceof Map) {
      inputOptions.forEach((value, key) => {
        let valueFormatted = value;
        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }
        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(key => {
        let valueFormatted = inputOptions[key];
        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }
        result.push([key, valueFormatted]);
      });
    }
    return result;
  };

  /**
   * @param {string} optionValue
   * @param {SweetAlertInputValue} inputValue
   * @returns {boolean}
   */
  const isSelected = (optionValue, inputValue) => {
    return !!inputValue && inputValue.toString() === optionValue.toString();
  };

  /**
   * @param {SweetAlert} instance
   */
  const handleConfirmButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.input) {
      handleConfirmOrDenyWithInput(instance, 'confirm');
    } else {
      confirm(instance, true);
    }
  };

  /**
   * @param {SweetAlert} instance
   */
  const handleDenyButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.returnInputValueOnDeny) {
      handleConfirmOrDenyWithInput(instance, 'deny');
    } else {
      deny(instance, false);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleCancelButtonClick = (instance, dismissWith) => {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  /**
   * @param {SweetAlert} instance
   * @param {'confirm' | 'deny'} type
   */
  const handleConfirmOrDenyWithInput = (instance, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    if (!innerParams.input) {
      error(`The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(type)}`);
      return;
    }
    const input = instance.getInput();
    const inputValue = getInputValue(instance, innerParams);
    if (innerParams.inputValidator) {
      handleInputValidator(instance, inputValue, type);
    } else if (input && !input.checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage || input.validationMessage);
    } else if (type === 'deny') {
      deny(instance, inputValue);
    } else {
      confirm(instance, inputValue);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertInputValue} inputValue
   * @param {'confirm' | 'deny'} type
   */
  const handleInputValidator = (instance, inputValue, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableInput();
    const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
    validationPromise.then(validationMessage => {
      instance.enableButtons();
      instance.enableInput();
      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else if (type === 'deny') {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    });
  };

  /**
   * @param {SweetAlert} instance
   * @param {*} value
   */
  const deny = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);
    if (innerParams.showLoaderOnDeny) {
      showLoading(getDenyButton());
    }
    if (innerParams.preDeny) {
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
      const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
      preDenyPromise.then(preDenyValue => {
        if (preDenyValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          instance.close(/** @type SweetAlertResult */{
            isDenied: true,
            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
          });
        }
      }).catch(error => rejectWith(instance || undefined, error));
    } else {
      instance.close(/** @type SweetAlertResult */{
        isDenied: true,
        value
      });
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {*} value
   */
  const succeedWith = (instance, value) => {
    instance.close(/** @type SweetAlertResult */{
      isConfirmed: true,
      value
    });
  };

  /**
   *
   * @param {SweetAlert} instance
   * @param {string} error
   */
  const rejectWith = (instance, error) => {
    instance.rejectPromise(error);
  };

  /**
   *
   * @param {SweetAlert} instance
   * @param {*} value
   */
  const confirm = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);
    if (innerParams.showLoaderOnConfirm) {
      showLoading();
    }
    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
      const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
      preConfirmPromise.then(preConfirmValue => {
        if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      }).catch(error => rejectWith(instance || undefined, error));
    } else {
      succeedWith(instance, value);
    }
  };

  /**
   * Hides loader and shows back the button which was hidden by .showLoading()
   */
  function hideLoading() {
    // do nothing if popup is closed
    const innerParams = privateProps.innerParams.get(this);
    if (!innerParams) {
      return;
    }
    const domCache = privateProps.domCache.get(this);
    hide(domCache.loader);
    if (isToast()) {
      if (innerParams.icon) {
        show(getIcon());
      }
    } else {
      showRelatedButton(domCache);
    }
    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.denyButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }
  const showRelatedButton = domCache => {
    const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));
    if (buttonToReplace.length) {
      show(buttonToReplace[0], 'inline-block');
    } else if (allButtonsAreHidden()) {
      hide(domCache.actions);
    }
  };

  /**
   * Gets the input DOM node, this method works with input parameter.
   *
   * @returns {HTMLInputElement | null}
   */
  function getInput() {
    const innerParams = privateProps.innerParams.get(this);
    const domCache = privateProps.domCache.get(this);
    if (!domCache) {
      return null;
    }
    return getInput$1(domCache.popup, innerParams.input);
  }

  /**
   * @param {SweetAlert} instance
   * @param {string[]} buttons
   * @param {boolean} disabled
   */
  function setButtonsDisabled(instance, buttons, disabled) {
    const domCache = privateProps.domCache.get(instance);
    buttons.forEach(button => {
      domCache[button].disabled = disabled;
    });
  }

  /**
   * @param {HTMLInputElement | null} input
   * @param {boolean} disabled
   */
  function setInputDisabled(input, disabled) {
    const popup = getPopup();
    if (!popup || !input) {
      return;
    }
    if (input.type === 'radio') {
      /** @type {NodeListOf<HTMLInputElement>} */
      const radios = popup.querySelectorAll(`[name="${swalClasses.radio}"]`);
      for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  /**
   * Enable all the buttons
   * @this {SweetAlert}
   */
  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
  }

  /**
   * Disable all the buttons
   * @this {SweetAlert}
   */
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
  }

  /**
   * Enable the input field
   * @this {SweetAlert}
   */
  function enableInput() {
    setInputDisabled(this.getInput(), false);
  }

  /**
   * Disable the input field
   * @this {SweetAlert}
   */
  function disableInput() {
    setInputDisabled(this.getInput(), true);
  }

  /**
   * Show block with validation message
   *
   * @param {string} error
   * @this {SweetAlert}
   */
  function showValidationMessage(error) {
    const domCache = privateProps.domCache.get(this);
    const params = privateProps.innerParams.get(this);
    setInnerHtml(domCache.validationMessage, error);
    domCache.validationMessage.className = swalClasses['validation-message'];
    if (params.customClass && params.customClass.validationMessage) {
      addClass(domCache.validationMessage, params.customClass.validationMessage);
    }
    show(domCache.validationMessage);
    const input = this.getInput();
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  }

  /**
   * Hide block with validation message
   *
   * @this {SweetAlert}
   */
  function resetValidationMessage() {
    const domCache = privateProps.domCache.get(this);
    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }
    const input = this.getInput();
    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      removeClass(input, swalClasses.inputerror);
    }
  }

  const defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconColor: undefined,
    iconHtml: undefined,
    template: undefined,
    toast: false,
    draggable: false,
    animation: true,
    theme: 'light',
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: {},
    target: 'body',
    color: undefined,
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showDenyButton: false,
    showCancelButton: false,
    preConfirm: undefined,
    preDeny: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    returnFocus: true,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    showLoaderOnDeny: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputLabel: '',
    inputValue: '',
    inputOptions: {},
    inputAutoFocus: true,
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    returnInputValueOnDeny: false,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    willOpen: undefined,
    didOpen: undefined,
    didRender: undefined,
    willClose: undefined,
    didClose: undefined,
    didDestroy: undefined,
    scrollbarPadding: true,
    topLayer: false
  };
  const updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'color', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'draggable', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'preConfirm', 'preDeny', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'theme', 'willClose'];

  /** @type {Record<string, string | undefined>} */
  const deprecatedParams = {
    allowEnterKey: undefined
  };
  const toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'draggable', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];

  /**
   * Is valid parameter
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isValidParameter = paramName => {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };

  /**
   * Is valid parameter for Swal.update() method
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isUpdatableParameter = paramName => {
    return updatableParams.indexOf(paramName) !== -1;
  };

  /**
   * Is deprecated parameter
   *
   * @param {string} paramName
   * @returns {string | undefined}
   */
  const isDeprecatedParameter = paramName => {
    return deprecatedParams[paramName];
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsValid = param => {
    if (!isValidParameter(param)) {
      warn(`Unknown parameter "${param}"`);
    }
  };

  /**
   * @param {string} param
   */
  const checkIfToastParamIsValid = param => {
    if (toastIncompatibleParams.includes(param)) {
      warn(`The parameter "${param}" is incompatible with toasts`);
    }
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsDeprecated = param => {
    const isDeprecated = isDeprecatedParameter(param);
    if (isDeprecated) {
      warnAboutDeprecation(param, isDeprecated);
    }
  };

  /**
   * Show relevant warnings for given params
   *
   * @param {SweetAlertOptions} params
   */
  const showWarningsForParams = params => {
    if (params.backdrop === false && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }
    if (params.theme && !['light', 'dark', 'auto', 'minimal', 'borderless', 'bootstrap-4', 'bootstrap-4-light', 'bootstrap-4-dark', 'bootstrap-5', 'bootstrap-5-light', 'bootstrap-5-dark', 'material-ui', 'material-ui-light', 'material-ui-dark', 'embed-iframe', 'bulma', 'bulma-light', 'bulma-dark'].includes(params.theme)) {
      warn(`Invalid theme "${params.theme}"`);
    }
    for (const param in params) {
      checkIfParamIsValid(param);
      if (params.toast) {
        checkIfToastParamIsValid(param);
      }
      checkIfParamIsDeprecated(param);
    }
  };

  /**
   * Updates popup parameters.
   *
   * @param {SweetAlertOptions} params
   */
  function update(params) {
    const container = getContainer();
    const popup = getPopup();
    const innerParams = privateProps.innerParams.get(this);
    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      warn(`You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`);
      return;
    }
    const validUpdatableParams = filterValidParams(params);
    const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
    showWarningsForParams(updatedParams);
    container.dataset['swal2Theme'] = updatedParams.theme;
    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: Object.assign({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  /**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */
  const filterValidParams = params => {
    const validUpdatableParams = {};
    Object.keys(params).forEach(param => {
      if (isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn(`Invalid parameter to update: ${param}`);
      }
    });
    return validUpdatableParams;
  };

  /**
   * Dispose the current SweetAlert2 instance
   */
  function _destroy() {
    const domCache = privateProps.domCache.get(this);
    const innerParams = privateProps.innerParams.get(this);
    if (!innerParams) {
      disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
      return; // This instance has already been destroyed
    }

    // Check if there is another Swal closing
    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    }
    if (typeof innerParams.didDestroy === 'function') {
      innerParams.didDestroy();
    }
    globalState.eventEmitter.emit('didDestroy');
    disposeSwal(this);
  }

  /**
   * @param {SweetAlert} instance
   */
  const disposeSwal = instance => {
    disposeWeakMaps(instance);
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params;
    // Unset globalState props so GC will dispose globalState (#1569)
    delete globalState.keydownHandler;
    delete globalState.keydownTarget;
    // Unset currentInstance
    delete globalState.currentInstance;
  };

  /**
   * @param {SweetAlert} instance
   */
  const disposeWeakMaps = instance => {
    // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
    if (instance.isAwaitingPromise) {
      unsetWeakMaps(privateProps, instance);
      instance.isAwaitingPromise = true;
    } else {
      unsetWeakMaps(privateMethods, instance);
      unsetWeakMaps(privateProps, instance);
      delete instance.isAwaitingPromise;
      // Unset instance methods
      delete instance.disableButtons;
      delete instance.enableButtons;
      delete instance.getInput;
      delete instance.disableInput;
      delete instance.enableInput;
      delete instance.hideLoading;
      delete instance.disableLoading;
      delete instance.showValidationMessage;
      delete instance.resetValidationMessage;
      delete instance.close;
      delete instance.closePopup;
      delete instance.closeModal;
      delete instance.closeToast;
      delete instance.rejectPromise;
      delete instance.update;
      delete instance._destroy;
    }
  };

  /**
   * @param {object} obj
   * @param {SweetAlert} instance
   */
  const unsetWeakMaps = (obj, instance) => {
    for (const i in obj) {
      obj[i].delete(instance);
    }
  };

  var instanceMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _destroy: _destroy,
    close: close,
    closeModal: close,
    closePopup: close,
    closeToast: close,
    disableButtons: disableButtons,
    disableInput: disableInput,
    disableLoading: hideLoading,
    enableButtons: enableButtons,
    enableInput: enableInput,
    getInput: getInput,
    handleAwaitingPromise: handleAwaitingPromise,
    hideLoading: hideLoading,
    rejectPromise: rejectPromise,
    resetValidationMessage: resetValidationMessage,
    showValidationMessage: showValidationMessage,
    update: update
  });

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {DomCache} domCache
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handlePopupClick = (innerParams, domCache, dismissWith) => {
    if (innerParams.toast) {
      handleToastClick(innerParams, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache);

      // Ignore click events that had mousedown on the container but mouseup on the popup
      handleContainerMousedown(domCache);
      handleModalClick(innerParams, domCache, dismissWith);
    }
  };

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {DomCache} domCache
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleToastClick = (innerParams, domCache, dismissWith) => {
    // Closing toast by internal click
    domCache.popup.onclick = () => {
      if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
        return;
      }
      dismissWith(DismissReason.close);
    };
  };

  /**
   * @param {SweetAlertOptions} innerParams
   * @returns {boolean}
   */
  const isAnyButtonShown = innerParams => {
    return !!(innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton);
  };
  let ignoreOutsideClick = false;

  /**
   * @param {DomCache} domCache
   */
  const handleModalMousedown = domCache => {
    domCache.popup.onmousedown = () => {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = () => {};
        // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup
        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {DomCache} domCache
   */
  const handleContainerMousedown = domCache => {
    domCache.container.onmousedown = e => {
      // prevent the modal text from being selected on double click on the container (allowOutsideClick: false)
      if (e.target === domCache.container) {
        e.preventDefault();
      }
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = () => {};
        // We also need to check if the mouseup target is a child of the popup
        if (e.target === domCache.popup || e.target instanceof HTMLElement && domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {DomCache} domCache
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleModalClick = (innerParams, domCache, dismissWith) => {
    domCache.container.onclick = e => {
      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }
      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  const isJqueryElement = elem => typeof elem === 'object' && elem.jquery;
  const isElement = elem => elem instanceof Element || isJqueryElement(elem);
  const argsToParams = args => {
    const params = {};
    if (typeof args[0] === 'object' && !isElement(args[0])) {
      Object.assign(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach((name, index) => {
        const arg = args[index];
        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
        }
      });
    }
    return params;
  };

  /**
   * Main method to create a new SweetAlert2 popup
   *
   * @param  {...SweetAlertOptions} args
   * @returns {Promise<SweetAlertResult>}
   */
  function fire(...args) {
    return new this(...args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param {SweetAlertOptions} mixinParams
   * @returns {SweetAlert}
   */
  function mixin(mixinParams) {
    class MixinSwal extends this {
      _main(params, priorityMixinParams) {
        return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
      }
    }
    // @ts-ignore
    return MixinSwal;
  }

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   *
   * @returns {number | undefined}
   */
  const getTimerLeft = () => {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };

  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const stopTimer = () => {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };

  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const resumeTimer = () => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };

  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const toggleTimer = () => {
    const timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };

  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @param {number} ms
   * @returns {number | undefined}
   */
  const increaseTimer = ms => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.increase(ms);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };

  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   *
   * @returns {boolean}
   */
  const isTimerRunning = () => {
    return !!(globalState.timeout && globalState.timeout.isRunning());
  };

  let bodyClickListenerAdded = false;
  const clickHandlers = {};

  /**
   * @param {string} attr
   */
  function bindClickHandler(attr = 'data-swal-template') {
    clickHandlers[attr] = this;
    if (!bodyClickListenerAdded) {
      document.body.addEventListener('click', bodyClickListener);
      bodyClickListenerAdded = true;
    }
  }
  const bodyClickListener = event => {
    for (let el = event.target; el && el !== document; el = el.parentNode) {
      for (const attr in clickHandlers) {
        const template = el.getAttribute(attr);
        if (template) {
          clickHandlers[attr].fire({
            template
          });
          return;
        }
      }
    }
  };

  // Source: https://gist.github.com/mudge/5830382?permalink_comment_id=2691957#gistcomment-2691957

  class EventEmitter {
    constructor() {
      /** @type {Events} */
      this.events = {};
    }

    /**
     * @param {string} eventName
     * @returns {EventHandlers}
     */
    _getHandlersByEventName(eventName) {
      if (typeof this.events[eventName] === 'undefined') {
        // not Set because we need to keep the FIFO order
        // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1748990334
        this.events[eventName] = [];
      }
      return this.events[eventName];
    }

    /**
     * @param {string} eventName
     * @param {EventHandler} eventHandler
     */
    on(eventName, eventHandler) {
      const currentHandlers = this._getHandlersByEventName(eventName);
      if (!currentHandlers.includes(eventHandler)) {
        currentHandlers.push(eventHandler);
      }
    }

    /**
     * @param {string} eventName
     * @param {EventHandler} eventHandler
     */
    once(eventName, eventHandler) {
      /**
       * @param {Array} args
       */
      const onceFn = (...args) => {
        this.removeListener(eventName, onceFn);
        eventHandler.apply(this, args);
      };
      this.on(eventName, onceFn);
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     */
    emit(eventName, ...args) {
      this._getHandlersByEventName(eventName).forEach(
      /**
       * @param {EventHandler} eventHandler
       */
      eventHandler => {
        try {
          eventHandler.apply(this, args);
        } catch (error) {
          console.error(error);
        }
      });
    }

    /**
     * @param {string} eventName
     * @param {EventHandler} eventHandler
     */
    removeListener(eventName, eventHandler) {
      const currentHandlers = this._getHandlersByEventName(eventName);
      const index = currentHandlers.indexOf(eventHandler);
      if (index > -1) {
        currentHandlers.splice(index, 1);
      }
    }

    /**
     * @param {string} eventName
     */
    removeAllListeners(eventName) {
      if (this.events[eventName] !== undefined) {
        // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1749239222
        this.events[eventName].length = 0;
      }
    }
    reset() {
      this.events = {};
    }
  }

  globalState.eventEmitter = new EventEmitter();

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  const on = (eventName, eventHandler) => {
    globalState.eventEmitter.on(eventName, eventHandler);
  };

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  const once = (eventName, eventHandler) => {
    globalState.eventEmitter.once(eventName, eventHandler);
  };

  /**
   * @param {string} [eventName]
   * @param {EventHandler} [eventHandler]
   */
  const off = (eventName, eventHandler) => {
    // Remove all handlers for all events
    if (!eventName) {
      globalState.eventEmitter.reset();
      return;
    }
    if (eventHandler) {
      // Remove a specific handler
      globalState.eventEmitter.removeListener(eventName, eventHandler);
    } else {
      // Remove all handlers for a specific event
      globalState.eventEmitter.removeAllListeners(eventName);
    }
  };

  var staticMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    argsToParams: argsToParams,
    bindClickHandler: bindClickHandler,
    clickCancel: clickCancel,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    enableLoading: showLoading,
    fire: fire,
    getActions: getActions,
    getCancelButton: getCancelButton,
    getCloseButton: getCloseButton,
    getConfirmButton: getConfirmButton,
    getContainer: getContainer,
    getDenyButton: getDenyButton,
    getFocusableElements: getFocusableElements,
    getFooter: getFooter,
    getHtmlContainer: getHtmlContainer,
    getIcon: getIcon,
    getIconContent: getIconContent,
    getImage: getImage,
    getInputLabel: getInputLabel,
    getLoader: getLoader,
    getPopup: getPopup,
    getProgressSteps: getProgressSteps,
    getTimerLeft: getTimerLeft,
    getTimerProgressBar: getTimerProgressBar,
    getTitle: getTitle,
    getValidationMessage: getValidationMessage,
    increaseTimer: increaseTimer,
    isDeprecatedParameter: isDeprecatedParameter,
    isLoading: isLoading,
    isTimerRunning: isTimerRunning,
    isUpdatableParameter: isUpdatableParameter,
    isValidParameter: isValidParameter,
    isVisible: isVisible,
    mixin: mixin,
    off: off,
    on: on,
    once: once,
    resumeTimer: resumeTimer,
    showLoading: showLoading,
    stopTimer: stopTimer,
    toggleTimer: toggleTimer
  });

  class Timer {
    /**
     * @param {() => void} callback
     * @param {number} delay
     */
    constructor(callback, delay) {
      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    /**
     * @returns {number}
     */
    start() {
      if (!this.running) {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
      }
      return this.remaining;
    }

    /**
     * @returns {number}
     */
    stop() {
      if (this.started && this.running) {
        this.running = false;
        clearTimeout(this.id);
        this.remaining -= new Date().getTime() - this.started.getTime();
      }
      return this.remaining;
    }

    /**
     * @param {number} n
     * @returns {number}
     */
    increase(n) {
      const running = this.running;
      if (running) {
        this.stop();
      }
      this.remaining += n;
      if (running) {
        this.start();
      }
      return this.remaining;
    }

    /**
     * @returns {number}
     */
    getTimerLeft() {
      if (this.running) {
        this.stop();
        this.start();
      }
      return this.remaining;
    }

    /**
     * @returns {boolean}
     */
    isRunning() {
      return this.running;
    }
  }

  const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];

  /**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */
  const getTemplateParams = params => {
    const template = typeof params.template === 'string' ? (/** @type {HTMLTemplateElement} */document.querySelector(params.template)) : params.template;
    if (!template) {
      return {};
    }
    /** @type {DocumentFragment} */
    const templateContent = template.content;
    showWarningsForElements(templateContent);
    const result = Object.assign(getSwalParams(templateContent), getSwalFunctionParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, string | boolean | number>}
   */
  const getSwalParams = templateContent => {
    /** @type {Record<string, string | boolean | number>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalParams = Array.from(templateContent.querySelectorAll('swal-param'));
    swalParams.forEach(param => {
      showWarningsForAttributes(param, ['name', 'value']);
      const paramName = /** @type {keyof SweetAlertOptions} */param.getAttribute('name');
      const value = param.getAttribute('value');
      if (!paramName || !value) {
        return;
      }
      if (typeof defaultParams[paramName] === 'boolean') {
        result[paramName] = value !== 'false';
      } else if (typeof defaultParams[paramName] === 'object') {
        result[paramName] = JSON.parse(value);
      } else {
        result[paramName] = value;
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, () => void>}
   */
  const getSwalFunctionParams = templateContent => {
    /** @type {Record<string, () => void>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalFunctions = Array.from(templateContent.querySelectorAll('swal-function-param'));
    swalFunctions.forEach(param => {
      const paramName = /** @type {keyof SweetAlertOptions} */param.getAttribute('name');
      const value = param.getAttribute('value');
      if (!paramName || !value) {
        return;
      }
      result[paramName] = new Function(`return ${value}`)();
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, string | boolean>}
   */
  const getSwalButtons = templateContent => {
    /** @type {Record<string, string | boolean>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalButtons = Array.from(templateContent.querySelectorAll('swal-button'));
    swalButtons.forEach(button => {
      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
      const type = button.getAttribute('type');
      if (!type || !['confirm', 'cancel', 'deny'].includes(type)) {
        return;
      }
      result[`${type}ButtonText`] = button.innerHTML;
      result[`show${capitalizeFirstLetter(type)}Button`] = true;
      if (button.hasAttribute('color')) {
        result[`${type}ButtonColor`] = button.getAttribute('color');
      }
      if (button.hasAttribute('aria-label')) {
        result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label');
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Pick<SweetAlertOptions, 'imageUrl' | 'imageWidth' | 'imageHeight' | 'imageAlt'>}
   */
  const getSwalImage = templateContent => {
    const result = {};
    /** @type {HTMLElement | null} */
    const image = templateContent.querySelector('swal-image');
    if (image) {
      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
      if (image.hasAttribute('src')) {
        result.imageUrl = image.getAttribute('src') || undefined;
      }
      if (image.hasAttribute('width')) {
        result.imageWidth = image.getAttribute('width') || undefined;
      }
      if (image.hasAttribute('height')) {
        result.imageHeight = image.getAttribute('height') || undefined;
      }
      if (image.hasAttribute('alt')) {
        result.imageAlt = image.getAttribute('alt') || undefined;
      }
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {object}
   */
  const getSwalIcon = templateContent => {
    const result = {};
    /** @type {HTMLElement | null} */
    const icon = templateContent.querySelector('swal-icon');
    if (icon) {
      showWarningsForAttributes(icon, ['type', 'color']);
      if (icon.hasAttribute('type')) {
        result.icon = icon.getAttribute('type');
      }
      if (icon.hasAttribute('color')) {
        result.iconColor = icon.getAttribute('color');
      }
      result.iconHtml = icon.innerHTML;
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {object}
   */
  const getSwalInput = templateContent => {
    /** @type {object} */
    const result = {};
    /** @type {HTMLElement | null} */
    const input = templateContent.querySelector('swal-input');
    if (input) {
      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
      result.input = input.getAttribute('type') || 'text';
      if (input.hasAttribute('label')) {
        result.inputLabel = input.getAttribute('label');
      }
      if (input.hasAttribute('placeholder')) {
        result.inputPlaceholder = input.getAttribute('placeholder');
      }
      if (input.hasAttribute('value')) {
        result.inputValue = input.getAttribute('value');
      }
    }
    /** @type {HTMLElement[]} */
    const inputOptions = Array.from(templateContent.querySelectorAll('swal-input-option'));
    if (inputOptions.length) {
      result.inputOptions = {};
      inputOptions.forEach(option => {
        showWarningsForAttributes(option, ['value']);
        const optionValue = option.getAttribute('value');
        if (!optionValue) {
          return;
        }
        const optionName = option.innerHTML;
        result.inputOptions[optionValue] = optionName;
      });
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @param {string[]} paramNames
   * @returns {Record<string, string>}
   */
  const getSwalStringParams = (templateContent, paramNames) => {
    /** @type {Record<string, string>} */
    const result = {};
    for (const i in paramNames) {
      const paramName = paramNames[i];
      /** @type {HTMLElement | null} */
      const tag = templateContent.querySelector(paramName);
      if (tag) {
        showWarningsForAttributes(tag, []);
        result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
      }
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   */
  const showWarningsForElements = templateContent => {
    const allowedElements = swalStringParams.concat(['swal-param', 'swal-function-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option']);
    Array.from(templateContent.children).forEach(el => {
      const tagName = el.tagName.toLowerCase();
      if (!allowedElements.includes(tagName)) {
        warn(`Unrecognized element <${tagName}>`);
      }
    });
  };

  /**
   * @param {HTMLElement} el
   * @param {string[]} allowedAttributes
   */
  const showWarningsForAttributes = (el, allowedAttributes) => {
    Array.from(el.attributes).forEach(attribute => {
      if (allowedAttributes.indexOf(attribute.name) === -1) {
        warn([`Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`, `${allowedAttributes.length ? `Allowed attributes are: ${allowedAttributes.join(', ')}` : 'To set the value, use HTML within the element.'}`]);
      }
    });
  };

  const SHOW_CLASS_TIMEOUT = 10;

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {SweetAlertOptions} params
   */
  const openPopup = params => {
    const container = getContainer();
    const popup = getPopup();
    if (typeof params.willOpen === 'function') {
      params.willOpen(popup);
    }
    globalState.eventEmitter.emit('willOpen', popup);
    const bodyStyles = window.getComputedStyle(document.body);
    const initialBodyOverflow = bodyStyles.overflowY;
    addClasses(container, popup, params);

    // scrolling is 'hidden' until animation is done, after that 'auto'
    setTimeout(() => {
      setScrollingVisibility(container, popup);
    }, SHOW_CLASS_TIMEOUT);
    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }
    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }
    if (typeof params.didOpen === 'function') {
      setTimeout(() => params.didOpen(popup));
    }
    globalState.eventEmitter.emit('didOpen', popup);
  };

  /**
   * @param {AnimationEvent} event
   */
  const swalOpenAnimationFinished = event => {
    const popup = getPopup();
    if (event.target !== popup) {
      return;
    }
    const container = getContainer();
    popup.removeEventListener('animationend', swalOpenAnimationFinished);
    popup.removeEventListener('transitionend', swalOpenAnimationFinished);
    container.style.overflowY = 'auto';

    // no-transition is added in init() in case one swal is opened right after another
    removeClass(container, swalClasses['no-transition']);
  };

  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   */
  const setScrollingVisibility = (container, popup) => {
    if (hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener('animationend', swalOpenAnimationFinished);
      popup.addEventListener('transitionend', swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  /**
   * @param {HTMLElement} container
   * @param {boolean} scrollbarPadding
   * @param {string} initialBodyOverflow
   */
  const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
    iOSfix();
    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      replaceScrollbarWithPadding(initialBodyOverflow);
    }

    // sweetalert2/issues/1247
    setTimeout(() => {
      container.scrollTop = 0;
    });
  };

  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */
  const addClasses = (container, popup, params) => {
    addClass(container, params.showClass.backdrop);
    if (params.animation) {
      // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
      popup.style.setProperty('opacity', '0', 'important');
      show(popup, 'grid');
      setTimeout(() => {
        // Animate popup right after showing it
        addClass(popup, params.showClass.popup);
        // and remove the opacity workaround
        popup.style.removeProperty('opacity');
      }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062
    } else {
      show(popup, 'grid');
    }
    addClass([document.documentElement, document.body], swalClasses.shown);
    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var defaultInputValidators = {
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    email: (string, validationMessage) => {
      return /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    url: (string, validationMessage) => {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (params.inputValidator) {
      return;
    }
    if (params.input === 'email') {
      params.inputValidator = defaultInputValidators['email'];
    }
    if (params.input === 'url') {
      params.inputValidator = defaultInputValidators['url'];
    }
  }

  /**
   * @param {SweetAlertOptions} params
   */
  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }

  /**
   * Set type, text and actions on popup
   *
   * @param {SweetAlertOptions} params
   */
  function setParameters(params) {
    setDefaultInputValidators(params);

    // showLoaderOnConfirm && preConfirm
    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }
    validateCustomTargetElement(params);

    // Replace newlines with <br> in title
    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }
    init(params);
  }

  /** @type {SweetAlert} */
  let currentInstance;
  var _promise = /*#__PURE__*/new WeakMap();
  class SweetAlert {
    /**
     * @param {...(SweetAlertOptions | string)} args
     * @this {SweetAlert}
     */
    constructor(...args) {
      /**
       * @type {Promise<SweetAlertResult>}
       */
      _classPrivateFieldInitSpec(this, _promise, void 0);
      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      }
      currentInstance = this;

      // @ts-ignore
      const outerParams = Object.freeze(this.constructor.argsToParams(args));

      /** @type {Readonly<SweetAlertOptions>} */
      this.params = outerParams;

      /** @type {boolean} */
      this.isAwaitingPromise = false;
      _classPrivateFieldSet2(_promise, this, this._main(currentInstance.params));
    }
    _main(userParams, mixinParams = {}) {
      showWarningsForParams(Object.assign({}, mixinParams, userParams));
      if (globalState.currentInstance) {
        const swalPromiseResolve = privateMethods.swalPromiseResolve.get(globalState.currentInstance);
        const {
          isAwaitingPromise
        } = globalState.currentInstance;
        globalState.currentInstance._destroy();
        if (!isAwaitingPromise) {
          swalPromiseResolve({
            isDismissed: true
          });
        }
        if (isModal()) {
          unsetAriaHidden();
        }
      }
      globalState.currentInstance = currentInstance;
      const innerParams = prepareParams(userParams, mixinParams);
      setParameters(innerParams);
      Object.freeze(innerParams);

      // clear the previous timer
      if (globalState.timeout) {
        globalState.timeout.stop();
        delete globalState.timeout;
      }

      // clear the restore focus timeout
      clearTimeout(globalState.restoreFocusTimeout);
      const domCache = populateDomCache(currentInstance);
      render(currentInstance, innerParams);
      privateProps.innerParams.set(currentInstance, innerParams);
      return swalPromise(currentInstance, domCache, innerParams);
    }

    // `catch` cannot be the name of a module export, so we define our thenable methods here instead
    then(onFulfilled) {
      return _classPrivateFieldGet2(_promise, this).then(onFulfilled);
    }
    finally(onFinally) {
      return _classPrivateFieldGet2(_promise, this).finally(onFinally);
    }
  }

  /**
   * @param {SweetAlert} instance
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   * @returns {Promise}
   */
  const swalPromise = (instance, domCache, innerParams) => {
    return new Promise((resolve, reject) => {
      // functions to handle all closings/dismissals
      /**
       * @param {DismissReason} dismiss
       */
      const dismissWith = dismiss => {
        instance.close({
          isDismissed: true,
          dismiss,
          isConfirmed: false,
          isDenied: false
        });
      };
      privateMethods.swalPromiseResolve.set(instance, resolve);
      privateMethods.swalPromiseReject.set(instance, reject);
      domCache.confirmButton.onclick = () => {
        handleConfirmButtonClick(instance);
      };
      domCache.denyButton.onclick = () => {
        handleDenyButtonClick(instance);
      };
      domCache.cancelButton.onclick = () => {
        handleCancelButtonClick(instance, dismissWith);
      };
      domCache.closeButton.onclick = () => {
        dismissWith(DismissReason.close);
      };
      handlePopupClick(innerParams, domCache, dismissWith);
      addKeydownHandler(globalState, innerParams, dismissWith);
      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams);

      // Scroll container to top on open (#1247, #1946)
      setTimeout(() => {
        domCache.container.scrollTop = 0;
      });
    });
  };

  /**
   * @param {SweetAlertOptions} userParams
   * @param {SweetAlertOptions} mixinParams
   * @returns {SweetAlertOptions}
   */
  const prepareParams = (userParams, mixinParams) => {
    const templateParams = getTemplateParams(userParams);
    const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
    params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
    params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
    if (params.animation === false) {
      params.showClass = {
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }
    return params;
  };

  /**
   * @param {SweetAlert} instance
   * @returns {DomCache}
   */
  const populateDomCache = instance => {
    const domCache = {
      popup: getPopup(),
      container: getContainer(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      denyButton: getDenyButton(),
      cancelButton: getCancelButton(),
      loader: getLoader(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  /**
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const setupTimer = (globalState, innerParams, dismissWith) => {
    const timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);
    if (innerParams.timer) {
      globalState.timeout = new Timer(() => {
        dismissWith('timer');
        delete globalState.timeout;
      }, innerParams.timer);
      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
        setTimeout(() => {
          if (globalState.timeout && globalState.timeout.running) {
            // timer can be already stopped or unset at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  /**
   * Initialize focus in the popup:
   *
   * 1. If `toast` is `true`, don't steal focus from the document.
   * 2. Else if there is an [autofocus] element, focus it.
   * 3. Else if `focusConfirm` is `true` and confirm button is visible, focus it.
   * 4. Else if `focusDeny` is `true` and deny button is visible, focus it.
   * 5. Else if `focusCancel` is `true` and cancel button is visible, focus it.
   * 6. Else focus the first focusable element in a popup (if any).
   *
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   */
  const initFocus = (domCache, innerParams) => {
    if (innerParams.toast) {
      return;
    }
    // TODO: this is dumb, remove `allowEnterKey` param in the next major version
    if (!callIfFunction(innerParams.allowEnterKey)) {
      warnAboutDeprecation('allowEnterKey');
      blurActiveElement();
      return;
    }
    if (focusAutofocus(domCache)) {
      return;
    }
    if (focusButton(domCache, innerParams)) {
      return;
    }
    setFocus(-1, 1);
  };

  /**
   * @param {DomCache} domCache
   * @returns {boolean}
   */
  const focusAutofocus = domCache => {
    const autofocusElements = Array.from(domCache.popup.querySelectorAll('[autofocus]'));
    for (const autofocusElement of autofocusElements) {
      if (autofocusElement instanceof HTMLElement && isVisible$1(autofocusElement)) {
        autofocusElement.focus();
        return true;
      }
    }
    return false;
  };

  /**
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   * @returns {boolean}
   */
  const focusButton = (domCache, innerParams) => {
    if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
      domCache.denyButton.focus();
      return true;
    }
    if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
      domCache.cancelButton.focus();
      return true;
    }
    if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
      domCache.confirmButton.focus();
      return true;
    }
    return false;
  };
  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  // Assign instance methods from src/instanceMethods/*.js to prototype
  SweetAlert.prototype.disableButtons = disableButtons;
  SweetAlert.prototype.enableButtons = enableButtons;
  SweetAlert.prototype.getInput = getInput;
  SweetAlert.prototype.disableInput = disableInput;
  SweetAlert.prototype.enableInput = enableInput;
  SweetAlert.prototype.hideLoading = hideLoading;
  SweetAlert.prototype.disableLoading = hideLoading;
  SweetAlert.prototype.showValidationMessage = showValidationMessage;
  SweetAlert.prototype.resetValidationMessage = resetValidationMessage;
  SweetAlert.prototype.close = close;
  SweetAlert.prototype.closePopup = close;
  SweetAlert.prototype.closeModal = close;
  SweetAlert.prototype.closeToast = close;
  SweetAlert.prototype.rejectPromise = rejectPromise;
  SweetAlert.prototype.update = update;
  SweetAlert.prototype._destroy = _destroy;

  // Assign static methods from src/staticMethods/*.js to constructor
  Object.assign(SweetAlert, staticMethods);

  // Proxy to instance methods to constructor, for now, for backwards compatibility
  Object.keys(instanceMethods).forEach(key => {
    /**
     * @param {...(SweetAlertOptions | string | undefined)} args
     * @returns {SweetAlertResult | Promise<SweetAlertResult> | undefined}
     */
    SweetAlert[key] = function (...args) {
      if (currentInstance && currentInstance[key]) {
        return currentInstance[key](...args);
      }
      return null;
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '11.26.3';

  const Swal = SweetAlert;
  // @ts-ignore
  Swal.default = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,":root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-icon-animations: true;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem;container-name:swal2-popup}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:all}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}@container swal2-popup style(--swal2-icon-animations:true){.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!******************************************!*\
  !*** ./src/assets/js/patient_summary.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

window.Swal = (sweetalert2__WEBPACK_IMPORTED_MODULE_0___default());

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
var progressIntervals = {};
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
      window.location.href = '../index.html';
    } else {
      console.log('JWT token is still valid.');
    }
  }
});
function toggleContent() {
  var slider = document.getElementById("content-slider");
  var content = document.getElementById("content");
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
var params = new URLSearchParams(window.location.search);
var urlUserName = params.get('user_name');
function fetchPatientCounts() {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Fetch active patients
  fetch("".concat(BASE_URL, "patient-name-list"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var _data$patients;
    var activeCount = ((_data$patients = data.patients) === null || _data$patients === void 0 ? void 0 : _data$patients.length) || 0;
    document.getElementById("activePatientCount").textContent = "Active (".concat(activeCount, ")");
  })["catch"](function (error) {
    console.error("Error fetching active patients:", error);
  });

  // Fetch archived patients
  fetch("".concat(BASE_URL, "get-archived-patients"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var _data$archived_patien;
    var archiveCount = ((_data$archived_patien = data.archived_patients) === null || _data$archived_patien === void 0 ? void 0 : _data$archived_patien.length) || 0;
    document.getElementById("archivePatientCount").textContent = "Archived (".concat(archiveCount, ")");
  })["catch"](function (error) {
    console.error("Error fetching archived patients:", error);
  });
}

// Call the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  fetchPatientCounts();
});
document.addEventListener("DOMContentLoaded", function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }
  fetchPatientList("".concat(BASE_URL, "patient-name-list"));
});
function fetchArchivedPatientList(url) {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }
  showLoadingMessage();
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.archived_patients && data.archived_patients.length > 0) {
      updateArchivedPatientList(data.archived_patients);
    } else {
      var patientList = document.querySelector(".navi");
      patientList.innerHTML = "";

      // Create the container
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "text-center mt-3";

      // Line 1: Trash icon
      var icon = document.createElement("i");
      icon.className = "fas fa-trash fa-2x text-muted my-2";
      emptyMsg.appendChild(icon);

      // Line break for spacing (optional)
      emptyMsg.appendChild(document.createElement("br"));

      // Line 2: Title text
      var title = document.createElement("div");
      title.textContent = "View Deleted Patients here";
      title.className = "fw-bold";
      emptyMsg.appendChild(title);

      // Line 3: Message text
      var text = document.createElement("div");
      text.textContent = "Restore them Within 60 Days";
      title.className = "fw-bold";
      emptyMsg.appendChild(text);

      // Append to the DOM
      patientList.appendChild(emptyMsg);
    }
  })["catch"](function (error) {
    return console.error("Error fetching archived patient list:", error);
  });
}

// Modified version for simple name list
function updateArchivedPatientList(patients) {
  var patientList = document.querySelector(".navi");
  patientList.innerHTML = "";
  // Add a select-all checkbox at the top if there are patients
  if (patients.length > 0) {
    var selectAllContainer = document.createElement("div");
    selectAllContainer.className = "flex items-center mb-3 px-1 pl-3";
    var selectAllCheckbox = document.createElement("input");
    selectAllCheckbox.type = "checkbox";
    selectAllCheckbox.id = "selectAllArchivePatients";
    selectAllCheckbox.className = "mr-2 cursor-pointer";
    var selectAllLabel = document.createElement("label");
    selectAllLabel.htmlFor = "selectAllArchivePatients";
    selectAllLabel.className = "text-xs cursor-pointer w-100";
    selectAllLabel.textContent = "Select All";
    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);

    // Add delete selected button
    var deleteSelectedBtn = document.createElement("button");
    deleteSelectedBtn.className = "disabled:opacity-50 disabled:pointer-events-none cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-2 px-3";
    deleteSelectedBtn.textContent = "Unarchive";
    deleteSelectedBtn.disabled = true;
    selectAllContainer.appendChild(deleteSelectedBtn);
    patientList.appendChild(selectAllContainer);

    // Select all functionality
    selectAllCheckbox.addEventListener("change", function () {
      var _this = this;
      var checkboxes = document.querySelectorAll(".patient-checkbox");
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = _this.checked;
      });
      deleteSelectedBtn.disabled = !this.checked;
    });

    // Delete selected functionality
    deleteSelectedBtn.addEventListener("click", function () {
      var selectedPatients = Array.from(document.querySelectorAll(".patient-checkbox:checked")).map(function (checkbox) {
        return checkbox.dataset.patientName;
      });
      if (selectedPatients.length === 0) return;
      var token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = '../index.html';
        return;
      }
      sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
        title: 'Unarchive',
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
      }).then(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(result) {
          var response, data, failed, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!result.isConfirmed) {
                  _context.n = 5;
                  break;
                }
                // Show loading while unarchiving
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                  title: 'Unarchiving...',
                  text: 'Please wait while we unarchive the patients.',
                  allowOutsideClick: false,
                  didOpen: function didOpen() {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().showLoading();
                  }
                });
                _context.p = 1;
                _context.n = 2;
                return fetch("".concat(BASE_URL, "unarchive-patient"), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer ".concat(token)
                  },
                  body: JSON.stringify({
                    patient_names: selectedPatients
                  })
                });
              case 2:
                response = _context.v;
                _context.n = 3;
                return response.json();
              case 3:
                data = _context.v;
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().close();
                if (data.results && data.results.every(function (r) {
                  return r.status === "unarchived";
                })) {
                  toastr.success("".concat(selectedPatients.length, " Patient(s) Unarchived Successfully"));
                  refreshPatientList();
                  fetchPatientCounts();
                } else {
                  failed = data.results.filter(function (r) {
                    return r.status !== "unarchived";
                  });
                  toastr.error("".concat(failed.length, " Patient(s) Failed to Unarchive"));
                }
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().close();
                console.error('API Error:', _t);
                toastr.error('Failed to Unarchive Patients');
              case 5:
                return _context.a(2);
            }
          }, _callee, null, [[1, 4]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
    patientList.addEventListener("change", function (e) {
      if (e.target.classList.contains("patient-checkbox")) {
        var anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
        deleteSelectedBtn.disabled = !anyChecked;
        var allChecked = document.querySelectorAll(".patient-checkbox:checked").length === document.querySelectorAll(".patient-checkbox").length;
        selectAllCheckbox.checked = allChecked;
      }
    });
  }
  patients.forEach(function (patient) {
    var name = patient.patient_name,
      diagnosis = patient.diagnosis,
      patient_id = patient.patient_id;
    var listItem = document.createElement("li");
    listItem.className = "patient-item navi-item flex items-center justify-between bg-gray-50 rounded-2xl p-2";
    listItem.style.backgroundColor = "#F3F6F9";
    listItem.style.borderRadius = "10px";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "patient-checkbox mr-3 cursor-pointer";
    checkbox.dataset.patientName = name;
    listItem.appendChild(checkbox);
    var nameLink = document.createElement("a");
    nameLink.className = "navi-link flex-grow w-100";
    nameLink.href = "#";
    nameLink.style.padding = "5px";
    var contentContainer = document.createElement("div");
    contentContainer.style.display = "block";
    var nameSpan = document.createElement("span");
    nameSpan.className = "navi-text font-semibold text-xs text-primary block";
    nameSpan.style.color = "#0b6fac";
    nameSpan.style.display = "inline-block";
    nameSpan.textContent = name;
    contentContainer.appendChild(nameSpan);
    var diagnosisSpan = document.createElement("span");
    diagnosisSpan.className = "navi-text text-gray-500 text-[11px]";
    diagnosisSpan.style.display = "block";
    var displayDiagnosis = diagnosis === "No diagnosis available" ? "No diagnosis available" : diagnosis;
    var truncatedDiagnosis = displayDiagnosis.length > 35 ? "".concat(displayDiagnosis.substring(0, 35), "...") : displayDiagnosis;
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
    var moreIcon = document.createElement("i");
    moreIcon.className = "flaticon-more text-dark";
    moreIcon.style.marginLeft = "10px";
    moreIcon.style.marginRight = "10px";
    moreIcon.style.fontSize = "13px";
    moreIcon.style.cursor = "pointer";
    moreIcon.onclick = function (event) {
      event.stopPropagation();
      var menu = document.getElementById("unarchiveMenu");
      var rect = moreIcon.getBoundingClientRect();
      if (window.innerWidth < 992) {
        menu.style.top = "".concat(rect.bottom + window.scrollY, "px");
        menu.style.left = "".concat(rect.left + window.scrollX, "px");
        menu.style.minWidth = "200px";
      } else {
        menu.style.top = "".concat(rect.top + window.scrollY + 20, "px");
        menu.style.left = "".concat(rect.left + window.scrollX + 20, "px");
        menu.style.minWidth = "150px";
      }
      menu.style.display = "block";
      setTimeout(function () {
        menu.style.display = "none";
      }, 3000);
      menu.dataset.patientName = name;
    };
    var noteMenu = document.getElementById("unarchiveMenu");

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
  var dictatedBtn = document.getElementById("dictated");
  var uploadedBtn = document.getElementById("uploaded");
  window.loadSutureFix = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(patientName, archiveState) {
      var token, container, res, data, html, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            token = localStorage.getItem("access_token");
            container = document.getElementById("dictated_listing");
            container.innerHTML = "\n            <p class=\"text-center text-gray-500 py-4 text-sm\">Loading dictated notes...</p>\n        ";
            _context2.p = 1;
            _context2.n = 2;
            return fetch("".concat(BASE_URL, "list-transcriptions-page"), {
              method: "POST",
              headers: {
                "Authorization": "Bearer ".concat(token),
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                patient_name: patientName,
                page: 1,
                page_size: "ALL",
                patient_status: archiveState
              })
            });
          case 2:
            res = _context2.v;
            _context2.n = 3;
            return res.json();
          case 3:
            data = _context2.v;
            if (!(!data.transcriptions || data.transcriptions.length === 0)) {
              _context2.n = 4;
              break;
            }
            container.innerHTML = "\n                    <p class=\"text-center text-gray-500 py-4 text-sm\">No Dictated Files Available</p>\n                ";
            return _context2.a(2);
          case 4:
            html = "";
            data.transcriptions.forEach(function (t) {
              var ts = t.timestamp.replace(/ <infostream[^>]*>/, "");
              var cleanText = t.file_content.trim().replace(/\n/g, " ");
              html += "\n                    <div class=\"mb-4 p-4 border rounded-lg shadow-sm border-gray-400 transcript-card\">\n\n                        <div class=\"flex justify-between text-xs text-gray-500 mb-2\">\n                            <span>".concat(ts, "</span>\n\n                            <div class=\"flex items-center gap-3\">\n\n                                <!-- PLAY BUTTON -->\n                                <span class=\"play-btn text-color text-sm cursor-pointer\"\n                                      data-audio-url=\"").concat(t.audio_file_url, "\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" \n                                        viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                                        <path d=\"M8 5v14l11-7z\"/>\n                                    </svg>\n                                </span>\n\n                                <!-- EDIT BUTTON -->\n                                <span class=\"edit-btn text-color text-sm cursor-pointer flex items-center gap-1\"\n                                      data-fulltext=\"").concat(cleanText.replace(/"/g, '&quot;'), "\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"\n                                        viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                                        <path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 \n                                                7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 \n                                                0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/>\n                                    </svg>\n                                </span>\n\n                            </div>\n                        </div>\n\n                        <p class=\"transcript-text text-sm text-gray-700\"\n                          data-fulltext=\"").concat(cleanText.replace(/"/g, '&quot;'), "\">\n                        </p>\n\n                    </div>\n                ");
            });
            container.innerHTML = html;
            applyDictatedShowMore();
            bindDictatedEvents();
            bindPlayEvents();
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error(_t2);
            container.innerHTML = "\n                <p class=\"text-center text-red-500 py-4 text-sm\">Failed to load dictated notes</p>\n            ";
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 5]]);
    }));
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var globalAudio = new Audio();
  var currentPlayingBtn = null;
  function bindPlayEvents() {
    document.querySelectorAll(".play-btn").forEach(function (btn) {
      btn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this2 = this;
        var audioUrl, token, response, blob, blobUrl, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              audioUrl = this.dataset.audioUrl; // SAME BUTTON → toggle play/pause
              if (!(currentPlayingBtn === this)) {
                _context3.n = 1;
                break;
              }
              if (globalAudio.paused) {
                globalAudio.play();
                setPauseIcon(this);
              } else {
                globalAudio.pause();
                setPlayIcon(this);
              }
              return _context3.a(2);
            case 1:
              // NEW AUDIO → stop previous
              if (currentPlayingBtn) setPlayIcon(currentPlayingBtn);
              globalAudio.pause();
              globalAudio.currentTime = 0;

              // Show loading spinner icon
              this.innerHTML = "<i class=\"ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2 text-color\"></i>";
              currentPlayingBtn = this;
              token = localStorage.getItem("access_token");
              _context3.p = 2;
              _context3.n = 3;
              return fetch("".concat(BASE_URL, "stream-audio"), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer ".concat(token)
                },
                body: JSON.stringify({
                  s3_url: audioUrl
                })
              });
            case 3:
              response = _context3.v;
              _context3.n = 4;
              return response.blob();
            case 4:
              blob = _context3.v;
              blobUrl = URL.createObjectURL(blob);
              globalAudio.src = blobUrl;
              _context3.n = 5;
              return globalAudio.play();
            case 5:
              setPauseIcon(this);
              globalAudio.onended = function () {
                setPlayIcon(_this2);
                currentPlayingBtn = null;
              };
              _context3.n = 7;
              break;
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              console.error(_t3);
              toastr.error("Audio playback failed");
              setPlayIcon(this);
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this, [[2, 6]]);
      })));
    });
  }
  function setPlayIcon(btn) {
    btn.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\"\n                viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                <path d=\"M8 5v14l11-7z\"/>\n            </svg>";
  }
  function setPauseIcon(btn) {
    btn.innerHTML = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\"\n                viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                <rect x=\"6\" y=\"4\" width=\"4\" height=\"14\"></rect>\n                <rect x=\"14\" y=\"4\" width=\"4\" height=\"14\"></rect>\n            </svg>";
  }
  document.querySelector(".process-edit").addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var processBtn, drawer, patientName, editedText, transcriptEdits;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          processBtn = document.querySelector(".process-edit");
          processBtn.disabled = true;

          // 🔄 Add spinner immediately
          processBtn.innerHTML = "\n            <span class=\"flex items-center gap-2 justify-center\">\n                <i class=\"ki-filled ki-arrows-circle animate-spin text-lg\"></i>\n                Processing...\n            </span>\n        ";

          // 🔥 CLOSE DRAWER IMMEDIATELY (do NOT wait for API)
          drawer = KTDrawer.getInstance(document.querySelector("#drawer_1"));
          drawer.hide();
          patientName = document.getElementById("getPatientNameFromList").value;
          editedText = document.getElementById("editor_textarea").value.trim();
          transcriptEdits = {
            patient_name: patientName,
            edits: [{
              timestamp: window.currentEditingTimestamp,
              content: editedText
            }]
          }; // Save + Spinner + Tick
          _context4.n = 1;
          return processTranscriptSave(transcriptEdits, patientName);
        case 1:
          // Reload dictated list after editing
          loadSutureFix(patientName, "active");

          // Reset button UI after save
          processBtn.disabled = false;
          processBtn.innerHTML = "Process";
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  })));
  function processTranscriptSave(_x4, _x5) {
    return _processTranscriptSave.apply(this, arguments);
  }
  function _processTranscriptSave() {
    _processTranscriptSave = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(transcriptEdits, patientName) {
      var _document$querySelect;
      var token, item, spinner, res, _item$querySelector, tick, _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            token = localStorage.getItem("access_token"); // 1️⃣ Find patient LI
            item = (_document$querySelect = document.querySelector(".patient-checkbox[data-patient-name=\"".concat(patientName, "\"]"))) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.closest("li"); // 2️⃣ Remove old icons
            document.querySelectorAll(".spinner-icon, .tick-icon").forEach(function (el) {
              return el.remove();
            });

            // 3️⃣ Add spinner
            if (item) {
              spinner = document.createElement("i");
              spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
              spinner.style.marginLeft = "10px";
              spinner.style.color = "#0b6fac";
              item.appendChild(spinner);
              item.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              });
            }

            // 4️⃣ Call backend
            _context6.p = 1;
            _context6.n = 2;
            return fetch("".concat(BASE_URL, "edit_raw_transcript_in_s3"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ".concat(token)
              },
              body: JSON.stringify(transcriptEdits)
            });
          case 2:
            res = _context6.v;
            if (res.ok) {
              _context6.n = 3;
              break;
            }
            throw new Error("Failed to save");
          case 3:
            toastr.success("Transcription Updated Successfully");

            // 5️⃣ Replace spinner with tick
            if (item) {
              (_item$querySelector = item.querySelector(".spinner-icon")) === null || _item$querySelector === void 0 || _item$querySelector.remove();
              tick = document.createElement("i");
              tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
              tick.style.marginLeft = "10px";
              tick.style.color = "#0b6fac";
              item.appendChild(tick);
            }

            // 6️⃣ Trigger summary refresh
            onDemandSummaryCall();
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t5 = _context6.v;
            console.error(_t5);
            toastr.error("Error saving transcript");
          case 5:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 4]]);
    }));
    return _processTranscriptSave.apply(this, arguments);
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
  document.getElementById("transcript_drawer").addEventListener("click", function () {
    resetTranscriptDrawer();
    // openDrawer();
    var pname = document.getElementById('getPatientNameFromList').value;
    loadSutureFix(pname, 'active');
  });
  function applyDictatedShowMore() {
    document.querySelectorAll(".transcript-text").forEach(function (el) {
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
  function truncateWithShowMore(element) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;
    var fullText = element.dataset.fulltext.trim();

    // formatted full HTML with <br>
    var formattedFullHTML = fullText.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");

    // If text is short → show full
    if (fullText.length <= limit) {
      element.innerHTML = formattedFullHTML;
      return;
    }

    // Short preview (truncate by characters, not words)
    var shortText = fullText.slice(0, limit).trim() + " ...";
    element.innerHTML = "\n            ".concat(shortText, "\n            <span class=\"text-color cursor-pointer text-sm show-toggle\">Show more</span>\n        ");
    var expanded = false;
    function toggle() {
      expanded = !expanded;
      if (expanded) {
        element.innerHTML = "\n                    ".concat(formattedFullHTML, "\n                    <span class=\"text-color cursor-pointer text-sm show-toggle\">Show less</span>\n                ");
      } else {
        element.innerHTML = "\n                    ".concat(shortText, "\n                    <span class=\"text-color cursor-pointer text-sm show-toggle\">Show more</span>\n                ");
      }

      // Rebind event because HTML was replaced
      element.querySelector(".show-toggle").addEventListener("click", toggle);
    }
    element.querySelector(".show-toggle").addEventListener("click", toggle);
  }
  function applyUploadedTruncate() {
    document.querySelectorAll(".uploaded-text").forEach(function (el) {
      truncateWithShowMore(el);
    });
  }
  window.loadUploads = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(patientName, archiveState) {
      var token, container, res, data, html, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            token = localStorage.getItem("access_token");
            container = document.getElementById("uploaded_listing"); // Show loading text instead of spinner
            container.innerHTML = "\n            <p class=\"text-center text-gray-500 py-4 text-sm\">Loading uploads...</p>\n        ";
            _context5.p = 1;
            _context5.n = 2;
            return fetch("".concat(BASE_URL, "fetch-uploaded-txt"), {
              method: "POST",
              headers: {
                "Authorization": "Bearer ".concat(token),
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                patient_name: patientName,
                page: 1,
                page_size: "ALL",
                patient_status: archiveState
              })
            });
          case 2:
            res = _context5.v;
            _context5.n = 3;
            return res.json();
          case 3:
            data = _context5.v;
            if (!(!data.uploads || data.uploads.length === 0)) {
              _context5.n = 4;
              break;
            }
            container.innerHTML = "\n                    <p class=\"text-center text-gray-500 py-4 text-sm\">No Upload Files Available</p>\n                ";
            return _context5.a(2);
          case 4:
            html = "";
            data.uploads.forEach(function (upload) {
              var ts = upload.timestamp.replace(/ <infostream[^>]*>/, "");
              var content = upload.file_content;

              // Extract context
              var ctxMatch = content.match(/<upload_context:([^>]+)>/i);
              var context = ctxMatch ? ctxMatch[1].replace(/_/g, " ") : "";
              context = context.toLowerCase().replace(/\b\w/g, function (c) {
                return c.toUpperCase();
              });

              // Remove upload_context tag
              var cleanText = content.replace(/<upload_context:[^>]+>/i, "").trim();

              // Convert text to HTML with <br>
              var cleanHTML = cleanText.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
              html += "\n                    <div class=\"mb-4 p-4 border rounded-lg shadow-sm border-gray-400 transcript-card\">\n                        <div class=\"flex justify-between text-xs text-gray-500 mb-2\">\n                            <span>".concat(ts, "</span>\n                            <span class=\"text-color text-xs\">").concat(context, "</span>\n                        </div>\n\n                        <p class=\"uploaded-text text-sm text-gray-700\"\n                        data-fulltext=\"").concat(cleanText.replace(/"/g, '&quot;'), "\">\n                        ").concat(cleanHTML, "\n                        </p>\n                    </div>\n                ");
            });
            container.innerHTML = html;

            // Enable truncation with preserved formatting
            applyUploadedTruncate();
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t4 = _context5.v;
            console.error(_t4);
            container.innerHTML = "\n                <p class=\"text-center text-red-500 py-4 text-sm\">Failed to load uploads</p>\n            ";
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 5]]);
    }));
    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }();
  function bindDictatedEvents() {
    document.querySelectorAll(".edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // ⬅️ Capture timestamp for save
        var card = this.closest(".transcript-card");
        var ts = card.querySelector("span").innerText.trim();
        window.currentEditingTimestamp = ts;

        // Load text in editor
        var fullText = this.dataset.fulltext;
        openEditMode(fullText);
        document.getElementById("uploaded_listing").classList.add("hidden");
      });
    });
    document.querySelector(".cancel-edit").addEventListener("click", cancelEditMode);
  }
  function bindTabEvents() {
    dictatedBtn.disabled = false;
    uploadedBtn.disabled = false;
    dictatedBtn.addEventListener("click", function () {
      activateDictatedTab();
      var pname = document.getElementById('getPatientNameFromList').value;
      loadSutureFix(pname, 'active');
    });
    uploadedBtn.addEventListener("click", function () {
      activateUploadedTab();
      var currentPatientName = document.getElementById('getPatientNameFromList').value;
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
function fetchArchivedPatientDetails(_x8, _x9, _x0) {
  return _fetchArchivedPatientDetails.apply(this, arguments);
}
function _fetchArchivedPatientDetails() {
  _fetchArchivedPatientDetails = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(patientName, patientId, element) {
    var passPatientName, addModalPatientName, getPatientNameFromList, patientDetails, nameSpan, apiUrl, apiUrl_raw, summaryDiv, assessmentDiv, planDiv, rawTransDiv, reviewDiv, phyExamDiv, token, summarySeconds, assessmentSeconds, summaryTimer, assessmentTimer, response, data, file_content, jsonArray, jsonString, newObj, key, newKey, formattedText, _formattedText9, _formattedText0, _formattedText1, _formattedText10, diagnosis, diagnosisItems, _t25;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          // toggleContent();
          // const recordingBlock = document.querySelector('.patient-wise-recording');
          // if (recordingBlock) {
          //   recordingBlock.style.display = 'none';
          // }
          passPatientName = document.getElementById('passPatientName');
          addModalPatientName = document.getElementById('addModalPatientName');
          getPatientNameFromList = document.getElementById('getPatientNameFromList');
          if (passPatientName) passPatientName.value = patientName;
          if (addModalPatientName) addModalPatientName.textContent = patientName;
          if (getPatientNameFromList) getPatientNameFromList.value = patientName;
          selectedPatientName = patientName;
          patientDetails = document.querySelector('.patient-name');
          if (patientDetails) {
            patientDetails.innerHTML = '';
            nameSpan = document.createElement('span');
            nameSpan.classList.add('navi-text');
            nameSpan.textContent = patientName;
            patientDetails.appendChild(nameSpan);
          }
          apiUrl = "".concat(BASE_URL, "summary/display-patient-jobs-output?patient_name=").concat(patientName, "&patient_status=archived");
          apiUrl_raw = "".concat(BASE_URL, "summary/");
          summaryDiv = document.querySelector(".summary-container");
          assessmentDiv = document.querySelector(".assessment-container");
          planDiv = document.querySelector(".assessment-plan-container");
          rawTransDiv = document.querySelector(".raw-transcription-id");
          reviewDiv = document.querySelector(".review-of-system-id");
          phyExamDiv = document.querySelector(".physical-exam-id");
          token = localStorage.getItem('access_token');
          document.querySelectorAll(".navi-link").forEach(function (link) {
            return link.classList.remove("active");
          });
          // link.addEventListener("click", function (e) {
          //   e.preventDefault();

          // Remove active classes from all
          document.querySelectorAll(".navi-link").forEach(function (l) {
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
          summarySeconds = 0, assessmentSeconds = 0;
          summaryDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading... <span id=\"summary-timer\">0</span>s</p>";
          assessmentDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading... <span id=\"assessment-timer\">0</span>s</p>";
          planDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";
          reviewDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";
          phyExamDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";

          // Timers
          summaryTimer = setInterval(function () {
            summarySeconds++;
            document.getElementById("summary-timer").innerText = summarySeconds;
          }, 1000);
          assessmentTimer = setInterval(function () {
            assessmentSeconds++;
            document.getElementById("assessment-timer").innerText = assessmentSeconds;
          }, 1000);
          _context24.p = 1;
          _context24.n = 2;
          return fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(token)
            }
          });
        case 2:
          response = _context24.v;
          clearInterval(summaryTimer);
          clearInterval(assessmentTimer);
          _context24.n = 3;
          return response.json();
        case 3:
          data = _context24.v;
          // Update Summary
          file_content = data.file_content;
          jsonArray = [file_content];
          jsonString = JSON.stringify(jsonArray);
          newObj = {};
          for (key in file_content) {
            if (file_content.hasOwnProperty(key)) {
              newKey = key.replace(/\s/g, '_');
              newObj[newKey] = file_content[key];
            }
          }
          // Update Summary
          if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].length === 0) {
            summaryDiv.innerHTML = "<p class='text-xs'>No Summary Available</p>";
          } else {
            formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");
            summaryDiv.innerHTML = "\n        <div class=\"pt-0 inside-summary-section text-xs\">\n          ".concat(formattedText, "\n        </div>");
          }

          // Update Assessment
          if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].length === 0) {
            assessmentDiv.innerHTML = "<p class='text-xs'>No Interval Events Available</p>";
          } else {
            _formattedText9 = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");
            assessmentDiv.innerHTML = "\n        <div class=\"pt-0 inside-assess-section text-xs\">\n          ".concat(_formattedText9, "\n        </div>");
          }

          // Update Assessment Plan
          if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
            planDiv.innerHTML = "<p class='text-xs'>No Assessment Plan Available</p>";
          } else {
            _formattedText0 = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");
            planDiv.innerHTML = "\n        <div class=\"pt-0 inside-plan-section text-xs\">\n          ".concat(_formattedText0, "\n        </div>");
          }

          // Update Review of System
          if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
            reviewDiv.innerHTML = "<p class='text-xs'>No Review of System Available</p>";
          } else {
            _formattedText1 = newObj['Review_of_Systems'].replace(/\n/g, "<br>");
            reviewDiv.innerHTML = "\n        <div class=\"pt-0 inside-review-system-section text-xs\">\n          ".concat(_formattedText1, "\n        </div>");
          }

          //update physical examination
          if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
            phyExamDiv.innerHTML = "<p class='text-xs'>No Physical Examination Available</p>";
          } else {
            _formattedText10 = newObj['Physical_Examination'].replace(/\n/g, "<br>");
            phyExamDiv.innerHTML = "\n        <div class=\"pt-0 inside-physical-exam-section text-xs\">\n          ".concat(_formattedText10, "\n        </div>");
          }
          diagnosis = newObj['Principal_Diagnosis'] || '● None documented'; // Get all <li> elements with class "navi-item"
          diagnosisItems = document.querySelectorAll('li.navi-item');
          diagnosisItems.forEach(function (item) {
            var nameSpan = item.querySelector('.navi-text.font-semibold');
            var diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');
            if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
              if (diagnosis.length <= 24) {
                diagnosisSpan.style.marginRight = '40px';
              }
              // Limit diagnosis to 35 characters
              var truncatedDiagnosis = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
              diagnosisSpan.textContent = truncatedDiagnosis;
            }
          });
          _context24.n = 5;
          break;
        case 4:
          _context24.p = 4;
          _t25 = _context24.v;
          console.error("Error fetching data:", _t25);
          summaryDiv.innerHTML = "<p class='text-xs'>Error loading summary</p>";
          assessmentDiv.innerHTML = "<p class='text-xs'>Error loading assessment</p>";
          planDiv.innerHTML = "<p class='text-xs'>Error loading assessment plan</p>";
          reviewDiv.innerHTML = "<p class='text-xs'>Error loading Review of System</p>";
          phyExamDiv.innerHTML = "<p class='text-xs'>Error loading Physical Examination</p>";
        case 5:
          fetchArchivedPatientHpDetails(patientName);
          fetchArchivedPatientDsDetails(patientName);
          // loadTasks(patientName);

          // loadSutureFix(patientName, 'archived');
          // loadUploads(patientName, 'archived');      
          // loadPhrases('archived');  
        case 6:
          return _context24.a(2);
      }
    }, _callee24, null, [[1, 4]]);
  }));
  return _fetchArchivedPatientDetails.apply(this, arguments);
}
function fetchPatientList(url) {
  var isPending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
  }
  showLoadingMessage(); // Show loading before fetching

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (isPending) {
      // For pending patients - use original format (array of names)
      var patientNamesKey = "pending_patient_names";
      if (data[patientNamesKey] && data[patientNamesKey].length > 0) {
        updatePatientList(data[patientNamesKey], isPending);
      } else {
        showNoPatientsMessage();
      }
    } else {
      // For active patients - use new format (array of objects)
      var patientsKey = "patients";
      if (data[patientsKey] && data[patientsKey].length > 0) {
        // Convert to format expected by updatePatientList
        var patientData = data[patientsKey].map(function (patient) {
          return {
            name: patient.patient_name,
            diagnosis: patient.diagnosis,
            patient_id: patient.patient_id,
            rec_status: patient.rec_status
          };
        });
        var selectedSortValue = null;
        if (data.sort_by && data.sort_order) {
          selectedSortValue = "".concat(data.sort_by, "_").concat(data.sort_order);
        }
        updatePatientList(patientData, isPending, selectedSortValue);
      } else {
        showNoPatientsMessage();
      }
    }
  })["catch"](function (error) {
    return console.error("Error fetching patient list:", error);
  });
}
function showLoadingMessage() {
  document.querySelectorAll('.clear-content').forEach(function (div) {
    div.innerHTML = '';
  });
  // document.querySelector(".patient-wise-recording").style.display = 'none';
  var patientList = document.querySelector(".navi");
  patientList.innerHTML = ""; // Clear existing content

  var loadingItem = document.createElement("div");
  loadingItem.classList.add("show-section");
  loadingItem.innerHTML = "<h4 class=\"navi-text text-xs\">Loading...</h4>";
  patientList.appendChild(loadingItem);
}
function updatePatientList(_x1, _x10) {
  return _updatePatientList.apply(this, arguments);
}
function _updatePatientList() {
  _updatePatientList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(patientData, isPending) {
    var selectedSortValue,
      patientList,
      handleSort,
      selectAllContainer,
      selectDiv,
      selectAllCheckbox,
      selectAllLabel,
      rightActions,
      deleteSelectedBtn,
      sortIcon,
      customMenu,
      sortLabel,
      selectedSort,
      options,
      patientProgressMap,
      patientProgressCheck,
      token,
      res,
      data,
      _args28 = arguments,
      _t30;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          selectedSortValue = _args28.length > 2 && _args28[2] !== undefined ? _args28[2] : null;
          patientList = document.querySelector(".navi");
          patientList.innerHTML = "";

          // Add a select-all checkbox at the top if there are patients
          if (patientData.length > 0) {
            // === Sorting function ===
            handleSort = /*#__PURE__*/function () {
              var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(value) {
                var apiUrl, requestBody, token, response, sortedData, patientsKey, _patientData, _selectedSortValue, _t27, _t28;
                return _regenerator().w(function (_context26) {
                  while (1) switch (_context26.p = _context26.n) {
                    case 0:
                      apiUrl = "";
                      requestBody = {};
                      _t27 = value;
                      _context26.n = _t27 === "usage_asc" ? 1 : _t27 === "usage_desc" ? 2 : _t27 === "name_asc" ? 3 : _t27 === "name_desc" ? 4 : 5;
                      break;
                    case 1:
                      apiUrl = "".concat(BASE_URL, "patient-name-list");
                      requestBody = {
                        sort_by: "usage",
                        sort_order: "asc"
                      };
                      return _context26.a(3, 6);
                    case 2:
                      apiUrl = "".concat(BASE_URL, "patient-name-list");
                      requestBody = {
                        sort_by: "usage",
                        sort_order: "desc"
                      };
                      return _context26.a(3, 6);
                    case 3:
                      apiUrl = "".concat(BASE_URL, "patient-name-list");
                      requestBody = {
                        sort_by: "name",
                        sort_order: "asc"
                      };
                      return _context26.a(3, 6);
                    case 4:
                      apiUrl = "".concat(BASE_URL, "patient-name-list");
                      requestBody = {
                        sort_by: "name",
                        sort_order: "desc"
                      };
                      return _context26.a(3, 6);
                    case 5:
                      apiUrl = "".concat(BASE_URL, "patient-name-list");
                      requestBody = {};
                    case 6:
                      _context26.p = 6;
                      token = localStorage.getItem("access_token");
                      _context26.n = 7;
                      return fetch(apiUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer ".concat(token)
                        },
                        body: JSON.stringify(requestBody)
                      });
                    case 7:
                      response = _context26.v;
                      _context26.n = 8;
                      return response.json();
                    case 8:
                      sortedData = _context26.v;
                      patientsKey = "patients";
                      if (sortedData[patientsKey] && sortedData[patientsKey].length > 0) {
                        _patientData = sortedData[patientsKey].map(function (patient) {
                          return {
                            name: patient.patient_name,
                            diagnosis: patient.diagnosis,
                            patient_id: patient.patient_id,
                            rec_status: patient.rec_status
                          };
                        });
                        _selectedSortValue = null;
                        if (sortedData.sort_by && sortedData.sort_order) {
                          _selectedSortValue = "".concat(sortedData.sort_by, "_").concat(sortedData.sort_order);
                        }
                        updatePatientList(_patientData, isPending, _selectedSortValue);
                      }
                      _context26.n = 10;
                      break;
                    case 9:
                      _context26.p = 9;
                      _t28 = _context26.v;
                      console.error("Sorting failed:", _t28);
                      toastr.error("Failed to sort patients");
                    case 10:
                      return _context26.a(2);
                  }
                }, _callee26, null, [[6, 9]]);
              }));
              return function handleSort(_x33) {
                return _ref30.apply(this, arguments);
              };
            }();
            selectAllContainer = document.createElement("div");
            selectAllContainer.className = "flex items-center mb-3 px-2 pl-3 h-8";
            selectDiv = document.createElement("div");
            selectDiv.className = "flex items-center space-x-2";
            selectAllCheckbox = document.createElement("input");
            selectAllCheckbox.type = "checkbox";
            selectAllCheckbox.id = "selectAllPatients";
            selectAllCheckbox.className = "mr-2 cursor-pointer";
            selectAllLabel = document.createElement("label");
            selectAllLabel.htmlFor = "selectAllPatients";
            selectAllLabel.className = "text-xs cursor-pointer";
            selectAllLabel.textContent = "Select All";
            selectAllContainer.appendChild(selectDiv);
            selectAllContainer.appendChild(selectAllCheckbox);
            selectAllContainer.appendChild(selectAllLabel);

            // === right side wrapper (delete button only) ===
            rightActions = document.createElement("div");
            rightActions.className = "flex items-center ml-auto space-x-3";
            deleteSelectedBtn = document.createElement("button");
            deleteSelectedBtn.className = "disabled:opacity-50 disabled:pointer-events-none cursor-pointer border border-gray-300 bg-transparent shadow-md text-xs font-medium rounded-2xl py-1.5 px-5";
            deleteSelectedBtn.textContent = "Delete";
            deleteSelectedBtn.classList.add("deleteHidden");
            deleteSelectedBtn.disabled = true;
            rightActions.appendChild(deleteSelectedBtn);
            selectAllContainer.appendChild(rightActions);

            // === Sort dropdown functionality ===
            sortIcon = document.getElementById("sortIcon");
            customMenu = document.createElement("div");
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
            sortLabel = document.createElement("div");
            sortLabel.textContent = "Sort By";
            sortLabel.className = "font-weight-bold text-muted mb-1 ml-3 text-primary";
            sortLabel.style.marginLeft = "11px";
            customMenu.appendChild(sortLabel);
            selectedSort = selectedSortValue;
            options = [{
              label: "Newest First",
              value: "usage_desc",
              icon: "ki-solid ki-arrow-down fs-2"
            }, {
              label: "Oldest First",
              value: "usage_asc",
              icon: "ki-solid ki-arrow-up fs-2"
            }, {
              label: "A - Z",
              value: "name_asc",
              icon: "ki-solid ki-textalign-left fs-2"
            }, {
              label: "Z - A",
              value: "name_desc",
              icon: "ki-solid ki-textalign-right fs-2"
            }];
            options.forEach(function (opt) {
              var item = document.createElement("div");
              item.className = "dropdown-item flex align-items-center";
              item.style.cursor = "pointer";
              var leftWrapper = document.createElement("div");
              leftWrapper.className = "flex align-items-center ms-2 py-2";

              // Icon on left
              var icon = document.createElement("i");
              icon.className = opt.icon;
              icon.style.marginRight = "8px";
              icon.style.color = "#096fab";
              leftWrapper.appendChild(icon);

              // Label
              var label = document.createElement("span");
              label.textContent = opt.label;
              label.className = "text-2sm";
              leftWrapper.appendChild(label);
              item.appendChild(leftWrapper);

              // === Tick on right ===
              var tick = document.createElement("span");
              tick.textContent = "✔";
              tick.style.display = "none";
              tick.style.color = "#0b6fac";
              tick.className = "ml-5 mt-1";
              item.appendChild(tick);

              // === Set initial tick if API says so ===
              if (selectedSort === opt.value) {
                tick.style.display = "inline";
              }
              item.addEventListener("click", function () {
                selectedSort = opt.value;

                // reset all ticks
                customMenu.querySelectorAll(".dropdown-item span:last-child").forEach(function (s) {
                  return s.style.display = "none";
                });

                // show tick for this one
                tick.style.display = "inline";
                customMenu.style.display = "none";
                handleSort(opt.value);
              });
              customMenu.appendChild(item);
            });
            patientList.appendChild(selectAllContainer);

            /// === Toggle dropdown ===
            sortIcon.addEventListener("click", function (e) {
              e.stopPropagation();
              customMenu.style.display = customMenu.style.display === "none" ? "block" : "none";
            });
            document.addEventListener("click", function (e) {
              if (!sortIcon.contains(e.target) && !customMenu.contains(e.target)) {
                customMenu.style.display = "none";
              }
            });
            selectAllCheckbox.addEventListener("change", function () {
              var _this3 = this;
              var checkboxes = document.querySelectorAll(".patient-checkbox");
              checkboxes.forEach(function (checkbox) {
                checkbox.checked = _this3.checked;
              });
              var anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
              deleteSelectedBtn.classList.toggle("deleteHidden", !anyChecked);
              deleteSelectedBtn.disabled = !anyChecked;
            });
            deleteSelectedBtn.addEventListener("click", function () {
              var selectedPatients = Array.from(document.querySelectorAll(".patient-checkbox:checked")).map(function (checkbox) {
                return checkbox.dataset.patientName;
              });
              if (selectedPatients.length === 0) return;
              var token = localStorage.getItem("access_token");
              if (!token) {
                window.location.href = '../index.html';
                return;
              }
              sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
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
              }).then(/*#__PURE__*/function () {
                var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(result) {
                  var response, data, failed, _t26;
                  return _regenerator().w(function (_context25) {
                    while (1) switch (_context25.p = _context25.n) {
                      case 0:
                        if (!result.isConfirmed) {
                          _context25.n = 5;
                          break;
                        }
                        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                          title: 'Archiving...',
                          text: 'Please wait while archive the patients.',
                          allowOutsideClick: false,
                          didOpen: function didOpen() {
                            sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().showLoading();
                          }
                        });
                        _context25.p = 1;
                        _context25.n = 2;
                        return fetch("".concat(BASE_URL, "delete-patient"), {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(token)
                          },
                          body: JSON.stringify({
                            patient_names: selectedPatients
                          })
                        });
                      case 2:
                        response = _context25.v;
                        _context25.n = 3;
                        return response.json();
                      case 3:
                        data = _context25.v;
                        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().close();
                        if (data.results && data.results.every(function (r) {
                          return r.status === "archived";
                        })) {
                          toastr.success("".concat(selectedPatients.length, " Patient(s) Archived Successfully"));
                          refreshPatientList();
                          fetchPatientCounts();
                        } else {
                          failed = data.results.filter(function (r) {
                            return r.status !== "archived";
                          });
                          toastr.error("".concat(failed.length, " Patient(s) Failed to Archive"));
                        }
                        _context25.n = 5;
                        break;
                      case 4:
                        _context25.p = 4;
                        _t26 = _context25.v;
                        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().close();
                        console.error('API Error:', _t26);
                        toastr.error('Failed to Archive Patients');
                      case 5:
                        return _context25.a(2);
                    }
                  }, _callee25, null, [[1, 4]]);
                }));
                return function (_x32) {
                  return _ref29.apply(this, arguments);
                };
              }());
            });
            patientList.addEventListener("change", function (e) {
              if (e.target.classList.contains("patient-checkbox")) {
                var anyChecked = document.querySelectorAll(".patient-checkbox:checked").length > 0;
                deleteSelectedBtn.classList.toggle("deleteHidden", !anyChecked);
                deleteSelectedBtn.disabled = !anyChecked;
                var allChecked = document.querySelectorAll(".patient-checkbox:checked").length === document.querySelectorAll(".patient-checkbox").length;
                selectAllCheckbox.checked = allChecked;
              }
            });
          }
          patientProgressMap = {};
          patientProgressCheck = true;
          _context28.p = 1;
          token = localStorage.getItem("access_token");
          _context28.n = 2;
          return fetch("".concat(BASE_URL, "patient-progress-bar-redis"), {
            headers: {
              "Authorization": "Bearer ".concat(token)
            }
          });
        case 2:
          res = _context28.v;
          _context28.n = 3;
          return res.json();
        case 3:
          data = _context28.v;
          if (Array.isArray(data) && data.length) {
            data.forEach(function (entry) {
              if (entry.patient_id) {
                patientProgressMap[entry.patient_id] = entry;
              }
            });
          } else {
            patientProgressCheck = false;
          }
          _context28.n = 5;
          break;
        case 4:
          _context28.p = 4;
          _t30 = _context28.v;
          console.error("Progress check failed:", _t30);
          patientProgressCheck = false;
        case 5:
          patientData.forEach(function (item) {
            var name = typeof item === 'string' ? item : item.name;
            var diagnosis = _typeof(item) === 'object' ? item.diagnosis : null;
            var patientId = _typeof(item) === 'object' ? item.patient_id : null;
            var listItem = document.createElement("li");
            listItem.className = "patient-item navi-item flex items-center justify-between bg-gray-50 rounded-2xl p-2";
            listItem.style.backgroundColor = "#F3F6F9";
            listItem.style.borderRadius = "10px";
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "patient-checkbox mr-3 cursor-pointer";
            checkbox.dataset.patientName = name;
            listItem.appendChild(checkbox);
            var nameLink = document.createElement("a");
            nameLink.className = "navi-link flex-grow w-100";
            nameLink.href = "#";
            nameLink.style.padding = "5px";
            var contentContainer = document.createElement("div");
            contentContainer.className = "navi-spinner";
            contentContainer.style.display = "block";
            var nameSpan = document.createElement("span");
            nameSpan.className = "navi-text font-semibold text-xs text-primary block";
            nameSpan.style.color = "#0b6fac";
            if (isPending) {
              nameSpan.style.padding = "8px 0";
            }
            nameSpan.style.display = "inline-block";
            nameSpan.textContent = name;
            contentContainer.appendChild(nameSpan);
            if (!isPending && diagnosis) {
              var diagnosisSpan = document.createElement("span");
              diagnosisSpan.className = "navi-text diagnosis-text text-gray-500 text-[11px] block truncate";
              diagnosisSpan.style.display = "block";
              diagnosisSpan.style.color = "#6c757d";
              var truncatedDiagnosis = diagnosis.length > 35 ? "".concat(diagnosis.substring(0, 35), "...") : diagnosis;
              diagnosisSpan.textContent = truncatedDiagnosis;
              if (diagnosis.length > 35) {
                diagnosisSpan.setAttribute("title", diagnosis);
              }
              contentContainer.appendChild(diagnosisSpan);
            }

            // Progress bar :: START
            var progressWrapper = document.createElement("div");
            progressWrapper.className = "flex items-center gap-2 mt-1";
            progressWrapper.style.display = "flex";
            progressWrapper.style.alignItems = "center";
            progressWrapper.style.gap = "5px";
            var progressContainer = document.createElement("div");
            progressContainer.className = "progress flex-grow h-1 bg-blue-500 rounded-full";
            progressContainer.style.height = "5px";
            progressContainer.style.flexGrow = "1";
            progressContainer.style.display = "none";
            var progressLabel = document.createElement("span");
            progressLabel.id = "patient-progress-label-".concat(patientId);
            progressLabel.style.right = "0";
            progressLabel.style.fontSize = "12px";
            progressLabel.style.color = "#0b6fac";
            progressLabel.textContent = "0%";
            progressLabel.style.display = "none";
            var progressBar = document.createElement("div");
            progressBar.id = "patient-progress-bar-".concat(patientId);
            progressBar.className = "progress-bar progress-bar-animated";
            progressBar.style.width = "0%";
            progressBar.style.display = "none";
            progressContainer.appendChild(progressBar);
            progressWrapper.appendChild(progressContainer);
            progressWrapper.appendChild(progressLabel);
            contentContainer.appendChild(progressWrapper);
            if (patientProgressCheck === true) {
              _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
                var _token3, _res, _data3, progressInfo, progressPercentage, _t29;
                return _regenerator().w(function (_context27) {
                  while (1) switch (_context27.p = _context27.n) {
                    case 0:
                      _context27.p = 0;
                      _token3 = localStorage.getItem("access_token");
                      _context27.n = 1;
                      return fetch("".concat(BASE_URL, "patient-progress-bar-redis"), {
                        headers: {
                          "Authorization": "Bearer ".concat(_token3)
                        }
                      });
                    case 1:
                      _res = _context27.v;
                      _context27.n = 2;
                      return _res.json();
                    case 2:
                      _data3 = _context27.v;
                      if (patientProgressMap[patientId]) {
                        progressInfo = patientProgressMap[patientId];
                        if (progressInfo && progressInfo.overall_status !== "completed") {
                          progressPercentage = 0;
                          if (progressInfo.overall_status === "in_progress") {
                            progressPercentage = 10;
                          } else if (progressInfo.overall_status === "transcription_completed") {
                            progressPercentage = 25;
                          }
                          progressContainer.style.display = "flex";
                          progressBar.style.display = "flex";
                          progressLabel.style.display = "inline";
                          progressBar.style.width = "".concat(progressPercentage, "%");
                          progressLabel.textContent = "".concat(progressPercentage, "%");
                          if (!progressIntervals[patientId]) {
                            progressIntervals[patientId] = setInterval(function () {
                              return updateProgressBarOnce(patientId);
                            }, 3000);
                          }
                          updateProgressBarOnce(patientId);
                        } else {
                          // Progress completed, clean up
                          progressContainer.style.display = "none";
                          progressBar.style.display = "none";
                          progressLabel.style.display = "none";
                        }
                      }
                      _context27.n = 4;
                      break;
                    case 3:
                      _context27.p = 3;
                      _t29 = _context27.v;
                      console.error("Progress check failed:", _t29);
                    case 4:
                      return _context27.a(2);
                  }
                }, _callee27, null, [[0, 3]]);
              }))();
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
            var pauseIcon = document.createElement("i");
            pauseIcon.style.color = "rgb(243, 156, 18)";
            pauseIcon.style.fontSize = "13px";
            pauseIcon.style.marginRight = "12px";
            pauseIcon.href = "#";
            listItem.appendChild(pauseIcon);
            if (item.rec_status == 'paused') {
              pauseIcon.className = "fa fa-pause pause-icon visible ".concat(patientId);
            } else {
              pauseIcon.className = "fa fa-pause pause-icon hidden ".concat(patientId);
            }
            patientList.appendChild(listItem);
          });
        case 6:
          return _context28.a(2);
      }
    }, _callee28, null, [[1, 4]]);
  }));
  return _updatePatientList.apply(this, arguments);
}
function showNoPatientsMessage() {
  var patientList = document.querySelector(".navi");
  patientList.innerHTML = ""; // Clear existing content
  var listItem = document.createElement("div");
  listItem.classList.add("show-section");
  // listItem.innerHTML = `<h4 class="navi-text">No Patients Available</h4>`;
  patientList.appendChild(listItem);
  var replaceTitle = document.querySelector(".replace-title");
  if (replaceTitle) {
    replaceTitle.textContent = "Patient Insights";
  }
}

// Function to fetch patient segments
var patientSegmentsData = []; // Store all patient segments
var currentPage = 1;
var recordsPerPage = 5;
function fetchPendingPatientSegments(patientName, element) {
  document.getElementById('getPatientNameFromList').value = patientName;
  selectedPatientName = patientName;
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch("".concat(BASE_URL, "summary/pending-summary"), {
    method: 'POST',
    headers: {
      'Authorization': "Bearer ".concat(token),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patientname: patientName
    })
  }).then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error! status: ".concat(response.status));
    }
    return response.json();
  }).then(function (data) {
    var insightsHeading = document.querySelector(".card-label");
    insightsHeading.textContent = "Patient Insights - ".concat(patientName);

    // Handle case where data is an array (success)
    if (Array.isArray(data) && data.length > 0) {
      patientSegmentsData = data; // Store the full array of segments
      currentPage = 1;
      displayPatientSegments(); // Update display
    }
    // Handle empty array (no data)
    else if (Array.isArray(data) && data.length === 0) {
      document.querySelector(".patient-insight-list").innerHTML = "<h4 class=\"mb-4\">No insights available for ".concat(patientName, "</h4>");
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
    document.querySelectorAll(".navi-link").forEach(function (link) {
      return link.classList.remove("active");
    });
    if (element) element.classList.add("active");
  })["catch"](function (error) {
    console.error("Error fetching patient insights:", error);
    document.querySelector(".patient-insight-list").innerHTML = "<div class=\"alert alert-danger\">Error loading insights: ".concat(error.message, "</div>");
  });
}

// Function to display paginated records
function displayPatientSegments() {
  var insightsCard = document.querySelector(".patient-insight-list");
  var content = "";
  var startIndex = (currentPage - 1) * recordsPerPage;
  var endIndex = startIndex + recordsPerPage;
  var paginatedData = patientSegmentsData.slice(startIndex, endIndex);

  // Clear existing hidden inputs
  document.querySelectorAll('input[name="auto_id_0"]').forEach(function (input) {
    return input.remove();
  });
  var groupedData = {};

  // Group responses by date and create hidden inputs
  paginatedData.forEach(function (segment, index) {
    var rawDate = segment.created_at; // No formatting

    if (!groupedData[rawDate]) {
      groupedData[rawDate] = [];
    }
    groupedData[rawDate].push({
      text: segment.pending_summary,
      id: segment.auto_id_0
    });

    // Create hidden input for each segment's auto_id_0
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'auto_id_0';
    hiddenInput.value = segment.auto_id_0;
    hiddenInput.id = "auto_id_0_".concat(startIndex + index);
    document.body.appendChild(hiddenInput);
  });

  // Generate content with common date grouping and buttons
  for (var _i = 0, _Object$entries = Object.entries(groupedData); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      date = _Object$entries$_i[0],
      segments = _Object$entries$_i[1];
    content += "<div class=\"mb-3\"><h4 class=\"\" style=\"color: #3699FF;\">".concat(date, "</h4>");
    segments.forEach(function (item) {
      content += "\n              <p style=\"font-size: 14px\">".concat(item.text, "</p>\n              <div class=\"d-flex mb-3\">\n                  <button class=\"btn btn-primary btn-sm mr-2\" onclick=\"handleSummaryAction(").concat(item.id, ", 'accepted')\">\n                      <i class=\"fas fa-check\"></i> Accept\n                  </button>\n                  <button class=\"btn btn-danger btn-sm\" onclick=\"handleSummaryAction(").concat(item.id, ", 'rejected')\">\n                      <i class=\"fas fa-times\"></i> Reject\n                  </button>\n              </div>\n              <hr>\n          ");
    });
    content += "</div>";
  }
  insightsCard.innerHTML = content;
  insightsCard.innerHTML += generatePaginationControls();
}
function handleSummaryAction(_x11, _x12) {
  return _handleSummaryAction.apply(this, arguments);
} // Function to generate pagination controls
function _handleSummaryAction() {
  _handleSummaryAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(autoId, acceptStatus) {
    var patientName, token, response, data, _t31;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          patientName = document.getElementById('getPatientNameFromList').value;
          _context29.p = 1;
          token = localStorage.getItem('access_token');
          if (token) {
            _context29.n = 2;
            break;
          }
          window.location.href = '../index.html';
          return _context29.a(2);
        case 2:
          _context29.n = 3;
          return fetch("".concat(BASE_URL, "summary/accept_status"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': "Bearer ".concat(token) // Include token if required
            },
            body: JSON.stringify({
              auto_id_0: autoId,
              accept_status: acceptStatus,
              patientname: patientName
            })
          });
        case 3:
          response = _context29.v;
          _context29.n = 4;
          return response.json();
        case 4:
          data = _context29.v;
          if (response.ok) {
            toastr.success('Status Updated Successfully!');
            // Reload the page after 1 second
            setTimeout(function () {
              location.reload();
            }, 1000);
          } else {
            console.error("Error:", data.error);
            toastr.error("Error: ".concat(data.error));
          }
          _context29.n = 6;
          break;
        case 5:
          _context29.p = 5;
          _t31 = _context29.v;
          console.error("Request failed:", _t31);
          toastr.error("An error occurred while updating the summary.");
        case 6:
          return _context29.a(2);
      }
    }, _callee29, null, [[1, 5]]);
  }));
  return _handleSummaryAction.apply(this, arguments);
}
function generatePaginationControls() {
  var totalPages = Math.ceil(patientSegmentsData.length / recordsPerPage);
  var paginationHTML = "<div class=\"d-flex justify-content-between align-items-center flex-wrap\">\n        <div class=\"d-flex flex-wrap py-2 mr-3\">";

  // First & Previous buttons
  paginationHTML += "\n        <a href=\"#\" class=\"btn btn-icon btn-sm btn-light-primary mr-2 my-1\" onclick=\"changePage(1)\"><i class=\"ki ki-bold-double-arrow-back icon-xs\"></i></a>\n        <a href=\"#\" class=\"btn btn-icon btn-sm btn-light-primary mr-2 my-1\" onclick=\"changePage(".concat(Math.max(1, currentPage - 1), ")\"><i class=\"ki ki-bold-arrow-back icon-xs\"></i></a>");

  // Page numbers
  var startPage = Math.max(1, currentPage - 2);
  var endPage = Math.min(totalPages, currentPage + 2);
  if (startPage > 1) {
    paginationHTML += "<a href=\"#\" class=\"btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1\">...</a>";
  }
  for (var i = startPage; i <= endPage; i++) {
    paginationHTML += "<a href=\"#\" class=\"btn btn-icon btn-sm border-0 btn-hover-primary ".concat(i === currentPage ? 'active' : '', " mr-2 my-1\" onclick=\"changePage(").concat(i, ")\">").concat(i, "</a>");
  }
  if (endPage < totalPages) {
    paginationHTML += "<a href=\"#\" class=\"btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1\">...</a>";
  }

  // Next & Last buttons
  paginationHTML += "\n        <a href=\"#\" class=\"btn btn-icon btn-sm btn-light-primary mr-2 my-1\" onclick=\"changePage(".concat(Math.min(totalPages, currentPage + 1), ")\"><i class=\"ki ki-bold-arrow-next icon-xs\"></i></a>\n        <a href=\"#\" class=\"btn btn-icon btn-sm btn-light-primary mr-2 my-1\" onclick=\"changePage(").concat(totalPages, ")\"><i class=\"ki ki-bold-double-arrow-next icon-xs\"></i></a>\n    </div>\n    \n    <div class=\"flex align-items-center py-3\">\n        <select class=\"form-control form-control-sm text-primary font-weight-bold mr-4 border-0 bg-light-primary\" style=\"width: 75px;\" onchange=\"changeRecordsPerPage(this.value)\">\n            <option value=\"5\" ").concat(recordsPerPage === 5 ? "selected" : "", ">5</option>\n            <option value=\"10\" ").concat(recordsPerPage === 10 ? "selected" : "", ">10</option>\n            <option value=\"20\" ").concat(recordsPerPage === 20 ? "selected" : "", ">20</option>\n            <option value=\"50\" ").concat(recordsPerPage === 50 ? "selected" : "", ">50</option>\n            <option value=\"100\" ").concat(recordsPerPage === 100 ? "selected" : "", ">100</option>\n        </select>\n    </div>\n    </div>");
  return paginationHTML;
}

// Function to change pages
function changePage(pageNumber) {
  var totalPages = Math.ceil(patientSegmentsData.length / recordsPerPage);
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
var recordingStates = {};

// Process upload queue to ensure sequential uploads
var processUploadQueue = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(state) {
    var chunk, formData, token, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          if (!state.isUploading) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, new Promise(function (resolve) {
            var check = setInterval(function () {
              if (!state.isUploading) {
                clearInterval(check);
                resolve();
              }
            }, 50);
          }));
        case 1:
          if (!(state.uploadQueue.length === 0)) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2);
        case 2:
          state.isUploading = true;

          // Sort queue by sequence number
          state.uploadQueue.sort(function (a, b) {
            return a.sequence - b.sequence;
          });
        case 3:
          if (!(state.uploadQueue.length > 0)) {
            _context7.n = 8;
            break;
          }
          chunk = state.uploadQueue.shift();
          formData = new FormData();
          formData.append('audio_data', chunk.blob, "chunk_".concat(chunk.sequence, ".pcm"));
          formData.append('session_id', chunk.sessionId);
          _context7.p = 4;
          token = localStorage.getItem('access_token');
          _context7.n = 5;
          return fetch("".concat(BASE_URL_KINESIS, "upload"), {
            method: 'POST',
            headers: {
              'Authorization': "Bearer ".concat(token)
            },
            body: formData
          });
        case 5:
          console.log("\u2705 Uploaded chunk ".concat(chunk.sequence, " successfully"));
          _context7.n = 7;
          break;
        case 6:
          _context7.p = 6;
          _t6 = _context7.v;
          console.error("\u274C Error uploading chunk ".concat(chunk.sequence, ":"), _t6);
          state.uploadQueue.unshift(chunk);
          return _context7.a(3, 8);
        case 7:
          _context7.n = 3;
          break;
        case 8:
          state.isUploading = false;
        case 9:
          return _context7.a(2);
      }
    }, _callee7, null, [[4, 6]]);
  }));
  return function processUploadQueue(_x13) {
    return _ref6.apply(this, arguments);
  };
}();
function floatTo16BitPCM(float32Array) {
  var buffer = new ArrayBuffer(float32Array.length * 2);
  var view = new DataView(buffer);
  var offset = 0;
  for (var i = 0; i < float32Array.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}
var stopCurrentRecording = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(patientId) {
    var state, flat, pcm16, blob, formData, _token, token, response, sendResponse, stateSession, jobResponse, data, pauseIcon, renderPatientRecording, renderWaveTimer, _t7, _t8, _t9, _t0;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          state = recordingStates[patientId];
          console.log('Current recording state for', patientId, state);
          console.log('pcmchunk recording state for', patientId, state.pcmChunks);
          if (state) {
            _context8.n = 1;
            break;
          }
          return _context8.a(2);
        case 1:
          console.log('🛑 Stopping PCM16 recording for:', patientId);
          _context8.p = 2;
          // Stop periodic PCM uploads (20s chunks)
          state.isStopping = true;
          if (state.chunkTimer) clearInterval(state.chunkTimer);

          // Stop timer
          if (state.timerInterval) clearInterval(state.timerInterval);

          // ✅ Upload the final PCM chunk (if any)
          if (!(state.pcmChunks && state.pcmChunks.length > 0)) {
            _context8.n = 7;
            break;
          }
          console.log('📤 Uploading final PCM16 chunk...');
          flat = mergeBuffersFinal(state.pcmChunks);
          pcm16 = floatTo16BitPCM(flat);
          blob = new Blob([pcm16], {
            type: 'application/octet-stream'
          });
          formData = new FormData();
          formData.append('audio_data', blob, 'final_recording.pcm');
          formData.append('session_id', state.sessionId);
          _context8.p = 3;
          _token = localStorage.getItem('access_token');
          _context8.n = 4;
          return fetch("".concat(BASE_URL_KINESIS, "upload"), {
            method: 'POST',
            headers: {
              'Authorization': "Bearer ".concat(_token)
            },
            body: formData
          });
        case 4:
          console.log('✅ Final PCM chunk uploaded successfully');
          _context8.n = 6;
          break;
        case 5:
          _context8.p = 5;
          _t7 = _context8.v;
          console.error('❌ Error uploading final PCM chunk:', _t7);
        case 6:
          // Clear PCM chunks from memory
          state.pcmChunks = [];
        case 7:
          // ✅ Stop the audio stream and close context
          if (state.processor) {
            try {
              state.processor.disconnect();
            } catch (err) {
              console.warn(err);
            }
          }
          if (state.source) {
            try {
              state.source.disconnect();
            } catch (err) {
              console.warn(err);
            }
          }

          // ✅ Stop the audio stream and processor
          if (state.stream) {
            state.stream.getTracks().forEach(function (track) {
              return track.stop();
            });
          }

          // If we used an AudioContext, close it
          if (!(state.audioContext && state.audioContext.state !== 'closed')) {
            _context8.n = 8;
            break;
          }
          _context8.n = 8;
          return state.audioContext.close();
        case 8:
          // ✅ Send stop command to backend
          token = localStorage.getItem('access_token');
          if (!(token && state.sessionId)) {
            _context8.n = 18;
            break;
          }
          _context8.p = 9;
          console.log('📡 Sending stop command...');
          _context8.n = 10;
          return fetch("".concat(BASE_URL_KINESIS, "send-command"), {
            method: 'POST',
            headers: {
              'Authorization': "Bearer ".concat(token),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              command: 'stop',
              session_id: state.sessionId
            })
          });
        case 10:
          response = _context8.v;
          if (!response.ok) {
            _context8.n = 14;
            break;
          }
          _context8.n = 11;
          return response.json();
        case 11:
          sendResponse = _context8.v;
          stateSession = sendResponse.job_id;
          _context8.n = 12;
          return fetch("".concat(BASE_URL_KINESIS, "job-status/").concat(stateSession), {
            method: 'GET',
            headers: {
              'Authorization': "Bearer ".concat(token),
              'Content-Type': 'application/json'
            }
          });
        case 12:
          jobResponse = _context8.v;
          _context8.n = 13;
          return jobResponse.json();
        case 13:
          data = _context8.v;
          if (jobResponse.ok && data.status !== 'completed') {
            setTimeout(function () {
              fetch("".concat(BASE_URL_KINESIS, "job-status/").concat(stateSession), {
                method: 'GET',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            }, 30000);
          }
          _context8.n = 16;
          break;
        case 14:
          _t8 = console;
          _context8.n = 15;
          return response.text();
        case 15:
          _t8.error.call(_t8, '❌ Stop command failed:', _context8.v);
        case 16:
          _context8.n = 18;
          break;
        case 17:
          _context8.p = 17;
          _t9 = _context8.v;
          console.error('❌ Failed to call send-command:', _t9);
        case 18:
          // ✅ UI updates
          pauseIcon = document.querySelector(".pause-icon.".concat(patientId));
          if (pauseIcon) togglePauseIcon(patientId, false);
          renderPatientRecording = document.querySelector('.render-patient-recording');
          renderWaveTimer = document.querySelector('.wave-timer');
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
          return _context8.a(2, true);
        case 19:
          _context8.p = 19;
          _t0 = _context8.v;
          console.error("❌ Error stopping PCM16 recording:", _t0);
          return _context8.a(2, false);
      }
    }, _callee8, null, [[9, 17], [3, 5], [2, 19]]);
  }));
  return function stopCurrentRecording(_x14) {
    return _ref7.apply(this, arguments);
  };
}();
function mergeBuffersFinal(chunks) {
  var length = chunks.reduce(function (acc, val) {
    return acc + val.length;
  }, 0);
  var result = new Float32Array(length);
  var offset = 0;
  var _iterator = _createForOfIteratorHelper(chunks),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var chunk = _step.value;
      result.set(chunk, offset);
      offset += chunk.length;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
var callPauseBackendAPI = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(endpoint) {
    var method,
      body,
      token,
      response,
      _args9 = arguments,
      _t1;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          method = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'POST';
          body = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : null;
          token = localStorage.getItem('access_token');
          if (token) {
            _context9.n = 1;
            break;
          }
          window.location.href = '../index.html';
          return _context9.a(2, null);
        case 1:
          _context9.p = 1;
          _context9.n = 2;
          return fetch("".concat(BASE_URL_KINESIS).concat(endpoint), {
            method: method,
            headers: {
              'Authorization': "Bearer ".concat(token),
              'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
          });
        case 2:
          response = _context9.v;
          _context9.n = 3;
          return response.json();
        case 3:
          return _context9.a(2, _context9.v);
        case 4:
          _context9.p = 4;
          _t1 = _context9.v;
          console.error("API call failed: ".concat(_t1));
          toastr.error("Failed to ".concat(method, " ").concat(endpoint));
          return _context9.a(2, null);
      }
    }, _callee9, null, [[1, 4]]);
  }));
  return function callPauseBackendAPI(_x15) {
    return _ref8.apply(this, arguments);
  };
}();
var pauseCurrentRecording = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(patientId, currentPatientName) {
    var state, flat, pcm16, blob, pauseIcon, _t10;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          state = recordingStates[patientId];
          if (!(!state || !state.stream)) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2);
        case 1:
          _context0.p = 1;
          // Stop chunk timer
          if (state.chunkTimer) {
            clearInterval(state.chunkTimer);
            state.chunkTimer = null;
          }

          // Upload remaining chunks
          if (!(state.pcmChunks && state.pcmChunks.length > 0)) {
            _context0.n = 2;
            break;
          }
          flat = mergeBuffersFinal(state.pcmChunks);
          pcm16 = floatTo16BitPCM(flat);
          blob = new Blob([pcm16], {
            type: 'application/octet-stream'
          });
          state.uploadQueue.push({
            blob: blob,
            sessionId: state.sessionId,
            sequence: state.chunkSequence++,
            timestamp: Date.now()
          });
          state.pcmChunks = [];
          _context0.n = 2;
          return processUploadQueue(state);
        case 2:
          if (!(state.audioContext && state.audioContext.state === 'running')) {
            _context0.n = 3;
            break;
          }
          _context0.n = 3;
          return state.audioContext.suspend();
        case 3:
          // Clear UI timer
          clearInterval(state.timerInterval);

          // Send pause command to backend
          state.lastPauseTime = new Date();
          _context0.n = 4;
          return callPauseBackendAPI('send-command', 'POST', {
            command: 'pause',
            session_id: state.sessionId,
            pause_time: state.lastPauseTime.toISOString()
          });
        case 4:
          // Update state
          state.isPaused = true;

          // Update pause icon in patient list
          pauseIcon = document.querySelector(".pause-icon.".concat(patientId));
          if (pauseIcon) togglePauseIcon(patientId, true);
          _context0.n = 6;
          break;
        case 5:
          _context0.p = 5;
          _t10 = _context0.v;
          console.error("Pause error:", _t10);
        case 6:
          return _context0.a(2);
      }
    }, _callee0, null, [[1, 5]]);
  }));
  return function pauseCurrentRecording(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
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
    state.stream.getTracks().forEach(function (track) {
      return track.stop();
    });
    state.stream = null;
  }
  state.mediaRecorder = null;
  state.audioChunks = [];
}
function addRecIcon(patientName, patientId) {
  var renderPatientRecording = document.querySelector('.render-patient-recording');
  var renderWaveTimer = document.querySelector('.wave-timer');
  if (!renderPatientRecording) return;
  renderPatientRecording.innerHTML = '';
  renderWaveTimer.innerHTML = '';

  // const nameSpan = document.createElement('span');
  // nameSpan.classList.add('navi-text');
  // nameSpan.textContent = patientName;
  // renderPatientRecording.appendChild(nameSpan);

  if (!document.querySelector('.rec-icon')) {
    var state = getRecordingState(patientId);

    // Timer elements
    var timerSpan = document.createElement('span');
    timerSpan.classList.add('recording-timer', 'ml-2', 'mr-2', 'h-9');
    timerSpan.style.width = '40px';
    timerSpan.style.fontWeight = 'bold';
    timerSpan.style.fontSize = '13px';
    timerSpan.textContent = '00:00';
    timerSpan.style.display = 'none';
    timerSpan.style.alignItems = 'center';
    timerSpan.style.color = '#0a6dab';
    var updateTimer = function updateTimer() {
      state.seconds++;
      var mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
      var secs = String(state.seconds % 60).padStart(2, '0');
      timerSpan.textContent = "".concat(mins, ":").concat(secs);
    };

    // Create Metronic 9 SVG Icons
    var createMetronicIcon = function createMetronicIcon(iconName, color) {
      var iconSvg = document.createElement('span');
      iconSvg.classList.add('svg-icon', 'svg-icon-3', 'flex', 'justify-center', 'navi-text');
      var svgContent = '';
      switch (iconName) {
        case 'microphone':
          svgContent = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M12 15.5C14.2091 15.5 16 13.7091 16 11.5V6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5V11.5C8 13.7091 9.79086 15.5 12 15.5Z\" fill=\"currentColor\"></path>\n              <path opacity=\"0.3\" d=\"M5 9.5C5.55228 9.5 6 9.94772 6 10.5V11.5C6 14.8137 8.68629 17.5 12 17.5C15.3137 17.5 18 14.8137 18 11.5V10.5C18 9.94772 18.4477 9.5 19 9.5C19.5523 9.5 20 9.94772 20 10.5V11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5V10.5C4 9.94772 4.44772 9.5 5 9.5Z\" fill=\"currentColor\"></path>\n              <path d=\"M12 21.5C11.4477 21.5 11 21.0523 11 20.5V18.5C11 17.9477 11.4477 17.5 12 17.5C12.5523 17.5 13 17.9477 13 18.5V20.5C13 21.0523 12.5523 21.5 12 21.5Z\" fill=\"currentColor\"></path>\n            </svg>\n          ";
          break;
        case 'microphone-active':
          svgContent = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M12 15.5C14.2091 15.5 16 13.7091 16 11.5V6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5V11.5C8 13.7091 9.79086 15.5 12 15.5Z\" fill=\"currentColor\"></path>\n              <path opacity=\"0.3\" d=\"M5 9.5C5.55228 9.5 6 9.94772 6 10.5V11.5C6 14.8137 8.68629 17.5 12 17.5C15.3137 17.5 18 14.8137 18 11.5V10.5C18 9.94772 18.4477 9.5 19 9.5C19.5523 9.5 20 9.94772 20 10.5V11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5V10.5C4 9.94772 4.44772 9.5 5 9.5Z\" fill=\"currentColor\"></path>\n              <path d=\"M12 21.5C11.4477 21.5 11 21.0523 11 20.5V18.5C11 17.9477 11.4477 17.5 12 17.5C12.5523 17.5 13 17.9477 13 18.5V20.5C13 21.0523 12.5523 21.5 12 21.5Z\" fill=\"currentColor\"></path>\n            </svg>\n          ";
          break;
        case 'pause':
          svgContent = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <rect x=\"8\" y=\"5\" width=\"4\" height=\"15\" rx=\"1\" fill=\"".concat(color, "\"/>\n              <rect x=\"13\" y=\"5\" width=\"4\" height=\"15\" rx=\"1\" fill=\"").concat(color, "\"/>\n            </svg>\n          ");
          break;
        case 'play':
        case 'dot-circle':
          svgContent = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8707 8.6812 19.788 7.37983 19.4194C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58061C8.6812 4.212 10.296 5.1293 13.5257 6.96386C16.8667 8.86196 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z\" fill=\"".concat(color, "\"/>\n            </svg>\n          ");
          break;
        case 'stop':
          svgContent = "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"1\" fill=\"".concat(color, "\"/>\n            </svg>\n          ");
          break;
      }
      iconSvg.innerHTML = svgContent;
      return iconSvg;
    };

    // Create control icons
    var createIconWrapper = function createIconWrapper(iconName, id, color, labelText) {
      var wrapper = document.createElement('span');
      if (iconName != 'microphone') {
        wrapper.classList.add("".concat(id, "-wrapper"), 'rounded-2xl', 'recording-styles', 'cursor-pointer', 'mb-3', 'px-2', 'py-4', 'w-100');
        if (iconName != 'stop') {
          wrapper.style.cssText = "display:inline-flex; align-items:center;justify-content:center; margin-right: 0.5rem !important;";
        } else {
          wrapper.style.cssText = "display:inline-flex; align-items:center;justify-content:center";
        }
      } else {
        wrapper.classList.add("".concat(id, "-wrapper"), 'rounded-2xl', 'recording-styles', 'cursor-pointer', 'mb-3', 'px-2', 'py-4', 'w-full');
        wrapper.style.cssText = "display:inline-flex; align-items:center;justify-content:center";
      }
      var circle = document.createElement('span');
      if (iconName === 'pause') {
        circle.style.cssText = "display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;";
      } else if (iconName === 'stop') {
        circle.style.cssText = "display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;";
      } else {
        circle.style.cssText = "display: flex; height: 20px; align-items: center; background-color: #fff; transition: all 0.3s ease;";
      }
      var icon = createMetronicIcon(iconName, color);

      // Store icon type for later updates
      icon.dataset.iconType = iconName;
      icon.dataset.iconColor = color;
      var label = document.createElement('span');
      label.textContent = labelText;
      if (iconName === 'microphone') {
        label.style.cssText = "font-size: 12px; color: #0a6dab; font-weight: 500; pointer-events: none; text-align:center;";
      } else {
        label.style.cssText = "font-size: 12px; color: #0a6dab; font-weight: 500; pointer-events: none;";
      }
      circle.appendChild(icon);
      wrapper.appendChild(circle);
      wrapper.appendChild(label);

      // Add hover effect
      wrapper.addEventListener('mouseenter', function () {
        circle.style.backgroundColor = '#f8f9fa';
        circle.style.borderColor = color;
      });
      wrapper.addEventListener('mouseleave', function () {
        circle.style.backgroundColor = '#fff';
        circle.style.borderColor = '#e4e6ef';
      });
      return wrapper;
    };
    var createAudioWave = function createAudioWave() {
      var wave = document.createElement('span');
      wave.className = 'audio-wave';
      wave.style.cssText = "\n          display: inline-flex;\n          align-items: flex-end;\n          justify-content: center;\n          height: 25px;\n          width: auto;\n          margin: 0 2%;\n          gap: 2px;\n      ";
      for (var i = 0; i < 10; i++) {
        var bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.cssText = "\n          width: 2px;\n          background-color: #0b6fac;\n          border-radius: 1px;\n          transition: height 0.3s ease;\n          animation: wave-animation 1.2s ease-in-out infinite;\n          animation-delay: ".concat(i * 0.1, "s;\n        ");
        wave.appendChild(bar);
      }

      // Add CSS animation if not already added
      if (!document.getElementById('wave-animation-style')) {
        var style = document.createElement('style');
        style.id = 'wave-animation-style';
        style.textContent = "\n          @keyframes wave-animation {\n            0%, 100% { height: 3px; }\n            50% { height: 15px; }\n          }\n          \n          .audio-wave.recording .bar {\n            animation-play-state: running;\n          }\n          \n          .audio-wave.paused .bar {\n            animation-play-state: paused;\n            height: 5px !important;\n            background-color: #f39c12;\n          }\n          \n          .audio-wave.stop .bar {\n            animation-play-state: paused;\n            height: 0;\n          }\n        ";
        document.head.appendChild(style);
      }
      return wave;
    };
    var wave = createAudioWave();
    wave.style.display = 'none'; // hide initially

    var setWaveState = function setWaveState(waveState) {
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
    var micWrapper = createIconWrapper('microphone', 'rec-icon', '#0b6fac', 'Record');
    var pauseWrapper = createIconWrapper('pause', 'pause-icon', '#f39c12', 'Pause');
    var playWrapper = createIconWrapper('play', 'play-icon', '#2ecc71', 'Resume');
    var stopWrapper = createIconWrapper('stop', 'stop-icon', '#e74c3c', 'Stop');
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
    var updateMicrophoneIcon = function updateMicrophoneIcon(isActive) {
      var iconElement = micWrapper.querySelector('.svg-icon');
      if (iconElement) {
        var color = iconElement.dataset.iconColor;
        iconElement.innerHTML = isActive ? createMetronicIcon('microphone-active', color).innerHTML : createMetronicIcon('microphone', color).innerHTML;
      }
    };

    // Check for existing session
    var checkExistingSession = /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var token, response, data, duration, total_seconds, mins, secs, _mins, _secs, _t11;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              token = localStorage.getItem('access_token');
              if (token) {
                _context1.n = 1;
                break;
              }
              window.location.href = '../index.html';
              return _context1.a(2);
            case 1:
              _context1.n = 2;
              return fetch("".concat(BASE_URL_KINESIS, "check-session"), {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  patient_id: patientId
                })
              });
            case 2:
              response = _context1.v;
              if (!response.ok) {
                _context1.n = 4;
                break;
              }
              _context1.n = 3;
              return response.json();
            case 3:
              data = _context1.v;
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
                duration = data.total_duration || 0;
                if (parseFloat(duration) !== 0) {
                  total_seconds = Math.floor(parseFloat(duration)); // convert to integer seconds
                  mins = String(Math.floor(total_seconds / 60)).padStart(2, '0');
                  secs = String(total_seconds % 60).padStart(2, '0');
                  timerSpan.textContent = "".concat(mins, ":").concat(secs);
                  setWaveState('paused');
                } else {
                  _mins = String(Math.floor(state.seconds / 60)).padStart(2, '0');
                  _secs = String(state.seconds % 60).padStart(2, '0');
                  timerSpan.textContent = "".concat(_mins, ":").concat(_secs);
                }
              }
            case 4:
              _context1.n = 6;
              break;
            case 5:
              _context1.p = 5;
              _t11 = _context1.v;
              console.error('Error checking session:', _t11);
            case 6:
              return _context1.a(2);
          }
        }, _callee1, null, [[0, 5]]);
      }));
      return function checkExistingSession() {
        return _ref0.apply(this, arguments);
      };
    }();
    checkExistingSession();

    // API helper
    var callBackendAPI = /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(endpoint) {
        var method,
          body,
          token,
          response,
          _args10 = arguments,
          _t12;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              method = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'POST';
              body = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : null;
              token = localStorage.getItem('access_token');
              if (token) {
                _context10.n = 1;
                break;
              }
              window.location.href = '../index.html';
              return _context10.a(2, null);
            case 1:
              _context10.p = 1;
              _context10.n = 2;
              return fetch("".concat(BASE_URL_KINESIS).concat(endpoint), {
                method: method,
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
              });
            case 2:
              response = _context10.v;
              _context10.n = 3;
              return response.json();
            case 3:
              return _context10.a(2, _context10.v);
            case 4:
              _context10.p = 4;
              _t12 = _context10.v;
              console.error("API call failed: ".concat(_t12));
              toastr.error("Failed to ".concat(method, " ").concat(endpoint));
              return _context10.a(2, null);
          }
        }, _callee10, null, [[1, 4]]);
      }));
      return function callBackendAPI(_x18) {
        return _ref1.apply(this, arguments);
      };
    }();

    // Start recording
    micWrapper.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var uniqueId, _floatTo16BitPCM, mergeBuffers, uploadPCMChunk, startResponse, _wave, container, audioCtx, source, processor, _t14;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            if (!state.isRecording) {
              _context13.n = 1;
              break;
            }
            console.warn('Recording already started');
            return _context13.a(2);
          case 1:
            state.isRecording = true; // mark recording in progress
            uniqueId = generateUniqueId();
            _context13.p = 2;
            _floatTo16BitPCM = function _floatTo16BitPCM(float32Array) {
              var buffer = new ArrayBuffer(float32Array.length * 2);
              var view = new DataView(buffer);
              var offset = 0;
              for (var i = 0; i < float32Array.length; i++, offset += 2) {
                var s = Math.max(-1, Math.min(1, float32Array[i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
              }
              return buffer;
            };
            mergeBuffers = function mergeBuffers(chunks) {
              var length = chunks.reduce(function (acc, val) {
                return acc + val.length;
              }, 0);
              var result = new Float32Array(length);
              var offset = 0;
              var _iterator2 = _createForOfIteratorHelper(chunks),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var chunk = _step2.value;
                  result.set(chunk, offset);
                  offset += chunk.length;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              return result;
            };
            uploadPCMChunk = /*#__PURE__*/function () {
              var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
                var flat, pcm16, blob, formData, token, _t13;
                return _regenerator().w(function (_context11) {
                  while (1) switch (_context11.p = _context11.n) {
                    case 0:
                      if (!(state.pcmChunks.length === 0)) {
                        _context11.n = 1;
                        break;
                      }
                      return _context11.a(2);
                    case 1:
                      flat = mergeBuffers(state.pcmChunks);
                      pcm16 = _floatTo16BitPCM(flat);
                      state.pcmChunks = [];
                      blob = new Blob([pcm16], {
                        type: 'application/octet-stream'
                      });
                      formData = new FormData();
                      formData.append('audio_data', blob, 'recording.pcm');
                      formData.append('session_id', state.sessionId);
                      _context11.p = 2;
                      console.log("micwrappeer pause");
                      token = localStorage.getItem('access_token');
                      _context11.n = 3;
                      return fetch("".concat(BASE_URL_KINESIS, "upload"), {
                        method: 'POST',
                        headers: {
                          'Authorization': "Bearer ".concat(token)
                        },
                        body: formData
                      });
                    case 3:
                      console.log('✅ Uploaded PCM chunk of', blob.size, 'bytes');
                      _context11.n = 5;
                      break;
                    case 4:
                      _context11.p = 4;
                      _t13 = _context11.v;
                      console.error('Error uploading PCM chunk:', _t13);
                    case 5:
                      return _context11.a(2);
                  }
                }, _callee11, null, [[2, 4]]);
              }));
              return function uploadPCMChunk() {
                return _ref11.apply(this, arguments);
              };
            }();
            _context13.n = 3;
            return callBackendAPI('start', 'POST', {
              patient_id: patientId,
              patient_name: patientName,
              recording_id: uniqueId
            });
          case 3:
            startResponse = _context13.v;
            if (!(!startResponse || !startResponse.session_id)) {
              _context13.n = 4;
              break;
            }
            throw new Error('Failed to start recording session');
          case 4:
            state.sessionId = startResponse.session_id;
            if (!state.wave) {
              _wave = createAudioWave();
              container = document.querySelector('.render-patient-recording');
              if (container) container.appendChild(_wave);
              state.wave = _wave;
            }

            // ✅ Initialize audio context and PCM capture
            if (state.chunkTimer) clearInterval(state.chunkTimer); // safety

            // ✅ PCM16 capture replacement for MediaRecorder
            _context13.n = 5;
            return navigator.mediaDevices.getUserMedia({
              audio: true
            });
          case 5:
            state.stream = _context13.v;
            audioCtx = new AudioContext({
              sampleRate: 16000
            });
            source = audioCtx.createMediaStreamSource(state.stream);
            processor = audioCtx.createScriptProcessor(4096, 1, 1); // Store references for stop cleanup
            state.audioContext = audioCtx;
            state.source = source;
            state.processor = processor;
            state.pcmChunks = [];
            state.chunkSequence = 0;
            state.uploadQueue = [];
            state.isUploading = false;
            source.connect(processor);
            processor.connect(audioCtx.destination);
            processor.onaudioprocess = function (event) {
              if (!state.isPaused) {
                var data = event.inputBuffer.getChannelData(0);
                state.pcmChunks.push(new Float32Array(data));
              }
            };

            // Upload every 20 seconds with sequencing
            state.isStopping = false;
            if (state.chunkTimer) clearInterval(state.chunkTimer);
            state.chunkTimer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
              var flat, pcm16, blob;
              return _regenerator().w(function (_context12) {
                while (1) switch (_context12.n) {
                  case 0:
                    if (!(!state.isStopping && !state.isPaused && state.pcmChunks.length > 0)) {
                      _context12.n = 1;
                      break;
                    }
                    flat = mergeBuffers(state.pcmChunks);
                    pcm16 = _floatTo16BitPCM(flat);
                    blob = new Blob([pcm16], {
                      type: 'application/octet-stream'
                    }); // Add to upload queue with sequence
                    state.uploadQueue.push({
                      blob: blob,
                      sessionId: state.sessionId,
                      sequence: state.chunkSequence++,
                      timestamp: Date.now()
                    });
                    state.pcmChunks = [];
                    _context12.n = 1;
                    return processUploadQueue(state);
                  case 1:
                    return _context12.a(2);
                }
              }, _callee12);
            })), 20000);
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
            _context13.n = 7;
            break;
          case 6:
            _context13.p = 6;
            _t14 = _context13.v;
            console.error("Error starting recording:", _t14);
            if (_t14.name === 'NotAllowedError') {
              toastr.error("Microphone access is blocked. Please allow mic permissions in your browser settings.");
            } else if (_t14.name === 'NotFoundError') {
              toastr.error("No microphone detected. Please connect a mic and try again.");
            } else {
              toastr.error("Failed to start recording: " + _t14.message);
            }
            resetUI(state);
            state.isRecording = false;
          case 7:
            return _context13.a(2);
        }
      }, _callee13, null, [[2, 6]]);
    })));

    // Pause recording - FIXED
    pauseWrapper.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
      var flat, pcm16, blob, pauseResponse, pauseIcon, _t15;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            if (!state.isProcessing) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2);
          case 1:
            state.isProcessing = true;

            // If currently recording, pause it
            if (!(state.stream && !state.isPaused)) {
              _context14.n = 9;
              break;
            }
            _context14.p = 2;
            console.log('⏸️ Pausing PCM16 recording for:', patientId);

            // ✅ CRITICAL: Stop chunk timer first to prevent duplicate uploads
            if (state.chunkTimer) {
              clearInterval(state.chunkTimer);
              state.chunkTimer = null;
            }

            // Pause the AudioContext recording
            if (!(state.audioContext && state.audioContext.state === 'running')) {
              _context14.n = 3;
              break;
            }
            _context14.n = 3;
            return state.audioContext.suspend();
          case 3:
            if (!(state.pcmChunks && state.pcmChunks.length > 0)) {
              _context14.n = 4;
              break;
            }
            flat = mergeBuffersFinal(state.pcmChunks);
            pcm16 = floatTo16BitPCM(flat);
            blob = new Blob([pcm16], {
              type: 'application/octet-stream'
            });
            state.uploadQueue.push({
              blob: blob,
              sessionId: state.sessionId,
              sequence: state.chunkSequence++,
              timestamp: Date.now()
            });
            state.pcmChunks = [];
            // Don't await - let it upload in background
            _context14.n = 4;
            return processUploadQueue(state);
          case 4:
            state.lastPauseTime = new Date();
            setWaveState('paused');
            clearInterval(state.timerInterval);

            // Notify backend and wait for response
            _context14.n = 5;
            return callBackendAPI('send-command', 'POST', {
              command: 'pause',
              session_id: state.sessionId,
              pause_time: state.lastPauseTime.toISOString()
            });
          case 5:
            pauseResponse = _context14.v;
            pauseIcon = document.querySelector(".pause-icon.".concat(patientId));
            if (pauseIcon) {
              togglePauseIcon(patientId, true);
            }
            if (!(pauseResponse && pauseResponse.status === 'pause acknowledged')) {
              _context14.n = 6;
              break;
            }
            pauseWrapper.style.display = 'none';
            playWrapper.style.display = 'inline-flex';
            state.isPaused = true;
            state.isProcessing = false;
            _context14.n = 7;
            break;
          case 6:
            throw new Error('Pause not acknowledged by server');
          case 7:
            _context14.n = 9;
            break;
          case 8:
            _context14.p = 8;
            _t15 = _context14.v;
            console.error("Pause error:", _t15);
            toastr.error("Failed to pause recording");
            state.isProcessing = false;
          case 9:
            return _context14.a(2);
        }
      }, _callee14, null, [[2, 8]]);
    })));

    // Resume recording - FIXED
    playWrapper.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var uploadPCMChunk, _uploadPCMChunk, _resumeResponse, token, response, data, audioCtx, source, processor, timerElements, current_timer, crnt_timer, resumeResponse, _t16;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            if (!state.isProcessingResume) {
              _context17.n = 1;
              break;
            }
            return _context17.a(2);
          case 1:
            state.isProcessingResume = true;
            _context17.p = 2;
            // Setup chunk upload timer
            uploadPCMChunk = /*#__PURE__*/function () {
              var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
                var flat, pcm16, blob;
                return _regenerator().w(function (_context16) {
                  while (1) switch (_context16.n) {
                    case 0:
                      if (!(state.pcmChunks.length === 0 || state.isPaused)) {
                        _context16.n = 1;
                        break;
                      }
                      return _context16.a(2);
                    case 1:
                      flat = mergeBuffersFinal(state.pcmChunks);
                      pcm16 = floatTo16BitPCM(flat);
                      blob = new Blob([pcm16], {
                        type: 'application/octet-stream'
                      });
                      state.uploadQueue.push({
                        blob: blob,
                        sessionId: state.sessionId,
                        sequence: state.chunkSequence++,
                        timestamp: Date.now()
                      });
                      state.pcmChunks = [];
                      _context16.n = 2;
                      return processUploadQueue(state);
                    case 2:
                      return _context16.a(2);
                  }
                }, _callee16);
              }));
              return function uploadPCMChunk() {
                return _ref16.apply(this, arguments);
              };
            }();
            if (!(state.isPaused && state.audioContext)) {
              _context17.n = 7;
              break;
            }
            _context17.n = 3;
            return state.audioContext.resume();
          case 3:
            state.lastResumeTime = new Date();

            // ✅ CRITICAL: Restart chunk timer on resume
            if (!state.chunkTimer) {
              _uploadPCMChunk = /*#__PURE__*/function () {
                var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
                  var flat, pcm16, blob;
                  return _regenerator().w(function (_context15) {
                    while (1) switch (_context15.n) {
                      case 0:
                        if (!(state.pcmChunks.length === 0 || state.isPaused)) {
                          _context15.n = 1;
                          break;
                        }
                        return _context15.a(2);
                      case 1:
                        flat = mergeBuffersFinal(state.pcmChunks);
                        pcm16 = floatTo16BitPCM(flat);
                        blob = new Blob([pcm16], {
                          type: 'application/octet-stream'
                        });
                        state.uploadQueue.push({
                          blob: blob,
                          sessionId: state.sessionId,
                          sequence: state.chunkSequence++,
                          timestamp: Date.now()
                        });
                        state.pcmChunks = [];
                        _context15.n = 2;
                        return processUploadQueue(state);
                      case 2:
                        return _context15.a(2);
                    }
                  }, _callee15);
                }));
                return function _uploadPCMChunk() {
                  return _ref15.apply(this, arguments);
                };
              }();
              state.chunkTimer = setInterval(function () {
                if (!state.isStopping && !state.isPaused) _uploadPCMChunk();
              }, 20000);
            }
            setWaveState('resume');
            state.timerInterval = setInterval(updateTimer, 1000);

            // Notify backend
            _context17.n = 4;
            return callBackendAPI('send-command', 'POST', {
              command: 'resume',
              session_id: state.sessionId,
              resume_time: state.lastResumeTime.toISOString()
            });
          case 4:
            _resumeResponse = _context17.v;
            if (!(_resumeResponse && _resumeResponse.status === 'resume acknowledged')) {
              _context17.n = 5;
              break;
            }
            playWrapper.style.display = 'none';
            pauseWrapper.style.display = 'inline-flex';
            state.isPaused = false;
            state.isProcessingResume = false;
            _context17.n = 6;
            break;
          case 5:
            throw new Error('Resume not acknowledged by server');
          case 6:
            return _context17.a(2);
          case 7:
            // === CASE 2: Start new AudioContext PCM16 recording ===
            token = localStorage.getItem('access_token');
            _context17.n = 8;
            return fetch("".concat(BASE_URL_KINESIS, "check-session"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                patient_id: patientId
              })
            });
          case 8:
            response = _context17.v;
            if (response.ok) {
              _context17.n = 9;
              break;
            }
            throw new Error('Failed to check session');
          case 9:
            _context17.n = 10;
            return response.json();
          case 10:
            data = _context17.v;
            state.sessionId = data.session_id;

            // Create new audio context and setup
            _context17.n = 11;
            return navigator.mediaDevices.getUserMedia({
              audio: true
            });
          case 11:
            state.stream = _context17.v;
            audioCtx = new AudioContext({
              sampleRate: 16000
            });
            source = audioCtx.createMediaStreamSource(state.stream);
            processor = audioCtx.createScriptProcessor(4096, 1, 1);
            state.audioContext = audioCtx;
            state.source = source;
            state.processor = processor;
            state.pcmChunks = [];
            state.chunkSequence = state.chunkSequence || 0;
            state.uploadQueue = state.uploadQueue || [];
            state.isUploading = state.isUploading || false;
            source.connect(processor);
            processor.connect(audioCtx.destination);
            processor.onaudioprocess = function (event) {
              if (!state.isPaused) {
                var _data = event.inputBuffer.getChannelData(0);
                state.pcmChunks.push(new Float32Array(_data));
              }
            };
            state.isStopping = false;
            state.chunkTimer = setInterval(function () {
              if (!state.isStopping && !state.isPaused) uploadPCMChunk();
            }, 20000);

            // Resume recording
            _context17.n = 12;
            return state.audioContext.resume();
          case 12:
            state.lastResumeTime = new Date();

            // Sync timer to existing time if available
            timerElements = document.getElementsByClassName('recording-timer');
            if (timerElements.length > 0) {
              current_timer = timerElements[0].textContent.trim();
              crnt_timer = current_timer.split(':');
              state.seconds = parseInt(crnt_timer[0], 10) * 60 + parseInt(crnt_timer[1], 10);
            }
            state.timerInterval = setInterval(updateTimer, 1000);
            setWaveState('recording');

            // Notify backend resume
            _context17.n = 13;
            return callBackendAPI('send-command', 'POST', {
              command: 'resume',
              session_id: state.sessionId,
              resume_time: state.lastResumeTime.toISOString()
            });
          case 13:
            resumeResponse = _context17.v;
            if (!(resumeResponse && resumeResponse.status === 'resume acknowledged')) {
              _context17.n = 14;
              break;
            }
            playWrapper.style.display = 'none';
            pauseWrapper.style.display = 'inline-flex';
            state.isPaused = false;
            state.isProcessingResume = false;
            state.isRecording = true;
            _context17.n = 15;
            break;
          case 14:
            throw new Error('Resume not acknowledged by server');
          case 15:
            _context17.n = 17;
            break;
          case 16:
            _context17.p = 16;
            _t16 = _context17.v;
            console.error("Error starting/resuming recording:", _t16);
            state.isProcessingResume = false;
            if (_t16.name === 'NotAllowedError') {
              toastr.error("Microphone access is blocked. Please allow mic permissions in your browser settings.");
            } else if (_t16.name === 'NotFoundError') {
              toastr.error("No microphone detected. Please connect a mic and try again.");
            } else {
              toastr.error("Failed to start or resume recording: " + _t16.message);
            }
          case 17:
            return _context17.a(2);
        }
      }, _callee17, null, [[2, 16]]);
    })));

    // Stop recording - USING stop Current Recording
    stopWrapper.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
      var _stream, _renderPatientRecording, _renderWaveTimer, token, response, data, _renderPatientRecording2, _renderWaveTimer2, _t18;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.p = _context20.n) {
          case 0:
            if (!(state.audioContext && state.audioContext.state !== 'closed')) {
              _context20.n = 2;
              break;
            }
            setWaveState('stop');
            _stream = state.stream; // Stop all tracks
            if (_stream) {
              _stream.getTracks().forEach(function (track) {
                return track.stop();
              });
            }

            // Stop audio processing
            if (state.processor) {
              state.processor.disconnect();
            }
            if (state.source) {
              state.source.disconnect();
            }
            if (!(state.audioContext.state !== 'closed')) {
              _context20.n = 1;
              break;
            }
            _context20.n = 1;
            return state.audioContext.close();
          case 1:
            _renderPatientRecording = document.querySelector('.render-patient-recording');
            _renderWaveTimer = document.querySelector('.wave-timer');
            if (_renderPatientRecording) {
              _renderPatientRecording.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
              _renderPatientRecording.querySelector('.pause-icon-wrapper').style.display = 'none';
              _renderPatientRecording.querySelector('.play-icon-wrapper').style.display = 'none';
              _renderPatientRecording.querySelector('.stop-icon-wrapper').style.display = 'none';
              if (_renderWaveTimer) {
                _renderWaveTimer.querySelector('.recording-timer').style.display = 'none';
              }
            }
            sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
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
            }).then(/*#__PURE__*/function () {
              var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(result) {
                var token, success, bar, label, progressWrapper, progressContainer, _progressContainer, patientItems, selectedItem, socket, summaryContainer, assessContainer, assessPlanContainer, reviewofSystemContainer, phyExamContainer, _t17;
                return _regenerator().w(function (_context18) {
                  while (1) switch (_context18.p = _context18.n) {
                    case 0:
                      if (!result.isConfirmed) {
                        _context18.n = 7;
                        break;
                      }
                      document.getElementById("loader-overlay").style.display = "flex";
                      _context18.p = 1;
                      token = localStorage.getItem('access_token');
                      _context18.n = 2;
                      return stopCurrentRecording(patientId);
                    case 2:
                      success = _context18.v;
                      if (!success) {
                        _context18.n = 3;
                        break;
                      }
                      document.getElementById("loader-overlay").style.display = "none";
                      toastr.success("Recording saved successfully");

                      // Progress bar :: START
                      bar = document.getElementById("patient-progress-bar-".concat(patientId));
                      label = document.getElementById("patient-progress-label-".concat(patientId));
                      if (!bar || !label) {
                        progressWrapper = document.createElement("div");
                        progressWrapper.style.display = "flex";
                        progressWrapper.style.alignItems = "center";
                        progressWrapper.style.gap = "5px";
                        progressContainer = document.createElement("div");
                        progressContainer.className = "progress mt-1";
                        progressContainer.style.height = "5px";
                        progressContainer.style.flexGrow = "1";
                        document.createElement("div"), _readOnlyError("bar");
                        bar.id = "patient-progress-bar-".concat(patientId);
                        bar.className = "progress-bar progress-bar-animated";
                        bar.style.width = "10%";
                        bar.style.display = "flex";
                        document.createElement("span"), _readOnlyError("label");
                        label.id = "patient-progress-label-".concat(patientId);
                        label.style.fontSize = "12px";
                        label.style.color = "#0b6fac";
                        label.textContent = "10%";
                        label.style.display = "inline";
                        progressContainer.appendChild(bar);
                        progressWrapper.appendChild(progressContainer);
                        progressWrapper.appendChild(label);
                      } else {
                        _progressContainer = bar.parentElement;
                        if (_progressContainer) _progressContainer.style.display = "flex";
                        bar.style.display = "flex";
                        bar.style.width = "10%";
                        label.style.display = "inline";
                        label.textContent = "10%";
                      }
                      if (!progressIntervals[patientId]) {
                        progressIntervals[patientId] = setInterval(function () {
                          return updateProgressBarOnce(patientId);
                        }, 3000);
                      }
                      updateProgressBarOnce(patientId);
                      // Progress bar :: END
                      try {
                        document.getElementById("loader-overlay").style.display = "flex";
                        document.getElementById("loader-overlay").style.display = "none";
                        toastr.success("Audio File Updated Successfully");
                        patientItems = document.querySelectorAll(".navi-item");
                        selectedItem = null;
                        patientItems.forEach(function (item) {
                          var nameSpan = item.querySelector(".navi-text");
                          var nameSpinner = item.querySelector(".navi-spinner");
                          if (nameSpan && nameSpan.textContent.trim() === patientName) {
                            selectedItem = item; // Store the selected item for later scrolling

                            // ✅ Always remove tick and spinner first
                            var existingTick = item.querySelector(".tick-icon");
                            if (existingTick) existingTick.remove();
                            var existingSpinner = item.querySelector(".spinner-icon");
                            if (existingSpinner) existingSpinner.remove();
                            var spinner = document.createElement("i");
                            spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
                            spinner.style.color = "#0b6fac";
                            nameSpinner.parentNode.appendChild(spinner);

                            // Scroll to the selected patient
                            item.scrollIntoView({
                              behavior: 'smooth',
                              block: 'nearest'
                            });
                          }
                        });

                        // Connect to the backend WebSocket server
                        socket = io("".concat(BASE_URL), {
                          transports: ['websocket', 'polling'],
                          reconnection: true
                        });
                        summaryContainer = document.getElementById('summary-container');
                        assessContainer = document.getElementById('assessment-container');
                        assessPlanContainer = document.getElementById('assessment-plan-container');
                        reviewofSystemContainer = document.getElementById('review-of-system-id');
                        phyExamContainer = document.getElementById('physical-exam-id');
                        if (summaryContainer && assessContainer && assessPlanContainer && phyExamContainer) {
                          socket.on('connect', function () {
                            console.log('WebSocket connected');
                          });
                          socket.on('connect_error', function (error) {
                            console.error('WebSocket connection error:', error);
                            socket.disconnect();
                          });
                          socket.on('summary_complete', function (data) {
                            // if (data.user === urlUserName) {
                            loadSutureFix(data.patient_name, 'unarchived');
                            checkSoapNotification(patientId, token);

                            // Handle patient list update
                            var patientName = data.patient_name;
                            var patientItems = document.querySelectorAll(".navi-item");
                            var diagnosis = data.file_content ? data.file_content['Principal Diagnosis'] || '● None documented' : '● None documented';
                            patientItems.forEach(function (item) {
                              var nameSpan = item.querySelector(".navi-text");
                              var nameSpinner = item.querySelector(".navi-spinner");
                              var diagnosisSpan = item.querySelector('.navi-text:not(.font-weight-bolder)');
                              if (nameSpan && nameSpan.textContent.trim() === patientName) {
                                // Remove spinner if exists
                                var spinner = item.querySelector(".spinner-icon");
                                if (spinner) spinner.remove();

                                // Remove existing tick if already present
                                var existingTick = item.querySelector(".tick-icon");
                                if (existingTick) existingTick.remove();

                                // Add checkmark if not exists
                                // if (!item.querySelector(".tick-icon")) {
                                var tick = document.createElement("i");
                                tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
                                tick.style.marginLeft = "10px";
                                tick.style.color = "#0b6fac";
                                var link = document.createElement("a");
                                link.className = "navi-link";
                                link.style.display = "none";
                                link.href = "#";
                                var wrapper = document.createElement("li");
                                wrapper.className = "navi-item";
                                wrapper.style.display = "none";
                                wrapper.appendChild(link);
                                nameSpinner.parentNode.appendChild(tick);
                                nameSpinner.parentNode.appendChild(wrapper);
                                var currentPatientName = document.getElementById('getPatientNameFromList').value;
                                // if (currentPatientName == patientName) {
                                // Clear containers and intervals
                                if (summaryContainer && assessContainer && assessPlanContainer && reviewofSystemContainer) {
                                  //
                                }

                                // Populate the content from file_content
                                var fileContent = data.file_content;
                                if (fileContent) {
                                  // Create new object with spaces replaced by underscores in keys
                                  var newObj = {};
                                  for (var key in fileContent) {
                                    if (fileContent.hasOwnProperty(key)) {
                                      var newKey = key.replace(/\s/g, '_');
                                      newObj[newKey] = fileContent[key];
                                    }
                                  }

                                  // Clinical Summary
                                  if (newObj['Clinical_Summary'] && summaryContainer) {
                                    var formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");
                                    summaryContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-summary-section\" style=\"font-size: 12px;\">\n                                          ".concat(formattedText, "\n                                        </div>");
                                  }

                                  // Subjective and Interval Events
                                  if (newObj['Subjective_and_Interval_Events'] && assessContainer) {
                                    var _formattedText = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");
                                    assessContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-assess-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText, "\n                                        </div>");
                                  }

                                  // Review of Systems
                                  if (newObj['Review_of_Systems'] && reviewofSystemContainer) {
                                    var _formattedText2 = newObj['Review_of_Systems'].replace(/\n/g, "<br>");
                                    reviewofSystemContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-review-system-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText2, "\n                                        </div>");
                                  }

                                  // Physical Examination
                                  if (newObj['Physical_Examination'] && phyExamContainer) {
                                    var _formattedText3 = newObj['Physical_Examination'].replace(/\n/g, "<br>");
                                    phyExamContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-physical-exam-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText3, "\n                                        </div>");
                                  }

                                  // Assessment and Plan
                                  if (newObj['Assessment_and_Plan'] && assessPlanContainer) {
                                    var _formattedText4 = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");
                                    assessPlanContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-plan-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText4, "\n                                        </div>");
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
                                  var truncatedDiagnosis = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
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
                          socket.on("transcription_failed", function (data) {
                            document.getElementById("loader-overlay").style.display = "none";
                            // if (data.user === urlUserName) {
                            console.error("Transcription failed:", data.error);
                            if (summaryContainer) {
                              summaryContainer.innerHTML = "\n                                                  <div class=\"error-message\">\n                                                      <p style=\"color: red; font-weight: bold;\">Error: ".concat(data.error, "</p>\n                                                  </div>\n                                              ");
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
                      _context18.n = 4;
                      break;
                    case 3:
                      throw new Error('Failed to stop recording');
                    case 4:
                      _context18.n = 6;
                      break;
                    case 5:
                      _context18.p = 5;
                      _t17 = _context18.v;
                      document.getElementById("loader-overlay").style.display = "none";
                      toastr.error("Error stopping recording 1:" + _t17.message);
                    case 6:
                      _context18.n = 8;
                      break;
                    case 7:
                      // state.mediaRecorder.stop();
                      setWaveState('stop');
                      deletePatientRecording(patientId, state.sessionId, state);
                    case 8:
                      return _context18.a(2);
                  }
                }, _callee18, null, [[1, 5]]);
              }));
              return function (_x19) {
                return _ref18.apply(this, arguments);
              };
            }());
            _context20.n = 7;
            break;
          case 2:
            token = localStorage.getItem('access_token');
            _context20.n = 3;
            return fetch("".concat(BASE_URL_KINESIS, "check-session"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                patient_id: patientId
              })
            });
          case 3:
            response = _context20.v;
            data = response.json();
            if (!response.ok) {
              _context20.n = 6;
              break;
            }
            _context20.p = 4;
            sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
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
            }).then(/*#__PURE__*/function () {
              var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(result) {
                var _token2, success, bar, label, progressContainer, stateSession, jobResponse, _data2, patientItems, selectedItem, socket, summaryContainer, assessContainer, assessPlanContainer, reviewofSystemContainer, phyExamContainer;
                return _regenerator().w(function (_context19) {
                  while (1) switch (_context19.n) {
                    case 0:
                      if (!result.isConfirmed) {
                        _context19.n = 5;
                        break;
                      }
                      document.getElementById("loader-overlay").style.display = "flex";
                      // try {
                      _token2 = localStorage.getItem('access_token');
                      _context19.n = 1;
                      return stopCurrentRecording(patientId);
                    case 1:
                      success = _context19.v;
                      setWaveState('stop');
                      // if (success) {
                      document.getElementById("loader-overlay").style.display = "none";
                      toastr.success("Recording saved successfully");

                      // Progress bar :: START
                      bar = document.getElementById("patient-progress-bar-".concat(patientId));
                      label = document.getElementById("patient-progress-label-".concat(patientId));
                      if (bar && label) {
                        bar.style.display = "flex";
                        bar.style.width = "10%";
                        label.style.display = "inline";
                        label.textContent = "10%";
                        progressContainer = bar.parentElement;
                        if (progressContainer) progressContainer.style.display = "block";
                        if (!progressIntervals[patientId]) {
                          progressIntervals[patientId] = setInterval(function () {
                            return updateProgressBarOnce(patientId);
                          }, 3000);
                        }
                        updateProgressBarOnce(patientId);
                      }
                      // Progress bar :: END
                      if (!(_token2 && state.sessionId)) {
                        _context19.n = 4;
                        break;
                      }
                      stateSession = state.sessionId;
                      _context19.n = 2;
                      return fetch("".concat(BASE_URL_KINESIS, "job-status/").concat(stateSession), {
                        method: 'GET',
                        headers: {
                          'Authorization': "Bearer ".concat(_token2),
                          'Content-Type': 'application/json'
                        }
                      });
                    case 2:
                      jobResponse = _context19.v;
                      _context19.n = 3;
                      return jobResponse.json();
                    case 3:
                      _data2 = _context19.v;
                      if (jobResponse.ok) {
                        if (_data2.status != 'completed') {
                          setTimeout(function () {
                            fetch("".concat(BASE_URL_KINESIS, "job-status/").concat(stateSession), {
                              method: 'GET',
                              headers: {
                                'Authorization': "Bearer ".concat(_token2),
                                'Content-Type': 'application/json'
                              }
                            });
                          }, 30000);
                        }
                      } else {
                        document.getElementById("loader-overlay").style.display = "none";
                      }
                    case 4:
                      try {
                        document.getElementById("loader-overlay").style.display = "flex";

                        // if (success) {
                        document.getElementById("loader-overlay").style.display = "none";
                        toastr.success("Audio File Updated Successfully");
                        patientItems = document.querySelectorAll(".navi-item");
                        selectedItem = null;
                        patientItems.forEach(function (item) {
                          var nameSpan = item.querySelector(".navi-text");
                          var nameSpinner = item.querySelector(".navi-spinner");
                          if (nameSpan && nameSpan.textContent.trim() === patientName) {
                            selectedItem = item; // Store the selected item for later scrolling
                            if (!item.querySelector(".spinner-icon")) {
                              var existingSpinner = item.querySelector(".spinner-icon");
                              var existingTick = item.querySelector(".tick-icon");
                              if (existingSpinner) existingSpinner.remove();
                              if (existingTick) existingTick.remove();
                              var spinner = document.createElement("i");
                              spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
                              spinner.style.color = "#0b6fac";
                              nameSpinner.parentNode.appendChild(spinner);

                              // Scroll to the selected patient
                              item.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                              });
                            }
                          }
                        });

                        // Connect to the backend WebSocket server
                        socket = io("".concat(BASE_URL), {
                          transports: ['websocket', 'polling'],
                          reconnection: true
                        });
                        summaryContainer = document.getElementById('summary-container');
                        assessContainer = document.getElementById('assessment-container');
                        assessPlanContainer = document.getElementById('assessment-plan-container');
                        reviewofSystemContainer = document.getElementById('review-of-system-id');
                        phyExamContainer = document.getElementById('physical-exam-id');
                        if (summaryContainer && assessContainer && assessPlanContainer && phyExamContainer) {
                          socket.on('connect', function () {
                            console.log('WebSocket connected');
                          });
                          socket.on('connect_error', function (error) {
                            console.error('WebSocket connection error:', error);
                            socket.disconnect();
                          });
                          socket.on('summary_complete', function (data) {
                            // if (data.user === urlUserName) {
                            checkSoapNotification(patientId, _token2);
                            // Handle patient list update
                            var patientName = data.patient_name;
                            var patientItems = document.querySelectorAll(".navi-item");
                            var diagnosis = data.file_content ? data.file_content['Principal Diagnosis'] || '● None documented' : '● None documented';
                            patientItems.forEach(function (item) {
                              var nameSpan = item.querySelector(".navi-text");
                              var nameSpinner = item.querySelector(".navi-spinner");
                              var diagnosisSpan = item.querySelector('.navi-text:not(.font-weight-bolder)');
                              if (nameSpan && nameSpan.textContent.trim() === patientName) {
                                // Remove spinner if exists
                                var spinner = item.querySelector(".spinner-icon");
                                if (spinner) spinner.remove();

                                // Add checkmark if not exists
                                if (!item.querySelector(".tick-icon")) {
                                  var tick = document.createElement("i");
                                  tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
                                  tick.style.marginLeft = "10px";
                                  tick.style.color = "#0b6fac";
                                  var link = document.createElement("a");
                                  link.className = "navi-link";
                                  link.style.display = "none";
                                  link.href = "#";
                                  var wrapper = document.createElement("li");
                                  wrapper.className = "navi-item";
                                  wrapper.style.display = "none";
                                  wrapper.appendChild(link);
                                  nameSpinner.parentNode.appendChild(tick);
                                  nameSpinner.parentNode.appendChild(wrapper);
                                  var currentPatientName = document.getElementById('getPatientNameFromList').value;
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
                                    var fileContent = data.file_content;
                                    if (fileContent) {
                                      // Create new object with spaces replaced by underscores in keys
                                      var newObj = {};
                                      for (var key in fileContent) {
                                        if (fileContent.hasOwnProperty(key)) {
                                          var newKey = key.replace(/\s/g, '_');
                                          newObj[newKey] = fileContent[key];
                                        }
                                      }

                                      // Clinical Summary
                                      if (newObj['Clinical_Summary'] && summaryContainer) {
                                        var formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");
                                        summaryContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-summary-section\" style=\"font-size: 12px;\">\n                                          ".concat(formattedText, "\n                                        </div>");
                                      }

                                      // Subjective and Interval Events
                                      if (newObj['Subjective_and_Interval_Events'] && assessContainer) {
                                        var _formattedText5 = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");
                                        assessContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-assess-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText5, "\n                                        </div>");
                                      }

                                      // Review of Systems
                                      if (newObj['Review_of_Systems'] && reviewofSystemContainer) {
                                        var _formattedText6 = newObj['Review_of_Systems'].replace(/\n/g, "<br>");
                                        reviewofSystemContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-review-system-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText6, "\n                                        </div>");
                                      }

                                      // Physical Examination
                                      if (newObj['Physical_Examination'] && phyExamContainer) {
                                        var _formattedText7 = newObj['Physical_Examination'].replace(/\n/g, "<br>");
                                        phyExamContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-physical-exam-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText7, "\n                                        </div>");
                                      }

                                      // Assessment and Plan
                                      if (newObj['Assessment_and_Plan'] && assessPlanContainer) {
                                        var _formattedText8 = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");
                                        assessPlanContainer.innerHTML = "\n                                        <div class=\"pt-0 inside-plan-section\" style=\"font-size: 12px;\">\n                                          ".concat(_formattedText8, "\n                                        </div>");
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
                                  var truncatedDiagnosis = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
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
                          socket.on("transcription_failed", function (data) {
                            document.getElementById("loader-overlay").style.display = "none";
                            // if (data.user === urlUserName) {
                            console.error("Transcription failed:", data.error);
                            if (summaryContainer) {
                              summaryContainer.innerHTML = "\n                                                      <div class=\"error-message\">\n                                                          <p style=\"color: red; font-weight: bold;\">Error: ".concat(data.error, "</p>\n                                                      </div>\n                                                  ");
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
                      _context19.n = 6;
                      break;
                    case 5:
                      setWaveState('stop');
                      deletePatientRecording(patientId, state.sessionId, state);
                    case 6:
                      return _context19.a(2);
                  }
                }, _callee19);
              }));
              return function (_x20) {
                return _ref19.apply(this, arguments);
              };
            }());

            // Reset UI state
            _renderPatientRecording2 = document.querySelector('.render-patient-recording');
            _renderWaveTimer2 = document.querySelector('.wave-timer');
            if (_renderPatientRecording2) {
              _renderPatientRecording2.querySelector('.rec-icon-wrapper').style.display = 'inline-flex';
              _renderPatientRecording2.querySelector('.pause-icon-wrapper').style.display = 'none';
              _renderPatientRecording2.querySelector('.play-icon-wrapper').style.display = 'none';
              _renderPatientRecording2.querySelector('.stop-icon-wrapper').style.display = 'none';
              if (_renderWaveTimer2) {
                _renderWaveTimer2.querySelector('.recording-timer').style.display = 'none';
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
            return _context20.a(2, true);
          case 5:
            _context20.p = 5;
            _t18 = _context20.v;
            console.error("Error stopping recording 2:", _t18);
            return _context20.a(2, false);
          case 6:
            console.error("Error stopping recording 3:", error);
            return _context20.a(2, false);
          case 7:
            return _context20.a(2);
        }
      }, _callee20, null, [[4, 5]]);
    })));
  }
}

// Helper function to clear all intervals
function clearAllIntervals() {
  for (var _len = arguments.length, intervals = new Array(_len), _key = 0; _key < _len; _key++) {
    intervals[_key] = arguments[_key];
  }
  intervals.forEach(function (interval) {
    if (interval) clearInterval(interval);
  });
}

// Helper function to handle summary completion
function handleSummaryComplete(data, patientName, socket) {
  for (var _len2 = arguments.length, intervals = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    intervals[_key2 - 3] = arguments[_key2];
  }
  // Implementation of summary completion handling
  // (Same as your existing code for processing the summary data)

  // Don't forget to clear intervals and disconnect socket when done
  clearAllIntervals.apply(void 0, intervals);
  socket.disconnect();
}

// Helper function to handle transcription failure
function handleTranscriptionFailure(data, socket) {
  for (var _len3 = arguments.length, intervals = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    intervals[_key3 - 2] = arguments[_key3];
  }
  // Implementation of failure handling
  // (Same as your existing error handling code)

  clearAllIntervals.apply(void 0, intervals);
  socket.disconnect();
}
function createIconRow(currentPatient, id) {
  var iconRow = document.createElement('div');
  iconRow.className = 'flex pt-5 feedback';
  iconRow.innerHTML = "\n    <i class=\"material-icons mr-5 cursor-pointer thumb-up text-gray-300\" onclick=\"updateLikeAndDisLike('".concat(currentPatient, "', 'thumbs_up', '").concat(id, "')\">thumb_up</i>\n    <i class=\"material-icons mr-5 cursor-pointer thumb-down text-gray-300\" onclick=\"updateLikeAndDisLike('").concat(currentPatient, "', 'thumbs_down', '").concat(id, "')\">thumb_down</i>\n    <i class=\"material-icons cursor-pointer comment text-gray-300\" onclick=\"openCommentModal('").concat(currentPatient, "', '").concat(id, "')\">comment</i>\n  ");
  return iconRow;
}
function displayFeedbackDesign(currentPatient) {
  // all the container IDs you want to target
  var containerClasses = ['summary-container', 'assessment-container', 'review-of-system-id', 'physical-exam-id', 'assessment-plan-container', 'principal-diagnosis', 'chief-complaint-container', 'history-present-ill', 'past-med-hist', 'past-surg-hist', 'medi-container', 'allergy-container', 'family-container', 'social-container', 'hp-ros-container', 'phy-exam-container', 'assess-plan-container', 'principal-diagnosis-container', 'discharge-summary-container', 'discharge-diagnoses-container', 'discharge-medications-container', 'discharge-condition-container', 'discharge-disposition-container', 'discharge-instructions-container', 'followup-care-container'];
  containerClasses.forEach(function (className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el && !el.querySelector('.thumb-up')) {
        el.appendChild(createIconRow(currentPatient, className));
      }
    }
  });
}
function fetchActivePatientSegments(_x21, _x22, _x23) {
  return _fetchActivePatientSegments.apply(this, arguments);
}
function _fetchActivePatientSegments() {
  _fetchActivePatientSegments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(patientName, patientId, element) {
    var id, currentPatientState, currentPatientName, passPatientName, addModalPatientName, getPatientNameFromList, patientDetails, nameSpan, apiUrl, apiUrl_raw, summaryDiv, assessmentDiv, planDiv, rawTransDiv, rawUploadsDiv, reviewDiv, phyExamDiv, token, summarySeconds, assessmentSeconds, summaryTimer, assessmentTimer, idTitleMap, response, data, file_content, jsonArray, jsonString, newObj, key, newKey, formattedText, _formattedText11, _formattedText12, _formattedText13, _formattedText14, diagnosis, diagnosisItems, part, currentPatient, responseType, responseUrl, title, currentId, currentNoteTypeElement, selectedTab, hiddenSoap, sectionName, _i9, _Object$entries7, _Object$entries7$_i, className, sectionTitle, container, card, icons, accordionItem, titleToggle, titleSpan, _title2, result, response_data, ratings, idMap, _t32, _t33, _t34;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          // handleUploadButtonState('active');
          // handleSuturePhraseButtonState('active');
          loadUploads(patientName, 'active');
          showAllFeedback();
          _t32 = _regeneratorKeys(recordingStates);
        case 1:
          if ((_t33 = _t32()).done) {
            _context30.n = 3;
            break;
          }
          id = _t33.value;
          if (!(id !== patientId && recordingStates[id].mediaRecorder)) {
            _context30.n = 2;
            break;
          }
          currentPatientState = recordingStates[id];
          currentPatientName = currentPatientState.patientName || 'Previous Patient';
          _context30.n = 2;
          return pauseCurrentRecording(id, currentPatientName);
        case 2:
          _context30.n = 1;
          break;
        case 3:
          // toggleContent();
          // const recordingBlock = document.querySelector('.patient-wise-recording');
          // if (recordingBlock) {
          //   recordingBlock.style.display = 'block';
          // }
          passPatientName = document.getElementById('passPatientName');
          addModalPatientName = document.getElementById('addModalPatientName');
          getPatientNameFromList = document.getElementById('getPatientNameFromList');
          if (passPatientName) passPatientName.value = patientName;
          if (addModalPatientName) addModalPatientName.textContent = patientName;
          if (getPatientNameFromList) getPatientNameFromList.value = patientName;
          selectedPatientName = patientName;
          patientDetails = document.querySelector('.patient-name');
          nameSpan = document.createElement('span');
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
          apiUrl = "".concat(BASE_URL, "summary/display-patient-jobs-output?patient_name=") + patientName;
          apiUrl_raw = "".concat(BASE_URL, "summary/");
          summaryDiv = document.querySelector(".summary-container");
          assessmentDiv = document.querySelector(".assessment-container");
          planDiv = document.querySelector(".assessment-plan-container");
          rawTransDiv = document.querySelector(".raw-transcription-id");
          rawUploadsDiv = document.querySelector(".raw-uploads-id");
          reviewDiv = document.querySelector(".review-of-system-id");
          phyExamDiv = document.querySelector(".physical-exam-id");
          token = localStorage.getItem('access_token');
          document.querySelectorAll(".navi-link").forEach(function (link) {
            return link.classList.remove("active");
          });
          // link.addEventListener("click", function (e) {
          //   e.preventDefault();

          // Remove active classes from all
          document.querySelectorAll(".navi-link").forEach(function (l) {
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
          summarySeconds = 0, assessmentSeconds = 0;
          summaryDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading... <span id=\"summary-timer\">0</span>s</p>";
          assessmentDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading... <span id=\"assessment-timer\">0</span>s</p>";
          planDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";
          reviewDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";
          phyExamDiv.innerHTML = "<p class=\"loading-text text-xs\">Loading...</p>";

          // Timers
          summaryTimer = setInterval(function () {
            summarySeconds++;
            document.getElementById("summary-timer").innerText = summarySeconds;
          }, 1000);
          assessmentTimer = setInterval(function () {
            assessmentSeconds++;
            document.getElementById("assessment-timer").innerText = assessmentSeconds;
          }, 1000);
          idTitleMap = {
            "summary-container": "Summary",
            "assessment-container": "Interval Events",
            "review-of-system-id": "Review of Systems",
            "physical-exam-id": "Physical Examination",
            "assessment-plan-container": "Assessment and Plan"
          };
          document.getElementById("hd_soap_url").value = '';
          document.getElementById("hd_hp_url").value = '';
          document.getElementById("hd_ds_url").value = '';
          Object.keys(idTitleMap).flat().forEach(function (containerClass) {
            var card = document.querySelector(".".concat(containerClass)).closest('.kt-accordion-content');
            if (!card) return;
            var icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
            icons.forEach(function (icon) {
              return icon.classList.remove('active');
            });
          });

          // checkSoapNotification(patientId, token);
          _context30.p = 4;
          _context30.n = 5;
          return fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(token)
            }
          });
        case 5:
          response = _context30.v;
          clearInterval(summaryTimer);
          clearInterval(assessmentTimer);
          _context30.n = 6;
          return response.json();
        case 6:
          data = _context30.v;
          // Update Summary
          file_content = data.file_content;
          jsonArray = [file_content];
          jsonString = JSON.stringify(jsonArray);
          newObj = {};
          for (key in file_content) {
            if (file_content.hasOwnProperty(key)) {
              newKey = key.replace(/\s/g, '_');
              newObj[newKey] = file_content[key];
            }
          }
          // Update Summary
          if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].length === 0) {
            summaryDiv.innerHTML = "<p class='text-xs'>No Summary Available</p>";
          } else {
            formattedText = newObj['Clinical_Summary'].replace(/\n/g, "<br>");
            summaryDiv.innerHTML = "\n        <div class=\"pt-0 inside-summary-section text-xs\">\n          ".concat(formattedText, "\n        </div>");
          }

          // Update Assessment
          if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].length === 0) {
            assessmentDiv.innerHTML = "<p class='text-xs'>No Interval Events Available</p>";
          } else {
            _formattedText11 = newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>");
            assessmentDiv.innerHTML = "\n        <div class=\"pt-0 inside-assess-section text-xs\">\n          ".concat(_formattedText11, "\n        </div>");
          }
          // Update Assessment Plan
          if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
            planDiv.innerHTML = "<p class='text-xs'>No Assessment Plan Available</p>";
          } else {
            _formattedText12 = newObj['Assessment_and_Plan'].replace(/\n/g, "<br>");
            planDiv.innerHTML = "\n        <div class=\"pt-0 inside-plan-section text-xs\">\n          ".concat(_formattedText12, "\n        </div>");
          }

          // Update Review of System
          if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
            reviewDiv.innerHTML = "<p class='text-xs'>No Review of System Available</p>";
          } else {
            _formattedText13 = newObj['Review_of_Systems'].replace(/\n/g, "<br>");
            reviewDiv.innerHTML = "\n        <div class=\"pt-0 inside-review-system-section text-xs\">\n          ".concat(_formattedText13, "\n        </div>");
          }

          //update physical examination
          if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
            phyExamDiv.innerHTML = "<p class='text-xs'>No Physical Examination Available</p>";
          } else {
            _formattedText14 = newObj['Physical_Examination'].replace(/\n/g, "<br>");
            phyExamDiv.innerHTML = "\n        <div class=\"pt-0 inside-physical-exam-section text-xs\">\n          ".concat(_formattedText14, "\n        </div>");
          }
          diagnosis = newObj['Principal_Diagnosis'] || '● None documented'; // Get all <li> elements with class "navi-item"
          diagnosisItems = document.querySelectorAll('li.navi-item');
          diagnosisItems.forEach(function (item) {
            var nameSpan = item.querySelector('.navi-text.font-semibold');
            var diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');
            if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
              if (diagnosis.length <= 24) {
                diagnosisSpan.style.marginRight = '40px';
              }
              // Limit diagnosis to 35 characters
              var truncatedDiagnosis = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
              diagnosisSpan.textContent = truncatedDiagnosis;
            }
          });
          if (data.s3_overall_jobs_path) {
            part = data.s3_overall_jobs_path.split("/")[3];
            currentPatient = part.split("_")[1];
            displayFeedbackDesign(currentPatient);
          } else {
            displayFeedbackDesign(patientId);
          }
          responseType = '';
          responseUrl = '';
          title = '';
          currentId = '';
          currentNoteTypeElement = document.getElementById('currentNoteType');
          selectedTab = (currentNoteTypeElement === null || currentNoteTypeElement === void 0 ? void 0 : currentNoteTypeElement.textContent.trim()) || 'SOAP';
          hiddenSoap = document.getElementById("hd_soap_url");
          if (hiddenSoap) {
            hiddenSoap.value = data.s3_overall_jobs_path;
            responseUrl = data.s3_overall_jobs_path;
            responseType = 'SOAP';
          }
          if (!(responseType === 'SOAP' && responseUrl && responseUrl !== 'undefined')) {
            _context30.n = 12;
            break;
          }
          sectionName = '';
          _i9 = 0, _Object$entries7 = Object.entries(idTitleMap);
        case 7:
          if (!(_i9 < _Object$entries7.length)) {
            _context30.n = 9;
            break;
          }
          _Object$entries7$_i = _slicedToArray(_Object$entries7[_i9], 2), className = _Object$entries7$_i[0], sectionTitle = _Object$entries7$_i[1];
          container = document.querySelector(".".concat(className));
          if (!container) {
            _context30.n = 8;
            break;
          }
          currentId = className;
          sectionName = sectionTitle;
          return _context30.a(3, 9);
        case 8:
          _i9++;
          _context30.n = 7;
          break;
        case 9:
          card = document.querySelector(".".concat(currentId)).closest('.kt-accordion-content'); // clear old actives
          icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });
          accordionItem = card.parentElement;
          titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
          titleSpan = titleToggle ? titleToggle.querySelector('span') : null;
          _title2 = titleSpan ? titleSpan.textContent.trim() : '';
          if (!card) {
            _context30.n = 12;
            break;
          }
          _context30.n = 10;
          return fetch("".concat(BASE_URL, "summary/display_user_rating?patient_id=").concat(patientId, "&response_type=").concat(responseType, "&response_url=").concat(responseUrl), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 10:
          result = _context30.v;
          if (!result.ok) {
            _context30.n = 12;
            break;
          }
          _context30.n = 11;
          return result.json();
        case 11:
          response_data = _context30.v;
          if (response_data.user_ratings && response_data.user_ratings.length > 0) {
            ratings = response_data.user_ratings[0].good_bad;
            idMap = {
              "Summary": ["summary-container"],
              "Interval Events": ["assessment-container"],
              "Review of Systems": ["review-of-system-id"],
              "Physical Examination": ["physical-exam-id"],
              "Assessment and Plan": ["assessment-plan-container"]
            };
            Object.entries(ratings).forEach(function (_ref32) {
              var _ref33 = _slicedToArray(_ref32, 2),
                title = _ref33[0],
                ratingValue = _ref33[1];
              var containerIds = idMap[title];
              if (!containerIds) return;
              containerIds.forEach(function (containerId) {
                var card = document.querySelector(".".concat(containerId)).closest('.kt-accordion-content');
                if (!card) return;

                // set based on API
                if (ratingValue === "good") {
                  var _card$querySelector3;
                  (_card$querySelector3 = card.querySelector('.thumb-up')) === null || _card$querySelector3 === void 0 || _card$querySelector3.classList.add('active');
                } else if (ratingValue === "bad") {
                  var _card$querySelector4;
                  (_card$querySelector4 = card.querySelector('.thumb-down')) === null || _card$querySelector4 === void 0 || _card$querySelector4.classList.add('active');
                }
              });
            });
          }
        case 12:
          _context30.n = 14;
          break;
        case 13:
          _context30.p = 13;
          _t34 = _context30.v;
          console.error("Error fetching data:", _t34);
          summaryDiv.innerHTML = "<p class='text-xs'>Error loading summary</p>";
          assessmentDiv.innerHTML = "<p class='text-xs'>Error loading assessment</p>";
          planDiv.innerHTML = "<p class='text-xs'>Error loading assessment plan</p>";
          reviewDiv.innerHTML = "<p class='text-xs'>Error loading Review of System</p>";
          phyExamDiv.innerHTML = "<p class='text-xs'>Error loading Physical Examination</p>";
        case 14:
          fetchPatientHpDetails(patientName);
          fetchPatientDsDetails(patientName);
          // loadTasks(patientName);

          // loadSutureFix(patientName, 'unarchived');
          // loadUploads(patientName, 'unarchived');
        case 15:
          return _context30.a(2);
      }
    }, _callee30, null, [[4, 13]]);
  }));
  return _fetchActivePatientSegments.apply(this, arguments);
}
function fetchPatientHpDetails(_x24) {
  return _fetchPatientHpDetails.apply(this, arguments);
}
function _fetchPatientHpDetails() {
  _fetchPatientHpDetails = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(patientName) {
    var token, sectionMap, idMap, response, data, hpContent, _i0, _Object$entries8, _Object$entries8$_i, key, value, selector, container, part, currentPatient, hiddenHp, responseUrl, responseType, ratingRes, ratingData, ratings, _t35;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          token = localStorage.getItem('access_token');
          if (token) {
            _context31.n = 1;
            break;
          }
          window.location.href = '../index.html';
          return _context31.a(2);
        case 1:
          // Map JSON keys to class selectors
          sectionMap = {
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
            "Social History": ".inside-social-container-section"
          }; // Clear all sections initially
          Object.values(sectionMap).forEach(function (selector) {
            var container = document.querySelector(selector);
            if (container) {
              container.innerHTML = '';
            }
          });

          // idMap for H&P
          idMap = {
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
            "Assessment and Plan": ["assess-plan-container"]
          };
          Object.values(idMap).flat().forEach(function (containerId) {
            var card = document.querySelector(".".concat(containerId)).closest('.kt-accordion-content');
            if (!card) return;
            var icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
            icons.forEach(function (icon) {
              return icon.classList.remove('active');
            });
          });
          _context31.p = 2;
          _context31.n = 3;
          return fetch("".concat(BASE_URL, "summary/display-patient-hp-output?patient_name=").concat(encodeURIComponent(patientName)), {
            method: 'GET',
            headers: {
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 3:
          response = _context31.v;
          if (response.ok) {
            _context31.n = 4;
            break;
          }
          throw new Error('Failed to fetch patient data');
        case 4:
          _context31.n = 5;
          return response.json();
        case 5:
          data = _context31.v;
          hpContent = data.hp_content;
          if (hpContent) {
            _context31.n = 6;
            break;
          }
          toastr.warning('No patient data found');
          return _context31.a(2);
        case 6:
          for (_i0 = 0, _Object$entries8 = Object.entries(hpContent); _i0 < _Object$entries8.length; _i0++) {
            _Object$entries8$_i = _slicedToArray(_Object$entries8[_i0], 2), key = _Object$entries8$_i[0], value = _Object$entries8$_i[1];
            selector = sectionMap[key];
            if (selector) {
              container = document.querySelector(selector);
              if (container) {
                if (value && value.trim() !== '') {
                  // if (key === "Assessment and Plan" || key === "Review of Systems" || key === "Physical Examination") {
                  container.innerHTML = "".concat(value.replace(/\n/g, '<br>'));
                  // } else {
                  //   container.innerHTML = marked.parse(formatToMarkdownSafe(value));
                  // }
                } else {
                  container.innerHTML = '<p class="text-xs">No data available.</p>';
                }
              }
            } else {
              console.warn("No matching section for key: \"".concat(key, "\""));
            }
          }
          part = data.s3_hp_path.split("/")[3];
          currentPatient = part.split("_")[1];
          hiddenHp = document.getElementById("hd_hp_url");
          if (hiddenHp) hiddenHp.value = data.s3_hp_path;
          responseUrl = data.s3_hp_path;
          responseType = "HP";
          if (!(responseUrl === 'undefined' || !responseUrl)) {
            _context31.n = 7;
            break;
          }
          return _context31.a(2);
        case 7:
          _context31.n = 8;
          return fetch("".concat(BASE_URL, "summary/display_user_rating?patient_id=").concat(currentPatient, "&response_type=").concat(responseType, "&response_url=").concat(responseUrl), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 8:
          ratingRes = _context31.v;
          if (ratingRes.ok) {
            _context31.n = 9;
            break;
          }
          throw new Error('Failed to fetch ratings');
        case 9:
          _context31.n = 10;
          return ratingRes.json();
        case 10:
          ratingData = _context31.v;
          if (ratingData.user_ratings && ratingData.user_ratings.length > 0) {
            ratings = ratingData.user_ratings[0].good_bad;
            Object.entries(ratings).forEach(function (_ref34) {
              var _ref35 = _slicedToArray(_ref34, 2),
                title = _ref35[0],
                ratingValue = _ref35[1];
              var containerIds = idMap[title];
              if (!containerIds) return;
              containerIds.forEach(function (containerId) {
                var card = document.querySelector(".".concat(containerId)).closest('.kt-accordion-content');
                if (!card) return;

                // clear old actives
                var icons = card.querySelectorAll('.thumb-up, .thumb-down');
                icons.forEach(function (icon) {
                  return icon.classList.remove('active');
                });

                // apply rating
                if (ratingValue === "good") {
                  var _card$querySelector5;
                  (_card$querySelector5 = card.querySelector('.thumb-up')) === null || _card$querySelector5 === void 0 || _card$querySelector5.classList.add('active');
                } else if (ratingValue === "bad") {
                  var _card$querySelector6;
                  (_card$querySelector6 = card.querySelector('.thumb-down')) === null || _card$querySelector6 === void 0 || _card$querySelector6.classList.add('active');
                }
              });
            });
          }
          _context31.n = 12;
          break;
        case 11:
          _context31.p = 11;
          _t35 = _context31.v;
          console.error('Error fetching H&P details:', _t35);
        case 12:
          return _context31.a(2);
      }
    }, _callee31, null, [[2, 11]]);
  }));
  return _fetchPatientHpDetails.apply(this, arguments);
}
function fetchArchivedPatientHpDetails(patientName) {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Map JSON keys to class selectors
  var sectionMap = {
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
    "Social History": ".inside-social-container-section"
  };

  // Clear all sections initially
  Object.values(sectionMap).forEach(function (selector) {
    var container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });
  fetch("".concat(BASE_URL, "summary/display-patient-hp-output?patient_name=").concat(patientName, "&patient_status=archived"), {
    method: 'GET',
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) throw new Error('Failed to fetch patient data');
    return response.json();
  }).then(function (data) {
    var hpContent = data.hp_content;
    if (!hpContent) {
      toastr.warning('No patient data found');
      return;
    }
    for (var _i2 = 0, _Object$entries2 = Object.entries(hpContent); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];
      var selector = sectionMap[key];
      if (selector) {
        var container = document.querySelector(selector);
        if (container) {
          if (value && value.trim() !== '') {
            // if (key === "Assessment and Plan" || key === "Review of Systems" || key === "Physical Examination") {
            container.innerHTML = "".concat(value.replace(/\n/g, '<br>'));
            // } else {
            //   container.innerHTML = marked.parse(formatToMarkdownSafe(value));
            // }
          } else {
            container.innerHTML = '<p class="text-xs">No data available.</p>';
          }
        }
      } else {
        console.warn("No matching section for key: \"".concat(key, "\""));
      }
    }
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}
function fetchPatientDsDetails(patientName) {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  // Map JSON keys to class selectors
  var sectionMap = {
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
  Object.values(sectionMap).forEach(function (selector) {
    var container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });

  // idMap for DS
  var idMap = {
    "Principal Diagnosis": ["principal-diagnosis-container"],
    "Discharge Summary": ["discharge-summary-container"],
    "Discharge Diagnoses": ["discharge-diagnoses-container"],
    "Discharge Medications": ["discharge-medications-container"],
    "Discharge Condition": ["discharge-condition-container"],
    "Discharge Disposition": ["discharge-disposition-container"],
    "Discharge Instructions": ["discharge-instructions-container"],
    "Follow-up Care": ["followup-care-container"]
  };
  Object.values(idMap).flat().forEach(function (containerId) {
    var card = document.querySelector(".".concat(containerId)).closest('.kt-accordion-content');
    if (!card) return;
    var icons = card.querySelectorAll('i.thumb-up, i.thumb-down');
    icons.forEach(function (icon) {
      return icon.classList.remove('active');
    });
  });
  fetch("".concat(BASE_URL, "summary/display-patient-discharge-output?patient_name=").concat(encodeURIComponent(patientName)), {
    method: 'GET',
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) throw new Error('Failed to fetch patient data');
    return response.json();
  }).then(function (data) {
    var dsContent = data.discharge_content;
    if (!dsContent) {
      toastr.warning('No patient data found');
      return;
    }
    for (var _i3 = 0, _Object$entries3 = Object.entries(dsContent); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];
      var selector = sectionMap[key];
      if (selector) {
        var container = document.querySelector(selector);
        if (container) {
          if (value && value.trim() !== '') {
            var formattedText = value.replace(/\n/g, "<br>");
            container.innerHTML = "".concat(formattedText);
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
        console.warn("No matching section for key: \"".concat(key, "\""));
      }
    }
    var part = data.s3_discharge_path.split("/")[3];
    var currentPatient = part.split("_")[1];

    // Save hidden input for DS path
    var hiddenDs = document.getElementById("hd_ds_url");
    if (hiddenDs) hiddenDs.value = data.s3_discharge_path;
    var responseUrl = data.s3_discharge_path;
    var responseType = "DS";
    if (responseUrl === 'undefined' || !responseUrl) return;

    // Fetch ratings for discharge summary
    return fetch("".concat(BASE_URL, "summary/display_user_rating?patient_id=").concat(currentPatient, "&response_type=").concat(responseType, "&response_url=").concat(responseUrl), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
      }
    });
  }).then(function (res) {
    if (!res) return; // skip if no ratings call
    if (!res.ok) throw new Error("Failed to fetch ratings");
    return res.json();
  }).then(function (ratingData) {
    if (!ratingData) return;
    if (ratingData.user_ratings && ratingData.user_ratings.length > 0) {
      var ratings = ratingData.user_ratings[0].good_bad;
      Object.entries(ratings).forEach(function (_ref20) {
        var _ref21 = _slicedToArray(_ref20, 2),
          title = _ref21[0],
          ratingValue = _ref21[1];
        var containerIds = idMap[title];
        if (!containerIds) return;
        containerIds.forEach(function (containerId) {
          var card = document.querySelector(".".concat(containerId)).closest('.kt-accordion-content');
          if (!card) return;

          // clear old actives
          var icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });

          // set new active
          if (ratingValue === "good") {
            var _card$querySelector;
            (_card$querySelector = card.querySelector('.thumb-up')) === null || _card$querySelector === void 0 || _card$querySelector.classList.add('active');
          } else if (ratingValue === "bad") {
            var _card$querySelector2;
            (_card$querySelector2 = card.querySelector('.thumb-down')) === null || _card$querySelector2 === void 0 || _card$querySelector2.classList.add('active');
          }
        });
      });
    }
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}
function handleUploadButtonState(archiveState) {
  var uploadAddBtn = document.getElementById('notesAddBtn'); // upload add button
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
  var sutureAddBtn = document.getElementById('addNewPhraseBtn'); // suture phrase add button
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
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  // Map JSON keys to class selectors
  var sectionMap = {
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
  Object.values(sectionMap).forEach(function (selector) {
    var container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '';
    }
  });
  fetch("".concat(BASE_URL, "summary/display-patient-discharge-output?patient_name=").concat(patientName, "&patient_status=archived"), {
    method: 'GET',
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) throw new Error('Failed to fetch patient data');
    return response.json();
  }).then(function (data) {
    var dsContent = data.discharge_content;
    if (!dsContent) {
      toastr.warning('No patient data found');
      return;
    }
    for (var _i4 = 0, _Object$entries4 = Object.entries(dsContent); _i4 < _Object$entries4.length; _i4++) {
      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        key = _Object$entries4$_i[0],
        value = _Object$entries4$_i[1];
      var selector = sectionMap[key];
      if (selector) {
        var container = document.querySelector(selector);
        if (container) {
          if (value && value.trim() !== '') {
            var formattedText = value.replace(/\n/g, "<br>");
            container.innerHTML = "".concat(formattedText);
            // container.innerHTML = marked.parse(formatToMarkdownSafe(value));
          } else {
            container.innerHTML = '<p class="text-xs">No data available.</p>';
          }
        }
      } else {
        console.warn("No matching section for key: \"".concat(key, "\""));
      }
    }
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}
window.filterPatients = function () {
  var input = document.getElementById("patientSearch").value.toLowerCase().trim();
  var items = document.querySelectorAll(".navi-item");
  items.forEach(function (item) {
    var nameSpan = item.querySelector(".navi-text");
    var name = nameSpan ? nameSpan.textContent.toLowerCase() : "";
    if (name.includes(input)) {
      item.style.setProperty("display", "flex", "important");
    } else {
      item.style.setProperty("display", "none", "important");
    }
  });
};
var seconds = 0;
var timerInterval;
var alertTimeout;
var stopTimeout;
function startTimer() {
  // Hide start image and show stop image
  document.getElementById("startRecording").style.display = "none";
  document.getElementById("RecordingHint").style.display = "none";
  document.getElementById("stopRecording").style.display = "flex";

  // Show the timer display
  var timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.style.display = "flex";

  // Start the timer
  timerInterval = setInterval(function () {
    seconds++;
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    timerDisplay.textContent = "".concat(String(minutes).padStart(2, "0"), ":").concat(String(remainingSeconds).padStart(2, "0"));

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
  var countdown = 59; // 1-minute countdown
  var alertMessage = document.getElementById("countdownMessage"); // Select the <p> tag

  alertMessage.style.display = "block"; // Show the message container

  alertTimeout = setInterval(function () {
    if (countdown > 1) {
      alertMessage.textContent = "Recording will stop in ".concat(countdown, " seconds.");
      countdown--;
    } else {
      clearInterval(alertTimeout);
      alertMessage.textContent = '';
      alertMessage.style.display = "none"; // Hide the message after countdown
    }
  }, 1000);
}
var startButton = document.getElementById('startRecording');
var stopButton = document.getElementById('stopRecording');
var statusDiv = document.getElementById('status');
var mediaRecorder;
var audioChunks = [];
var uniqueId = generateUniqueId();
var stream;
function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit unique ID
}
function refreshPatientList() {
  document.getElementById('getPatientNameFromList').value = '';
  var patientList = document.querySelector(".navi");
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
  var activeTab = document.querySelector('.nav-link.active');
  // if (!activeTab) {
  //   console.error("No active tab found!");
  //   return;
  // }

  // Determine which tab is active using ID
  var archiveTab = document.getElementById("archivedPatientLink");
  if (activeTab === archiveTab) {
    var url = "".concat(BASE_URL, "get-archived-patients");
    if (typeof fetchArchivedPatientList === "function") {
      fetchArchivedPatientList(url); // ✅ Pass URL here
    } else {
      console.error("fetchArchivedPatientList function is missing!");
    }
  } else {
    var _url = "".concat(BASE_URL, "patient-name-list");
    if (typeof fetchPatientList === "function") {
      fetchPatientList(_url);
    } else {
      console.error("fetchPatientList function is missing!");
    }
  }
  selectedPatientName = null;
}
var isRecording = false;
var currentRecordingPatient = "Common Recording";
var selectedPatientName = null;
function handleRecordingClick() {
  var patientName = selectedPatientName || "Common Recording";
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
    var prevOptions = _objectSpread({}, toastr.options); // Save current global options

    toastr.options = {
      "positionClass": "toast-top-left",
      "timeOut": "5000",
      "extendedTimeOut": "1000"
    };
    toastr.info("Recording started for (".concat(patientName, ")"));

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
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioContext.createAnalyser();

  // Use a larger FFT size for better frequency resolution
  analyser.fftSize = 512; // Increased from 256
  analyser.minDecibels = -90; // Lower minimum dB for quieter sounds
  analyser.maxDecibels = -10; // Adjusted max dB for better sensitivity
  analyser.smoothingTimeConstant = 0.4; // Less smoothing for more responsiveness

  var source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  var dataArray = new Uint8Array(analyser.frequencyBinCount);
  function drawVisualizer() {
    analyser.getByteFrequencyData(dataArray);
    var canvasContext = canvas.getContext('2d');
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    // Clear canvas
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
    canvasContext.fillStyle = '#b3e5fc';
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
    var barWidth = WIDTH / analyser.frequencyBinCount * 25;
    var x = 0;

    // Amplify the values for better visibility with quiet sounds
    var amplificationFactor = 1.5; // Increase this for more sensitivity

    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      // Apply amplification and ensure it doesn't exceed canvas height
      var barHeight = Math.min(dataArray[i] / 255 * HEIGHT * amplificationFactor, HEIGHT);

      // Add a minimum height for very quiet sounds to make them visible
      if (dataArray[i] > 0 && barHeight < 2) barHeight = 2;

      // Gradient color based on intensity
      var intensity = dataArray[i] / 255;
      canvasContext.fillStyle = "rgb(".concat(Math.floor(100 + intensity * 155), ", ").concat(Math.floor(50 + intensity * 50), ", 50)");
      canvasContext.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
    requestAnimationFrame(drawVisualizer);
  }
  drawVisualizer();
}

// Set up the visualizer by creating the canvas and calling initAudioAnalyser
function setupVisualizer(canvas, stream) {
  canvas.width = 50; // Width of 50px
  canvas.height = 20; // Height of 20px

  initAudioAnalyser(stream, canvas);
}

// Update the UI with the visualizer
function updateRecordingUI(patientName, showIcon) {
  document.querySelectorAll('.navi-link').forEach(function (link) {
    var nameElement = link.querySelector('.navi-text');
    if (nameElement && nameElement.textContent.trim() === patientName) {
      var visualizerElement = nameElement.querySelector('.audio-visualizer');
      if (showIcon) {
        // Add the audio visualizer if it doesn't exist
        if (!visualizerElement) {
          var visualizer = document.createElement('canvas');
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
var activePatientName = '';
// Attach click listener to all patient list items
document.addEventListener("click", function (e) {
  var li = e.target.closest("li");
  if (li && li.classList.contains("active-li")) {
    var nameSpan = li.querySelector(".navi-text.font-semibold");
    if (nameSpan) {
      activePatientName = nameSpan.textContent.trim();
    }
  }
});
window.onDemandSummaryCall = function () {
  var summaryDiv = document.querySelector(".summary-container");
  var planDiv = document.querySelector(".assessment-plan-container");
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  var patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }
  toastr.success("reSuture Started for Patient ".concat(patientName));

  // ✅ Remove SOAP notification dots when starting job
  var soapTab = Array.from(document.querySelectorAll('#navTabsDropdown .nav-link')).find(function (link) {
    var _link$querySelector;
    return ((_link$querySelector = link.querySelector('.nav-text')) === null || _link$querySelector === void 0 ? void 0 : _link$querySelector.textContent.trim()) === 'SOAP';
  });
  if (soapTab) {
    var dot = soapTab.querySelector('.notification-dot');
    if (dot) dot.remove();
  }
  var soapButton = document.getElementById('onDemandSummaryCall');
  if (soapButton) {
    var btnDot = soapButton.querySelector('.notification-dot');
    if (btnDot) btnDot.remove();
  }

  // ✅ Add spinner next to selected patient
  var patientItems = document.querySelectorAll(".navi-item");
  var selectedItem = null;
  patientItems.forEach(function (item) {
    var nameSpan = item.querySelector(".navi-text");
    var nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        var existingSpinner = item.querySelector(".spinner-icon");
        var existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();
        var spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  });

  // ✅ Send the API request with error handling
  fetch("".concat(BASE_URL, "ondemand/generate-jobs-on-demand?patient_name=").concat(encodeURIComponent(patientName)), {
    method: "POST",
    headers: {
      "Authorization": "Bearer ".concat(token),
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    if (!response.ok) {
      if (response.status === 504 || response.status >= 500) {
        console.warn("Server timeout or internal error occurred, but continuing to wait on socket...");
        return null;
      }
      return response.json().then(function (err) {
        console.log(err.error);
        if (err.error) {
          toastr.warning(err.error);

          // ❌ Remove spinner for this patient
          patientItems.forEach(function (item) {
            var nameSpan = item.querySelector(".navi-text");
            if (nameSpan && nameSpan.textContent.trim() === patientName) {
              var spinner = item.querySelector(".spinner-icon");
              if (spinner) {
                // Create the Font Awesome times icon
                var crossIcon = document.createElement("i");
                crossIcon.className = "fas fa-times cross-icon";
                crossIcon.style.marginLeft = "10px";
                crossIcon.style.color = "#F64E60"; // Optional: red color for error

                // Replace spinner with the cross icon
                spinner.replaceWith(crossIcon);
              }

              // Scroll to the patient when there's an error
              item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
              });
            }
          });
          setTimeout(function () {
            socket.disconnect();
          }, 2000);
        }
        return null;
      });
    }
    return response.json();
  })["catch"](function (err) {
    console.warn("Fetch failed, but still listening on socket:", err.message);
  });

  // ✅ Open Socket.IO connection
  var socket = io("".concat(window.BASE_URL), {
    transports: ['websocket', 'polling'],
    reconnection: true
  });
  socket.on('connect', function () {
    console.log('WebSocket connected');
  });
  socket.on('connect_error', function (err) {
    console.error('Connection Error:', err.message);
  });
  socket.on('disconnect', function (reason) {
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
  socket.on("job_generated", function (socketData) {
    if (socketData.patient_name === patientName) {
      // if (socketData.user === urlUserName) {
      // ✅ Remove spinner and add tick mark
      patientItems.forEach(function (item) {
        var nameSpan = item.querySelector(".navi-text");
        var nameSpinner = item.querySelector(".navi-spinner");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          // Remove spinner if exists
          var existingSpinner = item.querySelector(".spinner-icon");
          if (existingSpinner) existingSpinner.remove();

          // Remove tick if exists
          var existingTick = item.querySelector(".tick-icon");
          if (existingTick) existingTick.remove();
          if (!item.querySelector(".tick-icon")) {
            var tick = document.createElement("i");
            tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
            tick.style.color = "#0b6fac";
            var link = document.createElement("a");
            link.className = "navi-link";
            link.style.display = "none";
            link.href = "#";

            // Wrap the link in a <li> (to ensure parent exists and has class 'navi-item')
            var wrapper = document.createElement("li");
            wrapper.className = "navi-item";
            wrapper.style.display = "none";
            wrapper.appendChild(link);

            // Append both tick and wrapper to DOM
            nameSpinner.parentNode.appendChild(tick);
            nameSpinner.parentNode.appendChild(wrapper); // Now link has a parentElement

            link.addEventListener("click", function (e) {
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
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      });
      var diagnosis = socketData.file_content["Principal Diagnosis"] || "";
      var diagnosisItems = document.querySelectorAll('li.navi-item');
      diagnosisItems.forEach(function (item) {
        var nameSpan = item.querySelector('.navi-text.font-semibold');
        var diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');
        if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
          var truncatedDiagnosis = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
          diagnosisSpan.textContent = truncatedDiagnosis;
        }
      });
      toastr.success("reSuture Updated for Patient ".concat(patientName));

      // ✅ Reset all SOAP thumbs (remove active)
      var soapIds = ["summary-container", "assessment-container", "review-of-system-id", "physical-exam-id", "assessment-plan-container"];
      soapIds.forEach(function (id) {
        var card = document.querySelector(".".concat(id)).closest('.kt-accordion-content');
        if (card) {
          var icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });
        }
      });

      // ✅ Update hidden soap url
      var hiddenSoap = document.getElementById("hd_soap_url");
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
};
window.onDemandHpCall = function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  var patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }
  var patientItems = document.querySelectorAll(".navi-item");
  var selectedItem = null;
  patientItems.forEach(function (item) {
    var nameSpan = item.querySelector(".navi-text");
    var nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        var existingSpinner = item.querySelector(".spinner-icon");
        var existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();
        var spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  });
  // Show "Loading..." message in all containers
  var sectionClassMap = {
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
  for (var _i5 = 0, _Object$values = Object.values(sectionClassMap); _i5 < _Object$values.length; _i5++) {
    var selector = _Object$values[_i5];
    var container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '<p style="font-size:14px;color:#999;">Loading...</p>';
    }
  }

  // Step 1: Open WebSocket connection immediately
  var socket = io("".concat(BASE_URL), {
    transports: ['websocket', 'polling'],
    reconnection: true
  });
  socket.on('connect', function () {
    console.log('🔌 WebSocket connected');
  });
  socket.on("hp_generated", function (_ref22) {
    var status = _ref22.status,
      pname = _ref22.patient_name,
      hp_content = _ref22.hp_content,
      user = _ref22.user,
      s3_hp_file_url = _ref22.s3_hp_file_url;
    if (status === "success" && pname === patientName) {
      // if (user === urlUserName) {
      // ✅ Reset all HP thumbs
      var hpIds = ["principal-diagnosis", "chief-complaint-container", "history-present-ill", "past-med-hist", "past-surg-hist", "medi-container", "allergy-container", "family-container", "social-container", "hp-ros-container", "phy-exam-container", "assess-plan-container"];
      hpIds.forEach(function (id) {
        var card = document.querySelector(".".concat(id)).closest('.kt-accordion-content');
        if (card) {
          var icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });
        }
      });
      document.getElementById("hd_hp_url").value = s3_hp_file_url;
      patientItems.forEach(function (item) {
        var nameSpan = item.querySelector(".navi-text");
        var nameSpinner = item.querySelector(".navi-spinner");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          // Remove spinner if exists
          var existingSpinner = item.querySelector(".spinner-icon");
          if (existingSpinner) existingSpinner.remove();

          // Remove tick if exists
          var existingTick = item.querySelector(".tick-icon");
          if (existingTick) existingTick.remove();
          if (!item.querySelector(".tick-icon")) {
            var tick = document.createElement("i");
            tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
            tick.style.color = "#0b6fac";
            var link = document.createElement("a");
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
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
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
  socket.on("hp_error", function (_ref23) {
    var error = _ref23.error,
      pname = _ref23.patient_name;
    if (pname === patientName) {
      toastr.error(error);
      console.error("Socket error:", error);
      socket.disconnect();
    }
  });

  // Step 2: Trigger backend job via POST
  fetch("".concat(BASE_URL, "ondemand/generate-hp-on-demand?patient_name=").concat(encodeURIComponent(patientName)), {
    method: "POST",
    headers: {
      "Authorization": "Bearer ".concat(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status !== 'success') {
      console.error("Backend returned:", data.error || data);
      toastr.error("❌ Failed to start H&P generation.");
      patientItems.forEach(function (item) {
        var nameSpan = item.querySelector(".navi-text");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          var spinner = item.querySelector(".spinner-icon");
          if (spinner) {
            // Create the Font Awesome times icon
            var crossIcon = document.createElement("i");
            crossIcon.className = "fas fa-times cross-icon";
            crossIcon.style.marginLeft = "10px";
            crossIcon.style.color = "#F64E60"; // Optional: red color for error

            // Replace spinner with the cross icon
            spinner.replaceWith(crossIcon);
          }

          // Scroll to the patient when there's an error
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      });
      Object.values(sectionClassMap).forEach(function (selector) {
        var container = document.querySelector(selector);
        if (container) {
          container.innerHTML = '';
        }
      });
      socket.disconnect();
    }
  })["catch"](function (err) {
    toastr.error("❌ API call failed: " + err.message);
    console.error("API error:", err);
    patientItems.forEach(function (item) {
      var nameSpan = item.querySelector(".navi-text");
      if (nameSpan && nameSpan.textContent.trim() === patientName) {
        var spinner = item.querySelector(".spinner-icon");
        if (spinner) {
          // Create the Font Awesome times icon
          var crossIcon = document.createElement("i");
          crossIcon.className = "fas fa-times cross-icon";
          crossIcon.style.marginLeft = "10px";
          crossIcon.style.color = "#F64E60"; // Optional: red color for error

          // Replace spinner with the cross icon
          spinner.replaceWith(crossIcon);
        }

        // Scroll to the patient when there's an error
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    });
    socket.disconnect();
  });
};
function injectHpContent(hpContent) {
  var sectionClassMap = {
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
  marked.setOptions({
    breaks: true
  });
  for (var _i6 = 0, _Object$entries5 = Object.entries(sectionClassMap); _i6 < _Object$entries5.length; _i6++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i6], 2),
      sectionName = _Object$entries5$_i[0],
      selector = _Object$entries5$_i[1];
    var container = document.querySelector(selector);
    var content = hpContent[sectionName];
    if (container) {
      container.innerHTML = ''; // Clear "Loading..." or any old content

      if (content && content.trim() !== '') {
        // if (sectionName === "Assessment and Plan" || sectionName === "Review of Systems" || sectionName === "Physical Examination") {
        // const escaped = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // container.innerHTML = `<p>${escaped.replace(/\n/g, '<br>')}</p>`;
        container.innerHTML = "".concat(content.replace(/\n/g, '<br>'));
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
  return text.replace(/\n•/g, '\n-') // turn bullets into markdown lists
  .replace(/•/g, '- ') // fallback for lone bullets
  .replace(/\n/g, '  \n'); // force markdown line breaks
}
window.onDemandDsCall = function () {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  var patientName = selectedPatientName;
  if (!patientName) {
    toastr.warning("Please Select Patient in the List");
    return;
  }
  var patientItems = document.querySelectorAll(".navi-item");
  var selectedItem = null;
  patientItems.forEach(function (item) {
    var nameSpan = item.querySelector(".navi-text");
    var nameSpinner = item.querySelector(".navi-spinner");
    if (nameSpan && nameSpan.textContent.trim() === patientName) {
      selectedItem = item; // Store the selected item for later scrolling
      if (!item.querySelector(".spinner-icon")) {
        var existingSpinner = item.querySelector(".spinner-icon");
        var existingTick = item.querySelector(".tick-icon");
        if (existingSpinner) existingSpinner.remove();
        if (existingTick) existingTick.remove();
        var spinner = document.createElement("i");
        spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
        spinner.style.color = "#0b6fac";
        nameSpinner.parentNode.appendChild(spinner);

        // Scroll to the selected patient
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  });
  var sectionClassMap = {
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Follow-up Care": ".inside-followup-care-container",
    "Principal Diagnosis": ".inside-principal-diagnosis-container"
  };
  for (var _i7 = 0, _Object$values2 = Object.values(sectionClassMap); _i7 < _Object$values2.length; _i7++) {
    var selector = _Object$values2[_i7];
    var container = document.querySelector(selector);
    if (container) {
      container.innerHTML = '<p style="font-size:14px;color:#999;">Loading...</p>';
    }
  }
  var socket = io(BASE_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true
  });
  socket.on('connect', function () {
    console.log('🔌 WebSocket connected');
  });

  // Updated: Listen to 'ds_generated'
  socket.on("ds_generated", function (_ref24) {
    var status = _ref24.status,
      pname = _ref24.patient_name,
      ds_content = _ref24.ds_content,
      user = _ref24.user,
      s3_ds_file_url = _ref24.s3_ds_file_url;
    if (status === "success" && pname === patientName) {
      // ✅ Reset all DS thumbs
      var dsIds = ["discharge-condition-container", "discharge-diagnoses-container", "discharge-disposition-container", "discharge-instructions-container", "discharge-medications-container", "discharge-summary-container", "followup-care-container", "principal-diagnosis-container"];
      dsIds.forEach(function (id) {
        var card = document.querySelector(".".concat(id)).closest('.kt-accordion-content');
        if (card) {
          var icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });
        }
      });
      document.getElementById("hd_ds_url").value = s3_ds_file_url;
      patientItems.forEach(function (item) {
        var nameSpan = item.querySelector(".navi-text");
        var nameSpinner = item.querySelector(".navi-spinner");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          // Remove spinner if exists
          var existingSpinner = item.querySelector(".spinner-icon");
          if (existingSpinner) existingSpinner.remove();

          // Remove tick if exists
          var existingTick = item.querySelector(".tick-icon");
          if (existingTick) existingTick.remove();
          if (!item.querySelector(".tick-icon")) {
            var tick = document.createElement("i");
            tick.className = "ki-solid ki-check-circle tick-icon -ml-2";
            tick.style.color = "#0b6fac";
            var link = document.createElement("a");
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
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      });
      if (ds_content && Object.keys(ds_content).length > 0) {
        if (activePatientName === patientName) {
          injectDsContent(ds_content); // updated to use ds_content
        }
        toastr.success("📄 Discharge Summary generated successfully.");
      } else {
        toastr.warning("Discharge Summary content is empty.");
      }
      socket.disconnect();
    }
  });

  // Updated: Listen to 'ds_error'
  socket.on("ds_error", function (_ref25) {
    var error = _ref25.error,
      pname = _ref25.patient_name;
    if (pname === patientName) {
      toastr.error("⚠️ " + error);
      console.error("Socket error:", error);
      socket.disconnect();
    }
  });

  // Trigger backend POST request
  fetch("".concat(BASE_URL, "ondemand/generate-ds-on-demand?patient_name=").concat(encodeURIComponent(patientName)), {
    method: "POST",
    headers: {
      "Authorization": "Bearer ".concat(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status !== "success") {
      toastr.error("❌ Failed to start Discharge Summary generation.");
      patientItems.forEach(function (item) {
        var nameSpan = item.querySelector(".navi-text");
        if (nameSpan && nameSpan.textContent.trim() === patientName) {
          var spinner = item.querySelector(".spinner-icon");
          if (spinner) {
            // Create the Font Awesome times icon
            var crossIcon = document.createElement("i");
            crossIcon.className = "fas fa-times cross-icon";
            crossIcon.style.marginLeft = "10px";
            crossIcon.style.color = "#F64E60"; // Optional: red color for error

            // Replace spinner with the cross icon
            spinner.replaceWith(crossIcon);
          }

          // Scroll to the patient when there's an error
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      });
      Object.values(sectionClassMap).forEach(function (selector) {
        var container = document.querySelector(selector);
        if (container) {
          container.innerHTML = '';
        }
      });
      socket.disconnect();
    }
  })["catch"](function (err) {
    toastr.error("❌ API call failed: " + err.message);
    console.error("API error:", err);
    patientItems.forEach(function (item) {
      var nameSpan = item.querySelector(".navi-text");
      if (nameSpan && nameSpan.textContent.trim() === patientName) {
        var spinner = item.querySelector(".spinner-icon");
        if (spinner) {
          // Create the Font Awesome times icon
          var crossIcon = document.createElement("i");
          crossIcon.className = "fas fa-times cross-icon";
          crossIcon.style.marginLeft = "10px";
          crossIcon.style.color = "#F64E60"; // Optional: red color for error

          // Replace spinner with the cross icon
          spinner.replaceWith(crossIcon);
        }

        // Scroll to the patient when there's an error
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    });
    socket.disconnect();
  });
};
function injectDsContent(dsContent) {
  var sectionClassMap = {
    "Discharge Condition": ".inside-discharge-condition-container",
    "Discharge Diagnoses": ".inside-discharge-diagnoses-container",
    "Discharge Disposition": ".inside-discharge-disposition-container",
    "Discharge Instructions": ".inside-discharge-instructions-container",
    "Discharge Medications": ".inside-discharge-medications-container",
    "Discharge Summary": ".inside-discharge-summary-container",
    "Follow-up Care": ".inside-followup-care-container",
    "Principal Diagnosis": ".inside-principal-diagnosis-container"
  };
  marked.setOptions({
    breaks: true
  });
  for (var _i8 = 0, _Object$entries6 = Object.entries(sectionClassMap); _i8 < _Object$entries6.length; _i8++) {
    var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i8], 2),
      sectionName = _Object$entries6$_i[0],
      selector = _Object$entries6$_i[1];
    var container = document.querySelector(selector);
    var content = dsContent[sectionName];
    if (container) {
      container.innerHTML = ''; // Clear "Loading..." or old content

      if (content && content.trim() !== '') {
        var formattedText = content.replace(/\n/g, "<br>");
        container.innerHTML = "".concat(formattedText);
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
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch("".concat(BASE_URL, "copy_count"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      click_type: 'copy_all'
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.message) {
      console.log(data.message);
    } else {
      console.error('Error:', data.error);
    }
  })["catch"](function (error) {
    console.error('Request failed:', error);
  });

  // Create one container for all copy content
  var tempDiv = document.createElement('div');

  // Process all data-copy elements EXCEPT those containing inside-plan-section
  var elements = document.querySelectorAll('[data-copy="true"]');
  elements.forEach(function (el, index) {
    // Skip if this element contains an inside-plan-section (we'll process that separately)
    if (el.querySelector('.inside-plan-section')) {
      return;
    }
    var clone = el.cloneNode(true);
    var parent = el.closest('.card-title');
    if (parent) {
      var span = document.createElement('span');
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
    var nextElement = elements[index + 1];
    var nextIsListContainer = nextElement && nextElement.querySelector('ul, ol, li');
    if (parent || !nextIsListContainer && index < elements.length - 1) {
      tempDiv.appendChild(document.createElement('br'));
    }
  });

  // --- Process inside-plan-section ---
  // --- Process inside-plan-section ---
  var container = document.querySelector('.inside-plan-section');
  if (container) {
    var children = Array.from(container.children);
    children.forEach(function (child) {
      // If the child is a <div> and contains <strong>, treat as a section header
      if (child.tagName === 'DIV' && child.querySelector('strong')) {
        var strongDiv = document.createElement('div');
        strongDiv.style.fontWeight = 'bold';
        strongDiv.style.marginTop = '12px';
        strongDiv.innerHTML = child.innerHTML;
        tempDiv.appendChild(strongDiv);
      }

      // If the child is a <ul>, preserve it directly
      else if (child.tagName === 'UL') {
        var ulClone = child.cloneNode(true);
        ulClone.style.paddingLeft = '20px';
        ulClone.querySelectorAll('li').forEach(function (li) {
          li.textContent = li.textContent.replace(/^•\s*/, '');
          li.style.marginTop = '0';
        });
        tempDiv.appendChild(ulClone);
      }

      // If it's a normal text <div>, treat it as a paragraph
      else if (child.tagName === 'DIV' && child.textContent.trim()) {
        var p = document.createElement('div');
        p.textContent = child.textContent.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    });
  }
  // --- Copy to clipboard ---
  document.body.appendChild(tempDiv);
  var range = document.createRange();
  range.selectNodeContents(tempDiv);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    var successful = document.execCommand('copy');
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
  var token = localStorage.getItem('access_token');
  if (!token) {
    // window.location.href = '../index.html';
    // return;
  }
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
  var tempDiv = document.createElement('div');
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.fontSize = '14px';
  var elements = document.querySelectorAll("[data-copy=\"".concat(copyAttrValue, "\"]"));
  var orderedDsSections = ['Principal Diagnosis', 'Discharge Summary', 'Discharge Diagnoses', 'Discharge Medications', 'Discharge Condition', 'Discharge Disposition', 'Discharge Instructions', 'Follow-Up-Care'];
  var orderedHpSections = ['Principal Diagnosis', 'Chief Complaint', 'History of Present Illness', 'Past Medical History', 'Past Surgical History', 'Medications', 'Allergies', 'Family History', 'Social History', 'Review of System', 'Physical Examination', 'Assessment and Plan'];
  var orderedSections = copyAttrValue === 'true-ds' ? orderedDsSections : orderedHpSections;
  orderedSections.forEach(function (sectionTitle) {
    var _matchingEl$closest;
    var matchingEl = Array.from(elements).find(function (el) {
      return el.textContent.trim() === sectionTitle;
    });
    if (!matchingEl) return;
    plainText += "\n".concat(sectionTitle, "\n");
    var titleDiv = document.createElement('div');
    titleDiv.textContent = sectionTitle;
    titleDiv.style.fontWeight = 'bold';
    titleDiv.style.marginTop = '12px';
    titleDiv.style.textDecoration = 'underline';
    tempDiv.appendChild(titleDiv);
    tempDiv.appendChild(document.createElement('br'));
    var contentEl = (_matchingEl$closest = matchingEl.closest('.card')) === null || _matchingEl$closest === void 0 ? void 0 : _matchingEl$closest.querySelector(".card-body div[data-copy=\"".concat(copyAttrValue, "\"]"));
    if (!contentEl) return;
    var children = Array.from(contentEl.children);
    if (children.length === 0) {
      var rawText = contentEl.innerText || contentEl.textContent || '';
      if (rawText.trim()) {
        plainText += rawText.trim() + '\n';
        var p = document.createElement('div');
        p.textContent = rawText.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    } else {
      children.forEach(function (child) {
        var formattedText = child.innerHTML.replace(/\n/g, "<br>");
        plainText += "".concat(formattedText);

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
  function wrapText(text) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '        ';
    var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
    var words = text.split(' ');
    var result = '';
    var line = '';
    var _iterator3 = _createForOfIteratorHelper(words),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var word = _step3.value;
        if ((line + word).length > maxLength) {
          result += indent + line.trim() + '\n';
          line = '';
        }
        line += word + ' ';
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (line) result += indent + line.trim() + '\n';
    return result;
  }

  // Copy to clipboard as rich + plain text
  document.body.appendChild(tempDiv);
  var range = document.createRange();
  range.selectNodeContents(tempDiv);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    var successful = document.execCommand('copy');
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
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch("".concat(BASE_URL, "copy_count"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      click_type: 'copy'
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.message) {
      console.log(data.message);
    } else {
      console.error('Error:', data.error);
    }
  })["catch"](function (error) {
    console.error('Request failed:', error);
  });
  var element = document.getElementById(id);
  if (!element) {
    toastr.warning('Element not found');
    return;
  }
  var planSection = element.querySelector('.inside-plan-section');
  var tempDiv = document.createElement('div');
  if (planSection) {
    var children = Array.from(planSection.children);
    children.forEach(function (child) {
      // If the child is a <div> and contains <strong>, treat as a section header
      if (child.tagName === 'DIV' && child.querySelector('strong')) {
        var strongDiv = document.createElement('div');
        strongDiv.style.fontWeight = 'bold';
        strongDiv.style.marginTop = '12px';
        strongDiv.innerHTML = child.innerHTML;
        tempDiv.appendChild(strongDiv);
      }

      // If the child is a <ul>, preserve it directly
      else if (child.tagName === 'UL') {
        var ulClone = child.cloneNode(true);
        ulClone.style.paddingLeft = '20px';
        ulClone.querySelectorAll('li').forEach(function (li) {
          li.textContent = li.textContent.replace(/^•\s*/, ''); // remove leading bullets
          li.style.marginTop = '0';
        });
        tempDiv.appendChild(ulClone);
      }

      // If it's a normal text <div>, treat it as a paragraph
      else if (child.tagName === 'DIV' && child.textContent.trim()) {
        var p = document.createElement('div');
        p.textContent = child.textContent.trim();
        p.style.marginTop = '8px';
        tempDiv.appendChild(p);
      }
    });
  } else {
    // No special formatting needed, clone entire element
    var clone = element.cloneNode(true); // deep clone
    tempDiv.appendChild(clone);
  }
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px'; // hide off-screen
  document.body.appendChild(tempDiv);

  // Select content
  var range = document.createRange();
  range.selectNodeContents(tempDiv);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    var successful = document.execCommand('copy');
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
  var modalEl = document.getElementById('kt_chat_modal_new');
  var modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  // Cleanup
  document.querySelectorAll('.modal-backdrop').forEach(function (el) {
    return el.remove();
  });
  document.body.classList.remove('modal-open');
  document.body.style = ''; // Reset body styles just in case
}
function deletePatientRecording(patientId, sessionId, state) {
  var token = localStorage.getItem("access_token");
  var response = fetch("".concat(BASE_URL_KINESIS, "delete-recording"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      patient_id: patientId,
      session_id: sessionId
    })
  });
  var pauseIcon = document.querySelector(".pause-icon.".concat(patientId));
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
  var renderPatientRecording = document.querySelector('.render-patient-recording');
  var renderWaveTimer = document.querySelector('.wave-timer');
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
  var pauseIcon = document.querySelector(".pause-icon.".concat(patientId));
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
  var editText = document.getElementById('saveTranscriptEdits');
  editText.disabled = false;
}
function refreshSoapSections(_x25) {
  return _refreshSoapSections.apply(this, arguments);
} // Progress bar :: START
function _refreshSoapSections() {
  _refreshSoapSections = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(patientName) {
    var apiUrl, token, response, data, file_content, summaryDiv, assessmentDiv, planDiv, reviewDiv, phyExamDiv, newObj, key, newKey, diagnosis, diagnosisItems, soap_url, part, crtPatient, _t36;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          apiUrl = "".concat(BASE_URL, "summary/display-patient-jobs-output?patient_name=") + patientName;
          token = localStorage.getItem('access_token');
          _context32.p = 1;
          _context32.n = 2;
          return fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(token)
            }
          });
        case 2:
          response = _context32.v;
          _context32.n = 3;
          return response.json();
        case 3:
          data = _context32.v;
          file_content = data.file_content || {};
          summaryDiv = document.querySelector(".summary-container");
          assessmentDiv = document.querySelector(".assessment-container");
          planDiv = document.querySelector(".assessment-plan-container");
          reviewDiv = document.querySelector(".review-of-system-id");
          phyExamDiv = document.querySelector(".physical-exam-id"); // Normalize keys (replace spaces with underscores)
          newObj = {};
          for (key in file_content) {
            if (file_content.hasOwnProperty(key)) {
              newKey = key.replace(/\s/g, '_');
              newObj[newKey] = file_content[key];
            }
          }

          // --- Clinical Summary ---
          if (!newObj['Clinical_Summary'] || newObj['Clinical_Summary'].trim() === "") {
            summaryDiv.innerHTML = "<p class='text-xs'>No Summary Available</p>";
          } else {
            summaryDiv.innerHTML = "\n        <div class=\"pt-0 inside-summary-section text-xs\">\n          ".concat(newObj['Clinical_Summary'].replace(/\n/g, "<br>"), "\n        </div>");
          }

          // --- Subjective / Interval Events ---
          if (!newObj['Subjective_and_Interval_Events'] || newObj['Subjective_and_Interval_Events'].trim() === "") {
            assessmentDiv.innerHTML = "<p class='text-xs'>No Interval Events Available</p>";
          } else {
            assessmentDiv.innerHTML = "\n        <div class=\"pt-0 inside-assess-section text-xs\">\n          ".concat(newObj['Subjective_and_Interval_Events'].replace(/\n/g, "<br>"), "\n        </div>");
          }

          // --- Assessment & Plan ---
          if (!newObj['Assessment_and_Plan'] || newObj['Assessment_and_Plan'].trim() === "") {
            planDiv.innerHTML = "<p class='text-xs'>No Assessment Plan Available</p>";
          } else {
            planDiv.innerHTML = "\n        <div class=\"pt-0 inside-plan-section text-xs\">\n          ".concat(newObj['Assessment_and_Plan'].replace(/\n/g, "<br>"), "\n        </div>");
          }

          // --- Review of Systems ---
          if (!newObj['Review_of_Systems'] || newObj['Review_of_Systems'].trim() === "") {
            reviewDiv.innerHTML = "<p class='text-xs'>No Review of System Available</p>";
          } else {
            reviewDiv.innerHTML = "\n        <div class=\"pt-0 inside-review-system-section text-xs\">\n          ".concat(newObj['Review_of_Systems'].replace(/\n/g, "<br>"), "\n        </div>");
          }

          // --- Physical Exam ---
          if (!newObj['Physical_Examination'] || newObj['Physical_Examination'].trim() === "") {
            phyExamDiv.innerHTML = "<p class='text-xs'>No Physical Examination Available</p>";
          } else {
            phyExamDiv.innerHTML = "\n        <div class=\"pt-0 inside-physical-exam-section text-xs\">\n          ".concat(newObj['Physical_Examination'].replace(/\n/g, "<br>"), "\n        </div>");
          }

          // --- Diagnosis ---
          diagnosis = newObj['Principal_Diagnosis'] || '● None documented';
          diagnosisItems = document.querySelectorAll('li.navi-item');
          diagnosisItems.forEach(function (item) {
            var nameSpan = item.querySelector('.navi-text.font-semibold');
            var diagnosisSpan = item.querySelector('.navi-text:not(.font-semibold)');
            if (nameSpan && diagnosisSpan && nameSpan.textContent.trim() === patientName) {
              var truncated = diagnosis.length > 35 ? diagnosis.substring(0, 35) + '...' : diagnosis;
              diagnosisSpan.textContent = truncated;
              if (diagnosis.length <= 24) {
                diagnosisSpan.style.marginRight = '40px';
              }
            }
          });
          soap_url = document.getElementById('hd_soap_url').value;
          if (soap_url && soap_url != 'undefined') {
            part = soap_url.split("/")[3];
            crtPatient = part.split("_")[1];
            displayFeedbackDesign(crtPatient);
          }
          _context32.n = 5;
          break;
        case 4:
          _context32.p = 4;
          _t36 = _context32.v;
          console.error("Error refreshing SOAP sections:", _t36);
        case 5:
          return _context32.a(2);
      }
    }, _callee32, null, [[1, 4]]);
  }));
  return _refreshSoapSections.apply(this, arguments);
}
function updateProgressBarOnce(_x26) {
  return _updateProgressBarOnce.apply(this, arguments);
} // Progress bar :: END
// Notes :: start
function _updateProgressBarOnce() {
  _updateProgressBarOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(patientId) {
    var bar, label, token, res, data, _data$, overall_status, pipeline_status, _progressContainer2, patientItems, targetPercent, currentPercent, progressContainer, animate, _t37;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          bar = document.getElementById("patient-progress-bar-".concat(patientId));
          label = document.getElementById("patient-progress-label-".concat(patientId));
          if (!(!bar || !label)) {
            _context33.n = 1;
            break;
          }
          return _context33.a(2);
        case 1:
          _context33.p = 1;
          token = localStorage.getItem("access_token");
          _context33.n = 2;
          return fetch("".concat(BASE_URL, "patient-progress-bar-redis"), {
            headers: {
              "Authorization": "Bearer ".concat(token)
            }
          });
        case 2:
          res = _context33.v;
          _context33.n = 3;
          return res.json();
        case 3:
          data = _context33.v;
          if (!(!res.ok || !Array.isArray(data) || !data.length)) {
            _context33.n = 4;
            break;
          }
          return _context33.a(2);
        case 4:
          _data$ = data[0], overall_status = _data$.overall_status, pipeline_status = _data$.pipeline_status; // 🛑 If failed — no need to calculate or animate anything
          if (!(overall_status === "failed")) {
            _context33.n = 5;
            break;
          }
          // Hide progress bar and label
          bar.style.display = "none";
          label.style.display = "none";
          _progressContainer2 = bar.parentElement;
          if (_progressContainer2) _progressContainer2.style.display = "none";

          // Find the matching patient item and add cross icon
          patientItems = document.querySelectorAll(".navi-item");
          patientItems.forEach(function (item) {
            var nameSpan = item.querySelector(".navi-text");
            if (nameSpan && nameSpan.textContent.trim() === patientName) {
              // Remove any existing cross icons to avoid duplicates
              var existingCross = item.querySelector(".cross-icon");
              if (existingCross) existingCross.remove();

              // Create red cross icon
              var crossIcon = document.createElement("i");
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
          return _context33.a(2);
        case 5:
          targetPercent = 0;
          if ((pipeline_status === null || pipeline_status === void 0 ? void 0 : pipeline_status.transcription) === "in_progress") targetPercent = 10;
          if ((pipeline_status === null || pipeline_status === void 0 ? void 0 : pipeline_status.transcription) === "completed") targetPercent = 25;
          if (overall_status === "completed" || (pipeline_status === null || pipeline_status === void 0 ? void 0 : pipeline_status.transcription) === "completed" && (pipeline_status === null || pipeline_status === void 0 ? void 0 : pipeline_status.analysis) === "completed" && (pipeline_status === null || pipeline_status === void 0 ? void 0 : pipeline_status.job_generation) === "completed") {
            targetPercent = 100;
          }
          currentPercent = parseInt(bar.style.width) || 0;
          progressContainer = bar.parentElement;
          if (progressContainer) {
            progressContainer.style.display = "flex";
          }
          bar.style.display = "flex";
          if (label) label.style.display = "inline";

          // Smooth increase animation
          animate = setInterval(function () {
            if (currentPercent < targetPercent) {
              currentPercent++;
              bar.style.width = "".concat(currentPercent, "%");
              if (label) label.textContent = "".concat(currentPercent, "%");
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
          _context33.n = 7;
          break;
        case 6:
          _context33.p = 6;
          _t37 = _context33.v;
          console.error("Progress fetch error:", _t37);
        case 7:
          return _context33.a(2);
      }
    }, _callee33, null, [[1, 6]]);
  }));
  return _updateProgressBarOnce.apply(this, arguments);
}
document.addEventListener("DOMContentLoaded", function () {
  var token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  var summaryContainer = document.getElementById('summary-container');
  var assessContainer = document.getElementById('assessment-container');
  var assessPlanContainer = document.getElementById('assessment-plan-container');
  var reviewofSystemContainer = document.getElementById('review-of-system-id');
  var phyExamContainer = document.getElementById('physical-exam-id');
  var dictatedBtn = document.getElementById("tab_pastAdmission");
  var uploadedBtn = document.getElementById("tab_encounter");
  // const enableBtn = document.getElementById("tab_enable");
  var textarea = document.getElementById("upload_textarea");
  var errorMsg = document.getElementById("tab_error");
  var submitBtn = document.getElementById("upload_submit");
  var drawerEl = document.getElementById("drawer_end");
  var closeBtn = document.getElementById("upload_close");
  var selectedTab = null;
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
  document.getElementById("open_upload_drawer").addEventListener("click", resetDrawerForm);

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
  dictatedBtn.onclick = function () {
    // if (!tabsEnabled) return;

    resetButtons();
    dictatedBtn.classList.remove("bg-white");
    dictatedBtn.classList.add("bg-[#dbeeff]");
    selectedTab = "past_admission";
    errorMsg.classList.add("hidden");
  };
  uploadedBtn.onclick = function () {
    // if (!tabsEnabled) return;

    resetButtons();
    uploadedBtn.classList.remove("bg-white");
    uploadedBtn.classList.add("bg-[#dbeeff]");
    selectedTab = "current_encounter";
    errorMsg.classList.add("hidden");
  };
  textarea.addEventListener("focus", function (e) {
    if (!selectedTab) {
      e.preventDefault();
      textarea.blur();
      errorMsg.classList.remove("hidden");
    }
  });
  closeBtn.addEventListener("click", function () {
    var drawer = KTDrawer.getInstance(drawerEl);
    if (drawer) drawer.hide();
  });

  // 🔹 Submit button
  submitBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
    var _patientName, noteContext, content, drawer, socket, patientItems, selectedItem, payload, response, result, part, patientId, spinner, tick, _spinner, _patientName2, _patientItems, _t19;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _patientName = document.getElementById("addModalPatientName").textContent.trim();
          noteContext = selectedTab;
          content = textarea.value.trim();
          if (noteContext) {
            _context21.n = 1;
            break;
          }
          toastr.warning("Select one context");
          errorMsg.classList.remove("hidden");
          return _context21.a(2);
        case 1:
          if (content) {
            _context21.n = 2;
            break;
          }
          toastr.warning("Enter some content.");
          return _context21.a(2);
        case 2:
          drawer = KTDrawer.getInstance(drawerEl);
          if (drawer) drawer.hide();

          // 🔹 Create socket connection RIGHT AWAY (before fetch)
          socket = io("".concat(BASE_URL), {
            transports: ['websocket', 'polling'],
            reconnection: true,
            auth: {
              token: token
            }
          });
          socket.on("connect", function () {
            console.log("✅ WebSocket connected:");
          });
          socket.on("connect_error", function (err) {
            console.error("❌ WebSocket connection error:", err);
          });
          socket.on("soap_generated", function (data) {
            if (data.patient_name === _patientName) {
              var fileContent = data.content;
              if (fileContent) {
                if (fileContent['Clinical Summary']) {
                  summaryContainer.innerHTML = "<div class=\"pt-0 inside-summary-section\" style=\"font-size: 12px;\">".concat(fileContent['Clinical Summary'].replace(/\n/g, "<br>"), "</div>");
                }
                if (fileContent['Subjective and Interval Events']) {
                  assessContainer.innerHTML = "<div class=\"pt-0 inside-assess-section\" style=\"font-size: 12px;\">".concat(fileContent['Subjective and Interval Events'].replace(/\n/g, "<br>"), "</div>");
                }
                if (fileContent['Review of Systems']) {
                  reviewofSystemContainer.innerHTML = "<div class=\"pt-0 inside-review-system-section\" style=\"font-size: 12px;\">".concat(fileContent['Review of Systems'].replace(/\n/g, "<br>"), "</div>");
                }
                if (fileContent['Physical Examination']) {
                  phyExamContainer.innerHTML = "<div class=\"pt-0 inside-physical-exam-section\" style=\"font-size: 12px;\">".concat(fileContent['Physical Examination'].replace(/\n/g, "<br>"), "</div>");
                }
                if (fileContent['Assessment and Plan']) {
                  assessPlanContainer.innerHTML = "<div class=\"pt-0 inside-plan-section\" style=\"font-size: 12px;\">".concat(fileContent['Assessment and Plan'].replace(/\n/g, "<br>"), "</div>");
                }
              }
              loadSutureFix(_patientName);
            }
          });
          socket.on("transcription_failed", function (data) {
            if (data.user === urlUserName) {
              console.error("Transcription failed:", data.error);
              toastr.error("Transcription failed: " + data.error);
            }
          });

          // 🔹 Spinner/tick logic stays here ✅
          patientItems = document.querySelectorAll(".navi-item");
          selectedItem = null;
          patientItems.forEach(function (item) {
            var nameSpan = item.querySelector(".navi-text");
            var nameSpinner = item.querySelector(".navi-spinner");
            if (nameSpan && nameSpan.textContent.trim() === _patientName) {
              selectedItem = item; // Store the selected item for later scrolling

              // ✅ Always remove tick and spinner first
              var existingTick = item.querySelector(".tick-icon");
              if (existingTick) existingTick.remove();
              var existingSpinner = item.querySelector(".spinner-icon");
              if (existingSpinner) existingSpinner.remove();
              var spinner = document.createElement("i");
              spinner.className = "ki-filled ki-arrows-circle spinner-icon animate-spin rounded-full -ml-2";
              spinner.style.color = "#0b6fac";
              if (nameSpinner) {
                nameSpinner.parentNode.appendChild(spinner);
              }
            }
          });

          // 🔹 Continue with fetch request
          payload = {
            patient_name: _patientName,
            upload_context: noteContext,
            content: content
          };
          _context21.n = 3;
          return fetch("".concat(window.BASE_URL, "ondemand/upload-note-manually"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': "Bearer ".concat(token)
            },
            body: JSON.stringify(payload)
          });
        case 3:
          response = _context21.v;
          _context21.n = 4;
          return response.json();
        case 4:
          result = _context21.v;
          if (response.ok) {
            toastr.success(result.message || "Content saved successfully!");
            part = result.master_s3_url.split("/")[3];
            patientId = part.split("_")[1];
            checkSoapNotification(patientId, token);
            loadUploads(_patientName, 'unarchived');
            if (selectedItem) {
              spinner = selectedItem.querySelector(".spinner-icon");
              if (spinner) {
                tick = document.createElement("i");
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
              _spinner = selectedItem.querySelector(".spinner-icon");
              if (_spinner) _spinner.remove();
            }
          }
          _context21.n = 6;
          break;
        case 5:
          _context21.p = 5;
          _t19 = _context21.v;
          console.error("Error submitting note:", _t19);
          _patientName2 = document.getElementById("addModalPatientName").innerText.trim();
          _patientItems = document.querySelectorAll(".navi-item");
          _patientItems.forEach(function (item) {
            var nameSpan = item.querySelector(".navi-text");
            if (nameSpan && nameSpan.textContent.trim() === _patientName2) {
              var _spinner2 = item.querySelector(".spinner-icon");
              if (_spinner2) _spinner2.remove();
            }
          });
        case 6:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 5]]);
  })));
});
function addExternalCounts(clickType) {
  var token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }
  fetch("".concat(BASE_URL, "copy_count"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    },
    body: JSON.stringify({
      click_type: clickType
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.message) {
      console.log(data.message);
    } else {
      console.error('Error:', data.error);
    }
  })["catch"](function (error) {
    console.error('Request failed:', error);
  });
}
window.updateLikeAndDisLike = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(currentPatient, feedbackType, currentId) {
    var currentNoteTypeElement, selectedTab, responseUrl, responseType, card, token, part, crtPatient, accordionItem, titleToggle, titleSpan, title, payload, icons, response, data, result, response_data, ratings, ratingValue, upIcon, downIcon;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.n) {
        case 0:
          currentNoteTypeElement = document.getElementById('currentNoteType');
          selectedTab = (currentNoteTypeElement === null || currentNoteTypeElement === void 0 ? void 0 : currentNoteTypeElement.textContent.trim()) || 'SOAP';
          responseUrl = "";
          responseType = "";
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
          if (!(!currentPatient || !responseUrl || !responseType || responseUrl === 'undefined')) {
            _context22.n = 1;
            break;
          }
          toastr.warning("There is no record for this patient");
          return _context22.a(2);
        case 1:
          card = document.querySelector(".".concat(currentId)).closest('.kt-accordion-content');
          token = localStorage.getItem('access_token');
          if (!(card && responseUrl != 'undefined')) {
            _context22.n = 8;
            break;
          }
          part = responseUrl.split("/")[3];
          crtPatient = part.split("_")[1];
          accordionItem = card.parentElement;
          titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
          titleSpan = titleToggle ? titleToggle.querySelector('span') : null;
          title = titleSpan ? titleSpan.textContent.trim() : '';
          if (!titleSpan) {
            _context22.n = 8;
            break;
          }
          payload = {
            patient_id: crtPatient,
            response_type: responseType,
            response_url: responseUrl,
            fields: _defineProperty({}, title, _defineProperty({}, feedbackType, true))
          }; // clear active icons
          icons = card.querySelectorAll('.thumb-up, .thumb-down');
          icons.forEach(function (icon) {
            return icon.classList.remove('active');
          });
          _context22.n = 2;
          return fetch("".concat(BASE_URL, "summary/user_rating"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            },
            body: JSON.stringify(payload)
          });
        case 2:
          response = _context22.v;
          _context22.n = 3;
          return response.json();
        case 3:
          data = _context22.v;
          if (!data) {
            _context22.n = 7;
            break;
          }
          _context22.n = 4;
          return fetch("".concat(BASE_URL, "summary/display_user_rating?patient_id=").concat(crtPatient, "&response_type=").concat(responseType, "&response_url=").concat(responseUrl), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 4:
          result = _context22.v;
          if (!result.ok) {
            _context22.n = 6;
            break;
          }
          _context22.n = 5;
          return result.json();
        case 5:
          response_data = _context22.v;
          if (response_data.user_ratings && response_data.user_ratings.length > 0) {
            ratings = response_data.user_ratings[0].good_bad;
            ratingValue = ratings[title]; // set active based on API response
            if (ratingValue === "good") {
              upIcon = card.querySelector('.thumb-up');
              if (upIcon) upIcon.classList.add('active');
            } else if (ratingValue === "bad") {
              downIcon = card.querySelector('.thumb-down');
              if (downIcon) downIcon.classList.add('active');
            }
          }
        case 6:
          _context22.n = 8;
          break;
        case 7:
          toastr.warning("There is no record for this patient");
          return _context22.a(2);
        case 8:
          return _context22.a(2);
      }
    }, _callee22);
  }));
  return function (_x27, _x28, _x29) {
    return _ref27.apply(this, arguments);
  };
}();
var currentPatientId = null;
var currentCardId = null;
window.openCommentModal = function (currentPatient, cardId) {
  // Store the current patient and card ID for later use
  currentPatientId = currentPatient;
  currentCardId = cardId;

  // Reset the form
  var commentText = document.getElementById('commentText');
  var commentError = document.getElementById('commentError');
  if (commentText) commentText.value = "";
  if (commentError) commentError.style.display = "none";

  // Show the KT modal using the same pattern as showPatientModal
  var modalEl = document.getElementById('commentModal');
  if (modalEl) {
    // Get existing modal instance or create new one
    var modal = KTModal.getInstance(modalEl);
    if (!modal) {
      // Initialize the modal if it's not already initialized
      modal = new KTModal(modalEl);
    }

    // Show the modal
    modal.show();

    // Focus on textarea for better UX
    setTimeout(function () {
      if (commentText) {
        commentText.focus();
      }
    }, 100);
  }
};

// Save comment button event listener
var saveCommentBtn = document.getElementById('saveCommentBtn');
if (saveCommentBtn) {
  saveCommentBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
    var _currentNoteTypeEleme;
    var commentText, errorEl, comment, currentNoteTypeElement, selectedTab, responseUrl, responseType, hdSoapUrl, hdHpUrl, hdDsUrl, modalEl, modal, crtPatient, urlParts, patientPart, parts, _iterator4, _step4, part, title, card, cardElement, accordionItem, titleToggle, titleSpan, payload, token, response, data, _modalEl, _modal, result, responseData, ratings, ratingValue, upIcon, downIcon, _t20, _t21, _t22, _t23, _t24;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          commentText = document.getElementById("commentText");
          errorEl = document.getElementById("commentError");
          if (commentText) {
            _context23.n = 1;
            break;
          }
          console.error("Comment textarea not found");
          return _context23.a(2);
        case 1:
          comment = commentText.value.trim();
          if (comment) {
            _context23.n = 2;
            break;
          }
          if (errorEl) {
            errorEl.style.display = "block"; // show error
          }
          return _context23.a(2);
        case 2:
          if (errorEl) {
            errorEl.style.display = "none"; // hide error
          }
          currentNoteTypeElement = document.getElementById('currentNoteType');
          selectedTab = (currentNoteTypeElement === null || currentNoteTypeElement === void 0 || (_currentNoteTypeEleme = currentNoteTypeElement.textContent) === null || _currentNoteTypeEleme === void 0 ? void 0 : _currentNoteTypeEleme.trim()) || 'SOAP';
          responseUrl = "";
          responseType = "";
          if (selectedTab === 'SOAP') {
            hdSoapUrl = document.getElementById('hd_soap_url');
            responseUrl = hdSoapUrl ? hdSoapUrl.value : "";
            responseType = 'SOAP';
          } else if (selectedTab === 'H&P') {
            hdHpUrl = document.getElementById('hd_hp_url');
            responseUrl = hdHpUrl ? hdHpUrl.value : "";
            responseType = 'HP';
          } else if (selectedTab === 'Discharge') {
            hdDsUrl = document.getElementById('hd_ds_url');
            responseUrl = hdDsUrl ? hdDsUrl.value : "";
            responseType = 'DS';
          }

          // Validate response URL
          if (!(!responseUrl || !responseType || responseUrl === 'undefined' || responseUrl === 'null')) {
            _context23.n = 3;
            break;
          }
          toastr.warning("There is no record for this patient");

          // Close KT modal properly
          modalEl = document.getElementById('commentModal');
          if (modalEl) {
            modal = KTModal.getInstance(modalEl);
            if (modal) {
              modal.hide();
            }
          }
          return _context23.a(2);
        case 3:
          // Parse patient ID from response URL
          crtPatient = null;
          _context23.p = 4;
          // Assuming responseUrl format like: /something/patient_123/...
          urlParts = responseUrl.split("/");
          patientPart = urlParts.find(function (part) {
            return part.includes("patient_");
          });
          if (!patientPart) {
            _context23.n = 5;
            break;
          }
          crtPatient = patientPart.split("_")[1];
          _context23.n = 12;
          break;
        case 5:
          // Fallback: try to extract from the URL structure
          parts = responseUrl.split("/");
          if (!(parts.length > 1)) {
            _context23.n = 12;
            break;
          }
          // Try to get patient ID from the path
          _iterator4 = _createForOfIteratorHelper(parts);
          _context23.p = 6;
          _iterator4.s();
        case 7:
          if ((_step4 = _iterator4.n()).done) {
            _context23.n = 9;
            break;
          }
          part = _step4.value;
          if (!part.startsWith("patient_")) {
            _context23.n = 8;
            break;
          }
          crtPatient = part.split("_")[1];
          return _context23.a(3, 9);
        case 8:
          _context23.n = 7;
          break;
        case 9:
          _context23.n = 11;
          break;
        case 10:
          _context23.p = 10;
          _t20 = _context23.v;
          _iterator4.e(_t20);
        case 11:
          _context23.p = 11;
          _iterator4.f();
          return _context23.f(11);
        case 12:
          _context23.n = 14;
          break;
        case 13:
          _context23.p = 13;
          _t21 = _context23.v;
          console.error("Error parsing patient ID:", _t21);
          toastr.error("Error parsing patient information");
          return _context23.a(2);
        case 14:
          if (crtPatient) {
            _context23.n = 15;
            break;
          }
          toastr.error("Could not determine patient ID from the URL");
          return _context23.a(2);
        case 15:
          // Get the card element
          title = '';
          card = null;
          if (currentCardId) {
            cardElement = document.querySelector(".".concat(currentCardId));
            if (cardElement) {
              card = cardElement.closest('.kt-accordion-content');
              if (card) {
                accordionItem = card.parentElement;
                if (accordionItem) {
                  titleToggle = accordionItem.querySelector('.kt-accordion-toggle');
                  if (titleToggle) {
                    titleSpan = titleToggle.querySelector('span');
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
          payload = {
            patient_id: crtPatient,
            response_type: responseType,
            response_url: responseUrl,
            fields: _defineProperty({}, title, {
              comment: comment
            })
          };
          token = localStorage.getItem('access_token');
          if (token) {
            _context23.n = 16;
            break;
          }
          toastr.error("Authentication required. Please log in again.");
          return _context23.a(2);
        case 16:
          _context23.p = 16;
          _context23.n = 17;
          return fetch("".concat(BASE_URL, "summary/user_rating"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            },
            body: JSON.stringify(payload)
          });
        case 17:
          response = _context23.v;
          if (!response.ok) {
            _context23.n = 28;
            break;
          }
          data = null;
          _context23.p = 18;
          _context23.n = 19;
          return response.json();
        case 19:
          data = _context23.v;
          _context23.n = 21;
          break;
        case 20:
          _context23.p = 20;
          _t22 = _context23.v;
          console.warn("Response was OK but not valid JSON");
        case 21:
          toastr.success("Comment saved successfully!");

          // Close KT modal properly
          _modalEl = document.getElementById('commentModal');
          if (_modalEl) {
            _modal = KTModal.getInstance(_modalEl);
            if (_modal) {
              _modal.hide();
            }
          }

          // Clear textarea
          if (commentText) {
            commentText.value = '';
          }

          // Fetch updated ratings if data is available
          if (!(data || true)) // removed by dead control flow
{}
          _context23.p = 22;
          _context23.n = 23;
          return fetch("".concat(BASE_URL, "summary/display_user_rating?patient_id=").concat(crtPatient, "&response_type=").concat(responseType, "&response_url=").concat(encodeURIComponent(responseUrl)), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 23:
          result = _context23.v;
          if (!result.ok) {
            _context23.n = 25;
            break;
          }
          _context23.n = 24;
          return result.json();
        case 24:
          responseData = _context23.v;
          if (responseData.user_ratings && responseData.user_ratings.length > 0) {
            ratings = responseData.user_ratings[0].good_bad;
            ratingValue = ratings[title]; // Update UI if card element exists
            if (card) {
              // Remove existing active classes first
              upIcon = card.querySelector('.thumb-up');
              downIcon = card.querySelector('.thumb-down');
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
        case 25:
          _context23.n = 27;
          break;
        case 26:
          _context23.p = 26;
          _t23 = _context23.v;
          console.error("Error fetching updated ratings:", _t23);
          // Don't show error toast for this - it's a secondary action
        case 27:
          _context23.n = 29;
          break;
        case 28:
          console.error("Failed to save comment. Status:", response.status);
          toastr.error("Failed to save comment. Please try again.");
        case 29:
          _context23.n = 31;
          break;
        case 30:
          _context23.p = 30;
          _t24 = _context23.v;
          console.error("Error saving comment:", _t24);
          toastr.error("An error occurred while saving the comment.");
        case 31:
          return _context23.a(2);
      }
    }, _callee23, null, [[22, 26], [18, 20], [16, 30], [6, 10, 11, 12], [4, 13]]);
  })));
}
function checkSoapNotification(_x30, _x31) {
  return _checkSoapNotification.apply(this, arguments);
}
function _checkSoapNotification() {
  _checkSoapNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(patientId, token) {
    var soap_notes, soap_response, allNavLinks, soapTab, soapButton, oldDot, oldBtnDot, tabDot, btnDot, _t38;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          _context34.p = 0;
          _context34.n = 1;
          return fetch("".concat(BASE_URL, "ondemand/pending-soap-notes?patient_id=").concat(patientId), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }
          });
        case 1:
          soap_notes = _context34.v;
          if (soap_notes.ok) {
            _context34.n = 2;
            break;
          }
          return _context34.a(2);
        case 2:
          _context34.n = 3;
          return soap_notes.json();
        case 3:
          soap_response = _context34.v;
          // --- Find SOAP Tab (by text) ---
          allNavLinks = document.querySelectorAll('#navTabsDropdown .nav-link');
          soapTab = null;
          allNavLinks.forEach(function (link) {
            var textEl = link.querySelector('.nav-text');
            if (textEl && textEl.textContent.trim() === 'SOAP') {
              soapTab = link;
            }
          });

          // --- Button reference ---
          soapButton = document.getElementById('onDemandSummaryCall'); // --- Remove existing dots ---
          if (soapTab) {
            oldDot = soapTab.querySelector('.notification-dot');
            if (oldDot) oldDot.remove();
          }
          if (soapButton) {
            oldBtnDot = soapButton.querySelector('.notification-dot');
            if (oldBtnDot) oldBtnDot.remove();
          }

          // --- Add new dots if needed ---
          if (soap_response.needs_soap === true) {
            if (soapTab) {
              tabDot = document.createElement('span');
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
              btnDot = document.createElement('span');
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
          _context34.n = 5;
          break;
        case 4:
          _context34.p = 4;
          _t38 = _context34.v;
          console.error("SOAP notification check failed:", _t38);
        case 5:
          return _context34.a(2);
      }
    }, _callee34, null, [[0, 4]]);
  }));
  return _checkSoapNotification.apply(this, arguments);
}
function copyAllTimestamp(sectionId) {
  var container = document.getElementById(sectionId);
  if (!container) {
    toastr.warning('No content found to copy!');
    return;
  }
  var allText = "";
  var children = container.children;
  var block = [];
  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    // Timestamps / Notes Date / Notes Type
    if (child.classList.contains("timestamp-section")) {
      block.push(child.innerText.trim());
    }

    // Main note content
    if (child.classList.contains("editable-section")) {
      var _child$querySelector;
      var noteText = ((_child$querySelector = child.querySelector(".display-text")) === null || _child$querySelector === void 0 ? void 0 : _child$querySelector.innerText.trim()) || "";
      block.push(noteText);

      // End of one block
      allText += block.join("\n") + "\n\n";
      block = []; // reset for next block
    }
  }
  allText = allText.trim();
  if (allText) {
    navigator.clipboard.writeText(allText).then(function () {
      return toastr.success('Plain text copied to clipboard!');
    }, function (err) {
      return console.error("Failed to copy: ", err);
    });
  } else {
    alert("No text available to copy.");
  }
}

// patient list dropdown :: start
var currentFilter = 'active';
var patientCounts = {
  active: 0,
  archive: 0,
  pending: 0
};
function setButtonState(buttonId, isDisabled, opacity) {
  var button = document.getElementById(buttonId);
  if (button) {
    button.disabled = isDisabled;
    button.style.opacity = opacity;
  }
}

// Function to update which suture button is visible
function updateVisibleSutureButton(noteType) {
  var _document$getElementB, _document$getElementB2, _document$getElementB3;
  // Hide all suture buttons
  document.querySelectorAll('.suture-btn').forEach(function (btn) {
    btn.classList.add('hidden');
  });

  // Show the correct button based on note type
  switch (noteType) {
    case 'SOAP':
      (_document$getElementB = document.getElementById('onDemandSummaryCall')) === null || _document$getElementB === void 0 || _document$getElementB.classList.remove('hidden');
      break;
    case 'H&P':
      (_document$getElementB2 = document.getElementById('onDemandHpCall')) === null || _document$getElementB2 === void 0 || _document$getElementB2.classList.remove('hidden');
      break;
    case 'Discharge':
      (_document$getElementB3 = document.getElementById('onDemandDsCall')) === null || _document$getElementB3 === void 0 || _document$getElementB3.classList.remove('hidden');
      break;
  }
}
function hideAllFeedback() {
  document.querySelectorAll('.thumb-up, .thumb-down, .comment').forEach(function (icon) {
    icon.style.display = 'none';
  });
}
function showAllFeedback() {
  document.querySelectorAll('.thumb-up, .thumb-down, .comment').forEach(function (icon) {
    icon.style.display = 'block';
  });
}
function updateButtonStates() {
  // Get current filter
  var currentFilterElement = document.getElementById('currentFilter');
  var currentFilterText = (currentFilterElement === null || currentFilterElement === void 0 ? void 0 : currentFilterElement.textContent.trim()) || 'Active';

  // Get current note type
  var currentNoteTypeElement = document.getElementById('currentNoteType');
  var currentNoteType = (currentNoteTypeElement === null || currentNoteTypeElement === void 0 ? void 0 : currentNoteTypeElement.textContent.trim()) || 'SOAP';

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
  var copyAllButton = document.getElementById("dropdownMenuButton");
  if (!copyAllButton) return;
  switch (noteType) {
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
  var dropdownBtn = document.getElementById("noteTypeButton");
  var dropdown = document.getElementById("navTabsDropdown");
  var navLinks = document.querySelectorAll('#navTabsDropdown .nav-linkDropdown');

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
  var patientDetails = document.querySelector('.overall-patient-details');
  var patientHpDetails = document.querySelector('.overall-handp-details');
  var patientDsDetails = document.querySelector('.overall-discharges-details');
  if (patientDetails) patientDetails.style.display = 'block';
  if (patientHpDetails) patientHpDetails.style.display = 'none';
  if (patientDsDetails) patientDsDetails.style.display = 'none';
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Remove active classes from all links
      navLinks.forEach(function (nav) {
        nav.classList.remove("active", "bg-light-secondary");
        nav.classList.remove("bg-[rgb(240,248,255)]", "font-semibold", "text-color");
      });

      // Add active classes to clicked link
      this.classList.add("active", "bg-light-secondary");
      this.classList.add("bg-[rgb(240,248,255)]", "font-semibold", "text-color");

      // Get the selected tab value and update button text
      var selectedTab = this.getAttribute('data-value');
      document.getElementById("currentNoteType").textContent = selectedTab;

      // Hide dropdown after selection
      dropdown.classList.add("hidden");

      // Update copy button
      updateCopyButton(selectedTab);

      // Get other elements
      var patientDetails = document.querySelector('.overall-patient-details');
      var patientHpDetails = document.querySelector('.overall-handp-details');
      var patientDsDetails = document.querySelector('.overall-discharges-details');
      var rawPatientDetails = document.querySelector('.overall-raw-transcription-system');
      var patientUploadDetails = document.querySelector('.overall-uploads-system');
      var patientSuturePhraseDetails = document.querySelector('.overall-suturephrase-system');

      // Handle display logic for different tabs
      if (selectedTab === 'SOAP') {
        var currentFilterElement = document.getElementById('currentFilter');
        var currentFilterText = (currentFilterElement === null || currentFilterElement === void 0 ? void 0 : currentFilterElement.textContent.trim()) || 'Active';

        // if (typeof refreshSoapSections === 'function' && selectedPatientName && currentFilterText === 'Active') {
        //     refreshSoapSections(selectedPatientName);
        // }
        if (patientDetails) patientDetails.style.display = 'block';
        if (patientHpDetails) patientHpDetails.style.display = 'none';
        if (patientDsDetails) patientDsDetails.style.display = 'none';
        if (patientUploadDetails) patientUploadDetails.style.display = 'none';
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
        if (rawPatientDetails) rawPatientDetails.style.display = 'none';
      } else if (selectedTab === 'H&P') {
        if (patientHpDetails) patientHpDetails.style.display = 'block';
        if (patientDetails) patientDetails.style.display = 'none';
        if (patientDsDetails) patientDsDetails.style.display = 'none';
        if (patientUploadDetails) patientUploadDetails.style.display = 'none';
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
        if (rawPatientDetails) rawPatientDetails.style.display = 'none';
      } else if (selectedTab === 'Discharge') {
        if (patientDsDetails) patientDsDetails.style.display = 'block';
        if (patientDetails) patientDetails.style.display = 'none';
        if (patientHpDetails) patientHpDetails.style.display = 'none';
        if (patientUploadDetails) patientUploadDetails.style.display = 'none';
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
        if (rawPatientDetails) rawPatientDetails.style.display = 'none';
      } else if (selectedTab === 'Transcript') {
        if (rawPatientDetails) rawPatientDetails.style.display = 'block';
        if (patientDetails) patientDetails.style.display = 'none';
        if (patientHpDetails) patientHpDetails.style.display = 'none';
        if (patientDsDetails) patientDsDetails.style.display = 'none';
        if (patientUploadDetails) patientUploadDetails.style.display = 'none';
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
      } else if (selectedTab === 'Uploads') {
        if (patientUploadDetails) patientUploadDetails.style.display = 'block';
        if (rawPatientDetails) rawPatientDetails.style.display = 'none';
        if (patientDetails) patientDetails.style.display = 'none';
        if (patientHpDetails) patientHpDetails.style.display = 'none';
        if (patientDsDetails) patientDsDetails.style.display = 'none';
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'none';
      } else if (selectedTab === 'Suture Phrase') {
        if (patientSuturePhraseDetails) patientSuturePhraseDetails.style.display = 'block';
        if (patientDetails) patientDetails.style.display = 'none';
        if (patientHpDetails) patientHpDetails.style.display = 'none';
        if (rawPatientDetails) rawPatientDetails.style.display = 'none';
        if (patientUploadDetails) patientUploadDetails.style.display = 'none';
        if (patientDsDetails) patientDsDetails.style.display = 'none';
      } else {
        if (patientDetails) patientDetails.style.display = 'none';
      }

      // Update button states after changing note type
      updateButtonStates();
    });
  });
});
function initializePatientSummary() {
  // Check if required elements exist before proceeding
  var dropdownButton = document.getElementById('filterDropdownButton');
  var dropdownMenu = document.getElementById('filterDropdown');
  if (!dropdownButton || !dropdownMenu) {
    console.error('Required DOM elements not found');
    return;
  }
  var active_url = "".concat(window.BASE_URL, "patient-name-list");
  // fetchPatientList(active_url);
  showPatientList('active');

  // Initialize dropdown with active state and count
  updateDropdownSelection('active');

  // Dropdown toggle functionality
  dropdownButton.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function () {
    dropdownMenu.classList.add('hidden');
  });

  // Filter option selection
  var filterOptions = document.querySelectorAll('.filter-option');
  filterOptions.forEach(function (option) {
    option.addEventListener('click', function (e) {
      e.preventDefault();
      var filter = this.getAttribute('data-filter');
      currentFilter = filter;

      // Update dropdown selection visually with count
      updateDropdownSelection(filter);

      // Call appropriate function based on filter
      if (filter === 'active') {
        var url = "".concat(window.BASE_URL, "patient-name-list");
        fetchPatientList(url);
        showPatientList('active');
      } else if (filter === 'archive') {
        var _url2 = "".concat(window.BASE_URL, "get-archived-patients");
        fetchArchivedPatientList(_url2);
        showPatientList('archive');
      }
      setTimeout(updateButtonStates, 100);
      dropdownMenu.classList.add('hidden');
    });
  });
}
function updateDropdownSelection(filter) {
  var currentFilterElement = document.getElementById('currentFilter');
  var filterOptions = document.querySelectorAll('.filter-option');

  // Get the count for the selected filter
  var count = patientCounts[filter] || 0;

  // Update dropdown button text with count
  if (currentFilterElement) {
    if (filter === 'active') {
      currentFilterElement.textContent = "Active";
    } else if (filter === 'archive') {
      currentFilterElement.textContent = "Archived";
    }
  }

  // Update active state in dropdown
  filterOptions.forEach(function (option) {
    var optionFilter = option.getAttribute('data-filter');
    var icon = option.querySelector('i');
    var text = option.querySelector('span:last-child');
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
  var patientItems = document.querySelectorAll('.patient-item');
  patientItems.forEach(function (item) {
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
  var activeCountElement = document.getElementById('activePatientCount');
  var archiveCountElement = document.getElementById('archivePatientCount');
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
  var currentFilterElement = document.getElementById('currentFilter');
  if (!currentFilterElement) return;
  var count = patientCounts[currentFilter] || 0;
  if (currentFilter === 'active') {
    currentFilterElement.textContent = "Active";
  } else if (currentFilter === 'archive') {
    currentFilterElement.textContent = "Archived";
  }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize with a small delay to ensure all elements are loaded
  setTimeout(function () {
    initializePatientSummary();
    updateButtonStates(); // Add this line
  }, 100);

  // Fetch initial patient counts
  if (typeof fetchPatientCounts === 'function') {
    fetchPatientCounts();
  }
});
// patient list dropdown :: end
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});