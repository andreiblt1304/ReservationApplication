import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ReservationsArray = () => {

    const URL = "http://localhost:8080/reservations/";
    const [backendData, setBackendData ] = useState([{}]);

    useEffect(() => {

        axios
        .get("http://localhost:8080/reservations")
        .then((data) => { 
            setBackendData(data) 
        })
        .catch(err => {
            console.error(err);
        });

        // fetch("http://localhost:8080/reservations", { method: "GET" }).then(
        // response => response.json()
        // ).then(
        // data => { setBackendData(data) }
        // )
    }, [])

    const handleClick = (reservationId) =>
    {
        console.log(reservationId);

        axios
        .delete(URL + reservationId)
        .then((response) => { 
            window.location.reload(false);
            console.log(response.json()); 
        })
        .catch(err => {
            console.error(err);
        });

        // const requestOptions = {
        //     method: 'DELETE'
        // };

        // fetch(URL + reservationId, requestOptions).then((response) => {
        //     window.location.reload(false);
        //     console.log(response.json());
        // });
    }  

    return (
        <div>
            <div className='title'>Appointment menu </div>
            <div className='reservationsList'>
                The existing appointments are:
                <div>
                    {(typeof backendData.data === 'undefined') ? (
                    <p>Loading reservations</p>
                    ): (
                    backendData.data.reservations.map(({reservationId, startDate, endDate, resourceId, ownerEmail, comments}, i) => (
                        <div key={i}>
                            <p key={i}>{i + 1}. {ownerEmail} booked from {startDate} until {endDate} using the {resourceId} resource and {(comments === null || comments ==='') ? comments : 'nothing'} as comment</p>
                            <button className='delButton' key={"delButton"} onClick={() => handleClick(reservationId)}>Delete</button>
                            <button className='modButton' key={"modButton"}>Modify</button>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default ReservationsArray;