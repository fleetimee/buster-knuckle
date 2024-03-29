import * as React from "react";

import Title from "../Components/Title";
import { Typography } from "@mui/material";

const user = JSON.parse(localStorage.getItem("user"));

export default function Greeting() {
  return (
    <React.Fragment>
      <Title>Welcome</Title>
      <Typography align="center" variant="">
        <h1>{user.nama_lengkap}</h1>
        Anda login sebagai {user.grup.nama_grup}
      </Typography>
    </React.Fragment>
  );
}
