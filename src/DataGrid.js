import React, { useState, useEffect } from "react";
import "./TableData.css";
import axios from "axios";

const TableData = () => {
  const [data, setData] = useState([]);
  const url = "https://fleetime.herokuapp.com/api/tbluser";

  const fetchData = async () => {
    const result = await axios.get(url);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>User Table</h1>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Nama Lengkap</th>
          <th>Grup</th>
        </tr>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.nama_lengkap}</td>
            <td>{item.grup.nama_grup}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableData;
