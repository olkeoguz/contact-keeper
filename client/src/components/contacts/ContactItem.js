import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import classes from './ContactItem.module.css';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  console.log(_id, name);
  const { setCurrent, deleteContact, clearCurrent } = useContext(
    ContactContext
  );

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className={[classes.Card, classes.bgLight].join(' ')}>
      <h3>
        {name}{' '}
        <span
          className={[
            classes.Badge,
            type === 'professional'
              ? classes.badgeSuccess
              : classes.badgePrimary,
          ].join(' ')}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className={classes.list}>
        {email && (
          <li>
            {' '}
            <i className='fas fa-envelope-open'></i> {email}{' '}
          </li>
        )}
        {phone && (
          <li>
            {' '}
            <i className='fas fa-phone'></i> {phone}{' '}
          </li>
        )}
      </ul>
      <p>
        <button
          className={[classes.btn, classes.btnDark, classes.btnSM].join(' ')}
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button
          className={[classes.btn, classes.btnDanger, classes.btnSM].join(' ')}
          onClick={onDelete}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
