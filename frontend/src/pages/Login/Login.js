import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ui-styles
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Webcam from "react-webcam";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const webcamRef = React.useRef(null);
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

  const inicioSesion = (event) => {
    event.preventDefault();
    console.log("inicio normal")
    const url = `${ip}/login`;
    let data = { user: user, password: password };
    console.log("data: ", data);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          console.log("res: ", res);
          const inicioExitoso = res.ok; // true o false
          if (inicioExitoso) {
            localStorage.setItem("jwt", res.jwt);
            navigate("/inicio");
          } else {
            setMensaje(res.mensaje);
            setShowError(true);
          }
        });
    };
    fetchData();
  };

  const loginFacial = (event) => {
    event.preventDefault();
    console.log("inicio facial")
    let foto = webcamRef.current.getScreenshot();
    foto = foto.replace("data:image/jpeg;base64,", "");
    let data = { user: user, foto: foto };
    console.log("data: ", data);
    const url = `${ip}/login-facial`;
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          console.log("res: ", res);
          const inicioExitoso = res.ok; // true o false
          if (inicioExitoso) {
            localStorage.setItem("jwt", res.jwt);
            localStorage.setItem("id_usuario", res.id_usuario);
            navigate("/inicio");
          } else {
            setMensaje(res.mensaje);
            setOpen(false);
            setShowError(true);
          }
        });
    };
    fetchData();
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const mostrarError = (event) => {
    return (
      <div className="alert alert-dismissible alert-danger">
        <strong>Oh no!</strong> { mensaje }
      </div>
    );
  };

  return (
    <div className="mainlogin">
      {showError && mostrarError()}
      <main class="form-signin w-100 m-auto">
        <form>
          <img
            class="mb-4 logo"
            src="https://cdn-icons-png.flaticon.com/512/4336/4336400.png"
            alt=""
            width="200"
            height="200"
          />
          <h1 class="h3 mb-3 fw-normal">Inicio de Sesión</h1>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(event) => setUser(event.target.value)}
            />
            <label for="floatingInput">Usuario</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <label for="floatingPassword">Contraseña</label>
          </div>

          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Reconocmiendo facial
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Reconocmiento Facial
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <div className="camera-container">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={540}
                    height={360} 
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus variant="contained" onClick={loginFacial}>
                  Iniciar Sesión
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>

          <br />
          <button class="btn btn-primary w-100 py-2" onClick={inicioSesion}>
            Iniciar sesión
          </button>
          <p className="mt-3 mb-3 text-center">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
          <br />
          <br />
          <br />
          <p class="mt-5 mb-3 text-body-secondary">&copy; Grupo 9</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
