/**
 * @fileoverview Orders page, responsible for displaying the completed and pending orders, and their details.
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

  // This method is responsible for displaying the details of the orders.
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

  // This method is responsible for displaying the completed and pending orders.
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
