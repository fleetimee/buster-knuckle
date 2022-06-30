import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";

import axios from "axios";
import Title from "../Components/Title";
import Swal from "sweetalert2";

export default function Userlist() {
  const [user, setUser] = React.useState([]);

  const url = "https://fleetime.herokuapp.com/api/tbluser";

  const fetchData = async () => {
    const result = await axios.get(url);
    setUser(result.data.tbluser);
  };

  // const editGroup = async (id) => {
  //   navigate(`/groupupdate/${id}`);
  // };

  const deleteUsers = async (id) => {
    await axios.delete(`https://fleetime.herokuapp.com/api/tbluser/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Paper>
          <Box>
            <Box>
              <Title>Users List</Title>
            </Box>
            <Box>
              <Link to="/userscreate">
                <Button variant="contained" color="primary">
                  Generate User
                </Button>
              </Link>
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nama Lengkap</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Grup</TableCell>
                  <TableCell align="center">Kantor</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.nama_lengkap}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.grup.nama_grup}</TableCell>
                    <TableCell align="center">
                      {user.kantor.nama_kantor}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button>Edit</Button>
                        <Button
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.value) {
                                deleteUsers(user.id);
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your file has been deleted.",
                                  icon: "success",
                                  showConfirmButton: false,
                                });
                              }
                            })
                          }
                        >
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
