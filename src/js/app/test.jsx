/*
    @filename: test.js
    @description test
*/

require('../../less/index.less');

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);


//嵌套
var CommentBox1 = React.createClass({
    render: function() {
      return (
        <div className="commentBox">
          {this.props.name}
          <CommentBox><h1>brsyqd</h1></CommentBox>
        </div>
      );
    }
});
ReactDOM.render(
    <CommentBox1 name="yy" />,
    document.getElementById('content1')
);


//方法
var CommentForm = React.createClass({
//设置默认数据  state数据
getInitialState: function() {
  return {author: '', text: ''};
},
handleAuthorChange: function(e) {
  this.setState({author: e.target.value});
},
handleTextChange: function(e) {
  this.setState({text: e.target.value});
},
handleSubmit: function(e) {
  e.preventDefault();
  var author = this.state.author.trim();
  var text = this.state.text.trim();
  if (!text || !author) {
    return;
  }
  // TODO: send request to the server
  this.setState({author: '', text: ''});
},
render: function() {
  return (
    <form className="commentForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={this.state.author}
        onChange={this.handleAuthorChange}
      />
      <input
        type="text"
        placeholder="Say something..."
        value={this.state.text}
        onChange={this.handleTextChange}
      />
      {this.state.text}
      <input type="submit" value="Post" />
    </form>
  );
}
});

ReactDOM.render(
    <CommentForm />,
    document.getElementById('form')
);
