import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./menu.jsx";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBar({ links }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {links.map((link, key) => {
            if ("children" in link) {
              return (
                <Menu
                  key={key}
                  display={link.display}
                  children={link.children}
                />
              );
            } else {
              return (
                <Link to={link.path}  key={key}>
                <Button key={key} color="inherit">
                  {link.display}
                </Button></Link>
              );
            }
          })}
        </Toolbar>
      </AppBar>
    </div>
  );
}
