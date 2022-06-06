import React, { useEffect } from "react";
import Link from "@mui/material/Link";

import Title from "./Title";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [user, setUser] = React.useState([]);
  const url = "https://fleetime.herokuapp.com/api/tbluser";

  const fetchData = async () => {
    const result = await axios.get(url);
    setUser(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: "Username", field: "username" },
    { title: "Nama Lengkap", field: "nama_lengkap" },
    { title: "Email", field: "email" },
    { title: "Created At", field: "createdAt" },
    { title: "Alamat", field: "grup.nama_grup" },
  ];

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <MaterialTable icons={tableIcons} columns={columns} data={user} />
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
