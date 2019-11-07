import React, { Component } from 'react';
import styles from './SearchForm.module.css';
import PropTypes from 'prop-types';
//import { Test } from './SearchForm.styles';

class SearchForm extends Component {
  state = {
    qwery: '',
  };

  onChange = e => {
    this.setState({ qwery: e.target.value });
  };
  heanleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { qwery } = this.state;
    onSubmit(qwery);

    this.setState({ qwery: '' });
  };

  render() {
    const { qwery } = this.state;

    return (
      <form className={styles.searchForm} onSubmit={this.heanleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          onChange={this.onChange}
          value={qwery}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
