
/**
 * @fileoverview App, responsible for the configuration of the website.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of App was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import "./styles.scss";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useUser } from "reactfire";
import { useFirestore } from "reactfire";
import { useFirestoreDocData } from "reactfire";
import Register from "./components/AdminRegister";
import Login from "./components/AdminLogin";
import Home from "./components/Catalog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Modal from "react-modal";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import DeleteAccount from "./components/AdminDeleteAccount";
import InventoryDashboard from "./components/InventoryDashboard";
import AddStyles from "./components/AddStyles";
import AddItem from "./components/AddItem";
import EditDashboard from "./components/EditDashboard";
import Finance from "./components/FinanceAdmin";
import Orders from "./components/Orders";
import AdminAboutUs from "./components/AdminAboutUs";
import ShoppingCart from "./components/ShoppingCart";
import AdminPayment from "./components/AdminPayment";
import AdminColors from "./components/AdminColors";
import AdminSizes from "./components/AdminSizes";

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
  const firestore = useFirestore();
  const informationRef = firestore.collection("webpage").doc("information");
  let { status, data } = useFirestoreDocData(informationRef);
  const { data: user } = useUser();
  const [popupIsOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Popup");
  const [popupMessage, setPopupMessage] = useState("Message");

  const [information, setInformation] = useState({
    phoneNumber: "",
    email: "",
    facebook: "",
    instagram: "",
    aboutUs: "",
    extraInfo: "",
  });

  // This method define the store contact information. 
  useEffect(() => {
    if (status === "success") {
      setInformation({
        ...information,
        phoneNumber: data.phoneNumber,
        email: data.email,
        facebook: data.facebook,
        instagram: data.instagram,
        aboutUs: data.aboutUs,
        extraInfo: data.extraInfo,
      });
    }
  }, [status, data]);

  // This method allows messages to be displayed.
  function openPopup() {
    setIsOpen(true);
  }

  // This method allows close the messages.
  function closePopup() {
    setIsOpen(false);
  }

  /**
   * This method is responsible to show the confirmation or error messages.
   * @param {String} codeOrTitle 
   * @param {String} message 
   */
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

        case "data/non-identical-names":
          setPopupTitle("Error");
          setPopupMessage("El nombre no coincide con el solicitado.");
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

        case "auth/network-request-failed":
          setPopupTitle("Error");
          setPopupMessage("Ha ocurrido un error de conexión.");
          break;

        default:
          console.log(codeOrTitle);
          setPopupTitle("Error");
          setPopupMessage("No se ha identificado el error.");
          break;
      }
    } else if (codeOrTitle !== undefined && message !== undefined) {
      console.log(codeOrTitle + ": " + message);
      setPopupTitle(codeOrTitle);
      setPopupMessage(message);
    } else {
      console.log(codeOrTitle + ": " + message);
      setPopupTitle("Error");
      setPopupMessage("Error desconocido.");
    }
  }

  return (
    <div>
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
          <Nav isLogin={user} />
          <Switch>
            <Route exact path="/">
              <Home openPopup={openPopup} setPopup={setPopup} />
            </Route>
            <Route exact path="/about-us">
              <AboutUs data={information} />
            </Route>
            <Route exact path="/shoppingCart">
              <ShoppingCart openPopup={openPopup} setPopup={setPopup} />
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
            <Route exact path="/admin/inventory/add-styles">
              {user ? (
                <AddStyles openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/inventory/edit-styles">
              {user ? (
                <EditDashboard
                  openPopup={openPopup}
                  setPopup={setPopup}
                  type="style"
                />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/inventory/add-item">
              {user ? (
                <AddItem openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/inventory/edit-items">
              {user ? (
                <EditDashboard
                  openPopup={openPopup}
                  setPopup={setPopup}
                  type="item"
                />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/finance">
              {user ? (
                <Finance openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/orders">
              {user ? (
                <Orders openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/about_us">
              {user ? (
                <AdminAboutUs
                  openPopup={openPopup}
                  setPopup={setPopup}
                  data={information}
                />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/finance/adminPayment">
              {user ? (
                <AdminPayment openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/inventory/adminColors">
              {user ? (
                <AdminColors openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
            <Route exact path="/admin/inventory/adminSizes">
              {user ? (
                <AdminSizes openPopup={openPopup} setPopup={setPopup} />
              ) : (
                <Login openPopup={openPopup} setPopup={setPopup} />
              )}
            </Route>
          </Switch>
        </Router>
        <Footer data={information} />
      </div>
    </div>
  );
}

export default App;
