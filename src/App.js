import "./styles.scss";
import React, { useEffect, useState, Component } from "react";
import firebase from "firebase/app";
import Register from "./components/AdminRegister";
import Login from "./components/AdminLogin";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
    textAlign: "center",
  },
};

function App() {
  const [popupIsOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Popup");
  const [popupMessage, setPopupMessage] = useState("Message");

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  function setPopup(codeOrTitle, message) {
    if (codeOrTitle !== undefined && message === undefined) {
      switch (codeOrTitle) {
        case "auth/wrong-password":
          setPopupTitle("Advertencia");
          setPopupMessage(
            "La contraseña no es válida o el usuario no tiene contraseña."
          );
          break;
        case "auth/weak-password":
          setPopupTitle("Advertencia");
          setPopupMessage("La contraseña debe tener al menos 6 caracteres.");
          break;
        case "auth/non-identical-passwords":
          setPopupTitle("Error");
          setPopupMessage("Las contraseñas no son identicas.");
          break;
        case "data/bad-data":
          setPopupTitle("Error");
          setPopupMessage(
            "La información ingresada es identica a la anterior o no es válida."
          );
          break;
        case "auth/only-account":
          setPopupTitle("Error");
          setPopupMessage("No puedes eliminar la única cuenta del sistema.");
          break;
        case "auth/email-already-in-use":
          setPopupTitle("Error");
          setPopupMessage("Este correo ya se encuentra registrado.");
          break;
        case "auth/bad-username":
          setPopupTitle("Error");
          setPopupMessage(
            "El nombre es igual al anterior o no se ha ingresado ningún valor."
          );
          break;
        case "auth/bad-email":
          setPopupTitle("Error");
          setPopupMessage(
            "El e-mail es igual al anterior o no se ha ingresado ningún valor."
          );
          break;
        case "auth/user-not-found":
          setPopupTitle("Error");
          setPopupMessage("No existe ningún usuario enlazado con este correo.");
          break;
        default:
          setPopupTitle("Error");
          setPopupMessage("No se ha identificado el error.");
          break;
      }
    } else if (codeOrTitle !== undefined && message !== undefined) {
      setPopupTitle(codeOrTitle);
      setPopupMessage(message);
    } else {
      setPopupTitle("Error");
      setPopupMessage("Error desconocido.");
    }
  }

  return (
    <div className="App row">
      <Modal
        isOpen={popupIsOpen}
        onRequestClose={closePopup}
        style={customStyles}
        contentLabel="Example Modal"
        id="popup"
      >
        <h2>{popupTitle}</h2>
        <div>{popupMessage}</div>
        <button
          className="d-block mt-3 m-auto btn btn-primary"
          onClick={closePopup}
        >
          Aceptar
        </button>
      </Modal>
      <Header />
      <Router>
        <div>
          <nav className="col-12 navBackground">
            <ul className="navbar navbar-dark col-3">
              <li className="btn">
                <Link to="/" className="noHype">
                  Inicio
                </Link>
              </li>
              <li className="btn">
                <Link to="/login" className="noHype">
                  Inicio de sesión
                </Link>
              </li>
              <li className="btn">
                <Link to="/register" className="noHype">
                  Registro
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
