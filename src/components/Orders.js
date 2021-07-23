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
