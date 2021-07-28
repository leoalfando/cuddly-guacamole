import React from 'react';

interface AccountFormState {
  [key: string]: any;
}

class AccountForm extends React.Component<any, AccountFormState> {
  render() {
    const { state } = this;
    return (
      <div>
        <form
          onSubmit={e => this.props.handleCreateAccount(e)}
          className="search-form">
          <input
            type="number"
            placeholder="Enter initial account credit"
            name="initialAccountAmount"
            value={this.props.state.initialAccountAmount}
            onChange={this.props.handleChange}
            className="search-input-box"
            required
          />
          <button hidden type="submit">
          </button>
        </form>
      </div>
    );
  }
}

export default AccountForm;
