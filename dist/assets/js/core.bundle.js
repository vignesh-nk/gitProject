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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@keenthemes/ktui/src/components/component.ts":
/*!*******************************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/components/component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var data_1 = __webpack_require__(/*! ../helpers/data */ "./node_modules/@keenthemes/ktui/src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../helpers/dom */ "./node_modules/@keenthemes/ktui/src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./node_modules/@keenthemes/ktui/src/helpers/utils.ts");
var KTComponent = /** @class */ (function () {
    function KTComponent() {
        this._dataOptionPrefix = 'kt-';
        this._uid = null;
        this._element = null;
    }
    KTComponent.prototype._init = function (element) {
        element = dom_1.default.getElement(element);
        if (!element) {
            return;
        }
        this._element = element;
        this._events = new Map();
        this._uid = utils_1.default.geUID(this._name);
        this._element.setAttribute("data-kt-".concat(this._name, "-initialized"), 'true');
        data_1.default.set(this._element, this._name, this);
    };
    KTComponent.prototype._fireEvent = function (eventType_1) {
        return __awaiter(this, arguments, Promise, function (eventType, payload) {
            var callbacks;
            if (payload === void 0) { payload = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callbacks = this._events.get(eventType);
                        if ((callbacks instanceof Map) == false) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all(Array.from(callbacks.values()).filter(function (callable) {
                                return typeof callable === 'function';
                            }).map(function (callable) {
                                return Promise.resolve(callable(payload));
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KTComponent.prototype._dispatchEvent = function (eventType, payload) {
        if (payload === void 0) { payload = null; }
        var event = new CustomEvent(eventType, {
            detail: { payload: payload },
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        if (!this._element)
            return;
        this._element.dispatchEvent(event);
    };
    KTComponent.prototype._getOption = function (name) {
        var value = this._config[name];
        var reponsiveValue = dom_1.default.getCssProp(this._element, "--kt-".concat(this._name, "-").concat(utils_1.default.camelReverseCase(name)));
        return reponsiveValue || value;
    };
    KTComponent.prototype._getGlobalConfig = function () {
        if (window.KTGlobalComponentsConfig &&
            window.KTGlobalComponentsConfig[this._name]) {
            return window.KTGlobalComponentsConfig[this._name];
        }
        else {
            return {};
        }
    };
    KTComponent.prototype._buildConfig = function (config) {
        if (config === void 0) { config = {}; }
        if (!this._element)
            return;
        this._config = __assign(__assign(__assign(__assign({}, this._defaultConfig), this._getGlobalConfig()), dom_1.default.getDataAttributes(this._element, this._dataOptionPrefix + this._name)), config);
    };
    KTComponent.prototype.dispose = function () {
        if (!this._element)
            return;
        this._element.removeAttribute("data-kt-".concat(this._name, "-initialized"));
        data_1.default.remove(this._element, this._name);
    };
    KTComponent.prototype.on = function (eventType, callback) {
        var eventId = utils_1.default.geUID();
        if (!this._events.get(eventType)) {
            this._events.set(eventType, new Map());
        }
        this._events.get(eventType).set(eventId, callback);
        return eventId;
    };
    KTComponent.prototype.off = function (eventType, eventId) {
        var _a;
        (_a = this._events.get(eventType)) === null || _a === void 0 ? void 0 : _a.delete(eventId);
    };
    KTComponent.prototype.getOption = function (name) {
        return this._getOption(name);
    };
    KTComponent.prototype.getElement = function () {
        if (!this._element)
            return null;
        return this._element;
    };
    return KTComponent;
}());
exports["default"] = KTComponent;


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/components/dropdown/dropdown.ts":
/*!***************************************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/components/dropdown/dropdown.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDropdown = void 0;
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./node_modules/@keenthemes/ktui/src/helpers/dom.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./node_modules/@keenthemes/ktui/src/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./node_modules/@keenthemes/ktui/src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./node_modules/@keenthemes/ktui/src/components/component.ts");
var KTDropdown = /** @class */ (function (_super) {
    __extends(KTDropdown, _super);
    function KTDropdown(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'dropdown';
        _this._defaultConfig = {
            zindex: 105,
            hoverTimeout: 200,
            placement: 'bottom-start',
            placementRtl: 'bottom-end',
            permanent: false,
            dismiss: false,
            keyboard: true,
            trigger: 'click',
            attach: '',
            offset: '0px, 5px',
            offsetRtl: '0px, 5px',
            hiddenClass: 'hidden',
            container: '',
        };
        _this._config = _this._defaultConfig;
        _this._disabled = false;
        _this._isTransitioning = false;
        _this._isOpen = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._toggleElement = _this._element.querySelector('[data-kt-dropdown-toggle]');
        if (!_this._toggleElement)
            return _this;
        _this._menuElement = _this._element.querySelector('[data-kt-dropdown-menu]');
        if (!_this._menuElement)
            return _this;
        data_1.default.set(_this._menuElement, 'dropdownElement', _this._element);
        _this._setupNestedDropdowns();
        _this._handleContainer();
        return _this;
    }
    KTDropdown.prototype._handleContainer = function () {
        var _a;
        if (this._getOption('container')) {
            if (this._getOption('container') === 'body') {
                document.body.appendChild(this._menuElement);
            }
            else {
                (_a = document
                    .querySelector(this._getOption('container'))) === null || _a === void 0 ? void 0 : _a.appendChild(this._menuElement);
            }
        }
    };
    KTDropdown.prototype._setupNestedDropdowns = function () {
        var subDropdowns = this._menuElement.querySelectorAll('[data-kt-dropdown-toggle]');
        subDropdowns.forEach(function (subToggle) {
            var _a;
            var subItem = subToggle.closest('[data-kt-dropdown-item]');
            var subMenu = (_a = subToggle
                .closest('.kt-menu-item')) === null || _a === void 0 ? void 0 : _a.querySelector('[data-kt-dropdown-menu]');
            if (subItem && subMenu) {
                new KTDropdown(subItem);
            }
        });
    };
    KTDropdown.prototype._click = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'click')
            return;
        this._toggle();
    };
    KTDropdown.prototype._mouseover = function (event) {
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'hover')
            return;
        if (data_1.default.get(this._element, 'hover') === '1') {
            clearTimeout(data_1.default.get(this._element, 'timeout'));
            data_1.default.remove(this._element, 'hover');
            data_1.default.remove(this._element, 'timeout');
        }
        this._show();
    };
    KTDropdown.prototype._mouseout = function (event) {
        var _this = this;
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'hover')
            return;
        var relatedTarget = event.relatedTarget;
        var isWithinDropdown = this._element.contains(relatedTarget);
        if (isWithinDropdown)
            return;
        var timeout = setTimeout(function () {
            if (data_1.default.get(_this._element, 'hover') === '1') {
                _this._hide();
            }
        }, parseInt(this._getOption('hoverTimeout')));
        data_1.default.set(this._element, 'hover', '1');
        data_1.default.set(this._element, 'timeout', timeout);
    };
    KTDropdown.prototype._toggle = function () {
        if (this._isOpen) {
            this._hide();
        }
        else {
            this._show();
        }
    };
    KTDropdown.prototype._show = function () {
        var _this = this;
        if (this._isOpen || this._isTransitioning)
            return;
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel)
            return;
        KTDropdown.hide(this._element);
        var zIndex = parseInt(this._getOption('zindex'));
        var parentZindex = dom_1.default.getHighestZindex(this._element);
        if (parentZindex !== null && parentZindex >= zIndex) {
            zIndex = parentZindex + 1;
        }
        if (zIndex > 0) {
            this._menuElement.style.zIndex = zIndex.toString();
        }
        this._menuElement.style.display = 'block';
        this._menuElement.style.opacity = '0';
        dom_1.default.reflow(this._menuElement);
        this._menuElement.style.opacity = '1';
        this._menuElement.classList.remove(this._getOption('hiddenClass'));
        this._toggleElement.classList.add('active');
        this._menuElement.classList.add('open');
        this._element.classList.add('open');
        this._initPopper();
        dom_1.default.transitionEnd(this._menuElement, function () {
            _this._isTransitioning = false;
            _this._isOpen = true;
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTDropdown.prototype._hide = function () {
        var _this = this;
        if (!this._isOpen || this._isTransitioning)
            return;
        var payload = { cancel: false };
        this._fireEvent('hide', payload);
        this._dispatchEvent('hide', payload);
        if (payload.cancel)
            return;
        this._menuElement.style.opacity = '1';
        dom_1.default.reflow(this._menuElement);
        this._menuElement.style.opacity = '0';
        this._menuElement.classList.remove('open');
        this._toggleElement.classList.remove('active');
        this._element.classList.remove('open');
        dom_1.default.transitionEnd(this._menuElement, function () {
            _this._isTransitioning = false;
            _this._isOpen = false;
            _this._menuElement.classList.add(_this._getOption('hiddenClass'));
            _this._menuElement.style.display = '';
            _this._menuElement.style.zIndex = '';
            _this._destroyPopper();
            _this._fireEvent('hidden');
            _this._dispatchEvent('hidden');
        });
    };
    KTDropdown.prototype._initPopper = function () {
        var isRtl = dom_1.default.isRTL();
        var reference;
        var attach = this._getOption('attach');
        if (attach) {
            reference =
                attach === 'parent'
                    ? this._toggleElement.parentNode
                    : document.querySelector(attach);
        }
        else {
            reference = this._toggleElement;
        }
        if (reference) {
            var popper = (0, core_1.createPopper)(reference, this._menuElement, this._getPopperConfig());
            data_1.default.set(this._element, 'popper', popper);
        }
    };
    KTDropdown.prototype._destroyPopper = function () {
        if (data_1.default.has(this._element, 'popper')) {
            data_1.default.get(this._element, 'popper').destroy();
            data_1.default.remove(this._element, 'popper');
        }
    };
    KTDropdown.prototype._isDropdownOpen = function () {
        return (this._element.classList.contains('open') &&
            this._menuElement.classList.contains('open'));
    };
    KTDropdown.prototype._getPopperConfig = function () {
        var isRtl = dom_1.default.isRTL();
        var placement = this._getOption('placement');
        if (isRtl && this._getOption('placementRtl')) {
            placement = this._getOption('placementRtl');
        }
        var offsetValue = this._getOption('offset');
        if (isRtl && this._getOption('offsetRtl')) {
            offsetValue = this._getOption('offsetRtl');
        }
        var offset = offsetValue
            ? offsetValue
                .toString()
                .split(',')
                .map(function (value) { return parseInt(value.trim(), 10); })
            : [0, 0];
        var strategy = this._getOption('overflow') === true ? 'absolute' : 'fixed';
        var altAxis = this._getOption('flip') !== false;
        return {
            placement: placement,
            strategy: strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: offset },
                },
                {
                    name: 'preventOverflow',
                    options: { altAxis: altAxis },
                },
                {
                    name: 'flip',
                    options: { flipVariations: false },
                },
            ],
        };
    };
    KTDropdown.prototype._getToggleElement = function () {
        return this._toggleElement;
    };
    KTDropdown.prototype._getContentElement = function () {
        return this._menuElement;
    };
    // General Methods
    KTDropdown.prototype.click = function (event) {
        this._click(event);
    };
    KTDropdown.prototype.mouseover = function (event) {
        this._mouseover(event);
    };
    KTDropdown.prototype.mouseout = function (event) {
        this._mouseout(event);
    };
    KTDropdown.prototype.show = function () {
        this._show();
    };
    KTDropdown.prototype.hide = function () {
        this._hide();
    };
    KTDropdown.prototype.toggle = function () {
        this._toggle();
    };
    KTDropdown.prototype.getToggleElement = function () {
        return this._toggleElement;
    };
    KTDropdown.prototype.getContentElement = function () {
        return this._menuElement;
    };
    KTDropdown.prototype.isPermanent = function () {
        return this._getOption('permanent');
    };
    KTDropdown.prototype.disable = function () {
        this._disabled = true;
    };
    KTDropdown.prototype.enable = function () {
        this._disabled = false;
    };
    KTDropdown.prototype.isOpen = function () {
        return this._isDropdownOpen();
    };
    // Static Methods
    KTDropdown.getElement = function (reference) {
        if (reference && reference.hasAttribute('data-kt-dropdown-initialized'))
            return reference;
        var findElement = reference &&
            reference.closest('[data-kt-dropdown-initialized]');
        if (findElement)
            return findElement;
        if (reference &&
            reference.hasAttribute('data-kt-dropdown-menu') &&
            data_1.default.has(reference, 'dropdownElement')) {
            return data_1.default.get(reference, 'dropdownElement');
        }
        return null;
    };
    KTDropdown.getInstance = function (element) {
        element = this.getElement(element);
        if (!element)
            return null;
        if (data_1.default.has(element, 'dropdown')) {
            return data_1.default.get(element, 'dropdown');
        }
        if (element.getAttribute('data-kt-dropdown-initialized') === 'true') {
            return new KTDropdown(element);
        }
        return null;
    };
    KTDropdown.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTDropdown(element, config);
    };
    KTDropdown.update = function () {
        document
            .querySelectorAll('.open[data-kt-dropdown-initialized]')
            .forEach(function (item) {
            if (data_1.default.has(item, 'popper')) {
                data_1.default.get(item, 'popper').forceUpdate();
            }
        });
    };
    KTDropdown.hide = function (skipElement) {
        document
            .querySelectorAll('.open[data-kt-dropdown-initialized]:not([data-kt-dropdown-permanent="true"])')
            .forEach(function (item) {
            if (skipElement && (skipElement === item || item.contains(skipElement)))
                return;
            var dropdown = KTDropdown.getInstance(item);
            if (dropdown)
                dropdown.hide();
        });
    };
    KTDropdown.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            document
                .querySelectorAll('.open[data-kt-dropdown-initialized]:not([data-kt-dropdown-permanent="true"])')
                .forEach(function (element) {
                var dropdown = KTDropdown.getInstance(element);
                if (!dropdown)
                    return;
                var contentElement = dropdown.getContentElement();
                var toggleElement = dropdown.getToggleElement();
                if (toggleElement === event.target ||
                    toggleElement.contains(event.target) ||
                    contentElement === event.target ||
                    contentElement.contains(event.target)) {
                    return;
                }
                dropdown.hide();
            });
        });
    };
    KTDropdown.handleKeyboard = function () {
        document.addEventListener('keydown', function (event) {
            var dropdownEl = document.querySelector('.open[data-kt-dropdown-initialized]');
            var dropdown = KTDropdown.getInstance(dropdownEl);
            if (!dropdown || !dropdown._getOption('keyboard'))
                return;
            if (event.key === 'Escape' &&
                !(event.ctrlKey || event.altKey || event.shiftKey)) {
                dropdown.hide();
            }
        });
    };
    KTDropdown.handleMouseover = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle], [data-kt-dropdown-menu]', 'mouseover', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown && dropdown._getOption('trigger') === 'hover') {
                dropdown.mouseover(event);
            }
        });
    };
    KTDropdown.handleMouseout = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle], [data-kt-dropdown-menu]', 'mouseout', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown && dropdown._getOption('trigger') === 'hover') {
                dropdown.mouseout(event);
            }
        });
    };
    KTDropdown.handleClick = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle]', 'click', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown) {
                dropdown.click(event);
            }
        });
    };
    KTDropdown.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-dismiss]', 'click', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown) {
                dropdown.hide();
            }
        });
    };
    KTDropdown.initHandlers = function () {
        this.handleClickAway();
        this.handleKeyboard();
        this.handleMouseover();
        this.handleMouseout();
        this.handleClick();
        this.handleDismiss();
    };
    KTDropdown.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-dropdown]');
        elements.forEach(function (element) {
            new KTDropdown(element);
        });
    };
    KTDropdown.init = function () {
        KTDropdown.createInstances();
        if (window.KT_DROPDOWN_INITIALIZED !== true) {
            KTDropdown.initHandlers();
            window.KT_DROPDOWN_INITIALIZED = true;
        }
    };
    return KTDropdown;
}(component_1.default));
exports.KTDropdown = KTDropdown;
if (typeof window !== 'undefined') {
    window.KTDropdown = KTDropdown;
}


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/components/dropdown/index.ts":
/*!************************************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/components/dropdown/index.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDropdown = void 0;
var dropdown_1 = __webpack_require__(/*! ./dropdown */ "./node_modules/@keenthemes/ktui/src/components/dropdown/dropdown.ts");
Object.defineProperty(exports, "KTDropdown", ({ enumerable: true, get: function () { return dropdown_1.KTDropdown; } }));


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/helpers/data.ts":
/*!***********************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/helpers/data.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTElementMap = new Map();
var KTData = {
    set: function (element, key, value) {
        if (!KTElementMap.has(element)) {
            KTElementMap.set(element, new Map());
        }
        var valueMap = KTElementMap.get(element);
        valueMap.set(key, value);
    },
    get: function (element, key) {
        if (KTElementMap.has(element)) {
            return KTElementMap.get(element).get(key) || null;
        }
        return null;
    },
    has: function (element, key) {
        return KTElementMap.has(element) && KTElementMap.get(element).has(key);
    },
    remove: function (element, key) {
        if (!KTElementMap.has(element) || !KTElementMap.get(element).has(key)) {
            return;
        }
        var valueMap = KTElementMap.get(element);
        valueMap.delete(key);
        if (valueMap.size === 0) {
            KTElementMap.delete(element);
        }
    },
};
exports["default"] = KTData;


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/helpers/dom.ts":
/*!**********************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/helpers/dom.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable max-len */
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@keenthemes/ktui/src/helpers/utils.ts");
var KTDom = {
    isRTL: function () {
        var htmlTag = document.documentElement; // Access the <html> tag
        // Check if the "dir" attribute is present and its value is "rtl"
        var dir = htmlTag.getAttribute('dir');
        return dir === 'rtl';
    },
    isElement: function (element) {
        if (element && element instanceof HTMLElement) {
            return true;
        }
        else {
            return false;
        }
    },
    getElement: function (element) {
        if (this.isElement(element)) {
            return element;
        }
        if (element && element.length > 0) {
            return document.querySelector(utils_1.default.parseSelector(element));
        }
        return null;
    },
    remove: function (element) {
        if (this.isElement(element) && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    hasClass: function (element, className) {
        // Split classNames string into an array of individual class names
        var classes = className.split(' ');
        // Loop through each class name
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var className_1 = classes_1[_i];
            // Check if the element has the current class name
            if (!element.classList.contains(className_1)) {
                // Return false if any class is missing
                return false;
            }
        }
        // Return true if all classes are present
        return true;
    },
    addClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                if (classNames[i] && classNames[i].length > 0) {
                    element.classList.add(classNames[i].trim());
                }
            }
        }
        else if (!this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className += ' ' + classNames[x].trim();
            }
        }
    },
    removeClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                element.classList.remove(classNames[i].trim());
            }
        }
        else if (this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className = element.className.replace(new RegExp('\\b' + classNames[x].trim() + '\\b', 'g'), '');
            }
        }
    },
    getCssProp: function (element, prop) {
        return (element ? window.getComputedStyle(element).getPropertyValue(prop) : '').replace(' ', '');
    },
    setCssProp: function (element, prop, value) {
        if (element) {
            window.getComputedStyle(element).setProperty(prop, value);
        }
    },
    offset: function (element) {
        if (!element)
            return { top: 0, left: 0, right: 0, bottom: 0 };
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: window.innerWidth - rect.right,
            bottom: window.innerHeight - rect.top,
        };
    },
    getIndex: function (element) {
        var _a;
        var children = Array.from(((_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.children) || []);
        return children.indexOf(element);
    },
    parents: function (element, selector) {
        var parents = [];
        // Push each parent element to the array
        for (element && element !== document.documentElement; (element = element.parentElement);) {
            if (selector) {
                if (element.matches(selector)) {
                    parents.push(element);
                }
                continue;
            }
            parents.push(element);
        }
        // Return our parent array
        return parents;
    },
    siblings: function (element) {
        var parent = element.parentNode;
        if (!parent)
            return [];
        return Array.from(parent.children).filter(function (child) { return child !== element; });
    },
    children: function (element, selector) {
        if (!element || !element.childNodes) {
            return null;
        }
        var result = [];
        var l = element.childNodes.length;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (element.childNodes[i].nodeType == 1 &&
                element.childNodes[i].matches(selector)) {
                result.push(element.childNodes[i]);
            }
        }
        return result;
    },
    child: function (element, selector) {
        var children = KTDom.children(element, selector);
        return children ? children[0] : null;
    },
    isVisible: function (element) {
        if (!this.isElement(element) || element.getClientRects().length === 0) {
            return false;
        }
        // eslint-disable-next-line max-len
        return (getComputedStyle(element).getPropertyValue('visibility') === 'visible');
    },
    isDisabled: function (element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        if (element.classList.contains('disabled')) {
            return true;
        }
        if (typeof element.disabled !== 'undefined') {
            return element.disabled;
        }
        return (element.hasAttribute('disabled') &&
            element.getAttribute('disabled') !== 'false');
    },
    transitionEnd: function (element, callback) {
        var duration = this.getCSSTransitionDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    animationEnd: function (element, callback) {
        var duration = this.getCSSAnimationDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    getCSSTransitionDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).transitionDuration) * 1000);
    },
    getCSSAnimationDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).animationDuration) * 1000);
    },
    reflow: function (element) {
        element.offsetHeight;
    },
    insertAfter: function (element, referenceNode) {
        var parentNode = referenceNode.parentNode;
        if (parentNode) {
            parentNode.insertBefore(element, referenceNode.nextSibling);
        }
    },
    getHighestZindex: function (element) {
        var position, value;
        while (element && element !== document.documentElement) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = element.style.position;
            if (position === 'absolute' ||
                position === 'relative' ||
                position === 'fixed') {
                // IE returns 0 when zIndex is not specified
                // other browsers return a string
                // we ignore the case of nested elements with an explicit value of 0
                // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                value = parseInt(element.style.zIndex);
                if (!isNaN(value) && value !== 0) {
                    return value;
                }
            }
            element = element.parentNode;
        }
        return 1;
    },
    isParentOrElementHidden: function (element) {
        if (!element) {
            return false;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.display === 'none') {
            return true;
        }
        return this.isParentOrElementHidden(element.parentElement);
    },
    getViewPort: function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    getScrollTop: function () {
        return (document.scrollingElement || document.documentElement).scrollTop;
    },
    isInViewport: function (element) {
        var rect = element.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    },
    isPartiallyInViewport: function (element) {
        var x = element.getBoundingClientRect().left;
        var y = element.getBoundingClientRect().top;
        var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var w = element.clientWidth;
        var h = element.clientHeight;
        return y < hw && y + h > 0 && x < ww && x + w > 0;
    },
    isVisibleInParent: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Check if the child element is visible
        if (child.offsetParent === null ||
            getComputedStyle(child).visibility === 'hidden' ||
            getComputedStyle(child).display === 'none') {
            return false;
        }
        // Check if the child is within the vertical bounds of the parent
        var isVisibleVertically = childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
        // Check if the child is within the horizontal bounds of the parent
        var isVisibleHorizontally = childRect.left >= parentRect.left && childRect.right <= parentRect.right;
        return isVisibleVertically && isVisibleHorizontally;
    },
    getRelativeTopPosition: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Calculate the relative top position
        var relativeTop = childRect.top - parentRect.top;
        return relativeTop;
    },
    getDataAttributes: function (element, prefix) {
        if (!element) {
            return {};
        }
        prefix = utils_1.default.camelCase(prefix);
        var attributes = {};
        var keys = Object.keys(element.dataset).filter(function (key) {
            return key.startsWith(prefix);
        });
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var normalizedKey = key.replace(prefix, '');
            normalizedKey = utils_1.default.uncapitalize(normalizedKey);
            attributes[normalizedKey] = utils_1.default.parseDataAttribute(element.dataset[key]);
        }
        return attributes;
    },
    ready: function (callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                callback();
            });
        }
        else {
            callback();
        }
    },
};
exports["default"] = KTDom;


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/helpers/event-handler.ts":
/*!********************************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/helpers/event-handler.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@keenthemes/ktui/src/helpers/utils.ts");
var KTDelegatedEventHandlers = {};
var KTEventHandler = {
    on: function (element, selector, eventName, handler) {
        var _this = this;
        if (element === null) {
            return null;
        }
        var eventId = utils_1.default.geUID('event');
        KTDelegatedEventHandlers[eventId] = function (event) {
            var targets = element.querySelectorAll(selector);
            var target = event.target;
            while (target && target !== element) {
                for (var i = 0, j = targets.length; i < j; i++) {
                    if (target === targets[i]) {
                        handler.call(_this, event, target);
                    }
                }
                target = target.parentNode;
            }
        };
        element.addEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        return eventId;
    },
    off: function (element, eventName, eventId) {
        if (!element || KTDelegatedEventHandlers[eventId] === null) {
            return;
        }
        element.removeEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        delete KTDelegatedEventHandlers[eventId];
    },
};
exports["default"] = KTEventHandler;


/***/ }),

