import React, { Component } from 'react'
import AppList from './AppList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import grey from '@material-ui/core/colors/grey';
import CodeRenderer from './CodeRenderer';
import { APPLICATIONS, SELECTED } from '../constants/applications'

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: '48px 72px 0 240px',
    zIndex: theme.zIndex.drawer + 2
  },
  grid: {
    alignItems: 'start',
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: APPLICATIONS,
      selected: SELECTED
    };
  }

  render = () => {
    const { classes } = this.props; 

    return(
      <div>
        <CssBaseline />
        <Grid container item xs={12}>
          <Grid item xs={12} className={classes.content}>
            <Paper className={classes.paper}>
              <Typography variant="h5">
                Chart Builder
              </Typography>
                <Grid spacing={24} alignItems="center" container className={classes.grid}>
                  <AppList  applications={this.state.applications} 
                            selected={this.state.selected}/>
                </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MainContainer);