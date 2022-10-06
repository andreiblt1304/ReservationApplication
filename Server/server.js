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
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With'); 
//     res.header('Access-Control-Allow-Headers', 'Content-Type'); 
//     res.header('Access-Control-Allow-Headers', 'Accept');
//     res.header('Access-Control-Allow-Headers', 'Origin');
//     //req.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// })


app.get("/reservations", async (req, res) => {
    const reservations = await reservationOp.getAllReservations();
    console.log("sunt in get");
    res.status(200).json({ reservations });
})

app.post("/reservations", async (req, res) => {

    if(req.body.reservationId != null)
    {
        const id = await reservationOp.updateReservation(req.params.id, req.body);
    }

    const result = await reservationOp.createReservation(req.body);
    console.log(req.body);
    res.status(201).json({ id: result[0] });
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