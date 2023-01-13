import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ submitHandler }) => {
  const [currQuery, setCurrQuery] = useState('');

  const handleTextChange = event => {
    setCurrQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (currQuery.trim() === '') {
      setCurrQuery('');
      alert('Empty searchbar');
      return;
    }

    submitHandler(currQuery);
    setCurrQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <BsSearch style={{ width: 25, height: 25 }} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleTextChange}
          value={currQuery}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
