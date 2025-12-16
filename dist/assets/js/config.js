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

/***/ "./src/assets/js/config.js":
/*!*********************************!*\
  !*** ./src/assets/js/config.js ***!
  \*********************************/
/***/ (function(module) {

window.BASE_URL = "https://apicr.suturenote.ai/";
var BASE_URL = "https://apicr.suturenote.ai/";
window.BASE_URL_KINESIS = "https://edacr.suturenote.ai/";
var BASE_URL_KINESIS = "https://edacr.suturenote.ai/";
window.BASE_PHRASE_URL = "https://create.suturenote.ai/dot_phrase/";
var BASE_PHRASE_URL = "https://create.suturenote.ai/dot_phrase/";
window.BASE_GOOGLE_REDIRECT_URL = "https://create.suturenote.ai/dist/html/patient_summary.html";
var BASE_GOOGLE_REDIRECT_URL = "https://create.suturenote.ai/dist/html/patient_summary.html";
if ( true && module.exports) {
  module.exports = {
    BASE_URL: window.BASE_URL,
    BASE_URL_KINESIS: window.BASE_URL_KINESIS,
    BASE_PHRASE_URL: window.BASE_PHRASE_URL,
    BASE_GOOGLE_REDIRECT_URL: window.BASE_GOOGLE_REDIRECT_URL
  };
}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/config.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});