/***/ "./node_modules/@keenthemes/ktui/src/helpers/utils.ts":
/*!************************************************************!*\
  !*** ./node_modules/@keenthemes/ktui/src/helpers/utils.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTUtils = {
    geUID: function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return prefix + Math.floor(Math.random() * new Date().getTime());
    },
    getCssVar: function (variable) {
        var hex = getComputedStyle(document.documentElement).getPropertyValue(variable);
        if (hex && hex.length > 0) {
            hex = hex.trim();
        }
        return hex;
    },
    parseDataAttribute: function (value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (value === Number(value).toString()) {
            return Number(value);
        }
        if (value === '' || value === 'null') {
            return null;
        }
        if (typeof value !== 'string') {
            return value;
        }
        try {
            return KTUtils.parseJson(value);
        }
        catch (_a) {
            return value;
        }
    },
    parseJson: function (value) {
        return value && value.length > 0
            ? JSON.parse(decodeURIComponent(value))
            : null;
    },
    parseSelector: function (selector) {
        if (selector && window.CSS && window.CSS.escape) {
            // Escape any IDs in the selector using CSS.escape
            selector = selector.replace(/#([^\s"#']+)/g, function (match, id) { return "#".concat(window.CSS.escape(id)); });
        }
        return selector;
    },
    capitalize: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    uncapitalize: function (value) {
        return value.charAt(0).toLowerCase() + value.slice(1);
    },
    camelCase: function (value) {
        return value.replace(/-([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        });
    },
    camelReverseCase: function (str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    isRTL: function () {
        var htmlElement = document.querySelector('html');
        return Boolean(htmlElement && htmlElement.getAttribute('direction') === 'rtl');
    },
    throttle: function (timer, func, delay) {
        // If setTimeout is already scheduled, no need to do anything
        if (timer) {
            return;
        }
        // Schedule a setTimeout after delay seconds
        timer = setTimeout(function () {
            func();
            // Once setTimeout function execution is finished, timerId = undefined so that in <br>
            // the next scroll event function execution can be scheduled by the setTimeout
            clearTimeout(timer);
        }, delay);
    },
    checksum: function (value) {
        var hash = 0;
        for (var i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
        }
        return ('0000000' + (hash >>> 0).toString(16)).slice(-8);
    },
    stringToBoolean: function (value) {
        if (typeof value === 'boolean')
            return value;
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.toLowerCase().trim();
        if (cleanedStr === 'true')
            return true;
        if (cleanedStr === 'false')
            return false;
        return null;
    },
    stringToObject: function (value) {
        try {
            var parsed = JSON.parse(value.toString());
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                return parsed;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    stringToInteger: function (value) {
        // If already a number, return it as an integer
        if (typeof value === 'number' && !isNaN(value)) {
            return Math.floor(value);
        }
        // If not a string, return null
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.trim();
        var num = parseInt(cleanedStr, 10);
        if (!isNaN(num) && cleanedStr !== '') {
            return num;
        }
        return null;
    },
    stringToFloat: function (value) {
        // If already a number, return it as is
        if (typeof value === 'number' && !isNaN(value)) {
            return value;
        }
        // If not a string, return null
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.trim();
        var num = parseFloat(cleanedStr);
        if (!isNaN(num) && cleanedStr !== '') {
            return num;
        }
        return null;
    },
};
exports["default"] = KTUtils;


/***/ }),

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   popperGenerator: function() { return /* binding */ popperGenerator; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_6__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contains; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBoundingClientRect; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getClippingRect; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_10__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCompositeRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_7__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_7__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getComputedStyle; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentElement; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentRect; }
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_4__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_4__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_4__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getHTMLElementScroll; }
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getLayoutRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeName; }
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeScroll; }
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOffsetParent; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_6__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_6__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getParentNode; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollParent; }
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getViewportRect; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindow; }
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScroll; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScrollBarX; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElement: function() { return /* binding */ isElement; },
/* harmony export */   isHTMLElement: function() { return /* binding */ isHTMLElement; },
/* harmony export */   isShadowRoot: function() { return /* binding */ isShadowRoot; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isLayoutViewport; }
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isScrollParent; }
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isTableElement; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ listScrollParents; }
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: function() { return /* binding */ afterMain; },
/* harmony export */   afterRead: function() { return /* binding */ afterRead; },
/* harmony export */   afterWrite: function() { return /* binding */ afterWrite; },
/* harmony export */   auto: function() { return /* binding */ auto; },
/* harmony export */   basePlacements: function() { return /* binding */ basePlacements; },
/* harmony export */   beforeMain: function() { return /* binding */ beforeMain; },
/* harmony export */   beforeRead: function() { return /* binding */ beforeRead; },
/* harmony export */   beforeWrite: function() { return /* binding */ beforeWrite; },
/* harmony export */   bottom: function() { return /* binding */ bottom; },
/* harmony export */   clippingParents: function() { return /* binding */ clippingParents; },
/* harmony export */   end: function() { return /* binding */ end; },
/* harmony export */   left: function() { return /* binding */ left; },
/* harmony export */   main: function() { return /* binding */ main; },
/* harmony export */   modifierPhases: function() { return /* binding */ modifierPhases; },
/* harmony export */   placements: function() { return /* binding */ placements; },
/* harmony export */   popper: function() { return /* binding */ popper; },
/* harmony export */   read: function() { return /* binding */ read; },
/* harmony export */   reference: function() { return /* binding */ reference; },
/* harmony export */   right: function() { return /* binding */ right; },
/* harmony export */   start: function() { return /* binding */ start; },
/* harmony export */   top: function() { return /* binding */ top; },
/* harmony export */   variationPlacements: function() { return /* binding */ variationPlacements; },
/* harmony export */   viewport: function() { return /* binding */ viewport; },
/* harmony export */   write: function() { return /* binding */ write; }
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain; },
/* harmony export */   afterRead: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead; },
/* harmony export */   afterWrite: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite; },
/* harmony export */   applyStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles; },
/* harmony export */   arrow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow; },
/* harmony export */   auto: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto; },
/* harmony export */   basePlacements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements; },
/* harmony export */   beforeMain: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain; },
/* harmony export */   beforeRead: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead; },
/* harmony export */   beforeWrite: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite; },
/* harmony export */   bottom: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom; },
/* harmony export */   clippingParents: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles; },
/* harmony export */   createPopper: function() { return /* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper; },
/* harmony export */   createPopperBase: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper; },
/* harmony export */   createPopperLite: function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   end: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners; },
/* harmony export */   flip: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip; },
/* harmony export */   hide: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide; },
/* harmony export */   left: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left; },
/* harmony export */   main: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main; },
/* harmony export */   modifierPhases: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases; },
/* harmony export */   offset: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset; },
/* harmony export */   placements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements; },
/* harmony export */   popper: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow; },
/* harmony export */   read: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read; },
/* harmony export */   reference: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference; },
/* harmony export */   right: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right; },
/* harmony export */   start: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start; },
/* harmony export */   top: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top; },
/* harmony export */   variationPlacements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements; },
/* harmony export */   viewport: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport; },
/* harmony export */   write: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");








 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_8__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_8__.left, _enums_js__WEBPACK_IMPORTED_MODULE_8__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__.top : _enums_js__WEBPACK_IMPORTED_MODULE_8__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_8__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_5__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapToStyles: function() { return /* binding */ mapToStyles; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_7__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_7__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.right : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: function() { return /* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   arrow: function() { return /* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   flip: function() { return /* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   hide: function() { return /* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   offset: function() { return /* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; }
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distanceAndSkiddingToXY: function() { return /* binding */ distanceAndSkiddingToXY; }
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.top : _enums_js__WEBPACK_IMPORTED_MODULE_0__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_0__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_4__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_4__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.top : _enums_js__WEBPACK_IMPORTED_MODULE_0__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_0__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_4__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_4__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   defaultModifiers: function() { return /* binding */ defaultModifiers; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_0__.popperGenerator; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_5__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_0__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles; },
/* harmony export */   arrow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles; },
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   createPopperLite: function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper; },
/* harmony export */   defaultModifiers: function() { return /* binding */ defaultModifiers; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners; },
/* harmony export */   flip: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip; },
/* harmony export */   hide: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide; },
/* harmony export */   offset: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_0__.popperGenerator; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_9__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_10__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_0__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeAutoPlacement; }
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_1__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_1__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeOffsets; }
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_3__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_3__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_3__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ debounce; }
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ detectOverflow; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_5__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_5__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.right, _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ expandToHashMap; }
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAltAxis; }
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBasePlacement; }
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getFreshSideObject; }
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getMainAxisFromPlacement; }
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositePlacement; }
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositeVariationPlacement; }
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getVariation; }
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   max: function() { return /* binding */ max; },
/* harmony export */   min: function() { return /* binding */ min; },
/* harmony export */   round: function() { return /* binding */ round; }
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeByName; }
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergePaddingObject; }
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ orderModifiers; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rectToClientRect; }
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getUAString; }
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   within: function() { return /* binding */ within; },
/* harmony export */   withinMaxClamp: function() { return /* binding */ withinMaxClamp; }
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./src/core/components/component.ts":
/*!******************************************!*\
  !*** ./src/core/components/component.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var data_1 = __webpack_require__(/*! ../helpers/data */ "./src/core/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../helpers/dom */ "./src/core/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/core/helpers/utils.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/core/components/config.ts");
