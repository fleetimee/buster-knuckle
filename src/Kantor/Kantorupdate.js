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
import { useNavigate, useParams } from "react-router-dom";

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

export default function KantorUpdate() {
  const navigate = useNavigate();

  const classes = useStyles();

  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      nama_kantor: nama_kantor,
      lokasi: lokasi,
      no_hp1: no_hp1,
      no_hp2: no_hp2,
    };
    axios
      .put("https://fleetime.herokuapp.com/api/tblkantor/" + id, data)
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Success",
            text: "Kantor Edited",
            icon: "success",
            showConfirmButton: false,
          });
          navigate("/kantor");
        }
      });
  };

  useEffect(() => {
    fetch("https://fleetime.herokuapp.com/api/tblkantor/" + id)
      .then((res) => res.json())
      .then((result) => {
        setNamaKantor(result.nama_kantor);
        setLokasi(result.lokasi);
        setNohp1(result.no_hp1);
        setNohp2(result.no_hp2);
      });
  }, [id]);

  const [nama_kantor, setNamaKantor] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [no_hp1, setNohp1] = useState("");
  const [no_hp2, setNohp2] = useState("");

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Grup
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="nama_kantor"
                name="nama_kantor"
                variant="outlined"
                required
                fullWidth
                id="nama_kantor"
                value={nama_kantor}
                label="Nama Kantor"
                onChange={(e) => setNamaKantor(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lokasi"
                value={lokasi}
                label=""
                onChange={(e) => setLokasi(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lokasi"
                value={no_hp1}
                label=""
                onChange={(e) => setNohp1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lokasi"
                value={no_hp2}
                label=""
                onChange={(e) => setNohp2(e.target.value)}
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
            Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}
