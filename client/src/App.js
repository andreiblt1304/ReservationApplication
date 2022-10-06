import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import FormInput from './components/FormInput';
import Reservations from './components/ReservationArray';
import axios from 'axios';

const App = () => {
  const URL = "http://localhost:8080/reservations";

  const [values, setValues] = useState({
    startDate:"",
    endDate:"",
    resource:"",
    email:"",
    comments:""
  });

  const inputsArr = [
    {
      id:1,
      name:"startDate",
      type:"date",
      label: "Start date",
      errorMessage: "Start date should be at least the one of today",
      required: true
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
      name:"resourceId",
      type:"text",
      errorMessage: "There is no such resource",
      placeholder:"Resource",
      required: true
    },
    {
      id:4,
      name:"ownerEmail",
      type:"email",
      errorMessage: "It should be a valid email address",
      placeholder:"Email",
      required: true,
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

    const inputs = new FormData(e.target);
    const value = Object.fromEntries(inputs.entries());
    console.log(inputs.entries);
    var object = {};
    inputs.forEach(function(value, key) {
      object[key] = value;
    })

    //var json = JSON.stringify(object);

    console.log(object);

    axios
      .post(URL, object)
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        console.error(err);
    });

    // fetch(URL, {
    //   method: 'POST', 
    //   headers: {
    //     'Content-Type': 'text/json; charset=UTF-8',
    //     'Accept': 'text/json'
    //   },
    //   body: JSON.stringify(object)
    //   }).then((response) => { 
    //   window.location.reload(false);
    //   return response.json() 
    // });
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