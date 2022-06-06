import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Title from "./Title";
import { Typography } from "@mui/material";

const user = JSON.parse(localStorage.getItem("user"));

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Welcome</Title>
      <Typography>
        <h1>{user.nama_lengkap}</h1>
      </Typography>
    </React.Fragment>
  );
}
