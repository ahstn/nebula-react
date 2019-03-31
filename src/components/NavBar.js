import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'none',
    border: 'none'
  },
  toolbar: {
    minHeight: '128px'
  },
  drawerItem: {
    padding: '8px 16px',
  },
  drawerSubheader: {
    textAlign: 'start',
    padding: '0 16px',
    lineHeight: '36px'
  },
  drawerItemText: {
    color: grey[500],
    fontSize: '13px',
    fontWeight: '500',
  }

});


class NavBar extends Component {
  render = () => {
    const { classes } = this.props; 

    return(
      <div>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListSubheader className={classes.drawerSubheader}>Saved reports</ListSubheader>
            {['Deployments', 'Builder', 'Namespace', 'Drafts'].map((text, index) => (
              <ListItem button key={text} className={classes.drawerItem}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText>
                <span className={classes.drawerItemText}>{text}</span>
              </ListItemText>
            </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Settings', 'Help'].map((text, index) => (
              <ListItem button key={text} className={classes.drawerItem}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText>
                  <span className={classes.drawerItemText}>{text}</span>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

// export default NavBar;
export default withStyles(styles)(NavBar);