import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';
import ToolBar from './components/ToolBar'
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: pink[500],
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ToolBar />
          <NavBar />
          <MainContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