var KTComponent = /** @class */ (function () {
    function KTComponent() {
        this._uid = null;
        this._element = null;
    }
    KTComponent.prototype._init = function (element) {
        element = dom_1.default.getElement(element);
        if (!element) {
            return;
        }
        this._element = element;
        this._events = new Map();
        this._uid = utils_1.default.geUID(this._name);
        data_1.default.set(this._element, this._name, this);
    };
    KTComponent.prototype._fireEvent = function (eventType, payload) {
        var _a;
        if (payload === void 0) { payload = null; }
        (_a = this._events.get(eventType)) === null || _a === void 0 ? void 0 : _a.forEach(function (callable) {
            callable(payload);
        });
    };
    KTComponent.prototype._dispatchEvent = function (eventType, payload) {
        if (payload === void 0) { payload = null; }
        var event = new CustomEvent(eventType, {
            detail: { payload: payload },
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        if (!this._element)
            return;
        this._element.dispatchEvent(event);
    };
    KTComponent.prototype._getOption = function (name) {
        var value = this._config[name];
        if (value && typeof value === 'string') {
            return this._getResponsiveOption(value);
        }
        else {
            return value;
        }
    };
    KTComponent.prototype._getResponsiveOption = function (value) {
        var result = null;
        var width = dom_1.default.getViewPort().width;
        var parts = String(value).split('|');
        if (parts.length > 1) {
            for (var i = parts.length - 1; i < parts.length; i--) {
                var part = parts[i];
                if (part.includes(':')) {
                    var _a = part.split(':'), breakpointKey = _a[0], breakpointValue = _a[1];
                    var breakpoint = utils_1.default.getBreakpoint(breakpointKey);
                    if (breakpoint <= width) {
                        result = breakpointValue;
                        break;
                    }
                }
                else {
                    result = part;
                    break;
                }
            }
        }
        else {
            result = value;
        }
        result = utils_1.default.parseDataAttribute(result);
        return result;
    };
    KTComponent.prototype._getGlobalConfig = function () {
        if (window.KTGlobalComponentsConfig &&
            window.KTGlobalComponentsConfig[this._name]) {
            return window.KTGlobalComponentsConfig[this._name];
        }
        else if (config_1.default &&
            config_1.default[this._name]) {
            return config_1.default[this._name];
        }
        else {
            return {};
        }
    };
    KTComponent.prototype._buildConfig = function (config) {
        if (config === void 0) { config = {}; }
        if (!this._element)
            return;
        this._config = __assign(__assign(__assign(__assign({}, this._defaultConfig), this._getGlobalConfig()), dom_1.default.getDataAttributes(this._element, this._name)), config);
    };
    KTComponent.prototype.dispose = function () {
        if (!this._element)
            return;
        data_1.default.remove(this._element, this._name);
    };
    KTComponent.prototype.on = function (eventType, callback) {
        var eventId = utils_1.default.geUID();
        if (!this._events.get(eventType)) {
            this._events.set(eventType, new Map());
        }
        this._events.get(eventType).set(eventId, callback);
        return eventId;
    };
    KTComponent.prototype.off = function (eventType, eventId) {
        var _a;
        (_a = this._events.get(eventType)) === null || _a === void 0 ? void 0 : _a.delete(eventId);
    };
    KTComponent.prototype.getOption = function (name) {
        return this._getOption(name);
    };
    KTComponent.prototype.getElement = function () {
        if (!this._element)
            return null;
        return this._element;
    };
    return KTComponent;
}());
exports["default"] = KTComponent;


/***/ }),

