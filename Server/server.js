const express = require("express");
const app = express();
const PORT = 8080;

app.get("/home", (req, res) => {
    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log("Server is running at port " + PORT);
});