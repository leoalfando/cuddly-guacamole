import { Fragment } from 'react';
import './AccountModal.scss'
import { format } from "date-fns";
import AccountForm from '../AccountForm';
const AccountModal = ({
   handleClose,
   show,
   children,
   accountData,
   transactionData,
   handleCreateAccount,
   state,
   handleChange,
   handleCreateTransaction
  }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none"
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='close-btn' onClick={handleClose}>
          X
        </div>
        { accountData
        ? <div>
            <p><b>Account Id</b> : {accountData.id}</p>
            <p><b>Account Type</b> : {accountData.type}</p>
            <p><b>Created Date</b> : {format(new Date(accountData.createdDate), "MMMM do, yyyy H:mma")}</p>
            <div className='d-flex'><b style={{padding: '1.5rem 0'}}>Create Credit Transaction</b>
            <Fragment>
                  <form
                    onSubmit={e => handleCreateTransaction(e)}
                    className="search-form">
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter transaction amount"
                      name="newTransactionAmount"
                      value={state.newTransactionAmount}
                      onChange={handleChange}
                      className="search-input-box"
                      required
                    />
                    <button className='manage-button' type="submit"> Add Transaction
                    </button>
                  </form>
                </Fragment>
              </div>

            <div className="tbl-header">
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Transaction Date</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table>
                <tbody>
                {transactionData?.length > 0 &&
                transactionData.map((data, index) => (
                  <tr key ={data.id}>
                    <td>{data.id}</td>
                    <td>{data.amount}</td>
                    <td>{data.transactionCode}</td>
                    <td>{format(new Date(data.createdDate), "MMMM do, yyyy H:mma")}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        : <div>
            <h3 className="empty-text">No account found please create here</h3>
            <AccountForm handleCreateAccount={handleCreateAccount} state={state} handleChange={handleChange}></AccountForm>
          </div>
      }
        {children}
      </section>
    </div>
  )
}

export default AccountModal
