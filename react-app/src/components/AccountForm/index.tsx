import React from 'react';

interface AccountFormState {
  [key: string]: any;
}

class AccountForm extends React.Component<any, AccountFormState> {
  render() {
    return (
      <div>
        <form
          onSubmit={e => this.props.handleCreateAccount(e)}
          className="search-form">
          <input
            type="number"
            min="0"
            placeholder="Enter initial account credit"
            name="initialAccountAmount"
            value={this.props.state.initialAccountAmount}
            onChange={this.props.handleChange}
            className="search-input-box"
            required
          />
          <button className='manage-button' type="submit"> Create
          </button>
        </form>
        <i style={{fontSize: '10px', paddingLeft:'200px'}}>*Account can be created without initial amount(insert 0 or empty)</i>
      </div>
    );
  }
}

export default AccountForm;
