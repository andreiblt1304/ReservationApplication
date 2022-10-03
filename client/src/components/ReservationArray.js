import React, { useEffect, useState } from 'react'

const ReservationsArray = () => {

    const [backendData, setBackendData ] = useState([{}]);

    useEffect(() => {
        fetch("/reservations").then(
        response => response.json()
        ).then(
        data => { setBackendData(data) }
        )
    }, [])

    return (
        <div>
            <div className='title'>Appointment menu </div>
            <div className='reservationsList'>
                The existing appointments are:
                {(typeof backendData.reservations === 'undefined') ? (
                <p>Loading reservations</p>
                ): (
                backendData.reservations.map(({reservationId, startDate, endDate, ownerEmail, comments, resourceId}, i) => (
                    <p key={i}>{reservationId}. {ownerEmail} booked from {startDate} until {endDate} using the {resourceId} resource and {comments ? comments===null : 'nothing'} as comment</p>
                ))
                )}
            </div>
        </div>
    )
}

export default ReservationsArray;