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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    @filename: test.js
	    @description test
	*/

	__webpack_require__(2);

	ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('content'));

	//嵌套
	var CommentBox1 = React.createClass({ displayName: "CommentBox1",
	  render: function () {
	    return React.createElement("div", { className: "commentBox" }, this.props.name, React.createElement(CommentBox, null, React.createElement("h1", null, "brsyqd")));
	  }
	});
	ReactDOM.render(React.createElement(CommentBox1, { name: "yy" }), document.getElementById('content1'));

	//方法
	var CommentForm = React.createClass({ displayName: "CommentForm",
	  //设置默认数据  state数据
	  getInitialState: function () {
	    return { author: '', text: '' };
	  },
	  handleAuthorChange: function (e) {
	    this.setState({ author: e.target.value });
	  },
	  handleTextChange: function (e) {
	    this.setState({ text: e.target.value });
	  },
	  handleSubmit: function (e) {
	    e.preventDefault();
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    // TODO: send request to the server
	    this.setState({ author: '', text: '' });
	  },
	  render: function () {
	    return React.createElement("form", { className: "commentForm", onSubmit: this.handleSubmit }, React.createElement("input", {
	      type: "text",
	      placeholder: "Your name",
	      value: this.state.author,
	      onChange: this.handleAuthorChange }), React.createElement("input", {
	      type: "text",
	      placeholder: "Say something...",
	      value: this.state.text,
	      onChange: this.handleTextChange }), this.state.text, React.createElement("input", { type: "submit", value: "Post" }));
	  }
	});

	ReactDOM.render(React.createElement(CommentForm, null), document.getElementById('form'));

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);