/***/ "./src/core/components/config.ts":
/*!***************************************!*\
  !*** ./src/core/components/config.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable max-len */
var KTGlobalComponentsConfig = {
    modal: {
        backdropClass: 'transition-all duration-300',
    },
    drawer: {
        backdropClass: 'transition-all duration-300',
        hiddenClass: 'hidden'
    },
    collapse: {
        hiddenClass: 'hidden',
    },
    dismiss: {
        hiddenClass: 'hidden',
    },
    tabs: {
        hiddenClass: 'hidden',
    },
    accordion: {
        hiddenClass: 'hidden',
    }
};
exports["default"] = KTGlobalComponentsConfig;


/***/ }),

/***/ "./src/core/components/constants.ts":
/*!******************************************!*\
  !*** ./src/core/components/constants.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KT_ACCESSIBILITY_KEYS = void 0;
exports.KT_ACCESSIBILITY_KEYS = [
    'ArrowUp',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    'Home',
    'End',
    'Escape',
    'Enter',
    'Tab',
];


/***/ }),

/***/ "./src/core/components/menu/index.ts":
/*!*******************************************!*\
  !*** ./src/core/components/menu/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTMenu = void 0;
var menu_1 = __webpack_require__(/*! ./menu */ "./src/core/components/menu/menu.ts");
Object.defineProperty(exports, "KTMenu", ({ enumerable: true, get: function () { return menu_1.KTMenu; } }));


/***/ }),

