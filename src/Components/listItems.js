import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UserIcon from "@mui/icons-material/GroupAddOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";

import swal from "sweetalert";

const handleLogout = (e) => {
  e.preventDefault();
  swal({
    title: "Are you sure?",
    text: "You will be logged out",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  });
};

export const mainListItems = (
  <React.Fragment>
    {/* This is home route */}
    <ListItemButton component={Link} to="/dashboard" state="">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    {/* This is group route */}
    <ListItemButton component={Link} to="/group">
      <ListItemIcon>
        <UserIcon />
      </ListItemIcon>
      <ListItemText primary="Group" />
    </ListItemButton>

    {/* This is menu route */}
    <ListItemButton component={Link} to="/menu">
      <ListItemIcon>
        <MenuIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItemButton>

    {/* This is user route */}
    <ListItemButton component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      User Setting
    </ListSubheader>
    <ListItemButton primary="Logout" onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
