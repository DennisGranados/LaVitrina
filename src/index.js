import React from "react";
import ReactDOM from "react-dom";
import "./Styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
} from "reactfire";
import config from "./config";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