/***/ "./src/core/components/menu/menu.ts":
/*!******************************************!*\
  !*** ./src/core/components/menu/menu.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTMenu = void 0;
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/core/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/core/helpers/utils.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/core/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/core/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/core/components/component.ts");
var constants_1 = __webpack_require__(/*! ../constants */ "./src/core/components/constants.ts");
var dropdown_1 = __webpack_require__(/*! @keenthemes/ktui/src/components/dropdown */ "./node_modules/@keenthemes/ktui/src/components/dropdown/index.ts");
var KTMenu = /** @class */ (function (_super) {
    __extends(KTMenu, _super);
    function KTMenu(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'menu';
        _this._defaultConfig = {
            dropdownZindex: '105',
            dropdownHoverTimeout: 200,
            dropdownPlacement: 'bottom',
            dropdownOffset: '0, 5px',
            accordionExpandAll: false,
            preserveParentDropdowns: true,
        };
        _this._config = _this._defaultConfig;
        _this._disabled = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._update();
        return _this;
    }
    KTMenu.prototype._click = function (element, event) {
        if (element.hasAttribute('href') && element.getAttribute('href') !== '#') {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this._disabled === true) {
            return;
        }
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._getItemOption(itemElement, 'trigger') !== 'click') {
            return;
        }
        if (this._getItemOption(itemElement, 'toggle') === false) {
            this._show(itemElement);
        }
        else {
            this._toggle(itemElement);
        }
    };
    KTMenu.prototype._link = function (element, event) {
        if (this._disabled === true) {
            return;
        }
        var payload = {
            cancel: false,
            element: element,
            event: event,
        };
        this._fireEvent('link.click', payload);
        this._dispatchEvent('link.click', payload);
        if (payload.cancel === true) {
            return;
        }
        var itemElement = this._getItemElement(element);
        if (this._isItemDropdownPermanent(itemElement) === false) {
            KTMenu.hide();
        }
        payload = {
            element: element,
            event: event,
        };
        this._fireEvent('link.clicked', payload);
        this._dispatchEvent('link.clicked', payload);
    };
    KTMenu.prototype._dismiss = function (element) {
        var _this = this;
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        var itemElements = this._getItemChildElements(itemElement);
        if (itemElement !== null &&
            this._getItemToggleMode(itemElement) === 'dropdown') {
            // hide items dropdown
            this._hide(itemElement);
            // Hide all child elements as well
            itemElements.forEach(function (each) {
                if (_this._getItemToggleMode(each) === 'dropdown') {
                    _this._hide(each);
                }
            });
        }
    };
    KTMenu.prototype._mouseover = function (element) {
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._disabled === true) {
            return;
        }
        if (itemElement === null) {
            return;
        }
        if (this._getItemOption(itemElement, 'trigger') !== 'hover') {
            return;
        }
        if (data_1.default.get(itemElement, 'hover') === '1') {
            clearTimeout(data_1.default.get(itemElement, 'timeout'));
            data_1.default.remove(itemElement, 'hover');
            data_1.default.remove(itemElement, 'timeout');
        }
        this._show(itemElement);
    };
    KTMenu.prototype._mouseout = function (element) {
        var _this = this;
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._disabled === true) {
            return;
        }
        if (this._getItemOption(itemElement, 'trigger') !== 'hover') {
            return;
        }
        // Check if we're moving to a child dropdown
        var relatedTarget = event.relatedTarget;
        if (relatedTarget) {
            var childItemElement = this._getItemElement(relatedTarget);
            if (childItemElement && this._isChildOfParent(childItemElement, itemElement)) {
                // Don't hide parent when moving to child
                return;
            }
        }
        var timeout = setTimeout(function () {
            if (data_1.default.get(itemElement, 'hover') === '1') {
                _this._hide(itemElement);
            }
        }, parseInt(this._getOption('dropdownHoverTimeout')));
        data_1.default.set(itemElement, 'hover', '1');
        data_1.default.set(itemElement, 'timeout', timeout);
    };
    KTMenu.prototype._toggle = function (itemElement) {
        if (this._isItemSubShown(itemElement) === true) {
            this._hide(itemElement);
        }
        else {
            this._show(itemElement);
        }
    };
    KTMenu.prototype._show = function (itemElement) {
        if (this._isItemSubShown(itemElement) === true) {
            return;
        }
        if (this._getItemToggleMode(itemElement) === 'dropdown') {
            this._showDropdown(itemElement);
        }
        else if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._showAccordion(itemElement);
        }
        // Remember last submenu type
        data_1.default.set(itemElement, 'toggle', this._getItemToggleMode(itemElement));
    };
    KTMenu.prototype._hide = function (itemElement) {
        if (this._isItemSubShown(itemElement) === false) {
            return;
        }
        if (this._getItemToggleMode(itemElement) === 'dropdown') {
            this._hideDropdown(itemElement);
        }
        else if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._hideAccordion(itemElement);
        }
    };
    KTMenu.prototype._reset = function (itemElement) {
        if (this._hasItemSub(itemElement) === false) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        // Reset sub state if sub type is changed during the window resize
        if (data_1.default.has(itemElement, 'toggle') &&
            data_1.default.get(itemElement, 'toggle') !== this._getItemToggleMode(itemElement)) {
            itemElement.classList.remove('show');
            subElement === null || subElement === void 0 ? void 0 : subElement.classList.remove('show');
        }
    };
    KTMenu.prototype._update = function () {
        var _this = this;
        if (!this._element)
            return;
        var itemElements = this._element.querySelectorAll('[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            _this._updateItemSubType(itemElement);
            _this._reset(itemElement);
        });
    };
    KTMenu.prototype._updateItemSubType = function (itemElement) {
        var subElement = this._getItemSubElement(itemElement);
        if (subElement) {
            if (this._getItemToggleMode(itemElement) === 'dropdown') {
                itemElement.classList.remove('kt-menu-item-accordion');
                itemElement.classList.add('kt-menu-item-dropdown');
                subElement.classList.remove('kt-menu-accordion');
                subElement.classList.add('kt-menu-dropdown');
            }
            else {
                itemElement.classList.remove('kt-menu-item-dropdown');
                itemElement.classList.add('kt-menu-item-accordion');
                subElement.classList.remove('kt-menu-dropdown');
                subElement.classList.add('kt-menu-accordion');
            }
        }
    };
    KTMenu.prototype._isItemSubShown = function (itemElement) {
        var subElement = this._getItemSubElement(itemElement);
        if (subElement !== null) {
            if (this._getItemToggleMode(itemElement) === 'dropdown') {
                if (subElement.classList.contains('show') === true &&
                    subElement.hasAttribute('data-popper-placement') === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return itemElement.classList.contains('show');
            }
        }
        else {
            return false;
        }
    };
    KTMenu.prototype._isItemDropdownPermanent = function (itemElement) {
        return this._getItemOption(itemElement, 'permanent');
    };
    KTMenu.prototype._isItemParentShown = function (itemElement) {
        var parents = dom_1.default.parents(itemElement, '.kt-menu-item.show');
        return parents && parents.length > 0 ? true : false;
    };
    KTMenu.prototype._isItemSubElement = function (itemElement) {
        return (itemElement.classList.contains('kt-menu-dropdown') ||
            itemElement.classList.contains('kt-menu-accordion'));
    };
    KTMenu.prototype._hasItemSub = function (itemElement) {
        return (itemElement.classList.contains('kt-menu-item') &&
            itemElement.hasAttribute('data-kt-menu-item-trigger'));
    };
    KTMenu.prototype._getItemLinkElement = function (itemElement) {
        return dom_1.default.child(itemElement, '.kt-menu-link, .kt-menu-toggle');
    };
    KTMenu.prototype._getItemSubElement = function (itemElement) {
        if (itemElement.classList.contains('kt-menu-dropdown') === true ||
            itemElement.classList.contains('kt-menu-accordion') === true) {
            return itemElement;
        }
        else if (data_1.default.has(itemElement, 'sub')) {
            return data_1.default.get(itemElement, 'sub');
        }
        else {
            return dom_1.default.child(itemElement, '.kt-menu-dropdown, .kt-menu-accordion');
        }
    };
    KTMenu.prototype._getItemToggleMode = function (itemElement) {
        var itemEl = this._getItemElement(itemElement);
        if (this._getItemOption(itemEl, 'toggle') === 'dropdown') {
            return 'dropdown';
        }
        else {
            return 'accordion';
        }
    };
    KTMenu.prototype._getItemElement = function (element) {
        if (element.classList.contains('kt-menu-item') &&
            element.hasAttribute('data-kt-menu-item-toggle')) {
            return element;
        }
        // Element has item DOM reference in it's data storage
        if (data_1.default.has(element, 'item')) {
            return data_1.default.get(element, 'item');
        }
        // Item is parent of element
        var itemElement = element.closest('.kt-menu-item[data-kt-menu-item-toggle]');
        if (itemElement) {
            return itemElement;
        }
        // Element's parent has item DOM reference in it's data storage
        var subElement = element.closest('.kt-menu-dropdown, .kt-menu-accordion');
        if (subElement) {
            if (data_1.default.has(subElement, 'item') === true) {
                return data_1.default.get(subElement, 'item');
            }
        }
        return null;
    };
    KTMenu.prototype._getItemParentElement = function (itemElement) {
        var subElement = itemElement.closest('.kt-menu-dropdown, .kt-menu-accordion');
        var parentItem;
        if (subElement && data_1.default.has(subElement, 'item')) {
            return data_1.default.get(subElement, 'item');
        }
        if (subElement &&
            (parentItem = subElement.closest('.kt-menu-item[data-kt-menu-item-trigger]'))) {
            return parentItem;
        }
        return null;
    };
    KTMenu.prototype._getItemParentElements = function (itemElement) {
        var parentElements = [];
        var parentElement;
        var i = 0;
        do {
            parentElement = this._getItemParentElement(itemElement);
            if (parentElement) {
                parentElements.push(parentElement);
                itemElement = parentElement;
            }
            i++;
        } while (parent !== null && i < 20);
        return parentElements;
    };
    KTMenu.prototype._getItemChildElement = function (itemElement) {
        var selector = itemElement;
        var element;
        if (data_1.default.has(itemElement, 'sub')) {
            selector = data_1.default.get(itemElement, 'sub');
        }
        if (selector !== null) {
            //element = selector.querySelector('.show.kt-menu-item[data-kt-menu-trigger]');
            element = selector.querySelector('.kt-menu-item[data-kt-menu-item-trigger]');
            if (element) {
                return element;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    KTMenu.prototype._getItemChildElements = function (itemElement) {
        var children = [];
        var child;
        var i = 0;
        var buffer = itemElement;
        do {
            child = this._getItemChildElement(buffer);
            if (child) {
                children.push(child);
                buffer = child;
            }
            i++;
        } while (child !== null && i < 20);
        return children;
    };
    KTMenu.prototype._isChildOfParent = function (childElement, parentElement) {
        // Guard clause: validate inputs
        if (!childElement || !parentElement) {
            return false;
        }
        // Guard clause: elements must be in the DOM
        if (!document.contains(childElement) || !document.contains(parentElement)) {
            return false;
        }
        // Check if child is a direct child of parent
        var childSubElement = this._getItemSubElement(childElement);
        if (childSubElement && parentElement.contains(childSubElement)) {
            return true;
        }
        // Check if child is within parent's dropdown
        var parentSubElement = this._getItemSubElement(parentElement);
        if (parentSubElement && parentSubElement.contains(childElement)) {
            return true;
        }
        // Check DOM hierarchy
        return parentElement.contains(childElement);
    };
    KTMenu.prototype._hideUnrelatedDropdowns = function (currentItemElement) {
        var _this = this;
        // Guard clause: validate input
        if (!currentItemElement) {
            return;
        }
        // Check if parent dropdown preservation is enabled
        var preserveParents = this._getOption('preserveParentDropdowns');
        var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            // Guard clause: validate element
            if (!itemElement) {
                return;
            }
            var menu = KTMenu.getInstance(itemElement);
            if (menu &&
                menu.getItemToggleMode(itemElement) === 'dropdown') {
                // Don't hide the current element
                if (itemElement === currentItemElement) {
                    return;
                }
                // Don't hide parent elements of the current element if preservation is enabled
                if (preserveParents && _this._isChildOfParent(currentItemElement, itemElement)) {
                    return;
                }
                // Don't hide if current element is a child of this element
                if (_this._isChildOfParent(itemElement, currentItemElement)) {
                    return;
                }
                // Hide unrelated dropdowns
                menu.hide(itemElement);
            }
        });
    };
    KTMenu.prototype._showDropdown = function (itemElement) {
        var payload = { cancel: false };
        this._fireEvent('dropdown.show', payload);
        this._dispatchEvent('dropdown.show', payload);
        if (payload.cancel === true) {
            return;
        }
        // Hide all currently shown dropdowns except current one and its parents
        this._hideUnrelatedDropdowns(itemElement);
        if (dropdown_1.KTDropdown) {
            dropdown_1.KTDropdown.hide(itemElement);
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        var width = this._getItemOption(itemElement, 'width');
        var height = this._getItemOption(itemElement, 'height');
        // Set z=index
        var zindex = parseInt(this._getOption('dropdownZindex'));
        if (parseInt(dom_1.default.getCssProp(subElement, 'z-index')) > zindex) {
            zindex = parseInt(dom_1.default.getCssProp(subElement, 'z-index'));
        }
        if (dom_1.default.getHighestZindex(itemElement) > zindex) {
            zindex = dom_1.default.getHighestZindex(itemElement) + 1;
        }
        subElement.style.zIndex = String(zindex);
        // end
        if (width) {
            subElement.style.width = width;
        }
        if (height) {
            subElement.style.height = height;
        }
        subElement.style.display = '';
        subElement.style.overflow = '';
        // Init popper(new)
        this._initDropdownPopper(itemElement, subElement);
        itemElement.classList.add('show');
        itemElement.classList.add('kt-menu-item-dropdown');
        subElement.classList.add('show');
        // Append the sub the the root of the menu
        if (this._getItemOption(itemElement, 'overflow') === true) {
            document.body.appendChild(subElement);
            subElement.setAttribute('data-kt-menu-sub-overflow', 'true');
            data_1.default.set(itemElement, 'sub', subElement);
            data_1.default.set(subElement, 'item', itemElement);
            data_1.default.set(subElement, 'menu', this);
        }
        else {
            data_1.default.set(subElement, 'item', itemElement);
        }
        // Handle dropdown shown event
        this._fireEvent('dropdown.shown');
        this._dispatchEvent('dropdown.shown');
    };
    KTMenu.prototype._hideDropdown = function (itemElement) {
        var payload = { cancel: false };
        this._fireEvent('dropdown.hide', payload);
        this._dispatchEvent('dropdown.hide', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        subElement.style.zIndex = '';
        subElement.style.width = '';
        subElement.style.height = '';
        itemElement.classList.remove('show');
        itemElement.classList.remove('kt-menu-item-dropdown');
        subElement.classList.remove('show');
        // Append the sub back to it's parent
        if (this._getItemOption(itemElement, 'overflow') === true) {
            subElement.removeAttribute('data-kt-menu-sub-overflow');
            if (itemElement.classList.contains('kt-menu-item')) {
                itemElement.appendChild(subElement);
            }
            else {
                if (!this._element)
                    return;
                dom_1.default.insertAfter(this._element, itemElement);
            }
            data_1.default.remove(itemElement, 'sub');
            data_1.default.remove(subElement, 'item');
            data_1.default.remove(subElement, 'menu');
        }
        // Destroy popper(new)
        this._destroyDropdownPopper(itemElement);
        // Handle dropdown hidden event
        this._fireEvent('dropdown.hidden');
        this._dispatchEvent('dropdown.hidden');
    };
    KTMenu.prototype._initDropdownPopper = function (itemElement, subElement) {
        // Setup popper instance
        var reference;
        var attach = this._getItemOption(itemElement, 'attach');
        if (attach) {
            if (attach === 'parent') {
                reference = itemElement.parentNode;
            }
            else {
                reference = document.querySelector(attach);
            }
        }
        else {
            reference = itemElement;
        }
        if (reference) {
            var popper = (0, core_1.createPopper)(reference, subElement, this._getDropdownPopperConfig(itemElement));
            data_1.default.set(itemElement, 'popper', popper);
        }
    };
    KTMenu.prototype._destroyDropdownPopper = function (itemElement) {
        if (data_1.default.has(itemElement, 'popper')) {
            data_1.default.get(itemElement, 'popper').destroy();
            data_1.default.remove(itemElement, 'popper');
        }
    };
    KTMenu.prototype._getDropdownPopperConfig = function (itemElement) {
        var isRtl = dom_1.default.isRTL();
        // Placement
        var placement = this._getOption('dropdownPlacement');
        if (this._getItemOption(itemElement, 'placement')) {
            placement = this._getItemOption(itemElement, 'placement');
        }
        if (isRtl && this._getItemOption(itemElement, 'placementRtl')) {
            placement = this._getItemOption(itemElement, 'placementRtl');
        }
        // Offset
        var offsetValue = this._getOption('dropdownOffset');
        if (this._getItemOption(itemElement, 'offset')) {
            offsetValue = this._getItemOption(itemElement, 'offset');
        }
        if (isRtl && this._getItemOption(itemElement, 'offsetRtl')) {
            offsetValue = this._getItemOption(itemElement, 'offsetRtl');
        }
        var offset = offsetValue
            ? offsetValue
                .toString()
                .split(',')
                .map(function (value) { return parseInt(value.trim(), 10); })
            : [0, 0];
        // Strategy
        var strategy = this._getItemOption(itemElement, 'overflow') === true
            ? 'absolute'
            : 'fixed';
        var altAxis = this._getItemOption(itemElement, 'flip') !== false ? true : false;
        var popperConfig = {
            placement: placement,
            strategy: strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: offset,
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altAxis: altAxis,
                    },
                },
                {
                    name: 'flip',
                    options: {
                        flipVariations: false,
                    },
                },
            ],
        };
        return popperConfig;
    };
    KTMenu.prototype._showAccordion = function (itemElement) {
        var _this = this;
        var payload = { cancel: false };
        this._fireEvent('accordion.show', payload);
        this._dispatchEvent('accordion.show', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        var expandAll = this._getOption('accordionExpandAll');
        if (this._getItemOption(itemElement, 'expandAll') === true) {
            expandAll = true;
        }
        else if (this._getItemOption(itemElement, 'expandAll') === false) {
            expandAll = false;
        }
        else if (this._element &&
            this._getItemOption(this._element, 'expandAll') === true) {
            expandAll = true;
        }
        if (expandAll === false) {
            this._hideAccordions(itemElement);
        }
        if (data_1.default.has(itemElement, 'popper') === true) {
            this._hideDropdown(itemElement);
        }
        itemElement.classList.add('transitioning');
        subElement.style.height = '0px';
        dom_1.default.reflow(subElement);
        subElement.style.display = 'flex';
        subElement.style.overflow = 'hidden';
        subElement.style.height = "".concat(subElement.scrollHeight, "px");
        itemElement.classList.add('show');
        dom_1.default.transitionEnd(subElement, function () {
            itemElement.classList.remove('transitioning');
            subElement.classList.add('show');
            subElement.style.height = '';
            subElement.style.display = '';
            subElement.style.overflow = '';
            // Handle accordion hidden event
            _this._fireEvent('accordion.shown', payload);
            _this._dispatchEvent('accordion.shown', payload);
        });
    };
    KTMenu.prototype._hideAccordion = function (itemElement) {
        var _this = this;
        var payload = { cancel: false };
        this._fireEvent('accordion.hide', payload);
        this._dispatchEvent('accordion.hide', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        itemElement.classList.add('transitioning');
        itemElement.classList.remove('show');
        subElement.style.height = "".concat(subElement.scrollHeight, "px");
        dom_1.default.reflow(subElement);
        subElement.style.height = '0px';
        subElement.style.overflow = 'hidden';
        dom_1.default.transitionEnd(subElement, function () {
            subElement.style.overflow = '';
            itemElement.classList.remove('transitioning');
            subElement.classList.remove('show');
            // Handle accordion hidden event
            _this._fireEvent('accordion.hidden');
            _this._dispatchEvent('accordion.hidden');
        });
    };
    KTMenu.prototype._setActiveLink = function (linkElement) {
        var _this = this;
        var itemElement = this._getItemElement(linkElement);
        if (!itemElement)
            return;
        if (!this._element)
            return;
        var parentItems = this._getItemParentElements(itemElement);
        var activeLinks = this._element.querySelectorAll('.kt-menu-link.active');
        var activeParentItems = this._element.querySelectorAll('.kt-menu-item.here, .kt-menu-item.show');
        if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._showAccordion(itemElement);
        }
        else {
            itemElement.classList.add('here');
        }
        parentItems === null || parentItems === void 0 ? void 0 : parentItems.forEach(function (parentItem) {
            if (_this._getItemToggleMode(parentItem) === 'accordion') {
                _this._showAccordion(parentItem);
            }
            else {
                parentItem.classList.add('here');
            }
        });
        activeLinks === null || activeLinks === void 0 ? void 0 : activeLinks.forEach(function (activeLink) {
            activeLink.classList.remove('active');
        });
        activeParentItems === null || activeParentItems === void 0 ? void 0 : activeParentItems.forEach(function (activeParentItem) {
            if (activeParentItem.contains(itemElement) === false) {
                activeParentItem.classList.remove('here');
                activeParentItem.classList.remove('show');
            }
        });
        linkElement.classList.add('active');
    };
    KTMenu.prototype._getLinkByAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        if (!this._element)
            return null;
        var linkElement = this._element.querySelector("'.kt-menu-link[".concat(name, "=\"").concat(value, "\"]"));
        return linkElement && null;
    };
    KTMenu.prototype._hideAccordions = function (itemElement) {
        var _this = this;
        if (!this._element)
            return;
        var itemsToHide = this._element.querySelectorAll('.show[data-kt-menu-item-trigger]');
        itemsToHide.forEach(function (itemToHide) {
            if (_this._getItemToggleMode(itemToHide) === 'accordion' &&
                itemToHide !== itemElement &&
                (itemElement === null || itemElement === void 0 ? void 0 : itemElement.contains(itemToHide)) === false &&
                itemToHide.contains(itemElement) === false) {
                _this._hideAccordion(itemToHide);
            }
        });
    };
    KTMenu.prototype._getItemOption = function (element, name) {
        var attr;
        var value = null;
        name = utils_1.default.camelReverseCase(name);
        if (element && element.hasAttribute("data-kt-menu-item-".concat(name))) {
            attr = element.getAttribute("data-kt-menu-item-".concat(name));
            if (!attr)
                return null;
            value = this._getResponsiveOption(attr);
        }
        return value;
    };
    // General Methods
    KTMenu.prototype.getItemTriggerMode = function (itemElement) {
        return this._getItemOption(itemElement, 'trigger');
    };
    KTMenu.prototype.getItemToggleMode = function (element) {
        return this._getItemToggleMode(element);
    };
    KTMenu.prototype.click = function (element, event) {
        this._click(element, event);
    };
    KTMenu.prototype.link = function (element, event) {
        this._link(element, event);
    };
    KTMenu.prototype.dismiss = function (element) {
        this._dismiss(element);
    };
    KTMenu.prototype.mouseover = function (element) {
        this._mouseover(element);
    };
    KTMenu.prototype.mouseout = function (element) {
        this._mouseout(element);
    };
    KTMenu.prototype.show = function (itemElement) {
        return this._show(itemElement);
    };
    KTMenu.prototype.hide = function (itemElement) {
        this._hide(itemElement);
    };
    KTMenu.prototype.toggle = function (itemElement) {
        this._toggle(itemElement);
    };
    KTMenu.prototype.reset = function (itemElement) {
        this._reset(itemElement);
    };
    KTMenu.prototype.update = function () {
        this._update();
    };
    KTMenu.prototype.setActiveLink = function (link) {
        this._setActiveLink(link);
    };
    KTMenu.prototype.getLinkByAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        return this._getLinkByAttribute(value, name);
    };
    KTMenu.prototype.getItemLinkElement = function (itemElement) {
        return this._getItemLinkElement(itemElement);
    };
    KTMenu.prototype.getItemElement = function (element) {
        return this._getItemElement(element);
    };
    KTMenu.prototype.getItemSubElement = function (itemElement) {
        return this._getItemSubElement(itemElement);
    };
    KTMenu.prototype.getItemParentElements = function (itemElement) {
        return this._getItemParentElements(itemElement);
    };
    KTMenu.prototype.isItemSubShown = function (itemElement) {
        return this._isItemSubShown(itemElement);
    };
    KTMenu.prototype.isItemParentShown = function (itemElement) {
        return this._isItemParentShown(itemElement);
    };
    KTMenu.prototype.isItemDropdownPermanent = function (itemElement) {
        return this._isItemDropdownPermanent(itemElement);
    };
    KTMenu.prototype.disable = function () {
        this._disabled = true;
    };
    KTMenu.prototype.enable = function () {
        this._disabled = false;
    };
    KTMenu.prototype.hideAccordions = function (itemElement) {
        this._hideAccordions(itemElement);
    };
    // Statics methods
    KTMenu.getInstance = function (element) {
        if (!element) {
            return null;
        }
        // Element has menu DOM reference in it's DATA storage
        if (data_1.default.has(element, 'menu')) {
            return data_1.default.get(element, 'menu');
        }
        // Element has .kt-menu parent
        var menuElement = element.closest('[data-kt-menu]');
        if (menuElement && data_1.default.has(menuElement, 'menu')) {
            return data_1.default.get(menuElement, 'menu');
        }
        else if (menuElement &&
            menuElement.getAttribute('data-kt-menu') === 'true') {
            return new KTMenu(menuElement);
        }
        var subElement = element.closest('[data-kt-menu-sub-overflow="true"]');
        if (subElement && data_1.default.has(subElement, 'menu')) {
            return data_1.default.get(subElement, 'menu');
        }
        // Element has a parent with DOM reference to .kt-menu in it's DATA storage
        if (element.classList.contains('kt-menu-link') ||
            element.classList.contains('kt-menu-toggle')) {
            var subElement_1 = (element.closest('.kt-menu-dropdown') ||
                element.closest('.kt-menu-accordion'));
            if (data_1.default.has(subElement_1, 'menu')) {
                return data_1.default.get(subElement_1, 'menu');
            }
        }
        return null;
    };
    KTMenu.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTMenu(element, config);
    };
    KTMenu.hide = function (skipElement) {
        var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            var _a;
            var menu = KTMenu.getInstance(itemElement);
            if (menu &&
                menu.getItemToggleMode(itemElement) === 'dropdown') {
                if (skipElement) {
                    if (itemElement &&
                        ((_a = menu
                            .getItemSubElement(itemElement)) === null || _a === void 0 ? void 0 : _a.contains(skipElement)) === false &&
                        itemElement.contains(skipElement) === false &&
                        itemElement !== skipElement) {
                        menu.hide(itemElement);
                    }
                }
                else {
                    menu.hide(itemElement);
                }
            }
        });
    };
    KTMenu.updateDropdowns = function () {
        var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            if (data_1.default.has(itemElement, 'popper')) {
                data_1.default.get(itemElement, 'popper').forceUpdate();
            }
        });
    };
    KTMenu.updateByLinkAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        var elements = document.querySelectorAll('[data-kt-menu]');
        elements.forEach(function (element) {
            var menu = KTMenu.getInstance(element);
            if (menu) {
                var link = menu.getLinkByAttribute(value, name);
                if (link) {
                    menu.setActiveLink(link);
                }
            }
        });
    };
    KTMenu.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]:not([data-kt-menu-item-static="true"])');
            itemElements.forEach(function (itemElement) {
                var menu = KTMenu.getInstance(itemElement);
                if (menu &&
                    menu.getItemToggleMode(itemElement) === 'dropdown') {
                    var subElement = menu.getItemSubElement(itemElement);
                    if (itemElement === event.target ||
                        itemElement.contains(event.target)) {
                        return;
                    }
                    if (subElement &&
                        (subElement === event.target ||
                            subElement.contains(event.target))) {
                        return;
                    }
                    menu.hide(itemElement);
                }
            });
        });
    };
    KTMenu.findFocused = function () {
        var linkElement = document.querySelector('.kt-menu-link:focus,.kt-menu-toggle:focus');
        if (linkElement && dom_1.default.isVisible(linkElement)) {
            return linkElement;
        }
        else {
            return null;
        }
    };
    KTMenu.getFocusLink = function (linkElement, direction, preFocus) {
        if (preFocus === void 0) { preFocus = false; }
        if (!linkElement)
            return null;
        var itemElement = linkElement.parentElement;
        if (!itemElement || !itemElement.classList.contains('kt-menu-item'))
            return null;
        if (direction === 'next') {
            var nextElement = linkElement.nextElementSibling;
            if (nextElement &&
                (nextElement.matches('.kt-menu-accordion' + (!preFocus ? '.show' : '')) ||
                    nextElement.matches('.kt-menu-dropdown' + (!preFocus ? '.show' : '')))) {
                var itemElement2 = dom_1.default.child(nextElement, '.kt-menu-item');
                return dom_1.default.child(itemElement2, '.kt-menu-link');
            }
            else {
                var nextElement2 = itemElement.nextElementSibling;
                if (nextElement2 && nextElement2.classList.contains('kt-menu-item')) {
                    var nextLink = dom_1.default.child(nextElement2, '.kt-menu-link');
                    if (nextLink) {
                        return nextLink;
                    }
                }
            }
        }
        else {
            var prevElement = itemElement.previousElementSibling;
            if (prevElement) {
                if (prevElement && prevElement.classList.contains('kt-menu-item')) {
                    var nextLink = dom_1.default.child(prevElement, '.kt-menu-link');
                    if (nextLink) {
                        return nextLink;
                    }
                }
            }
            else {
                var parentElement = itemElement.parentElement;
                if (parentElement &&
                    (parentElement.matches('.kt-menu-accordion' + (!preFocus ? '.show' : '')) ||
                        parentElement.matches('.kt-menu-dropdown' + (!preFocus ? '.show' : '')))) {
                    var prevElement2 = parentElement.previousElementSibling;
                    if (prevElement2.classList.contains('kt-menu-link')) {
                        return prevElement2;
                    }
                }
            }
        }
        return null;
    };
    KTMenu.handleKeyboard = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            if (constants_1.KT_ACCESSIBILITY_KEYS.includes(event.key) &&
                !(event.ctrlKey || event.altKey || event.shiftKey)) {
                var currentFocused = _this.findFocused();
                if (!currentFocused)
                    return;
                if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                    var direction = ['ArrowDown', 'ArrowRight'].includes(event.key)
                        ? 'next'
                        : 'previouse';
                    var newFocusLink = _this.getFocusLink(currentFocused, direction);
                    event.preventDefault();
                    if (newFocusLink) {
                        newFocusLink.focus();
                        newFocusLink.classList.add('focus');
                    }
                }
                if (event.key === 'Enter') {
                    var menu = _this.getInstance(currentFocused);
                    var itemElement = menu.getItemElement(currentFocused);
                    var subShown = menu.isItemSubShown(itemElement);
                    if (!menu)
                        return;
                    if (menu.getItemToggleMode(itemElement) === 'accordion') {
                        currentFocused.dispatchEvent(new MouseEvent('click', {
                            bubbles: true,
                        }));
                    }
                    if (menu.getItemToggleMode(itemElement) === 'dropdown') {
                        if (menu.getItemTriggerMode(itemElement) === 'click') {
                            currentFocused.dispatchEvent(new MouseEvent('click', {
                                bubbles: true,
                            }));
                        }
                        else {
                            if (subShown) {
                                currentFocused.dispatchEvent(new MouseEvent('mouseout', {
                                    bubbles: true,
                                }));
                            }
                            else {
                                currentFocused.dispatchEvent(new MouseEvent('mouseover', {
                                    bubbles: true,
                                }));
                            }
                        }
                    }
                    if (subShown) {
                        var subFocus = _this.getFocusLink(currentFocused, 'next', true);
                        if (subFocus) {
                            subFocus.focus();
                        }
                    }
                    else {
                        currentFocused.focus();
                    }
                    event.preventDefault();
                }
                if (event.key === 'Escape') {
                    var items = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]:not([data-kt-menu-item-static="true"])');
                    items.forEach(function (item) {
                        var menu = KTMenu.getInstance(item);
                        if (menu &&
                            menu.getItemToggleMode(item) === 'dropdown') {
                            menu.hide(item);
                        }
                    });
                }
            }
        }, false);
    };
    KTMenu.handleMouseover = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-item-trigger], .kt-menu-dropdown', 'mouseover', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null && menu.getItemToggleMode(target) === 'dropdown') {
                return menu.mouseover(target);
            }
        });
    };
    KTMenu.handleMouseout = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-item-trigger], .kt-menu-dropdown', 'mouseout', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null && menu.getItemToggleMode(target) === 'dropdown') {
                return menu.mouseout(target);
            }
        });
    };
    KTMenu.handleClick = function () {
        event_handler_1.default.on(document.body, '.kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-link, .kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-label .kt-menu-toggle, .kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-toggle, [data-kt-menu-item-trigger]:not(.kt-menu-item):not([data-kt-menu-item-trigger="auto"])', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                return menu.click(target, event);
            }
        });
        event_handler_1.default.on(document.body, '.kt-menu-item:not([data-kt-menu-item-trigger]) > .kt-menu-link', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                if (target.tagName == 'a' || target.hasAttribute('href')) {
                    menu.dismiss(target);
                }
                return menu.link(target, event);
            }
        });
    };
    KTMenu.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-dismiss="true"]', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                return menu.dismiss(target);
            }
        });
    };
    KTMenu.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                // Locate and update Offcanvas instances on window resize
                var elements = document.querySelectorAll('[data-kt-menu]');
                elements.forEach(function (element) {
                    var _a;
                    (_a = KTMenu.getInstance(element)) === null || _a === void 0 ? void 0 : _a.update();
                });
            }, 200);
        });
    };
    KTMenu.initHandlers = function () {
        this.handleDismiss();
        this.handleClickAway();
        this.handleKeyboard();
        this.handleMouseover();
        this.handleMouseout();
        this.handleClick();
        this.handleResize();
    };
    /**
     * Creates menu instances for all menu elements in the DOM.
     * This method finds all elements with [data-kt-menu] attribute and initializes them.
     */
    KTMenu.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-menu]:not([data-kt-menu=false])');
        elements.forEach(function (element) {
            new KTMenu(element);
        });
    };
    /**
     * Initializes the menu system.
     * Creates menu instances and sets up event handlers.
     * Note: Event handlers are only set up once due to global initialization flag.
     * This can cause issues with Livewire navigation where new elements need handlers.
     */
    /**
     * Sets up event handlers for menu interactions.
     * This method can be called multiple times safely.
     */
    KTMenu.setupHandlers = function () {
        KTMenu.initHandlers();
    };
    /**
     * Initializes the menu system with proper cleanup and re-initialization support.
     * This method handles both initial load and Livewire navigation scenarios.
     */
    KTMenu.init = function () {
        // Clean up existing instances to prevent memory leaks
        KTMenu.cleanup();
        // Create new menu instances
        KTMenu.createInstances();
        // Always set up handlers to ensure new elements have event listeners
        KTMenu.setupHandlers();
    };
    /**
     * Cleans up existing menu instances before re-initialization.
     * This method prevents memory leaks and duplicate event listeners.
     *
     * @param skipElement - Optional element to skip during cleanup
     */
    KTMenu.cleanup = function (skipElement) {
        var elements = document.querySelectorAll('[data-kt-menu]');
        elements.forEach(function (element) {
            if (skipElement && element === skipElement) {
                return; // Skip this element
            }
            var menu = KTMenu.getInstance(element);
            if (menu) {
                menu.destroy();
            }
        });
    };
    /**
     * Destroys a specific menu instance and cleans up its resources.
     * This method properly disposes of menu instances to prevent memory leaks.
     */
    KTMenu.prototype.destroy = function () {
        // Dispose Popper instance if it exists
        if (data_1.default.has(this._element, 'popper')) {
            var popper = data_1.default.get(this._element, 'popper');
            if (popper && typeof popper.destroy === 'function') {
                popper.destroy();
            }
            data_1.default.remove(this._element, 'popper');
        }
        // Remove data attributes and references
        data_1.default.remove(this._element, this._name);
        // Remove menu reference from sub-elements
        var subElements = this._element.querySelectorAll('.kt-menu-dropdown, .kt-menu-accordion');
        subElements.forEach(function (subElement) {
            data_1.default.remove(subElement, 'menu');
            data_1.default.remove(subElement, 'item');
        });
        // Remove overflow elements from body
        var overflowElements = document.querySelectorAll('[data-kt-menu-sub-overflow="true"]');
        overflowElements.forEach(function (overflowElement) {
            if (overflowElement.parentNode === document.body) {
                document.body.removeChild(overflowElement);
            }
        });
    };
    return KTMenu;
}(component_1.default));
exports.KTMenu = KTMenu;


