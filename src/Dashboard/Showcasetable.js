import React, { useEffect } from "react";

import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../Components/tableIcons";

export default function Showcasetable() {
  const [user, setUser] = React.useState([]);
  const url = "https://fleetime.herokuapp.com/api/tbluser";

  const fetchData = async () => {
    const result = await axios.get(url);

    console.log(result);

    if (result.data.tbluser.length > 0) {
      setUser(result.data.tbluser);
    } else {
      setUser([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: "Role", field: "grup.nama_grup" },
    { title: "Username", field: "username" },
    { title: "Nama Lengkap", field: "nama_lengkap" },
    { title: "Email", field: "email" },
    { title: "Kantor", field: "kantor.nama_kantor" },
  ];

  return (
    <React.Fragment>
      <MaterialTable
        title={"Recent User"}
        icons={tableIcons}
        columns={columns}
        data={user}
      />
    </React.Fragment>
  );
}
