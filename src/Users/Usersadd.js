import React, { useEffect, useState } from "react";
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
import AsyncSelect from "react-select/async";

import InputLabel from "@mui/material/InputLabel";

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
  /* A hook that allows you to navigate to a different route. */
  const navigate = useNavigate();

  /* A hook that allows you to use the styles defined in the `useStyles` function. */
  const classes = useStyles();

  const handleChange = (value) => {
    setGrup(value);
  };

  const handleChangeKantor = (value) => {
    setKantor(value);
  };

  /**
   * It takes the data from the form and sends it to the API.
   * @param event - The event object is automatically passed to the event handler by React itself.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      nama_lengkap: nama_lengkap,
      email: email,
      username: username,
      password: password,
      grupId: grupId.id,
      kantorId: kantorId.id,
    };
    axios
      .post("https://fleetime.herokuapp.com/api/tbluser", data)
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Success",
            text: "Users Created",
            icon: "success",
            showConfirmButton: false,
          });
          navigate("/users");
        }
      });
  };

  /* The URL of the API. */
  // const url = "https://fleetime.herokuapp.com/api/tblgrup";

  /* A hook that allows you to use the state of the component. */
  const [nama_lengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [grupId, setGrup] = useState();
  const [kantorId, setKantor] = useState();

  const fetchData = async () => {
    return await axios
      .get("https://fleetime.herokuapp.com/api/tblgrup")
      .then((result) => {
        const res = result.data;
        return res;
      });
  };

  const fetchDataKantor = async () => {
    return await axios
      .get("https://fleetime.herokuapp.com/api/tblkantor")
      .then((result) => {
        const res = result.data;
        return res;
      });
  };

  /* A hook that is called after every render. */
  useEffect(() => {});

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
                label="Nama Lengkap"
                onChange={(e) => setNamaLengkap(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deskripsi"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deskripsi"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type={"password"}
                variant="outlined"
                required
                fullWidth
                id="deskripsi"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Grup</InputLabel>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={fetchData}
                getOptionLabel={(e) => e.nama_grup}
                getOptionValue={(option) => option.id}
                onChange={(e) => handleChange(e)}
                placeholder="Pilih Grup"
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Grup</InputLabel>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={fetchDataKantor}
                getOptionLabel={(e) => e.nama_kantor}
                getOptionValue={(option) => option.id}
                onChange={(e) => handleChangeKantor(e)}
                placeholder="Pilih Kantor"
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
