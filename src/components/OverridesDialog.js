import React, { Component } from 'react'
import AppList from './AppList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-yaml';
 
const code = `---
# values.yaml
image:
  repository: ahstn/auth
  tag: 1.0.0

environment:
  ENV: 'development'
`;

const styles = theme => ({
  content: { },
});

class OverridesDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: this.props.application,
      open: this.props.open,
      code
    };
  }

  render = () => {
    const { classes } = this.props; 

    return(
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Values Editor</DialogTitle>
        { this.props.application &&
          <DialogContent>
            <DialogContentText>
              Override values for '{this.props.application.name}' by
              changing the YAML below:
            </DialogContentText>
          <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.yaml)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}/>
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


OverridesDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(OverridesDialog);