import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

export default {
  start: () => ReactDom.render(<App />, document.getElementById('app')),
};