/***/ }),

/***/ "./src/core/helpers/data.ts":
/*!**********************************!*\
  !*** ./src/core/helpers/data.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTElementMap = new Map();
var KTData = {
    set: function (element, key, value) {
        if (!KTElementMap.has(element)) {
            KTElementMap.set(element, new Map());
        }
        var valueMap = KTElementMap.get(element);
        valueMap.set(key, value);
    },
    get: function (element, key) {
        if (KTElementMap.has(element)) {
            return KTElementMap.get(element).get(key) || null;
        }
        return null;
    },
    has: function (element, key) {
        return KTElementMap.has(element) && KTElementMap.get(element).has(key);
    },
    remove: function (element, key) {
        if (!KTElementMap.has(element) || !KTElementMap.get(element).has(key)) {
            return;
        }
        var valueMap = KTElementMap.get(element);
        valueMap.delete(key);
        if (valueMap.size === 0) {
            KTElementMap.delete(element);
        }
    }
};
exports["default"] = KTData;


/***/ }),

/***/ "./src/core/helpers/dom.ts":
/*!*********************************!*\
  !*** ./src/core/helpers/dom.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable max-len */
var utils_1 = __webpack_require__(/*! ./utils */ "./src/core/helpers/utils.ts");
var KTDom = {
    isRTL: function () {
        var htmlTag = document.documentElement; // Access the <html> tag
        // Check if the "dir" attribute is present and its value is "rtl"
        var dir = htmlTag.getAttribute('dir');
        return dir === 'rtl';
    },
    isElement: function (element) {
        if (element && element instanceof HTMLElement) {
            return true;
        }
        else {
            return false;
        }
    },
    getElement: function (element) {
        if (this.isElement(element)) {
            return element;
        }
        if (element && element.length > 0) {
            return document.querySelector(utils_1.default.parseSelector(element));
        }
        return null;
    },
    remove: function (element) {
        if (this.isElement(element) && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    hasClass: function (element, className) {
        // Split classNames string into an array of individual class names
        var classes = className.split(' ');
        // Loop through each class name
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var className_1 = classes_1[_i];
            // Check if the element has the current class name
            if (!element.classList.contains(className_1)) {
                // Return false if any class is missing
                return false;
            }
        }
        // Return true if all classes are present
        return true;
    },
    addClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                if (classNames[i] && classNames[i].length > 0) {
                    element.classList.add(classNames[i].trim());
                }
            }
        }
        else if (!this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className += ' ' + classNames[x].trim();
            }
        }
    },
    removeClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                element.classList.remove(classNames[i].trim());
            }
        }
        else if (this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className = element.className.replace(new RegExp('\\b' + classNames[x].trim() + '\\b', 'g'), '');
            }
        }
    },
    getCssProp: function (element, prop) {
        return (element ? window.getComputedStyle(element).getPropertyValue(prop) : '').replace(' ', '');
    },
    setCssProp: function (element, prop, value) {
        if (element) {
            window.getComputedStyle(element).setProperty(prop, value);
        }
    },
    offsetOld: function (element) {
        if (!element)
            return { top: 0, left: 0, right: 0, bottom: 0 };
        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        var rect = element.getBoundingClientRect();
        var view = element.ownerDocument.defaultView;
        return {
            top: rect.top + ((view === null || view === void 0 ? void 0 : view.scrollY) || 0),
            left: rect.left,
            right: window.innerWidth - rect.right,
            bottom: 0
        };
    },
    offset: function (element) {
        if (!element)
            return { top: 0, left: 0, right: 0, bottom: 0 };
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: window.innerWidth - rect.right,
            bottom: window.innerHeight - rect.top,
        };
    },
    getIndex: function (element) {
        var _a;
        var children = Array.from(((_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.children) || []);
        return children.indexOf(element);
    },
    parents: function (element, selector) {
        var parents = [];
        // Push each parent element to the array
        for (element && element !== document.documentElement; (element = element.parentElement);) {
            if (selector) {
                if (element.matches(selector)) {
                    parents.push(element);
                }
                continue;
            }
            parents.push(element);
        }
        // Return our parent array
        return parents;
    },
    siblings: function (element) {
        var parent = element.parentNode;
        if (!parent)
            return [];
        return Array.from(parent.children).filter(function (child) { return child !== element; });
    },
    children: function (element, selector) {
        if (!element || !element.childNodes) {
            return null;
        }
        var result = [];
        var l = element.childNodes.length;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (element.childNodes[i].nodeType == 1 && element.childNodes[i].matches(selector)) {
                result.push(element.childNodes[i]);
            }
        }
        return result;
    },
    child: function (element, selector) {
        var children = KTDom.children(element, selector);
        return children ? children[0] : null;
    },
    isVisible: function (element) {
        if (!this.isElement(element) || element.getClientRects().length === 0) {
            return false;
        }
        // eslint-disable-next-line max-len
        return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    },
    isDisabled: function (element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        if (element.classList.contains('disabled')) {
            return true;
        }
        if (typeof element.disabled !== 'undefined') {
            return element.disabled;
        }
        return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    },
    transitionEnd: function (element, callback) {
        var duration = this.getCSSTransitionDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    animationEnd: function (element, callback) {
        var duration = this.getCSSAnimationDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    getCSSTransitionDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).transitionDuration)) * 1000;
    },
    getCSSAnimationDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).animationDuration)) * 1000;
    },
    reflow: function (element) {
        element.offsetHeight;
    },
    insertAfter: function (element, referenceNode) {
        var parentNode = referenceNode.parentNode;
        if (parentNode) {
            parentNode.insertBefore(element, referenceNode.nextSibling);
        }
    },
    getHighestZindex: function (element) {
        var position, value;
        while (element && element !== document.documentElement) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = element.style.position;
            if (position === "absolute" || position === "relative" || position === "fixed") {
                // IE returns 0 when zIndex is not specified
                // other browsers return a string
                // we ignore the case of nested elements with an explicit value of 0
                // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                value = parseInt(element.style.zIndex);
                if (!isNaN(value) && value !== 0) {
                    return value;
                }
            }
            element = element.parentNode;
        }
        return 1;
    },
    isParentOrElementHidden: function (element) {
        if (!element) {
            return false;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.display === 'none') {
            return true;
        }
        return this.isParentOrElementHidden(element.parentElement);
    },
    getViewPort: function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    getScrollTop: function () {
        return (document.scrollingElement || document.documentElement).scrollTop;
    },
    isInViewport: function (element) {
        var rect = element.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    },
    isPartiallyInViewport: function (element) {
        var x = element.getBoundingClientRect().left;
        var y = element.getBoundingClientRect().top;
        var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var w = element.clientWidth;
        var h = element.clientHeight;
        return ((y < hw && y + h > 0) && (x < ww && x + w > 0));
    },
    isVisibleInParent: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Check if the child element is visible
        if (child.offsetParent === null || getComputedStyle(child).visibility === 'hidden' || getComputedStyle(child).display === 'none') {
            return false;
        }
        // Check if the child is within the vertical bounds of the parent
        var isVisibleVertically = childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
        // Check if the child is within the horizontal bounds of the parent
        var isVisibleHorizontally = childRect.left >= parentRect.left && childRect.right <= parentRect.right;
        return isVisibleVertically && isVisibleHorizontally;
    },
    getRelativeTopPosition: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Calculate the relative top position
        var relativeTop = childRect.top - parentRect.top;
        return relativeTop;
    },
    getDataAttributes: function (element, prefix) {
        if (!element) {
            return {};
        }
        prefix = utils_1.default.camelCase(prefix);
        var attributes = {};
        var keys = Object.keys(element.dataset).filter(function (key) { return key.startsWith(prefix); });
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var normalizedKey = key.replace(prefix, '');
            normalizedKey = utils_1.default.uncapitalize(normalizedKey);
            attributes[normalizedKey] = utils_1.default.parseDataAttribute(element.dataset[key]);
        }
        return attributes;
    },
    /**
   * Handles Livewire navigation events for SPA-style navigation.
   * This function is called when Livewire completes a navigation event.
   *
   * @param callback - Function to execute after Livewire navigation
   */
    handleLivewireNavigation: function (callback) {
        document.addEventListener("livewire:navigated", function () {
            // Small delay to ensure DOM is fully updated after navigation
            setTimeout(function () {
                callback();
            }, 50);
        });
    },
    /**
     * Executes a callback function when the DOM is ready or after Livewire navigation.
     * This function handles both initial page load and Livewire SPA navigation scenarios.
     *
     * @param callback - Function to execute when DOM is ready
     */
    ready: function (callback) {
        if (document.readyState === 'loading') {
            // Handle initial page load
            document.addEventListener('DOMContentLoaded', function () {
                callback();
            });
            // Handle Livewire navigation events for SPA-style navigation
            this.handleLivewireNavigation(callback);
        }
        else {
            // DOM is already ready, execute callback immediately
            callback();
        }
    }
};
exports["default"] = KTDom;


