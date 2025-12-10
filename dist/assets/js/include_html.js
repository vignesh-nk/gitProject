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
  !*** ./src/assets/js/include_html.js ***!
  \***************************************/
document.addEventListener("DOMContentLoaded", function () {
  includeHTML("footer-container", "../html/footer.html");
  includeHTML("header_menu", "../html/header.html");
});
function includeHTML(elementId, filePath) {
  fetch(filePath).then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error! status: ".concat(response.status));
    }
    return response.text();
  }).then(function (data) {
    var element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = data;

      // Update the current year after the footer is loaded
      var currentYear = new Date().getFullYear();
      var currentYearElement = document.getElementById('current-year');
      if (currentYearElement) {
        currentYearElement.textContent = currentYear;
      }
    } else {
      console.error("❌ Element not found:", elementId);
    }
  })["catch"](function (error) {
    return console.error("❌ Error loading file:", filePath, error);
  });
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});