import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import classes from "./ContactForm.module.css";

const ContactForm = () => {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactContext
  );
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearCurrent();
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={onSubmit}>
        <h2>{current ? "Update Contact" : "Add Contact"}</h2>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />{" "}
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional
        <div>
          {" "}
          <input
            type="submit"
            value={current ? "Update Contact" : "Add Contact"}
            className={[classes.btn, classes.btnPrimary, classes.btnBlock].join(
              " "
            )}
          />
          {current && (
            <div>
              <button
                className={[
                  classes.btn,
                  classes.btnLight,
                  classes.btnBlock,
                ].join(" ")}
                onClick={clearAll}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
