import ReactDOM from 'react-dom';
import React from 'react'
import CommentBox from './components/CommentBox'

var data = [
  {author: 'Pete Hunt', text: 'This is one comment'},
  {author: 'Jordan Walke', text: 'This is *another* comment2'}
];

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('container')
);