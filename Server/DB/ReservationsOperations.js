const knex = require("./knex");

function createReservation(reservation)
{
    console.log(reservation);
    return knex("Reservations").insert(reservation);
};

function getAllReservations()
{
    return knex("Reservations").select("*");
}

function deleteReservation(reservationId)
{
    return knex("Reservations").where("reservationId", reservationId).del();
}

function updateReservation(reservationId, reservation)
{
    return knex("Reservations").where("reservationId", reservationId).update(reservation);
}

module.exports = {
    createReservation,
    getAllReservations,
    deleteReservation,
    updateReservation
}