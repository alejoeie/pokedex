import React from 'react'
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './components/AppNavigator';
import Favorites from './containers/Favorites';
import Pokedex from './containers/Pokedex';
import PokemonDetails from './containers/PokemonDetails';
import { persistor, store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <AppNavigator />
          <Route path="/" component={Pokedex} exact />
          <Route exact path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/favorites" component={Favorites} exact />
        </div>
      </PersistGate>

    </Provider>
  )
}

export default App