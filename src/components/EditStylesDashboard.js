import { useState } from "react";
import DeleteStyle from "./DeleteStyle";
import EditStyle from "./EditStyle";
import EditStylesContent from "./EditStylesContent";

function EditStylesDashboard(props) {
  const actionCancel = () => {
    setMode("content");

    setContent({
      ...content,
      edit: "",
      delete: "",
    });
  };

  const actionEdit = (id) => {
    setMode("edit");

    setContent({
      ...content,
      delete: "",
      edit: (
        <EditStyle
          id={id}
          actionCancel={actionCancel}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
    });
  };

  const actionDelete = (id, name) => {
    setMode("delete");

    setContent({
      ...content,
      edit: "",
      add: "",
      delete: (
        <DeleteStyle
          id={id}
          name={name}
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
      <EditStylesContent
        actionEdit={actionEdit}
        actionDelete={actionDelete}
        setPopup={props.setPopup}
        openPopup={props.openPopup}
      />
    ),
    add: "",
    edit: "",
  });

  return <div>{content[mode]}</div>;
}

export default EditStylesDashboard;
