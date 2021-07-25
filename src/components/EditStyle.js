/**
 * @fileoverview EditStyle, component that allows edit styles.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditItem page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";

function EditStyle(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [oldStyle, setOldStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: false,
  });
  const [newStyle, setNewStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: false,
    flag: false,
    edited: false,
    ready: false,
  });

  // This method is responsible for defining the old values of the style.
  useEffect(() => {
    stylesRef
      .collection(props.id)
      .get()
      .then((content) => {
        content.docs.forEach((element) => {
          if (element.id === "settings") {
            setOldStyle({
              styleName: element.data().name,
              styleImage: element.data().image,
              styleVisible: element.data().visible,
            });
          }
        });
      });
  }, [props, newStyle.ready]);

  // This method is responsible for defining the new values of the style.
  function fillNewStyle() {
    if (oldStyle.styleName === "") {
    } else if (!newStyle.flag) {
      setNewStyle({
        styleName: oldStyle.styleName,
        styleImage: oldStyle.styleImage,
        styleVisible: oldStyle.styleVisible,
        flag: true,
      });
    }
  }

  // This method is responsible for canceling the edition of the style.
  const handleCancelEdit = () => {
    props.actionCancel();
  };

  // This method set the new style.
  const handleChange = (e) => {
    setNewStyle({
      ...newStyle,
      [e.target.name]: e.target.value,
      edited: true,
    });
  };

  // This method is responsible for update if an style is visible or not.
  const handleVisible = (e) => {
    let visible;

    visible = e.target.value === "true" ? true : false;
    setNewStyle({ ...newStyle, [e.target.name]: visible, edited: true });
  };

  // This method is responsible for update the image of the style.
  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result) {
          setNewStyle({
            ...newStyle,
            styleImage: imageResult.target.result,
            edited: true,
          });
        } else {
          props.setPopup("image-not-found");
          props.openPopup();
          e.target.reset();
        }
      };
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  // This method is responsible for update the style selected.
  const updateStyle = (e) => {
    e.preventDefault();
    let edited = false;

    console.log(newStyle);

    if (!newStyle.edited) {
      props.setPopup("Error", "Debe de editar al menos un campo del estilo.");
      props.openPopup();
    } else {
      edited = true;
    }

    if (edited) {
      stylesRef
        .collection(props.id)
        .doc("settings")
        .update({
          name: newStyle.styleName,
          image: newStyle.styleImage,
          visible: newStyle.styleVisible,
        })
        .then(() => {
          props.setPopup(
            "Confirmación",
            "Se ha modificado la categoría con éxito."
          );
          props.openPopup();
          e.target.reset();
          setNewStyle({
            ...newStyle,
            ready: true,
          });
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    }
  };

  return (
    <div>
      {fillNewStyle()}
      <div className="col-12 justify-content-center d-flex">
        <div className="card mt-3" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Editando <strong>{oldStyle.styleName}</strong>
            </h4>
            <form id="addStyle" onSubmit={updateStyle}>
              <label className="form-label">Nombre del estilo</label>
              <input
                type="text"
                name="styleName"
                className="form-control"
                value={newStyle.styleName}
                placeholder={oldStyle.styleName}
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">Imagen del estilo</label>
              <input
                type="file"
                accept="image/*"
                name="styleImage"
                className="form-control"
                onChange={handleImage}
              />
              <div className="text-center my-3">
                {newStyle.styleImage ? (
                  <img
                    src={newStyle.styleImage}
                    alt="Imagen de la prenda"
                    width="250"
                  />
                ) : (
                  <img
                    src={oldStyle.styleImage}
                    alt="Imagen de la prenda"
                    width="250"
                  />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="InputCategoryImage" className="form-label me-3">
                  {oldStyle.styleVisible ? (
                    <Fragment>
                      Visible (<strong>Sí</strong>):
                    </Fragment>
                  ) : (
                    <Fragment>
                      Visible (<strong>No</strong>):
                    </Fragment>
                  )}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="styleVisible"
                    onChange={handleVisible}
                    value="true"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Si
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="styleVisible"
                    onChange={handleVisible}
                    value="false"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btnAccept topMargin mx-2">
                  Aceptar
                </button>
                <button
                  onClick={handleCancelEdit}
                  type="cancel"
                  className="btn btnClear topMargin mx-2"
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStyle;
