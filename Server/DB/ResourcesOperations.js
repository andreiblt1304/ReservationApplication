const knex = require("./knex");

function createResource(resource)
{
    return knex("resources").insert(resource);
};

function getAllResources()
{
    return knex("resources").select("*");
}

function deleteResource(reservationId)
{
    return knex("resources").where("resourceId", resourceId).del();
}

function updateResource(id, reservation)
{
    return knex("resources").where("resourceId", resourceId).update(resource);
}

module.exports = {
    createResource,
    getAllResources,
    deleteResource,
    updateResource
}