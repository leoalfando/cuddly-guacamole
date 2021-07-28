import React from 'react';
import AccountModal from '../../components/AccountModal/AccountModal'
import SearchForm from '../../components/SearchForm';
import Api from '../../Apis/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const api = new Api();

interface AccountState {
  userName: string;
  page: number,
  limit: number,
  nextPage: number,
  userData: any;
  accountData: any;
  showManageAccountModal: boolean;
  transactionData: any;
  initialAccountAmount: string;
  activeUserId: string;
  newTransactionAmount: string;
  activeAccountId: string;
}
class HomeView extends React.Component<any, AccountState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '',
      page: 1,
      limit: 5,
      nextPage: 0,
      userData: [],
      showManageAccountModal: false,
      accountData: null,
      transactionData: null,
      initialAccountAmount: "",
      activeUserId: '',
      newTransactionAmount:'',
      activeAccountId:'',
    };
  }
  componentDidMount(){
    document.title = "🥑 Cuddly Guacamole"
  }
  handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const { state } = this;
      if (state.userName.length >= 2) {
        const { data } = await api.getUserList({
          keyword: null,
          page: state.page,
          limit: state.limit
        });
        this.setState({
          userData: data?.data,
          nextPage: data?.pagination?.nextPageToken,
          page: data?.pagination?.page
         });
      } else {
        toast.error('Input minimum 2 characters');
      }
    } catch (error) {
      toast.error(error.message);
      this.props.history.replace('/');
    }
  };

  handleCreateAccount = async (event: any) => {
    try {
      event.preventDefault();
      const { state } = this;
      await api.createAccount({
          userId: state.activeUserId,
          amount: state.initialAccountAmount,
          type: 1,
      });
      this.showManageAccountModal(state, state.activeUserId);
    } catch (error) {
      toast.error(error.message);
      this.props.history.replace('/');
    }
  };

  handleCreateTransaction = async (event: any) => {
    try {
      event.preventDefault();
      const { state } = this;
      await api.createTransaction({
          accountId: state.activeAccountId,
          amount: state.newTransactionAmount,
          type: 1,
      });
      this.showManageAccountModal(state, state.activeUserId);
    } catch (error) {
      toast.error(error.message);
      this.props.history.replace('/');
    }
  };

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  showManageAccountModal = async (state, userId) => {
    this.setState({ showManageAccountModal: true });
    const accountResult = await api.getAccount({
      userId: userId,
    });
    let transactionResult;
    if(accountResult?.data?.id){
      transactionResult = await api.getTransactions({
        accountId: accountResult.data.id
      });
      this.setState({activeAccountId: accountResult.data.id});
    }
    this.setState({activeUserId: userId});
    this.setState({accountData: accountResult?.data, transactionData: transactionResult?.data?.data});
  }

  closeManageAccountModal = async (state) => {
    this.setState({ showManageAccountModal: false });
  }
  render() {
    const { state } = this;
    return (
      <section className='p-xxl'>
        <SearchForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={state}
        />
        { state.userData?.length > 0
        ? <div>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
          <table>
            <tbody>
              {state.userData?.length > 0 &&
                state.userData.map((data, index) => (
                  <tr key ={data.id}>
                    <td>{data.id}</td>
                    <td>{data.firstName} {data.lastName}</td>
                    <td className='d-flex'><button className='manage-button' onClick={()=>this.showManageAccountModal(state, data.id)}>Manage Account</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
        : <h3 className="empty-text">Please enter user's name</h3>
      }
      { state.showManageAccountModal &&
        <AccountModal
          show={state.showManageAccountModal}
          handleClose={this.closeManageAccountModal}
          accountData={state.accountData}
          transactionData={state.transactionData}
          handleCreateAccount={this.handleCreateAccount}
          state={state}
          handleChange={this.handleChange}
          handleCreateTransaction= {this.handleCreateTransaction}
        >
        </AccountModal>
      }
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </section>
    )
  }
}

export default HomeView;
