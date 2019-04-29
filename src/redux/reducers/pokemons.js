const initialState = {
  pokemons: [],
  categories: [],
  pending: false,
  error: ''
}

export default pokemons = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON_PENDING':
      return {
        ...state,
        pokemons: [],
        pending: true
      };
    case 'GET_POKEMON_FULFILLED':
      return {
        ...state,
        pokemons: action.payload.data.result.data,
        pending: false,
      };
    case 'GET_POKEMON_REJECTED':
      return {
        error: action.payload.data,
        pending: false,
      };
    case 'GET_POKEMONUSER_FULFILLED':
      return {
        ...state,
        pokemons: action.payload.data.result,
        pending: true,
      };

    case 'GET_CATEGORIES_PENDING':
      return {
        categories: [],
        pending: true
      };
    case 'GET_CATEGORIES_FULFILLED':
      return {
        ...state,
        categories: action.payload.data.result,
        pending: false,
      };
    case 'GET_CATEGORIESPOKE_PENDING':
      return {
        ...state,
        pokemons: [],
        pending: true
      };
    case 'GET_CATEGORIESPOKE_FULFILLED':
      return {
        ...state,
        pokemons: action.payload.data.result,
        pending: false,
      };
    case 'SEARCH_POKEMON_PENDING':
      return {
        pokemons: [],
        pending: true
      };
    case 'SEARCH_POKEMON_FULFILLED':
      return {
        ...state,
        pokemons: action.payload.data.result,
        pending: false,
      };

    case 'DETAIL_POKE_PENDING':
      return {
          ...state,
          pending: true
      }
    case 'DETAIL_POKE_FULFILLED':

      return {
          ...state,
          pokemons: action.payload.data.result,
          pending: false
      }

    case 'ADD_POKEMON_PENDING':
      return {
        ...state,
        pokemons: [],
        pending: true
      };
    case 'ADD_POKEMON_FULFILLED':
      return {
        ...state,
        pending: false,
      };
    case 'ADD_POKEMON_REJECTED':
      return {
        ...state,
        error: action.payload.data,
        pending: false,
      };

    default:
      return state;
  }
}
