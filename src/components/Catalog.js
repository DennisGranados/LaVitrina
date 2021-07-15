import { useState } from "react";
import CatalogItem from "./CatalogItem";
import CatalogItemContent from "./CatalogItemContent";
import CatalogStyleContent from "./CatalogStyleContent";

function Catalog(props) {
  const actionCancel = () => {
    setMode("content");

    setContent({
      ...content,
      edit: "",
      delete: "",
      items: "",
    });
  };

  const actionDetails = (id, name, styleName, styleID) => {
    setMode("delete");

    setContent({
      ...content,
      edit: "",
      delete: (
        <CatalogItem
          id={id}
          name={name}
          styleID={styleID}
          styleName={styleName}
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
      delete: "",
      items: (
        <CatalogItemContent
          styleID={styleID}
          styleName={styleName}
          actionCancel={actionCancel}
          actionDetails={actionDetails}
          actionItems={actionItems}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
      edit: "",
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
    edit: "",
    items: "",
  });

  return <div>{content[mode]}</div>;
}

export default Catalog;
