/**
 * @fileoverview Catalog page, responsible for displaying the styles, their items and the details of these.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Catalog was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { useState } from "react";
import CatalogItem from "./CatalogItem";
import CatalogItemContent from "./CatalogItemContent";
import CatalogStyleContent from "./CatalogStyleContent";

function Catalog(props) {
  const actionCancel = () => {
    setMode("content");

    setContent({
      ...content,
      details: "",
      items: "",
    });
  };

  // This method is responsible for displaying the details pertaining to each item on the Catalog page.
  const actionDetails = (
    styleID,
    styleName,
    id,
    name,
    code,
    image,
    quantity,
    brand,
    color,
    price,
    size
  ) => {
    setMode("details");

    setContent({
      ...content,
      details: (
        <CatalogItem
          styleID={styleID}
          styleName={styleName}
          key={id}
          id={id}
          name={name}
          code={code}
          image={image}
          quantity={quantity}
          brand={brand}
          color={color}
          price={price}
          size={size}
          actionItems={actionItems}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
      items: "",
    });
  };

  // This method is responsible for displaying the items available in each style on the Catalog Page.
  const actionItems = (styleID, styleName) => {
    setMode("items");

    setContent({
      ...content,
      details: "",
      items: (
        <CatalogItemContent
          key={styleID}
          styleID={styleID}
          styleName={styleName}
          actionCancel={actionCancel}
          actionDetails={actionDetails}
          actionItems={actionItems}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
    });
  };

  // This method is responsible for displaying the styles visible and available to the user on the Catalog page.
  const [mode, setMode] = useState("content");
  const [content, setContent] = useState({
    content: (
      <CatalogStyleContent
        actionItems={actionItems}
        actionDetails={actionDetails}
        setPopup={props.setPopup}
        openPopup={props.openPopup}
      />
    ),
    details: "",
    items: "",
  });

  return <div>{content[mode]}</div>;
}

export default Catalog;
