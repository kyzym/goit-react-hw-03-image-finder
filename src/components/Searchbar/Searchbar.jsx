import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const normalizedName = this.state.name.trim();

    if (normalizedName === '' && !normalizedName) {
      return toast('nothing');
    }

    this.props.onSubmit(normalizedName);

    return this.setState({ name: '' });
  };

  render() {
    return (
      <header className="searchbar Searchbar">
        <form onSubmit={this.handleSubmit} className="form SearchForm">
          <button type="submit" className="button SearchForm-button">
            <BsSearch style={{ width: 25, height: 25 }} />
          </button>

          <input
            className="input SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
