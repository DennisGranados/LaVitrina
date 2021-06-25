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
  const catalogRef = useFirestore().collection("webpage").doc("contacs");

  // subscribe to a document for realtime updates. just one line!
  const { data, status } = useFirestoreDocData(catalogRef);

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
