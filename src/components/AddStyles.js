import { useState } from "react";
import { useFirestore } from "reactfire";

function AddStyles(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [style, setStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: "false",
  });

  const handleChange = (e) => {
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
        }
      };
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  const resetImage = (e) => {
    setStyle({ ...style, styleImage: "" });
    e.target.reset();
  };

  const addStyle = (e) => {
    e.preventDefault();

    let date = new Date();
    const collectionName =
      style.styleName +
      "_" +
      date.getDate() +
      "_" +
      (date.getMonth() + 1) +
      "_" +
      date.getFullYear();

    stylesRef
      .collection(collectionName)
      .doc("settings")
      .set({
        name: style.styleName,
        image: style.styleImage,
        visible: style.styleVisible === "true" ? true : false,
      })
      .then(() => {
        stylesRef.get(collectionName).then(function (content) {
          if (content.exists) {
            let newStyles = content.data()["styles"];
            newStyles.push(collectionName);
            stylesRef.update({ styles: newStyles });

            props.setPopup(
              "Confirmación",
              "Se ha agregado la categoría con éxito."
            );
            props.openPopup();
            e.target.reset();
          }
        });
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir nuevo estilo</h4>
            <form id="addStyle" onSubmit={addStyle} onReset={resetImage}>
              <label className="form-label">Nombre del estilo</label>
              <input
                type="text"
                name="styleName"
                className="form-control"
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
                    defaultChecked
                    required
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
                <button type="reset" className="btn btnClear topMargin mx-2">
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStyles;
