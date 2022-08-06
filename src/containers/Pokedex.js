import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios';
import { IMAGE_API_URL, POKEMON_API_URL } from '../config';
import { useState } from 'react';
import PokemonCard from '../components/PokemonCard';

function Pokedex() {
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
  try {
    axios.get(POKEMON_API_URL+"?limit=800").then((response) => {
      console.log(response.status)
      if(response.status >= 200 && response.status < 300){
        const {results} = response.data
        let newPokemonData = []
        results.forEach((pokemon, index) => {
          index++
          let pokemonObject = {
            id: index,
            url: IMAGE_API_URL + index + ".png",
            name: pokemon.name
          }
          newPokemonData.push(pokemonObject);
        });
        setPokemonData(newPokemonData);
      }
    })
  } catch (error) {
    console.log(error.message)
  }
    
  }, [])

  console.log(pokemonData);
    // pokemonData.map((item) => {
    //   console.log(item.name)
    // })
  return (
    <Box >
      {pokemonData ? (
        <Grid container spacing={2} style={{textAlign: 'center', padding:"70px 10px 0px 10px", backgroundColor: 'rgb(68, 68, 68)'}}>
          {pokemonData.map((pokemon)=>{
            return (
              <PokemonCard pokemon={pokemon} image={pokemon.url} key={pokemon.id}/>
            )
          })}
        </Grid>
      ) : (<CircularProgress style={{ marginTop: 100}}/>
      )}
    </Box>
  )
}

export default Pokedex