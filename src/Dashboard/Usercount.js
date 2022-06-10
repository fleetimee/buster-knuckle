import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Title from "../Components/Title";
import axios from "axios";

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Usercount() {
  const url = "https://fleetime.herokuapp.com/api/tbluser";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(url);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>User Terdaftar</Title>
      <Typography component="p" variant="h1" mt={2} ml={4}>
        {data.length}
      </Typography>
    </React.Fragment>
  );
}
