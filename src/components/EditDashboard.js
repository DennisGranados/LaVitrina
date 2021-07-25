/**
 * @fileoverview EditDashboard page, responsible for displaying the styles and the information of these.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditDashboard was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
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

  // This method is responsible for displaying the styles to edit them.
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

  // This method is responsible for displaying the styles to delete them.
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

  // This method load the items existents to edit.
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

  // This method load the styles existents to edit.
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
