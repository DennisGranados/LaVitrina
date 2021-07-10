import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

function EditStyle(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [oldStyle, setOldStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: "false",
  });
  const [newStyle, setNewStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: "false",
  });
  const [temp, setTemp] = useState([]);
  const [visible, setVisible] = useState([]);

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

  function isVisible() {
    if (visible.length === 0) {
      let temp = [];

      if (oldStyle.visible === true) {
        temp.push(
          <div>
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
        );
        setVisible(temp);
      } else {
        temp.push(
          <div>
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
        );
        setVisible(temp);
      }
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
  };

  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result.trim) {
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

  const updateName = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.id)
      .doc("settings")
      .update({
        name: newStyle.styleName,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado el nombre con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateImage = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.id)
      .doc("settings")
      .update({
        image: newStyle.styleImage,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado la imagen con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateVisible = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.id)
      .doc("settings")
      .update({
        visible: newStyle.styleVisible === "true" ? true : false,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha modificado la visibilidad con éxito."
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
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Editando <strong>{oldStyle.styleName}</strong>
            </h4>
            <div className="col mt-3">
              <label className="form-label">Nombre del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateName}
              >
                <input
                  type="text"
                  name="styleName"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={oldStyle.styleName}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Imagen del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateImage}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="styleImage"
                  className="form-control"
                  onChange={handleImage}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
              <div className="text-center my-3">
                {newStyle.styleImage !== "" ? (
                  <img
                    src={newStyle.styleImage}
                    alt="Imagen del producto"
                    width="250"
                  />
                ) : (
                  <img
                    src={oldStyle.styleImage}
                    alt="Imagen del producto"
                    width="250"
                  />
                )}
              </div>
            </div>
            <div className="col mt-3">
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateVisible}
              >
                <div className="col-9 mb-2 mt-3 d-flex">
                  <label
                    htmlFor="InputCategoryImage"
                    className="form-label me-3"
                  >
                    Visible:
                  </label>
                  {isVisible()}
                  {visible}
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center">
              <button
                onClick={handleCancelEdit}
                type="cancel"
                className="btn btn-warning topMargin mx-2"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStyle;
