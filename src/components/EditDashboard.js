import { useState } from "react";
import DeleteStyle from "./DeleteStyle";
import EditStyle from "./EditStyle";
import EditStylesContent from "./EditStylesContent";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import EditItemContent from "./EditItemContent";

function EditDashboard(props) {
  const actionCancel = () => {
    setMode("content");

    setContent({
      ...content,
      edit: "",
      delete: "",
      items: "",
    });
  };

  const actionEdit = (id, name, styleName, styleID) => {
    setMode("edit");

    if (styleID === "" || styleID === undefined) {
      setContent({
        ...content,
        delete: "",
        edit: (
          <EditStyle
            id={id}
            key={id}
            styleName={name}
            actionCancel={actionCancel}
            setPopup={props.setPopup}
            openPopup={props.openPopup}
          />
        ),
        items: "",
      });
    } else {
      setContent({
        ...content,
        delete: "",
        edit: (
          <EditItem
            id={id}
            key={id}
            name={name}
            styleName={styleName}
            styleID={styleID}
            actionCancel={actionCancel}
            actionItems={actionItems}
            setPopup={props.setPopup}
            openPopup={props.openPopup}
          />
        ),
        items: "",
      });
    }
  };

  const actionDelete = (id, name, styleName, styleID) => {
    setMode("delete");

    if (styleID === "" || styleID === undefined) {
      setContent({
        ...content,
        edit: "",
        delete: (
          <DeleteStyle
            id={id}
            key={id}
            name={name}
            actionCancel={actionCancel}
            setPopup={props.setPopup}
            openPopup={props.openPopup}
          />
        ),
        items: "",
      });
    } else {
      setContent({
        ...content,
        edit: "",
        delete: (
          <DeleteItem
            id={id}
            key={id}
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
    }
  };

  const actionItems = (styleID, styleName) => {
    setMode("items");

    setContent({
      ...content,
      delete: "",
      items: (
        <EditItemContent
          key={styleID}
          styleID={styleID}
          styleName={styleName}
          actionCancel={actionCancel}
          actionEdit={actionEdit}
          actionDelete={actionDelete}
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
      <EditStylesContent
        type={props.type}
        actionItems={actionItems}
        actionEdit={actionEdit}
        actionDelete={actionDelete}
        setPopup={props.setPopup}
        openPopup={props.openPopup}
      />
    ),
    edit: "",
    items: "",
  });

  return <div>{content[mode]}</div>;
}

export default EditDashboard;
