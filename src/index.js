import ReactDOM from 'react-dom';
import React from 'react'
import CommentBox from './components/CommentBox'

ReactDOM.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('container')
);