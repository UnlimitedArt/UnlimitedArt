import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {Button,Menu,MenuItem,ListItemText} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
  },
});
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  }
}))(MenuItem);

export default function CustomizedMenus(props) {
  const classes = useStyles();
  console.log({ props });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className={classes.root}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {props.display}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.children.map((child, key) => (
          
          <StyledMenuItem key={key}>

<Link to={child.path}><ListItemText primary={child.display} /></Link>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
