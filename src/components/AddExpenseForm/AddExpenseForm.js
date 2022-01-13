import React, {useState} from 'react';
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import './add-expense-form.scss'

const AddExpenseForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const handleChange = (event) => {
        const { value, name } = event.target;
    
        if (name === "title") {
          setTitle(value);
        }
    
        if (name === "price") {
          setPrice(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          console.log(title, price)
          setPrice("");
          setTitle("");
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <div className='add-expense-form'>
            <h3>Add an expense for this month</h3>
            <form onSubmit={handleSubmit}>
                <FormInput
                    title="true"
                    type="text"
                    name="title"
                    value={title}
                    handleChange={handleChange}
                    label={"Title"}
                    required
                />

                <FormInput
                    type="number"
                    name="price"
                    value={price}
                    handleChange={handleChange}
                    label={"Price"}
                    required
                />
                <label htmlFor="category">Category:</label>
                <div className="select-dropdown">
                    <select id="category">
                        <option>Please Select</option>
                        <option>Groceries</option>
                        <option>Online Shopping</option>
                        <option>Fuel</option>
                        <option>Bills</option>
                        <option>Eating Out</option>
                        <option>Savings</option>
                        <option>Retail</option>
                        <option>Gifts</option>
                        <option>Other</option>
                    </select>
                    
                </div>
                <CustomButton>Add expense</CustomButton>
                <CustomButton inverted>Clear form</CustomButton>
            </form>
        </div>
    )
};

export default AddExpenseForm;