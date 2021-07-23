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
