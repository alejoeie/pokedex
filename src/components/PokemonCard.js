import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const useStyles = makeStyles((theme) => {
    createStyles({
    cardMedia:{
        margin:"auto",
        width: 130,
        height: 130
    },
    card: {

        cursor: 'pointer',
    }
    })
})

const theme = createTheme();

function PokemonCard(props) {
    const { pokemon, image } = props
    const { id, name } = pokemon
    const classes = useStyles();
  return (
      <ThemeProvider theme={theme}>
    <Grid item xs={10} sm={2} key={id}>
        <Link to={"/pokemon/" + id} style={{textDecoration: 'none'}}>
        <Card style={{cursor:'pointer', backgroundColor:'black', color:'white', "&hover":{backgroundColor: "black"}}}>
            <CardMedia className={classes.cardMedia} image={image} style={{margin:'auto', width: 130, height:130}}></CardMedia>
            <CardContent style={{textAlign:"center"}}>
                <Typography >{name}</Typography>
            </CardContent>
        </Card>
        </Link>
    </Grid>
    </ThemeProvider>
  )
}

export default PokemonCard