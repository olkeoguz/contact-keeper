import React from "react";
import Contacts from "../../components/contacts/Contacts";
import ContactForm from "../../components/contacts/ContactForm";
import ContactFilter from "../../components/contacts/ContactFilter";
import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.Home}>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
