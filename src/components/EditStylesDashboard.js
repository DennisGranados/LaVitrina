import { useState } from "react";
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

  /*const actionDelete = (id, title) => {
    setMode("delete");

    setContent({
      ...content,
      edit: "",
      add: "",
      delete: (
        <CatalogCategoryDelete
          id={id}
          title={title}
          gender={gender}
          actionCancel={actionCancel}
          setPopup={props.setPopup}
          openPopup={props.openPopup}
        />
      ),
    });
  };*/

  const [mode, setMode] = useState("content");
  const [content, setContent] = useState({
    content: (
      <EditStylesContent
        actionEdit={actionEdit}
        //actionDelete={actionDelete}
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
