import { useState } from "react";
import { useFirestore } from "reactfire";
import { isMethodSignature } from "typescript";

function AddPayment(props) {
    const firestore = useFirestore();
    const paymentMethodRef = firestore.collection("webpage").doc("payment_methods");
    const [method, setPaymentMethod] = useState({
        accountNumber: "",
        bankingEntity: "",
        sinpeNumber: "",
        sinpeOwner: "",
    });

    const handleChange = (e) => {
        setPaymentMethod({
            ...method,
            [e.target.name]: e.target.value,
        });
    };

    const addBankingAccount = (e) => {
        e.preventDefault();

        paymentMethodRef.get().then((content) => {
            let banking = content.data()["banking"];
            let flag = false;
            if (!banking) {
                banking = {};
                banking[method.bankingEntity] = method.accountNumber;
                flag = true;
            } else {
                if (banking[method.bankingEntity]) {
                    props.setPopup(
                        "Error",
                        "Ya existe una cuenta con esta entidad."
                    );
                    props.openPopup();
                    e.target.reset();
                } else {
                    banking[method.bankingEntity] = method.accountNumber;
                    flag = true;
                }
            }
            if (flag) {
                paymentMethodRef
                    .update({
                        banking: banking,
                    })
                    .then(() => {
                        props.setPopup(
                            "Confirmación",
                            "Se ha agregado la cuenta bancaria con éxito."
                        );
                        props.openPopup();
                        e.target.reset();
                    })
                    .catch((error) => {
                        props.setPopup(error.code);
                        props.openPopup();
                    });
            }
        });
    }
    const addSinpeMobile = (e) => {
        e.preventDefault();

        paymentMethodRef.get().then((content) => {
            let sinpe = content.data()["sinpe"];
            let flag = false;
            if (!sinpe) {
                sinpe = {};
                sinpe[method.sinpeNumber] = method.sinpeOwner;
                flag = true;
            } else {
                if (sinpe[method.sinpeNumber]) {
                    props.setPopup(
                        "Error",
                        "Ya existe este SINPE móvil."
                    );
                    props.openPopup();
                    e.target.reset();
                } else {
                    sinpe[method.sinpeNumber] = method.sinpeOwner;
                    flag = true;
                }
            }
            if (flag) {
                paymentMethodRef
                    .update({
                        sinpe: sinpe,
                    })
                    .then(() => {
                        props.setPopup(
                            "Confirmación",
                            "Se ha agregado el SINPE móvil con éxito."
                        );
                        props.openPopup();
                        e.target.reset();
                    })
                    .catch((error) => {
                        props.setPopup(error.code);
                        props.openPopup();
                    });
            }
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="card col-6 me-3" id="card-submit">
                <div className="card-body">
                    <h4 className="text-center mb-4">Ingresar cuenta bancaria</h4>
                    <form className="col-12" onSubmit={addBankingAccount}>
                        <div className="mb-3">
                            <label className="form-label">Número de cuenta bancaria</label>
                            <input
                                type="text"
                                name="accountNumber"
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Ingrese el número de cuenta bancaria"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Entidad bancaria</label>
                            <input
                                type="text"
                                name="bankingEntity"
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Ingrese la entidad bancaria relacionada al número de cuenta"
                                required
                            />
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btnAccept ms-2">
                                Añadir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card col-6 ms-3" id="card-submit">
                <div className="card-body">
                    <h4 className="text-center mb-4">Ingresar SINPE móvil</h4>
                    <form className="col-12" onSubmit={addSinpeMobile}>
                        <div className="mb-3">
                            <label className="form-label">Número telefónico</label>
                            <input
                                type="number"
                                min="0"
                                name="sinpeNumber"
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Ingrese el número telefónico"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Propietario del SINPE móvil</label>
                            <input
                                type="text"
                                name="sinpeOwner"
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Ingrese el nombre completo del propietario del SINPE móvil"
                                required
                            />
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btnAccept ms-2">
                                Añadir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddPayment;