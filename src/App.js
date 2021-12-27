import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import authReducer from './store/reducers/auth';
import MainNavigator from './navigation/MainNavigator';

const rootReducer = combineReducers({user: authReducer});
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};
export default App;
