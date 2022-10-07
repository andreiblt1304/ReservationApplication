const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const reservationOp = require("./DB/ReservationsOperations");
const resourceOp = require("./DB/ResourcesOperations");
const PORT = 8080;
var cors = require("cors");

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var _reservations = null;

app.get("/reservations", async (req, res) => {
    const reservations = await reservationOp.getAllReservations();
    _reservations = reservations;
    res.status(200).json({ reservations });
})

app.post("/reservations", async (req, res) => {
    const parsedStartDate = Date.parse(req.body.startDate);
    const parsedEndDate = Date.parse(req.body.endDate);
    var isSameStartDate = false;
    var isDateIntervalInvalid = false;

    _reservations.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if(key === "startDate" && value === req.body.startDate)
            {
                isSameStartDate = true;
                console.log("There is an appointment with that start date");
            }
        });
    });

    if(parsedStartDate > parsedEndDate)
    {
        isDateIntervalInvalid = true;
        console.error("Start date should be before end date");
    }
    
    if(!isSameStartDate && !isDateIntervalInvalid)
    {
        const result = await reservationOp.createReservation(req.body);
        res.status(201).json({ id: result[0] });
    }
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

app.get("/home", async (req, res) => {
    res.status(200).json({ "result": "ok" });
})

app.listen(PORT, () => {
    console.log("Server is running at port " + PORT);
});