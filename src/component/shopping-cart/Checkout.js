import React, { useContext, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import emailjs from "emailjs-com";
import {
  DeleteOutlined
} from "@ant-design/icons";

import CartContext from "../../store/cart-context";
import { CheckCircleOutlined } from "@ant-design/icons";

const isEmpty = (value) => value.trim() === "";
const isNotNumberPhone = (value) => value.trim().length === 10 && Number(value);

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    phoneNumber: true,
    address: true,
    email: props.user.email,
  });
  const userLocal = JSON.parse(localStorage.getItem("userLogined"));

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const addressInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneNumberIsValid =
      isNotNumberPhone(enteredPhoneNumber) && !isEmpty(enteredPhoneNumber);
    const enteredAddressIsValid = !isEmpty(enteredAddress);

    setFormInputValid({
      name: enteredNameIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
      address: enteredAddressIsValid,
      email: props.user.email,
    });

    const formIsValid =
      enteredNameIsValid && enteredPhoneNumberIsValid && enteredAddressIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phoneNumber: enteredPhoneNumber,
      address: enteredAddress,
    });

    let invoice = "";
    for (var i in cartCtx.items) {
      invoice += `<tr style="height: 30px; background-color: rgb(246, 244, 243); text-align: center;">
            <th scope="row">${Number(i) + 1}</th>
            <td>${cartCtx.items[i].name}</td>
            <td>${cartCtx.items[i].amount}</td>
            <td>${new Intl.NumberFormat().format(cartCtx.items[i].price)}</td>
        </tr>  `;
    }

    emailjs.send(
      "service_97n2swa",
      "template_va863h5",
      {
        name: enteredName,
        email: props.user.email,
        subject: "X??c nh???n ????n h??ng!",
        message: `
            <table class="table"  style="width: 100%;">
                <thead style="background-color: tan; height: 30px;">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">T??n s???n ph???m</th>
                    <th scope="col">S??? l?????ng</th>
                    <th scope="col">Gi??</th>
                    </tr>
                </thead>
                <tbody>
                   ${invoice}                  
                </tbody>
                </table>
            `,
        totalAmount:
          new Intl.NumberFormat().format(cartCtx.totalAmount) + " VND",
      },
      "user_iacEpezHMPueNSO3W3Ub4"
    );
  };
  const clearForm = () => {
    nameInputRef.current.value = '';
    phoneNumberInputRef.current.value = '';
    addressInputRef.current.value = '';
  };

  return (
    <>
      <div className={classes.overlay} onClick={props.onClose} />

      <form className={classes.form} onSubmit={confirmHandler}>
        {!props.isSubmitting && (
          <>
            <div className="form-group mb-4">
              <label className="font-weight-bold">H??? v?? t??n</label>
              <input
                type="text"
                className="form-control mt-2"
                ref={nameInputRef}
                defaultValue={userLocal.fullName}
              />
              {!formInputValid.name && (
                <small class="form-text text-muted">
                  B???n ch??a nh???p h??? v?? t??n!
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">S??? ??i???n tho???i</label>
              <input
                type="text"
                className="form-control mt-2"
                defaultValue={userLocal.phoneNumber}
                ref={phoneNumberInputRef}
              />
              {!formInputValid.phoneNumber && (
                <small class="form-text text-muted">
                  S??? ??i???n tho???i ch??a ????ng ?????nh d???ng!
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">?????a ch???</label>
              <input
                type="text"
                className="form-control mt-2"
                defaultValue={userLocal.address}
                ref={addressInputRef}
              />
              {!formInputValid.address && (
                <small class="form-text text-muted">
                  B???n ch??a nh???p ?????a ch???!
                </small>
              )}
            </div>
            <div className={classes.btn} style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                  className="btn btn-danger"
                  onClick={clearForm}
                  type="button"
                  style={{
                    display: 'flex'
                  }}
              >
                <DeleteOutlined />
              </button>
              <div>
                <button
                    className="btn btn-danger"
                    onClick={props.onClose}
                    type="button"
                >
                  ????ng
                </button>
                <button className="btn btn-primary">?????t h??ng</button>
              </div>
            </div>
          </>
        )}
      </form>
      {props.isSubmitting && (
        <div className={classes.alert}>
          <CheckCircleOutlined style={{ fontSize: 50 }} />
          <p>Thanh to??n th??nh c??ng!</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
