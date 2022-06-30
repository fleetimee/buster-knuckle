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
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Title from "../Components/Title";
import Swal from "sweetalert2";

export default function Kantorlist() {
  const navigate = useNavigate();
  const [kantor, setKantor] = React.useState([]);

  const url = "https://fleetime.herokuapp.com/api/tblkantor";

  const fetchData = async () => {
    const result = await axios.get(url);
    setKantor(result.data);
  };

  const editKantor = async (id) => {
    navigate(`/kantorupdate/${id}`);
  };

  const deleteGroup = async (id) => {
    await axios.delete(`https://fleetime.herokuapp.com/api/tblkantor/${id}`);
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
              <Title>Kantor List</Title>
            </Box>
            <Box>
              <Link to="/kantoradd">
                <Button variant="contained" color="primary">
                  Create Kantor
                </Button>
              </Link>
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nama Kantor</TableCell>
                  <TableCell align="left">Lokasi</TableCell>
                  <TableCell align="left">Hotline </TableCell>
                  <TableCell align="left">Hotline Alt</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {kantor.map((kantor) => (
                  <TableRow key={kantor.id}>
                    <TableCell align="left">{kantor.nama_kantor}</TableCell>
                    <TableCell align="left">{kantor.lokasi}</TableCell>
                    <TableCell align="left">{kantor.no_hp1}</TableCell>
                    <TableCell align="left">{kantor.no_hp2}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => editKantor(kantor.id)}>
                          Edit
                        </Button>
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
                                deleteGroup(kantor.id);
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
