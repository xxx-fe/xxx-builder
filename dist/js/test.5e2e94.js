webpackJsonp([4,6],[function(e,t,a){e.exports=a(7)},,,,,,,function(e,t,a){"use strict";a(8);a(10);ReactDOM.render(React.createElement(CommentBox,null),document.getElementById("content"));var n=React.createClass({displayName:"CommentBox1",render:function(){return React.createElement("div",{className:"commentBox"},this.props.name,React.createElement(CommentBox,null,React.createElement("h1",null,"123test")))}});ReactDOM.render(React.createElement(n,{name:"yy"}),document.getElementById("content1"));var r=React.createClass({displayName:"CommentForm",getInitialState:function(){return{author:"",text:""}},handleAuthorChange:function(e){this.setState({author:e.target.value})},handleTextChange:function(e){this.setState({text:e.target.value})},handleSubmit:function(e){e.preventDefault();var t=this.state.author.trim(),a=this.state.text.trim();a&&t&&this.setState({author:"",text:""})},render:function(){return React.createElement("form",{className:"commentForm",onSubmit:this.handleSubmit},React.createElement("input",{type:"text",placeholder:"Your name",value:this.state.author,onChange:this.handleAuthorChange}),React.createElement("input",{type:"text",placeholder:"Say something...",value:this.state.text,onChange:this.handleTextChange}),this.state.text,React.createElement("input",{type:"submit",value:"Post"}))}});ReactDOM.render(React.createElement(r,null),document.getElementById("form"))},function(e,t){},,function(e,t){e.exports="<a> test </a>"}]);
//# sourceMappingURL=test.5e2e94.js.map