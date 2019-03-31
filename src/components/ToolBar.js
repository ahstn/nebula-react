import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    minHeight: '128px',
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});


class ToolBar extends Component {
  render = () => {
    const { classes } = this.props; 

    return(
      <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
          Deployment Bundles
          </Typography>
          <div className={classes.grow}/>
          <IconButton color="inherit">
          <AccountCircle />
          </IconButton>
      </Toolbar>
      </AppBar>
      </div>
    )
  }
}


ToolBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

// export default ToolBar;
export default withStyles(styles)(ToolBar);