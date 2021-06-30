import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

function EditStyle(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [style, setStyle] = useState({
    styleID: "",
    styleName: "",
    styleImage: "",
    styleVisible: "false",
  });

  useEffect(() => {
    stylesRef
      .collection(props.id)
      .get()
      .then((content) => {
        content.docs.forEach((element) => {
          if (element.id === "settings") {
            setStyle({
              styleID: props.id,
              styleName: element.data().name,
              styleImage: element.data().image,
              styleVisible: element.data().visible,
            });
          }
        });
      });
  }, [props, stylesRef]);

  const handleCancelEdit = () => {
    props.actionCancel();
  };

  const handleChange = (e) => {
    console.log(style);
    setStyle({
      ...style,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result.trim) {
          setStyle({
            ...style,
            styleImage: imageResult.target.result,
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

  const addStyle = (e) => {
    e.preventDefault();

    stylesRef
      .collection(style.styleID)
      .doc("settings")
      .set({
        name: style.styleName,
        image: style.styleImage,
        visible: style.styleVisible === "true" ? true : false,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la categoría con exito."
        );
        props.openPopup();
        e.target.reset();
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  return (
    <div>
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir nuevo estilo</h4>
            <form id="addStyle" onSubmit={addStyle}>
              <label className="form-label">Nombre del estilo</label>
              <input
                type="text"
                name="styleName"
                className="form-control"
                placeholder={style.styleName}
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
                required
              />
              <div className="text-center my-3">
                {style.styleImage ? (
                  <img
                    src={style.styleImage}
                    alt="Imagen de la prenda"
                    width="250"
                  />
                ) : (
                  <p>No se ha cargado una imagen.</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="InputCategoryImage" className="form-label me-3">
                  Visible:
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="styleVisible"
                    onChange={handleChange}
                    value="true"
                    required
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
                    onChange={handleChange}
                    value="false"
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary topMargin mx-2"
                >
                  Aceptar
                </button>
                <button
                  onClick={handleCancelEdit}
                  type="cancel"
                  className="btn btn-warning topMargin mx-2"
                >
                  Cancelar
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
