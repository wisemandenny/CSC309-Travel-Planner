import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import ItineraryStore from './ItineraryStore'
import Hour from './Hour'

const styles = theme => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: '0 25px',
    marginLeft: 20,
    maxHeight: 835,
    width: 500
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  }
})

class Itinerary extends React.Component {
  constructor () {
    super()
    this.state = ItineraryStore.getState()
  }

  componentDidMount () {
    ItineraryStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    ItineraryStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(ItineraryStore.getState())

  getHourEvent = (hour) => this.state.events.filter(e => e.hour === hour)[0]

  getHourComponents = () => {
    const hours = Array.from(Array(24).keys())
    return hours.map(hour => (
      <div key={hour}>
        <Hour time={hour} data={this.getHourEvent(hour)}/>
        <Divider />
      </div>)
    )
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List className={classes.list}>
          <ListItem>
            <ListItemText primary='Itinerary'
              primaryTypographyProps={{ color: 'primary', variant: 'h3' }}/>
          </ListItem>
          {this.getHourComponents()}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Itinerary)
