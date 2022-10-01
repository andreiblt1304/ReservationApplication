const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const reservationOp = require("./DB/ReservationsOperations");
const resourceOp = require("./DB/ResourcesOperations");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/reservations", async (req, res) => {
    const reservations = await reservationOp.getAllReservations();
    res.status(200).json({ reservations });
})

app.post("/reservations", async (req, res) => {
    const result = await reservationOp.createReservation(req.body);
    res.status(201).json({ id: result[0] });
})

//using patch to modify exact fields, not the entire information
app.patch("/reservations/:id", async (req, res) => {
    const id = await reservationOp.updateReservation(req.params.id, req.body);
    res.status(200).json({ id });
})

app.delete("/reservations/:id", async (req, res) => {
    await reservationOp.deleteReservation(req.params.id);
    res.status(200).json({ succes: true });
})

app.get("/resources", async (req, res) => {
    const resources = await resourceOp.getAllResources();
    res.status(200).json({ resources });
})

app.post("/resources", async (req, res) => {
    const result = await resourceOp.createResource(req.body);
    res.status(201).json({ id: result[0] });
})

app.patch("/resources/:id", async (req, res) => {
    const id = await resourceOp.updateResource(req.params.id, req.body);
    res.status(200).json({ id });
})

app.delete("/resources/:id", async (req, res) => {
    await resourceOp.deleteResource(req.params.id);
    res.status(200).json({ succes: true });
})

app.listen(PORT, () => {
    console.log("Server is running at port " + PORT);
});