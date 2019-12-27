//redux store


import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};

//update app.js

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
. . .

const store = ConfigureStore();

. . .
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>