/*
    @filename: test.js
    @description test
*/

require('../../less/index.less');


ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
);


//组件
var CommentBox = React.createClass({
    render: function() {
      return (
        <div className="commentBox">
          Hello, world! I am a CommentBox.
          {this.props.children}
        </div>
      );
    }
});
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
          <CommentBox><h1>brs</h1></CommentBox>
        </div>
      );
    }
});
ReactDOM.render(
    <CommentBox1 name="yy" />,
    document.getElementById('content1')
);
