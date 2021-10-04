import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PlacesNavigator from './navigation/PlacesNavigator'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import placesReducer from './store/reducers/places-reducer';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { init } from './helpers/db';


init()
.then(() => {
  console.log("initializing database")
})
.catch(err => {
  console.log(err)
})

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
 
});
