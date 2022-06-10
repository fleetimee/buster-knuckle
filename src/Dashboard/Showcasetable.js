import React, { useEffect } from "react";

import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../Components/tableIcons";

export default function Showcasetable() {
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
    { title: "Role", field: "grup.nama_grup" },
    { title: "Username", field: "username" },
    { title: "Nama Lengkap", field: "nama_lengkap" },
    { title: "Email", field: "email" },
    { title: "Kantor", field: "kantor.nama_kantor" },
  ];

  return (
    <React.Fragment>
      <MaterialTable
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Save User",
            onClick: (rowData) => {
              user.setState({ dialogOpen: true });
            },
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: (event, user) => alert("You deleted " + user.username),
          },
        ]}
        title={"Recent User"}
        icons={tableIcons}
        columns={columns}
        data={user}
      />
    </React.Fragment>
  );
}
