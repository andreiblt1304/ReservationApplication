import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import FormInput from './components/FormInput';
import Reservations from './components/ReservationArray';

const App = () => {

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
      label: "Start date"
    },
    {
      id:2,
      name:"endDate",
      type:"date",
      label:"End date"
    },
    {
      id:3,
      name:"email",
      type:"text",
      placeholder:"Email"
    },
    {
      id:4,
      name:"resource",
      type:"text",
      placeholder:"Resource"
    },
    {
      id:5,
      name:"comments",
      type:"text",
      placeholder:"Comments"
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