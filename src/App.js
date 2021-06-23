import "./styles.scss";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useAuth, useUser } from "reactfire";
import Register from "./components/AdminRegister";
import Login from "./components/AdminLogin";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Modal from "react-modal";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Catalog from "./components/Catalog";
import DeleteAccount from "./components/AdminDeleteAccount";
import InventoryDashboard from "./components/InventoryDashboard";
import Styles from "./components/StylesAdmin";
import Clothes from "./components/ClothesAdmin";
import Finance from "./components/FinanceAdmin";
import Orders from "./components/Orders";
import AdminAboutUs from "./components/AdminAboutUs";

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
  const { data: user } = useUser();
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
          setPopupMessage("La contraseña debe tener al menos 8 caracteres.");
          break;
        case "auth/non-identical-passwords":
          setPopupTitle("Error");
          setPopupMessage("Las contraseñas no son idénticas.");
          break;
        case "data/bad-data":
          setPopupTitle("Error");
          setPopupMessage(
            "La información ingresada es idéntica a la anterior o no es válida."
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
      <Router>
        <Header />
        <Nav isLogin={user}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/catalog">
            <Catalog />
          </Route>
          <Route exact path="/about-us">
            <AboutUs />
          </Route>
          <Route exact path="/admin">
            {user ? (
              <Redirect to="/admin/dashboard" />
            ) : (
              <Redirect to="/admin/login" />
            )}
          </Route>
          <Route exact path="/admin/dashboard">
            {user ? (
              <Dashboard />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/login">
            {user ? (
              <Dashboard />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/register">
            {user ? (
              <Register openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/delete-account">
            {user ? (
              <DeleteAccount openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory">
            {user ? (
              <InventoryDashboard openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory/styles">
            {user ? (
              <Styles openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory/clothes">
            {user ? (
              <Clothes openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory/finance">
            {user ? (
              <Finance openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory/orders">
            {user ? (
              <Orders openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
          <Route exact path="/admin/inventory/about_us">
            {user ? (
              <AdminAboutUs openPopup={openPopup} setPopup={setPopup} />
            ) : (
              <Login openPopup={openPopup} setPopup={setPopup} />
            )}
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