/***/ }),

/***/ "./src/core/helpers/event-handler.ts":
/*!*******************************************!*\
  !*** ./src/core/helpers/event-handler.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/core/helpers/utils.ts");
var KTDelegatedEventHandlers = {};
var KTEventHandler = {
    on: function (element, selector, eventName, handler) {
        var _this = this;
        if (element === null) {
            return null;
        }
        var eventId = utils_1.default.geUID('event');
        KTDelegatedEventHandlers[eventId] = function (event) {
            var targets = element.querySelectorAll(selector);
            var target = event.target;
            while (target && target !== element) {
                for (var i = 0, j = targets.length; i < j; i++) {
                    if (target === targets[i]) {
                        handler.call(_this, event, target);
                    }
                }
                target = target.parentNode;
            }
        };
        element.addEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        return eventId;
    },
    off: function (element, eventName, eventId) {
        if (!element || KTDelegatedEventHandlers[eventId] === null) {
            return;
        }
        element.removeEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        delete KTDelegatedEventHandlers[eventId];
    }
};
exports["default"] = KTEventHandler;


/***/ }),

/***/ "./src/core/helpers/utils.ts":
/*!***********************************!*\
  !*** ./src/core/helpers/utils.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTUtils = {
    geUID: function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return prefix + Math.floor(Math.random() * new Date().getTime());
    },
    getBreakpoint: function (breakpoint) {
        var breakpoints = [
            '--breakpoint-sm',
            '--breakpoint-md',
            '--breakpoint-lg',
            '--breakpoint-xl',
            '--breakpoint-2xl',
        ];
        var value = KTUtils.getCssVar("--breakpoint-".concat(breakpoint));
        var isRem = value.trim().endsWith('rem');
        if (value) {
            return parseInt(value.trim()) * (isRem ? 16 : 1);
        }
        else {
            return -1;
        }
    },
    getCssVar: function (variable) {
        var hex = getComputedStyle(document.documentElement).getPropertyValue(variable);
        if (hex && hex.length > 0) {
            hex = hex.trim();
        }
        return hex;
    },
    parseDataAttribute: function (value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (value === Number(value).toString()) {
            return Number(value);
        }
        if (value === '' || value === 'null') {
            return null;
        }
        if (typeof value !== 'string') {
            return value;
        }
        try {
            return KTUtils.parseJson(value);
        }
        catch (_a) {
            return value;
        }
    },
    parseJson: function (value) {
        return value && value.length > 0
            ? JSON.parse(decodeURIComponent(value))
            : null;
    },
    parseSelector: function (selector) {
        if (selector && window.CSS && window.CSS.escape) {
            // Escape any IDs in the selector using CSS.escape
            selector = selector.replace(/#([^\s"#']+)/g, function (match, id) { return "#".concat(window.CSS.escape(id)); });
        }
        return selector;
    },
    capitalize: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    uncapitalize: function (value) {
        return value.charAt(0).toLowerCase() + value.slice(1);
    },
    camelCase: function (value) {
        return value.replace(/-([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        });
    },
    camelReverseCase: function (str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    isRTL: function () {
        var htmlElement = document.querySelector('html');
        return Boolean(htmlElement && htmlElement.getAttribute('direction') === 'rtl');
    },
    throttle: function (timer, func, delay) {
        // If setTimeout is already scheduled, no need to do anything
        if (timer) {
            return;
        }
        // Schedule a setTimeout after delay seconds
        timer = setTimeout(function () {
            func();
            // Once setTimeout function execution is finished, timerId = undefined so that in <br>
            // the next scroll event function execution can be scheduled by the setTimeout
            clearTimeout(timer);
        }, delay);
    },
    checksum: function (value) {
        var hash = 0;
        for (var i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
        }
        return ('0000000' + (hash >>> 0).toString(16)).slice(-8);
    },
};
exports["default"] = KTUtils;


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/

/*
 * Metronic
 * @author: Keenthemes
 * Copyright 2024 Keenthemes
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTMenu = void 0;
var dom_1 = __webpack_require__(/*! ./helpers/dom */ "./src/core/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ./helpers/utils */ "./src/core/helpers/utils.ts");
var event_handler_1 = __webpack_require__(/*! ./helpers/event-handler */ "./src/core/helpers/event-handler.ts");
var menu_1 = __webpack_require__(/*! ./components/menu */ "./src/core/components/menu/index.ts");
var menu_2 = __webpack_require__(/*! ./components/menu */ "./src/core/components/menu/index.ts");
Object.defineProperty(exports, "KTMenu", ({ enumerable: true, get: function () { return menu_2.KTMenu; } }));
var KTComponents = {
    /**
     * Initializes all KT components.
     * This method is called on initial page load and after Livewire navigation.
     */
    init: function () {
        try {
            menu_1.KTMenu.init();
        }
        catch (error) {
            console.warn('KTMenu initialization failed:', error);
        }
    },
};
window.KTUtils = utils_1.default;
window.KTDom = dom_1.default;
window.KTEventHandler = event_handler_1.default;
window.KTMenu = menu_1.KTMenu;
window.KTComponents = KTComponents;
exports["default"] = KTComponents;
dom_1.default.ready(function () {
    KTComponents.init();
});

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});