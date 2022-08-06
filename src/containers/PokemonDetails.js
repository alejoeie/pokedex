import { Box, CircularProgress, ThemeProvider, createTheme, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'
import { POKEMON_API_URL } from '../config';
import { makeStyles, createStyles, withStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { connect } from 'react-redux'
import { toggleFavorite } from '../redux/actions';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const styles = {
    pokedexContainer: {
      width: "100%",
      height: '84vh',
      backgroundColor: 'black',
      color: "white",
      marginTop: "75px",
      textAlign: "center",
      borderRadius: 5,
      paddingTop: 30
    },
    textTitle: {
      textTransform: "upperCase",
      width:"100%",
    },
    pokemonImage:{
      width: "25%",
      alignSelf: "center"
    },
    pokemonInfoContainer: {
      bottom: 60,
      position: "absolute",
      width: "100%"
    },
    separate: {
      height: "0.01mm",
      width: "95%"
    },
    favorite:{
      padding: 20,
      width: 20,
      margin: "10px"

    },
    text:{
      fontSize: "10",
      padding: 20
    },
    stats:{
      width: "100%",
      position: "relative",

    },
    favoriteSelector: {
      justifyContent: "center",
      flexDirection: "row-reverse",
      alignItems: "center",
      
    },
    dataGrid: {
      width: "100%",
      gap: "10px",
      justifyContent: "center",
      display: "flex",
      padding: 40,
      marginTop: "5px"
    }
}
const theme = createTheme();
class PokemonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null
    }
  }

  componentDidMount() {
    const { match} = this.props;
    const { id } = match?.params
    axios.get(POKEMON_API_URL + "/" + id).then((res) => {
      if(res.status >= 200 && res.status < 300){
        this.setState({pokemon: res.data})
      }
    })
  }

  favoriteChecker(pokemon){
    let found = false
    this.props.favorites?.map((p)=>{
      if(p.id === pokemon.id){
        found = true
      }
    })
    return found;
  }
  render() {
    const { classes } = this.props
    const { pokemon } = this.state
    
    if(pokemon){
      const { name, sprites, height, weight, types, stats } = pokemon
      // console.log(stats);
      let arr = [];
      let arr2 = [];
      var chartData = [];

      stats.map((stat) => {
        chartData.push({
          "label": stat.stat.name,
          "value": stat.base_stat
        })
      })

      console.log(JSON.stringify(chartData));

     


      

      const chartConfigs = {
        type: 'column2d',
        width: "75%",
        height: "300",
        borderRadius: 15,
        dataFormat: 'json',
        dataSource: {
          "chart": {
            "caption": "Pokemon Stats",
            "renderAt": `${classes.stats}`,
            "subCaption": "Each measurement unit must be relative to its spec.",
            "xAxisName": "Stats",
            "yAxisName": "Value",
            "theme": "fusion",
            "canvasbgColor": "#000000",
            "canvasbgAlpha": "100",
            "canvasBgRatio": "40,60",
            "canvasBgAngle": "0",
            "bgColor": "#000000",
            "chartLeftMargin": "40",
            "chartTopMargin": "40",
            "chartRightMargin": "40",
            "chartBottomMargin": "40"
            // "bgratio": "60,40",
            // "bgAlpha": "70,80",
            // "bgAngle": "180"
          },
          data: chartData
        }
      };
      return (
        <ThemeProvider theme={theme}>
        <Box>
          <Box className={classes.pokedexContainer}>
            <Typography className={classes.textTitle} variant='h2'>
              {name}
            </Typography>
            <Grid container className={classes.dataGrid}>
            
              <Grid item md={2} sm={2} xs={2}>
                <img  src={sprites.front_default}/>
              </Grid>
              <Grid item md={2} sm={2} xs={2}>
                <img  src={sprites.back_default}/>
              </Grid>
              <Grid item md={2} sm={2} xs={2}>
                <img  src={sprites.back_shiny}/>
              </Grid>
              <Grid item md={2} sm={2} xs={2}>
                <img  src={sprites.front_shiny}/>
              </Grid>
            </Grid>

            
            
            <Box className={classes.pokemonInfoContainer}>
            <ReactFC {...chartConfigs} />
              <hr className={classes.separate}/>
              <Grid container>
                <Grid item md={2} sm={1} xs={1} className={classes.favoriteSelector}>
                  <Button className={classes.favorite} onClick={()=>{this.props.toggleFavorite(pokemon)}}>
                    <FavoriteIcon style={{color: this.favoriteChecker(pokemon) ? "red" : "white", fontSize: 20}}/>
                  </Button>

                </Grid>
                  <Grid item md={2} sm={2} xs={2}>
                    <Typography className={classes.text}>Name
                      <br />
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={2} xs={2}>
                    <Typography className={classes.text}>Heigth
                      <br />
                      {height}m
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={2} xs={2}>
                    <Typography className={classes.text}>Weight
                      <br />
                      {weight}kg
                    </Typography>
                  </Grid>
                  
                    {types.map((pokemonType)=>{
                      const {name} = pokemonType.type
                      return(
                        <Grid item md={2} sm={2} xs={2} key={name}>
                          <Typography className={classes.text}>Type
                            <br />
                            {name}
                          </Typography>
                        </Grid>
                      )
                    })}
                  
              </Grid>
            </Box>
          </Box>
        </Box>
        </ThemeProvider>
      )
    } else{
      return <CircularProgress />
    }
  }
}
const mapStateToProps = (state) => ({
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (pokemon) => dispatch(toggleFavorite(pokemon))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PokemonDetails));

