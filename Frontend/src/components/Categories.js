import React from 'react';
import apiClient from '../services/api';
const Categories = (props) => {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.get('sanctum/csrf-cookie').then(()=>apiClient.get('/api/categories')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => console.error(error)))
            
        }
    },[]);
    const categoryList = categories.map((category) => 
        <option value={category.id} key={category.id} >{category.name}</option>
       
    );
    if (props.loggedIn) {
        return (
            
            <select className="custom-select" onChange={(e)=>{props.onChangeCatId(e.target.value)}} >
                <option value='0'>Choose a Category</option>{categoryList}
            </select>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Categories;