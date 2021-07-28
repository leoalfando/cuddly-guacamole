import React from 'react';

interface SearchFormState {
  [key: string]: any;
}

class SearchForm extends React.Component<any, SearchFormState> {
  render() {
    const { state } = this;
    return (
      <div>
        <form
          onSubmit={e => this.props.handleSubmit(e)}
          className="search-form">
          <input
            type="text"
            placeholder="Enter user name"
            name="userName"
            value={this.props.state.userName}
            onChange={this.props.handleChange}
            className="search-input-box"
            required
          />

          <button hidden type="submit">
            1111
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
