import React from 'react';
import { BsSearch } from 'react-icons/bs';
import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleTextChange = event => {
    this.setState({
      query: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      this.setState({ query: '' });
      alert('Empty searchbar');
      return;
    }

    this.props.submitHandler(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BsSearch style={{ width: 25, height: 25 }} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleTextChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
