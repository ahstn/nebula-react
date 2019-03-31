import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import CodeRenderer from './CodeRenderer';
import OverridesDialog from "./OverridesDialog";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  context: {
    margin: '10px',
  },
  grid: {
    alignItems: 'start',
    padding: 12,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  gridItem: {
    padding: '0 10px 0 0!important',
    '&:last-child': {
      padding: '0!important',
    }
  },
  draggable: {
    borderRadius: '0px',
    position: 'relative',
    '&>div': {
      borderRadius: '0px!important',
    },
    '&:last-child>div': {
      borderRadius: '0 0 4px 4px!important',
      margin: 'none'
    },
    '&:before': {
      top: '-1px',
      left: '0',
      right: '0',
      height: '1px',
      content: "''",
      opacity: '1',
      position: 'absolute',
      transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
  },
})

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "none",
  padding: '5px'
});

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.applications,
      selected: this.props.selected,
      dialogOpen: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.codeElement = React.createRef();
  }

  droppableListMapper = {
    droppable: 'items',
    droppable2: 'selected'
  };

  getList = id => this.state[this.droppableListMapper[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    } 
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      let state = { items };
      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });

      // this.codeElement.current.updateSelected(result.droppable2);
    }
  };

  handleClickOpen = (application) => {
    this.setState({ 
      dialogOpen: true,
      selectedApplication: application
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { classes } = this.props; 
    return (
      <Grid spacing={24} alignItems="center" container className={classes.grid}>
        <OverridesDialog open={this.state.dialogOpen} application={this.state.selectedApplication} handleClose={this.handleClose}/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography variant="subtitle2" gutterBottom>
              Available Applications
            </Typography>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} 
                        className={classes.draggable}>
                          <ExpansionPanel className={classes.draggableItem}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>{item.content}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen(item)}>
                              Override Values
                            </Button>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>

          <Grid item xs={4} className={classes.gridItem}>
            <Typography variant="subtitle2" gutterBottom>
              Target Bundle
            </Typography>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.selected.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classes.draggable}>
                          <ExpansionPanel className={classes.draggableItem}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>{item.content}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>Lorem ipsum dolor sit amet</Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
          </Droppable>
          </Grid>
          <Grid item xs={4}>
            <CodeRenderer ref={this.codeElement} selected={this.state.selected} />
          </Grid>
          </DragDropContext>
        </Grid>
    );
  }
}

export default withStyles(styles)(AppList);