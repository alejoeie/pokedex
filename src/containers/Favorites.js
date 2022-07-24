import { Box, Grid } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles, createStyles, withStyles } from '@mui/styles';
import PokemonCard from '../components/PokemonCard';
const styles = (theme) => ({
    pokedexContainer: {
        height: "100vh",
        backgroundColor: 'rgb(68, 68, 68)',
        paddingTop: 75,
        textAlign: 'center'
    }
})
export class Favorites extends Component {
  render() {
    const { classes, favorites } = this.props
    return (
      <Box>
          <Grid container spacing={2} className={classes.pokedexContainer}>
            {favorites.map((pokemon)=>{
                return (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} image={pokemon.sprites.front_default}/>
                )
            })}
          </Grid>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favorites))