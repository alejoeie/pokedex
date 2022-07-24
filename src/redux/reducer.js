import { TOGGLE_FAVORITE } from "./actions"

const initialData = {
    favorites: []
}

const pokemonReducer = (state = initialData, action) => {
    switch(action.type){
        case TOGGLE_FAVORITE:
            let pokemon = action.payload
            let pokemonFromFavorites = state.favorites.find((favPokemon)=> pokemon.id === favPokemon.id)
            return {
                ...state,
                favorites: pokemonFromFavorites ? [...state.favorites.filter((pokemon) => pokemon.id !== pokemonFromFavorites.id)] : [...state.favorites, action.payload]
                
            }
        default: 
            return state;
    }
}
export default pokemonReducer