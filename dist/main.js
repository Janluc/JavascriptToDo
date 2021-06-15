/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projectClass.js":
/*!*****************************!*\
  !*** ./src/projectClass.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.toDoList = [];
  }

}

/***/ }),

/***/ "./src/projectView.js":
/*!****************************!*\
  !*** ./src/projectView.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projectClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectClass */ "./src/projectClass.js");
/* harmony import */ var _toDoClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDoClass */ "./src/toDoClass.js");




let createNav = (project) => {
  let main = document.querySelector("#content");
  let test = document.createElement('h1')
  test.textContent = project.projectName;
  
  main.append(test)

}
let createContent = (project) => {
  let main = document.querySelector("#content");
  project.toDoList.forEach(item => {
    let div = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let dueDate = document.createElement('p');
    let priority = document.createElement('p');

    title.textContent = item.title;
    description.textContent = item.description;
    dueDate.textContent = item.dueDate;
    priority.textContent = item.priority;

    div.append(title, description, dueDate, priority);
    main.append(div);
  });
  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({createNav, createContent});

/***/ }),

/***/ "./src/toDoClass.js":
/*!**************************!*\
  !*** ./src/toDoClass.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoItem)
/* harmony export */ });
class ToDoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projectView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectView */ "./src/projectView.js");
/* harmony import */ var _projectClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectClass */ "./src/projectClass.js");
/* harmony import */ var _toDoClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toDoClass */ "./src/toDoClass.js");





let defaultProject = new _projectClass__WEBPACK_IMPORTED_MODULE_1__.default("Default!");
defaultProject.toDoList.push(new _toDoClass__WEBPACK_IMPORTED_MODULE_2__.default("Test", "Some desc", "date", 1)); 

_projectView__WEBPACK_IMPORTED_MODULE_0__.default.createNav(defaultProject);
_projectView__WEBPACK_IMPORTED_MODULE_0__.default.createContent(defaultProject);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLy4vc3JjL3Byb2plY3RDbGFzcy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLy4vc3JjL3Byb2plY3RWaWV3LmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8vLi9zcmMvdG9Eb0NsYXNzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2phdmFzY3JpcHQtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXRvLWRvLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ0Y7OztBQUduQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsaUVBQWUsQ0FBQyx5QkFBeUIsRTs7Ozs7Ozs7Ozs7Ozs7QUNoQzFCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ053QztBQUNIO0FBQ0g7OztBQUdsQyx5QkFBeUIsa0RBQU87QUFDaEMsaUNBQWlDLCtDQUFRLGtDOztBQUV6QywyREFBcUI7QUFDckIsK0RBQXlCLGlCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9qZWN0TmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xyXG4gICAgdGhpcy50b0RvTGlzdCA9IFtdO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3RDbGFzcyc7XHJcbmltcG9ydCBUb0RvSXRlbSBmcm9tICcuL3RvRG9DbGFzcyc7XHJcblxyXG5cclxubGV0IGNyZWF0ZU5hdiA9IChwcm9qZWN0KSA9PiB7XHJcbiAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XHJcbiAgbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXHJcbiAgdGVzdC50ZXh0Q29udGVudCA9IHByb2plY3QucHJvamVjdE5hbWU7XHJcbiAgXHJcbiAgbWFpbi5hcHBlbmQodGVzdClcclxuXHJcbn1cclxubGV0IGNyZWF0ZUNvbnRlbnQgPSAocHJvamVjdCkgPT4ge1xyXG4gIGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xyXG4gIHByb2plY3QudG9Eb0xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IGl0ZW0udGl0bGU7XHJcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGl0ZW0uZGVzY3JpcHRpb247XHJcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gaXRlbS5kdWVEYXRlO1xyXG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBpdGVtLnByaW9yaXR5O1xyXG5cclxuICAgIGRpdi5hcHBlbmQodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XHJcbiAgICBtYWluLmFwcGVuZChkaXYpO1xyXG4gIH0pO1xyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y3JlYXRlTmF2LCBjcmVhdGVDb250ZW50fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvSXRlbSB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwcm9qZWN0VmlldyBmcm9tIFwiLi9wcm9qZWN0Vmlld1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0Q2xhc3NcIjtcclxuaW1wb3J0IFRvRG9JdGVtIGZyb20gXCIuL3RvRG9DbGFzc1wiXHJcblxyXG5cclxubGV0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0IVwiKTtcclxuZGVmYXVsdFByb2plY3QudG9Eb0xpc3QucHVzaChuZXcgVG9Eb0l0ZW0oXCJUZXN0XCIsIFwiU29tZSBkZXNjXCIsIFwiZGF0ZVwiLCAxKSk7IFxyXG5cclxucHJvamVjdFZpZXcuY3JlYXRlTmF2KGRlZmF1bHRQcm9qZWN0KTtcclxucHJvamVjdFZpZXcuY3JlYXRlQ29udGVudChkZWZhdWx0UHJvamVjdCk7Il0sInNvdXJjZVJvb3QiOiIifQ==