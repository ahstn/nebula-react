import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import grey from '@material-ui/core/colors/grey';


const styles = theme => ({
  code: {
    width: '100%',
    padding: '1rem',
    background: grey[200],
    color: grey[800],
    borderRadius: '3px',
  },
  span: {
    display: 'block',
    lineHeight: '1.6'
  }
});

class CodeRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }

  updateSelected = (selected) => {
    this.setState({
      selected: selected
    });
  };

  render = () => {
    const { classes } = this.props; 

    return(
      <div>
        <CssBaseline />
        <Typography variant="subtitle2" gutterBottom>
          requirements.yaml
        </Typography>
        <pre className={classes.code}>
          <span className={classes.span}># requirements.yaml</span>
          {this.props.selected.map((item, index) => (
            <div>  
              <span className={classes.span}>- name: {item.content}</span>
              <span className={classes.span}>  repository: "file://../{item.content}"</span>
              <span className={classes.span}>  version: 0.1.0</span>
            </div>
          ))}
        </pre>
      </div>
    )
  }
}

CodeRenderer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CodeRenderer);