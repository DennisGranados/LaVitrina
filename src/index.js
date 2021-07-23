/**
 * @fileoverview index, responsible for loading the website.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez 
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of index was written by Carlos Cabezas, Denilson Granados, 
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
} from "reactfire";
import config from "./config";
import LoadingSite from "./components/Loading";

function Loading() {
  // easily access the Firestore library
  const catalogRef = useFirestore().collection("webpage").doc("information");

  // subscribe to a document for realtime updates. just one line!
  const { status } = useFirestoreDocData(catalogRef);

  // easily check the loading status
  if (status === "loading") {
    return (
      <div>
        <LoadingSite />
      </div>
    );
  }

  return (
    <div>
      <App />
    </div>
  );
}

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
    <Loading />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
