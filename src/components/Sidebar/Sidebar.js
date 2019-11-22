import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteIcon from '@material-ui/icons/Note';
import ImageIcon from '@material-ui/icons/Image';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;
const drawerWidthSmall = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 64px)',
      width: drawerWidthSmall,
      flexShrink: 0,
    },
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      width: drawerWidth,
      flexShrink: 0,
    },

  },
  drawerPaper: {
    marginTop: 48,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthSmall,
      marginTop: 65,
      paddingTop: 15,
    },
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      marginTop: 64,
      paddingTop: 15,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 15,
    marginBottom: 25
  }
}));

function Sidebar(props) {
  const { container, open, onClose } = props;
  const classes = useStyles();
  const theme = useTheme();

  const pages = [
    {
      title: 'Feeds',
      href: '/',
      icon: <DashboardIcon />
    },
    {
      title: 'My Articles',
      href: '/articles',
      icon: <NoteIcon />
    },
    {
      title: 'My Gifs',
      href: '/gifs',
      icon: <ImageIcon />
    },
  ];

  const pages2 = [
    {
      title: 'Profile',
      href: '/profile',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Logout',
      href: '/logout',
      icon: <LockOpenIcon />
    },
  ];

  const drawer = (
    <div>
      <div className={classes.divButton}>
        <Button variant="contained" size="large" color="primary" fullWidth>
            Compose
        </Button>
      </div>
      <Divider />
      <List>
        {pages.map((text, index) => (
          <ListItem button key={text.title} onClick={()=>props.history.push(text.href)}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.role && props.role === 1?(
          <ListItem button onClick={()=>props.history.push('create')}>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={'Create User'} />
          </ListItem>
        ):null}
        {pages2.map((text, index) => (
          <ListItem button key={text.title} onClick={()=>props.history.push(text.href)}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>

      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            onClose={onClose}
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default Sidebar;
