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

export default function Grouplist() {
  const [group, setGroup] = React.useState([]);

  const url = "https://fleetime.herokuapp.com/api/tblgrup";

  const fetchData = async () => {
    const result = await axios.get(url);
    setGroup(result.data);
  };

  const deleteGroup = async (id) => {
    await axios.delete(`https://fleetime.herokuapp.com/api/tblgrup/${id}`);
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
              <Title>Group List</Title>
            </Box>
            <Box>
              <Link to="/groupadd">
                <Button variant="contained" color="primary">
                  Buat Grup
                </Button>
              </Link>
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nama Grup</TableCell>
                  <TableCell align="left">Deskripsi</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell align="left">{group.nama_grup}</TableCell>
                    <TableCell align="left">{group.deskripsi}</TableCell>
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
                                deleteGroup(group.id);
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
