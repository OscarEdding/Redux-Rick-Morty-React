import React from 'react';
import Characters from './components/Characters';

import {Provider} from 'react-redux'
import generateStore from './redux/store';

function App() {

  const store = generateStore()
  return (
    <Provider store={store}>
      <div className="container mt-3">
        <Characters />
      </div>
    </Provider>
  );
}

export default App;
