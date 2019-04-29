import axios from 'axios';
import { baseUrl } from './api';

export const getPokemon = (page, limit) => {
  return {
    type: 'GET_POKEMON',
    payload: axios.get(`${baseUrl}/api/v1/pokemons/paginate?page=${page}&limit=${limit}`)
  }
}

export const searchPokemon = (txtSearch) => {
  return {
    type: 'SEARCH_POKEMON',
    payload: axios.get(`${baseUrl}/api/v1/pokemons/search?name_poke=${txtSearch}`)
  }
}

export const getCategories = () => {
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get(`${baseUrl}/api/v1/categories`)
  }
}

export const getCategoriesPoke = (id) => {
  return {
    type: 'GET_CATEGORIESPOKE',
    payload: axios.get(`${baseUrl}/api/v1/pokemon/${id}`)
  }
}

export const detailPoke = (id) => {
  return {
    type: 'DETAIL_POKE',
    payload: axios.get(`${baseUrl}/api/v1/pokemondetail/${id}`)
  }
}
