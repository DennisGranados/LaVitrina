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
  });
  const [temp, setTemp] = useState([]);

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
  }, [props, temp]);

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

  const handleCancelEdit = () => {
    props.actionCancel();
  };

  const handleChange = (e) => {
    setNewStyle({
      ...newStyle,
      [e.target.name]: e.target.value,
    });
    console.log(newStyle);
  };

  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result) {
          setNewStyle({
            ...newStyle,
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

  const updateStyle = (e) => {
    e.preventDefault();
    console.log(newStyle);

    stylesRef
      .collection(props.id)
      .doc("settings")
      .update({
        name: newStyle.styleName,
        image: newStyle.styleImage,
        visible: newStyle.styleVisible === "true" ? true : false,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha modificado la categoría con éxito."
        );
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  return (
    <div>
      {fillNewStyle()}
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5" id="card-submit">
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
                  Visible:
                </label>
                {oldStyle.styleVisible ? (
                  <Fragment>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="styleVisible"
                        onChange={handleChange}
                        value="true"
                        defaultChecked
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        No
                      </label>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="styleVisible"
                        onChange={handleChange}
                        value="true"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        No
                      </label>
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btnAccept topMargin mx-2">
                  Aceptar
                </button>
                <button
                  onClick={handleCancelEdit}
                  type="cancel"
                  className="btn btn-warning topMargin mx-2"
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
