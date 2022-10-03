import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import FormInput from './components/FormInput';
import Reservations from './components/ReservationArray';

const App = () => {

  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultDateValue = new Date(date).toISOString().split('T')[0];

  const [values, setValues] = useState({
    startDate:"",
    endDate:"",
    email:"",
    resource:"",
    comments:""
  });

  const inputsArr = [
    {
      id:1,
      name:"startDate",
      type:"date",
      label: "Start date",
      errorMessage: "Start date should be at least the one of today",
      required: true,
      pattern: defaultDateValue
    },
    {
      id:2,
      name:"endDate",
      type:"date",
      label:"End date",
      errorMessage: "The end date can't be set before the start date",
      required: true
    },
    {
      id:3,
      name:"email",
      type:"email",
      errorMessage: "It should be a valid email address",
      placeholder:"Email",
      required: true,
    },
    {
      id:4,
      name:"resource",
      type:"text",
      errorMessage: "There is no such resource",
      placeholder:"Resource",
      required: true
    },
    {
      id:5,
      name:"comments",
      type:"text",
      placeholder:"Comments",
      errorMessage: ""
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  console.log(values);

  return (
    <div className='mainForm'>
      <Reservations />
      <div className='addReservation'>
        Add a reservation
        <form onSubmit={handleSubmit}>
          {inputsArr.map((input) => (
            <FormInput 
              key={input.id} 
              {...input} 
              value={values[input.name]} 
              onChange={onChange}/>
          ))}
          <button>Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default App