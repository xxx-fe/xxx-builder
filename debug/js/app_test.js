/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "debug/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    @filename: test.js
	    @description test
	*/

	__webpack_require__(3);

	ReactDOM.render(React.createElement("h1", null, "Hello, world!"), document.getElementById('example'));

	//组件
	var CommentBox = React.createClass({ displayName: "CommentBox",
	    render: function () {
	        return React.createElement("div", { className: "commentBox" }, "Hello, world! I am a CommentBox.", this.props.children);
	    }
	});
	ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('content'));

	//嵌套
	var CommentBox1 = React.createClass({ displayName: "CommentBox1",
	    render: function () {
	        return React.createElement("div", { className: "commentBox" }, this.props.name, React.createElement(CommentBox, null, React.createElement("h1", null, "brs")));
	    }
	});
	ReactDOM.render(React.createElement(CommentBox1, { name: "yy" }), document.getElementById('content1'));

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);