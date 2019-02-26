import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import SearchAppBarStore from './SearchAppBarStore'
import AppStore from '../AppStore'


import SignInButton from './SignInButton'
import CreateAccountButton from './CreateAccountButton'
import LandingActions from './LandingActions'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },

  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 600,
      '&:focus': {
        width: 1000
      }
    }
  }
})

class SearchAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = {searchQuery: '' }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    AppStore.on('change', this.updateState)

  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    AppStore.removeListener('change', this.updateState)
  }

  handleChange = event => {
    LandingActions.searchbarChange(event.target.value)
  }

  handleSubmit = event => {
    if ((event.keyCode && event.keyCode === 13) || event.type === 'click') {
      LandingActions.searchbarSearch(this.state.searchQuery)
    }
  }

  updateState = () => {
    const { loggedInState, searchQuery} = Object.assign({}, AppStore.getState(), SearchAppBarStore.getState())
    this.setState({ loggedInState, searchQuery })
  }

  render () {
    const { classes } = this
    const { loggedInState } = this.state
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Trip Planner
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}
                onClick={(e) => this.handleSubmit(e)} >
                <IconButton
                  component={() => <SearchIcon />}
                  />
              </div>
              <InputBase
                placeholder='Where to?'
                value={this.state.searchQuery}
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleSubmit(e)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            {!(loggedInState === 'loggedIn') && (<div className='registerButtonContainer'>
              <CreateAccountButton />
            </div>)}
            <div className='signInButtonContainer'>
              <SignInButton />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(SearchAppBar)
