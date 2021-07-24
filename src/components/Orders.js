/**
 * @fileoverview Orders, shows the items added to the user's shopping cart.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Orders was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { useState } from "react";
import OrdersContent from "./OrdersContent";
import OrdersDetails from "./OrdersDetails";

function Orders(props) {
  const actionCancel = () => {
    setMode("content");

    setContent({
      ...content,
      details: "",
    });
  };

  const actionDetails = (orderID, client, date) => {
    setMode("details");

    setContent({
      ...content,
      details: (
        <OrdersDetails
          orderID={orderID}
          client={client}
          date={date}
          actionCancel={actionCancel}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
    });
  };

  const [mode, setMode] = useState("content");
  const [content, setContent] = useState({
    content: (
      <OrdersContent
        actionDetails={actionDetails}
        setPopup={props.setPopup}
        openPopup={props.openPopup}
      />
    ),
    details: "",
  });

  return <div>{content[mode]}</div>;
}
export default Orders;
