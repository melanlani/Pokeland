import { combineReducers } from 'redux';

import accounts from './accounts';
import pokemons from './pokemons';
// import messages from './messages';

const reducers = combineReducers({
  accounts,
  pokemons
  // messages
})

export default reducers;
