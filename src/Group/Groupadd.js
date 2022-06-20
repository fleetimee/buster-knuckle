import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(swal);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      nama_grup: nama_grup,
      deskripsi: deskripsi,
    };
    axios
      .post("https://fleetime.herokuapp.com/api/tblgrup", data)
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Success",
            text: "Group Created",
            icon: "success",
            showConfirmButton: false,
            position: "top-end",
          });
          navigate("/group");
        }
      });
  };

  const [nama_grup, setNamaGrup] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Grup
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="nama_grup"
                name="nama_grup"
                variant="outlined"
                required
                fullWidth
                id="nama_grup"
                label="Nama Grup"
                onChange={(e) => setNamaGrup(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deskripsi"
                label="Deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
