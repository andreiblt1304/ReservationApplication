import React, { useEffect, useState } from 'react'

const ReservationsArray = () => {

    const URL = "http://localhost:5005/reservations/";
    const [backendData, setBackendData ] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5005/reservations", { method: "GET" }).then(
        response => response.json()
        ).then(
        data => { setBackendData(data) }
        )
    }, [])

    const handleClick = (reservationId) =>
    {
        console.log(reservationId);

        const requestOptions = {
            method: 'DELETE'
        };

        fetch(URL + reservationId, requestOptions).then((response) => {
            window.location.reload(false);
            console.log(response.json());
        });
    }  

    return (
        <div>
            <div className='title'>Appointment menu </div>
            <div className='reservationsList'>
                The existing appointments are:
                <div>
                    {(typeof backendData.reservations === 'undefined') ? (
                    <p>Loading reservations</p>
                    ): (
                    backendData.reservations.map(({reservationId, startDate, endDate, ownerEmail, comments, resourceId}, i) => (
                        <div key={i}>
                            <p key={i}>{reservationId}. {ownerEmail} booked from {startDate} until {endDate} using the {resourceId} resource and {comments ? (comments===null || comments==="") : 'nothing'} as comment</p>
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