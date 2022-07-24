import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) =>
createStyles({
    palette: {
        mode: 'dark',
        primary: {
          main: '#1976d2',
        },
    },
  appbar: {
    backgroundColor: 'black',
  },
  link: {
      textDecoration: 'none'
  },
  title:{
      cursor: 'pointer',
      color: 'white'
  }
}),
);

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#1976d2',
        },
      },
});
function AppNavigator() {
    
    const classes = useStyles();
  return (
      <ThemeProvider theme={theme}>
        <AppBar style={{cursor:'pointer', backgroundColor:'black'}} position='fixed' enableColorOnDark>
            <Toolbar>
                <Link to="/" className={classes.link}>
                    <Typography className={classes.title}  variant='h6' >Pokedex</Typography>
                </Link>
                <Link to="/favorites" className={classes.link}>
                    <Typography className={classes.title}  variant='h6' style={{marginLeft: 25}}>Favorites</Typography>
                </Link>
            </Toolbar>
        </AppBar>

      </ThemeProvider>

    
  )
}

export default AppNavigator