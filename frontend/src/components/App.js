import React from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';

const App = (props) => {
  return (
    <div className='center'>
      <HomePage />
    </div>
  );
};

export default App;

const appDiv = document.getElementById('app');
render(<App />, appDiv);
