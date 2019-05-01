import axios from 'axios';
import { baseUrl } from './api';

export const getPokemon = (page, limit) => {
  return {
    type: 'GET_POKEMON',
    payload: axios.get(`${baseUrl}/api/v1/pokemons/paginate?page=${page}&limit=${limit}`)
  }
}

export const getAllPokemon = () => {
  return {
    type: 'GET_ALLPOKEMON',
    payload: axios.get(`${baseUrl}/api/v1/pokemons`)
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

export const getTypes = () => {
  return {
    type: 'GET_TYPES',
    payload: axios.get(`${baseUrl}/api/v1/types`)
  }
}

export const savePokemon = (category, selectedItems, name_poke, image_poke, latitude, longitude) => {

  let data = new FormData();
    data.append('name_poke', name_poke);
    data.append('image_poke', image_poke);
    data.append('longitude', longitude);
    data.append('latitude', latitude);
    data.append('category_id', category);

    selectedItems.map(element => {
        data.append('types', element);
    });
  return {
    type: 'ADD_POKEMON',
    payload: axios.post(`${baseUrl}/api/v1/user/pokemon`,data)
  }
}

export const updatePokemon = (category, selectedItems, name_poke, image_poke, latitude, longitude,id) => {

  let data = new FormData();
    data.append('name_poke', name_poke);
    data.append('image_poke', image_poke);
    data.append('longitude', longitude);
    data.append('latitude', latitude);
    data.append('category_id', category);

    selectedItems.map(element => {
        data.append('types', element);
    });
  return {
    type: 'UPDATE_POKEMON',
    payload: axios.post(`${baseUrl}/api/v1/pokemon/${id}`,data)
  }
}

export const detailPoke = (id) => {
  return {
    type: 'DETAIL_POKE',
    payload: axios.get(`${baseUrl}/api/v1/pokemondetail/${id}`)
  }
}

export const deleteItem = (id) => {
    return{
      type: 'DELETE_ITEM',
      payload: axios.delete(`${baseUrl}/api/v1/pokemon/${id}`)
    }
}
