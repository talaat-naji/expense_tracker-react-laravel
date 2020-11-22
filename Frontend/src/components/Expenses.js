import React from 'react';
import apiClient from '../services/api';
import ExpensesForm from './ExpensesForm';

const Expenses = (props) => {
    const [expenses, setExpenses] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/expenses')
                .then(response => {
                    setExpenses(response.data)
                })
                .catch(error => console.error(error)))

        }
    }, []);
    
         const handleDeleteExpense=(id)=>{
            apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                apiClient.delete('/api/deleteExpense/${id}');
                const expenses = expenses.filter(item => item.id !== id);
                this.setState({ expenses });
            });
    }
    
            


    if (props.loggedIn) {
        return (
        
              <>
            <ExpensesForm/>
            <table className="table table-striped">
              <thead className='thead-dark'>
                <tr>
                  <th>#</th>
                  
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>View/Delete</th>
                </tr>
              </thead>
              <tbody className="">
        {expenses.map((expense) => {
            return (
                <tr key={expense.id}>
                    <td>{expense.id}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category.name}</td>
                    <td>{expense.date}</td>
                    {/* <td><svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={(e) => {this.handleDeleteExpense(expense.id)}}>
               <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" /> */}
            {/* </svg> */}
            <td><button onClick={(e) => {
      
      apiClient.get('/sanctum/csrf-cookie')
      .then(response => {
          apiClient.post('/api/deleteExpense', {
            id:expense.id   
          }
          
          )
          const expenses = this.state.expenses.filter(item => item.id !== expense.id);
        this.setState({ expenses });
      });}}>Delete</button>
            </td>
                </tr>);
        })}
                </tbody></table>
            </>
           
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Expenses;