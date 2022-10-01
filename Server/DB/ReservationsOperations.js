const knex = require("./knex");

function createReservation(reservation)
{
    return knex("reservations").insert(reservation);
};

function getAllReservations()
{
    return knex("reservations").select("*");
}

function deleteReservation(reservationId)
{
    return knex("reservations").where("reservationId", reservationId).del();
}

function updateReservation(id, reservation)
{
    return knex("reservations").where("reservationId", reservationId).update(reservation);
}

module.exports = {
    createReservation,
    getAllReservations,
    deleteReservation,
    updateReservation
}