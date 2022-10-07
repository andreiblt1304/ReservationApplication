import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FormInput from './FormInput';
import inputsArr from '../App';

const ReservationsArray = () => {

    const URL = "http://localhost:8080/reservations/";
    const [backendData, setBackendData ] = useState([{}]);

    const [values, setValues] = useState({
    startDate:"",
    endDate:"",
    resource:"",
    email:"",
    comments:""
    });

    useEffect(() => {

        axios
        .get("http://localhost:8080/reservations")
        .then((data) => { 
            setBackendData(data) 
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    const handleClick = (reservationId) =>
    {
        console.log(reservationId);

        axios
        .delete(URL + reservationId)
        .then((response) => { 
            window.location.reload(false);
            console.log(response.json); 
        })
        .catch(err => {
            console.error(err);
        });
    }  

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const inputs = new FormData(e.target);
        const value = Object.fromEntries(inputs.entries());
        console.log(inputs.entries);
        var object = {};
        inputs.forEach(function(value, key) {
          object[key] = value;
        })
    
        console.log(object);
    
        axios
          .post(URL, object)
          .then(() => {
            window.location.reload(false);
          })
          .catch(err => {
            console.error(err);
        });
    }

    const modifyReservation = ( id,
                                startDate, 
                                endDate, 
                                resourceId, 
                                ownerEmail, 
                                comments) => {
        
        setValues({ ...values, [id]:id, startDate, endDate, resourceId, ownerEmail, comments });

        return (
            <div className='modifyReservation'>
                Add an appointment
                <form onSubmit={handleSubmit}>
                {inputsArr.map((input) => (
                    <FormInput 
                        key={id} 
                        {...input} 
                        value={values[id]}
                    />
                ))}
                <button>Submit</button>
                </form>
            </div>
        //     <form onSubmit={handleSubmit}>
        //     {inputsArr.map((input) => (
        //     <FormInput 
        //       key={id} 
        //       {...input} 
        //       value={values[id]} 
              
        //       />
        //       <button>Submit</button>
        //   ))}</form>
            // <FormInput 
            //   key={id} 
            //   value={values[id]} 
            //   onChange={handleClick(id)}
        )
    }

    return (
        <div>
            <div className='title'>Appointment menu </div>
            <div className='reservationsList'>
                The existing appointments are:
                <div>
                    {(typeof backendData.data === 'undefined') ? (
                    <p>Loading appointments</p>
                    ): (
                    backendData.data.reservations.map(({reservationId, startDate, endDate, resourceId, ownerEmail, comments}, i) => (
                        <div key={i}>
                            <p key={i}>{i + 1}. {ownerEmail} booked from {startDate} until {endDate} using the {resourceId} resource and " {comments !== null ? comments !=="" ? comments :'nothing' :'nothing'} " as comment</p>
                            <button className='delButton' key={"delButton"} onClick={() => handleClick(reservationId)}>Delete</button>
                            <button className='modButton' key={"modButton"} onClick={() => modifyReservation(i, startDate, endDate, resourceId, ownerEmail, comments)} >Modify</button>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default ReservationsArray;