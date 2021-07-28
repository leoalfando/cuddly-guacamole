import React from 'react';
import Modal from '../../components/Modal/Modal'
import SearchForm from '../../components/SearchForm';
import Api from '../../Apis/Api';
import { toast } from 'react-toastify';
const api = new Api();
interface AccountState {
  userName: string;
  page: number,
  limit: number,
  nextPage: number,
  userData: any;
  showViewModal: boolean;
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
      showViewModal: false
    };
  }
  handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const { state } = this;
      if (state.userName.length >= 3) {
        const { data } = await api.getUserList({
          keyword: state.userName,
          page: state.page,
          limit: state.limit
        });
        this.setState({
          userData: data?.data,
          nextPage: data?.pagination?.nextPageToken,
          page: data?.pagination?.page
         });
      } else {
        toast.error('Input minimum 3 characters');
      }
    } catch (error) {
      toast.error(error.message);
      this.props.history.replace('/');
    }
  };

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  showViewModal = () => {
    this.setState({ showViewModal: !this.state.showViewModal })
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
                    <td className='d-flex'><p onClick={this.showViewModal}>Manage Account</p></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='d-flex align-items-center justify-content-end'>
            <div>Prev</div> <div>{this.state.page}</div> </div> <div>Next</div>
          </div>
        </div>
        : <h3 className="empty-text">Please enter user's name</h3>
      }
      { state.showViewModal &&
        <Modal show={state.showViewModal} handleClose={this.showViewModal}>
          AAA
        </Modal>
      }
      </section>
    )
  }
}

export default HomeView;
