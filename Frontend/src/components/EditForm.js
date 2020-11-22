import React from 'react';
import apiClient from '../services/api';
import Categories from './Categories';
export default class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            date: '',
            amount: '',
            category: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeDate = (event) => {
        this.setState({ date: event.target.value });
    }
    handleChangeAmount = (event) => {
        this.setState({ amount: event.target.value });
    }
    handleChangeCatId = categories => {
        this.setState({ category: categories });
    }
    handleSubmit(event) {
        event.preventDefault();
        apiClient.get('/sanctum/csrf-cookie')
        .then(response => {
            apiClient.post('/api/updateExpense', {
                id:this.props.location.state.eid,
                category_id: this.state.category,
                amount:this.state.amount,
                date: this.state.date
            })
            this.props.history.push('/expenses')
        });
    }
    submit=(e)=>{
        this.handleSubmit(e);
    }
    render() {
        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
            <form onSubmit={(e)=>{this.submit(e)}}>
                <table className="table table-striped">
                    <thead className='thead-dark'>
                    <tr align="center">
                        <th colSpan="4"><h3>Edit Expense</h3></th>
                        </tr></thead>
                        <tr>
          <td>  <input className="form-control" type="date" value={this.state.value} onChange={this.handleChangeDate} /></td>
            {/* <input type="number" value={this.state.value} onChange={this.handleChangeAmount} /> */}
            <td>         <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">$</span>
  </div>
  <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" placeholder="Enter Amount" value={this.state.value} onChange={this.handleChangeAmount}/>
  <div className="input-group-append">
    <span className="input-group-text">.00</span>
  </div>
</div></td>
<td> <Categories onChangeCatId={this.handleChangeCatId} {...this.props} loggedIn={true} /></td>
                <td><input className="btn btn-dark" type="submit" value="Submit"  /></td></tr>
                </table>
            </form>
            </div>
        );
    }
}